
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { producersData } from "@/lib/data";
import { Link } from "react-router-dom";
import { Search } from 'lucide-react';

const Index = () => {
  const categories = Array.from(new Set(producersData.map((p) => p.categoryName)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-green-900">Foodsaur</h1>
          <p className="text-lg text-green-600">Вкусно • Выгодно • Экологично</p>
        </div>
        <div className="mt-10 max-w-xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Поиск ресторанов..."
            />
          </div>
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
