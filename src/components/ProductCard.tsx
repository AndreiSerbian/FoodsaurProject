
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/CartStore';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  productName: string;
  image: string;
  priceRegular: number;
  priceDiscount: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      productName: product.productName,
      price: product.priceDiscount,
      quantity: 1
    });
    
    toast.success('Товар добавлен в корзину', {
      description: product.productName,
    });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/placeholder.svg";
  };

  const discount = Math.round(((product.priceRegular - product.priceDiscount) / product.priceRegular) * 100);

  return (
    <Card className="overflow-hidden bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <div className="aspect-square w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.productName}
            className="object-cover w-full h-full"
            onError={handleImageError}
          />
        </div>
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
            -{discount}%
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-2">{product.productName}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold">{product.priceDiscount} MDL</span>
          {discount > 0 && (
            <span className="text-sm text-gray-500 line-through">{product.priceRegular} MDL</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button 
          className="w-full bg-green-600 hover:bg-green-700"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          В корзину
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
