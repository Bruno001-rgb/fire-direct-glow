import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.49.1/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Verify caller is admin
  const supabaseUser = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } }
  );

  const { data: claimsData, error: claimsError } = await supabaseUser.auth.getClaims(
    authHeader.replace("Bearer ", "")
  );
  if (claimsError || !claimsData?.claims) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  const callerId = claimsData.claims.sub;

  // Service role client for privileged operations
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Check caller is admin
  const { data: callerRole } = await supabase
    .from("user_roles")
    .select("role, is_super")
    .eq("user_id", callerId)
    .eq("role", "admin")
    .maybeSingle();

  if (!callerRole) {
    return new Response(JSON.stringify({ error: "Não autorizado" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const body = await req.json();
  const { action } = body;

  try {
    // LIST: return all admins with emails
    if (action === "list") {
      const { data: roles } = await supabase
        .from("user_roles")
        .select("user_id, role, is_super")
        .eq("role", "admin");

      if (!roles || roles.length === 0) {
        return new Response(JSON.stringify({ admins: [] }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Fetch emails from auth.users
      const admins = [];
      for (const r of roles) {
        const { data: userData } = await supabase.auth.admin.getUserById(r.user_id);
        admins.push({
          user_id: r.user_id,
          email: userData?.user?.email || "unknown",
          is_super: r.is_super,
        });
      }

      return new Response(JSON.stringify({ admins }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ADD: add admin by email (only super admin)
    if (action === "add") {
      if (!callerRole.is_super) {
        return new Response(JSON.stringify({ error: "Apenas o Super Admin pode adicionar admins" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { email } = body;
      if (!email) {
        return new Response(JSON.stringify({ error: "Email obrigatório" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Find user by email
      const { data: usersData } = await supabase.auth.admin.listUsers();
      const targetUser = usersData?.users?.find(
        (u: any) => u.email?.toLowerCase() === email.toLowerCase()
      );

      if (!targetUser) {
        return new Response(JSON.stringify({ error: "Usuário não encontrado. Ele precisa criar uma conta primeiro." }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Insert role
      const { error: insertError } = await supabase
        .from("user_roles")
        .insert({ user_id: targetUser.id, role: "admin", is_super: false });

      if (insertError) {
        const msg = insertError.message.includes("Limite")
          ? "Limite de 10 administradores atingido"
          : insertError.message;
        return new Response(JSON.stringify({ error: msg }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // REMOVE: remove admin by user_id (only super admin, can't remove self)
    if (action === "remove") {
      if (!callerRole.is_super) {
        return new Response(JSON.stringify({ error: "Apenas o Super Admin pode remover admins" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { user_id } = body;
      if (!user_id || user_id === callerId) {
        return new Response(JSON.stringify({ error: "Não é possível remover a si mesmo" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { error: delError } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", user_id)
        .eq("role", "admin");

      if (delError) {
        return new Response(JSON.stringify({ error: delError.message }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // TRANSFER: transfer super admin to another admin
    if (action === "transfer") {
      if (!callerRole.is_super) {
        return new Response(JSON.stringify({ error: "Apenas o Super Admin pode transferir o cargo" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { user_id } = body;
      if (!user_id || user_id === callerId) {
        return new Response(JSON.stringify({ error: "Escolha outro admin para transferir" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Use the DB function
      const { error: transferError } = await supabase.rpc("transfer_super_admin", {
        new_super_id: user_id,
      });

      if (transferError) {
        return new Response(JSON.stringify({ error: transferError.message }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Ação inválida" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
