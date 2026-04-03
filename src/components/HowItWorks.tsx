import { Search, MessageCircle, ArrowUpCircle } from "lucide-react";

const steps = [
  { icon: Search, step: "01", title: "ESCOLHA SUA SKIN", description: "Veja as categorias e encontre o item que você procura." },
  { icon: MessageCircle, step: "02", title: "FALE COM A EQUIPE", description: "Chame no WhatsApp para consultar disponibilidade e negociação." },
  { icon: ArrowUpCircle, step: "03", title: "FECHE SEU UPGRADE", description: "Atendimento rápido, direto e com transparência." },
];

const HowItWorks = () => {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-cinematic">
      <div className="watermark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-50">
        FIRE
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="section-heading font-heading">
            Como <span className="text-gradient-fire">funciona</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">Simples, rápido e seguro</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {steps.map((s) => (
            <div key={s.step} className="text-center space-y-4 glass-card-glow p-6">
              <div className="mx-auto w-12 h-12 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center relative">
                <s.icon className="size-5 text-primary" />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  {s.step}
                </span>
              </div>
              <h3 className="text-sm font-bold font-heading tracking-wider">{s.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
