import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ByMykelSkin } from "@/hooks/useByMykelSkins";

export const LOADOUT_SLOTS = [
  { key: "ak47", label: "AK-47", weaponFilter: "AK-47" },
  { key: "m4a4", label: "M4A4", weaponFilter: "M4A4" },
  { key: "awp", label: "AWP", weaponFilter: "AWP" },
  { key: "deagle", label: "Desert Eagle", weaponFilter: "Desert Eagle" },
  { key: "knife", label: "Faca", weaponFilter: "knife" },
  { key: "gloves", label: "Luvas", weaponFilter: "gloves" },
] as const;

export type SlotKey = (typeof LOADOUT_SLOTS)[number]["key"];

type LoadoutState = Partial<Record<SlotKey, ByMykelSkin>>;

interface LoadoutContextValue {
  loadout: LoadoutState;
  addToSlot: (slot: SlotKey, skin: ByMykelSkin) => void;
  removeFromSlot: (slot: SlotKey) => void;
  clearAll: () => void;
  filledCount: number;
}

const LoadoutContext = createContext<LoadoutContextValue | null>(null);

const STORAGE_KEY = "fireskins-loadout";

function loadFromStorage(): LoadoutState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function LoadoutProvider({ children }: { children: React.ReactNode }) {
  const [loadout, setLoadout] = useState<LoadoutState>(loadFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loadout));
  }, [loadout]);

  const addToSlot = useCallback((slot: SlotKey, skin: ByMykelSkin) => {
    setLoadout((prev) => ({ ...prev, [slot]: skin }));
  }, []);

  const removeFromSlot = useCallback((slot: SlotKey) => {
    setLoadout((prev) => {
      const next = { ...prev };
      delete next[slot];
      return next;
    });
  }, []);

  const clearAll = useCallback(() => setLoadout({}), []);

  const filledCount = Object.keys(loadout).length;

  return (
    <LoadoutContext.Provider value={{ loadout, addToSlot, removeFromSlot, clearAll, filledCount }}>
      {children}
    </LoadoutContext.Provider>
  );
}

export function useLoadout() {
  const ctx = useContext(LoadoutContext);
  if (!ctx) throw new Error("useLoadout must be inside LoadoutProvider");
  return ctx;
}
