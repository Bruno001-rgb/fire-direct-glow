import { useState } from "react";
import { X, Crosshair } from "lucide-react";
import { useLoadout, LOADOUT_SLOTS, type SlotKey } from "@/contexts/LoadoutContext";
import LoadoutSlotSelector from "./LoadoutSlotSelector";

export default function LoadoutGrid() {
  const { loadout, removeFromSlot } = useLoadout();
  const [selectingSlot, setSelectingSlot] = useState<SlotKey | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {LOADOUT_SLOTS.map((slot) => {
          const skin = loadout[slot.key];
          return (
            <div
              key={slot.key}
              className="relative rounded-lg border border-border bg-card overflow-hidden"
            >
              {skin ? (
                <div className="p-3 flex flex-col items-center gap-2">
                  <div
                    className="h-1 w-full rounded-t"
                    style={{ background: skin.rarity?.color || "#888" }}
                  />
                  <img
                    src={skin.image}
                    alt={skin.name}
                    className="h-24 object-contain"
                  />
                  <p className="text-xs font-bold text-foreground text-center truncate w-full">
                    {skin.name}
                  </p>
                  <span
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                    style={{
                      background: (skin.rarity?.color || "#888") + "30",
                      color: skin.rarity?.color || "#888",
                    }}
                  >
                    {skin.rarity?.name}
                  </span>
                  <button
                    onClick={() => removeFromSlot(slot.key)}
                    className="absolute top-2 right-2 p-1 rounded bg-muted/80 hover:bg-destructive/20 transition-colors"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSelectingSlot(slot.key)}
                  className="w-full p-6 flex flex-col items-center gap-2 hover:bg-muted/30 transition-colors"
                >
                  <Crosshair className="size-8 text-muted-foreground" />
                  <p className="text-sm font-semibold text-muted-foreground">{slot.label}</p>
                  <p className="text-xs text-muted-foreground">Selecionar skin</p>
                </button>
              )}
            </div>
          );
        })}
      </div>

      <LoadoutSlotSelector
        slotKey={selectingSlot}
        onClose={() => setSelectingSlot(null)}
      />
    </>
  );
}
