import React, { useEffect, useState } from 'react';
import { Search, Filter, ArrowDownAZ, ArrowUpZA } from 'lucide-react';
import { OrdersTable } from '../components/dashboard/OrdersTable';
import { Order } from '../../types'; // Certifique-se de que o tipo 'Order' está correto e inclui 'shippingDetails'

// Importações para o Modal (ex: shadcn/ui)
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog'; // Ajuste o caminho se seu componente de Dialog estiver em outro lugar

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState(''); // Formato 'YYYY-MM-DD'
  const [priceSortOrder, setPriceSortOrder] = useState<'none' | 'desc' | 'asc'>('none'); // 'desc' para maior para menor, 'asc' para menor para maior

  // Estados para o modal de detalhes
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Status visíveis no filtro, apenas pendente e pago
  const statuses = ['pendente', 'pago'];

  // Função para buscar dados do backend
  const fetchOrders = async () => {
    try {
      const [ordersRes, usersRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/encomendas/listar`),
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/listar`),
      ]);

      if (!ordersRes.ok) throw new Error(`HTTP error! status: ${ordersRes.status}`);
      if (!usersRes.ok) throw new Error(`HTTP error! status: ${usersRes.status}`);

      const [ordersData, usersData] = await Promise.all([
        ordersRes.json(),
        usersRes.json(),
      ]);

      const usersMap = new Map(usersData.map((u: any) => [u.id, u]));

      const mappedOrders: Order[] = ordersData.map((item: any) => {
        const user = usersMap.get(item.user_id);
        return {
          id: item.id.toString(),
          customer: {
            name: user?.nome ?? 'Sem Nome',
            email: user?.email ?? 'Sem Email',
          },
          status: item.payment_status, // Usando payment_status do backend
          total: item.total_amount,
          date: item.created_at,
          // Incluindo shippingDetails se a API de encomendas já os retorna
          shippingDetails: item.shipping_details ? {
            address: item.shipping_details.address,
            city: item.shipping_details.city,
            zip_code: item.shipping_details.zip_code,
            country: item.shipping_details.country,
          } : undefined, // Ou um objeto padrão vazio se não existirem
        };
      });

      setOrders(mappedOrders);
    } catch (error) {
      console.error("Erro ao buscar encomendas ou usuários:", error);
      // Aqui você pode adicionar uma notificação para o usuário, se necessário
    }
  };

  // Efeito para carregar as encomendas na montagem do componente
  useEffect(() => {
    fetchOrders();
  }, []);

  // Lógica de Filtragem e Ordenação
  const filteredAndSortedOrders = orders
    .filter(order => {
      // Busca por termo
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro de status
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

      // Filtro de data
      const matchesDate = dateFilter === '' ||
        new Date(order.date).toISOString().slice(0, 10) === dateFilter;

      return matchesSearch && matchesStatus && matchesDate;
    })
    .sort((a, b) => {
      // Ordenação por preço
      if (priceSortOrder === 'desc') {
        return b.total - a.total; // Maior para o menor
      }
      if (priceSortOrder === 'asc') {
        return a.total - b.total; // Menor para o maior
      }
      return 0; // Sem ordenação específica
    });

  // Função para abrir o modal de detalhes de uma encomenda
  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  // Função para formatar moeda (pode ser movida para um utilitário se usada em vários lugares)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Encomendas</h1>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 items-end md:items-center">
          {/* Campo de Busca */}
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

          {/* Filtro por Status */}
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

          {/* Filtro por Data */}
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" /> {/* Ou use CalendarCheck/CalendarDays se preferir */}
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
              onClick={() => setPriceSortOrder(priceSortOrder === 'desc' ? 'asc' : 'desc')}
              className="rounded-md border border-gray-300 py-2 px-4 flex items-center gap-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
            >
              Preço
              {priceSortOrder === 'desc' ? (
                <ArrowDownAZ size={16} /> // Ícone para "Maior para o Menor"
              ) : (
                <ArrowUpZA size={16} /> // Ícone para "Menor para o Maior"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tabela de Encomendas */}
      <OrdersTable
        orders={filteredAndSortedOrders}
        onViewDetails={handleViewDetails} // Passa a função para lidar com o clique em "Detalhes"
      />

      {/* --- Modal de Detalhes da Encomenda --- */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Detalhes da Encomenda #{selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Informações de envio e outros detalhes da encomenda.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedOrder?.shippingDetails ? (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium col-span-1">Endereço:</span>
                  <span className="col-span-3 text-gray-700">{selectedOrder.shippingDetails.address}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium col-span-1">Cidade:</span>
                  <span className="col-span-3 text-gray-700">{selectedOrder.shippingDetails.city}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium col-span-1">Código Postal:</span>
                  <span className="col-span-3 text-gray-700">{selectedOrder.shippingDetails.zip_code}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-sm font-medium col-span-1">País:</span>
                  <span className="col-span-3 text-gray-700">{selectedOrder.shippingDetails.country}</span>
                </div>
              </>
            ) : (
              <p className="text-center text-gray-500">Detalhes de envio não disponíveis.</p>
            )}
            {/* Outros detalhes da encomenda */}
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium col-span-1">Total:</span>
              <span className="col-span-3 text-gray-700">{selectedOrder && formatCurrency(selectedOrder.total)}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-sm font-medium col-span-1">Status:</span>
              <span className="col-span-3 text-gray-700">{selectedOrder?.status}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* --- Fim do Modal de Detalhes da Encomenda --- */}
    </div>
  );
}