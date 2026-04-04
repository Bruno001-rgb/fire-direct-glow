import { Instagram } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import logoFireskins from "@/assets/logo-fireskins.webp";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20skins%20CS2!";

const Footer = () => {
  return (
    <footer id="contato" className="relative overflow-hidden">
      {/* ── Top orange bar ── */}
      <div className="h-3 sm:h-4" style={{ background: "linear-gradient(90deg, #E95A0C, #F5A006)" }} />

      {/* ── Main footer band ── */}
      <div
        className="relative"
        style={{
          background: "linear-gradient(135deg, #1A1008 0%, #1C0F06 30%, #18100A 60%, #1A0E08 100%)",
        }}
      >
        {/* Subtle diagonal pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(-55deg, transparent, transparent 40px, rgba(233,90,12,0.3) 40px, rgba(233,90,12,0.3) 41px)`,
          }}
        />

        {/* Subtle circles decoration */}
        <div
          className="absolute right-[15%] top-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] rounded-full opacity-[0.06]"
          style={{ border: "1px solid #E95A0C" }}
        />
        <div
          className="absolute right-[12%] top-1/2 -translate-y-1/2 w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] rounded-full opacity-[0.04]"
          style={{ border: "1px solid #E95A0C" }}
        />

        <div className="container relative z-10 py-8 sm:py-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">

            {/* ── Left side: text info ── */}
            <div className="flex flex-col gap-8 text-center sm:text-left">
              {/* Brand + heading */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase font-heading leading-tight">
                  <span className="text-foreground">Venda & </span>
                  <br />
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(135deg, #E95A0C, #F5A006)" }}
                  >
                    Upgrade
                  </span>
                  <br />
                  <span className="text-foreground">das suas skins!</span>
                </h3>

                {/* Payment methods */}
                <div className="flex items-center gap-2 mt-3 justify-center sm:justify-start">
                  {["Pix", "Crypto", "Cartão"].map((method) => (
                    <span
                      key={method}
                      className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm"
                      style={{
                        background: "rgba(233, 90, 12, 0.15)",
                        border: "1px solid rgba(233, 90, 12, 0.3)",
                        color: "#F5A006",
                      }}
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
                {/* Páginas */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#E95A0C" }}>
                    Páginas
                  </h4>
                  <ul className="space-y-2">
                    {[
                      { label: "Início", href: "#hero" },
                      { label: "Categorias", href: "#categorias" },
                      { label: "Showcase", href: "#showcase" },
                      { label: "Contato", href: "#contato" },
                    ].map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-[#F5A006] transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Redes & Contato */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#E95A0C" }}>
                    Contato
                  </h4>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="https://instagram.com/fireskinscs2"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#F5A006] transition-colors justify-center sm:justify-start"
                      >
                        <Instagram className="size-4" style={{ color: "#E95A0C" }} />
                        @fireskinscs2
                      </a>
                    </li>
                    <li>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#F5A006] transition-colors justify-center sm:justify-start"
                      >
                        <WhatsAppIcon className="size-4 text-[#E95A0C]" />
                        WhatsApp
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ── Right side: large FS logo ── */}
            <div className="flex-shrink-0 relative">
              <img
                src={logoFireskins}
                alt="FireSkins"
                className="h-80 sm:h-[26rem] lg:h-[36rem] w-auto object-contain -my-20 sm:-my-28 lg:-my-40"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom orange bar ── */}
      <div className="h-3 sm:h-4" style={{ background: "linear-gradient(90deg, #E95A0C, #F5A006)" }} />

      {/* ── Bottom copyright ── */}
      <div className="bg-black">
        <div className="container py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
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
