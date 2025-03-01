
import { useParams, Link } from "react-router-dom";
import { producersData } from "@/lib/data";
import { useCartStore } from "@/store/CartStore";
import { ChevronLeft } from "lucide-react";
import { CartModal } from "@/components/CartModal";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";

const Products = () => {
  const { producerName } = useParams();
  const producer = producersData.find(p => p.producerName === producerName);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);

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
            <ProductCard key={product.productName} product={product} />
          ))}
        </div>
        
        {cartItems.length > 0 && (
          <div className="fixed bottom-6 right-6">
            <button
              onClick={() => setIsCartOpen(true)} 
              className="bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition-colors"
            >
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </div>
            </button>
          </div>
        )}
      </div>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Products;
