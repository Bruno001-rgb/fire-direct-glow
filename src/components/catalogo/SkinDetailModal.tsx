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
  // subtle visual wear: FN = bright, BS = slightly darker/desaturated
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
  const imgRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);

  const minFloat = skin?.min_float ?? 0;
  const maxFloat = skin?.max_float ?? 1;

  // Reset float when skin changes
  useEffect(() => {
    if (skin) setFloatValue(skin.min_float ?? 0);
  }, [skin]);

  // Available wear tiers for this skin
  const availableTiers = useMemo(
    () => WEAR_TIERS.filter((t) => t.min < maxFloat && t.max > minFloat),
    [minFloat, maxFloat]
  );

  const currentTier = getWearTier(floatValue);

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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 animate-in fade-in duration-250"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="relative w-full h-full md:h-auto md:max-h-[90vh] md:max-w-4xl md:rounded-xl overflow-y-auto bg-card border border-border/50"
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
              className="max-h-64 md:max-h-80 object-contain transition-all duration-300"
              style={{
                transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                filter: hasFloat ? getWearFilter(floatValue) : undefined,
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

            <div className="h-px bg-border" />

            {/* Float/Wear selector */}
            {hasFloat && (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Desgaste / Float
                </p>

                {/* Wear tier chips */}
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

                {/* Slider */}
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
                  Consultar esta skin no WhatsApp
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
