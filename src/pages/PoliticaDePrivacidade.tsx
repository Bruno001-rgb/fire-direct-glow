import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const sections = [
  {
    title: "1. Informações que Coletamos",
    content: "Coletamos informações que você nos fornece diretamente, como: nome, endereço de e-mail, número de WhatsApp e dados de perfil Steam. Também coletamos automaticamente informações sobre seu dispositivo e navegação, como endereço IP, tipo de navegador e páginas visitadas."
  },
  {
    title: "2. Como Utilizamos suas Informações",
    content: "Utilizamos suas informações para: (a) processar e facilitar transações de skins; (b) enviar comunicações sobre suas compras e vendas; (c) melhorar nossos serviços e experiência do usuário; (d) enviar novidades e ofertas, caso tenha optado por recebê-las via newsletter; (e) prevenir fraudes e garantir a segurança da plataforma."
  },
  {
    title: "3. Compartilhamento de Dados",
    content: "Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de marketing. Podemos compartilhar dados com: (a) processadores de pagamento para concluir transações; (b) autoridades legais quando exigido por lei; (c) prestadores de serviço essenciais para o funcionamento da plataforma."
  },
  {
    title: "4. Cookies e Tecnologias de Rastreamento",
    content: "Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o tráfego do site e personalizar conteúdo. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar o funcionamento de alguns recursos da plataforma."
  },
  {
    title: "5. Segurança dos Dados",
    content: "Empregamos medidas técnicas e organizacionais adequadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Utilizamos criptografia SSL/TLS para proteger dados em trânsito e armazenamos informações sensíveis de forma segura."
  },
  {
    title: "6. Seus Direitos (LGPD)",
    content: "Conforme a Lei Geral de Proteção de Dados (LGPD), você tem direito a: (a) confirmar a existência de tratamento de seus dados; (b) acessar seus dados; (c) corrigir dados incompletos ou desatualizados; (d) solicitar a anonimização ou exclusão de dados desnecessários; (e) solicitar a portabilidade dos dados; (f) revogar o consentimento a qualquer momento."
  },
  {
    title: "7. Retenção de Dados",
    content: "Mantemos suas informações pessoais pelo tempo necessário para cumprir as finalidades descritas nesta política, ou conforme exigido por lei. Dados de transações são mantidos por no mínimo 5 anos para fins fiscais e legais."
  },
  {
    title: "8. Menores de Idade",
    content: "Nossos serviços não são direcionados a menores de 18 anos. Não coletamos intencionalmente informações de menores. Caso identifiquemos que dados de um menor foram coletados, tomaremos medidas para excluí-los imediatamente."
  },
  {
    title: "9. Alterações nesta Política",
    content: "Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre alterações significativas por e-mail ou através de aviso na plataforma. Recomendamos a revisão regular desta página."
  },
  {
    title: "10. Contato",
    content: "Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato conosco pelo e-mail suporte@fireskins.gg ou através do nosso WhatsApp disponível no site."
  },
];

const PoliticaDePrivacidade = () => (
  <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(180deg, #1A1008 0%, #0D0A04 100%)" }}>
    <Header />
    <main className="flex-1 container py-12 sm:py-20 max-w-3xl">
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 font-rajdhani">Política de Privacidade</h1>
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

export default PoliticaDePrivacidade;
