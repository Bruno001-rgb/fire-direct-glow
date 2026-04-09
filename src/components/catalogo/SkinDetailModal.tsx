import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import type { ByMykelSkin } from "@/hooks/useByMykelSkins";
import { useLoadout, LOADOUT_SLOTS, type SlotKey } from "@/contexts/LoadoutContext";
import { toast } from "sonner";

const WEAR_TIERS = [
  { label: "Factory New", short: "FN", min: 0, max: 0.07, color: "hsl(142 71% 45%)" },
  { label: "Minimal Wear", short: "MW", min: 0.07, max: 0.15, color: "hsl(48 96% 53%)" },
  { label: "Field-Tested", short: "FT", min: 0.15, max: 0.38, color: "hsl(25 95% 53%)" },
  { label: "Well-Worn", short: "WW", min: 0.38, max: 0.45, color: "hsl(0 72% 51%)" },
  { label: "Battle-Scarred", short: "BS", min: 0.45, max: 1.0, color: "hsl(0 60% 40%)" },
] as const;

function getWearTier(float: number) {
  return WEAR_TIERS.find((t) => float >= t.min && float < t.max) ?? WEAR_TIERS[4];
}

function getWearFilter(float: number) {
  const brightness = 1 - float * 0.15;
  const contrast = 1 - float * 0.08;
  const saturate = 1 - float * 0.2;
  return `brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`;
}

interface Props {
  skin: ByMykelSkin | null;
  onClose: () => void;
}

export default function SkinDetailModal({ skin, onClose }: Props) {
  const { addToSlot } = useLoadout();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [floatValue, setFloatValue] = useState(0);
  const touchStartY = useRef(0);

  const minFloat = skin?.min_float ?? 0;
  const maxFloat = skin?.max_float ?? 1;

  useEffect(() => {
    if (skin) setFloatValue(skin.min_float ?? 0);
  }, [skin]);

  const availableTiers = useMemo(
    () => WEAR_TIERS.filter((t) => t.min < maxFloat && t.max > minFloat),
    [minFloat, maxFloat]
  );

  const currentTier = getWearTier(floatValue);

  useEffect(() => {
    if (!skin) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [skin, onClose]);

  useEffect(() => {
    if (!skin) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [skin]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
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
    `Olá, quero consultar a skin ${skin.name} com float ${floatValue.toFixed(2)}.`
  );

  const handleAddToLoadout = () => {
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

  const handleTierClick = (tier: typeof WEAR_TIERS[number]) => {
    const clampedMin = Math.max(tier.min, minFloat);
    const clampedMax = Math.min(tier.max, maxFloat);
    setFloatValue(Math.round(((clampedMin + clampedMax) / 2) * 100) / 100);
  };

  const hasFloat = skin.min_float != null && skin.max_float != null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-stretch bg-background animate-in fade-in duration-250"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-4 right-4 z-20 p-3 rounded-full bg-muted/80 hover:bg-muted transition-colors backdrop-blur-sm"
      >
        <X className="size-5 text-foreground" />
      </button>

      <div
        className="flex flex-col md:grid md:grid-cols-2 w-full h-full overflow-y-auto md:overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image column */}
        <div
          className="relative flex items-center justify-center min-h-[40vh] md:min-h-0 md:h-full p-8 md:p-16"
          style={{
            background: `radial-gradient(circle at center, ${rarityColor}20 0%, transparent 70%)`,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={skin.image}
            alt={skin.name}
            className="max-h-[30vh] md:max-h-[70vh] w-auto object-contain transition-all duration-300 drop-shadow-2xl"
            style={{
              transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              filter: hasFloat ? getWearFilter(floatValue) : undefined,
            }}
          />
        </div>

        {/* Info column */}
        <div className="flex-1 md:h-full md:overflow-y-auto md:border-l border-border/30 bg-card/40">
          <div className="flex flex-col gap-5 p-6 md:p-12 md:justify-center md:min-h-full">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">{skin.name}</h2>

            {skin.price != null && (
              <p className="text-2xl md:text-3xl font-extrabold text-primary">
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
              {hasFloat && (
                <>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded font-mono"
                    style={{ background: currentTier.color + "25", color: currentTier.color }}
                  >
                    {floatValue.toFixed(2)}
                  </span>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded"
                    style={{ background: currentTier.color + "25", color: currentTier.color }}
                  >
                    {currentTier.label}
                  </span>
                </>
              )}
            </div>

            <div className="h-px bg-border/50" />

            {/* Float/Wear selector */}
            {hasFloat && (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Desgaste / Float
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {WEAR_TIERS.map((tier) => {
                    const available = availableTiers.includes(tier);
                    const active = currentTier === tier;
                    return (
                      <button
                        key={tier.short}
                        disabled={!available}
                        onClick={() => handleTierClick(tier)}
                        className="text-[11px] font-bold px-2.5 py-1 rounded-md transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                        style={{
                          background: active ? tier.color + "30" : "hsl(var(--muted))",
                          color: active ? tier.color : "hsl(var(--muted-foreground))",
                          borderWidth: "1px",
                          borderColor: active ? tier.color + "50" : "transparent",
                        }}
                      >
                        {tier.short}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-1">
                  <Slider
                    value={[floatValue]}
                    min={minFloat}
                    max={maxFloat}
                    step={0.01}
                    onValueChange={([val]) => setFloatValue(val)}
                    className="[&_[data-radix-slider-track]]:h-2 [&_[data-radix-slider-track]]:bg-muted [&_[data-radix-slider-range]]:bg-primary [&_[data-radix-slider-thumb]]:border-primary [&_[data-radix-slider-thumb]]:bg-background [&_[data-radix-slider-thumb]]:h-5 [&_[data-radix-slider-thumb]]:w-5 [&_[data-radix-slider-thumb]]:shadow-[0_0_8px_hsl(var(--primary)/0.4)]"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                    <span>{minFloat.toFixed(2)}</span>
                    <span>{maxFloat.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            {skin.collections?.[0] && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Coleção</p>
                <p className="text-sm text-foreground">{skin.collections[0].name}</p>
              </div>
            )}

            <div className="flex gap-6">
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

            <div className="h-px bg-border/50" />

            <div className="flex flex-col gap-3 mt-auto pt-2">
              <Button variant="fire" className="w-full h-12 text-base" asChild>
                <a
                  href={`https://wa.me/?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="size-5" />
                  Consultar esta skin no WhatsApp
                </a>
              </Button>
              <Button variant="fire-outline" className="w-full h-12 text-base" onClick={handleAddToLoadout}>
                Adicionar ao loadout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
