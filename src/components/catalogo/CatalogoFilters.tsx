import { useState } from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { WEAPON_FILTERS, RARITY_FILTERS, WEAR_FILTERS, type SortMode } from "@/hooks/useByMykelSkins";

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
}

const SORT_OPTIONS: { label: string; value: SortMode }[] = [
  { label: "A-Z", value: "az" },
  { label: "Float ↑", value: "float-asc" },
  { label: "Float ↓", value: "float-desc" },
];

function FilterChips({
  items,
  value,
  onChange,
}: {
  items: readonly { label?: string; value?: string }[] | readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => {
        const label = typeof item === "string" ? item : item.label!;
        const val = typeof item === "string" ? item : item.value!;
        const active = value === val;
        return (
          <button
            key={val}
            onClick={() => onChange(val)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

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

function FiltersContent(props: Props) {
  return (
    <div>
      <CollapsibleFilter title="Arma" defaultOpen>
        <FilterChips
          items={WEAPON_FILTERS as unknown as { label: string; value: string }[]}
          value={props.weapon}
          onChange={props.onWeaponChange}
        />
      </CollapsibleFilter>
      <CollapsibleFilter title="Raridade">
        <FilterChips items={RARITY_FILTERS} value={props.rarity} onChange={props.onRarityChange} />
      </CollapsibleFilter>
      <CollapsibleFilter title="Condição">
        <FilterChips
          items={WEAR_FILTERS as unknown as { label: string; value: string }[]}
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
    </div>
  );
}

export default function CatalogoFilters(props: Props) {
  const [open, setOpen] = useState(false);

  const hasActiveFilters = props.search || props.weapon !== "all" || props.rarity !== "all" || props.wear !== "all" || props.sort !== "az";

  const clearAll = () => {
    props.onSearchChange("");
    props.onWeaponChange("all");
    props.onRarityChange("all");
    props.onWearChange("all");
    props.onSortChange("az");
  };

  const activeCount = [props.weapon, props.rarity, props.wear].filter((v) => v !== "all").length;

  return (
    <div className="sticky top-14 sm:top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border/60 py-3">
      <div className="container space-y-2">
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
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="hidden md:inline-flex text-xs text-muted-foreground hover:text-foreground shrink-0 h-11"
            >
              Limpar filtros
            </Button>
          )}
          {/* Mobile filter button */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden shrink-0 h-11 w-11 rounded-xl border-border/40 relative">
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
                <FiltersContent {...props} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        {/* Desktop filters */}
        <div className="hidden md:block">
          <FiltersContent {...props} />
        </div>
      </div>
    </div>
  );
}
