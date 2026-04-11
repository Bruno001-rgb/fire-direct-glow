import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useWhatsAppUrl } from "@/hooks/useWhatsAppUrl";
import type { ByMykelSkin } from "@/hooks/useByMykelSkins";
import { useLoadout, LOADOUT_SLOTS, type SlotKey } from "@/contexts/LoadoutContext";
import { toast } from "sonner";
import TryInGameModal, { canTryInGame } from "@/components/catalogo/TryInGameModal";

/* ── Related skins ── */
function RelatedSkins({
  skin,
  allSkins,
  onSelect,
}: {
  skin: ByMykelSkin;
  allSkins: ByMykelSkin[];
  onSelect: (s: ByMykelSkin) => void;
}) {
  const related = useMemo(() => {
    const collectionName = skin.collections?.[0]?.name;
    let pool = allSkins.filter(
      (s) => s.id !== skin.id && collectionName && s.collections?.[0]?.name === collectionName
    );
    if (pool.length < 12) {
      const weaponPool = allSkins.filter(
        (s) => s.id !== skin.id && s.weapon?.name === skin.weapon?.name && !pool.find((p) => p.id === s.id)
      );
      pool = [...pool, ...weaponPool];
    }
    return pool.slice(0, 12);
  }, [skin, allSkins]);

  if (related.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
        Skins relacionadas
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {related.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s)}
            className="group flex flex-col items-center gap-1 p-2 rounded-lg bg-muted/30 hover:bg-muted/60 transition-colors cursor-pointer"
          >
            <img
              src={s.image}
              alt={s.name}
              loading="lazy"
              className="h-12 w-auto object-contain group-hover:scale-105 transition-transform"
            />
            <span className="text-[10px] text-muted-foreground text-center line-clamp-2 leading-tight">
              {s.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

interface Props {
  skin: ByMykelSkin | null;
  onClose: () => void;
  allSkins?: ByMykelSkin[];
  onSkinChange?: (skin: ByMykelSkin) => void;
}

export default function SkinDetailModal({ skin, onClose, allSkins = [], onSkinChange }: Props) {
  const { addToSlot } = useLoadout();
  const whatsappUrl = useWhatsAppUrl();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [origin, setOrigin] = useState({ x: "50%", y: "50%" });
  const [showTryModal, setShowTryModal] = useState(false);
  const touchStartY = useRef(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const originalRect = useRef<DOMRect | null>(null);

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

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    originalRect.current = e.currentTarget.getBoundingClientRect();
    setIsHovering(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    const rect = originalRect.current;
    if (!rect) return;
    const pctX = ((e.clientX - rect.left) / rect.width) * 100;
    const pctY = ((e.clientY - rect.top) / rect.height) * 100;
    const clampedX = Math.max(0, Math.min(100, pctX));
    const clampedY = Math.max(0, Math.min(100, pctY));
    const tiltStrength = 8;
    const x = (clampedX / 100 - 0.5) * tiltStrength;
    const y = (clampedY / 100 - 0.5) * -tiltStrength;
    setTilt({ x: y, y: x });
    setOrigin({ x: `${clampedX}%`, y: `${clampedY}%` });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
    originalRect.current = null;
  }, []);

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
    `Olá, quero consultar a skin ${skin.name}.`
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

  const handleSelectRelated = (s: ByMykelSkin) => {
    onSkinChange?.(s);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-stretch bg-background animate-in fade-in duration-250"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
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
        {/* Info column */}
        <div className="order-2 md:order-1 flex-1 md:h-full md:overflow-y-auto md:border-r border-border/30 bg-card/40">
          <div className="flex flex-col gap-4 p-5 pb-8 md:gap-5 md:p-12 md:min-h-full">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">{skin.name}</h2>

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

            <div className="h-px bg-border/50" />

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

            {skin.description && (
              <>
                <div className="h-px bg-border/50" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1.5">Lore</p>
                  <p className="text-sm italic text-muted-foreground leading-relaxed">
                    "{skin.description}"
                  </p>
                </div>
              </>
            )}

            {allSkins.length > 0 && (
              <>
                <div className="h-px bg-border/50" />
                <RelatedSkins skin={skin} allSkins={allSkins} onSelect={handleSelectRelated} />
              </>
            )}

            <div className="h-px bg-border/50" />

            <div className="flex flex-col gap-3 pt-2">
              <Button variant="fire" className="w-full h-12 text-base" asChild>
                <a
                  href={`${whatsappUrl}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="size-5" />
                  Consultar esta skin no WhatsApp
                </a>
              </Button>
              {canTryInGame(skin) && (
                <button
                  onClick={() => setShowTryModal(true)}
                  className="relative w-full overflow-hidden rounded-lg group cursor-pointer"
                >
                  <img
                    src="/images/cs2-banner.avif"
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
                  <div className="relative z-10 flex items-center gap-4 p-4 md:p-5">
                    <img src="/images/cs2-icon.png" alt="CS2" className="flex-shrink-0 size-10 rounded-full object-cover" />
                    <div className="flex-1 text-left">
                      <p className="text-sm md:text-base font-bold text-white">Jogue com a skin antes de comprá-la!</p>
                      <p className="text-[11px] md:text-xs text-white/60">Inicie o servidor e faça um test drive no jogo</p>
                    </div>
                    <span className="flex-shrink-0 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-bold group-hover:brightness-110 transition-all">
                      Entrar
                    </span>
                  </div>
                </button>
              )}
              <Button variant="fire-outline" className="w-full h-12 text-base" onClick={handleAddToLoadout}>
                Adicionar ao loadout
              </Button>
            </div>
          </div>
        </div>

        {/* Image column */}
        <div
          className="order-1 md:order-2 relative flex items-center justify-center min-h-[30vh] md:min-h-0 md:h-full p-4 md:p-16 overflow-hidden"
          style={{
            background: `radial-gradient(circle at center, ${rarityColor}20 0%, transparent 70%)`,
          }}
        >
          <img
            ref={imgRef}
            src={skin.image}
            alt={skin.name}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="max-h-[25vh] md:max-h-[70vh] w-auto object-contain drop-shadow-2xl cursor-zoom-in"
            style={{
              willChange: 'transform',
              transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovering ? 1.8 : 1})`,
              transformOrigin: `${origin.x} ${origin.y}`,
              transition: isHovering ? 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />
        </div>
      </div>

      {showTryModal && (
        <TryInGameModal
          skin={skin}
          floatValue={skin.min_float ?? 0}
          onClose={() => setShowTryModal(false)}
        />
      )}
    </div>
  );
}
