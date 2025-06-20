import React, { useEffect, useState } from 'react';
import { Search, Filter, ArrowDown, ArrowUp, CalendarCheck, X } from 'lucide-react';
import { OrdersTable } from '../components/dashboard/OrdersTable';
// Removidos os imports do Dialog, já que agora está inlined.
// Importe o Button se for usá-lo em outros locais na página.

// Define um tipo para os detalhes do endereço que vêm da API
interface ShippingAddressDetails {
  address: string;
  city: string;
  zip_code: string;
  phone: string;
  // Adicione outros campos se a sua API os retornar (ex: country, state)
}

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [priceSortOrder, setPriceSortOrder] = useState<'none' | 'desc' | 'asc'>('none');

  // --- Novo tipo para o estado do endereço selecionado ---
  const [selectedShippingDetails, setSelectedShippingDetails] = useState<ShippingAddressDetails | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
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

  const fetchShippingAddress = async (orderId: string) => {
    setIsLoadingAddress(true);
    setSelectedShippingDetails(null); // Limpa os detalhes anteriores
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/encomendas/listar/${orderId}/endereco`);
      if (!response.ok) {
        throw new Error('Falha ao buscar detalhes do endereço de envio.');
      }
      const data: ShippingAddressDetails = await response.json(); // Tipa a resposta
      setSelectedShippingDetails(data); // Armazena o objeto completo
      setIsDetailsModalOpen(true);
      document.body.style.overflow = 'hidden';
    } catch (error) {
      console.error('Erro ao buscar endereço de envio:', error);
      // Aqui, você pode definir um objeto de erro ou uma mensagem para exibir
      setSelectedShippingDetails({
        address: 'Erro ao carregar o endereço.',
        city: '',
        zip_code: '',
        phone: ''
      });
      setIsDetailsModalOpen(true);
      document.body.style.overflow = 'hidden';
    } finally {
      setIsLoadingAddress(false);
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleCloseModal = () => {
    setIsDetailsModalOpen(false);
    document.body.style.overflow = '';
  };

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
                Informações completas sobre o endereço de envio da encomenda.
              </p>
            </div>

            {/* Conteúdo do Modal - AGORA EXIBE TODOS OS CAMPOS */}
            <div className="py-4 space-y-2"> {/* Adicionado space-y-2 para espaçamento */}
              {isLoadingAddress ? (
                <p className="text-gray-600">A carregar endereço...</p>
              ) : selectedShippingDetails ? (
                <>
                  <p className="text-gray-800 font-medium">
                    <span className="font-semibold">Endereço:</span> {selectedShippingDetails.address}
                  </p>
                  <p className="text-gray-800 font-medium">
                    <span className="font-semibold">Cidade:</span> {selectedShippingDetails.city}
                  </p>
                  <p className="text-gray-800 font-medium">
                    <span className="font-semibold">Código Postal:</span> {selectedShippingDetails.zip_code}
                  </p>
                  <p className="text-gray-800 font-medium">
                    <span className="font-semibold">Telefone:</span> {selectedShippingDetails.phone}
                  </p>
                </>
              ) : (
                <p className="text-gray-600">Nenhum detalhe de endereço disponível.</p>
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
              <X size={16} />
              <span className="sr-only">Fechar</span>
            </button>
          </div>
        </div>
      )}
      {/* --- Fim do Modal Inlined --- */}
    </div>
  );
}