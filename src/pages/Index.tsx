
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { producersData } from "@/lib/data";
import { Link } from "react-router-dom";

const Index = () => {
  const categories = Array.from(new Set(producersData.map((p) => p.categoryName)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Выберите категорию</h1>
          <p className="text-lg text-gray-600">Откройте для себя разнообразие кухонь</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link 
              to={`/producers/${encodeURIComponent(category)}`} 
              key={category}
              className="transform transition-all duration-300 hover:scale-105"
            >
              <Card className="p-6 h-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                <div className="space-y-4">
                  <div className="h-48 rounded-lg bg-gray-100 flex items-center justify-center">
                    <span className="text-2xl text-gray-600">{category}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{category}</h3>
                  <p className="text-gray-600">
                    {producersData.filter(p => p.categoryName === category).length} заведений
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
