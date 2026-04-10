import { ArrowRight, Shield, Zap, Tag } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import InteractiveKnife from "@/components/InteractiveKnife";
import heroKnife from "@/assets/knife-massacre.webp";

const WHATSAPP_URL = "https://chat.whatsapp.com/JYNmohUbdnI4eppUVBCeMK";

const trustItems = [
  { icon: Zap, label: "Entrega imediata" },
  { icon: Shield, label: "Pagamento seguro" },
  { icon: Tag, label: "Skins pra todo bolso" },
];

const HeroSection = () => {
  return (
    <section id="topo" className="relative min-h-[75vh] sm:min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden bg-black">
      {/* ── Background layers (reduced intensity) ── */}
      <div
        className="absolute -bottom-40 -left-40 w-[500px] sm:w-[700px] lg:w-[900px] h-[400px] sm:h-[500px] lg:h-[700px] rounded-full blur-[200px]"
        style={{ background: "radial-gradient(ellipse, hsla(22, 91%, 47%, 0.07) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -top-32 -right-32 w-[400px] sm:w-[500px] lg:w-[700px] h-[300px] sm:h-[400px] lg:h-[600px] rounded-full blur-[180px]"
        style={{ background: "radial-gradient(ellipse, hsla(254, 55%, 52%, 0.05) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[160px] hidden lg:block"
        style={{ background: "radial-gradient(circle, hsla(22, 91%, 47%, 0.06) 0%, transparent 60%)" }}
      />

      {/* Vignette */}
      <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 200px 80px rgba(0,0,0,0.7)" }} />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Diagonal stripes */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(-55deg, transparent, transparent 40px, rgba(233,90,12,0.4) 40px, rgba(233,90,12,0.4) 41px)`,
          maskImage: "linear-gradient(to left, rgba(0,0,0,0.5) 0%, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.5) 0%, transparent 70%)",
        }}
      />

      {/* Large watermark */}
      <div className="watermark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.012]">
        FIRESKINS
      </div>

      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* ── Content grid ── */}
      <div className="container relative z-10 py-12 sm:py-16 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-6 items-center">

          {/* ── Left: Text block ── */}
          <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">
            {/* Label */}
            <div className="inline-flex items-center gap-2.5 mb-5 sm:mb-8">
              <div className="h-px w-6 sm:w-8 bg-primary" />
              <span
                className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.35em] px-2.5 sm:px-3 py-1.5 rounded-sm bg-primary/8 border border-primary/20 text-primary"
              >
                Skins CS2 • Pix • Cartão • Crypto
              </span>
              <div className="h-px w-8 hidden lg:block bg-primary" />
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tight font-heading leading-[0.9] mb-4 sm:mb-6">
              <span className="text-foreground block">Skins CS2 para</span>
              <span className="text-primary block">Todo Jogador</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto lg:mx-0 leading-relaxed mb-6 sm:mb-8">
              Do seu primeiro drop até aquela knife dos sonhos. Escolhe, paga no Pix e recebe na hora.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
              <Button variant="fire" size="lg" className="uppercase tracking-wider text-sm w-full sm:w-auto" asChild>
                <a href="/catalogo">
                  <ArrowRight className="size-4" />
                  Ver skins disponíveis
                </a>
              </Button>

              <Button variant="fire-outline" size="lg" className="uppercase tracking-wider text-sm w-full sm:w-auto" asChild>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-4" />
                  Falar com a gente
                </a>
              </Button>
            </div>

            {/* Trust items */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 sm:gap-x-5 gap-y-2">
              {trustItems.map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <item.icon className="size-3.5 text-primary" />
                  <span className="text-[10px] sm:text-[11px] text-muted-foreground uppercase tracking-widest font-semibold">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Knife composition ── */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Outer glow ring */}
            <div
              className="absolute w-[min(70vw,280px)] h-[min(70vw,280px)] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px] rounded-full"
              style={{
                background: "radial-gradient(circle, hsla(22, 91%, 47%, 0.04) 0%, transparent 70%)",
              }}
            />
            {/* Inner glow ring */}
            <div
              className="absolute w-[min(50vw,180px)] h-[min(50vw,180px)] sm:w-[260px] sm:h-[260px] lg:w-[320px] lg:h-[320px] rounded-full"
              style={{
                background: "radial-gradient(circle, hsla(22, 91%, 47%, 0.06) 0%, transparent 70%)",
              }}
            />

            {/* HUD circle border */}
            <div
              className="absolute w-[min(65vw,250px)] h-[min(65vw,250px)] sm:w-[350px] sm:h-[350px] lg:w-[420px] lg:h-[420px] rounded-full"
              style={{
                border: "1px solid rgba(233, 90, 12, 0.06)",
              }}
            />

            {/* Interactive 3D Knife */}
            <InteractiveKnife src={heroKnife} />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(22 91% 47% / 0.5), transparent)" }}
      />
    </section>
  );
};

export default HeroSection;
