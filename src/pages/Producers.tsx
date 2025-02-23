
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { producersData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const Producers = () => {
  const { category } = useParams();
  const producers = producersData.filter(p => p.categoryName === category);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-5 h-5 mr-2" />
            Назад к категориям
          </Link>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {category}
          </h1>
          <p className="text-lg text-gray-600">Выберите заведение</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {producers.map((producer) => (
            <Link 
              to={`/products/${encodeURIComponent(producer.producerName)}`}
              key={producer.producerName}
              className="transform transition-all duration-300 hover:scale-105"
            >
              <Card className="p-6 h-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">{producer.producerName}</h3>
                  <p className="text-gray-600">{producer.address}</p>
                  <p className="text-gray-600">{producer.products.length} позиций в меню</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Producers;
