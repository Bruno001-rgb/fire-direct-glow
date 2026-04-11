import { ArrowRight, Shield, Zap, Tag } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import InteractiveKnife from "@/components/InteractiveKnife";
import { useWhatsAppUrl } from "@/hooks/useWhatsAppUrl";
import heroKnife from "@/assets/knife-massacre.webp";

const trustItems = [
  { icon: Zap, label: "Entrega imediata" },
  { icon: Shield, label: "Pagamento seguro" },
  { icon: Tag, label: "Skins pra todo bolso" },
];

const HeroSection = () => {
  const whatsappUrl = useWhatsAppUrl();
  return (
    <section id="topo" className="relative min-h-[auto] sm:min-h-[85vh] lg:min-h-[90vh] flex items-start sm:items-center overflow-hidden bg-black">
      {/* Vignette */}
      <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 200px 80px rgba(0,0,0,0.7)" }} />

      {/* Large watermark */}
      <div className="watermark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.006]">
        FIRESKINS
      </div>

      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* ── Content grid ── */}
      <div className="container relative z-10 py-6 sm:py-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-6 items-center">

          {/* ── Left: Text block ── */}
          <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0">
            {/* Label */}
            <div className="inline-flex items-center gap-2.5 mb-3 sm:mb-8">
              <div className="h-px w-6 sm:w-8 bg-primary" />
              <span
                className="text-xs font-bold uppercase tracking-[0.35em] px-2.5 sm:px-3 py-1.5 rounded-sm bg-primary/8 border border-primary/20 text-primary"
              >
                Skins CS2 • Pix • Cartão • Crypto
              </span>
              <div className="h-px w-8 hidden lg:block bg-primary" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight font-heading leading-[0.9] mb-3 sm:mb-6">
              <span className="text-foreground block">Skins CS2 para</span>
              <span className="text-primary block">Todo Jogador</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-base text-muted-foreground max-w-md mx-auto lg:mx-0 leading-relaxed mb-4 sm:mb-8">
              Do seu primeiro drop até aquela knife dos sonhos. Escolhe, paga no Pix e recebe na hora.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 sm:gap-4 mb-4 sm:mb-8">
              <Button variant="fire" size="lg" className="uppercase tracking-wider text-sm w-full sm:w-auto" asChild>
                <a href="/catalogo">
                  <ArrowRight className="size-4" />
                  Ver skins disponíveis
                </a>
              </Button>

              <Button variant="fire-outline" size="lg" className="uppercase tracking-wider text-sm w-full sm:w-auto" asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-4" />
                  Falar com a gente
                </a>
              </Button>
            </div>

            {/* Trust items */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-x-5 sm:gap-y-2">
              {trustItems.map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <item.icon className="size-3.5 text-primary" />
                  <span className="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest font-semibold">
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
