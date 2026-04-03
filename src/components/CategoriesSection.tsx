import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import knivesImg from "@/assets/knives.jpg";
import glovesImg from "@/assets/gloves.jpg";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20ver%20";

const categories = [
  { title: "FACAS", description: "Karambit, Butterfly, M9 Bayonet e mais", image: knivesImg, query: "facas" },
  { title: "LUVAS", description: "Sport Gloves, Driver Gloves e mais", image: glovesImg, query: "luvas" },
];

const CategoriesSection = () => {
  return (
    <section id="catalogo" className="py-24 relative overflow-hidden bg-cinematic">
      {/* Watermark */}
      <div className="watermark -top-10 -right-20 -rotate-12">SKINS</div>

      <div className="container relative z-10">
        <div className="text-center mb-14">
          <h2 className="section-heading font-heading">
            Categorias <span className="text-gradient-fire">em destaque</span>
          </h2>
          <p className="mt-3 text-muted-foreground">Escolha a categoria e fale direto com a gente</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <a
              key={cat.title}
              href={`${WHATSAPP_URL}${cat.query}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-card-glow overflow-hidden"
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  width={640}
                  height={640}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-2xl font-bold font-heading tracking-wider">{cat.title}</h3>
                <p className="text-sm text-muted-foreground">{cat.description}</p>
                <Button variant="whatsapp-outline" size="sm" className="w-full uppercase tracking-wider text-xs">
                  <MessageCircle className="size-4" />
                  Ver {cat.title}
                </Button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
