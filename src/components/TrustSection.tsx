import { ShieldCheck, MessageCircle, Clock, Users } from "lucide-react";
import Placeholder from "@/components/Placeholder";

const cards = [
  {
    icon: ShieldCheck,
    title: "Perfil Steam verificado",
    description: (
      <>
        Conta com <Placeholder label="X anos" /> de histórico e nível{" "}
        <Placeholder label="N" />. Milhares de trades completos.
      </>
    ),
    link: (
      <a
        href="#"
        title="Pendente: URL do perfil Steam"
        className="text-primary text-sm font-medium mt-3 inline-block hover:underline"
      >
        Ver nosso perfil Steam →
      </a>
    ),
  },
  {
    icon: MessageCircle,
    title: "Atendimento humano",
    description:
      "Sem bot, sem fila. Você fala direto com a gente no WhatsApp. Tira qualquer dúvida antes de fechar.",
  },
  {
    icon: Clock,
    title: "Entrega imediata",
    description:
      "Pagou, recebeu. A skin vai pro seu inventário via trade offer do Steam. Sem espera, sem enrolação.",
  },
  {
    icon: Users,
    title: "Comunidade ativa",
    description: (
      <>
        <Placeholder label="N+" /> skins entregues desde{" "}
        <Placeholder label="ANO" />. Atendendo jogadores de CS2 no Brasil todo
        dia.
      </>
    ),
  },
];

export default function TrustSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-4 py-16 sm:py-20">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-4">
            Segurança primeiro
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-heading">
            Por que confiar na{" "}
            <span className="text-primary">FireSkins</span>?
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            A gente sabe que o mercado de skins tem muita história ruim. Por
            isso somos transparentes em tudo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-card/60 border border-primary/10 rounded-xl p-6 hover:border-primary/25 transition-colors duration-300"
            >
              <card.icon className="size-8 text-primary" />
              <h3 className="text-lg font-bold text-foreground mt-4">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {card.description}
              </p>
              {card.link}
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
}
