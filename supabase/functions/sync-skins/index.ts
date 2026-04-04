import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SKINS_API_URL =
  "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins_not_grouped.json";

interface ApiSkin {
  id: string;
  name: string;
  description: string;
  weapon?: { name: string };
  pattern?: { name: string };
  rarity?: { name: string; color: string };
  image: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch skins from API
    const res = await fetch(SKINS_API_URL);
    if (!res.ok) {
      throw new Error(`Failed to fetch skins API: ${res.status}`);
    }

    const skins: ApiSkin[] = await res.json();

    // Transform and batch upsert
    const BATCH_SIZE = 500;
    let totalUpserted = 0;

    for (let i = 0; i < skins.length; i += BATCH_SIZE) {
      const batch = skins.slice(i, i + BATCH_SIZE).map((s) => ({
        id: s.id,
        name: s.name,
        description: s.description || null,
        weapon_name: s.weapon?.name || null,
        pattern_name: s.pattern?.name || null,
        rarity_name: s.rarity?.name || null,
        rarity_color: s.rarity?.color || null,
        image: s.image || null,
      }));

      const { error } = await supabase
        .from("imported_skins")
        .upsert(batch, { onConflict: "id" });

      if (error) {
        throw new Error(`Upsert batch error: ${error.message}`);
      }

      totalUpserted += batch.length;
    }

    return new Response(
      JSON.stringify({
        success: true,
        total_skins: skins.length,
        upserted: totalUpserted,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
