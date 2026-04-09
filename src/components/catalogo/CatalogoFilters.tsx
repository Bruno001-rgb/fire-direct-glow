import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { WEAPON_FILTERS, RARITY_FILTERS, WEAR_FILTERS, PRICE_FILTERS, type SortMode } from "@/hooks/useByMykelSkins";
import type { ByMykelSkin } from "@/hooks/useByMykelSkins";
import logoFireskins from "@/assets/logo-fireskins.webp";

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  weapon: string;
  onWeaponChange: (v: string) => void;
  rarity: string;
  onRarityChange: (v: string) => void;
  wear: string;
  onWearChange: (v: string) => void;
  sort: SortMode;
  onSortChange: (v: SortMode) => void;
  priceRange: string;
  onPriceRangeChange: (v: string) => void;
  allSkins?: ByMykelSkin[];
}

const SORT_OPTIONS: { label: string; value: SortMode }[] = [
  { label: "A-Z", value: "az" },
  { label: "Float ↑", value: "float-asc" },
  { label: "Float ↓", value: "float-desc" },
];

/* ── Shared chip component ── */
function FilterChips({
  items,
  value,
  onChange,
}: {
  items: readonly { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => {
        const active = value === item.value;
        return (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

/* ── Collapsible section ── */
function CollapsibleFilter({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border/40 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
      >
        {title}
        <ChevronDown
          className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-200 ease-out ${
          open ? "grid-rows-[1fr] opacity-100 pb-3" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

/* ── All filter groups ── */
function FiltersBody(props: Props & { wearItems: { label: string; value: string }[] }) {
  return (
    <>
      <CollapsibleFilter title="Preço" defaultOpen>
        <FilterChips
          items={PRICE_FILTERS.map((p) => ({ label: p.label, value: p.value }))}
          value={props.priceRange}
          onChange={props.onPriceRangeChange}
        />
      </CollapsibleFilter>
      <CollapsibleFilter title="Raridade" defaultOpen>
        <FilterChips
          items={RARITY_FILTERS.map((r) => ({ label: r, value: r }))}
          value={props.rarity}
          onChange={props.onRarityChange}
        />
      </CollapsibleFilter>
      <CollapsibleFilter title="Condição" defaultOpen>
        <FilterChips
          items={props.wearItems}
          value={props.wear}
          onChange={props.onWearChange}
        />
      </CollapsibleFilter>
      <CollapsibleFilter title="Ordenar">
        <FilterChips
          items={SORT_OPTIONS.map((o) => ({ label: o.label, value: o.value }))}
          value={props.sort}
          onChange={(v) => props.onSortChange(v as SortMode)}
        />
      </CollapsibleFilter>
    </>
  );
}

/* ── Weapon category bar (desktop top) ── */
function WeaponCategoryBar({
  weapon,
  onWeaponChange,
  allSkins,
}: {
  weapon: string;
  onWeaponChange: (v: string) => void;
  allSkins?: ByMykelSkin[];
}) {
  const { counts, images } = useMemo(() => {
    if (!allSkins) return { counts: {} as Record<string, number>, images: {} as Record<string, string> };
    const c: Record<string, number> = { all: allSkins.length };
    const img: Record<string, string> = {};

    allSkins.forEach((s) => {
      if (s.category?.name === "Knives") {
        c["knife"] = (c["knife"] || 0) + 1;
        if (!img["knife"] && s.image) img["knife"] = s.image;
      } else if (s.category?.name === "Gloves") {
        c["gloves"] = (c["gloves"] || 0) + 1;
        if (!img["gloves"] && s.image) img["gloves"] = s.image;
      } else if (s.weapon?.name) {
        c[s.weapon.name] = (c[s.weapon.name] || 0) + 1;
        if (!img[s.weapon.name] && s.image) img[s.weapon.name] = s.image;
      }
    });

    // Pick a representative image for "all"
    if (allSkins.length > 0 && allSkins[0].image) img["all"] = allSkins[0].image;

    return { counts: c, images: img };
  }, [allSkins]);

  return (
    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
      {WEAPON_FILTERS.map((w) => {
        const active = weapon === w.value;
        const count = counts[w.value] || 0;
        const imgSrc = images[w.value];
        return (
          <button
            key={w.value}
            onClick={() => onWeaponChange(w.value)}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all duration-200 shrink-0 min-w-[100px] ${
              active
                ? "bg-primary/10 border border-primary/40 shadow-sm shadow-primary/10"
                : "bg-muted/30 border border-border/40 hover:bg-muted/50 hover:border-border/60"
            }`}
          >
            {/* Weapon image */}
            <div className="w-20 h-14 flex items-center justify-center">
              {w.value === "all" ? (
                <img
                  src={logoFireskins}
                  alt="Todos"
                  className="max-w-full max-h-full object-contain"
                />
              ) : imgSrc ? (
                <img
                  src={imgSrc}
                  alt={w.label}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              ) : (
                <div className="w-10 h-8 rounded bg-muted/50" />
              )}
            </div>
            <span className={`text-xs font-semibold ${active ? "text-primary" : "text-muted-foreground"}`}>
              {w.label}
            </span>
            {allSkins && (
              <span className={`text-[10px] ${active ? "text-primary/70" : "text-muted-foreground/60"}`}>
                ({count})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ── Main export ── */
export default function CatalogoFilters(props: Props) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const hasActiveFilters = !!(
    props.search ||
    props.weapon !== "all" ||
    props.rarity !== "Todos" ||
    props.wear !== "all" ||
    props.sort !== "az" ||
    props.priceRange !== "all"
  );

  const clearAll = () => {
    props.onSearchChange("");
    props.onWeaponChange("all");
    props.onRarityChange("Todos");
    props.onWearChange("all");
    props.onSortChange("az");
    props.onPriceRangeChange("all");
  };

  const activeCount = [props.weapon, props.rarity, props.wear, props.priceRange].filter(
    (v) => v !== "all" && v !== "Todos"
  ).length;

  // Wear items with count
  const wearItems = useMemo(() => {
    const skins = props.allSkins || [];
    return WEAR_FILTERS.map((w) => {
      if (w.value === "all") return { label: `Todos (${skins.length})`, value: w.value };
      const count = skins.filter((s) => {
        const min = s.min_float ?? 0;
        const max = s.max_float ?? 1;
        return min < w.max && max > w.min;
      }).length;
      return { label: `${w.label} (${count})`, value: w.value };
    });
  }, [props.allSkins]);

  const filtersBodyProps = { ...props, wearItems };

  return (
    <>
      {/* ═══ DESKTOP: Sidebar layout ═══ */}
      <div className="hidden lg:block">
        <CatalogoDesktopLayout
          {...props}
          wearItems={wearItems}
          hasActiveFilters={hasActiveFilters}
          clearAll={clearAll}
        />
      </div>

      {/* ═══ MOBILE: Collapsible top bar ═══ */}
      <div className="lg:hidden sticky top-14 sm:top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border/60">
        <div className="container">
          <button
            onClick={() => setMobileExpanded(!mobileExpanded)}
            className="flex items-center justify-between w-full py-3 group"
          >
            <div className="flex items-center gap-2">
              <Search className="size-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Buscar Skins
              </span>
              {activeCount > 0 && (
                <span className="size-5 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                  {activeCount}
                </span>
              )}
            </div>
            <ChevronDown
              className={`size-4 text-muted-foreground transition-transform duration-200 ${mobileExpanded ? "rotate-180" : ""}`}
            />
          </button>

          <div
            className={`grid transition-all duration-300 ease-out ${
              mobileExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="pb-3 space-y-3">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar skin..."
                      value={props.search}
                      onChange={(e) => props.onSearchChange(e.target.value)}
                      className="pl-9 bg-muted/50 border-border/40 h-11 text-sm rounded-xl focus:border-primary/40 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearAll} className="hidden sm:inline-flex text-xs text-muted-foreground hover:text-foreground shrink-0 h-11">
                      Limpar filtros
                    </Button>
                  )}
                  <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon" className="shrink-0 h-11 w-11 rounded-xl border-border/40 relative">
                        <SlidersHorizontal className="size-4" />
                        {activeCount > 0 && (
                          <span className="absolute -top-1 -right-1 size-4 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[9px] font-bold">
                            {activeCount}
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="max-h-[70vh] overflow-y-auto">
                      <SheetHeader>
                        <div className="flex items-center justify-between">
                          <SheetTitle>Filtros</SheetTitle>
                          {hasActiveFilters && (
                            <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs text-muted-foreground">
                              Limpar filtros
                            </Button>
                          )}
                        </div>
                      </SheetHeader>
                      <div className="mt-4">
                        <CollapsibleFilter title="Arma" defaultOpen>
                          <FilterChips
                            items={WEAPON_FILTERS.map((w) => ({ label: w.label, value: w.value }))}
                            value={props.weapon}
                            onChange={props.onWeaponChange}
                          />
                        </CollapsibleFilter>
                        <FiltersBody {...filtersBodyProps} />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══ Desktop sidebar + top bar layout ═══ */
export function CatalogoDesktopLayout(
  props: Props & {
    wearItems: { label: string; value: string }[];
    hasActiveFilters: boolean;
    clearAll: () => void;
    children?: React.ReactNode;
  }
) {
  return (
    <div className="container flex flex-col h-[calc(100vh-4rem)]">
      {/* Weapon categories bar — fixed */}
      <div className="shrink-0 pt-4 pb-2">
        <WeaponCategoryBar
          weapon={props.weapon}
          onWeaponChange={props.onWeaponChange}
          allSkins={props.allSkins}
        />
      </div>

      {/* Sidebar + main content */}
      <div className="flex gap-6 flex-1 min-h-0">
        {/* Sidebar — fixed, scrolls independently */}
        <aside className="w-64 shrink-0 space-y-1 overflow-y-auto pr-2 scrollbar-hide py-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Filtros</span>
            {props.hasActiveFilters && (
              <button onClick={props.clearAll} className="text-[10px] text-primary hover:underline">
                Limpar
              </button>
            )}
          </div>
          <FiltersBody {...props} />
        </aside>

        {/* Main content area */}
        <div className="flex-1 min-w-0 flex flex-col min-h-0 py-2">
          {/* Search bar — fixed */}
          <div className="relative shrink-0 mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar skin..."
              value={props.search}
              onChange={(e) => props.onSearchChange(e.target.value)}
              className="pl-9 bg-muted/50 border-border/40 h-11 text-sm rounded-xl focus:border-primary/40 focus:ring-primary/20 transition-all"
            />
            {props.search && (
              <button
                onClick={() => props.onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          {/* Grid — scrollable */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}
