import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import skinAk47 from "@/assets/skin-ak47.jpg";
import skinAwp from "@/assets/skin-awp.jpg";
import skinM4a4 from "@/assets/skin-m4a4.jpg";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20tenho%20interesse%20na%20skin%20";

const skins = [
  { name: "AK-47 | Asiimov", category: "Rifle", rarity: "Covert", image: skinAk47 },
  { name: "AWP | Dragon Lore", category: "Sniper", rarity: "Contraband", image: skinAwp },
  { name: "M4A4 | Howl", category: "Rifle", rarity: "Contraband", image: skinM4a4 },
];

const rarityColor: Record<string, string> = { Covert: "text-primary", Contraband: "text-secondary" };

const FeaturedSkins = () => {
  return (
    <section className="py-16 sm:py-20 bg-cinematic-alt relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent/3 rounded-full blur-[100px] animate-smoke" />

      <div className="container relative z-10">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="section-heading font-heading">
            Skins <span className="text-gradient-fire">em destaque</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">Itens selecionados para você</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-4xl mx-auto">
          {skins.map((skin) => (
            <div key={skin.name} className="glass-card-glow overflow-hidden group">
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={skin.image}
                  alt={skin.name}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                <span className={`absolute top-3 right-3 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-background/70 backdrop-blur-sm border border-primary/15 ${rarityColor[skin.rarity] || "text-foreground"}`}>
                  {skin.rarity}
                </span>
              </div>
              <div className="p-4 sm:p-5 space-y-2.5">
                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.15em]">{skin.category}</span>
                <h3 className="text-base font-bold font-heading tracking-wide uppercase">{skin.name}</h3>
                <Button variant="whatsapp" size="sm" className="w-full uppercase tracking-wider text-[11px] h-9" asChild>
                  <a href={`${WHATSAPP_URL}${encodeURIComponent(skin.name)}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="size-3.5" />
                    Negociar
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSkins;
