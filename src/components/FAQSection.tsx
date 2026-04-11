import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Como funciona a compra de skins?",
    answer:
      "Você escolhe a skin desejada no nosso catálogo, entra em contato pelo WhatsApp e combinamos os detalhes da negociação. Após a confirmação do pagamento, a skin é enviada diretamente para sua conta Steam via proposta de troca.",
  },
  {
    question: "Quais métodos de pagamento são aceitos?",
    answer:
      "Aceitamos Pix, transferência bancária e outras formas de pagamento digital. O Pix é o método mais utilizado por ser instantâneo e sem taxas adicionais.",
  },
  {
    question: "As skins são seguras e verificadas?",
    answer:
      "Sim! Todas as skins do nosso catálogo são 100% verificadas e legítimas. Trabalhamos apenas com itens autênticos da Steam, garantindo total segurança na sua compra.",
  },
  {
    question: "Quanto tempo leva para receber a skin?",
    answer:
      "Após a confirmação do pagamento, a skin é enviada imediatamente via proposta de troca na Steam. O processo completo leva poucos minutos na maioria dos casos.",
  },
  {
    question: "Posso devolver uma skin após a compra?",
    answer:
      "Como as transações envolvem itens digitais transferidos via Steam, não é possível realizar devoluções após a conclusão da troca. Por isso, verifique todos os detalhes antes de confirmar a compra.",
  },
  {
    question: "Como entro em contato com o suporte?",
    answer:
      "Nosso atendimento é feito exclusivamente pelo WhatsApp. Clique no botão de WhatsApp disponível no site para falar diretamente com nossa equipe. Respondemos rapidamente!",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="relative overflow-hidden bg-black py-10 sm:py-14 lg:py-16">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(22 91% 47% / 0.4), hsl(38 92% 49% / 0.3), transparent)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsl(22 91% 47% / 0.04) 0%, transparent 60%)",
        }}
      />

      <div className="container relative z-10">
        <div className="flex items-center gap-2.5 mb-3">
          <HelpCircle className="size-5 text-primary" />
          <h2 className="section-heading font-heading">
            Perguntas{" "}
            <span className="text-gradient-fire">Frequentes</span>
          </h2>
        </div>
        <p className="text-sm text-muted-foreground max-w-md mb-8">
          Tire suas dúvidas sobre nossos serviços e processos.
        </p>

        <Accordion type="single" collapsible className="w-full max-w-3xl space-y-3">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-lg px-4 border-primary/15 bg-primary/[0.03]"
            >
              <AccordionTrigger className="font-heading text-base sm:text-lg text-foreground hover:no-underline hover:text-primary transition-colors">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
