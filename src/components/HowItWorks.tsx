import { Search, MessageCircle, ArrowUpCircle, Check, ChevronRight } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "ESCOLHA SUA SKIN",
    description: "Navegue pelo catálogo e encontre o item que você procura.",
  },
  {
    icon: MessageCircle,
    step: "02",
    title: "FALE COM A EQUIPE",
    description: "Chame no WhatsApp para consultar disponibilidade e negociar.",
  },
  {
    icon: ArrowUpCircle,
    step: "03",
    title: "FECHE SEU UPGRADE",
    description: "Atendimento rápido, direto e com total transparência.",
  },
];

const benefits = [
  "Compra de skins",
  "Upgrade de inventário",
  "Atendimento humanizado",
  "Resposta rápida",
  "Catálogo premium",
  "Processo simples e direto",
];

const HowItWorks = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Top accent line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-foreground/[0.02] font-heading font-black text-[12rem] sm:text-[18rem] uppercase tracking-widest whitespace-nowrap">
          FIRE
        </span>
      </div>

      <div className="container relative z-10 py-16 sm:py-24">
        {/* Section header — CS2 style */}
        <div className="mb-14 sm:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-8 bg-primary" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-primary font-heading">
              Passo a passo
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight font-heading leading-[0.95]">
            Como <span className="text-gradient-fire">funciona</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Steps — vertical timeline style */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/10 to-transparent hidden sm:block" />

            <div className="space-y-0">
              {steps.map((s, i) => (
                <div key={s.step} className="group relative">
                  {/* Connector arrow between steps */}
                  {i < steps.length - 1 && (
                    <div className="absolute left-5 bottom-0 translate-y-1/2 -translate-x-1/2 z-10 hidden sm:block">
                      <ChevronRight className="size-3 text-primary/30 rotate-90" />
                    </div>
                  )}

                  <div className="flex items-stretch gap-5 sm:gap-6 py-6 sm:py-8 border-b border-border/50 last:border-b-0 group-hover:bg-card/30 transition-colors duration-300 -mx-4 px-4 rounded">
                    {/* Step number + icon */}
                    <div className="flex-shrink-0 relative">
                      <div className="w-10 h-10 rounded bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                        <s.icon className="size-4 text-primary" />
                      </div>
                      {/* Step badge */}
                      <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[9px] font-black w-5 h-5 rounded flex items-center justify-center font-heading shadow-lg shadow-primary/30">
                        {s.step}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-black font-heading tracking-wider uppercase text-foreground group-hover:text-primary transition-colors duration-300">
                        {s.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed max-w-sm">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits — grid with angular style */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-8 bg-primary" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-primary font-heading">
                Vantagens
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-heading leading-[0.95] mb-8">
              Por que escolher a{" "}
              <span className="text-gradient-fire">FireSkins</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((b, i) => (
                <div
                  key={b}
                  className="group flex items-center gap-3 p-4 bg-card/40 border border-border/50 hover:border-primary/30 hover:bg-card/60 transition-all duration-300 rounded"
                >
                  {/* Numbered check */}
                  <div className="flex-shrink-0 w-7 h-7 rounded bg-primary/10 border border-primary/15 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300">
                    <Check className="size-3.5 text-primary" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors duration-300 uppercase tracking-wide font-heading">
                    {b}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom CTA hint */}
            <div className="mt-8 p-4 border border-dashed border-primary/20 rounded bg-primary/[0.03]">
              <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                <span className="text-primary font-bold">+2.000 negociações</span>{" "}
                realizadas com segurança e agilidade. Junte-se à comunidade FireSkins.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
};

export default HowItWorks;
