import React, { useEffect, useState } from 'react';
import { Search, Filter, ArrowDown, ArrowUp, CalendarCheck, X } from 'lucide-react';
import { OrdersTable } from '../components/dashboard/OrdersTable';


export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [priceSortOrder, setPriceSortOrder] = useState<'none' | 'desc' | 'asc'>('none');

  // Estados para o modal de detalhes do endereço
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedOrderAddress, setSelectedOrderAddress] = useState<string | null>(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  const statuses = ['pago', 'pendente'];

  const fetchOrders = async () => {
    // ... (sua lógica existente para buscar encomendas e usuários)
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

  const fetchShippingAddress = async (orderId: string) => {
    setIsLoadingAddress(true);
    setSelectedOrderAddress(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/encomendas/${orderId}/endereco`);
      if (!response.ok) {
        throw new Error('Falha ao buscar detalhes do endereço de envio.');
      }
      const data = await response.json();
      setSelectedOrderAddress(data.address || 'Endereço não disponível.');
      setIsDetailsModalOpen(true); // Abre o modal
      // Adiciona/remove classes para evitar scroll do corpo da página quando o modal está aberto
      document.body.style.overflow = 'hidden';
    } catch (error) {
      console.error('Erro ao buscar endereço de envio:', error);
      setSelectedOrderAddress('Erro ao carregar o endereço.');
      setIsDetailsModalOpen(true); // Abre o modal mesmo com erro
      document.body.style.overflow = 'hidden';
    } finally {
      setIsLoadingAddress(false);
    }
  };

  // Efeito para limpar o overflow do body quando o componente desmonta ou o modal fecha
  useEffect(() => {
    return () => {
      document.body.style.overflow = ''; // Garante que o scroll volta ao normal ao desmontar
    };
  }, []); // Vazio para rodar uma vez na montagem/desmontagem

  // Lógica para fechar o modal e restaurar o scroll
  const handleCloseModal = () => {
    setIsDetailsModalOpen(false);
    document.body.style.overflow = '';
  };

  // Lógica para fechar ao clicar no overlay
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };


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

      <OrdersTable orders={filteredAndSortedOrders} onDetailsClick={fetchShippingAddress} />

      {/* --- Modal de Detalhes do Endereço (Inlined) --- */}
      {isDetailsModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <div
            className="relative z-50 bg-white p-6 rounded-lg shadow-xl w-full max-w-sm md:max-w-md lg:max-w-lg animate-in fade-in zoom-in-95 data-[state=open]:slide-in-from-bottom-2"
            onMouseDown={e => e.stopPropagation()}
            onMouseUp={e => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="flex flex-col space-y-1.5 text-center sm:text-left">
              <h2 className="text-lg font-semibold leading-none tracking-tight">Detalhes do Endereço de Envio</h2>
              <p className="text-sm text-gray-500">
                Informações sobre o endereço de envio da encomenda selecionada.
              </p>
            </div>

            {/* Conteúdo do Modal */}
            <div className="py-4">
              {isLoadingAddress ? (
                <p className="text-gray-600">A carregar endereço...</p>
              ) : (
                <p className="text-gray-800 font-medium whitespace-pre-wrap">{selectedOrderAddress}</p>
              )}
            </div>

            {/* Rodapé/Botão de Fechar */}
            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button
                onClick={handleCloseModal}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
              >
                Fechar
              </button>
            </div>

            {/* Botão X para fechar */}
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            >
              <X size={16} /> {/* Ícone X */}
              <span className="sr-only">Fechar</span>
            </button>
          </div>
        </div>
      )}
      {/* --- Fim do Modal Inlined --- */}
    </div>
  );
}