import React, { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react'; // Manter Filter para consistência, embora o ícone de calendário seria melhor para data
import { OrdersTable } from '../components/dashboard/OrdersTable';

// Adicione as importações para ícones de ordenação, se quiser
import { ArrowDownAZ, ArrowUpZA } from 'lucide-react'; // Exemplo para ordenação alfabética, ou use um ícone de seta para numérico

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  // Novo estado para o filtro de data
  const [dateFilter, setDateFilter] = useState(''); // Formato 'YYYY-MM-DD'
  // Novo estado para a ordenação por preço
  const [priceSortOrder, setPriceSortOrder] = useState<'none' | 'desc' | 'asc'>('none'); // 'desc' para maior para menor, 'asc' para menor para maior

  // ⚠️ Agora apenas 'pending' e 'paid' são opções de status visíveis no filtro
  const statuses = ['pago', 'pendente']; // Removido 'shipped' e 'delivered'

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
        // Certifique-se de que o backend envia payment_status para usar aqui
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

  // --- Lógica de Filtragem e Ordenação Atualizada ---
  const filteredAndSortedOrders = orders
    .filter(order => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro de status: 'all' OU status da encomenda corresponde ao filtro
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

      // Filtro de data: se dateFilter não estiver vazio, compara as datas
      const matchesDate = dateFilter === '' ||
        new Date(order.date).toISOString().slice(0, 10) === dateFilter; // Compara apenas a parte da data (YYYY-MM-DD)

      return matchesSearch && matchesStatus && matchesDate;
    })
    .sort((a, b) => {
      // Ordenação por preço (maior para o menor)
      if (priceSortOrder === 'desc') {
        return b.total - a.total; // Maior para o menor
      }
      // Se quiser adicionar 'asc' (menor para maior)
      if (priceSortOrder === 'asc') {
        return a.total - b.total;
      }
      return 0; // Nenhuma ordenação específica se 'none'
    });
  // --- Fim da Lógica de Filtragem e Ordenação Atualizada ---


  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Encomendas</h1>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 items-end md:items-center"> {/* Alinhar itens ao final em telas maiores */}
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Procurar encomendas por ID, nome ou email do cliente..."
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

          {/* Novo Campo de Filtro por Data */}
          <div className="flex items-center gap-2">
            {/* O ícone Filter é genérico, considere usar um ícone de calendário como CalendarCheck ou CalendarDays do lucide-react se disponível */}
            <Filter size={18} className="text-gray-500" />
            <input
              type="date"
              className="rounded-md border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>

          {/* Botão para Ordenar por Preço */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPriceSortOrder(priceSortOrder === 'desc' ? 'asc' : 'desc')} // Alterna entre descendente e ascendente
              className="rounded-md border border-gray-300 py-2 px-4 flex items-center gap-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
            >
              Preço
              {priceSortOrder === 'desc' ? (
                <ArrowDownAZ size={16} /> // Ou um ícone de seta para baixo
              ) : (
                <ArrowUpZA size={16} /> // Ou um ícone de seta para cima
              )}
            </button>
          </div>
        </div>
      </div>

      <OrdersTable orders={filteredAndSortedOrders} />
    </div>
  );
}