
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/CartStore";
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';

export const CartModal = ({ isOpen, onClose }) => {
  const { items, removeItem, clearCart, addItem } = useCartStore();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const incrementQuantity = (item) => {
    addItem({
      ...item,
      quantity: 1
    });
  };

  const decrementQuantity = (item) => {
    if (item.quantity > 1) {
      // Update existing item with reduced quantity
      addItem({
        ...item,
        quantity: -1
      });
    } else {
      // Remove item if quantity would become 0
      removeItem(item.productName);
    }
  };

  const handleCheckout = () => {
    alert("Заказ оформлен!");
    clearCart();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white/90 backdrop-blur-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Корзина</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-center text-gray-600">Корзина пуста</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6 max-h-[50vh] overflow-y-auto">
              {items.map((item) => (
                <div key={item.productName} className="flex justify-between items-center border-b pb-4">
                  <div className="flex-1">
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-gray-600">
                      {item.price} MDL
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={() => decrementQuantity(item)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={() => incrementQuantity(item)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2"
                    onClick={() => removeItem(item.productName)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Итого:</span>
                <span className="font-semibold">{total} MDL</span>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white"
                onClick={handleCheckout}
              >
                Оформить заказ
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
