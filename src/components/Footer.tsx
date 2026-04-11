import { ArrowUp } from "lucide-react";
import { useWhatsAppUrl } from "@/hooks/useWhatsAppUrl";

const Footer = () => {
  const whatsAppUrl = useWhatsAppUrl();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contato" className="relative bg-[#0A0A0A] text-foreground overflow-hidden">
      {/* Ir ao topo */}
      <div className="container">
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 py-6 text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowUp className="size-4" />
          Ir ao topo
        </button>
        <div className="h-px bg-white/10" />
      </div>

      {/* Main content */}
      <div className="container py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Tagline */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight font-rajdhani">
              Sua skin,{" "}
              <br />
              seu estilo.™
            </h2>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              FireSkins é o melhor marketplace de skins CS2 do Brasil. Compre, venda e troque com segurança e os melhores preços do mercado.
            </p>
          </div>

          {/* Nossos Serviços */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
              Nossos Serviços
            </h4>
            {["Comprar skins", "Vender skins", "Programa de fidelidade", "Programa de indicação"].map((item) => (
              <a key={item} href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                {item}
              </a>
            ))}
          </div>

          {/* Suporte */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
              Suporte
            </h4>
            {["Perguntas frequentes", "Sobre nós", "Termos e Condições", "Políticas de Privacidade"].map((item) => (
              <a key={item} href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">
                {item}
              </a>
            ))}
          </div>

          {/* Contato */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
              Contato
            </h4>
            <a href="#" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Fale conosco</a>
            <a href="https://instagram.com/fireskinscs2" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/70 hover:text-foreground transition-colors">Instagram</a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/70 hover:text-foreground transition-colors">YouTube</a>
            <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/70 hover:text-foreground transition-colors">WhatsApp</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container pb-4">
        <div className="h-px bg-white/10 mb-6" />
        <p className="text-xs uppercase tracking-widest text-muted-foreground text-center">
          © FIRESKINS {new Date().getFullYear()} — TODOS OS DIREITOS RESERVADOS.
        </p>
      </div>

      {/* Giant decorative text */}
      <div className="relative h-[clamp(60px,12vw,160px)] overflow-hidden select-none pointer-events-none">
        <span
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[30%] font-rajdhani font-black uppercase text-white/[0.04] whitespace-nowrap"
          style={{ fontSize: "clamp(80px, 15vw, 240px)", lineHeight: 1 }}
        >
          FIRESKINS
        </span>
      </div>
    </footer>
  );
};

export default Footer;
