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

  const filterProps = {
    search,
    onSearchChange: setSearch,
    weapon,
    onWeaponChange: setWeapon,
    rarity,
    onRarityChange: setRarity,
    wear,
    onWearChange: setWear,
    sort,
    onSortChange: setSort,
    priceRange,
    onPriceRangeChange: setPriceRange,
    allSkins: skins,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Mobile: collapsible filter bar */}
      <div className="lg:hidden">
        <CatalogoFilters {...filterProps} />
      </div>

      <main className="mt-14 sm:mt-16">
        {/* Desktop: sidebar layout */}
        <div className="hidden lg:block">
          <CatalogoFilters {...filterProps} />
          <div className="container">
            <div className="flex gap-6">
              {/* Spacer matching sidebar width */}
              <div className="w-64 shrink-0" />
              {/* Grid */}
              <div className="flex-1 min-w-0 pb-8">
                {isLoading && <CatalogoSkeleton />}
                {isError && (
                  <div className="text-center py-20 space-y-4">
                    <p className="text-destructive text-lg">Erro ao carregar skins. Tente novamente.</p>
                    <Button variant="fire" onClick={() => refetch()}>Tentar novamente</Button>
                  </div>
                )}
                {skins && <CatalogoGrid skins={filtered} onSkinClick={setSelectedSkin} />}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: simple grid */}
        <div className="lg:hidden container py-6">
          {isLoading && <CatalogoSkeleton />}
          {isError && (
            <div className="text-center py-20 space-y-4">
              <p className="text-destructive text-lg">Erro ao carregar skins. Tente novamente.</p>
              <Button variant="fire" onClick={() => refetch()}>Tentar novamente</Button>
            </div>
          )}
          {skins && <CatalogoGrid skins={filtered} onSkinClick={setSelectedSkin} />}
        </div>
      </main>

      <Footer />
      <SkinDetailModal skin={selectedSkin} onClose={() => setSelectedSkin(null)} />
    </div>
  );
}
