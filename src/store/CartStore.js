
import { create } from 'zustand';

export const useCartStore = create((set) => ({
  items: [],
  
  addItem: (product, quantity = 1) => {
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.productName === product.productName
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.productName === product.productName
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      } else {
        return {
          items: [...state.items, { ...product, quantity }],
        };
      }
    });
  },

  removeItem: (productName) => {
    set((state) => ({
      items: state.items.filter((item) => item.productName !== productName),
    }));
  },

  updateQuantity: (productName, quantity) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.productName === productName ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => {
    set({ items: [] });
  },
}));
