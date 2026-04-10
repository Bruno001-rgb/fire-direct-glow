import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ShowcaseSkin {
  name: string;
  skin: string;
  category: string;
  rarity: string;
  image: string;
  price: number | null;
}

export function useShowcaseSkins() {
  return useQuery({
    queryKey: ["showcase-skins"],
    queryFn: async (): Promise<ShowcaseSkin[]> => {
      const { data: slots, error } = await supabase
        .from("showcase_slots")
        .select(`
          id,
          skin_id,
          created_at,
          imported_skins (
            name,
            weapon_name,
            pattern_name,
            rarity_name,
            image,
            price
          )
        `)
        .not("skin_id", "is", null)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (slots || [])
        .filter((s: any) => s.imported_skins)
        .map((s: any) => ({
          name: s.imported_skins.weapon_name || s.imported_skins.name,
          skin: s.imported_skins.pattern_name || "",
          category: "vitrine",
          rarity: s.imported_skins.rarity_name || "Covert",
          image: s.imported_skins.image || "",
          price: s.imported_skins.price ?? null,
        }));
    },
    staleTime: 1000 * 60 * 5,
  });
}
