import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import knivesImg from "@/assets/knives.jpg";
import glovesImg from "@/assets/gloves.jpg";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20ver%20";

const categories = [
  { title: "Facas", description: "Karambit, Butterfly, M9 Bayonet e mais", image: knivesImg, query: "facas" },
  { title: "Luvas", description: "Sport Gloves, Driver Gloves e mais", image: glovesImg, query: "luvas" },
];

const CategoriesSection = () => {
  return (
    <section id="catalogo" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Categorias <span className="text-gradient-fire">em destaque</span>
          </h2>
          <p className="mt-3 text-muted-foreground">Escolha a categoria e fale direto com a gente</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <a
              key={cat.title}
              href={`${WHATSAPP_URL}${cat.query}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-card overflow-hidden hover:border-primary/40 transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  width={640}
                  height={640}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-3">
                <h3 className="text-xl font-bold">{cat.title}</h3>
                <p className="text-sm text-muted-foreground">{cat.description}</p>
                <Button variant="whatsapp-outline" size="sm" className="w-full">
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
