import knifeKarambitFade from "@/assets/knife-karambit-fade.jpg";
import knifeButterflyDoppler from "@/assets/knife-butterfly-doppler.jpg";
import knifeTalonFade from "@/assets/knife-talon-fade.jpg";
import knifeSkeletonFade from "@/assets/knife-skeleton-fade.jpg";
import gloveSport from "@/assets/glove-sport.jpg";
import gloveSportPandora from "@/assets/glove-sport-pandora.jpg";
import gloveSpecialistEmerald from "@/assets/glove-specialist-emerald.jpg";
import skinAwp from "@/assets/skin-awp.jpg";
import skinM4a4 from "@/assets/skin-m4a4.jpg";
import skinAk47Slaughter from "@/assets/skin-ak47-slaughter.jpg";
import knifeKarambitDoppler from "@/assets/knife-karambit-doppler.jpg";
import knifeButterflyFade from "@/assets/knife-butterfly-fade.jpg";
import gloveDriverCrimson from "@/assets/glove-driver-crimson.jpg";

const drops = [
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

const rarityBorder: Record<string, string> = {
  Covert: "border-red-500/60",
  Contraband: "border-amber-500/60",
  Extraordinary: "border-fuchsia-500/60",
  Remarkable: "border-purple-400/60",
};

const rarityText: Record<string, string> = {
  Covert: "text-red-400",
  Contraband: "text-amber-400",
  Extraordinary: "text-fuchsia-400",
  Remarkable: "text-purple-300",
};

const LiveDropTicker = () => {
  const items = [...drops, ...drops];

  return (
    <section className="relative overflow-hidden border-y border-primary/10 bg-card/40">
      {/* Label */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center px-3 sm:px-4 bg-gradient-to-r from-card via-card/95 to-transparent">
        <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-primary flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-red-500 animate-pulse" />
          LIVE
        </span>
      </div>

      {/* Fade edges */}
      <div className="absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-card to-transparent pointer-events-none" />

      {/* Scrolling track */}
      <div className="ticker-track flex items-center gap-3 py-2.5 pl-16 sm:pl-20">
        {items.map((drop, i) => (
          <div
            key={`${drop.name}-${i}`}
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-background/60 border ${rarityBorder[drop.rarity] || "border-primary/20"} flex-shrink-0`}
          >
            <img
              src={drop.image}
              alt={drop.name}
              className="size-8 rounded object-cover"
              loading="lazy"
            />
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-[11px] font-bold text-foreground whitespace-nowrap">
                {drop.name}
              </span>
              <span className={`text-[8px] font-bold uppercase tracking-wider ${rarityText[drop.rarity] || "text-muted-foreground"}`}>
                {drop.rarity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LiveDropTicker;
