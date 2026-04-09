import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CatalogoFilters from "@/components/catalogo/CatalogoFilters";
import CatalogoGrid from "@/components/catalogo/CatalogoGrid";
import CatalogoSkeleton from "@/components/catalogo/CatalogoSkeleton";
import SkinDetailModal from "@/components/catalogo/SkinDetailModal";
import { filterSkins, type SortMode } from "@/hooks/useByMykelSkins";
import type { ByMykelSkin } from "@/hooks/useByMykelSkins";
import { useCatalogSkins } from "@/hooks/useCatalogSkins";
import { Button } from "@/components/ui/button";

export default function Catalogo() {
  const { data: skins, isLoading, isError, refetch } = useCatalogSkins();
  const [search, setSearch] = useState("");
  const [weapon, setWeapon] = useState("all");
  const [rarity, setRarity] = useState("Todos");
  const [wear, setWear] = useState("all");
  const [sort, setSort] = useState<SortMode>("az");
  const [priceRange, setPriceRange] = useState("all");
  const [selectedSkin, setSelectedSkin] = useState<ByMykelSkin | null>(null);

  const filtered = useMemo(
    () => (skins ? filterSkins(skins, search, weapon, rarity, wear, sort, priceRange) : []),
    [skins, search, weapon, rarity, wear, sort, priceRange]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <CatalogoFilters
        search={search}
        onSearchChange={setSearch}
        weapon={weapon}
        onWeaponChange={setWeapon}
        rarity={rarity}
        onRarityChange={setRarity}
        wear={wear}
        onWearChange={setWear}
        sort={sort}
        onSortChange={setSort}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        allSkins={skins}
      />
      <main className="container py-6 mt-14 sm:mt-16">
        {isLoading && <CatalogoSkeleton />}
        {isError && (
          <div className="text-center py-20 space-y-4">
            <p className="text-destructive text-lg">Erro ao carregar skins. Tente novamente.</p>
            <Button variant="fire" onClick={() => refetch()}>Tentar novamente</Button>
          </div>
        )}
        {skins && <CatalogoGrid skins={filtered} onSkinClick={setSelectedSkin} />}
      </main>
      <Footer />
      <SkinDetailModal skin={selectedSkin} onClose={() => setSelectedSkin(null)} />
    </div>
  );
}
