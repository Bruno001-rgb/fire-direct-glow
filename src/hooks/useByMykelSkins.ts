import { useQuery } from "@tanstack/react-query";

export interface ByMykelSkin {
  id: string;
  name: string;
  description?: string | null;
  image: string;
  rarity: { name: string; color: string };
  weapon: { name: string };
  category: { name: string };
  min_float: number | null;
  max_float: number | null;
  stattrak: boolean;
  collections: { name: string }[];
  price?: number | null;
  paint_index?: string | null;
  weapon_id?: number | null;
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
  { label: "Faca", value: "knife" },
  { label: "Luvas", value: "gloves" },
  { label: "Pistolas", value: "pistols" },
  { label: "AK-47", value: "AK-47" },
  { label: "M4A4", value: "M4A4" },
  { label: "Rifles", value: "rifles" },
  { label: "AWP", value: "AWP" },
  { label: "SMGs", value: "smgs" },
  { label: "Metralhadoras", value: "machineguns" },
  { label: "Shotguns", value: "shotguns" },
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
    const words = search.toLowerCase().split(/\s+/).filter(Boolean);
    filtered = filtered.filter((s) => {
      const name = s.name.toLowerCase();
      return words.every((w) => name.includes(w));
    });
  }

  if (weapon !== "all") {
    if (weapon === "knife") {
      filtered = filtered.filter((s) => s.category?.name === "Knives");
    } else if (weapon === "gloves") {
      filtered = filtered.filter((s) => s.category?.name === "Gloves");
    } else if (weapon === "rifles") {
      filtered = filtered.filter((s) => s.category?.name === "Rifles");
    } else if (weapon === "pistols") {
      filtered = filtered.filter((s) => s.category?.name === "Pistols");
    } else if (weapon === "smgs") {
      filtered = filtered.filter((s) => s.category?.name === "SMGs");
    } else if (weapon === "shotguns") {
      filtered = filtered.filter((s) => s.category?.name === "Shotguns");
    } else if (weapon === "machineguns") {
      filtered = filtered.filter((s) => s.category?.name === "Machine Guns");
    } else {
      filtered = filtered.filter((s) => s.weapon?.name === weapon);
    }
  }

  if (rarity !== "Todos") {
    filtered = filtered.filter((s) => s.rarity?.name === rarity);
  }

  if (wear !== "all") {
    const tier = WEAR_FILTERS.find((w) => w.value === wear);
    if (tier) {
      filtered = filtered.filter((s) => {
        const min = s.min_float ?? 0;
        const max = s.max_float ?? 1;
        return min < tier.max && max > tier.min;
      });
    }
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
