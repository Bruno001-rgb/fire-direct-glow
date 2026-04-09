import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ByMykelSkin } from "@/hooks/useByMykelSkins";

const BYMYKEL_API =
  "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json";

/**
 * Fetches only skins that are assigned to showcase slots (admin-curated).
 * Cross-references with byMykel API for real float ranges.
 */
export function useCatalogSkins() {
  return useQuery({
    queryKey: ["catalog-skins"],
    queryFn: async (): Promise<ByMykelSkin[]> => {
      // Fetch DB skins and byMykel API in parallel
      const [dbResult, apiRes] = await Promise.all([
        supabase
          .from("showcase_slots")
          .select(`
            skin_id,
            imported_skins (
              id, name, weapon_name, pattern_name, rarity_name, rarity_color, image, price
            )
          `)
          .not("skin_id", "is", null),
        fetch(BYMYKEL_API).then((r) => (r.ok ? r.json() : [])).catch(() => []),
      ]);

      if (dbResult.error) throw dbResult.error;

      // Build a lookup from byMykel skins by normalized name for float matching
      const apiSkins = apiRes as any[];
      const floatLookup = new Map<string, { min: number; max: number }>();
      for (const s of apiSkins) {
        if (s.name && s.min_float != null && s.max_float != null) {
          floatLookup.set(s.name.toLowerCase(), {
            min: s.min_float,
            max: s.max_float,
          });
        }
      }

      // Deduplicate by skin_id
      const seen = new Set<string>();
      const skins: ByMykelSkin[] = [];

      for (const slot of dbResult.data || []) {
        const s = slot.imported_skins as any;
        if (!s || seen.has(s.id)) continue;
        seen.add(s.id);

        const isKnife = s.weapon_name?.toLowerCase().includes("knife") ||
          s.weapon_name?.toLowerCase().includes("karambit") ||
          s.weapon_name?.toLowerCase().includes("bayonet") ||
          s.weapon_name?.toLowerCase().includes("butterfly") ||
          s.weapon_name?.toLowerCase().includes("falchion") ||
          s.weapon_name?.toLowerCase().includes("flip") ||
          s.weapon_name?.toLowerCase().includes("gut") ||
          s.weapon_name?.toLowerCase().includes("huntsman") ||
          s.weapon_name?.toLowerCase().includes("bowie") ||
          s.weapon_name?.toLowerCase().includes("shadow daggers") ||
          s.weapon_name?.toLowerCase().includes("stiletto") ||
          s.weapon_name?.toLowerCase().includes("talon") ||
          s.weapon_name?.toLowerCase().includes("ursus") ||
          s.weapon_name?.toLowerCase().includes("navaja") ||
          s.weapon_name?.toLowerCase().includes("classic knife") ||
          s.weapon_name?.toLowerCase().includes("paracord") ||
          s.weapon_name?.toLowerCase().includes("survival") ||
          s.weapon_name?.toLowerCase().includes("nomad") ||
          s.weapon_name?.toLowerCase().includes("skeleton");

        const isGloves = s.weapon_name?.toLowerCase().includes("gloves") ||
          s.weapon_name?.toLowerCase().includes("wraps");

        const categoryName = isKnife ? "Knives" : isGloves ? "Gloves" : s.weapon_name || "";

        // Try to match float range from byMykel API
        // The imported name format is "Weapon | Pattern (Wear)" — strip the wear suffix for matching
        const baseName = s.name?.replace(/\s*\([^)]*\)\s*$/, "").replace(/^★\s*/, "").trim();
        const fullName = s.name?.replace(/\s*\([^)]*\)\s*$/, "").trim();
        const floatData = floatLookup.get(fullName?.toLowerCase() || "") ||
          floatLookup.get(baseName?.toLowerCase() || "") ||
          floatLookup.get(s.name?.toLowerCase() || "");

        skins.push({
          id: s.id,
          name: s.name,
          image: s.image || "",
          rarity: { name: s.rarity_name || "Unknown", color: s.rarity_color || "#888" },
          weapon: { name: s.weapon_name || "" },
          category: { name: categoryName },
          min_float: floatData?.min ?? null,
          max_float: floatData?.max ?? null,
          stattrak: false,
          collections: [],
          price: s.price ?? null,
        });
      }

      return skins;
    },
    staleTime: 1000 * 60 * 2,
  });
}
