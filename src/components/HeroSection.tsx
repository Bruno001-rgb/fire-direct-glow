import { MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import AmbientParticles from "@/components/AmbientParticles";
import heroKnife from "@/assets/hero-knife.jpg";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20skins%20CS2!";

const HeroSection = () => {
  return (
    <section className="relative min-h-[75vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Custom background — preserved */}
      <div className="absolute inset-0">
        <img
          src={heroKnife}
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Cinematic overlays on top of background */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/70" />
        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, hsl(225 30% 4% / 0.7) 100%)" }} />
      </div>

      {/* Warm orange radial glow — top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[160px]"
        style={{ background: "radial-gradient(ellipse, hsla(22, 91%, 47%, 0.08) 0%, transparent 70%)" }} />

      {/* Purple accent glow — bottom right */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full blur-[140px]"
        style={{ background: "radial-gradient(ellipse, hsla(254, 55%, 52%, 0.06) 0%, transparent 70%)" }} />

      {/* Gold accent glow — left */}
      <div className="absolute top-1/3 left-0 w-[400px] h-[300px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(ellipse, hsla(38, 92%, 49%, 0.05) 0%, transparent 70%)" }} />

      {/* Ambient smoke/particles */}
      <AmbientParticles />

      {/* Glowing top edge line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Badge */}
      <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/25 text-primary text-[10px] sm:text-[11px] font-bold uppercase tracking-widest animate-pulse-glow backdrop-blur-sm">
          🔥 Novas skins disponíveis
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto space-y-5 pt-12">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-[3.2rem] font-black leading-[1.08] tracking-tight uppercase font-heading drop-shadow-[0_2px_12px_hsla(22,91%,47%,0.25)]">
          Compre, venda e faça upgrade das suas skins{" "}
          <span className="text-gradient-fire">com atendimento rápido e seguro.</span>
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed drop-shadow-[0_1px_4px_hsla(225,30%,4%,0.8)]">
          Facas, luvas e skins premium de CS2 com negociação direta no WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button variant="whatsapp" size="lg" className="text-sm px-7 h-12 uppercase tracking-wider font-bold shadow-[0_0_30px_hsla(142,70%,45%,0.25)]" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-5" />
              Chamar no WhatsApp
            </a>
          </Button>
          <Button variant="outline" size="lg" className="text-sm px-7 h-12 border-primary/20 text-foreground/80 hover:bg-primary/5 hover:text-primary hover:border-primary/30 uppercase tracking-wider backdrop-blur-sm" asChild>
            <a href="#catalogo">
              Ver catálogo
              <ChevronDown className="size-4 ml-1" />
            </a>
          </Button>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
