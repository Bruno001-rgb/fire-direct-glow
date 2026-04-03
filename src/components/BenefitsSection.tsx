import { Check } from "lucide-react";

const benefits = [
  "Preços competitivos e atualizados",
  "Entrega imediata no inventário",
  "Atendimento humanizado via WhatsApp",
  "Negociação flexível",
  "Skins verificadas e originais",
  "Suporte pós-venda dedicado",
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Por que escolher a <span className="text-gradient-fire">FireSkins?</span>
          </h2>
          <p className="text-muted-foreground mb-10">Tudo que você precisa para negociar com confiança</p>

          <div className="grid sm:grid-cols-2 gap-4 text-left">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-3 p-3 rounded-lg bg-card/40">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="size-3.5 text-primary" />
                </div>
                <span className="text-sm font-medium">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
