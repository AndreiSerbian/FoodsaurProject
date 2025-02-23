
import create from 'zustand';

interface CartItem {
  productName: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productName: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
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
