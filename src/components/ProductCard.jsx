
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCartStore } from "@/store/CartStore";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const [showFullImage, setShowFullImage] = useState(false);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addItem({
      productName: product.productName,
      price: product.priceDiscount,
      quantity: quantity,
    });
    setQuantity(1);
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-lg transition-all duration-300 relative">
      <div className="space-y-4">
        <div 
          className="h-48 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden cursor-pointer"
          onClick={() => setShowFullImage(true)}
        >
          <img 
            src={product.image} 
            alt={product.productName} 
            className="h-full w-full object-cover rounded-lg transform transition-transform hover:scale-105" 
            onError={(e) => {e.currentTarget.src = '/placeholder.svg'}}
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{product.productName}</h3>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600 line-through">{product.priceRegular} MDL</p>
            <p className="text-xl font-bold text-gray-900">{product.priceDiscount} MDL</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleDecrement}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleIncrement}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          В корзину
        </Button>
      </div>

      {showFullImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setShowFullImage(false)}
        >
          <div className="max-w-3xl mx-auto p-4">
            <img 
              src={product.image} 
              alt={product.productName} 
              className="max-h-[80vh] max-w-full" 
              onError={(e) => {e.currentTarget.src = '/placeholder.svg'}}
            />
            <p className="text-white text-center mt-4 text-lg">{product.productName}</p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ProductCard;
