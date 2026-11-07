import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_HISTORY_ITEMS = 10;

type RecentlyViewedStore = {
  productIds: number[];
  addProduct: (productId: number) => void;
  clearHistory: () => void;
};

export const useRecentlyViewedStore =
  create<RecentlyViewedStore>()(
    persist(
      (set) => ({
        productIds: [],

        addProduct: (productId) =>
          set((state) => ({
            productIds: [
              productId,
              ...state.productIds.filter(
                (id) => id !== productId
              ),
            ].slice(0, MAX_HISTORY_ITEMS),
          })),

        clearHistory: () => set({ productIds: [] }),
      }),
      {
        name: "kalinoo-recently-viewed",
      }
    )
  );