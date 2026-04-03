import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import skinAk47 from "@/assets/skin-ak47.jpg";
import skinAwp from "@/assets/skin-awp.jpg";
import skinM4a4 from "@/assets/skin-m4a4.jpg";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20tenho%20interesse%20na%20skin%20";

const skins = [
  { name: "AK-47 | Asiimov", category: "Rifle", image: skinAk47 },
  { name: "AWP | Dragon Lore", category: "Sniper", image: skinAwp },
  { name: "M4A4 | Howl", category: "Rifle", image: skinM4a4 },
];

const FeaturedSkins = () => {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Skins <span className="text-gradient-fire">premium</span>
          </h2>
          <p className="mt-3 text-muted-foreground">Itens selecionados para você</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {skins.map((skin) => (
            <div key={skin.name} className="glass-card overflow-hidden group hover:border-primary/40 transition-all duration-300">
              <div className="aspect-square overflow-hidden bg-background/50">
                <img
                  src={skin.image}
                  alt={skin.name}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-3">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">{skin.category}</span>
                <h3 className="text-lg font-bold">{skin.name}</h3>
                <Button variant="whatsapp" size="sm" className="w-full" asChild>
                  <a href={`${WHATSAPP_URL}${encodeURIComponent(skin.name)}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="size-4" />
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
