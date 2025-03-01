
import { create } from 'zustand';

export const useCartStore = create((set) => ({
  items: [],
  addItem: (newItem) => set((state) => {
    const existingItemIndex = state.items.findIndex(
      (item) => item.productName === newItem.productName
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...state.items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + 1,
      };
      return { items: updatedItems };
    }

    return { items: [...state.items, { ...newItem, quantity: 1 }] };
  }),
  removeItem: (productName) => set((state) => ({
    items: state.items.filter((item) => item.productName !== productName),
  })),
  clearCart: () => set({ items: [] }),
}));
