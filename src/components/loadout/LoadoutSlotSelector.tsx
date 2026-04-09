import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useCatalogSkins } from "@/hooks/useCatalogSkins";
import { useLoadout, LOADOUT_SLOTS, type SlotKey } from "@/contexts/LoadoutContext";

interface Props {
  slotKey: SlotKey | null;
  onClose: () => void;
}

export default function LoadoutSlotSelector({ slotKey, onClose }: Props) {
  const { data: skins } = useByMykelSkins();
  const { addToSlot } = useLoadout();
  const [search, setSearch] = useState("");

  const slot = LOADOUT_SLOTS.find((s) => s.key === slotKey);

  const filtered = useMemo(() => {
    if (!skins || !slot) return [];
    let list = skins;
    // Filter by weapon type
    if (slot.weaponFilter === "knife") {
      list = list.filter((s) => s.category?.name === "Knives");
    } else if (slot.weaponFilter === "gloves") {
      list = list.filter((s) => s.category?.name === "Gloves");
    } else {
      list = list.filter((s) => s.weapon?.name === slot.weaponFilter);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q));
    }
    return list.slice(0, 50);
  }, [skins, slot, search]);

  const handleSelect = (skin: (typeof filtered)[0]) => {
    if (slotKey) {
      addToSlot(slotKey, skin);
      onClose();
      setSearch("");
    }
  };

  return (
    <Sheet open={!!slotKey} onOpenChange={(open) => { if (!open) { onClose(); setSearch(""); } }}>
      <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Selecionar {slot?.label}</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar skin..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-muted border-border"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[50vh] overflow-y-auto">
            {filtered.map((skin) => (
              <button
                key={skin.id}
                onClick={() => handleSelect(skin)}
                className="flex flex-col items-center gap-1 p-2 rounded-lg border border-border hover:border-primary bg-card transition-colors"
              >
                <img src={skin.image} alt={skin.name} className="h-16 object-contain" loading="lazy" />
                <p className="text-[11px] font-semibold text-foreground text-center truncate w-full">
                  {skin.name}
                </p>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full text-center text-muted-foreground py-8">Nenhuma skin encontrada.</p>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
