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