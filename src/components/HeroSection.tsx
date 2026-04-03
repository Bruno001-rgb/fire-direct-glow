import { MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroKnife from "@/assets/hero-knife.jpg";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20skins%20CS2!";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-cinematic">
      {/* Smoke particles */}
      <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-primary/6 rounded-full blur-[120px] animate-smoke" />
      <div className="absolute bottom-20 right-10 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] animate-smoke" style={{ animationDelay: "-7s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[150px]" />

      {/* Watermark */}
      <div className="watermark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
        FIRESKINS
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest">
              🔥 Skins CS2 Premium
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight uppercase font-heading">
              As melhores skins
              <br />
              <span className="text-gradient-fire">direto no seu inventário</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
              Negocie skins de CS2 com segurança e agilidade. Atendimento direto pelo WhatsApp, sem complicação.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="whatsapp" size="lg" className="text-sm px-8 py-6 uppercase tracking-wider font-bold" asChild>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-5" />
                  Quero negociar agora
                </a>
              </Button>
              <Button variant="outline" size="lg" className="text-sm px-8 py-6 border-primary/30 text-foreground hover:bg-primary/10 hover:text-primary uppercase tracking-wider" asChild>
                <a href="#catalogo">
                  Ver catálogo
                  <ChevronDown className="size-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 bg-accent/10 rounded-full blur-[80px]" />
            </div>
            <div className="relative animate-float">
              <img
                src={heroKnife}
                alt="Skin premium CS2"
                width={1280}
                height={720}
                className="w-full max-w-lg rounded-2xl glow-orange border border-primary/20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
