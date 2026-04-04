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
            <div className="flex flex-col text-center sm:text-left">
              <div className="flex items-center gap-2 mb-3 justify-center sm:justify-start">
                <Instagram className="size-5" style={{ color: "#E95A0C" }} />
                <span className="text-sm text-muted-foreground">fireskinscs2</span>
              </div>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase font-heading leading-[1.1]">
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
              <div
                className="flex items-center gap-0 mt-4 rounded-md overflow-hidden w-fit mx-auto sm:mx-0"
                style={{
                  border: "1.5px solid #E95A0C",
                  background: "rgba(20, 12, 5, 0.9)",
                }}
              >
                {/* PIX - diamond/rhombus icon */}
                <div className="flex items-center gap-2 px-4 py-1.5">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                    <path d="M13.4 4.6l5.9 5.9a2 2 0 010 2.8l-5.9 5.9a2 2 0 01-2.8 0l-5.9-5.9a2 2 0 010-2.8l5.9-5.9a2 2 0 012.8 0z" stroke="#E95A0C" strokeWidth="1.8" />
                    <path d="M9 12h6M12 9v6" stroke="#E95A0C" strokeWidth="1.5" />
                  </svg>
                  <span className="text-sm font-black uppercase tracking-wider text-white">PIX</span>
                </div>
                <div className="w-px h-5" style={{ background: "rgba(233,90,12,0.5)" }} />
                {/* CRYPTO - Bitcoin circle */}
                <div className="flex items-center gap-2 px-4 py-1.5">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#E95A0C" strokeWidth="1.8" />
                    <path d="M9.5 8h3.5c1.4 0 2.5.9 2.5 2s-1.1 2-2.5 2H9.5V8zM9.5 12h4c1.4 0 2.5.9 2.5 2s-1.1 2-2.5 2H9.5v-4zM11 6.5V8M13 6.5V8M11 16v1.5M13 16v1.5" stroke="#E95A0C" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span className="text-sm font-black uppercase tracking-wider text-white">CRYPTO</span>
                </div>
                <div className="w-px h-5" style={{ background: "rgba(233,90,12,0.5)" }} />
                {/* CARTÃO - credit card icon */}
                <div className="flex items-center gap-2 px-4 py-1.5">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                    <rect x="2" y="5" width="20" height="14" rx="2" stroke="#E95A0C" strokeWidth="1.8" />
                    <path d="M2 10h20" stroke="#E95A0C" strokeWidth="1.8" />
                    <rect x="5" y="14" width="4" height="2" rx="0.5" fill="#E95A0C" opacity="0.6" />
                  </svg>
                  <span className="text-sm font-black uppercase tracking-wider text-white">CARTÃO</span>
                </div>
              </div>
            </div>

            {/* ── Center: navigation links ── */}
            <div className="flex flex-col items-center gap-4 py-4">
              {[
                { label: "Início", href: "#topo" },
                { label: "Categorias", href: "#catalogo" },
                { label: "Skins", href: "#catalogo" },
                { label: "Vídeos", href: "#como-funciona" },
                { label: "Contato", href: "#contato" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-lg sm:text-xl font-bold uppercase tracking-widest transition-colors hover:text-[#F5A006]"
                  style={{ color: "#E95A0C" }}
                >
                  {link.label}
                </a>
              ))}
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
