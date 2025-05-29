import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  className?: string;
}

export function StatsCard({ title, value, change = 0, icon, className = '' }: StatsCardProps) {
  const isPositive = change >= 0;
  
  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="p-2 rounded-md bg-blue-50 text-blue-600">
          {icon}
        </span>
        
        {change !== undefined && (
          <span className={`
            flex items-center text-sm font-medium
            ${isPositive ? 'text-green-600' : 'text-red-600'}
          `}>
            {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            {Math.abs(change)}%
          </span>
        )}
      </div>
      
      <h3 className="mt-4 text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}