export interface Order {
  id: string;
  customer: Customer;
  status: 'pendente' | 'pago';
  total: number;
  date: string;
  items: OrderItem[];
}

export interface ShippingDetails {
  address: string;
  city: string;
  zip_code: string;
  phone: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  stock: number;
  price: number;
  status: 'active' | 'inactive';
  category: string;
  sales: number;
  image: string;
  favoriteCount: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  registrationDate: string;
  address: Address;
}

export interface Address {
  city: string;
  region: string;
  postalCode: string;
  country: string;
}

export interface KPI {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

export interface SalesData {
  date: string;
  revenue: number;
}

export interface CategoryData {
  name: string;
  value: number;
}