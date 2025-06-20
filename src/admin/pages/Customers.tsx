import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { CustomersTable } from '../components/dashboard/CustomersTable';

export function Customers() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/listar`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        setError(error);
        console.error("Erro ao buscar clientes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(customer =>
    customer.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar clientes..."
              className="w-full rounded-md border border-gray-300 py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="text-center text-gray-600">Carregando clientes...</div>
      ) : error ? (
        <div className="text-center text-red-600">Erro ao carregar clientes: {error.message}</div>
      ) : filteredCustomers.length === 0 && searchTerm !== '' ? (
        <div className="text-center text-gray-600">Nenhum cliente encontrado para "{searchTerm}".</div>
      ) : filteredCustomers.length === 0 ? (
        <div className="text-center text-gray-600">Não há clientes registados.</div>
      ) : (
        <CustomersTable
          customers={filteredCustomers}
          // As props onViewProfile, onSendEmail e onBanCustomer foram removidas daqui
        />
      )}
    </div>
  );
}