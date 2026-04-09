import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { ByMykelSkin } from "@/hooks/useByMykelSkins";

/**
 * Fetches only skins that are assigned to showcase slots (admin-curated).
 * Returns ByMykelSkin-compatible objects for use in the public catalog.
 */
export function useCatalogSkins() {
  return useQuery({
    queryKey: ["catalog-skins"],
    queryFn: async (): Promise<ByMykelSkin[]> => {
      const { data: slots, error } = await supabase
        .from("showcase_slots")
        .select(`
          skin_id,
          imported_skins (
            id, name, weapon_name, pattern_name, rarity_name, rarity_color, image
          )
        `)
        .not("skin_id", "is", null);

      if (error) throw error;

      // Deduplicate by skin_id (same skin can be in multiple slots)
      const seen = new Set<string>();
      const skins: ByMykelSkin[] = [];

      for (const slot of slots || []) {
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

        skins.push({
          id: s.id,
          name: s.name,
          image: s.image || "",
          rarity: { name: s.rarity_name || "Unknown", color: s.rarity_color || "#888" },
          weapon: { name: s.weapon_name || "" },
          category: { name: categoryName },
          min_float: null,
          max_float: null,
          stattrak: false,
          collections: [],
        });
      }

      return skins;
    },
    staleTime: 1000 * 60 * 2,
  });
}
