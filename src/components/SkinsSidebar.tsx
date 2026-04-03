import knifeKarambit from "@/assets/knife-karambit.jpg";
import knifeButterfly from "@/assets/knife-butterfly.jpg";
import knifeTalon from "@/assets/knife-talon.jpg";
import knifeSkeleton from "@/assets/knife-skeleton.jpg";
import gloveSport from "@/assets/glove-sport.jpg";
import gloveSpecialist from "@/assets/glove-specialist.jpg";
import gloveDriver from "@/assets/glove-driver.jpg";
import gloveMoto from "@/assets/glove-moto.jpg";
import skinAk47 from "@/assets/skin-ak47.jpg";
import skinAwp from "@/assets/skin-awp.jpg";
import skinM4a4 from "@/assets/skin-m4a4.jpg";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20tenho%20interesse%20na%20skin%20";

const sidebarSkins = [
  { name: "Karambit Fade", image: knifeKarambit, rarity: "Covert" },
  { name: "AWP Dragon Lore", image: skinAwp, rarity: "Contraband" },
  { name: "Sport Gloves Vice", image: gloveSport, rarity: "Extraordinary" },
  { name: "Butterfly Doppler", image: knifeButterfly, rarity: "Covert" },
  { name: "M4A4 Howl", image: skinM4a4, rarity: "Contraband" },
  { name: "Specialist Crimson", image: gloveSpecialist, rarity: "Extraordinary" },
  { name: "Talon Tiger Tooth", image: knifeTalon, rarity: "Covert" },
  { name: "AK-47 Asiimov", image: skinAk47, rarity: "Covert" },
  { name: "Driver King Snake", image: gloveDriver, rarity: "Remarkable" },
  { name: "Skeleton Crimson", image: knifeSkeleton, rarity: "Extraordinary" },
  { name: "Moto Cool Mint", image: gloveMoto, rarity: "Exotic" },
];

const rarityColor: Record<string, string> = {
  Covert: "text-red-400",
  Contraband: "text-secondary",
  Extraordinary: "text-secondary",
  Remarkable: "text-purple-300",
  Exotic: "text-pink-300",
};

const SkinsSidebar = () => {
  // Duplicate items for seamless infinite scroll
  const items = [...sidebarSkins, ...sidebarSkins];

  return (
    <aside className="hidden lg:block w-[110px] xl:w-[130px] flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-hidden border-r border-primary/10 bg-card/30">
      <div className="sidebar-scroll-track">
        <div className="sidebar-scroll-content">
          {items.map((skin, i) => (
            <a
              key={`${skin.name}-${i}`}
              href={`${WHATSAPP_URL}${encodeURIComponent(skin.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-1.5 xl:p-2 group"
            >
              <div className="rounded-lg overflow-hidden border border-primary/10 group-hover:border-primary/40 transition-colors duration-300 bg-card/50">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={skin.image}
                    alt={skin.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
