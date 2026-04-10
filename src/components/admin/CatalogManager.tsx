import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Loader2 } from "lucide-react";
import SkinSearchModal from "./SkinSearchModal";
import { toast } from "sonner";

interface CatalogSkinRow {
  skin_id: string;
  imported_skins: {
    id: string;
    name: string;
    weapon_name: string | null;
    pattern_name: string | null;
    image: string | null;
    rarity_name: string | null;
    rarity_color: string | null;
  } | null;
}

export default function CatalogManager() {
  const [searchOpen, setSearchOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: catalogSkins, isLoading } = useQuery({
    queryKey: ["admin-catalog-skins"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("catalog_skins")
        .select(`
          skin_id,
          imported_skins:skin_id (
            id, name, weapon_name, pattern_name, image, rarity_name, rarity_color
          )
        `)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as unknown as CatalogSkinRow[];
    },
  });

  const handleAdd = async (
    skinId: string,
    preview: { name: string; weapon_name: string | null; pattern_name: string | null; image: string | null; rarity_name: string | null; price: number | null }
  ) => {
    // Check if already in catalog_skins
    const { data: existing } = await supabase
      .from("catalog_skins")
      .select("id")
      .eq("skin_id", skinId)
      .maybeSingle();

    if (existing) {
      toast.info("Essa skin já está no catálogo.");
      return;
    }

    // Check if already in showcase_slots
    const { data: inShowcase } = await supabase
      .from("showcase_slots")
      .select("id")
      .eq("skin_id", skinId)
      .maybeSingle();

    if (inShowcase) {
      toast.info("Essa skin já está na vitrine (e aparece no catálogo automaticamente).");
      return;
    }

    const { error } = await supabase
      .from("catalog_skins")
      .insert({ skin_id: skinId });

    if (error) {
      toast.error("Erro ao adicionar: " + error.message);
      return;
    }

    toast.success("Skin adicionada ao catálogo!");
    queryClient.invalidateQueries({ queryKey: ["admin-catalog-skins"] });
    queryClient.invalidateQueries({ queryKey: ["catalog-skins"] });
  };

  const handleRemove = async (skinId: string) => {
    const { error } = await supabase
      .from("catalog_skins")
      .delete()
      .eq("skin_id", skinId);

    if (error) {
      toast.error("Erro ao remover: " + error.message);
      return;
    }

    toast.success("Skin removida do catálogo.");
    queryClient.invalidateQueries({ queryKey: ["admin-catalog-skins"] });
    queryClient.invalidateQueries({ queryKey: ["catalog-skins"] });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold">Skins do Catálogo</h2>
        <Button size="sm" onClick={() => setSearchOpen(true)}>
          <Plus className="size-4 mr-1" />
          Adicionar skin
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : !catalogSkins?.length ? (
        <p className="text-sm text-muted-foreground py-8 text-center">
          Nenhuma skin adicionada ao catálogo ainda.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {catalogSkins.map((item) => {
            const skin = item.imported_skins;
            if (!skin) return null;
            return (
              <div
                key={item.skin_id}
                className="relative group rounded-lg border border-border p-2 flex flex-col items-center gap-1"
              >
                {skin.image && (
                  <img
                    src={skin.image}
                    alt={skin.name}
                    className="w-full aspect-square object-contain rounded bg-muted/30"
                    loading="lazy"
                  />
                )}
                <span className="text-xs font-medium truncate w-full text-center">
                  {skin.weapon_name || ""}
                </span>
                <span className="text-[10px] text-muted-foreground truncate w-full text-center">
                  {skin.pattern_name || skin.name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 p-0"
                  onClick={() => handleRemove(item.skin_id)}
                >
                  <Trash2 className="size-3.5 text-destructive" />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      <SkinSearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={handleAdd}
      />
    </div>
  );
}
