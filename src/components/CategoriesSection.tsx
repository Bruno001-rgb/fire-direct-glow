import { useState } from "react";
import { MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// Facas
import knifeKarambitFade from "@/assets/knife-karambit-fade.jpg";
import knifeKarambitLore from "@/assets/knife-karambit-lore.jpg";
import knifeKarambitGamma from "@/assets/knife-karambit-gamma.jpg";
import knifeKarambitDoppler from "@/assets/knife-karambit-doppler.jpg";
import knifeButterflyFade from "@/assets/knife-butterfly-fade.jpg";
import knifeButterflyGamma from "@/assets/knife-butterfly-gamma.jpg";
import knifeButterflyDoppler from "@/assets/knife-butterfly-doppler.jpg";
import knifeButterflyLore from "@/assets/knife-butterfly-lore.jpg";
import knifeTalonDoppler from "@/assets/knife-talon-doppler.jpg";
import knifeTalonFade from "@/assets/knife-talon-fade.jpg";
import knifeTalonCaseHardened from "@/assets/knife-talon-casehardened.jpg";
import knifeTalon from "@/assets/knife-talon.jpg";
import knifeSkeletonDoppler from "@/assets/knife-skeleton-doppler.jpg";
import knifeSkeletonTigerTooth from "@/assets/knife-skeleton-tigertooth.jpg";
import knifeSkeletonFade from "@/assets/knife-skeleton-fade.jpg";
import knifeSkeletonCaseHardened from "@/assets/knife-skeleton-casehardened.jpg";

// Luvas
import gloveSport from "@/assets/glove-sport.jpg";
import gloveSportPandora from "@/assets/glove-sport-pandora.jpg";
import gloveSportHedge from "@/assets/glove-sport-hedge.jpg";
import gloveSportSuperconductor from "@/assets/glove-sport-superconductor.jpg";
import gloveSpecialist from "@/assets/glove-specialist.jpg";
import gloveSpecialistEmerald from "@/assets/glove-specialist-emerald.jpg";
import gloveSpecialistFade from "@/assets/glove-specialist-fade.jpg";
import gloveSpecialistFoundation from "@/assets/glove-specialist-foundation.jpg";
import gloveDriver from "@/assets/glove-driver.jpg";
import gloveDriverLunar from "@/assets/glove-driver-lunar.jpg";
import gloveDriverCrimson from "@/assets/glove-driver-crimson.jpg";
import gloveDriverImperial from "@/assets/glove-driver-imperial.jpg";
import gloveDriverSnow from "@/assets/glove-driver-snow.jpg";
import gloveHandwrapsCobalt from "@/assets/glove-handwraps-cobalt.jpg";
import gloveHandwrapsOverprint from "@/assets/glove-handwraps-overprint.jpg";

// Rifles & Snipers
import skinAk47 from "@/assets/skin-ak47.jpg";
import skinAk47Slaughter from "@/assets/skin-ak47-slaughter.jpg";
import skinAk47Caution from "@/assets/skin-ak47-caution.jpg";
import skinAwp from "@/assets/skin-awp.jpg";
import skinM4a4 from "@/assets/skin-m4a4.jpg";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20tenho%20interesse%20na%20skin%20";

interface SkinItem {
  name: string;
  skin: string;
  category: "facas" | "luvas" | "rifles" | "snipers";
  rarity: string;
  image: string;
}

const allSkins: SkinItem[] = [
  // Facas — Talon
  { name: "Talon Knife", skin: "Doppler", category: "facas", rarity: "Covert", image: knifeTalonDoppler },
  { name: "Talon Knife", skin: "Fade", category: "facas", rarity: "Covert", image: knifeTalonFade },
  { name: "Talon Knife", skin: "Case Hardened", category: "facas", rarity: "Covert", image: knifeTalonCaseHardened },
  { name: "Talon Knife", skin: "Tiger Tooth", category: "facas", rarity: "Covert", image: knifeTalon },
  // Facas — Karambit
  { name: "Karambit", skin: "Fade", category: "facas", rarity: "Covert", image: knifeKarambitFade },
  { name: "Karambit", skin: "Lore", category: "facas", rarity: "Covert", image: knifeKarambitLore },
  { name: "Karambit", skin: "Gamma Doppler", category: "facas", rarity: "Covert", image: knifeKarambitGamma },
  { name: "Karambit", skin: "Doppler", category: "facas", rarity: "Covert", image: knifeKarambitDoppler },
  // Facas — Skeleton
  { name: "Skeleton Knife", skin: "Doppler", category: "facas", rarity: "Covert", image: knifeSkeletonDoppler },
  { name: "Skeleton Knife", skin: "Tiger Tooth", category: "facas", rarity: "Covert", image: knifeSkeletonTigerTooth },
  { name: "Skeleton Knife", skin: "Fade", category: "facas", rarity: "Covert", image: knifeSkeletonFade },
  { name: "Skeleton Knife", skin: "Case Hardened", category: "facas", rarity: "Covert", image: knifeSkeletonCaseHardened },
  // Facas — Butterfly
  { name: "Butterfly Knife", skin: "Fade", category: "facas", rarity: "Covert", image: knifeButterflyFade },
  { name: "Butterfly Knife", skin: "Gamma Doppler", category: "facas", rarity: "Covert", image: knifeButterflyGamma },
  { name: "Butterfly Knife", skin: "Doppler", category: "facas", rarity: "Covert", image: knifeButterflyDoppler },
  { name: "Butterfly Knife", skin: "Lore", category: "facas", rarity: "Covert", image: knifeButterflyLore },

  // Luvas — Sport
  { name: "Sport Gloves", skin: "Vice", category: "luvas", rarity: "Extraordinary", image: gloveSport },
  { name: "Sport Gloves", skin: "Pandora's Box", category: "luvas", rarity: "Extraordinary", image: gloveSportPandora },
  { name: "Sport Gloves", skin: "Hedge Maze", category: "luvas", rarity: "Extraordinary", image: gloveSportHedge },
  { name: "Sport Gloves", skin: "Superconductor", category: "luvas", rarity: "Extraordinary", image: gloveSportSuperconductor },
  // Luvas — Specialist
  { name: "Specialist Gloves", skin: "Crimson Kimono", category: "luvas", rarity: "Extraordinary", image: gloveSpecialist },
  { name: "Specialist Gloves", skin: "Emerald Web", category: "luvas", rarity: "Extraordinary", image: gloveSpecialistEmerald },
  { name: "Specialist Gloves", skin: "Fade", category: "luvas", rarity: "Extraordinary", image: gloveSpecialistFade },
  { name: "Specialist Gloves", skin: "Foundation", category: "luvas", rarity: "Remarkable", image: gloveSpecialistFoundation },
  // Luvas — Driver
  { name: "Driver Gloves", skin: "King Snake", category: "luvas", rarity: "Remarkable", image: gloveDriver },
  { name: "Driver Gloves", skin: "Lunar Weave", category: "luvas", rarity: "Remarkable", image: gloveDriverLunar },
  { name: "Driver Gloves", skin: "Crimson Weave", category: "luvas", rarity: "Remarkable", image: gloveDriverCrimson },
  { name: "Driver Gloves", skin: "Imperial Plaid", category: "luvas", rarity: "Remarkable", image: gloveDriverImperial },
  { name: "Driver Gloves", skin: "Snow Leopard", category: "luvas", rarity: "Remarkable", image: gloveDriverSnow },
  // Luvas — Hand Wraps
  { name: "Hand Wraps", skin: "Cobalt Skulls", category: "luvas", rarity: "Extraordinary", image: gloveHandwrapsCobalt },
  { name: "Hand Wraps", skin: "Overprint", category: "luvas", rarity: "Remarkable", image: gloveHandwrapsOverprint },

  // Rifles
  { name: "AK-47", skin: "Asiimov", category: "rifles", rarity: "Covert", image: skinAk47 },
  { name: "AK-47", skin: "Slaughter", category: "rifles", rarity: "Covert", image: skinAk47Slaughter },
  { name: "AK-47", skin: "CAUTION!", category: "rifles", rarity: "Classified", image: skinAk47Caution },
  { name: "M4A4", skin: "Howl", category: "rifles", rarity: "Contraband", image: skinM4a4 },

  // Snipers
  { name: "AWP", skin: "Dragon Lore", category: "snipers", rarity: "Contraband", image: skinAwp },
];

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
};

const rarityText: Record<string, string> = {
  Covert: "text-red-400",
  Contraband: "text-amber-400",
  Extraordinary: "text-fuchsia-400",
  Remarkable: "text-purple-400",
  Exotic: "text-pink-400",
  Classified: "text-rose-400",
};

const SkinCard = ({ item }: { item: SkinItem }) => (
  <a
    href={`${WHATSAPP_URL}${encodeURIComponent(item.name + " " + item.skin)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative flex flex-col overflow-hidden rounded-xl border border-primary/15 bg-card/60 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_-4px_hsl(var(--primary)/0.35)]"
  >
    {/* Badge */}
    <div className="absolute top-2 right-2 z-10">
      <span className="px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-bold uppercase tracking-wider bg-primary/90 text-primary-foreground">
        Disponível
      </span>
    </div>

    {/* Image */}
    <div className="aspect-square overflow-hidden relative bg-gradient-to-br from-background/80 to-card">
      <img
        src={item.image}
        alt={`${item.name} ${item.skin}`}
        loading="lazy"
        width={512}
        height={512}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-70" />
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

    {/* Negociar button — always visible */}
    <div className="px-3 pb-3 sm:px-4 sm:pb-4">
      <span className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-whatsapp/10 border border-whatsapp/30 text-whatsapp text-[10px] sm:text-[11px] font-bold uppercase tracking-wider group-hover:bg-whatsapp group-hover:text-whatsapp-foreground transition-all duration-300">
        <MessageCircle className="size-3" />
        Negociar
      </span>
    </div>

    {/* Rarity bar */}
    <div className={`h-[3px] w-full ${rarityColor[item.rarity] || "bg-muted"}`} />
  </a>
);

const CategoriesSection = () => {
  const [activeTab, setActiveTab] = useState<string>("todas");

  const filtered = activeTab === "todas"
    ? allSkins
    : allSkins.filter((s) => s.category === activeTab);

  return (
    <section id="catalogo" className="py-10 sm:py-14 relative overflow-hidden">
      <div className="container relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="section-heading font-heading">
              Catálogo <span className="text-gradient-fire">premium</span>
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">Escolha sua skin e negocie direto no WhatsApp</p>
          </div>
          <Button variant="whatsapp" size="sm" className="uppercase tracking-wider text-[11px] h-9 shrink-0" asChild>
            <a href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20ver%20o%20cat%C3%A1logo%20completo!" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-3.5" />
              Ver catálogo completo
            </a>
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 sm:mb-8 overflow-x-auto pb-1 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 sm:px-5 py-2 rounded-lg text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-card/50 text-muted-foreground border border-primary/10 hover:border-primary/25 hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((item, i) => (
            <SkinCard key={`${item.name}-${item.skin}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
