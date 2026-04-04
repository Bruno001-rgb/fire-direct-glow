import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useImportedSkins } from "@/hooks/useImportedSkins";
import { Search, Loader2 } from "lucide-react";

interface SkinSearchModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (skinId: string, preview: { name: string; weapon_name: string | null; pattern_name: string | null; image: string | null; rarity_name: string | null }) => void;
}

export default function SkinSearchModal({ open, onClose, onSelect }: SkinSearchModalProps) {
  const [search, setSearch] = useState("");
  const { data: skins, isLoading } = useImportedSkins(search);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col bg-background border-border">
        <DialogHeader>
          <DialogTitle>Selecionar Skin</DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, arma ou pattern..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 mt-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          ) : !skins?.length ? (
            <p className="text-center text-muted-foreground py-12 text-sm">
              {search ? "Nenhuma skin encontrada" : "Digite para buscar skins. Sincronize primeiro se a lista estiver vazia."}
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {skins.map((skin) => (
                <button
                  key={skin.id}
                  onClick={() => {
                    onSelect(skin.id, {
                      name: skin.name,
                      weapon_name: skin.weapon_name || null,
                      pattern_name: skin.pattern_name || null,
                      image: skin.image || null,
                      rarity_name: skin.rarity_name || null,
                    });
                    onClose();
                  }}
                  className="flex flex-col items-center gap-1 p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-colors text-left"
                >
                  {skin.image && (
                    <img
                      src={skin.image}
                      alt={skin.name}
                      className="w-full aspect-square object-contain rounded bg-muted/30"
                      loading="lazy"
                    />
                  )}
                  <span className="text-xs font-medium truncate w-full text-center">
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
