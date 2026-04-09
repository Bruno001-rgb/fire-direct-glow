import { useState, useMemo } from "react";
import Header from "@/components/Header";
import CatalogoFilters, { CatalogoDesktopLayout } from "@/components/catalogo/CatalogoFilters";
import CatalogoGrid from "@/components/catalogo/CatalogoGrid";
import CatalogoSkeleton from "@/components/catalogo/CatalogoSkeleton";
import SkinDetailModal from "@/components/catalogo/SkinDetailModal";
import { filterSkins, WEAR_FILTERS, type SortMode } from "@/hooks/useByMykelSkins";
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

  const hasActiveFilters = !!(
    search || weapon !== "all" || rarity !== "Todos" || wear !== "all" || sort !== "az" || priceRange !== "all"
  );

  const clearAll = () => {
    setSearch(""); setWeapon("all"); setRarity("Todos"); setWear("all"); setSort("az"); setPriceRange("all");
  };

  const wearItems = useMemo(() => {
    const all = skins || [];
    return WEAR_FILTERS.map((w) => {
      if (w.value === "all") return { label: `Todos (${all.length})`, value: w.value };
      const count = all.filter((s) => {
        const min = s.min_float ?? 0; const max = s.max_float ?? 1;
        return min < w.max && max > w.min;
      }).length;
      return { label: `${w.label} (${count})`, value: w.value };
    });
  }, [skins]);

  const gridContent = (
    <>
      {isLoading && <CatalogoSkeleton />}
      {isError && (
        <div className="text-center py-20 space-y-4">
          <p className="text-destructive text-lg">Erro ao carregar skins. Tente novamente.</p>
          <Button variant="fire" onClick={() => refetch()}>Tentar novamente</Button>
        </div>
      )}
      {skins && <CatalogoGrid skins={filtered} onSkinClick={setSelectedSkin} />}
    </>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Mobile: collapsible filter bar + grid */}
      <div className="lg:hidden">
        <CatalogoFilters {...filterProps} />
        <main className="container py-6 mt-14 sm:mt-16">
          {gridContent}
        </main>
      </div>

      {/* Desktop: sidebar layout with grid inside — no page scroll */}
      <div className="hidden lg:block mt-16 h-[calc(100vh-4rem)] overflow-hidden">
        <CatalogoDesktopLayout
          {...filterProps}
          wearItems={wearItems}
          hasActiveFilters={hasActiveFilters}
          clearAll={clearAll}
        >
          {gridContent}
        </CatalogoDesktopLayout>
      </div>

      
      <SkinDetailModal skin={selectedSkin} onClose={() => setSelectedSkin(null)} />
    </div>
  );
}
