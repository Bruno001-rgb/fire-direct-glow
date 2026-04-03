import { Zap, Shield, Diamond, MessageCircle } from "lucide-react";

const items = [
  { icon: Zap, label: "Atendimento rápido" },
  { icon: Shield, label: "Negociação segura" },
  { icon: Diamond, label: "Skins premium" },
  { icon: MessageCircle, label: "Suporte via WhatsApp" },
];

const TrustStrip = () => {
  return (
    <section className="py-6 sm:py-8 border-y border-primary/8 bg-muted/15">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5 justify-center">
              <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/8 border border-primary/12 flex items-center justify-center">
                <item.icon className="size-4 text-primary" />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-foreground/80 uppercase tracking-wide">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
