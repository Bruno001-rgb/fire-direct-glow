import { Gamepad2, Flame, Crown, ArrowRight } from "lucide-react";

const WHATSAPP_GROUP = "https://chat.whatsapp.com/JYNmohUbdnI4eppUVBCeMK";

const levels = [
  {
    title: "Entrada",
    icon: Gamepad2,
    copy: "Seu primeiro upgrade com curadoria e segurança. Skins que valorizam sem pesar no bolso.",
    msg: "Olá! Quero falar com um especialista sobre skins de entrada.",
  },
  {
    title: "Intermediário",
    icon: Flame,
    copy: "Inventário equilibrado, com peças que combinam estilo e valor de revenda.",
    msg: "Olá! Quero falar com um especialista sobre skins intermediárias.",
  },
  {
    title: "Premium",
    icon: Crown,
    copy: "Itens raros, knifes e gloves para quem quer o inventário que todos notam.",
    msg: "Olá! Quero falar com um especialista sobre skins premium.",
  },
];

const TrustLevelsSection = () => {
  return (
    <section className="relative py-16 sm:py-20 bg-black">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight font-heading text-foreground mb-3">
            Do primeiro upgrade ao inventário dos sonhos.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
            A FireSkins atende jogadores em todos os níveis.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {levels.map((level) => (
            <div
              key={level.title}
              className="group flex flex-col p-6 rounded-xl border border-primary/15 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(233,90,12,0.1)]"
            >
              <level.icon className="size-8 mb-4 text-primary" />
              <h3 className="text-lg font-bold font-heading text-foreground mb-2">{level.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{level.copy}</p>
              <a
                href={WHATSAPP_GROUP}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary opacity-70 group-hover:opacity-100 transition-opacity"
              >
                Falar com especialista
                <ArrowRight className="size-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
};

export default TrustLevelsSection;
