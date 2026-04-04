import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { RefreshCw, Trash2, ImagePlus, Loader2 } from "lucide-react";
import SkinSearchModal from "./SkinSearchModal";
import { toast } from "sonner";

interface SlotWithSkin {
  id: string;
  slot_position: number;
  skin_id: string | null;
  imported_skins: {
    name: string;
    weapon_name: string | null;
    pattern_name: string | null;
    image: string | null;
    rarity_name: string | null;
  } | null;
}

interface CategoryWithSlots {
  id: string;
  key: string;
  label: string;
  slot_count: number;
  slots: SlotWithSkin[];
}

export default function SlotManager() {
  const queryClient = useQueryClient();
  const [modalSlotId, setModalSlotId] = useState<string | null>(null);

  const { data: categories, isLoading } = useQuery({
    queryKey: ["admin-categories-slots"],
    queryFn: async (): Promise<CategoryWithSlots[]> => {
      const { data: cats, error: catsErr } = await supabase
        .from("showcase_categories")
        .select("*")
        .order("sort_order");
      if (catsErr) throw catsErr;

      const { data: slots, error: slotsErr } = await supabase
        .from("showcase_slots")
        .select(`
          id, slot_position, skin_id, category_id,
          imported_skins (name, weapon_name, pattern_name, image, rarity_name)
        `)
        .order("slot_position");
      if (slotsErr) throw slotsErr;

      return (cats || []).map((cat) => ({
        ...cat,
        slots: (slots || [])
          .filter((s: any) => s.category_id === cat.id)
          .map((s: any) => ({
            id: s.id,
            slot_position: s.slot_position,
            skin_id: s.skin_id,
            imported_skins: s.imported_skins,
          })),
      }));
    },
  });

  const updateSlot = useMutation({
    mutationFn: async ({ slotId, skinId }: { slotId: string; skinId: string | null }) => {
      const { error } = await supabase
        .from("showcase_slots")
        .update({ skin_id: skinId })
        .eq("id", slotId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories-slots"] });
      queryClient.invalidateQueries({ queryKey: ["showcase-skins"] });
      toast.success("Slot atualizado!");
    },
    onError: (e) => toast.error(`Erro: ${e.message}`),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {categories?.map((cat) => (
        <div key={cat.id} className="space-y-3">
          <h3 className="text-lg font-bold text-foreground">
            {cat.label}{" "}
            <span className="text-sm font-normal text-muted-foreground">
              ({cat.slots.filter((s) => s.skin_id).length}/{cat.slot_count} preenchidos)
            </span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {cat.slots.map((slot) => (
              <div
                key={slot.id}
                className="border border-border rounded-lg overflow-hidden bg-card/60"
              >
                {slot.imported_skins ? (
                  <>
                    <div className="aspect-square bg-muted/20 relative">
                      {slot.imported_skins.image && (
                        <img
                          src={slot.imported_skins.image}
                          alt={slot.imported_skins.name}
                          className="w-full h-full object-contain"
                        />
                      )}
                      <span className="absolute top-1 left-1 text-[9px] font-bold bg-background/80 px-1.5 py-0.5 rounded">
                        #{slot.slot_position}
                      </span>
                    </div>
                    <div className="p-2 space-y-1">
                      <p className="text-xs font-semibold truncate">
                        {slot.imported_skins.weapon_name}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {slot.imported_skins.pattern_name}
                      </p>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 h-7 text-[10px]"
                          onClick={() => setModalSlotId(slot.id)}
                        >
                          <RefreshCw className="size-3 mr-1" />
                          Trocar
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 px-2 text-destructive"
                          onClick={() => updateSlot.mutate({ slotId: slot.id, skinId: null })}
                        >
                          <Trash2 className="size-3" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => setModalSlotId(slot.id)}
                    className="w-full aspect-[3/4] flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground hover:bg-accent/30 transition-colors"
                  >
                    <ImagePlus className="size-6" />
                    <span className="text-xs">Slot #{slot.slot_position}</span>
                    <span className="text-[10px]">Clique para adicionar</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <SkinSearchModal
        open={!!modalSlotId}
        onClose={() => setModalSlotId(null)}
        onSelect={(skinId) => {
          if (modalSlotId) {
            updateSlot.mutate({ slotId: modalSlotId, skinId });
            setModalSlotId(null);
          }
        }}
      />
    </div>
  );
}
