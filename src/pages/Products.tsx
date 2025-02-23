
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { producersData } from "@/lib/data";
import { useCartStore } from "@/store/CartStore";
import { ChevronLeft } from "lucide-react";
import { CartModal } from "@/components/CartModal";
import { useState } from "react";

const Products = () => {
  const { producerName } = useParams();
  const producer = producersData.find(p => p.producerName === producerName);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  if (!producer) return <div>Производитель не найден</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link to={`/producers/${encodeURIComponent(producer.categoryName)}`} className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-5 h-5 mr-2" />
            Назад к списку заведений
          </Link>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">{producer.producerName}</h1>
          <p className="text-lg text-gray-600">{producer.address}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {producer.products.map((product) => (
            <Card key={product.productName} className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="space-y-4">
                <div className="h-48 rounded-lg bg-gray-100 flex items-center justify-center">
                  <span className="text-xl text-gray-600">{product.productName}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{product.productName}</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600 line-through">{product.priceRegular} MDL</p>
                    <p className="text-xl font-bold text-gray-900">{product.priceDiscount} MDL</p>
                  </div>
                  <Button
                    onClick={() => {
                      addItem({
                        productName: product.productName,
                        price: product.priceDiscount,
                        quantity: 1,
                      });
                      setIsCartOpen(true);
                    }}
                    className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white"
                  >
                    В корзину
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Products;
