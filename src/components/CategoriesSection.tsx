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
  Covert: "border-red-500/40 text-red-400",
  Extraordinary: "border-yellow-500/40 text-yellow-400",
  "Remarkable": "border-purple-400/40 text-purple-300",
  Exotic: "border-pink-400/40 text-pink-300",
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

const CategoryShowcase = ({ category }: { category: Category }) => {
  return (
    <div className="glass-card-glow overflow-hidden">
      {/* Header */}
      <div className="p-6 sm:p-8 pb-4 sm:pb-6 border-b border-primary/10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading tracking-wider text-gradient-fire">
              {category.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
          </div>
          <Button variant="whatsapp" size="sm" className="uppercase tracking-wider text-xs shrink-0" asChild>
            <a href={`${WHATSAPP_URL}${category.query}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" />
              {category.button}
            </a>
          </Button>
        </div>
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4">
        {category.items.map((item) => (
          <a
            key={item.name}
            href={`${WHATSAPP_URL}${encodeURIComponent(item.name + " " + item.skin)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative border-r border-b border-primary/5 last:border-r-0 [&:nth-child(2)]:border-r-0 sm:[&:nth-child(2)]:border-r [&:nth-child(4)]:border-r-0 hover:bg-primary/5 transition-colors duration-300"
          >
            {/* Image */}
            <div className="aspect-square overflow-hidden relative p-4">
              <img
                src={item.image}
                alt={`${item.name} ${item.skin}`}
                loading="lazy"
                width={512}
                height={512}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
              />
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
            </div>

            {/* Info */}
            <div className="px-3 pb-4 space-y-1 text-center">
              <p className="text-xs font-bold tracking-wide truncate">{item.name}</p>
              <p className="text-[11px] text-muted-foreground truncate">{item.skin}</p>
              <span className={`inline-block text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${rarityStyles[item.rarity] || "border-border text-muted-foreground"}`}>
                {item.rarity}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

const CategoriesSection = () => {
  return (
    <section id="catalogo" className="py-24 relative overflow-hidden bg-cinematic">
      <div className="watermark -top-10 -right-20 -rotate-12">SKINS</div>

      <div className="container relative z-10">
        <div className="text-center mb-14">
          <h2 className="section-heading font-heading">
            Categorias <span className="text-gradient-fire">em destaque</span>
          </h2>
          <p className="mt-3 text-muted-foreground">Escolha a categoria e fale direto com a gente</p>
        </div>

        <div className="space-y-10 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <CategoryShowcase key={cat.title} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
