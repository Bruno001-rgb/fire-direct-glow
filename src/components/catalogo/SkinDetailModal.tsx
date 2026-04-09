import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import type { ByMykelSkin } from "@/hooks/useByMykelSkins";
import { useLoadout, LOADOUT_SLOTS, type SlotKey } from "@/contexts/LoadoutContext";
import { toast } from "sonner";

const WHATSAPP_URL = "https://chat.whatsapp.com/JYNmohUbdnI4eppUVBCeMK";

interface Props {
  skin: ByMykelSkin | null;
  onClose: () => void;
}

export default function SkinDetailModal({ skin, onClose }: Props) {
  const { addToSlot } = useLoadout();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);

  // Close on Escape
  useEffect(() => {
    if (!skin) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [skin, onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (!skin) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [skin]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30; // max 15deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
    setTilt({ x: y, y: x });
  }, []);

  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientY - touchStartY.current;
    if (diff > 100) onClose();
  }, [onClose]);

  if (!skin) return null;

  const rarityColor = skin.rarity?.color || "#888";

  const whatsappMsg = encodeURIComponent(
    `Olá! Tenho interesse na skin ${skin.name}. Pode me passar mais informações?`
  );

  const handleAddToLoadout = () => {
    // Find matching slot
    const slot = LOADOUT_SLOTS.find((s) => {
      if (s.weaponFilter === "knife") return skin.category?.name === "Knives";
      if (s.weaponFilter === "gloves") return skin.category?.name === "Gloves";
      return skin.weapon?.name === s.weaponFilter;
    });
    if (slot) {
      addToSlot(slot.key as SlotKey, skin);
      toast.success(`${skin.name} adicionada ao loadout (${slot.label})`);
    } else {
      toast.info("Essa skin não corresponde a nenhum slot do loadout.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 animate-in fade-in duration-250"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="relative w-full h-full md:h-auto md:max-h-[90vh] md:max-w-4xl md:rounded-xl overflow-y-auto bg-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
        >
          <X className="size-5" />
        </button>

        <div className="md:grid md:grid-cols-2 gap-0">
          {/* Image column */}
          <div
            ref={imgRef}
            className="flex items-center justify-center p-8 md:p-12 min-h-[300px]"
            style={{
              background: `radial-gradient(circle at center, ${rarityColor}25 0%, transparent 70%)`,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={skin.image}
              alt={skin.name}
              className="max-h-64 md:max-h-80 object-contain transition-transform duration-150"
              style={{
                transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
            />
          </div>

          {/* Info column */}
          <div className="p-6 md:p-8 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-foreground">{skin.name}</h2>

            {skin.price != null && (
              <p className="text-2xl font-extrabold text-primary">
                R$ {skin.price.toFixed(2).replace(".", ",")}
              </p>
            )}

            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-xs font-bold px-2 py-1 rounded"
                style={{ background: rarityColor + "30", color: rarityColor }}
              >
                {skin.rarity?.name}
              </span>
              {skin.stattrak && (
                <span className="text-xs font-bold px-2 py-1 rounded bg-primary/20 text-primary">
                  StatTrak™
                </span>
              )}
            </div>

            <div className="h-px bg-border" />

            {/* Float range */}
            {skin.min_float != null && skin.max_float != null && (
              <div className="space-y-1.5">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Float Range</p>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-foreground font-mono">{skin.min_float.toFixed(4)}</span>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        marginLeft: `${skin.min_float * 100}%`,
                        width: `${(skin.max_float - skin.min_float) * 100}%`,
                        background: rarityColor,
                      }}
                    />
                  </div>
                  <span className="text-foreground font-mono">{skin.max_float.toFixed(4)}</span>
                </div>
              </div>
            )}

            {skin.collections?.[0] && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Coleção</p>
                <p className="text-sm text-foreground">{skin.collections[0].name}</p>
              </div>
            )}

            <div className="flex gap-4">
              {skin.category && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Categoria</p>
                  <p className="text-sm text-foreground">{skin.category.name}</p>
                </div>
              )}
              {skin.weapon && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Arma</p>
                  <p className="text-sm text-foreground">{skin.weapon.name}</p>
                </div>
              )}
            </div>

            <div className="h-px bg-border" />

            <div className="flex flex-col gap-2 mt-auto">
              <Button variant="fire" className="w-full" asChild>
                <a
                  href={`https://wa.me/?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="size-4" />
                  Tenho interesse — falar no WhatsApp
                </a>
              </Button>
              <Button variant="fire-outline" className="w-full" onClick={handleAddToLoadout}>
                Adicionar ao loadout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
