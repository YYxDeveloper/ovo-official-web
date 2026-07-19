"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/types";

const MAX_COMPARE_ITEMS = 3;

interface CompareStore {
  items: Product[];
  addItem: (product: Product) => boolean;
  removeItem: (id: string) => void;
  toggleItem: (product: Product) => boolean;
  clearAll: () => void;
  isInCompare: (id: string) => boolean;
  isFull: () => boolean;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        if (get().items.length >= MAX_COMPARE_ITEMS) return false;
        if (get().items.some((p) => p.id === product.id)) return false;
        set({ items: [...get().items, product] });
        return true;
      },
      removeItem: (id) => {
        set({ items: get().items.filter((p) => p.id !== id) });
      },
      toggleItem: (product) => {
        if (get().isInCompare(product.id)) {
          get().removeItem(product.id);
          return false;
        }
        return get().addItem(product);
      },
      clearAll: () => set({ items: [] }),
      isInCompare: (id) => get().items.some((p) => p.id === id),
      isFull: () => get().items.length >= MAX_COMPARE_ITEMS,
    }),
    {
      name: "ovo-compare",
      skipHydration: true,
    },
  ),
);

export { MAX_COMPARE_ITEMS };
