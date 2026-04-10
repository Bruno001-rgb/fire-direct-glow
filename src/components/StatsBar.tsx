import { Flame, Users, Clock, ShieldCheck, Tag } from "lucide-react";

const stats = [
  { icon: Tag, label: "Skins pra todo bolso", accent: true, priority: true },
  { icon: Users, label: "1.200+ skins entregues", priority: true },
  { icon: Clock, label: "Entrega imediata", priority: false },
  { icon: ShieldCheck, label: "Pix, cartão e crypto", priority: false },
];

const StatsBar = () => {
  return (
    <div className="w-full bg-card/80 border-b border-primary/8">
      <div className="container flex items-center justify-center gap-3 sm:gap-6 lg:gap-8 h-8 overflow-x-auto scrollbar-hide">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`flex items-center gap-1.5 whitespace-nowrap ${!stat.priority ? "hidden sm:flex" : ""}`}
          >
            <stat.icon
              className={`size-3 flex-shrink-0 ${stat.accent ? "text-primary" : "text-muted-foreground"}`}
            />
            <span
              className={`text-[10px] sm:text-[11px] font-semibold tracking-wide ${
                stat.accent ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBar;
