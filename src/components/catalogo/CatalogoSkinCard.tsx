import type { ByMykelSkin } from "@/hooks/useByMykelSkins";

interface Props {
  skin: ByMykelSkin;
  onClick: (skin: ByMykelSkin) => void;
}

export default function CatalogoSkinCard({ skin, onClick }: Props) {
  const rarityColor = skin.rarity?.color || "#888";

  return (
    <button
      onClick={() => onClick(skin)}
      className="group text-left rounded-lg overflow-hidden transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      style={{
        background: "#111",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "transparent",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = rarityColor;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "transparent";
      }}
    >
      {/* Rarity bar */}
      <div className="h-1.5 w-full" style={{ background: rarityColor }} />

      <div className="p-3 flex flex-col items-center gap-2">
        <div className="w-full aspect-square flex items-center justify-center p-2">
          <img
            src={skin.image}
            alt={skin.name}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
          />
        </div>

        <div className="w-full space-y-1">
          <p className="text-sm font-bold text-foreground truncate">{skin.name}</p>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
              style={{ background: rarityColor + "30", color: rarityColor }}
            >
              {skin.rarity?.name || "Unknown"}
            </span>
            {skin.stattrak && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary/20 text-primary">
                ST
              </span>
            )}
          </div>
          {skin.price != null && (
            <p className="text-sm font-extrabold text-primary mt-1">
              R$ {skin.price.toFixed(2).replace(".", ",")}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
