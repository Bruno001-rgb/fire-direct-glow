import { Search, MessageCircle, ArrowUpCircle, Check } from "lucide-react";

const steps = [
  { icon: Search, step: "01", title: "ESCOLHA SUA SKIN", description: "Veja as categorias e encontre o item que você procura." },
  { icon: MessageCircle, step: "02", title: "FALE COM A EQUIPE", description: "Chame no WhatsApp para consultar disponibilidade e negociação." },
  { icon: ArrowUpCircle, step: "03", title: "FECHE SEU UPGRADE", description: "Atendimento rápido, direto e com transparência." },
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
    <section className="py-12 sm:py-16 relative overflow-hidden border-t border-primary/8">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          {/* How it works */}
          <div>
            <h2 className="text-lg sm:text-xl font-black tracking-tight uppercase font-heading mb-6">
              Como <span className="text-gradient-fire">funciona</span>
            </h2>
            <div className="space-y-4">
              {steps.map((s) => (
                <div key={s.step} className="flex items-start gap-4 p-4 rounded-lg bg-card/40 border border-primary/8">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center relative">
                    <s.icon className="size-4 text-primary" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center">
                      {s.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold font-heading tracking-wider">{s.title}</h3>
                    <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 leading-relaxed">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h2 className="text-lg sm:text-xl font-black tracking-tight uppercase font-heading mb-6">
              Por que escolher a <span className="text-gradient-fire">FireSkins</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((b) => (
                <div key={b} className="flex items-center gap-2.5 p-3.5 rounded-lg bg-card/40 border border-primary/8 hover:border-primary/20 transition-colors duration-300">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/12 flex items-center justify-center">
                    <Check className="size-3 text-primary" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
