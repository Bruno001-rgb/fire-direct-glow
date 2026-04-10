import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Loader2, GripVertical } from "lucide-react";
import SkinSearchModal from "./SkinSearchModal";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface CatalogSkinRow {
  skin_id: string;
  sort_order: number;
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

function SortableSkinCard({
  item,
  onRemove,
}: {
  item: CatalogSkinRow;
  onRemove: (skinId: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.skin_id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : undefined,
  };

  const skin = item.imported_skins;
  if (!skin) return null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group rounded-lg border border-border p-2 flex flex-col items-center gap-1"
    >
      <button
        {...attributes}
        {...listeners}
        className="absolute top-1 left-1 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground z-10"
      >
        <GripVertical className="size-4" />
      </button>
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
        onClick={() => onRemove(item.skin_id)}
      >
        <Trash2 className="size-3.5 text-destructive" />
      </Button>
    </div>
  );
}

export default function CatalogManager() {
  const [searchOpen, setSearchOpen] = useState(false);
  const queryClient = useQueryClient();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const { data: catalogSkins, isLoading } = useQuery({
    queryKey: ["admin-catalog-skins"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("catalog_skins")
        .select(`
          skin_id,
          sort_order,
          imported_skins:skin_id (
            id, name, weapon_name, pattern_name, image, rarity_name, rarity_color
          )
        `)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data || []) as unknown as CatalogSkinRow[];
    },
  });

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !catalogSkins) return;

    const oldIndex = catalogSkins.findIndex((s) => s.skin_id === active.id);
    const newIndex = catalogSkins.findIndex((s) => s.skin_id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(catalogSkins, oldIndex, newIndex);

    // Optimistic update
    queryClient.setQueryData(["admin-catalog-skins"], reordered);

    // Batch update sort_order
    const updates = reordered.map((item, idx) => ({
      skin_id: item.skin_id,
      sort_order: idx + 1,
    }));

    for (const u of updates) {
      await supabase
        .from("catalog_skins")
        .update({ sort_order: u.sort_order })
        .eq("skin_id", u.skin_id);
    }

    queryClient.invalidateQueries({ queryKey: ["admin-catalog-skins"] });
    queryClient.invalidateQueries({ queryKey: ["catalog-skins"] });
    queryClient.invalidateQueries({ queryKey: ["showcase-skins"] });
  };

  const handleAdd = async (
    skinId: string,
    preview: { name: string; weapon_name: string | null; pattern_name: string | null; image: string | null; rarity_name: string | null; price: number | null }
  ) => {
    const { data: existing } = await supabase
      .from("catalog_skins")
      .select("id")
      .eq("skin_id", skinId)
      .maybeSingle();

    if (existing) {
      toast.info("Essa skin já está no catálogo.");
      return;
    }

    const { data: inShowcase } = await supabase
      .from("showcase_slots")
      .select("id")
      .eq("skin_id", skinId)
      .maybeSingle();

    if (inShowcase) {
      toast.info("Essa skin já está na vitrine (e aparece no catálogo automaticamente).");
      return;
    }

    // Get max sort_order
    const maxOrder = catalogSkins?.length
      ? Math.max(...catalogSkins.map((s) => s.sort_order))
      : 0;

    const { error } = await supabase
      .from("catalog_skins")
      .insert({ skin_id: skinId, sort_order: maxOrder + 1 });

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
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={catalogSkins.map((s) => s.skin_id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {catalogSkins.map((item) => (
                <SortableSkinCard key={item.skin_id} item={item} onRemove={handleRemove} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <SkinSearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={handleAdd}
      />
    </div>
  );
}
