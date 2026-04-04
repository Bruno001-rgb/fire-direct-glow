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

        {/* Circles + Logo centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full opacity-[0.08]"
          style={{ border: "1px solid #E95A0C" }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full opacity-[0.05]"
          style={{ border: "1px solid #E95A0C" }}
        />

        {/* Logo in center of circles */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[5]">
          <img
            src={logoFireskins}
            alt="FireSkins"
            className="h-48 sm:h-64 lg:h-80 w-auto object-contain"
            loading="lazy"
          />
        </div>

        <div className="container relative z-10 py-8 sm:py-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">

            {/* ── Left side: text info ── */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-14 lg:gap-20 text-center sm:text-left">
              {/* Brand + Instagram */}
              <div>
                <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
                  <Instagram className="size-4" style={{ color: "#E95A0C" }} />
                  <span className="text-sm text-muted-foreground">fireskinscs2</span>
                </div>
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
