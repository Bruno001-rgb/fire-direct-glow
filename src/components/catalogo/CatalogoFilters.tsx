import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { WEAPON_FILTERS, RARITY_FILTERS, type SortMode } from "@/hooks/useByMykelSkins";

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  weapon: string;
  onWeaponChange: (v: string) => void;
  rarity: string;
  onRarityChange: (v: string) => void;
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
            className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
              active
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function FiltersContent(props: Props) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Arma</p>
        <FilterChips
          items={WEAPON_FILTERS as unknown as { label: string; value: string }[]}
          value={props.weapon}
          onChange={props.onWeaponChange}
        />
      </div>
      <div>
        <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Raridade</p>
        <FilterChips items={RARITY_FILTERS} value={props.rarity} onChange={props.onRarityChange} />
      </div>
      <div>
        <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Ordenar</p>
        <FilterChips
          items={SORT_OPTIONS.map((o) => ({ label: o.label, value: o.value }))}
          value={props.sort}
          onChange={(v) => props.onSortChange(v as SortMode)}
        />
      </div>
    </div>
  );
}

export default function CatalogoFilters(props: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-14 sm:top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border py-3">
      <div className="container space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar skin..."
              value={props.search}
              onChange={(e) => props.onSearchChange(e.target.value)}
              className="pl-9 bg-muted border-border"
            />
          </div>
          {/* Mobile filter button */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden shrink-0">
                <SlidersHorizontal className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="max-h-[70vh] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
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
