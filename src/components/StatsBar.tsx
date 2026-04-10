import { Flame, Users, Clock, ShieldCheck, Tag } from "lucide-react";

const stats = [
  { icon: Tag, label: "Skins a partir de R$5", accent: true, priority: true },
  { icon: Users, label: "1.2K+ negociações", priority: true },
  { icon: Clock, label: "Resposta em < 5 min", priority: false },
  { icon: ShieldCheck, label: "100% seguro", priority: false },
];

const StatsBar = () => {
  return (
    <div className="w-full bg-card border-b border-primary/8">
      <div className="container flex items-center justify-center gap-3 sm:gap-6 lg:gap-8 h-8 overflow-x-auto scrollbar-hide">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-1.5 whitespace-nowrap"
          >
            <stat.icon
              className={`size-3 flex-shrink-0 ${stat.accent ? "text-primary" : "text-muted-foreground"}`}
            />
            <span
              className={`text-sm font-semibold tracking-wide ${
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
