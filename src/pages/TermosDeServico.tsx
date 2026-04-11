import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const sections = [
  {
    title: "1. Aceitação dos Termos",
    content: "Ao acessar e utilizar a plataforma FireSkins, você concorda integralmente com estes Termos de Serviço. Caso não concorde com qualquer disposição, recomendamos que não utilize nossos serviços. O uso continuado da plataforma constitui aceitação das eventuais alterações nestes termos."
  },
  {
    title: "2. Descrição dos Serviços",
    content: "A FireSkins é uma plataforma de intermediação para compra e venda de skins do jogo Counter-Strike 2 (CS2). Atuamos como facilitadores da negociação entre compradores e vendedores, oferecendo um ambiente seguro e confiável para transações."
  },
  {
    title: "3. Cadastro e Conta",
    content: "Para utilizar determinados serviços, pode ser necessário fornecer informações de contato. Você é responsável pela veracidade das informações fornecidas e pela segurança de suas credenciais de acesso. A FireSkins reserva-se o direito de recusar ou cancelar cadastros que contenham informações falsas ou incompletas."
  },
  {
    title: "4. Transações e Pagamentos",
    content: "Todas as transações realizadas na plataforma estão sujeitas à disponibilidade dos itens e confirmação do pagamento. Os preços são expressos em Reais (BRL) e podem ser alterados sem aviso prévio. Aceitamos pagamentos via PIX, cartão de crédito (Visa, Mastercard) e outros métodos disponibilizados na plataforma. O prazo de entrega das skins é de até 24 horas após a confirmação do pagamento."
  },
  {
    title: "5. Política de Reembolso",
    content: "Devido à natureza digital dos produtos, reembolsos serão analisados caso a caso. Em situações onde o item não for entregue conforme descrito, o comprador poderá solicitar reembolso integral. Solicitações devem ser feitas em até 7 dias após a compra, através dos canais de atendimento oficiais."
  },
  {
    title: "6. Responsabilidades do Usuário",
    content: "O usuário compromete-se a: (a) não utilizar a plataforma para fins ilícitos; (b) não tentar burlar os sistemas de segurança; (c) não realizar transações fraudulentas; (d) manter suas informações de contato atualizadas; (e) não compartilhar sua conta com terceiros."
  },
  {
    title: "7. Propriedade Intelectual",
    content: "Todo o conteúdo da plataforma, incluindo mas não se limitando a logos, textos, imagens e design, é de propriedade da FireSkins ou de seus licenciadores. É proibida a reprodução, distribuição ou modificação sem autorização prévia por escrito. CS2 e Counter-Strike são marcas registradas da Valve Corporation."
  },
  {
    title: "8. Limitação de Responsabilidade",
    content: "A FireSkins não se responsabiliza por: (a) interrupções temporárias do serviço; (b) alterações de preço realizadas pela Valve/Steam; (c) restrições de trade impostas pela Steam; (d) prejuízos decorrentes do uso indevido da plataforma pelo usuário."
  },
  {
    title: "9. Modificações dos Termos",
    content: "A FireSkins reserva-se o direito de modificar estes Termos de Serviço a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação na plataforma. Recomendamos a revisão periódica destes termos."
  },
  {
    title: "10. Foro e Legislação Aplicável",
    content: "Estes Termos de Serviço são regidos pelas leis da República Federativa do Brasil. Qualquer litígio será submetido ao foro da comarca do domicílio do usuário, conforme previsto no Código de Defesa do Consumidor."
  },
];

const TermosDeServico = () => (
  <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(180deg, #1A1008 0%, #0D0A04 100%)" }}>
    <Header />
    <main className="flex-1 container py-12 sm:py-20 max-w-3xl">
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 font-rajdhani">Termos de Serviço</h1>
      <p className="text-white/50 text-sm mb-8">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>

      <Accordion type="multiple" className="space-y-2">
        {sections.map((s, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border rounded-lg px-4" style={{ borderColor: "rgba(233,90,12,0.2)", background: "rgba(233,90,12,0.04)" }}>
            <AccordionTrigger className="text-white/90 hover:text-white hover:no-underline text-left text-base">
              {s.title}
            </AccordionTrigger>
            <AccordionContent className="text-white/70 text-sm leading-relaxed">
              {s.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
    <Footer />
  </div>
);

export default TermosDeServico;
