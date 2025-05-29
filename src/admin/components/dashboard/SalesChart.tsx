import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Button } from '../ui/Button';
import { SalesData } from '../../types';

interface SalesChartProps {
  data: SalesData[];
  className?: string;
}

export function SalesChart({ data, className = '' }: SalesChartProps) {
  const [timeframe, setTimeframe] = useState<'7days' | '30days'>('7days');
  
  const displayData = timeframe === '7days' 
    ? data.slice(-7) 
    : data;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-PT', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">Sales Overview</h3>
        
        <div className="flex space-x-2">
          <Button 
            variant={timeframe === '7days' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setTimeframe('7days')}
          >
            Last 7 Days
          </Button>
          <Button 
            variant={timeframe === '30days' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setTimeframe('30days')}
          >
            Last 30 Days
          </Button>
        </div>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={displayData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickFormatter={(value) => `€${value}`}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value: number) => [formatCurrency(value), 'Revenue']}
              labelFormatter={formatDate}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}