import { useShowcaseSkins } from "@/hooks/useShowcaseSkins";

const SkinsSidebar = () => {
  const { data: skins } = useShowcaseSkins();
  if (!skins || skins.length === 0) return null;
  const items = [...skins, ...skins];

  return (
    <aside className="hidden lg:flex flex-col w-[220px] shrink-0 border-l border-primary/10 bg-card/40 relative overflow-hidden">
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b border-primary/10 px-4 py-3">
        <p className="text-xs font-bold uppercase tracking-widest text-primary">Catálogo</p>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <div className="animate-marquee-vertical flex flex-col gap-3 p-3">
          {items.map((skin, i) => (
            <a
              key={`${skin.name}-${i}`}
              href="/catalogo"
              className="group block rounded-lg border border-primary/10 bg-background/60 hover:border-primary/30 transition-all overflow-hidden"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-background/80 to-card">
                <img
                  src={skin.image}
                  alt={skin.name}
                  loading="lazy"
                  className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="px-3 py-2">
                <p className="text-xs font-semibold text-foreground truncate">{skin.name}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SkinsSidebar;
