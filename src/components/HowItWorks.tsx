import { MessageCircle, Handshake, Package } from "lucide-react";

const steps = [
  { icon: MessageCircle, step: "01", title: "FALE CONOSCO", description: "Envie uma mensagem pelo WhatsApp com a skin que deseja" },
  { icon: Handshake, step: "02", title: "NEGOCIE", description: "Combinamos preço e forma de pagamento de forma rápida e segura" },
  { icon: Package, step: "03", title: "RECEBA", description: "A skin é enviada direto para o seu inventário Steam" },
];

const HowItWorks = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-cinematic">
      {/* Watermark */}
      <div className="watermark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
        FIRE
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-14">
          <h2 className="section-heading font-heading">
            Como <span className="text-gradient-fire">funciona</span>
          </h2>
          <p className="mt-3 text-muted-foreground">Simples, rápido e seguro</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s) => (
            <div key={s.step} className="text-center space-y-5 glass-card-glow p-8">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center relative">
                <s.icon className="size-7 text-primary" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {s.step}
                </span>
              </div>
              <h3 className="text-lg font-bold font-heading tracking-wider">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
