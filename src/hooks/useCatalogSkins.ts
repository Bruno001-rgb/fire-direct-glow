import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ByMykelSkin } from "@/hooks/useByMykelSkins";

/**
 * Fetches only skins that are assigned to showcase slots or catalog_skins (admin-curated).
 * All metadata (paint_index, weapon_defindex, floats) comes from the DB — no external API needed.
 */
export function useCatalogSkins() {
  return useQuery({
    queryKey: ["catalog-skins"],
    queryFn: async (): Promise<ByMykelSkin[]> => {
      // Fetch showcase slots and catalog-only skins in parallel
      const [dbResult, catalogResult] = await Promise.all([
        supabase
          .from("showcase_slots")
          .select(`
            skin_id,
            imported_skins (
              id, name, weapon_name, pattern_name, rarity_name, rarity_color, image, price,
              paint_index, weapon_defindex, min_float, max_float
            )
          `)
          .not("skin_id", "is", null),
        supabase
          .from("catalog_skins")
          .select(`
            skin_id,
            imported_skins:skin_id (
              id, name, weapon_name, pattern_name, rarity_name, rarity_color, image, price,
              paint_index, weapon_defindex, min_float, max_float
            )
          `),
      ]);

      if (dbResult.error) throw dbResult.error;
      if (catalogResult.error) throw catalogResult.error;

      const allSlots = [
        ...(dbResult.data || []),
        ...(catalogResult.data || []),
      ];

      // Deduplicate by skin_id
      const seen = new Set<string>();
      const skins: ByMykelSkin[] = [];

      for (const slot of allSlots) {
        const s = slot.imported_skins as any;
        if (!s || seen.has(s.id)) continue;
        seen.add(s.id);

        const categoryName = getCategoryName(s.weapon_name);

        skins.push({
          id: s.id,
          name: s.name,
          image: s.image || "",
          rarity: { name: s.rarity_name || "Unknown", color: s.rarity_color || "#888" },
          weapon: { name: s.weapon_name || "" },
          category: { name: categoryName },
          min_float: s.min_float ?? null,
          max_float: s.max_float ?? null,
          stattrak: false,
          collections: [],
          price: s.price ?? null,
          paint_index: s.paint_index ?? null,
          weapon_id: s.weapon_defindex ?? null,
        });
      }

      return skins;
    },
    staleTime: 1000 * 60 * 2,
  });
}

function getCategoryName(weaponName: string | null): string {
  if (!weaponName) return "";
  const wn = weaponName.toLowerCase();

  const KNIFE_KEYWORDS = ["knife", "karambit", "bayonet", "butterfly", "falchion", "flip", "gut",
    "huntsman", "bowie", "shadow daggers", "stiletto", "talon", "ursus", "navaja",
    "classic knife", "paracord", "survival", "nomad", "skeleton", "kukri"];
  if (KNIFE_KEYWORDS.some(k => wn.includes(k))) return "Knives";

  if (wn.includes("gloves") || wn.includes("wraps")) return "Gloves";

  const PISTOL_NAMES = ["glock-18", "usp-s", "p250", "five-seven", "tec-9", "desert eagle", "dual berettas", "r8 revolver", "cz75-auto", "p2000"];
  if (PISTOL_NAMES.some(p => wn.includes(p))) return "Pistols";

  const SMG_NAMES = ["mac-10", "mp9", "mp7", "mp5-sd", "ump-45", "p90", "pp-bizon"];
  if (SMG_NAMES.some(p => wn.includes(p))) return "SMGs";

  const SHOTGUN_NAMES = ["nova", "xm1014", "mag-7", "sawed-off"];
  if (SHOTGUN_NAMES.some(p => wn.includes(p))) return "Shotguns";

  const MACHINEGUN_NAMES = ["m249", "negev"];
  if (MACHINEGUN_NAMES.some(p => wn.includes(p))) return "Machine Guns";

  return "Rifles";
}
