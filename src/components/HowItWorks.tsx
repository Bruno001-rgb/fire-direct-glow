import { MessageCircle, Handshake, Package } from "lucide-react";

const steps = [
  { icon: MessageCircle, step: "01", title: "Fale conosco", description: "Envie uma mensagem pelo WhatsApp com a skin que deseja" },
  { icon: Handshake, step: "02", title: "Negocie", description: "Combinamos preço e forma de pagamento de forma rápida e segura" },
  { icon: Package, step: "03", title: "Receba", description: "A skin é enviada direto para o seu inventário Steam" },
];

const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Como <span className="text-gradient-fire">funciona</span>
          </h2>
          <p className="mt-3 text-muted-foreground">Simples, rápido e seguro</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <div key={s.step} className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center relative">
                <s.icon className="size-7 text-primary" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {s.step}
                </span>
              </div>
              <h3 className="text-lg font-bold">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
