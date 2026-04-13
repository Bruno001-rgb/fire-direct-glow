import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useImportedSkins } from "@/hooks/useImportedSkins";
import { supabase } from "@/integrations/supabase/client";
import { Search, Loader2 } from "lucide-react";

const CATEGORY_WEAPON_MAP: Record<string, (weaponName: string) => boolean> = {
  facas: (w) => {
    const l = w.toLowerCase();
    return ["knife", "karambit", "bayonet", "butterfly", "falchion", "flip", "gut",
      "huntsman", "bowie", "shadow daggers", "stiletto", "talon", "ursus", "navaja",
      "classic knife", "paracord", "survival", "nomad", "skeleton", "kukri"].some(k => l.includes(k));
  },
  luvas: (w) => {
    const l = w.toLowerCase();
    return l.includes("gloves") || l.includes("wraps");
  },
  rifles: (w) => ["AK-47", "M4A4", "M4A1-S", "FAMAS", "Galil AR", "AUG", "SG 553"].includes(w),
  snipers: (w) => ["AWP", "SSG 08", "SCAR-20", "G3SG1"].includes(w),
  pistolas: (w) => ["Desert Eagle", "USP-S", "Glock-18", "P250", "Five-SeveN", "Tec-9", "CZ75-Auto", "R8 Revolver", "Dual Berettas", "P2000"].includes(w),
  smgs: (w) => ["MP9", "MAC-10", "MP7", "MP5-SD", "UMP-45", "P90", "PP-Bizon"].includes(w),
  shotguns: (w) => ["Nova", "XM1014", "Sawed-Off", "MAG-7"].includes(w),
  metralhadoras: (w) => ["M249", "Negev"].includes(w),
};

interface SkinSearchModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (skinId: string, preview: { name: string; weapon_name: string | null; pattern_name: string | null; image: string | null; rarity_name: string | null; price: number | null }) => void;
  categoryKey?: string;
}

export default function SkinSearchModal({ open, onClose, onSelect, categoryKey }: SkinSearchModalProps) {
  const [search, setSearch] = useState("");
  const { data: allSkins, isLoading } = useImportedSkins(search);

  const weaponFilter = categoryKey ? CATEGORY_WEAPON_MAP[categoryKey] : null;

  const skins = useMemo(() => {
    if (!allSkins) return [];
    let filtered = allSkins as any[];

    // Filter by category weapon type
    if (weaponFilter) {
      filtered = filtered.filter((s: any) => s.weapon_name && weaponFilter(s.weapon_name));
    }

    return filtered.slice(0, 100);
  }, [allSkins, weaponFilter]);

  const categoryLabel = categoryKey
    ? categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)
    : "Skin";

  const handleSelect = async (skin: any) => {
    onSelect(skin.source_skin_id, {
      name: skin.name,
      weapon_name: skin.weapon_name || null,
      pattern_name: skin.pattern_name || null,
      image: skin.image || null,
      rarity_name: skin.rarity_name || null,
      price: null,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] sm:max-h-[80vh] flex flex-col bg-background border-border mx-2 sm:mx-auto">
        <DialogHeader>
          <DialogTitle>Selecionar {categoryLabel}</DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder={`Buscar ${categoryKey ? categoryLabel.toLowerCase() : "skins"}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10 sm:h-9"
            autoFocus
          />
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 mt-2 -mx-2 px-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          ) : !skins.length ? (
            <p className="text-center text-muted-foreground py-12 text-sm">
              {search ? "Nenhuma skin encontrada" : "Digite para buscar skins"}
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {skins.map((skin: any) => (
                <button
                  key={skin.source_skin_id}
                  onClick={() => handleSelect(skin)}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-colors text-left min-h-[44px]"
                >
                  {skin.image && (
                    <img
                      src={skin.image}
                      alt={skin.name}
                      className="w-full aspect-square object-contain rounded bg-muted/30"
                      loading="lazy"
                    />
                  )}
                  <span className="text-[11px] sm:text-xs font-medium truncate w-full text-center">
                    {skin.weapon_name || ""}
                  </span>
                  <span className="text-[10px] text-muted-foreground truncate w-full text-center">
                    {skin.pattern_name || skin.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
