import { ArrowRight, Shield, Zap, Gem } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import InteractiveKnife from "@/components/InteractiveKnife";
import heroKnife from "@/assets/hero-knife-premium.png";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20skins%20CS2!";

const trustItems = [
  { icon: Zap, label: "Atendimento rápido" },
  { icon: Shield, label: "Negociação segura" },
  { icon: Gem, label: "Skins premium" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden bg-black">
      {/* ── Background layers ── */}
      {/* Large orange glow — bottom left */}
      <div
        className="absolute -bottom-40 -left-40 w-[900px] h-[700px] rounded-full blur-[200px]"
        style={{ background: "radial-gradient(ellipse, hsla(22, 91%, 47%, 0.12) 0%, transparent 70%)" }}
      />
      {/* Purple haze — top right */}
      <div
        className="absolute -top-32 -right-32 w-[700px] h-[600px] rounded-full blur-[180px]"
        style={{ background: "radial-gradient(ellipse, hsla(254, 55%, 52%, 0.08) 0%, transparent 70%)" }}
      />
      {/* Orange accent — center right for knife glow */}
      <div
        className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[160px] hidden lg:block"
        style={{ background: "radial-gradient(circle, hsla(22, 91%, 47%, 0.1) 0%, transparent 60%)" }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{ boxShadow: "inset 0 0 200px 80px rgba(0,0,0,0.7)" }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Diagonal stripes — right */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03]"
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
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* ── Content grid ── */}
      <div className="container relative z-10 py-16 sm:py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-6 items-center">

          {/* ── Left: Text block ── */}
          <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">
            {/* Premium label */}
            <div className="inline-flex items-center gap-2.5 mb-6 sm:mb-8">
              <div className="h-px w-8" style={{ background: "#E95A0C" }} />
              <span
                className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.35em] px-3 py-1.5 rounded-sm"
                style={{
                  background: "rgba(233, 90, 12, 0.08)",
                  border: "1px solid rgba(233, 90, 12, 0.2)",
                  color: "#F5A006",
                }}
              >
                FireSkins • Skins Premium CS2
              </span>
              <div className="h-px w-8 hidden lg:block" style={{ background: "#E95A0C" }} />
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tight font-heading leading-[0.9] mb-5 sm:mb-6">
              <span className="text-foreground block">Compre, Venda</span>
              <span className="text-foreground block">e Faça </span>
              <span
                className="bg-clip-text text-transparent block"
                style={{ backgroundImage: "linear-gradient(135deg, #E95A0C 0%, #F5A006 60%, #E95A0C 100%)" }}
              >
                Upgrade das
              </span>
              <span
                className="bg-clip-text text-transparent block"
                style={{ backgroundImage: "linear-gradient(135deg, #E95A0C 0%, #F5A006 60%, #E95A0C 100%)" }}
              >
                Suas Skins
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto lg:mx-0 leading-relaxed mb-8">
              Facas, luvas e skins premium de CS2 com atendimento rápido, negociação segura e suporte direto no WhatsApp.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 sm:gap-4 mb-8">
              {/* WhatsApp — Primary */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-sm font-bold text-sm uppercase tracking-wider font-heading transition-all duration-300 w-full sm:w-auto overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #E95A0C, #F5A006)",
                  color: "#fff",
                  boxShadow: "0 4px 24px rgba(233, 90, 12, 0.3), 0 0 60px rgba(233, 90, 12, 0.1)",
                }}
              >
                {/* Shine effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.05) 55%, transparent 60%)" }}
                />
                <WhatsAppIcon className="size-4 relative z-10" />
                <span className="relative z-10">Chamar no WhatsApp</span>
              </a>

              {/* Ver Catálogo — Secondary */}
              <a
                href="#catalogo"
                className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-sm font-bold text-sm uppercase tracking-wider font-heading transition-all duration-300 hover:bg-white/5 w-full sm:w-auto"
                style={{
                  border: "1px solid rgba(233, 90, 12, 0.3)",
                  color: "#F5A006",
                }}
              >
                Ver Catálogo
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Trust items */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2">
              {trustItems.map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <item.icon className="size-3.5" style={{ color: "#E95A0C" }} />
                  <span className="text-[10px] sm:text-[11px] text-muted-foreground uppercase tracking-widest font-semibold">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Premium knife composition ── */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Outer glow ring */}
            <div
              className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] lg:w-[500px] lg:h-[500px] rounded-full"
              style={{
                background: "radial-gradient(circle, hsla(22, 91%, 47%, 0.06) 0%, transparent 70%)",
              }}
            />
            {/* Inner glow ring */}
            <div
              className="absolute w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[340px] lg:h-[340px] rounded-full"
              style={{
                background: "radial-gradient(circle, hsla(22, 91%, 47%, 0.1) 0%, hsla(38, 92%, 49%, 0.04) 50%, transparent 70%)",
              }}
            />

            {/* HUD circle border */}
            <div
              className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[440px] lg:h-[440px] rounded-full"
              style={{
                border: "1px solid rgba(233, 90, 12, 0.08)",
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
        style={{ background: "linear-gradient(90deg, transparent, #E95A0C, #F5A006, transparent)" }}
      />
    </section>
  );
};

export default HeroSection;
