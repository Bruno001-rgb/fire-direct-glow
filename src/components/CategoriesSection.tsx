import { useState } from "react";
import { Star, Loader2 } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { useShowcaseSkins, type ShowcaseSkin } from "@/hooks/useShowcaseSkins";

const WHATSAPP_URL = "https://chat.whatsapp.com/JYNmohUbdnI4eppUVBCeMK";

const tabs = [
  { key: "todas", label: "Todas" },
  { key: "facas", label: "Facas" },
  { key: "luvas", label: "Luvas" },
  { key: "rifles", label: "Rifles" },
  { key: "snipers", label: "Snipers" },
] as const;

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

const SkinCard = ({ item, onSelect }: { item: ShowcaseSkin; onSelect: (s: ShowcaseSkin) => void }) => (
  <div
    onClick={() => onSelect(item)}
    className="group relative flex flex-col overflow-hidden rounded-xl border border-primary/15 bg-card/60 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_-4px_hsl(var(--primary)/0.35)] cursor-pointer"
  >
    {/* Badge */}
    <div className="absolute top-2 right-2 z-10">
      <span className="px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-bold uppercase tracking-wider bg-primary/90 text-primary-foreground">
        Disponível
      </span>
    </div>

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

    {/* Negociar button */}
    <div className="px-3 pb-3 sm:px-4 sm:pb-4">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-primary/10 border border-primary/30 text-secondary text-[10px] sm:text-[11px] font-bold uppercase tracking-wider group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
      >
        <WhatsAppIcon className="size-3" />
        Negociar
      </a>
    </div>

    {/* Rarity bar */}
    <div className={`h-[3px] w-full ${rarityColor[item.rarity] || "bg-muted"}`} />
  </div>
);

import SkinViewerModal from "@/components/SkinViewerModal";

const CategoriesSection = () => {
  const [activeTab, setActiveTab] = useState<string>("todas");
  const [selectedSkin, setSelectedSkin] = useState<ShowcaseSkin | null>(null);
  const { data: allSkins, isLoading } = useShowcaseSkins();

  const filtered = activeTab === "todas"
    ? (allSkins || [])
    : (allSkins || []).filter((s) => s.category === activeTab);

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
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="section-heading font-heading">
              Catálogo <span className="text-gradient-fire">premium</span>
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">Escolha sua skin e negocie direto no WhatsApp</p>
          </div>
          <Button variant="fire" size="sm" className="uppercase tracking-wider text-[11px] h-9 shrink-0 rounded-sm" asChild>
            <a href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20ver%20o%20cat%C3%A1logo%20completo!" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-3.5" />
              Ver catálogo completo
            </a>
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-6 sm:mb-8 overflow-x-auto pb-1 scrollbar-hide border-b border-primary/10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative pb-3 text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-300 whitespace-nowrap ${
                activeTab === tab.key
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="size-8 animate-spin text-muted-foreground" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground text-sm">
            Nenhuma skin configurada ainda. Acesse <a href="/admin" className="text-primary underline">/admin</a> para configurar.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((item, i) => (
              <SkinCard key={`${item.name}-${item.skin}-${i}`} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
