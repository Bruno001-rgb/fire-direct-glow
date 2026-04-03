import { Check } from "lucide-react";

const benefits = [
  "Compra de skins",
  "Upgrade de inventário",
  "Atendimento humanizado",
  "Resposta rápida",
  "Catálogo premium",
  "Processo simples e direto",
];

const BenefitsSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-cinematic-alt relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-accent/3 rounded-full blur-[80px]" />

      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="section-heading font-heading mb-3">
            Por que escolher a <span className="text-gradient-fire">FireSkins</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-8">Tudo que você precisa para negociar com confiança</p>

          <div className="grid grid-cols-2 gap-3 text-left">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-2.5 p-3 sm:p-3.5 rounded-lg bg-card/40 border border-primary/8 hover:border-primary/20 transition-colors duration-300">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/12 flex items-center justify-center">
                  <Check className="size-3 text-primary" />
                </div>
                <span className="text-xs sm:text-sm font-medium">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
