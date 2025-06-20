import React, { useEffect, useState } from 'react';
import { Search, Filter, ArrowDown, ArrowUp, CalendarCheck } from 'lucide-react'; // Mudei os ícones para Preço e adicionei CalendarCheck
import { OrdersTable } from '../components/dashboard/OrdersTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../components/ui/Dialog';// Assumindo que você tem um componente Dialog/Modal
import { Button } from '../components/ui/Button'; // Importe o Button se for usá-lo no modal

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [priceSortOrder, setPriceSortOrder] = useState<'none' | 'desc' | 'asc'>('none');

  // --- Novos estados para o modal de detalhes do endereço ---
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedOrderAddress, setSelectedOrderAddress] = useState<string | null>(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  // --- Fim dos novos estados ---

  const statuses = ['pago', 'pendente'];

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

  // --- Nova função para buscar o endereço de envio ---
  const fetchShippingAddress = async (orderId: string) => {
    setIsLoadingAddress(true);
    setSelectedOrderAddress(null); // Limpa o endereço anterior
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/encomendas/${orderId}/endereco`);
      if (!response.ok) {
        throw new Error('Falha ao buscar detalhes do endereço de envio.');
      }
      const data = await response.json();
      // Assumindo que 'data' é { address: "..." }
      setSelectedOrderAddress(data.address || 'Endereço não disponível.');
      setIsDetailsModalOpen(true); // Abre o modal após buscar o endereço
    } catch (error) {
      console.error('Erro ao buscar endereço de envio:', error);
      setSelectedOrderAddress('Erro ao carregar o endereço.');
      setIsDetailsModalOpen(true); // Abre o modal mesmo com erro para mostrar a mensagem
    } finally {
      setIsLoadingAddress(false);
    }
  };
  // --- Fim da nova função ---


  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredAndSortedOrders = orders
    .filter(order => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

      const matchesDate = dateFilter === '' ||
        new Date(order.date).toISOString().slice(0, 10) === dateFilter;

      return matchesSearch && matchesStatus && matchesDate;
    })
    .sort((a, b) => {
      if (priceSortOrder === 'desc') {
        return b.total - a.total;
      }
      if (priceSortOrder === 'asc') {
        return a.total - b.total;
      }
      return 0;
    });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Encomendas</h1>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 items-end md:items-center">
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

          <div className="flex items-center gap-2">
            {/* Usando CalendarCheck para o filtro de data */}
            <CalendarCheck size={18} className="text-gray-500" /> 
            <input
              type="date"
              className="rounded-md border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPriceSortOrder(priceSortOrder === 'desc' ? 'asc' : 'desc')}
              className="rounded-md border border-gray-300 py-2 px-4 flex items-center gap-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
            >
              Preço
              {priceSortOrder === 'desc' ? (
                <ArrowDown size={16} />
              ) : (
                <ArrowUp size={16} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Passa a função fetchShippingAddress como prop */}
      <OrdersTable orders={filteredAndSortedOrders} onDetailsClick={fetchShippingAddress} />

      {/* --- Modal de Detalhes do Endereço --- */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do Endereço de Envio</DialogTitle>
            <DialogDescription>
              Informações sobre o endereço de envio da encomenda selecionada.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {isLoadingAddress ? (
              <p className="text-gray-600">A carregar endereço...</p>
            ) : (
              <p className="text-gray-800 font-medium whitespace-pre-wrap">{selectedOrderAddress}</p>
            )}
          </div>
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <Button onClick={() => setIsDetailsModalOpen(false)}>Fechar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}