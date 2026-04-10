import { useShowcaseSkins } from "@/hooks/useShowcaseSkins";

const WHATSAPP_URL = "https://wa.me/5562996632201";

const rarityColor: Record<string, string> = {
  Covert: "text-red-400",
  Contraband: "text-amber-400",
  Extraordinary: "text-fuchsia-400",
  Remarkable: "text-purple-300",
  Exotic: "text-pink-300",
};

const SkinsSidebar = () => {
  const { data: skins } = useShowcaseSkins();

  if (!skins || skins.length === 0) return null;

  // Duplicate for infinite scroll loop
  const items = [...skins, ...skins];

  return (
    <aside className="hidden lg:block w-[110px] xl:w-[130px] flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-hidden border-r border-primary/10 bg-card/30">
      <div className="sidebar-scroll-track">
        <div className="sidebar-scroll-content">
          {items.map((skin, i) => (
            <a
              key={`${skin.name}-${skin.skin}-${i}`}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-1.5 xl:p-2 group"
            >
              <div className="rounded-lg overflow-hidden border border-primary/10 group-hover:border-primary/40 transition-colors duration-300 bg-card/50">
                <div className="aspect-square overflow-hidden bg-background/50">
                  <img
                    src={skin.image}
                    alt={`${skin.name} ${skin.skin}`}
                    loading="lazy"
                    className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="px-1.5 py-1 text-center">
                  <p className="text-[8px] xl:text-[9px] font-bold truncate leading-tight">{skin.name}</p>
                  <p className={`text-[7px] xl:text-[8px] font-bold uppercase tracking-wider ${rarityColor[skin.rarity] || "text-muted-foreground"}`}>
                    {skin.rarity}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SkinsSidebar;
