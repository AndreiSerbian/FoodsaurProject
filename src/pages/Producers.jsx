
import { useParams, Link } from "react-router-dom";
import { producersData } from "@/lib/data";
import { ChevronLeft } from "lucide-react";
import ProducerCard from "@/components/ProducerCard";

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
            <ProducerCard key={producer.producerName} producer={producer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Producers;
