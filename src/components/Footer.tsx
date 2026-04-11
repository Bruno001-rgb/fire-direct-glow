import { Instagram, Youtube, Mail, Facebook } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useWhatsAppUrl } from "@/hooks/useWhatsAppUrl";
import logoFireskins from "@/assets/logo-fireskins.webp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DiscordIcon = ({ className = "size-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const Footer = () => {
  const whatsAppUrl = useWhatsAppUrl();

  return (
    <footer id="contato" className="relative overflow-hidden">
      {/* Top orange bar */}
      <div className="h-1" style={{ background: "linear-gradient(90deg, #E95A0C, #F5A006)" }} />

      {/* Main footer */}
      <div
        className="relative"
        style={{ background: "linear-gradient(180deg, #1A1008 0%, #140C05 100%)" }}
      >
        <div className="container py-10 sm:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

            {/* Col 1 — Identity */}
            <div className="flex flex-col gap-4">
              <img src={logoFireskins} alt="FireSkins" className="h-10 w-auto object-contain self-start" loading="lazy" />
              <div className="space-y-1">
                <a href="mailto:suporte@fireskins.gg" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="size-4 shrink-0" style={{ color: "#E95A0C" }} />
                  suporte@fireskins.gg
                </a>
                <p className="text-xs text-muted-foreground pl-6">Suporte técnico</p>
              </div>
              {/* Social icons */}
              <div className="flex items-center gap-2 pt-2">
                {[
                  { icon: <DiscordIcon className="size-4" />, href: "#", label: "Discord" },
                  { icon: <WhatsAppIcon className="size-4" />, href: whatsAppUrl, label: "WhatsApp" },
                  { icon: <Instagram className="size-4" />, href: "https://instagram.com/fireskinscs2", label: "Instagram" },
                  { icon: <Youtube className="size-4" />, href: "#", label: "YouTube" },
                  { icon: <Facebook className="size-4" />, href: "#", label: "Facebook" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex items-center justify-center w-9 h-9 rounded-lg border transition-all duration-300 hover:scale-110 text-white/70 hover:text-white"
                    style={{ borderColor: "rgba(233,90,12,0.3)", background: "rgba(233,90,12,0.08)" }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2 — Serviços */}
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold uppercase tracking-widest" style={{ color: "#E95A0C" }}>Serviços</h4>
              {["Vender skins", "Programa de fidelidade", "Programa de indicação"].map((item) => (
                <a key={item} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a>
              ))}
            </div>

            {/* Col 3 — Produto */}
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold uppercase tracking-widest" style={{ color: "#E95A0C" }}>Produto</h4>
              {[
                "Perguntas frequentes",
                "Sobre nós",
                "Fale conosco",
                "A FireSkins é confiável?",
                "O que é a FireSkins",
                "Proteção contra golpes",
              ].map((item) => (
                <a key={item} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a>
              ))}
            </div>

            {/* Col 4 — Newsletter */}
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold uppercase tracking-widest" style={{ color: "#E95A0C" }}>Newsletter</h4>
              <p className="text-sm text-muted-foreground">Receba atualizações e ofertas exclusivas diretamente no seu email.</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Seu email"
                  className="h-9 text-sm border-[#E95A0C]/20 bg-black/40 focus-visible:ring-[#E95A0C]/30"
                />
                <Button variant="fire" size="sm" className="shrink-0 h-9 px-4 rounded-lg">
                  Enviar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-black/80 border-t" style={{ borderColor: "rgba(233,90,12,0.15)" }}>
        <div className="container py-5">
          {/* Row 1: Copyright + links */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
            <span className="text-xs text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()}{" "}
              <span className="font-bold text-foreground">FireSkins</span>
              . Todos os direitos reservados.
            </span>
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Termos de Serviço</a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Políticas de Privacidade</a>
            </div>
          </div>

          {/* Row 2: Payment badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            {["VISA", "MasterCard", "PayPal", "PIX", "Outros"].map((method) => (
              <span
                key={method}
                className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded border text-white/60"
                style={{ borderColor: "rgba(233,90,12,0.3)", background: "rgba(233,90,12,0.06)" }}
              >
                {method}
              </span>
            ))}
          </div>

          {/* Row 3: Tagline */}
          <p className="text-[11px] text-muted-foreground text-center">
            Melhor serviço de compra e venda de skins CS2 do Brasil.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
