import { useState, useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { RefreshCw, Trash2, ImagePlus, Loader2, Save, Undo2 } from "lucide-react";
import SkinSearchModal from "./SkinSearchModal";
import { toast } from "sonner";

interface SkinPreview {
  name: string;
  weapon_name: string | null;
  pattern_name: string | null;
  image: string | null;
  rarity_name: string | null;
}

interface SlotWithSkin {
  id: string;
  slot_position: number;
  skin_id: string | null;
  imported_skins: SkinPreview | null;
}

interface CategoryWithSlots {
  id: string;
  key: string;
  label: string;
  slot_count: number;
  slots: SlotWithSkin[];
}

interface PendingChange {
  skinId: string | null;
  preview: SkinPreview | null;
}

export default function SlotManager() {
  const queryClient = useQueryClient();
  const [modalSlotId, setModalSlotId] = useState<string | null>(null);
  const [pendingChanges, setPendingChanges] = useState<Map<string, PendingChange>>(new Map());
  const [isSaving, setIsSaving] = useState(false);

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

  const hasPendingChanges = pendingChanges.size > 0;

  const getEffectiveSlot = useCallback(
    (slot: SlotWithSkin) => {
      const pending = pendingChanges.get(slot.id);
      if (pending !== undefined) {
        return { ...slot, skin_id: pending.skinId, imported_skins: pending.preview };
      }
      return slot;
    },
    [pendingChanges]
  );

  const handleSelect = useCallback(
    (skinId: string, preview: SkinPreview) => {
      if (!modalSlotId) return;
      setPendingChanges((prev) => {
        const next = new Map(prev);
        next.set(modalSlotId, { skinId, preview });
        return next;
      });
      setModalSlotId(null);
    },
    [modalSlotId]
  );

  const handleRemove = useCallback((slotId: string) => {
    setPendingChanges((prev) => {
      const next = new Map(prev);
      next.set(slotId, { skinId: null, preview: null });
      return next;
    });
  }, []);

  const handleDiscard = useCallback(() => {
    setPendingChanges(new Map());
  }, []);

  const handleSave = useCallback(async () => {
    if (pendingChanges.size === 0) return;
    setIsSaving(true);

    try {
      const updates = Array.from(pendingChanges.entries()).map(
        ([slotId, change]) =>
          supabase
            .from("showcase_slots")
            .update({ skin_id: change.skinId })
            .eq("id", slotId)
      );

      const results = await Promise.all(updates);
      const errors = results.filter((r) => r.error);

      if (errors.length > 0) {
        console.error("Save errors:", errors.map((e) => e.error));
        toast.error(`Erro ao salvar ${errors.length} slot(s). Tente novamente.`);
        return;
      }

      setPendingChanges(new Map());
      queryClient.invalidateQueries({ queryKey: ["admin-categories-slots"] });
      queryClient.invalidateQueries({ queryKey: ["showcase-skins"] });
      toast.success("Configuração salva e publicada!");
    } catch (err: any) {
      console.error("Save failed:", err);
      toast.error(`Erro inesperado: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  }, [pendingChanges, queryClient]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Sticky save bar */}
      {hasPendingChanges && (
        <div className="sticky top-0 z-50 bg-amber-950/90 border border-amber-500/40 backdrop-blur-sm rounded-lg p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
          <span className="text-sm text-amber-200 font-medium">
            ⚠️ {pendingChanges.size} alteração(ões) não salva(s)
          </span>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              size="sm"
              variant="outline"
              onClick={handleDiscard}
              disabled={isSaving}
              className="border-amber-500/40 text-amber-200 hover:bg-amber-900/50 flex-1 sm:flex-none"
            >
              <Undo2 className="size-3 mr-1" />
              Descartar
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
              className="bg-amber-500 text-black hover:bg-amber-400 flex-1 sm:flex-none"
            >
              {isSaving ? (
                <Loader2 className="size-3 mr-1 animate-spin" />
              ) : (
                <Save className="size-3 mr-1" />
              )}
              {isSaving ? "Salvando..." : "Salvar e publicar"}
            </Button>
          </div>
        </div>
      )}

      {categories?.map((cat) => {
        const effectiveSlots = cat.slots.map(getEffectiveSlot);
        const filledCount = effectiveSlots.filter((s) => s.skin_id).length;

        return (
          <div key={cat.id} className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-foreground">
              {cat.label}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                ({filledCount}/{cat.slot_count} preenchidos)
              </span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {effectiveSlots.map((slot) => {
                const isPending = pendingChanges.has(slot.id);

                return (
                  <div
                    key={slot.id}
                    className={`border rounded-lg overflow-hidden bg-card/60 transition-colors ${
                      isPending
                        ? "border-amber-500 ring-1 ring-amber-500/30"
                        : "border-border"
                    }`}
                  >
                    {slot.imported_skins ? (
                      <>
                        <div className="aspect-square bg-muted/20 relative">
                          {slot.imported_skins.image && (
                            <img
                              src={slot.imported_skins.image}
                              alt={slot.imported_skins.name}
                              className="w-full h-full object-contain"
                              loading="lazy"
                            />
                          )}
                          <span className="absolute top-1 left-1 text-[9px] font-bold bg-background/80 px-1.5 py-0.5 rounded">
                            #{slot.slot_position}
                          </span>
                          {isPending && (
                            <span className="absolute top-1 right-1 text-[9px] font-bold bg-amber-500 text-black px-1.5 py-0.5 rounded">
                              Não salvo
                            </span>
                          )}
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
                              className="flex-1 h-9 sm:h-8 text-[11px] sm:text-[10px] min-w-[44px]"
                              onClick={() => setModalSlotId(slot.id)}
                            >
                              <RefreshCw className="size-3 mr-1" />
                              Trocar
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-9 sm:h-8 w-9 sm:w-8 px-0 text-destructive min-w-[44px]"
                              onClick={() => handleRemove(slot.id)}
                            >
                              <Trash2 className="size-3.5 sm:size-3" />
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <button
                        onClick={() => setModalSlotId(slot.id)}
                        className="w-full aspect-[3/4] flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground hover:bg-accent/30 transition-colors min-h-[120px]"
                      >
                        <ImagePlus className="size-6" />
                        <span className="text-xs">Slot #{slot.slot_position}</span>
                        <span className="text-[10px]">Clique para adicionar</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <SkinSearchModal
        open={!!modalSlotId}
        onClose={() => setModalSlotId(null)}
        onSelect={handleSelect}
      />
    </div>
  );
}
