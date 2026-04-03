import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

import knifeKarambit from "@/assets/knife-karambit.jpg";
import knifeButterfly from "@/assets/knife-butterfly.jpg";
import knifeTalon from "@/assets/knife-talon.jpg";
import knifeSkeleton from "@/assets/knife-skeleton.jpg";
import gloveSport from "@/assets/glove-sport.jpg";
import gloveSpecialist from "@/assets/glove-specialist.jpg";
import gloveDriver from "@/assets/glove-driver.jpg";
import gloveMoto from "@/assets/glove-moto.jpg";
import skinAk47 from "@/assets/skin-ak47.jpg";
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
  { name: "Karambit", skin: "Fade", category: "facas", rarity: "Covert", image: knifeKarambit },
  { name: "Butterfly", skin: "Doppler", category: "facas", rarity: "Covert", image: knifeButterfly },
  { name: "Talon", skin: "Tiger Tooth", category: "facas", rarity: "Covert", image: knifeTalon },
  { name: "Skeleton", skin: "Crimson Web", category: "facas", rarity: "Extraordinary", image: knifeSkeleton },
  { name: "Sport Gloves", skin: "Vice", category: "luvas", rarity: "Extraordinary", image: gloveSport },
  { name: "Specialist", skin: "Crimson Kimono", category: "luvas", rarity: "Extraordinary", image: gloveSpecialist },
  { name: "Driver Gloves", skin: "King Snake", category: "luvas", rarity: "Remarkable", image: gloveDriver },
  { name: "Moto Gloves", skin: "Cool Mint", category: "luvas", rarity: "Exotic", image: gloveMoto },
  { name: "AK-47", skin: "Asiimov", category: "rifles", rarity: "Covert", image: skinAk47 },
  { name: "M4A4", skin: "Howl", category: "rifles", rarity: "Contraband", image: skinM4a4 },
  { name: "AWP", skin: "Dragon Lore", category: "snipers", rarity: "Contraband", image: skinAwp },
];

const tabs = [
  { key: "todas", label: "Todas" },
  { key: "facas", label: "Facas" },
  { key: "luvas", label: "Luvas" },
  { key: "rifles", label: "Rifles" },
  { key: "snipers", label: "Snipers" },
] as const;

const rarityStyles: Record<string, string> = {
  Covert: "text-red-400 border-red-500/30",
  Contraband: "text-secondary border-secondary/30",
  Extraordinary: "text-secondary border-secondary/30",
  Remarkable: "text-purple-300 border-purple-400/30",
  Exotic: "text-pink-300 border-pink-400/30",
};

const SkinCard = ({ item }: { item: SkinItem }) => (
  <a
    href={`${WHATSAPP_URL}${encodeURIComponent(item.name + " " + item.skin)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="group glass-card-glow overflow-hidden flex flex-col"
  >
    <div className="aspect-square overflow-hidden relative bg-card/50">
      <img
        src={item.image}
        alt={`${item.name} ${item.skin}`}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-50" />
      <span className={`absolute top-2 right-2 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-background/70 backdrop-blur-sm border ${rarityStyles[item.rarity] || "border-border text-muted-foreground"}`}>
        {item.rarity}
      </span>
    </div>
    <div className="p-3 sm:p-4 flex flex-col flex-1">
      <p className="text-xs sm:text-sm font-bold tracking-wide">{item.name}</p>
      <p className="text-[10px] sm:text-[11px] text-muted-foreground mt-0.5">{item.skin}</p>
      <div className="mt-auto pt-3">
        <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-whatsapp uppercase tracking-wider">
          <MessageCircle className="size-3" />
          Negociar
        </span>
      </div>
    </div>
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
          {filtered.map((item) => (
            <SkinCard key={`${item.name}-${item.skin}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
