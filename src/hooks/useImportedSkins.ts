import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useImportedSkins(search: string) {
  return useQuery({
    queryKey: ["imported-skins", search],
    queryFn: async () => {
      let query = supabase
        .from("admin_skin_index" as any)
        .select("source_skin_id, name, weapon_name, pattern_name, rarity_name, rarity_color, image")
        .order("weapon_name");

      if (search.trim()) {
        query = query.or(
          `name.ilike.%${search}%,weapon_name.ilike.%${search}%,pattern_name.ilike.%${search}%`
        );
      }

      const { data, error } = await query.limit(100);
      if (error) throw error;
      return data || [];
    },
    enabled: true,
  });
}
