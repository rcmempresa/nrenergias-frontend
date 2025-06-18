import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Copy } from 'lucide-react';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import { Product } from '../../types';

interface ProductsTableProps {
  title: string;
  products: Product[];
  showActions?: boolean;
  className?: string;
  searchTerm: string;
  category: string; // Já existe, mas será usado para filtragem
  stockStatus: string;
  priceFilter: string;
}

export function ProductsTable({
  title,
  products,
  showActions = true,
  className = '',
  searchTerm = '',
  category,
  stockStatus,
  priceFilter,
}: ProductsTableProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const handleDelete = async (productId: string) => {
    const confirmDelete = window.confirm('Tem a certeza que pretende eliminar este produto?');

    if (confirmDelete) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products/eliminar/${productId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setFilteredProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
          );
        } else {
          alert('Erro ao excluir o produto');
        }
      } catch (error) {
        console.error('Erro ao excluir o produto:', error);
        alert('Erro ao excluir o produto');
      }
    }
  };

  useEffect(() => {
    let filtered = products.filter((product) => {
      const productName = product.nome ? product.nome.toLowerCase() : '';

      return (
        productName.includes(searchTerm.toLowerCase()) &&
        // Esta linha já filtra pela categoria, mas agora a coluna será visível
        (category === 'todos' || product.categoria === category) &&
        (stockStatus === 'todos' ||
          (stockStatus === 'em-estoque' && product.estoque > 0) ||
          (stockStatus === 'fora-de-estoque' && product.estoque === 0)) &&
        (priceFilter === 'todos' ||
          (priceFilter === 'baixo' && product.preco <= 50) ||
          (priceFilter === 'medio' && product.preco > 50 && product.preco <= 200) ||
          (priceFilter === 'alto' && product.preco > 200))
      );
    });

    setFilteredProducts(filtered);
  }, [searchTerm, category, stockStatus, priceFilter, products]);

  if (!filteredProducts.length) {
    return <div>Nenhum produto encontrado.</div>;
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produto
              </th>
              {/* Nova coluna para Categoria */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoria
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preço
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              {showActions && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-md object-cover"
                        src={product.imagem_url}
                        alt={product.nome}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.nome}</div>
                      {/* Removido daqui para ter uma coluna própria */}
                      {/* <div className="text-sm text-gray-500">{product.categoria}</div> */}
                    </div>
                  </div>
                </td>
                {/* Célula de dados para Categoria */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.categoria}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${product.estoque === 0 ? 'text-red-500 font-medium' : 'text-gray-900'}`}>
                    {product.estoque}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatCurrency(product.preco)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={product.status} />
                </td>
                {showActions && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600"
                        icon={<Edit size={16} />}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-600"
                        icon={<Copy size={16} />}
                      >
                        Copiar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                        icon={<Trash2 size={16} />}
                        onClick={() => handleDelete(product.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}