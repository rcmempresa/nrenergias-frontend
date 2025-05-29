import React from 'react';
import { Card } from '../components/ui/Card';
import { Heart, TrendingUp } from 'lucide-react';
import { mostFavoritedProducts } from '../data/mockData';

export function Favorites() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Favorites Analysis</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Most Favorited Products</h3>
              <span className="bg-red-100 text-red-600 rounded-full p-2">
                <Heart size={20} />
              </span>
            </div>
            
            <div className="space-y-4">
              {mostFavoritedProducts.map((product, index) => (
                <div key={product.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg">
                  <div className="relative">
                    <span className="absolute -top-2 -left-2 bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {index + 1}
                    </span>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-red-500">{product.favoriteCount}</span>
                    <span className="text-xs text-gray-500">favorites</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        
        <Card title="Marketing Insights">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-md bg-purple-50 text-purple-600">
                <TrendingUp size={18} />
              </span>
              <div>
                <p className="text-sm text-gray-500">Wishlisting to Purchase Ratio</p>
                <p className="text-lg font-semibold">24%</p>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Recommendations</h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Run targeted promotions for top favorited items</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Send email reminders about favorited items with limited time discounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Consider bundling frequently favorited items</span>
                </li>
              </ul>
            </div>
            
            <div className="border-t border-gray-100 pt-4">
              <h4 className="font-medium text-gray-800 mb-2">Top Categories in Favorites</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Electronics</span>
                  <span className="text-sm font-medium">42%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Clothing</span>
                  <span className="text-sm font-medium">28%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '28%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Home & Garden</span>
                  <span className="text-sm font-medium">18%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '18%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}