import { Instagram, Youtube, Mail, Facebook } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import blackbotLogo from "@/assets/blackbot-logo.png";
import { useWhatsAppUrl } from "@/hooks/useWhatsAppUrl";
import logoFireskins from "@/assets/logo-fireskins-full.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const DiscordIcon = ({ className = "size-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const Footer = () => {
  const whatsAppUrl = useWhatsAppUrl();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({});

  useEffect(() => {
    supabase
      .from("site_credentials")
      .select("key, href")
      .in("key", ["discord", "facebook", "youtube", "instagram"])
      .then(({ data }) => {
        const map: Record<string, string> = {};
        data?.forEach((d) => { if (d.href) map[d.key] = d.href; });
        setSocialLinks(map);
      });
  }, []);

  const handleSubscribe = async () => {
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Digite um email válido.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: trimmed });
    setLoading(false);
    if (error) {
      if (error.code === "23505") {
        toast.info("Este email já está cadastrado!");
      } else {
        toast.error("Erro ao cadastrar. Tente novamente.");
      }
      return;
    }
    toast.success("Inscrito com sucesso! 🎉");
    setEmail("");
  };

  return (
    <footer id="contato" className="relative overflow-hidden">
      {/* Top orange bar */}
      <div className="h-1" style={{ background: "linear-gradient(90deg, #E95A0C, #F5A006)" }} />

      {/* Main footer */}
      <div
        className="relative"
        style={{ background: "linear-gradient(180deg, #1A1008 0%, #140C05 100%)" }}
      >
        <div className="container py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

            {/* Col 1 — Identity */}
            <div className="flex flex-col gap-2 lg:-mt-12">
              <img src={logoFireskins} alt="FireSkins" className="h-40 lg:h-60 w-auto max-w-[600px] object-contain self-start -ml-8 lg:-ml-16" loading="lazy" />
              <div className="space-y-1">
                <a href="mailto:suporte@fireskins.gg" className="flex items-center gap-2 text-base text-white/70 hover:text-white transition-colors">
                  <Mail className="size-4 shrink-0" style={{ color: "#E95A0C" }} />
                  suporte@fireskins.gg
                </a>
                <p className="text-sm text-white/50 pl-6">Suporte técnico</p>
              </div>
              {/* Social icons */}
              <div className="flex items-center gap-2 pt-2">
                {[
                  { icon: <DiscordIcon className="size-4" />, href: socialLinks.discord || "#", label: "Discord" },
                  { icon: <WhatsAppIcon className="size-4" />, href: whatsAppUrl, label: "WhatsApp" },
                  { icon: <Instagram className="size-4" />, href: socialLinks.instagram || "https://instagram.com/fireskinscs2", label: "Instagram" },
                  { icon: <Youtube className="size-4" />, href: socialLinks.youtube || "#", label: "YouTube" },
                  { icon: <Facebook className="size-4" />, href: socialLinks.facebook || "#", label: "Facebook" },
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
              <h4 className="text-base font-bold uppercase tracking-widest" style={{ color: "#E95A0C" }}>Serviços</h4>
              {[
                { label: "Vender skins", href: whatsAppUrl, external: true },
                { label: "Catálogo de skins", href: "/catalogo", external: false },
                { label: "Monte seu loadout", href: "/loadout", external: false },
              ].map((item) => (
                <a key={item.label} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined} className="text-base text-white/80 hover:text-white transition-all duration-200 hover:translate-x-1">{item.label}</a>
              ))}
            </div>

            {/* Col 3 — Produto */}
            <div className="flex flex-col gap-3">
              <h4 className="text-base font-bold uppercase tracking-widest" style={{ color: "#E95A0C" }}>Produto</h4>
              {[
                { label: "Sobre nós", href: "#sobre" },
                { label: "A FireSkins é confiável?", href: "#depoimentos" },
                { label: "Perguntas frequentes", href: "#contato" },
                { label: "Fale conosco", href: whatsAppUrl, external: true },
                { label: "Proteção contra golpes", href: "#sobre" },
              ].map((item) => (
                <a key={item.label} href={item.href} target={(item as any).external ? "_blank" : undefined} rel={(item as any).external ? "noopener noreferrer" : undefined} className="text-base text-white/80 hover:text-white transition-all duration-200 hover:translate-x-1">{item.label}</a>
              ))}
            </div>

            {/* Col 4 — Newsletter */}
            <div className="flex flex-col gap-3">
              <h4 className="text-base font-bold uppercase tracking-widest" style={{ color: "#E95A0C" }}>Newsletter</h4>
              <p className="text-base text-white/70">Receba atualizações e ofertas exclusivas diretamente no seu email.</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Digite seu melhor email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  className="h-9 text-sm border-[#E95A0C]/20 bg-black/40 focus-visible:ring-[#E95A0C]/30"
                />
                <Button variant="fire" size="sm" className="shrink-0 h-9 px-4 rounded-lg" onClick={handleSubscribe} disabled={loading}>
                  {loading ? "..." : "Enviar"}
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
             <span className="text-sm text-white/60 text-center sm:text-left">
              © {new Date().getFullYear()}{" "}
              <span className="font-bold text-white">FireSkins</span>
              . Todos os direitos reservados.
            </span>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Termos de Serviço</a>
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Políticas de Privacidade</a>
            </div>
          </div>

          {/* Row 2: Payment badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            {/* Visa */}
            <span className="flex items-center justify-center px-3 py-1.5 rounded border" style={{ borderColor: "rgba(233,90,12,0.3)", background: "rgba(233,90,12,0.06)" }}>
              <svg viewBox="0 0 48 16" className="h-5 w-auto" aria-label="Visa">
                <path d="M19.4 1.2L15.8 14.8H12.4L16 1.2H19.4ZM33.6 9.8L35.4 4.6L36.4 9.8H33.6ZM37.4 14.8H40.4L37.8 1.2H35C34.2 1.2 33.4 1.6 33.2 2.4L27.8 14.8H31.4L32.2 12.6H36.6L37.4 14.8ZM28.2 10.2C28.2 6.4 22.8 6.2 22.8 4.4C22.8 3.8 23.4 3.2 24.6 3C25.2 3 27 2.8 28.8 3.8L29.6 1.6C28.6 1.2 27.4 0.8 25.8 0.8C22.4 0.8 20 2.6 20 5.2C20 7.2 21.8 8.2 23.2 8.8C24.6 9.4 25 9.8 25 10.4C25 11.2 24 11.6 23.2 11.6C21.4 11.6 20.4 11.2 19.6 10.8L18.8 13C19.6 13.4 21.2 13.8 22.8 13.8C26.4 13.8 28.2 12 28.2 10.2ZM11.2 1.2L6 14.8H2.4L0 3.4C0 2.8 0 2.6 -0.4 2.2C-1 1.6 -2 1.2 -3 0.8L-2.8 0.4H2.4C3.2 0.4 4 1 4.2 1.8L5.2 8L8.8 1.2H11.2Z" fill="#1A1F71" transform="translate(5,0)"/>
              </svg>
            </span>
            {/* Mastercard */}
            <span className="flex items-center justify-center px-3 py-1.5 rounded border" style={{ borderColor: "rgba(233,90,12,0.3)", background: "rgba(233,90,12,0.06)" }}>
              <svg viewBox="0 0 32 20" className="h-5 w-auto" aria-label="Mastercard">
                <circle cx="11" cy="10" r="8" fill="#EB001B"/>
                <circle cx="21" cy="10" r="8" fill="#F79E1B"/>
                <path d="M16 3.8a8 8 0 010 12.4 8 8 0 000-12.4z" fill="#FF5F00"/>
              </svg>
            </span>
            {/* PayPal */}
            <span className="flex items-center justify-center px-3 py-1.5 rounded border" style={{ borderColor: "rgba(233,90,12,0.3)", background: "rgba(233,90,12,0.06)" }}>
              <svg viewBox="0 0 40 16" className="h-5 w-auto" aria-label="PayPal">
                <path d="M13.5 2H9.2c-.3 0-.6.2-.7.5L6.8 13c0 .2.1.4.3.4h2.1c.3 0 .6-.2.7-.5l.5-2.8c0-.3.3-.5.7-.5h1.5c3.1 0 4.9-1.5 5.4-4.5.2-1.3 0-2.3-.6-3C16.8 1.4 15.3 2 13.5 2z" fill="#003087"/>
                <path d="M24.5 2h-4.3c-.3 0-.6.2-.7.5L17.8 13c0 .2.1.4.3.4h2.2c.2 0 .4-.1.5-.3l.5-3c0-.3.3-.5.7-.5h1.5c3.1 0 4.9-1.5 5.4-4.5.2-1.3 0-2.3-.6-3C27.8 1.4 26.3 2 24.5 2z" fill="#0070E0"/>
              </svg>
            </span>
            {/* PIX */}
            <span className="flex items-center justify-center px-3 py-1.5 rounded border" style={{ borderColor: "rgba(233,90,12,0.3)", background: "rgba(233,90,12,0.06)" }}>
              <svg viewBox="0 0 20 20" className="h-5 w-auto" aria-label="PIX">
                <path d="M14.5 15.5l-3.8-3.8a1 1 0 00-1.4 0L5.5 15.5a1 1 0 01-1.4 0L2 13.4a1 1 0 010-1.4l3.8-3.8a1 1 0 000-1.4L2 3a1 1 0 010-1.4L4.1.5a1 1 0 011.4 0l3.8 3.8a1 1 0 001.4 0L14.5.5a1 1 0 011.4 0L18 2.6a1 1 0 010 1.4l-3.8 3.8a1 1 0 000 1.4L18 13a1 1 0 010 1.4l-2.1 2.1a1 1 0 01-1.4 0z" fill="#32BCAD"/>
              </svg>
            </span>
          </div>

          {/* Row 3: Tagline */}
          <p className="text-sm text-white/50 text-center mt-1">
            Melhor serviço de compra e venda de skins CS2 do Brasil.
          </p>

          {/* BlackBot credit */}
          <div className="flex items-center justify-center gap-2 mt-4 pt-3 border-t" style={{ borderColor: "rgba(233,90,12,0.1)" }}>
            <span className="text-xs text-white/40">Feito por</span>
            <a
              href="https://blackbotdigital.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors"
            >
              <img src={blackbotLogo} alt="BlackBot" className="h-5 w-5 object-contain" />
              <span className="font-semibold">BlackBot</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
