
import { create } from 'zustand';

export const useCartStore = create((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.productName === item.productName);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.productName === item.productName
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity: 1 }] };
    }),
  removeItem: (productName) =>
    set((state) => ({
      items: state.items.filter((item) => item.productName !== productName),
    })),
  clearCart: () => set({ items: [] }),
}));
