import { Zap, Shield, Diamond, MessageCircle } from "lucide-react";

const items = [
  { icon: Zap, label: "ATENDIMENTO RÁPIDO" },
  { icon: Shield, label: "NEGOCIAÇÃO SEGURA" },
  { icon: Diamond, label: "SKINS PREMIUM" },
  { icon: MessageCircle, label: "SUPORTE VIA WHATSAPP" },
];

const TrustStrip = () => {
  return (
    <section className="py-8 border-y border-primary/10 bg-muted/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-accent/3" />
      <div className="container relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-3 justify-center">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <item.icon className="size-5 text-primary" />
              </div>
              <span className="text-xs font-bold text-foreground tracking-wider">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
