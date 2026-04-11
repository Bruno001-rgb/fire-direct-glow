import footerBanner from "@/assets/footer-banner.avif";

const stats = [
  { value: "1.200+", label: "Negociações" },
  { value: "24h", label: "Atendimento" },
  { value: "100%", label: "Seguro" },
  { value: "desde 2024", label: "no mercado CS2" },
];

const Footer = () => {
  return (
    <footer className="relative bg-background text-foreground overflow-hidden">
      {/* Banner */}
      <div className="w-full">
        <img
          src={footerBanner}
          alt="FireSkins Banner"
          className="w-full h-[200px] sm:h-[280px] lg:h-[340px] object-cover"
        />
      </div>

      {/* Stats bar */}
      <div className="w-full bg-card border-y border-border/30">
        <div className="container grid grid-cols-2 sm:grid-cols-4 divide-x divide-border/20">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center py-6 sm:py-8 gap-1">
              <span className="text-2xl sm:text-3xl font-bold font-rajdhani text-foreground">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom section */}
      <div className="container py-8 flex flex-col items-center gap-4">
        <span className="text-2xl font-bold font-rajdhani tracking-wider text-primary">
          FIRESKINS
        </span>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Termos de Serviço</a>
          <span className="text-border">|</span>
          <a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a>
        </div>

        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          © FIRESKINS {new Date().getFullYear()} — TODOS OS DIREITOS RESERVADOS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
