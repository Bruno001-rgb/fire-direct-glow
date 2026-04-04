import { Flame, Shield, Zap, Gem, HeadphonesIcon, Instagram, ChevronRight, MessageSquare } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import footerFireBg from "@/assets/footer-fire-bg.jpg";
import logoFireskins from "@/assets/logo-fireskins.webp";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20skins%20CS2!";

const quickLinks = [
  { label: "Início", href: "#" },
  { label: "Catálogo", href: "#catalogo" },
  { label: "Facas", href: "#catalogo" },
  { label: "Luvas", href: "#catalogo" },
];

const trustItems = [
  { icon: Zap, label: "Atendimento rápido" },
  { icon: Shield, label: "Negociação segura" },
  { icon: Gem, label: "Skins premium" },
  { icon: HeadphonesIcon, label: "Suporte direto" },
];

const Footer = () => {
  return (
    <footer id="contato" className="relative overflow-hidden bg-black">
      {/* ── Fire background area with watermark ── */}
      <div className="relative h-[300px] sm:h-[360px] lg:h-[400px] overflow-hidden">
        {/* Fire image */}
        <div className="absolute inset-0">
          <img
            src={footerFireBg}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            width={1920}
            height={800}
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/50" />
          {/* Bottom fade into footer content */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
          {/* Top fade */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black to-transparent" />
          {/* Side fades */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        </div>

        {/* Large FIRESKINS watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span
            className="text-[4rem] sm:text-[6rem] lg:text-[8rem] xl:text-[10rem] font-black uppercase tracking-[0.15em] font-heading"
            style={{ color: "rgba(255, 255, 255, 0.06)" }}
          >
            FIRESKINS
          </span>
        </div>
      </div>

      {/* ── Orange divider line ── */}
      <div className="h-[2px]" style={{ background: "linear-gradient(90deg, transparent 5%, #E95A0C 30%, #F5A006 50%, #E95A0C 70%, transparent 95%)" }} />

      {/* ── Footer content grid ── */}
      <div className="relative bg-black">
        {/* Subtle glow behind content */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(ellipse, rgba(233, 90, 12, 0.06) 0%, transparent 70%)" }}
        />

        <div className="container relative z-10 py-10 sm:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

            {/* ── Brand area ── */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <img src={logoFireskins} alt="FireSkins" className="h-7 w-auto" />
                <span className="text-lg font-black uppercase tracking-wider font-heading">
                  <span className="text-gradient-fire">Fire</span>
                  <span className="text-foreground">Skins</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                Compra, venda e upgrade de skins CS2 com atendimento rápido e seguro.
              </p>
            </div>

            {/* ── Links ── */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-5 text-foreground font-heading">
                Links
              </h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors duration-200 hover:text-[#F5A006] flex items-center gap-1.5"
                    >
                      <ChevronRight className="size-3" style={{ color: "#E95A0C" }} />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Contato ── */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-5 text-foreground font-heading">
                Contato
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-[#F5A006] flex items-center gap-2"
                  >
                    <WhatsAppIcon className="size-4" />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/fireskins"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-[#F5A006] flex items-center gap-2"
                  >
                    <Instagram className="size-4" style={{ color: "#E95A0C" }} />
                    Instagram
                  </a>
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageSquare className="size-4 shrink-0" style={{ color: "#E95A0C" }} />
                  <span>Horário de 10h as 22h</span>
                </li>
              </ul>
            </div>

            {/* ── Suporte ── */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-5 text-foreground font-heading">
                Suporte
              </h4>
              <ul className="space-y-2.5">
                {trustItems.map((item) => (
                  <li key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <item.icon className="size-4 shrink-0" style={{ color: "#22C55E" }} />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(233, 90, 12, 0.15), transparent)" }} />

        <div className="container relative z-10 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-muted-foreground uppercase tracking-[0.2em]">
              © {new Date().getFullYear()}{" "}
              <span className="font-bold text-foreground tracking-[0.15em]">FireSkins</span>
              {" "}— Todos os direitos reservados.
            </span>
            <div className="flex items-center gap-6">
              <a href="#" className="text-[11px] uppercase tracking-wider transition-colors hover:text-[#F5A006]" style={{ color: "#E95A0C" }}>
                Política de Privacidade
              </a>
              <a href="#" className="text-[11px] uppercase tracking-wider transition-colors hover:text-[#F5A006]" style={{ color: "#E95A0C" }}>
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
