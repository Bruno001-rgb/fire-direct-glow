import { Flame, Shield, Zap, Gem, HeadphonesIcon, Instagram, ExternalLink } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20skins%20CS2!";

const quickLinks = [
  { label: "Início", href: "#" },
  { label: "Catálogo", href: "#catalogo" },
  { label: "Facas", href: "#catalogo" },
  { label: "Luvas", href: "#catalogo" },
  { label: "WhatsApp", href: WHATSAPP_URL, external: true },
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
      {/* Top divider */}
      <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, #E95A0C, #F5A006, transparent)" }} />

      {/* Background watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span
          className="text-[12rem] sm:text-[18rem] lg:text-[24rem] font-black uppercase tracking-widest font-heading"
          style={{ color: "rgba(233, 90, 12, 0.015)" }}
        >
          FS
        </span>
      </div>

      {/* Subtle orange glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[160px]"
        style={{ background: "radial-gradient(ellipse, rgba(233, 90, 12, 0.06) 0%, transparent 70%)" }}
      />

      {/* Main footer content */}
      <div className="container relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ── Brand area ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="size-5" style={{ color: "#E95A0C" }} />
              <span className="text-lg font-black uppercase tracking-wider font-heading">
                <span className="text-gradient-fire">Fire</span>
                <span className="text-foreground">Skins</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
              Compra, venda e upgrade de skins CS2 com atendimento rápido e seguro.
            </p>
            {/* WhatsApp CTA */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-bold text-xs uppercase tracking-wider font-heading transition-all duration-300 hover:shadow-[0_0_20px_rgba(233,90,12,0.2)]"
              style={{
                background: "linear-gradient(135deg, #E95A0C, #F5A006)",
                color: "#fff",
              }}
            >
              <WhatsAppIcon className="size-3.5" />
              Chamar no WhatsApp
            </a>
          </div>

          {/* ── Quick links ── */}
          <div>
            <h4
              className="text-[10px] font-bold uppercase tracking-[0.3em] mb-5 font-heading"
              style={{ color: "#F5A006" }}
            >
              Links rápidos
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-[#F5A006] flex items-center gap-1.5"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="size-3 opacity-50" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4
              className="text-[10px] font-bold uppercase tracking-[0.3em] mb-5 font-heading"
              style={{ color: "#F5A006" }}
            >
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
                  <WhatsAppIcon className="size-3.5" />
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
                  <Instagram className="size-3.5" style={{ color: "#E95A0C" }} />
                  Instagram
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: "#E95A0C" }} />
                <span>Seg – Sex: 09h às 22h<br />Sáb – Dom: 10h às 18h</span>
              </li>
            </ul>
          </div>

          {/* ── Trust highlights ── */}
          <div>
            <h4
              className="text-[10px] font-bold uppercase tracking-[0.3em] mb-5 font-heading"
              style={{ color: "#F5A006" }}
            >
              Por que a FireSkins
            </h4>
            <ul className="space-y-3">
              {trustItems.map((item) => (
                <li key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <item.icon className="size-3.5 shrink-0" style={{ color: "#E95A0C" }} />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(233, 90, 12, 0.2), transparent)" }} />

      {/* Bottom bar */}
      <div className="container relative z-10 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
            © {new Date().getFullYear()} <span className="text-gradient-fire font-bold">FireSkins</span> — Todos os direitos reservados.
          </span>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[10px] text-muted-foreground uppercase tracking-widest transition-colors hover:text-[#F5A006]">
              Política de Privacidade
            </a>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <a href="#" className="text-[10px] text-muted-foreground uppercase tracking-widest transition-colors hover:text-[#F5A006]">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
