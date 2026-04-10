import { useState, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Loader2 } from "lucide-react";
import SkinSearchModal from "./SkinSearchModal";
import { toast } from "sonner";

interface ShowcaseSlot {
  id: string;
  skin_id: string;
  imported_skins: {
    name: string;
    weapon_name: string | null;
    pattern_name: string | null;
    image: string | null;
    rarity_name: string | null;
  };
}

export default function SlotManager() {
  const queryClient = useQueryClient();
  const [showSearch, setShowSearch] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const { data: slots, isLoading } = useQuery({
    queryKey: ["admin-showcase-slots"],
    queryFn: async (): Promise<ShowcaseSlot[]> => {
      const { data, error } = await supabase
        .from("showcase_slots")
        .select(`
          id, skin_id,
          imported_skins (name, weapon_name, pattern_name, image, rarity_name)
        `)
        .not("skin_id", "is", null)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data || []).filter((s: any) => s.imported_skins) as ShowcaseSlot[];
    },
  });

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["admin-showcase-slots"] });
    queryClient.invalidateQueries({ queryKey: ["showcase-skins"] });
  }, [queryClient]);

  const handleAdd = useCallback(
    async (skinId: string, preview: { name: string; weapon_name: string | null; pattern_name: string | null; image: string | null; rarity_name: string | null }) => {
      // Check duplicate
      if (slots?.some((s) => s.skin_id === skinId)) {
        toast.error("Essa skin já está na vitrine!");
        return;
      }

      try {
        // Get or create a default category
        let categoryId: string;
        const { data: cats } = await supabase
          .from("showcase_categories")
          .select("id")
          .limit(1)
          .single();

        if (cats) {
          categoryId = cats.id;
        } else {
          const { data: newCat, error: catErr } = await supabase
            .from("showcase_categories")
            .insert({ key: "vitrine", label: "Vitrine", slot_count: 100, sort_order: 0 })
            .select("id")
            .single();
          if (catErr) throw catErr;
          categoryId = newCat!.id;
        }

        const nextPosition = (slots?.length || 0) + 1;

        const { error } = await supabase.from("showcase_slots").insert({
          category_id: categoryId,
          slot_position: nextPosition,
          skin_id: skinId,
        });
        if (error) throw error;

        invalidate();
        toast.success("Skin adicionada à vitrine!");
      } catch (err: any) {
        toast.error(`Erro: ${err.message}`);
      }
    },
    [slots, invalidate]
  );

  const handleRemove = useCallback(
    async (slotId: string) => {
      setRemovingId(slotId);
      try {
        const { error } = await supabase.from("showcase_slots").delete().eq("id", slotId);
        if (error) throw error;
        invalidate();
        toast.success("Skin removida da vitrine.");
      } catch (err: any) {
        toast.error(`Erro: ${err.message}`);
      } finally {
        setRemovingId(null);
      }
    },
    [invalidate]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">
          Vitrine
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            ({slots?.length || 0} skin{(slots?.length || 0) !== 1 ? "s" : ""})
          </span>
        </h2>
        <Button size="sm" onClick={() => setShowSearch(true)}>
          <Plus className="size-3 mr-1" />
          Adicionar skin
        </Button>
      </div>

      {!slots?.length ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-sm">Nenhuma skin na vitrine ainda.</p>
          <p className="text-xs mt-1">Clique em "Adicionar skin" para começar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="border border-border rounded-lg overflow-hidden bg-card/60 group relative"
            >
              <div className="aspect-square bg-muted/20">
                {slot.imported_skins.image && (
                  <img
                    src={slot.imported_skins.image}
                    alt={slot.imported_skins.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="p-2">
                <p className="text-xs font-medium truncate">
                  {slot.imported_skins.weapon_name || slot.imported_skins.name}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">
                  {slot.imported_skins.pattern_name || ""}
                </p>
              </div>
              <button
                onClick={() => handleRemove(slot.id)}
                disabled={removingId === slot.id}
                className="absolute top-1.5 right-1.5 p-1 rounded bg-destructive/80 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive"
              >
                {removingId === slot.id ? (
                  <Loader2 className="size-3 animate-spin" />
                ) : (
                  <Trash2 className="size-3" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      <SkinSearchModal
        open={showSearch}
        onClose={() => setShowSearch(false)}
        onSelect={handleAdd}
      />
    </div>
  );
}
