import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Copy } from 'lucide-react';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import { Product } from '../../types'; // Certifique-se de que o caminho para Product está correto
import axios from 'axios'; // Importar axios para a função handleDelete

interface ProductsTableProps {
  title: string;
  products: Product[];
  showActions?: boolean;
  className?: string;
  searchTerm: string;
  category: string;
  stockStatus: string;
  priceFilter: string;
  priceOrder: string;
  // NOVO: Prop para a função de edição que vem do componente pai (Products.tsx)
  onEditProduct: (product: Product) => void;
  // NOVO: Prop para a função de eliminação que vem do componente pai (Products.tsx)
  onDeleteProduct: (productId: string) => void;
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
  priceOrder,
  onEditProduct,   // Desestruturar a nova prop
  onDeleteProduct, // Desestruturar a nova prop
}: ProductsTableProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  // Alterada para chamar a função de eliminação passada via props
  const handleDelete = async (productId: string) => {
    const confirmDelete = window.confirm('Tem a certeza que pretende eliminar este produto?');

    if (confirmDelete) {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/products/eliminar/${productId}`);

        if (response.status === 200) { // Verifica o status HTTP para sucesso
          // Chama a função do componente pai para remover o produto da lista principal
          onDeleteProduct(productId);
          alert('Produto eliminado com sucesso!');
        } else {
          // Trata outros possíveis status de erro
          alert(`Erro ao excluir o produto: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Erro ao excluir o produto:', error);
        // Verifica se é um erro de resposta HTTP
        if (axios.isAxiosError(error) && error.response) {
            alert(`Erro ao excluir o produto: ${error.response.data.error || error.message}`);
        } else {
            alert('Erro ao excluir o produto.');
        }
      }
    }
  };

  useEffect(() => {
    // 1. Filtragem
    let currentFiltered = products.filter((product) => {
      const productName = product.nome ? product.nome.toLowerCase() : '';

      return (
        productName.includes(searchTerm.toLowerCase()) &&
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

    // 2. Ordenação
    if (priceOrder === 'maior-menor') {
      currentFiltered.sort((a, b) => b.preco - a.preco);
    } else if (priceOrder === 'menor-maior') {
      currentFiltered.sort((a, b) => a.preco - b.preco);
    }

    setFilteredProducts(currentFiltered);
    // Adicionar 'products' como dependência para que o filtro/ordenação seja refeito quando a lista de produtos muda no pai
  }, [searchTerm, category, stockStatus, priceFilter, priceOrder, products]);

  // Mensagens para feedback ao utilizador
  if (!products.length && !searchTerm && category === 'todos' && stockStatus === 'todos' && priceFilter === 'todos') {
    return <div className="text-center py-8 text-gray-600">Não há produtos registados.</div>;
  }

  if (!filteredProducts.length && products.length > 0) {
    return <div className="text-center py-8 text-gray-600">Nenhum produto encontrado com os filtros aplicados.</div>;
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
                    </div>
                  </div>
                </td>
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
                        // Chama a função onEditProduct passada via props
                        onClick={() => onEditProduct(product)}
                      >
                        Editar
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                        icon={<Trash2 size={16} />}
                        // Chama a função handleDelete local
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