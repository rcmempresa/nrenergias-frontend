import React, { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { OrdersTable } from '../components/dashboard/OrdersTable';

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const statuses = ['pending', 'paid', 'shipped', 'delivered'];

  // ⚠️ Exemplo simples de "mock" para transformar user_id -> customer.name/email
  const fetchOrders = async () => {
    const [ordersRes, usersRes] = await Promise.all([
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/encomendas/listar`),
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/listar`),
    ]);
  
    const [ordersData, usersData] = await Promise.all([
      ordersRes.json(),
      usersRes.json(),
    ]);
  
    const usersMap = new Map(usersData.map((u: any) => [u.id, u]));
  
    const mappedOrders = ordersData.map((item: any) => {
      const user = usersMap.get(item.user_id);
      return {
        id: item.id.toString(),
        customer: {
          name: user?.nome ?? 'Sem Nome',
          email: user?.email ?? 'Sem Email',
        },
        status: item.payment_status,
        total: item.total_amount,
        date: item.created_at,
      };
    });
  
    setOrders(mappedOrders);
  };
  

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Encomendas</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Procurar encomendas por ID e NOME ID..."
              className="w-full rounded-md border border-gray-300 py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select
              className="rounded-md border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Todos os Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <OrdersTable orders={filteredOrders} />
    </div>
  );
}
