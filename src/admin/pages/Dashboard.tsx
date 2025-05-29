import React from 'react';
import { ShoppingBag, CreditCard, Users, Package, TrendingUp, PercentCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { StatsCard } from '../components/dashboard/StatsCard';
import { SalesChart } from '../components/dashboard/SalesChart';
import { CategoryChart } from '../components/dashboard/CategoryChart';
import { ProductsTable } from '../components/dashboard/ProductsTable';
import { OrdersTable } from '../components/dashboard/OrdersTable';
import { CustomersTable } from '../components/dashboard/CustomersTable';
import { 
  salesData, 
  categoryData, 
  dashboardStats, 
  bestSellingProducts,
  orders,
  topCustomers,
  regionData
} from '../data/mockData';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Orders (30 Days)" 
          value={dashboardStats.totalOrders30Days}
          change={12}
          icon={<ShoppingBag size={20} />}
        />
        <StatsCard 
          title="Total Revenue" 
          value={dashboardStats.totalRevenue}
          change={8}
          icon={<CreditCard size={20} />}
        />
        <StatsCard 
          title="Total Customers" 
          value={dashboardStats.totalCustomers}
          change={5}
          icon={<Users size={20} />}
        />
        <StatsCard 
          title="Products In Stock" 
          value={`${dashboardStats.productsInStock} / ${dashboardStats.productsInStock + dashboardStats.productsOutOfStock}`}
          icon={<Package size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SalesChart 
          data={salesData} 
          className="lg:col-span-2"
        />
        <Card title="Additional Stats">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-md bg-blue-50 text-blue-600">
                  <TrendingUp size={18} />
                </span>
                <div>
                  <p className="text-sm text-gray-500">Avg. Order Value</p>
                  <p className="text-lg font-semibold">{dashboardStats.averageOrderValue}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-md bg-purple-50 text-purple-600">
                  <ShoppingBag size={18} />
                </span>
                <div>
                  <p className="text-sm text-gray-500">Total Orders (All Time)</p>
                  <p className="text-lg font-semibold">{dashboardStats.totalOrdersAllTime}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-md bg-amber-50 text-amber-600">
                  <PercentCircle size={18} />
                </span>
                <div>
                  <p className="text-sm text-gray-500">Cart Abandonment Rate</p>
                  <p className="text-lg font-semibold">{dashboardStats.cartAbandonmentRate}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart 
          data={categoryData}
          title="Sales by Category"
        />
        <CategoryChart 
          data={regionData}
          title="Orders by Region"
        />
      </div>

      <ProductsTable 
        products={bestSellingProducts}
        title="Best Selling Products"
        showActions={false}
      />

      <OrdersTable 
        orders={orders}
      />

      <CustomersTable 
        customers={topCustomers}
      />
    </div>
  );
}