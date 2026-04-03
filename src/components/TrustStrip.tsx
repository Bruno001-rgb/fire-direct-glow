import { Zap, Shield, Diamond, MessageCircle } from "lucide-react";

const items = [
  { icon: Zap, label: "Atendimento rápido" },
  { icon: Shield, label: "Negociação segura" },
  { icon: Diamond, label: "Skins premium" },
  { icon: MessageCircle, label: "Suporte direto no WhatsApp" },
];

const TrustStrip = () => {
  return (
    <section className="py-8 border-y border-border/40 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-3 justify-center">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="size-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
