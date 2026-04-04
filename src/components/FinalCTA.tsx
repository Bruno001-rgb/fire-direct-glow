import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Gem } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20negociar%20skins%20CS2!";

const trustItems = [
  { icon: Zap, label: "Resposta Imediata" },
  { icon: Shield, label: "Negociação Segura" },
  { icon: Gem, label: "Skins Verificadas" },
];

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Top fire line */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent 0%, #E95A0C 30%, #F5A006 50%, #E95A0C 70%, transparent 100%)" }} />

      <div className="relative py-24 sm:py-32 lg:py-40">
        {/* Background */}
        <div className="absolute inset-0 bg-background" />

        {/* Large radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full blur-[180px] opacity-30"
          style={{ background: "radial-gradient(ellipse, #E95A0C 0%, transparent 70%)" }}
        />

        {/* Secondary purple glow */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full blur-[150px] opacity-10"
          style={{ background: "radial-gradient(ellipse, #5A3DCC 0%, transparent 70%)" }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(233,90,12,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(233,90,12,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 20%, hsl(0 0% 0% / 0.6) 100%)" }} />

        {/* Content */}
        <div className="container relative z-10 text-center space-y-8 max-w-2xl mx-auto px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Online agora</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight uppercase font-heading leading-[1.05]">
            Pronto para dar{" "}
            <br className="sm:hidden" />
            upgrade{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #E95A0C, #F5A006)" }}>
              no seu inventário?
            </span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Fale agora com a FireSkins no WhatsApp e escolha sua próxima skin com atendimento exclusivo.
          </p>

          {/* CTA Button — larger */}
          <div className="pt-2">
            <Button
              variant="fire"
              size="lg"
              className="text-sm sm:text-base px-10 sm:px-14 h-13 sm:h-14 uppercase tracking-wider rounded-sm shadow-[0_0_40px_rgba(233,90,12,0.3)] hover:shadow-[0_0_60px_rgba(233,90,12,0.5)] transition-shadow duration-500"
              asChild
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-5 sm:size-6" />
                Chamar no WhatsApp
              </a>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4">
            {trustItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-muted-foreground">
                <item.icon className="size-4 text-primary/70" />
                <span className="text-xs sm:text-sm font-medium uppercase tracking-wider">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fire line */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent 0%, #E95A0C 30%, #F5A006 50%, #E95A0C 70%, transparent 100%)" }} />
    </section>
  );
};

export default FinalCTA;
