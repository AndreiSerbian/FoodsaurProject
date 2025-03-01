
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCartStore } from "@/store/CartStore";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';

export const CartModal = ({ isOpen, onClose }) => {
  const cartItems = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleRemoveItem = (productName) => {
    removeItem(productName);
  };

  const handleUpdateQuantity = (productName, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productName, newQuantity);
  };

  const handleCheckout = () => {
    // Здесь будет логика оформления заказа
    alert("Заказ оформлен!");
    clearCart();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Корзина</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Корзина пуста</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.productName} className="flex justify-between items-center border-b pb-4">
                  <div className="flex-1">
                    <h3 className="font-medium">{item.productName}</h3>
                    <p className="text-gray-600">{item.price} MDL</p>
                  </div>
                  <div className="flex items-center">
                    <button 
                      className="px-2 py-1 bg-gray-200 rounded-l"
                      onClick={() => handleUpdateQuantity(item.productName, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 bg-gray-100">{item.quantity}</span>
                    <button 
                      className="px-2 py-1 bg-gray-200 rounded-r"
                      onClick={() => handleUpdateQuantity(item.productName, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button 
                    className="ml-4 text-red-500"
                    onClick={() => handleRemoveItem(item.productName)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between font-bold border-t pt-4">
              <span>Итого:</span>
              <span>{calculateTotal()} MDL</span>
            </div>
            <Button 
              className="w-full"
              onClick={handleCheckout}
            >
              Оформить заказ
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;
