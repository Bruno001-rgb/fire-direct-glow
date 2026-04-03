import { MessageCircle, Star } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Ol%C3%A1%2C%20tenho%20interesse%20na%20skin%20";

export interface SkinItem {
  name: string;
  skin: string;
  category: "facas" | "luvas" | "rifles" | "snipers";
  rarity: string;
  image: string;
}

const rarityColor: Record<string, string> = {
  Covert: "bg-red-500",
  Contraband: "bg-amber-500",
  Extraordinary: "bg-fuchsia-500",
  Remarkable: "bg-purple-500",
  Exotic: "bg-pink-500",
  Classified: "bg-rose-500",
};

const rarityText: Record<string, string> = {
  Covert: "text-red-400",
  Contraband: "text-amber-400",
  Extraordinary: "text-fuchsia-400",
  Remarkable: "text-purple-400",
  Exotic: "text-pink-400",
  Classified: "text-rose-400",
};

const SkinCard = ({ item }: { item: SkinItem }) => (
  <a
    href={`${WHATSAPP_URL}${encodeURIComponent(item.name + " " + item.skin)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative flex flex-col overflow-hidden rounded-xl border border-accent/20 bg-[hsl(265,40%,8%)]/80 backdrop-blur-sm hover:border-primary/60 transition-all duration-300 hover:shadow-[0_0_40px_-4px_hsl(var(--primary)/0.4)]"
  >
    {/* Geometric wireframe accent */}
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(30deg, transparent 48%, hsl(22 91% 47% / 0.3) 49%, hsl(22 91% 47% / 0.3) 51%, transparent 52%),
          linear-gradient(150deg, transparent 48%, hsl(254 55% 52% / 0.2) 49%, hsl(254 55% 52% / 0.2) 51%, transparent 52%)`,
        backgroundSize: "60px 60px",
      }}
    />

    {/* Badge */}
    <div className="absolute top-2 right-2 z-10">
      <span className="px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-bold uppercase tracking-wider bg-primary/90 text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.4)]">
        Disponível
      </span>
    </div>

    {/* Image */}
    <div className="aspect-square overflow-hidden relative bg-gradient-to-br from-[hsl(265,35%,10%)] to-[hsl(265,30%,6%)]">
      <img
        src={item.image}
        alt={`${item.name} ${item.skin}`}
        loading="lazy"
        width={512}
        height={512}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      {/* Bottom gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(265,40%,8%)] via-transparent to-transparent opacity-80" />
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-500" />
    </div>

    {/* Info */}
    <div className="p-3 sm:p-4 flex flex-col gap-1 flex-1 relative z-10">
      <div className="flex items-center gap-1.5">
        <Star className="size-3 sm:size-3.5 text-primary fill-primary flex-shrink-0 drop-shadow-[0_0_4px_hsl(var(--primary)/0.5)]" />
        <p className="text-xs sm:text-sm font-extrabold text-primary tracking-wide truncate">{item.name}</p>
      </div>
      <p className="text-[10px] sm:text-xs text-muted-foreground font-medium">{item.skin}</p>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-[8px] sm:text-[9px] text-muted-foreground/70 uppercase tracking-wider">Estado:</span>
        <span className="text-[8px] sm:text-[9px] font-semibold text-foreground/80 uppercase tracking-wider">Novo de Fábrica</span>
      </div>
      <div className="flex items-center justify-between mt-auto pt-2">
        <span className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-widest ${rarityText[item.rarity] || "text-muted-foreground"}`}>
          {item.rarity}
        </span>
      </div>
    </div>

    {/* Negociar button */}
    <div className="px-3 pb-3 sm:px-4 sm:pb-4">
      <span className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-whatsapp/10 border border-whatsapp/30 text-whatsapp text-[10px] sm:text-[11px] font-bold uppercase tracking-wider group-hover:bg-whatsapp group-hover:text-whatsapp-foreground transition-all duration-300 group-hover:shadow-[0_0_16px_hsl(var(--whatsapp)/0.3)]">
        <MessageCircle className="size-3" />
        Negociar
      </span>
    </div>

    {/* Rarity bar with glow */}
    <div className={`h-[3px] w-full ${rarityColor[item.rarity] || "bg-muted"}`}
      style={{ boxShadow: `0 0 8px currentColor` }}
    />
  </a>
);

export default SkinCard;
