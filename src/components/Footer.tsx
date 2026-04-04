import { Shield, Zap, Gem, HeadphonesIcon, Instagram, ChevronRight, MessageSquare } from "lucide-react";
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
    <footer id="contato" className="relative overflow-hidden">
      {/* ── Fire background covering entire footer ── */}
      <div className="absolute inset-0">
        <img
          src={footerFireBg}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/95 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* ── Footer content grid ── */}
      <div className="relative">
        <div className="container relative z-10 pt-10 sm:pt-14 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

            {/* ── Brand area ── */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <img src={logoFireskins} alt="FireSkins" className="h-8 w-auto" />
                <span className="text-xl font-black uppercase tracking-wider font-heading">
                  <span className="text-gradient-fire">Fire</span>
                  <span className="text-foreground">Skins</span>
                </span>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed max-w-xs">
                Compra, venda e upgrade de skins CS2 com atendimento rápido e seguro.
              </p>
            </div>

            {/* ── Links ── */}
            <div>
              <h4 className="text-base font-bold uppercase tracking-wider mb-5 text-foreground font-heading">
                Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-base text-muted-foreground transition-colors duration-200 hover:text-[#F5A006] flex items-center gap-2"
                    >
                      <ChevronRight className="size-3.5" style={{ color: "#E95A0C" }} />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Contato ── */}
            <div>
              <h4 className="text-base font-bold uppercase tracking-wider mb-5 text-foreground font-heading">
                Contato
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-muted-foreground transition-colors duration-200 hover:text-[#F5A006] flex items-center gap-2.5"
                  >
                    <WhatsAppIcon className="size-5" />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/fireskins"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-muted-foreground transition-colors duration-200 hover:text-[#F5A006] flex items-center gap-2.5"
                  >
                    <Instagram className="size-5" style={{ color: "#E95A0C" }} />
                    Instagram
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-base text-muted-foreground">
                  <MessageSquare className="size-5 shrink-0" style={{ color: "#E95A0C" }} />
                  <span>Horário de 10h as 22h</span>
                </li>
              </ul>
            </div>

            {/* ── Suporte ── */}
            <div>
              <h4 className="text-base font-bold uppercase tracking-wider mb-5 text-foreground font-heading">
                Suporte
              </h4>
              <ul className="space-y-3">
                {trustItems.map((item) => (
                  <li key={item.label} className="flex items-center gap-2.5 text-base text-muted-foreground">
                    <item.icon className="size-5 shrink-0" style={{ color: "#22C55E" }} />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="relative h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(233, 90, 12, 0.15), transparent)" }} />

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
