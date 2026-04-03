import knifeKarambitFade from "@/assets/knife-karambit-fade.jpg";
import knifeKarambitDoppler from "@/assets/knife-karambit-doppler.jpg";
import knifeButterflyFade from "@/assets/knife-butterfly-fade.jpg";
import knifeButterflyDoppler from "@/assets/knife-butterfly-doppler.jpg";
import knifeTalonFade from "@/assets/knife-talon-fade.jpg";
import knifeSkeletonFade from "@/assets/knife-skeleton-fade.jpg";
import gloveSport from "@/assets/glove-sport.jpg";
import gloveSportPandora from "@/assets/glove-sport-pandora.jpg";
import gloveSpecialistEmerald from "@/assets/glove-specialist-emerald.jpg";
import gloveDriverCrimson from "@/assets/glove-driver-crimson.jpg";
import skinAwp from "@/assets/skin-awp.jpg";
import skinM4a4 from "@/assets/skin-m4a4.jpg";
import skinAk47Slaughter from "@/assets/skin-ak47-slaughter.jpg";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20tenho%20interesse%20na%20skin%20";

const sidebarSkins = [
  { name: "Karambit Fade", image: knifeKarambitFade, rarity: "Covert" },
  { name: "AWP Dragon Lore", image: skinAwp, rarity: "Contraband" },
  { name: "Sport Gloves Vice", image: gloveSport, rarity: "Extraordinary" },
  { name: "Butterfly Doppler", image: knifeButterflyDoppler, rarity: "Covert" },
  { name: "M4A4 Howl", image: skinM4a4, rarity: "Contraband" },
  { name: "Specialist Emerald", image: gloveSpecialistEmerald, rarity: "Extraordinary" },
  { name: "Talon Fade", image: knifeTalonFade, rarity: "Covert" },
  { name: "AK-47 Slaughter", image: skinAk47Slaughter, rarity: "Covert" },
  { name: "Driver Crimson", image: gloveDriverCrimson, rarity: "Remarkable" },
  { name: "Skeleton Fade", image: knifeSkeletonFade, rarity: "Covert" },
  { name: "Pandora's Box", image: gloveSportPandora, rarity: "Extraordinary" },
  { name: "Butterfly Fade", image: knifeButterflyFade, rarity: "Covert" },
  { name: "Karambit Doppler", image: knifeKarambitDoppler, rarity: "Covert" },
];

const rarityColor: Record<string, string> = {
  Covert: "text-red-400",
  Contraband: "text-amber-400",
  Extraordinary: "text-fuchsia-400",
  Remarkable: "text-purple-300",
  Exotic: "text-pink-300",
};

const SkinsSidebar = () => {
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
