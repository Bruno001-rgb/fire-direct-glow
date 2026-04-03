import { MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroKnife from "@/assets/hero-knife.jpg";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20skins%20CS2!";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[75vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroKnife}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80" />
      </div>

      {/* Ambient glows */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/8 rounded-full blur-[100px] animate-smoke" />
      <div className="absolute bottom-10 right-20 w-56 h-56 bg-accent/5 rounded-full blur-[80px] animate-smoke" style={{ animationDelay: "-8s" }} />

      {/* Badge */}
      <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/25 text-primary text-[10px] sm:text-[11px] font-bold uppercase tracking-widest animate-pulse-glow">
          🔥 Novas skins disponíveis
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto space-y-5 pt-12">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-[3.2rem] font-black leading-[1.08] tracking-tight uppercase font-heading">
          Compre, venda e faça upgrade das suas skins{" "}
          <span className="text-gradient-fire">com atendimento rápido e seguro.</span>
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Facas, luvas e skins premium de CS2 com negociação direta no WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button variant="whatsapp" size="lg" className="text-sm px-7 h-12 uppercase tracking-wider font-bold" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-5" />
              Chamar no WhatsApp
            </a>
          </Button>
          <Button variant="outline" size="lg" className="text-sm px-7 h-12 border-primary/20 text-foreground/80 hover:bg-primary/5 hover:text-primary hover:border-primary/30 uppercase tracking-wider" asChild>
            <a href="#catalogo">
              Ver catálogo
              <ChevronDown className="size-4 ml-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
