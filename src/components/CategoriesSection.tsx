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

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20ver%20";

interface SkinItem {
  name: string;
  skin: string;
  rarity: string;
  image: string;
}

interface Category {
  title: string;
  description: string;
  query: string;
  button: string;
  items: SkinItem[];
}

const rarityStyles: Record<string, string> = {
  Covert: "border-red-500/30 text-red-400",
  Extraordinary: "border-yellow-500/30 text-yellow-400",
  Remarkable: "border-purple-400/30 text-purple-300",
  Exotic: "border-pink-400/30 text-pink-300",
};

const categories: Category[] = [
  {
    title: "FACAS",
    description: "Karambit, Butterfly, Talon, Skeleton e muito mais.",
    query: "facas",
    button: "Quero ver facas no WhatsApp",
    items: [
      { name: "Karambit", skin: "Fade", rarity: "Covert", image: knifeKarambit },
      { name: "Butterfly", skin: "Doppler", rarity: "Covert", image: knifeButterfly },
      { name: "Talon", skin: "Tiger Tooth", rarity: "Covert", image: knifeTalon },
      { name: "Skeleton", skin: "Crimson Web", rarity: "Extraordinary", image: knifeSkeleton },
    ],
  },
  {
    title: "LUVAS",
    description: "Sport Gloves, Specialist Gloves, Driver Gloves e modelos raros.",
    query: "luvas",
    button: "Quero ver luvas no WhatsApp",
    items: [
      { name: "Sport Gloves", skin: "Vice", rarity: "Extraordinary", image: gloveSport },
      { name: "Specialist", skin: "Crimson Kimono", rarity: "Extraordinary", image: gloveSpecialist },
      { name: "Driver Gloves", skin: "King Snake", rarity: "Remarkable", image: gloveDriver },
      { name: "Moto Gloves", skin: "Cool Mint", rarity: "Exotic", image: gloveMoto },
    ],
  },
];

const SkinCard = ({ item }: { item: SkinItem }) => (
  <a
    href={`${WHATSAPP_URL}${encodeURIComponent(item.name + " " + item.skin)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex flex-col items-center p-3 sm:p-4 rounded-lg hover:bg-primary/5 transition-colors duration-300"
  >
    <div className="aspect-square w-full overflow-hidden rounded-lg mb-3">
      <img
        src={item.image}
        alt={`${item.name} ${item.skin}`}
        loading="lazy"
        width={512}
        height={512}
        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <p className="text-xs sm:text-sm font-bold tracking-wide text-center">{item.name}</p>
    <p className="text-[10px] sm:text-[11px] text-muted-foreground text-center mt-0.5">{item.skin}</p>
    <span className={`mt-1.5 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${rarityStyles[item.rarity] || "border-border text-muted-foreground"}`}>
      {item.rarity}
    </span>
  </a>
);

const CategoryShowcase = ({ category }: { category: Category }) => (
  <div className="glass-card-glow overflow-hidden">
    {/* Header */}
    <div className="p-5 sm:p-6 border-b border-primary/8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-black font-heading tracking-wider text-gradient-fire">
            {category.title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">{category.description}</p>
        </div>
        <Button variant="whatsapp" size="sm" className="uppercase tracking-wider text-[11px] shrink-0 h-9" asChild>
          <a href={`${WHATSAPP_URL}${category.query}`} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-3.5" />
            {category.button}
          </a>
        </Button>
      </div>
    </div>

    {/* Items */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-primary/5 p-2 sm:p-3">
      {category.items.map((item) => (
        <SkinCard key={item.name} item={item} />
      ))}
    </div>
  </div>
);

const CategoriesSection = () => {
  return (
    <section id="catalogo" className="py-16 sm:py-20 relative overflow-hidden bg-cinematic">
      <div className="watermark -top-8 -right-16 -rotate-12 opacity-60">SKINS</div>

      <div className="container relative z-10">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="section-heading font-heading">
            Categorias <span className="text-gradient-fire">em destaque</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">Escolha a categoria e fale direto com a gente</p>
        </div>

        <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <CategoryShowcase key={cat.title} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
