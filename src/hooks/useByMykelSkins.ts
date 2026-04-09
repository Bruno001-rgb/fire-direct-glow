import { useQuery } from "@tanstack/react-query";

export interface ByMykelSkin {
  id: string;
  name: string;
  image: string;
  rarity: { name: string; color: string };
  weapon: { name: string };
  category: { name: string };
  min_float: number | null;
  max_float: number | null;
  stattrak: boolean;
  collections: { name: string }[];
  price?: number | null;
}

const API_URL =
  "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json";

async function fetchSkins(): Promise<ByMykelSkin[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erro ao carregar skins");
  const data = await res.json();
  return data as ByMykelSkin[];
}

export function useByMykelSkins() {
  return useQuery({
    queryKey: ["bymykel-skins"],
    queryFn: fetchSkins,
    staleTime: Infinity,
    gcTime: Infinity,
    retry: 2,
  });
}

// Weapon filter helpers
export const WEAPON_FILTERS = [
  { label: "Todos", value: "all" },
  { label: "AK-47", value: "AK-47" },
  { label: "M4A4", value: "M4A4" },
  { label: "AWP", value: "AWP" },
  { label: "Faca", value: "knife" },
  { label: "Luvas", value: "gloves" },
] as const;

export const RARITY_FILTERS = [
  "Todos",
  "Consumer Grade",
  "Industrial Grade",
  "Mil-Spec Grade",
  "Restricted",
  "Classified",
  "Covert",
  "Contraband",
] as const;

export const WEAR_FILTERS = [
  { label: "Todos", value: "all", min: 0, max: 1 },
  { label: "Factory New", value: "fn", min: 0, max: 0.07 },
  { label: "Minimal Wear", value: "mw", min: 0.07, max: 0.15 },
  { label: "Field-Tested", value: "ft", min: 0.15, max: 0.38 },
  { label: "Well-Worn", value: "ww", min: 0.38, max: 0.45 },
  { label: "Battle-Scarred", value: "bs", min: 0.45, max: 1.0 },
] as const;

export type SortMode = "az" | "float-asc" | "float-desc";

export function filterSkins(
  skins: ByMykelSkin[],
  search: string,
  weapon: string,
  rarity: string,
  wear: string,
  sort: SortMode
) {
  let filtered = skins;

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter((s) => s.name.toLowerCase().includes(q));
  }

  if (weapon !== "all") {
    if (weapon === "knife") {
      filtered = filtered.filter(
        (s) => s.category?.name === "Knives"
      );
    } else if (weapon === "gloves") {
      filtered = filtered.filter(
        (s) => s.category?.name === "Gloves"
      );
    } else {
      filtered = filtered.filter((s) => s.weapon?.name === weapon);
    }
  }

  if (rarity !== "Todos") {
    filtered = filtered.filter((s) => s.rarity?.name === rarity);
  }

  const sorted = [...filtered];
  switch (sort) {
    case "az":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "float-asc":
      sorted.sort((a, b) => (a.min_float ?? 0) - (b.min_float ?? 0));
      break;
    case "float-desc":
      sorted.sort((a, b) => (b.max_float ?? 1) - (a.max_float ?? 1));
      break;
  }

  return sorted;
}
