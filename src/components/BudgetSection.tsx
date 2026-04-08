import { ArrowRight } from "lucide-react";

const WHATSAPP_GROUP = "https://chat.whatsapp.com/JYNmohUbdnI4eppUVBCeMK";

const budgetTiers = [
  { range: "Até R$300", description: "Entrada no jogo com estilo", msg: "Olá! Quero ver skins até R$300." },
  { range: "R$300 a R$800", description: "Upgrades que fazem diferença", msg: "Olá! Quero ver skins entre R$300 e R$800." },
  { range: "R$800 a R$2.000", description: "Inventário de alto nível", msg: "Olá! Quero ver skins entre R$800 e R$2.000." },
  { range: "Acima de R$2.000", description: "O inventário que todos notam", msg: "Olá! Quero ver skins acima de R$2.000." },
];

const BudgetSection = () => {
  return (
    <section className="relative py-16 sm:py-20 bg-black">
      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight font-heading text-foreground mb-3">
            Encontre skins no seu estilo e no seu budget
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
            Atendemos desde o primeiro upgrade até o inventário dos sonhos.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {budgetTiers.map((tier) => (
            <a
              key={tier.range}
              href={WHATSAPP_GROUP}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-xl border border-primary/15 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(233,90,12,0.1)]"
            >
              <div>
                <span className="block text-lg sm:text-xl font-black font-heading text-foreground mb-1">
                  {tier.range}
                </span>
                <span className="block text-xs sm:text-sm text-muted-foreground">
                  {tier.description}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary opacity-70 group-hover:opacity-100 transition-opacity">
                Ver opções
                <ArrowRight className="size-3.5" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
};

export default BudgetSection;
