interface CatalogFiltersProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const weaponTypes = [
  { key: "todas", label: "Todas" },
  { key: "facas", label: "Facas" },
  { key: "luvas", label: "Luvas" },
  { key: "rifles", label: "Rifles" },
  { key: "snipers", label: "Snipers" },
];

const qualities = ["Covert", "Contraband", "Extraordinary", "Remarkable", "Classified"];

const qualityColors: Record<string, string> = {
  Covert: "bg-red-500",
  Contraband: "bg-amber-500",
  Extraordinary: "bg-fuchsia-500",
  Remarkable: "bg-purple-500",
  Classified: "bg-rose-500",
};

const paletteColors = [
  { color: "bg-primary", label: "Orange" },
  { color: "bg-secondary", label: "Gold" },
  { color: "bg-accent", label: "Purple" },
];

const CatalogFilters = ({ activeTab, onTabChange }: CatalogFiltersProps) => {
  return (
    <aside className="hidden lg:block w-[220px] xl:w-[240px] flex-shrink-0 sticky top-20 h-fit">
      <div className="rounded-xl border border-accent/20 bg-[hsl(265,40%,8%)]/60 backdrop-blur-sm p-4 space-y-6">
        {/* Tipo de Arma */}
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
            Tipo de Arma
          </h3>
          <div className="space-y-1">
            {weaponTypes.map((t) => (
              <button
                key={t.key}
                onClick={() => onTabChange(t.key)}
                className={`w-full text-left px-3 py-2 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === t.key
                    ? "bg-primary/15 text-primary border border-primary/30 shadow-[0_0_12px_hsl(var(--primary)/0.15)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30 border border-transparent"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        {/* Qualidade */}
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
            Qualidade
          </h3>
          <div className="space-y-1.5">
            {qualities.map((q) => (
              <div key={q} className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted/20 transition-colors cursor-pointer">
                <span className={`size-2.5 rounded-full ${qualityColors[q]} shadow-[0_0_6px_currentColor]`} />
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{q}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        {/* Cor */}
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
            Cor
          </h3>
          <div className="flex gap-2 mb-2">
            {paletteColors.map((c) => (
              <button
                key={c.label}
                className={`size-7 rounded-lg ${c.color} hover:scale-110 transition-transform duration-200 shadow-[0_0_10px_hsl(var(--primary)/0.2)] border-2 border-transparent hover:border-foreground/30`}
                title={c.label}
              />
            ))}
          </div>
          <p className="text-[9px] text-muted-foreground/60 uppercase tracking-wider">Filtrar por paleta</p>
        </div>

        {/* Geometric accent */}
        <div className="relative h-16 overflow-hidden rounded-lg opacity-20">
          <svg viewBox="0 0 200 60" className="w-full h-full" fill="none">
            <polygon points="10,50 50,10 90,50" stroke="hsl(22 91% 47%)" strokeWidth="0.5" opacity="0.6" />
            <polygon points="60,50 100,10 140,50" stroke="hsl(254 55% 52%)" strokeWidth="0.5" opacity="0.4" />
            <polygon points="110,50 150,10 190,50" stroke="hsl(38 92% 49%)" strokeWidth="0.5" opacity="0.5" />
            <line x1="0" y1="30" x2="200" y2="30" stroke="hsl(22 91% 47%)" strokeWidth="0.3" opacity="0.3" />
          </svg>
        </div>
      </div>
    </aside>
  );
};

export default CatalogFilters;
