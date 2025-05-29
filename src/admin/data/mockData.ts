import { Customer, Order, Product, SalesData, CategoryData } from '../types';

// Generate dates for the past 30 days
const generateDates = (days: number) => {
  return Array.from({ length: days }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - i));
    return date.toISOString().split('T')[0];
  });
};

// Mock sales data for charts
export const salesData: SalesData[] = generateDates(30).map(date => ({
  date,
  revenue: 500 + Math.floor(Math.random() * 5000)
}));

// Mock category data
export const categoryData: CategoryData[] = [
  { name: 'Electronics', value: 35 },
  { name: 'Clothing', value: 25 },
  { name: 'Home & Garden', value: 15 },
  { name: 'Books', value: 12 },
  { name: 'Sports', value: 8 },
  { name: 'Other', value: 5 }
];

// Mock products data
export const products: Product[] = [
  {
    id: 'p1',
    name: 'Premium Wireless Headphones',
    stock: 43,
    price: 149.99,
    status: 'active',
    category: 'Electronics',
    sales: 128,
    image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    favoriteCount: 95
  },
  {
    id: 'p2',
    name: 'Ultra HD Smart TV 55"',
    stock: 12,
    price: 799.99,
    status: 'active',
    category: 'Electronics',
    sales: 64,
    image: 'https://images.pexels.com/photos/5552789/pexels-photo-5552789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    favoriteCount: 72
  },
  {
    id: 'p3',
    name: 'Designer Leather Jacket',
    stock: 35,
    price: 299.99,
    status: 'active',
    category: 'Clothing',
    sales: 87,
    image: 'https://images.pexels.com/photos/16170/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    favoriteCount: 63
  },
  {
    id: 'p4',
    name: 'Professional Camera Kit',
    stock: 0,
    price: 1299.99,
    status: 'inactive',
    category: 'Electronics',
    sales: 42,
    image: 'https://images.pexels.com/photos/3497065/pexels-photo-3497065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    favoriteCount: 48
  },
  {
    id: 'p5',
    name: 'Fitness Smartwatch',
    stock: 78,
    price: 129.99,
    status: 'active',
    category: 'Electronics',
    sales: 153,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    favoriteCount: 87
  },
  {
    id: 'p6',
    name: 'Organic Cotton T-Shirt',
    stock: 124,
    price: 24.99,
    status: 'active',
    category: 'Clothing',
    sales: 210,
    image: 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    favoriteCount: 38
  },
  {
    id: 'p7',
    name: 'Premium Coffee Maker',
    stock: 0,
    price: 189.99,
    status: 'inactive',
    category: 'Home & Garden',
    sales: 76,
    image: 'https://images.pexels.com/photos/4226896/pexels-photo-4226896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    favoriteCount: 54
  },
  {
    id: 'p8',
    name: 'Ergonomic Office Chair',
    stock: 18,
    price: 249.99,
    status: 'active',
    category: 'Home & Garden',
    sales: 48,
    image: 'https://images.pexels.com/photos/380782/pexels-photo-380782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    favoriteCount: 32
  }
];

// Mock customers data
export const customers: Customer[] = [
  {
    id: 'c1',
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    orders: 8,
    totalSpent: 1842.75,
    registrationDate: '2023-02-15',
    address: {
      city: 'Lisbon',
      region: 'Lisbon',
      postalCode: '1000-100',
      country: 'Portugal'
    }
  },
  {
    id: 'c2',
    name: 'James Smith',
    email: 'james.smith@example.com',
    orders: 5,
    totalSpent: 975.50,
    registrationDate: '2023-04-22',
    address: {
      city: 'Porto',
      region: 'Porto',
      postalCode: '4000-008',
      country: 'Portugal'
    }
  },
  {
    id: 'c3',
    name: 'Sophia Martinez',
    email: 'sophia.martinez@example.com',
    orders: 12,
    totalSpent: 3184.25,
    registrationDate: '2022-11-08',
    address: {
      city: 'Faro',
      region: 'Algarve',
      postalCode: '8000-140',
      country: 'Portugal'
    }
  },
  {
    id: 'c4',
    name: 'William Davis',
    email: 'william.davis@example.com',
    orders: 3,
    totalSpent: 489.97,
    registrationDate: '2023-05-30',
    address: {
      city: 'Braga',
      region: 'Braga',
      postalCode: '4700-024',
      country: 'Portugal'
    }
  },
  {
    id: 'c5',
    name: 'Olivia Wilson',
    email: 'olivia.wilson@example.com',
    orders: 7,
    totalSpent: 1432.88,
    registrationDate: '2023-01-14',
    address: {
      city: 'Coimbra',
      region: 'Coimbra',
      postalCode: '3000-370',
      country: 'Portugal'
    }
  }
];

// Mock orders data
export const orders: Order[] = [
  {
    id: 'ord001',
    customer: customers[0],
    status: 'delivered',
    total: 499.97,
    date: '2023-06-15',
    items: [
      {
        id: 'oi1',
        productId: 'p1',
        name: 'Premium Wireless Headphones',
        price: 149.99,
        quantity: 1
      },
      {
        id: 'oi2',
        productId: 'p5',
        name: 'Fitness Smartwatch',
        price: 129.99,
        quantity: 1
      },
      {
        id: 'oi3',
        productId: 'p6',
        name: 'Organic Cotton T-Shirt',
        price: 24.99,
        quantity: 2
      }
    ]
  },
  {
    id: 'ord002',
    customer: customers[2],
    status: 'shipped',
    total: 1099.98,
    date: '2023-06-18',
    items: [
      {
        id: 'oi4',
        productId: 'p2',
        name: 'Ultra HD Smart TV 55"',
        price: 799.99,
        quantity: 1
      },
      {
        id: 'oi5',
        productId: 'p3',
        name: 'Designer Leather Jacket',
        price: 299.99,
        quantity: 1
      }
    ]
  },
  {
    id: 'ord003',
    customer: customers[1],
    status: 'paid',
    total: 254.98,
    date: '2023-06-20',
    items: [
      {
        id: 'oi6',
        productId: 'p6',
        name: 'Organic Cotton T-Shirt',
        price: 24.99,
        quantity: 2
      },
      {
        id: 'oi7',
        productId: 'p8',
        name: 'Ergonomic Office Chair',
        price: 249.99,
        quantity: 1
      }
    ]
  },
  {
    id: 'ord004',
    customer: customers[3],
    status: 'pending',
    total: 129.99,
    date: '2023-06-21',
    items: [
      {
        id: 'oi8',
        productId: 'p5',
        name: 'Fitness Smartwatch',
        price: 129.99,
        quantity: 1
      }
    ]
  },
  {
    id: 'ord005',
    customer: customers[4],
    status: 'delivered',
    total: 474.97,
    date: '2023-06-14',
    items: [
      {
        id: 'oi9',
        productId: 'p1',
        name: 'Premium Wireless Headphones',
        price: 149.99,
        quantity: 1
      },
      {
        id: 'oi10',
        productId: 'p3',
        name: 'Designer Leather Jacket',
        price: 299.99,
        quantity: 1
      },
      {
        id: 'oi11',
        productId: 'p6',
        name: 'Organic Cotton T-Shirt',
        price: 24.99,
        quantity: 1
      }
    ]
  }
];

// Dashboard KPI stats
export const dashboardStats = {
  totalOrders30Days: 156,
  totalOrdersAllTime: 1243,
  totalRevenue: 'EUR 278,542.00',
  averageOrderValue: 'EUR 224.09',
  totalCustomers: 867,
  productsInStock: 235,
  productsOutOfStock: 12,
  cartAbandonmentRate: '23%'
};

// Region distribution
export const regionData: CategoryData[] = [
  { name: 'Lisbon', value: 35 },
  { name: 'Porto', value: 25 },
  { name: 'Faro', value: 15 },
  { name: 'Braga', value: 10 },
  { name: 'Coimbra', value: 8 },
  { name: 'Other', value: 7 }
];

// Best selling products
export const bestSellingProducts = products
  .sort((a, b) => b.sales - a.sales)
  .slice(0, 5);

// Most favorited products
export const mostFavoritedProducts = products
  .sort((a, b) => b.favoriteCount - a.favoriteCount)
  .slice(0, 5);

// Top customers by spend
export const topCustomers = customers
  .sort((a, b) => b.totalSpent - a.totalSpent)
  .slice(0, 5);