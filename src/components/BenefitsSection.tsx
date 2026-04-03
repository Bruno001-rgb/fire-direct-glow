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
    <section className="py-24 bg-cinematic-purple relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />

      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="section-heading font-heading mb-4">
            Por que escolher a <span className="text-gradient-fire">FireSkins?</span>
          </h2>
          <p className="text-muted-foreground mb-12">Tudo que você precisa para negociar com confiança</p>

          <div className="grid sm:grid-cols-2 gap-4 text-left">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-primary/10 hover:border-primary/25 transition-colors duration-300">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center">
                  <Check className="size-3.5 text-primary" />
                </div>
                <span className="text-sm font-semibold tracking-wide">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
