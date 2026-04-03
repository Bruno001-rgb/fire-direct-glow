import { Flame, Users, Clock, ShieldCheck } from "lucide-react";

const stats = [
  { icon: Flame, label: "247 skins disponíveis", accent: true },
  { icon: Users, label: "1.2K+ negociações realizadas" },
  { icon: Clock, label: "Resposta em < 5 min" },
  { icon: ShieldCheck, label: "100% seguro" },
];

const StatsBar = () => {
  return (
    <div className="w-full bg-card/80 border-b border-primary/8">
      <div className="container flex items-center justify-center gap-4 sm:gap-8 h-8 overflow-x-auto scrollbar-hide">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-1.5 whitespace-nowrap"
          >
            <stat.icon
              className={`size-3 ${stat.accent ? "text-primary" : "text-muted-foreground"}`}
            />
            <span
              className={`text-[10px] sm:text-[11px] font-semibold tracking-wide ${
                stat.accent
                  ? "text-primary"
                  : "text-muted-foreground"
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
