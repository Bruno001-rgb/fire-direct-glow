import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AmbientParticles from "@/components/AmbientParticles";
import heroKnife from "@/assets/hero-knife.jpg";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20skins%20CS2!";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroKnife} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, hsl(0 0% 0% / 0.8) 100%)" }} />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[180px]"
        style={{ background: "radial-gradient(ellipse, hsla(22,91%,47%,0.1) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-[600px] h-[500px] rounded-full blur-[160px]"
        style={{ background: "radial-gradient(ellipse, hsla(254,55%,52%,0.08) 0%, transparent 70%)" }} />

      <AmbientParticles />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-5">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-none tracking-tight uppercase font-heading">
          <span className="text-gradient-fire">Fire</span>
          <span className="text-foreground">Skins</span>
        </h1>

        <p className="text-sm sm:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
          Skins na velocidade do fogo. Compre, venda e faça upgrade do seu arsenal.
        </p>

        <Button variant="whatsapp" size="lg" className="text-sm sm:text-base px-10 h-13 uppercase tracking-wider font-bold shadow-[0_0_30px_hsla(142,70%,45%,0.25)] mt-2" asChild>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-5" />
            Explorar Skins
          </a>
        </Button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
