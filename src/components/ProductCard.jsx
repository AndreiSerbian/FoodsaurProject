
import React from "react";
import { Card } from "@/components/ui/card";
import { useCartStore } from "@/store/CartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Info } from "lucide-react";
import { toast } from "sonner";

const ProductCard = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);
  
  const handleImageError = (e) => {
    e.currentTarget.src = "/placeholder.svg";
  };

  const handleAddToCart = () => {
    addItem(product);
    toast.success("Товар добавлен в корзину", {
      description: product.productName,
    });
  };

  const discountPercentage = Math.round(
    ((product.priceRegular - product.priceDiscount) / product.priceRegular) * 100
  );

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <img
          src={product.image}
          alt={product.productName}
          className="h-48 w-full object-cover"
          onError={handleImageError}
        />
        {product.priceDiscount < product.priceRegular && (
          <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-semibold">
            -{discountPercentage}%
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.productName}</h3>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            {product.priceDiscount < product.priceRegular ? (
              <>
                <span className="text-xl font-bold text-green-600">
                  {product.priceDiscount} MDL
                </span>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  {product.priceRegular} MDL
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-700">
                {product.priceRegular} MDL
              </span>
            )}
          </div>
        </div>
        <Button 
          onClick={handleAddToCart} 
          className="w-full bg-green-600 hover:bg-green-700"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          В корзину
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
