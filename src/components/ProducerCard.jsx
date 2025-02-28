import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
const ProducerCard = ({
  producer
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = producer.products.map(product => product.image);
  const goToNextImage = e => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
  };
  const goToPrevImage = e => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(prevIndex => (prevIndex - 1 + images.length) % images.length);
  };
  return <Link to={`/products/${encodeURIComponent(producer.producerName)}`} className="transform transition-all duration-300 hover:scale-105">
      <Card className="p-6 h-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
        <div className="space-y-4">
          <div className="h-48 rounded-lg bg-gray-100 flex items-center justify-center relative overflow-hidden">
            {images.length > 0 && <img src={images[currentImageIndex]} alt={`${producer.producerName} product`} className="h-full w-full object-cover rounded-lg" onError={e => {
            e.currentTarget.src = '/placeholder.svg';
          }} />}
            {images.length > 1 && <>
                <button onClick={goToPrevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full p-1 bg-zinc-500 hover:bg-zinc-400">
                  <ChevronLeft className="h-5 w-5 text-gray-800" />
                </button>
                <button onClick={goToNextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full p-1 bg-zinc-500 hover:bg-zinc-400">
                  <ChevronRight className="h-5 w-5 text-gray-800" />
                </button>
                <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
                  {images.map((_, index) => <div key={index} className={`h-1.5 w-1.5 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} />)}
                </div>
              </>}
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{producer.producerName}</h3>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <p className="text-sm truncate">{producer.address}</p>
          </div>
          <p className="text-gray-600">{producer.products.length} позиций в меню</p>
        </div>
      </Card>
    </Link>;
};
export default ProducerCard;