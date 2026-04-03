import { MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroKnife from "@/assets/hero-knife.jpg";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20skins%20CS2!";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              🔥 Skins CS2 Premium
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              As melhores skins
              <br />
              <span className="text-gradient-fire">direto no seu inventário</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
              Negocie skins de CS2 com segurança e agilidade. Atendimento direto pelo WhatsApp, sem complicação.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="whatsapp" size="lg" className="text-base px-8 py-6" asChild>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-5" />
                  Quero negociar agora
                </a>
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8 py-6 border-border/60" asChild>
                <a href="#catalogo">
                  Ver catálogo
                  <ChevronDown className="size-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex justify-center">
            <div className="relative animate-float">
              <img
                src={heroKnife}
                alt="Skin premium CS2"
                width={1280}
                height={720}
                className="w-full max-w-lg rounded-2xl glow-orange"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
