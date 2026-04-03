import { MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroKnife from "@/assets/hero-knife.jpg";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20skins%20CS2!";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center pt-16 pb-12 overflow-hidden bg-cinematic">
      {/* Ambient glows */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-[100px] animate-smoke" />
      <div className="absolute bottom-20 right-10 w-56 h-56 bg-accent/4 rounded-full blur-[80px] animate-smoke" style={{ animationDelay: "-8s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[130px]" />

      <div className="watermark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-50">
        FIRESKINS
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image first on mobile for visual impact */}
          <div className="relative flex justify-center lg:order-2">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-60 h-60 bg-accent/8 rounded-full blur-[60px]" />
            </div>
            <div className="relative animate-float w-full max-w-sm lg:max-w-md">
              <img
                src={heroKnife}
                alt="Skin premium CS2"
                width={1280}
                height={720}
                className="w-full rounded-xl glow-orange border border-primary/15"
              />
            </div>
          </div>

          {/* Text */}
          <div className="text-center lg:text-left space-y-5 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest">
              🔥 Skins CS2 Premium
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.4rem] font-black leading-[1.05] tracking-tight uppercase font-heading">
              Compre, venda e faça upgrade das suas skins{" "}
              <span className="text-gradient-fire">com atendimento rápido e seguro.</span>
            </h1>

            <p className="text-base text-muted-foreground max-w-md mx-auto lg:mx-0 leading-relaxed">
              Facas, luvas e skins premium de CS2 com negociação direta no WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-1">
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
