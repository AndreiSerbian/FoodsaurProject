
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { MapPin, RotateCw } from "lucide-react";

const ProducerCard = ({ producer }) => {
  const [showInterior, setShowInterior] = useState(false);
  
  const handleImageError = (e) => {
    e.currentTarget.src = "/placeholder.svg";
  };

  const toggleView = () => {
    setShowInterior(!showInterior);
  };

  return (
    <Link 
      to={`/products/${encodeURIComponent(producer.producerName)}`}
      className="transition-transform hover:scale-105"
    >
      <Card className="overflow-hidden h-full">
        <div className="relative">
          <img
            src={showInterior ? producer.producerImage.interior : producer.producerImage.exterior}
            alt={producer.producerName}
            className="h-48 w-full object-cover transition-opacity duration-300"
            onError={handleImageError}
          />
          <button 
            className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              toggleView();
            }}
          >
            <RotateCw className="h-5 w-5 text-gray-700" />
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{producer.producerName}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{producer.address}</span>
          </div>
          <div className="text-sm text-gray-500">
            {producer.products.length} товаров
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProducerCard;
