import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoritesStore = {
  productIds: number[];
  toggleFavorite: (productId: number) => void;
  clearFavorites: () => void;
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set) => ({
      productIds: [],

      toggleFavorite: (productId) =>
        set((state) => ({
          productIds: state.productIds.includes(productId)
            ? state.productIds.filter((id) => id !== productId)
            : [...state.productIds, productId],
        })),

      clearFavorites: () => set({ productIds: [] }),
    }),
    {
      name: "kalinoo-demo-favorites",
    }
  )
);