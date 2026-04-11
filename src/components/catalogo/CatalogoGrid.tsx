import { useState, useMemo } from "react";
import type { ByMykelSkin } from "@/hooks/useByMykelSkins";
import CatalogoSkinCard from "./CatalogoSkinCard";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 50;

interface Props {
  skins: ByMykelSkin[];
  onSkinClick: (skin: ByMykelSkin) => void;
}

export default function CatalogoGrid({ skins, onSkinClick }: Props) {
  const [page, setPage] = useState(1);

  // Reset page when skins array changes (filters)
  const skinsKey = skins.length;
  const [prevKey, setPrevKey] = useState(skinsKey);
  if (skinsKey !== prevKey) {
    setPrevKey(skinsKey);
    setPage(1);
  }

  const visible = useMemo(() => skins.slice(0, page * PAGE_SIZE), [skins, page]);
  const hasMore = visible.length < skins.length;

  if (skins.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">Nenhuma skin encontrada.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        {skins.length} skin{skins.length !== 1 && "s"} encontrada{skins.length !== 1 && "s"}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {visible.map((skin) => (
          <CatalogoSkinCard key={skin.id} skin={skin} onClick={onSkinClick} />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center">
          <Button variant="fire-outline" onClick={() => setPage((p) => p + 1)}>
            Carregar mais
          </Button>
        </div>
      )}
    </div>
  );
}
