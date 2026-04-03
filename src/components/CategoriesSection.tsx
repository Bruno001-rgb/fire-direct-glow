import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SkinCard, { type SkinItem } from "@/components/catalog/SkinCard";
import CatalogFilters from "@/components/catalog/CatalogFilters";

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

const allSkins: SkinItem[] = [
  { name: "Talon Knife", skin: "Doppler", category: "facas", rarity: "Covert", image: knifeTalonDoppler },
  { name: "Talon Knife", skin: "Fade", category: "facas", rarity: "Covert", image: knifeTalonFade },
  { name: "Talon Knife", skin: "Case Hardened", category: "facas", rarity: "Covert", image: knifeTalonCaseHardened },
  { name: "Talon Knife", skin: "Tiger Tooth", category: "facas", rarity: "Covert", image: knifeTalon },
  { name: "Karambit", skin: "Fade", category: "facas", rarity: "Covert", image: knifeKarambitFade },
  { name: "Karambit", skin: "Lore", category: "facas", rarity: "Covert", image: knifeKarambitLore },
  { name: "Karambit", skin: "Gamma Doppler", category: "facas", rarity: "Covert", image: knifeKarambitGamma },
  { name: "Karambit", skin: "Doppler", category: "facas", rarity: "Covert", image: knifeKarambitDoppler },
  { name: "Skeleton Knife", skin: "Doppler", category: "facas", rarity: "Covert", image: knifeSkeletonDoppler },
  { name: "Skeleton Knife", skin: "Tiger Tooth", category: "facas", rarity: "Covert", image: knifeSkeletonTigerTooth },
  { name: "Skeleton Knife", skin: "Fade", category: "facas", rarity: "Covert", image: knifeSkeletonFade },
  { name: "Skeleton Knife", skin: "Case Hardened", category: "facas", rarity: "Covert", image: knifeSkeletonCaseHardened },
  { name: "Butterfly Knife", skin: "Fade", category: "facas", rarity: "Covert", image: knifeButterflyFade },
  { name: "Butterfly Knife", skin: "Gamma Doppler", category: "facas", rarity: "Covert", image: knifeButterflyGamma },
  { name: "Butterfly Knife", skin: "Doppler", category: "facas", rarity: "Covert", image: knifeButterflyDoppler },
  { name: "Butterfly Knife", skin: "Lore", category: "facas", rarity: "Covert", image: knifeButterflyLore },
  { name: "Sport Gloves", skin: "Vice", category: "luvas", rarity: "Extraordinary", image: gloveSport },
  { name: "Sport Gloves", skin: "Pandora's Box", category: "luvas", rarity: "Extraordinary", image: gloveSportPandora },
  { name: "Sport Gloves", skin: "Hedge Maze", category: "luvas", rarity: "Extraordinary", image: gloveSportHedge },
  { name: "Sport Gloves", skin: "Superconductor", category: "luvas", rarity: "Extraordinary", image: gloveSportSuperconductor },
  { name: "Specialist Gloves", skin: "Crimson Kimono", category: "luvas", rarity: "Extraordinary", image: gloveSpecialist },
  { name: "Specialist Gloves", skin: "Emerald Web", category: "luvas", rarity: "Extraordinary", image: gloveSpecialistEmerald },
  { name: "Specialist Gloves", skin: "Fade", category: "luvas", rarity: "Extraordinary", image: gloveSpecialistFade },
  { name: "Specialist Gloves", skin: "Foundation", category: "luvas", rarity: "Remarkable", image: gloveSpecialistFoundation },
  { name: "Driver Gloves", skin: "King Snake", category: "luvas", rarity: "Remarkable", image: gloveDriver },
  { name: "Driver Gloves", skin: "Lunar Weave", category: "luvas", rarity: "Remarkable", image: gloveDriverLunar },
  { name: "Driver Gloves", skin: "Crimson Weave", category: "luvas", rarity: "Remarkable", image: gloveDriverCrimson },
  { name: "Driver Gloves", skin: "Imperial Plaid", category: "luvas", rarity: "Remarkable", image: gloveDriverImperial },
  { name: "Driver Gloves", skin: "Snow Leopard", category: "luvas", rarity: "Remarkable", image: gloveDriverSnow },
  { name: "Hand Wraps", skin: "Cobalt Skulls", category: "luvas", rarity: "Extraordinary", image: gloveHandwrapsCobalt },
  { name: "Hand Wraps", skin: "Overprint", category: "luvas", rarity: "Remarkable", image: gloveHandwrapsOverprint },
  { name: "AK-47", skin: "Asiimov", category: "rifles", rarity: "Covert", image: skinAk47 },
  { name: "AK-47", skin: "Slaughter", category: "rifles", rarity: "Covert", image: skinAk47Slaughter },
  { name: "AK-47", skin: "CAUTION!", category: "rifles", rarity: "Classified", image: skinAk47Caution },
  { name: "M4A4", skin: "Howl", category: "rifles", rarity: "Contraband", image: skinM4a4 },
  { name: "AWP", skin: "Dragon Lore", category: "snipers", rarity: "Contraband", image: skinAwp },
];

const CategoriesSection = () => {
  const [activeTab, setActiveTab] = useState<string>("todas");

  const filtered = activeTab === "todas"
    ? allSkins
    : allSkins.filter((s) => s.category === activeTab);

  return (
    <section id="catalogo" className="py-10 sm:py-14 relative overflow-hidden">
      {/* Deep purple cinematic background */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, hsl(265 40% 6%) 0%, hsl(265 35% 4%) 50%, hsl(225 30% 4%) 100%)"
      }} />

      {/* Geometric wireframe Karambit silhouette */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none overflow-hidden">
        <svg viewBox="0 0 800 600" className="absolute right-[-10%] top-[10%] w-[70%] h-auto" fill="none">
          <path d="M400 100 L550 200 L600 350 L500 500 L350 480 L280 350 L300 200 Z" stroke="hsl(22 91% 47%)" strokeWidth="1" />
          <path d="M420 130 L540 220 L580 340 L490 470 L360 455 L300 340 L320 220 Z" stroke="hsl(38 92% 49%)" strokeWidth="0.5" />
          <path d="M400 100 L600 350" stroke="hsl(254 55% 52%)" strokeWidth="0.3" />
          <path d="M550 200 L350 480" stroke="hsl(254 55% 52%)" strokeWidth="0.3" />
          <path d="M600 350 L280 350" stroke="hsl(22 91% 47%)" strokeWidth="0.3" />
          <path d="M500 500 L300 200" stroke="hsl(38 92% 49%)" strokeWidth="0.3" />
          <circle cx="400" cy="100" r="3" fill="hsl(22 91% 47%)" opacity="0.4" />
          <circle cx="600" cy="350" r="3" fill="hsl(38 92% 49%)" opacity="0.4" />
          <circle cx="500" cy="500" r="2" fill="hsl(254 55% 52%)" opacity="0.3" />
        </svg>
      </div>

      {/* Radial glows */}
      <div className="absolute top-0 left-[20%] w-[500px] h-[400px] rounded-full blur-[180px]"
        style={{ background: "radial-gradient(ellipse, hsla(22, 91%, 47%, 0.06) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-[10%] w-[400px] h-[350px] rounded-full blur-[160px]"
        style={{ background: "radial-gradient(ellipse, hsla(254, 55%, 52%, 0.05) 0%, transparent 70%)" }} />
      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, hsl(265 40% 4% / 0.6) 100%)" }} />

      {/* Top separator glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-primary/[0.03] to-transparent" />

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

        {/* Mobile tabs */}
        <div className="lg:hidden flex gap-6 mb-6 overflow-x-auto pb-1 scrollbar-hide border-b border-accent/20">
          {["todas", "facas", "luvas", "rifles", "snipers"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-3 text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 whitespace-nowrap ${
                activeTab === tab
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "todas" ? "Todas" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
              )}
            </button>
          ))}
        </div>

        {/* Two-column layout: grid + filters */}
        <div className="flex gap-6">
          {/* Main grid */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {filtered.map((item, i) => (
                <SkinCard key={`${item.name}-${item.skin}-${i}`} item={item} />
              ))}
            </div>
          </div>

          {/* Desktop filter sidebar */}
          <CatalogFilters activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      {/* Bottom separator glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  );
};

export default CategoriesSection;
