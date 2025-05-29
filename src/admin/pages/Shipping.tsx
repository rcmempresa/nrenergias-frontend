import React from 'react';
import { Card } from '../components/ui/Card';
import { MapPin, TruckIcon, Clock } from 'lucide-react';
import { CategoryChart } from '../components/dashboard/CategoryChart';
import { regionData } from '../data/mockData';

export function Shipping() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Shipping Analysis</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card>
              <div className="flex flex-col items-center">
                <div className="p-3 rounded-full bg-blue-100 mb-3">
                  <TruckIcon size={24} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">428</h3>
                <p className="text-sm text-gray-500">Active Shipments</p>
              </div>
            </Card>
            
            <Card>
              <div className="flex flex-col items-center">
                <div className="p-3 rounded-full bg-green-100 mb-3">
                  <Clock size={24} className="text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">1.8 days</h3>
                <p className="text-sm text-gray-500">Avg. Delivery Time</p>
              </div>
            </Card>
            
            <Card>
              <div className="flex flex-col items-center">
                <div className="p-3 rounded-full bg-amber-100 mb-3">
                  <MapPin size={24} className="text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">5</h3>
                <p className="text-sm text-gray-500">Distribution Centers</p>
              </div>
            </Card>
          </div>
          
          <Card title="Delivery Performance">
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-4">
                <h4 className="font-medium text-gray-800 mb-3">Current Month Performance</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">On Time Delivery</p>
                    <p className="text-lg font-semibold text-green-600">92%</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Delayed Shipments</p>
                    <p className="text-lg font-semibold text-amber-600">7%</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Failed Deliveries</p>
                    <p className="text-lg font-semibold text-red-600">1%</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Shipping Method Distribution</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Standard Shipping</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Express Shipping</span>
                      <span className="text-sm font-medium">24%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '24%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Next Day Delivery</span>
                      <span className="text-sm font-medium">8%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-teal-600 h-2 rounded-full" style={{ width: '8%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="space-y-6">
          <CategoryChart 
            data={regionData}
            title="Orders by Region"
          />
          
          <Card title="Shipping Insights">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Key Observations</h4>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Highest delivery volume in Lisbon and Porto regions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Express shipping usage increased by 12% compared to last month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Weekend deliveries have a 5% higher failure rate</span>
                  </li>
                </ul>
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-medium text-gray-800 mb-2">Recommendations</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span>1.</span>
                    <span>Consider adding a distribution center in the Faro region</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>2.</span>
                    <span>Optimize weekend delivery schedules to reduce failures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>3.</span>
                    <span>Increase delivery capacity in Lisbon during peak hours</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}