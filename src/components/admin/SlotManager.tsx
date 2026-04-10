import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, Trash2, ImagePlus, Loader2, Save, Undo2, Plus, X, Search } from "lucide-react";
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
  const [modalCategoryKey, setModalCategoryKey] = useState<string | undefined>(undefined);
  const [pendingChanges, setPendingChanges] = useState<Map<string, PendingChange>>(new Map());
  const [isSaving, setIsSaving] = useState(false);
  const [showAddSlotForm, setShowAddSlotForm] = useState(false);
  const [addSlotCatId, setAddSlotCatId] = useState("");
  const [addSlotSkinName, setAddSlotSkinName] = useState("");
  
  const [isAddingSlot, setIsAddingSlot] = useState(false);
  const [deletingCatId, setDeletingCatId] = useState<string | null>(null);
  const [scrollToCatId, setScrollToCatId] = useState<string | null>(null);
  const catRefs = useRef<Map<string, HTMLDivElement>>(new Map());

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

  // Scroll to newly created category
  useEffect(() => {
    if (scrollToCatId && categories) {
      const el = catRefs.current.get(scrollToCatId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setScrollToCatId(null);
      }
    }
  }, [scrollToCatId, categories]);

  // Collect all used skin IDs (saved + pending)
  const getAllUsedSkinIds = useCallback(() => {
    const used = new Map<string, string>(); // skinId -> category label
    categories?.forEach((cat) => {
      cat.slots.forEach((slot) => {
        const pending = pendingChanges.get(slot.id);
        const skinId = pending !== undefined ? pending.skinId : slot.skin_id;
        if (skinId) used.set(skinId, cat.label);
      });
    });
    return used;
  }, [categories, pendingChanges]);

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

      // Check for duplicate skin across all slots
      const usedSkins = getAllUsedSkinIds();
      if (usedSkins.has(skinId)) {
        toast.error(`⚠️ Essa skin já está sendo usada na categoria "${usedSkins.get(skinId)}"!`);
        return;
      }

      setPendingChanges((prev) => {
        const next = new Map(prev);
        next.set(modalSlotId, { skinId, preview });
        return next;
      });
      setModalSlotId(null);
      setModalCategoryKey(undefined);
    },
    [modalSlotId, getAllUsedSkinIds]
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
        toast.error(`Erro ao salvar ${errors.length} slot(s).`);
        return;
      }
      setPendingChanges(new Map());
      queryClient.invalidateQueries({ queryKey: ["admin-categories-slots"] });
      queryClient.invalidateQueries({ queryKey: ["showcase-skins"] });
      toast.success("Configuração salva e publicada!");
    } catch (err: any) {
      toast.error(`Erro inesperado: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  }, [pendingChanges, queryClient]);

  const handleAddSlot = useCallback(async () => {
    if (!addSlotCatId || !addSlotSkinName.trim()) return;

    setIsAddingSlot(true);
    try {
      const cat = categories?.find((c) => c.id === addSlotCatId);
      if (!cat) throw new Error("Categoria não encontrada");
      const newPos = cat.slot_count + 1;

      // Create the imported_skin entry
      const skinId = crypto.randomUUID();
      const { error: skinErr } = await supabase.from("imported_skins").insert({
        id: skinId,
        name: addSlotSkinName.trim(),
      });
      if (skinErr) throw skinErr;

      // Update category slot count
      await supabase.from("showcase_categories").update({ slot_count: newPos }).eq("id", cat.id);

      // Create the slot
      const { error: slotErr } = await supabase.from("showcase_slots").insert({
        category_id: cat.id,
        slot_position: newPos,
        skin_id: skinId,
      });
      if (slotErr) throw slotErr;

      setScrollToCatId(cat.id);
      queryClient.invalidateQueries({ queryKey: ["admin-categories-slots"] });
      queryClient.invalidateQueries({ queryKey: ["showcase-skins"] });
      toast.success(`Slot adicionado em "${cat.label}"!`);
      setAddSlotSkinName("");
      setAddSlotCatId("");
      setShowAddSlotForm(false);
    } catch (err: any) {
      toast.error(`Erro: ${err.message}`);
    } finally {
      setIsAddingSlot(false);
    }
  }, [addSlotCatId, addSlotSkinName, categories, queryClient]);

  const handleDeleteCategory = useCallback(async (catId: string, catLabel: string) => {
    if (!confirm(`Tem certeza que deseja remover a categoria "${catLabel}" e todos os seus slots?`)) return;
    setDeletingCatId(catId);
    try {
      const { error: slotsErr } = await supabase.from("showcase_slots").delete().eq("category_id", catId);
      if (slotsErr) throw slotsErr;
      const { error: catErr } = await supabase.from("showcase_categories").delete().eq("id", catId);
      if (catErr) throw catErr;

      // Clear pending changes for deleted slots
      setPendingChanges((prev) => {
        const cat = categories?.find((c) => c.id === catId);
        if (!cat) return prev;
        const next = new Map(prev);
        cat.slots.forEach((s) => next.delete(s.id));
        return next;
      });

      queryClient.invalidateQueries({ queryKey: ["admin-categories-slots"] });
      queryClient.invalidateQueries({ queryKey: ["showcase-skins"] });
      toast.success(`Categoria "${catLabel}" removida.`);
    } catch (err: any) {
      toast.error(`Erro: ${err.message}`);
    } finally {
      setDeletingCatId(null);
    }
  }, [categories, queryClient]);

  const handleDeleteSlot = useCallback(async (slotId: string, catId: string, slotPosition: number) => {
    if (!confirm(`Remover slot #${slotPosition}?`)) return;
    try {
      const { error } = await supabase.from("showcase_slots").delete().eq("id", slotId);
      if (error) throw error;
      // Update slot_count
      const cat = categories?.find((c) => c.id === catId);
      if (cat) {
        await supabase.from("showcase_categories").update({ slot_count: Math.max(0, cat.slot_count - 1) }).eq("id", catId);
      }
      setPendingChanges((prev) => { const next = new Map(prev); next.delete(slotId); return next; });
      queryClient.invalidateQueries({ queryKey: ["admin-categories-slots"] });
      queryClient.invalidateQueries({ queryKey: ["showcase-skins"] });
      toast.success(`Slot #${slotPosition} removido.`);
    } catch (err: any) {
      toast.error(`Erro: ${err.message}`);
    }
  }, [categories, queryClient]);


  // Count total published skins
  const publishedCount = useMemo(() => {
    if (!categories) return 0;
    const uniqueSkins = new Set<string>();
    categories.forEach((cat) => {
      cat.slots.forEach((slot) => {
        const effective = getEffectiveSlot(slot);
        if (effective.skin_id) uniqueSkins.add(effective.skin_id);
      });
    });
    return uniqueSkins.size;
  }, [categories, getEffectiveSlot]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }


  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Category management header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-foreground">
            Categorias & Slots
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({publishedCount} skin{publishedCount !== 1 ? "s" : ""} publicada{publishedCount !== 1 ? "s" : ""})
            </span>
          </h2>
        </div>
        {!showAddSlotForm && (
          <Button size="sm" variant="outline" onClick={() => setShowAddSlotForm(true)}>
            <Plus className="size-3 mr-1" />
            Adicionar Slot
          </Button>
        )}
      </div>

      {showAddSlotForm && (
        <div className="border border-border rounded-lg p-4 bg-card/60 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold">Adicionar slot</span>
              <p className="text-xs text-muted-foreground mt-0.5">Escolha a categoria e informe o nome da skin.</p>
            </div>
            <Button size="sm" variant="ghost" onClick={() => setShowAddSlotForm(false)}>
              <X className="size-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Categoria</label>
              <select
                value={addSlotCatId}
                onChange={(e) => setAddSlotCatId(e.target.value)}
                className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Selecione...</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Nome da skin</label>
              <Input
                placeholder="AWP Dragon Lore"
                value={addSlotSkinName}
                onChange={(e) => setAddSlotSkinName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              size="sm"
              onClick={handleAddSlot}
              disabled={isAddingSlot || !addSlotCatId || !addSlotSkinName.trim()}
            >
              {isAddingSlot ? <Loader2 className="size-3 mr-1 animate-spin" /> : <Plus className="size-3 mr-1" />}
              {isAddingSlot ? "Adicionando..." : "Adicionar slot"}
            </Button>
          </div>
        </div>
      )}

      {/* Sticky save bar */}
      {hasPendingChanges && (
        <div className="sticky top-0 z-50 bg-amber-950/90 border border-amber-500/40 backdrop-blur-sm rounded-lg p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
          <span className="text-sm text-amber-200 font-medium">
            ⚠️ {pendingChanges.size} alteração(ões) não salva(s)
          </span>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button size="sm" variant="outline" onClick={handleDiscard} disabled={isSaving} className="border-amber-500/40 text-amber-200 hover:bg-amber-900/50 flex-1 sm:flex-none">
              <Undo2 className="size-3 mr-1" />
              Descartar
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isSaving} className="bg-amber-500 text-black hover:bg-amber-400 flex-1 sm:flex-none">
              {isSaving ? <Loader2 className="size-3 mr-1 animate-spin" /> : <Save className="size-3 mr-1" />}
              {isSaving ? "Salvando..." : "Salvar e publicar"}
            </Button>
          </div>
        </div>
      )}

      {categories?.map((cat) => {
        const effectiveSlots = cat.slots.map(getEffectiveSlot);
        const filledCount = effectiveSlots.filter((s) => s.skin_id).length;
        const isDeleting = deletingCatId === cat.id;

        return (
          <div key={cat.id} ref={(el) => { if (el) catRefs.current.set(cat.id, el); }} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-foreground">
                {cat.label}{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  ({filledCount}/{cat.slot_count} preenchidos)
                </span>
              </h3>
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs"
                  onClick={async () => {
                    const newPos = cat.slot_count + 1;
                    try {
                      await supabase.from("showcase_categories").update({ slot_count: newPos }).eq("id", cat.id);
                      await supabase.from("showcase_slots").insert({ category_id: cat.id, slot_position: newPos });
                      queryClient.invalidateQueries({ queryKey: ["admin-categories-slots"] });
                      toast.success(`Slot #${newPos} adicionado!`);
                    } catch (err: any) {
                      toast.error(`Erro: ${err.message}`);
                    }
                  }}
                >
                  <Plus className="size-3 mr-1" />
                  Slot
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:text-destructive h-8 w-8 p-0"
                  onClick={() => handleDeleteCategory(cat.id, cat.label)}
                  disabled={isDeleting}
                >
                  {isDeleting ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {effectiveSlots.map((slot) => {
                const isPending = pendingChanges.has(slot.id);
                return (
                  <div
                    key={slot.id}
                    className={`border rounded-lg overflow-hidden bg-card/60 transition-colors ${
                      isPending ? "border-amber-500 ring-1 ring-amber-500/30" : "border-border"
                    }`}
                  >
                    {slot.imported_skins ? (
                      <>
                        <div className="aspect-square bg-muted/20 relative">
                          {slot.imported_skins.image && (
                            <img src={slot.imported_skins.image} alt={slot.imported_skins.name} className="w-full h-full object-contain" loading="lazy" />
                          )}
                          <span className="absolute top-1 left-1 text-[9px] font-bold bg-background/80 px-1.5 py-0.5 rounded">#{slot.slot_position}</span>
                          {isPending && (
                            <span className="absolute top-1 right-1 text-[9px] font-bold bg-amber-500 text-black px-1.5 py-0.5 rounded">Não salvo</span>
                          )}
                        </div>
                        <div className="p-2 space-y-1">
                          <p className="text-xs font-semibold truncate">{slot.imported_skins.weapon_name}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{slot.imported_skins.pattern_name}</p>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="flex-1 h-9 sm:h-8 text-[11px] sm:text-[10px] min-w-[44px]" onClick={() => { setModalSlotId(slot.id); setModalCategoryKey(cat.key); }}>
                              <RefreshCw className="size-3 mr-1" />
                              Trocar
                            </Button>
                            <Button size="sm" variant="ghost" className="h-9 sm:h-8 w-9 sm:w-8 px-0 text-muted-foreground hover:text-foreground min-w-[44px]" onClick={() => handleRemove(slot.id)} title="Limpar skin">
                              <Undo2 className="size-3.5 sm:size-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-9 sm:h-8 w-9 sm:w-8 px-0 text-destructive min-w-[44px]" onClick={() => handleDeleteSlot(slot.id, cat.id, slot.slot_position)} title="Remover slot">
                              <X className="size-3.5 sm:size-3" />
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full aspect-[3/4] flex flex-col items-center justify-center gap-2 min-h-[120px] relative">
                        <button
                          onClick={() => { setModalSlotId(slot.id); setModalCategoryKey(cat.key); }}
                          className="flex-1 w-full flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground hover:bg-accent/30 transition-colors"
                        >
                          <ImagePlus className="size-6" />
                          <span className="text-xs">Slot #{slot.slot_position}</span>
                          <span className="text-[10px]">Clique para adicionar</span>
                        </button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-1 right-1 h-7 w-7 p-0 text-destructive"
                          onClick={() => handleDeleteSlot(slot.id, cat.id, slot.slot_position)}
                          title="Remover slot"
                        >
                          <X className="size-3.5" />
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <SkinSearchModal open={!!modalSlotId} onClose={() => { setModalSlotId(null); setModalCategoryKey(undefined); }} onSelect={handleSelect} categoryKey={modalCategoryKey} />
    </div>
  );
}
