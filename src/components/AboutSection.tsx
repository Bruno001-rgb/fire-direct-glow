import { FileText, Calendar, ExternalLink } from "lucide-react";

const credentials = [
  {
    icon: FileText,
    title: "CNPJ Ativo",
    value: "XX.XXX.XXX/0001-XX",
    description: "Empresa registrada e regularizada",
  },
  {
    icon: ExternalLink,
    title: "Perfil Steam",
    value: "Ver perfil oficial",
    description: "Reputação verificada na plataforma",
    href: "https://steamcommunity.com/id/PLACEHOLDER",
  },
  {
    icon: Calendar,
    title: "No Mercado",
    value: "+X anos",
    description: "Experiência e confiança comprovadas",
  },
];

const AboutSection = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto text-center mb-10 sm:mb-14">
        <h2 className="section-heading font-heading">
          CONHEÇA A{" "}
          <span className="text-gradient-fire">FIRESKINS</span>
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
          Transparência e segurança em cada negociação
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {credentials.map((item) => {
          const Icon = item.icon;
          const content = (
            <div
              key={item.title}
              className="rounded-xl border border-orange-500/20 bg-card/60 backdrop-blur-sm p-6 sm:p-8 text-center flex flex-col items-center gap-3 transition-colors hover:border-orange-500/40"
            >
              <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <span className="text-gradient-fire font-bold text-xl">
                {item.value}
              </span>
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
            </div>
          );

          if (item.href) {
            return (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content}
              </a>
            );
          }

          return content;
        })}
      </div>
    </section>
  );
};

export default AboutSection;
