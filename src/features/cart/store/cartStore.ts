
import { create } from "zustand";
import { persist } from "zustand/middleware";

// The product information we need from Supabase
type CartProduct = {
  id: number;
  title: string;
  price: number;
  discount_percentage: number;
  thumbnail: string;
};

// One product inside the cart
export type CartItem = {
  productId: number;
  title: string;
  price: number;
  discount_percentage: number;
  thumbnail: string;
  quantity: number;
};

// Store state and available actions
type CartStore = {
  items: CartItem[];

  addItem: (product: CartProduct) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      // Initial state
      items: [],

      // Add a product or increase its quantity
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.productId === product.id
          );
console.log(product)
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          const newItem: CartItem = {
            productId: product.id,
            title: product.title,
            price: product.price,
            discount_percentage: product.discount_percentage,
            thumbnail: product.thumbnail,
            quantity: 1,
          };

          return {
            items: [...state.items, newItem],
          };
        }),

      // Remove a product completely
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.productId !== productId
          ),
        })),

      // Change product quantity
      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (item) => item.productId !== productId
              ),
            };
          }

          return {
            items: state.items.map((item) =>
              item.productId === productId
                ? { ...item, quantity }
                : item
            ),
          };
        }),

      // Empty the entire cart
      clearCart: () => set({ items: [] }),
    }),

    {
      name: "kalinoo-guest-cart",
    }
  )
);
