
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface Producer {
  producerName: string;
  address: string;
  producerImage: {
    exterior: string;
    interior: string;
  };
}

interface ProducerCardProps {
  producer: Producer;
}

const ProducerCard = ({ producer }: ProducerCardProps) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/placeholder.svg";
  };

  return (
    <Link to={`/products/${encodeURIComponent(producer.producerName)}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow bg-white/90 backdrop-blur-sm hover:scale-105 transform transition-all duration-300">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={producer.producerImage.exterior}
            alt={producer.producerName}
            className="object-cover w-full h-full"
            onError={handleImageError}
          />
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-2">{producer.producerName}</h3>
          <p className="text-gray-600">{producer.address}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <span className="text-blue-600 text-sm">Посмотреть товары</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProducerCard;
