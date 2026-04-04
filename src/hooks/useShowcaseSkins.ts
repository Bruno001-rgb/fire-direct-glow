import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ShowcaseSkin {
  name: string;
  skin: string;
  category: string;
  rarity: string;
  image: string;
}

export function useShowcaseSkins() {
  return useQuery({
    queryKey: ["showcase-skins"],
    queryFn: async (): Promise<ShowcaseSkin[]> => {
      // Get all slots with their category and skin data
      const { data: slots, error: slotsError } = await supabase
        .from("showcase_slots")
        .select(`
          slot_position,
          skin_id,
          imported_skins (
            name,
            weapon_name,
            pattern_name,
            rarity_name,
            image
          ),
          showcase_categories (
            key,
            sort_order
          )
        `)
        .not("skin_id", "is", null)
        .order("slot_position");

      if (slotsError) throw slotsError;

      return (slots || [])
        .filter((s: any) => s.imported_skins && s.showcase_categories)
        .sort((a: any, b: any) => {
          const catDiff = (a.showcase_categories.sort_order || 0) - (b.showcase_categories.sort_order || 0);
          if (catDiff !== 0) return catDiff;
          return a.slot_position - b.slot_position;
        })
        .map((s: any) => ({
          name: s.imported_skins.weapon_name || s.imported_skins.name,
          skin: s.imported_skins.pattern_name || "",
          category: s.showcase_categories.key,
          rarity: s.imported_skins.rarity_name || "Covert",
          image: s.imported_skins.image || "",
        }));
    },
    staleTime: 1000 * 60 * 5, // 5 min cache
  });
}
