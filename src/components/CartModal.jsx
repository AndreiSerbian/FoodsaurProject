
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCartStore } from "@/store/CartStore";
import { Button } from "@/components/ui/button";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const CartModal = ({ isOpen, onClose }) => {
  const { items, removeItem, clearCart } = useCartStore((state) => ({
    items: state.items,
    removeItem: state.removeItem,
    clearCart: state.clearCart
  }));

  const total = items.reduce(
    (sum, item) => sum + item.priceDiscount * item.quantity,
    0
  );

  const handleCheckout = () => {
    toast.success("Заказ оформлен успешно!");
    clearCart();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Корзина
          </DialogTitle>
        </DialogHeader>
        
        {items.length === 0 ? (
          <div className="py-6 text-center text-gray-500">
            Ваша корзина пуста
          </div>
        ) : (
          <>
            <div className="max-h-[60vh] overflow-y-auto">
              {items.map((item) => (
                <div 
                  key={item.productName} 
                  className="flex items-center justify-between py-4 border-b"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{item.productName}</h4>
                    <div className="flex items-center mt-1">
                      <span className="text-green-600 font-medium">
                        {item.priceDiscount} MDL
                      </span>
                      <span className="mx-2">×</span>
                      <span>{item.quantity}</span>
                      <span className="ml-4 text-gray-500">
                        {item.priceDiscount * item.quantity} MDL
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.productName)}
                    className="ml-4 p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex justify-between font-semibold text-lg mb-4">
                <span>Итого:</span>
                <span>{total} MDL</span>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => clearCart()}
                  className="flex-1"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Очистить
                </Button>
                <Button 
                  onClick={handleCheckout}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Оформить заказ
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;
