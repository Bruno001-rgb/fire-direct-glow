import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const authHeader = req.headers.get("Authorization");
  const body = await req.json();
  const { action } = body;

  // FIRST-ADMIN: no auth required beyond having a valid session
  if (action === "first-admin") {
    if (!authHeader?.startsWith("Bearer ")) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }

    // Get caller user from token
    const supabaseUser = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: { user }, error: userError } = await supabaseUser.auth.getUser();
    if (userError || !user) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }

    // Check if any admins exist
    const { data: existingAdmins } = await supabase
      .from("user_roles")
      .select("id")
      .eq("role", "admin")
      .limit(1);

    if (existingAdmins && existingAdmins.length > 0) {
      return jsonResponse({ first: false });
    }

    // First user - make them super admin
    const { error: insertError } = await supabase
      .from("user_roles")
      .insert({ user_id: user.id, role: "admin", is_super: true });

    if (insertError) {
      return jsonResponse({ error: insertError.message }, 400);
    }

    return jsonResponse({ first: true, success: true });
  }

  // All other actions require admin auth
  if (!authHeader?.startsWith("Bearer ")) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  // Get caller ID from token
  const supabaseUserClient = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } }
  );
  const { data: { user: callerUser }, error: callerError } = await supabaseUserClient.auth.getUser();
  if (callerError || !callerUser) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }
  const callerId = callerUser.id;

  // Check caller is admin
  const { data: callerRole } = await supabase
    .from("user_roles")
    .select("role, is_super")
    .eq("user_id", callerId)
    .eq("role", "admin")
    .maybeSingle();

  if (!callerRole) {
    return jsonResponse({ error: "Não autorizado" }, 403);
  }

  try {
    if (action === "list") {
      const { data: roles } = await supabase
        .from("user_roles")
        .select("user_id, role, is_super")
        .eq("role", "admin");

      if (!roles || roles.length === 0) {
        return jsonResponse({ admins: [] });
      }

      const admins = [];
      for (const r of roles) {
        const { data: userData } = await supabase.auth.admin.getUserById(r.user_id);
        admins.push({
          user_id: r.user_id,
          email: userData?.user?.email || "unknown",
          is_super: r.is_super,
        });
      }

      return jsonResponse({ admins });
    }

    if (action === "add") {
      if (!callerRole.is_super) {
        return jsonResponse({ error: "Apenas o Super Admin pode adicionar admins" }, 403);
      }

      const { email } = body;
      if (!email) {
        return jsonResponse({ error: "Email obrigatório" }, 400);
      }

      const { data: usersData } = await supabase.auth.admin.listUsers();
      const targetUser = usersData?.users?.find(
        (u: any) => u.email?.toLowerCase() === email.toLowerCase()
      );

      if (!targetUser) {
        return jsonResponse({ error: "Usuário não encontrado. Ele precisa criar uma conta primeiro." }, 404);
      }

      const { error: insertError } = await supabase
        .from("user_roles")
        .insert({ user_id: targetUser.id, role: "admin", is_super: false });

      if (insertError) {
        const msg = insertError.message.includes("Limite")
          ? "Limite de 10 administradores atingido"
          : insertError.message;
        return jsonResponse({ error: msg }, 400);
      }

      return jsonResponse({ success: true });
    }

    if (action === "remove") {
      if (!callerRole.is_super) {
        return jsonResponse({ error: "Apenas o Super Admin pode remover admins" }, 403);
      }

      const { user_id } = body;
      if (!user_id || user_id === callerId) {
        return jsonResponse({ error: "Não é possível remover a si mesmo" }, 400);
      }

      const { error: delError } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", user_id)
        .eq("role", "admin");

      if (delError) {
        return jsonResponse({ error: delError.message }, 400);
      }

      return jsonResponse({ success: true });
    }

    if (action === "transfer") {
      if (!callerRole.is_super) {
        return jsonResponse({ error: "Apenas o Super Admin pode transferir o cargo" }, 403);
      }

      const { user_id } = body;
      if (!user_id || user_id === callerId) {
        return jsonResponse({ error: "Escolha outro admin para transferir" }, 400);
      }

      const { error: transferError } = await supabase.rpc("transfer_super_admin", {
        new_super_id: user_id,
      });

      if (transferError) {
        return jsonResponse({ error: transferError.message }, 400);
      }

      return jsonResponse({ success: true });
    }

    return jsonResponse({ error: "Ação inválida" }, 400);
  } catch (e) {
    return jsonResponse({ error: e.message }, 500);
  }
});
