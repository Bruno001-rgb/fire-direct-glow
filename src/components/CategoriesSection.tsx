import { useMemo } from "react";
import { Star, Loader2, ArrowRight } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { useShowcaseSkins, type ShowcaseSkin } from "@/hooks/useShowcaseSkins";

const WHATSAPP_URL = "https://chat.whatsapp.com/JYNmohUbdnI4eppUVBCeMK";

const rarityColor: Record<string, string> = {
  Covert: "bg-red-500",
  Contraband: "bg-amber-500",
  Extraordinary: "bg-fuchsia-500",
  Remarkable: "bg-purple-500",
  Exotic: "bg-pink-500",
  Classified: "bg-rose-500",
  "Mil-Spec Grade": "bg-blue-500",
  Restricted: "bg-indigo-500",
  Industrial: "bg-cyan-500",
  Consumer: "bg-gray-500",
};

const rarityText: Record<string, string> = {
  Covert: "text-red-400",
  Contraband: "text-amber-400",
  Extraordinary: "text-fuchsia-400",
  Remarkable: "text-purple-400",
  Exotic: "text-pink-400",
  Classified: "text-rose-400",
  "Mil-Spec Grade": "text-blue-400",
  Restricted: "text-indigo-400",
  Industrial: "text-cyan-400",
  Consumer: "text-gray-400",
};

const SkinCard = ({ item }: { item: ShowcaseSkin }) => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative flex flex-col overflow-hidden rounded-xl border border-primary/10 bg-card/60 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_-4px_hsl(var(--primary)/0.15)]"
  >

    {/* Image */}
    <div className="aspect-[4/3] overflow-hidden relative bg-gradient-to-br from-background/80 to-card">
      <img
        src={item.image}
        alt={`${item.name} ${item.skin}`}
        loading="lazy"
        width={512}
        height={512}
        className="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-70 pointer-events-none" />
    </div>

    {/* Info */}
    <div className="p-3 sm:p-4 flex flex-col gap-1 flex-1">
      <div className="flex items-center gap-1.5">
        <Star className="size-3 sm:size-3.5 text-primary fill-primary flex-shrink-0" />
        <p className="text-xs sm:text-sm font-extrabold text-primary tracking-wide truncate">{item.name}</p>
      </div>
      <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">{item.skin}</p>
      <div className="flex items-center justify-between mt-auto pt-2">
        <span className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-widest ${rarityText[item.rarity] || "text-muted-foreground"}`}>
          {item.rarity}
        </span>
      </div>
    </div>

    {/* Negociar button - hidden on desktop, visible on hover; always visible on mobile */}
    <div className="px-3 pb-3 sm:px-4 sm:pb-4 md:opacity-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
      <span className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-gradient-to-br from-[#E95A0C] to-[#C94A08] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-lg shadow-primary/15 group-hover:shadow-xl group-hover:shadow-primary/25 group-hover:scale-[1.02] transition-all duration-300 ease-out">
        <WhatsAppIcon className="size-3" />
        Negociar
      </span>
    </div>

    {/* Rarity bar */}
    <div className={`h-[3px] w-full ${rarityColor[item.rarity] || "bg-muted"}`} />
  </a>
);

const CategoriesSection = () => {
  const { data: allSkins, isLoading } = useShowcaseSkins();

  // Pick one skin per weapon name (first occurrence)
  const uniqueWeaponSkins = useMemo(() => {
    if (!allSkins) return [];
    const seen = new Set<string>();
    return allSkins.filter((s) => {
      const key = s.name;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [allSkins]);

  return (
    <section id="catalogo" className="py-6 sm:py-8 relative overflow-hidden">
      {/* Cinematic background layers */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full blur-[160px]"
        style={{ background: "radial-gradient(ellipse, hsla(22, 91%, 47%, 0.04) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[350px] rounded-full blur-[140px]"
        style={{ background: "radial-gradient(ellipse, hsla(254, 55%, 52%, 0.04) 0%, transparent 70%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 50%, hsl(0 0% 0% / 0.4) 100%)" }} />

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="section-heading font-heading">
            Confira <span className="text-gradient-fire">Nossas Skins</span>
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">Skins para todos os estilos e bolsos</p>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="size-8 animate-spin text-muted-foreground" />
          </div>
        ) : uniqueWeaponSkins.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground text-sm">
            Nenhuma skin configurada ainda. Acesse <a href="/admin" className="text-primary underline">/admin</a> para configurar.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {uniqueWeaponSkins.map((item, i) => (
                <SkinCard key={`${item.name}-${item.skin}-${i}`} item={item} />
              ))}
            </div>

            {/* Big CTA */}
            <div className="mt-10 sm:mt-14 flex justify-center">
              <Button
                variant="fire"
                size="lg"
                className="text-sm sm:text-base px-8 sm:px-12 py-6 sm:py-7 uppercase tracking-widest font-extrabold gap-3"
                asChild
              >
                <a href="/catalogo">
                  <span>Ver catálogo completo</span>
                  <ArrowRight className="size-5" />
                </a>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
