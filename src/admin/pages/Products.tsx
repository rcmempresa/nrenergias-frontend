import React, { useState, useEffect } from 'react';
import { Search, Filter, PlusCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ProductsTable } from '../components/dashboard/ProductsTable';
import { Product } from '../../types';
import axios from 'axios';

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [termoBusca, setTermoBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [filtroEstoque, setFiltroEstoque] = useState('todos');
  const [filtroPreco, setFiltroPreco] = useState<string>('todos');
  const categoriasUnicas = Array.from(new Set(products.map(p => p.categoria)));
  const [ordenacaoPreco, setOrdenacaoPreco] = useState<string>('nenhum');
  
  // Estado para o modal de adicionar produto
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    nome: '',
    categoria: '',
    preco: 0,
    estoque: 0,
    imagem_url: '',
    imagens: [],
    descricao: '',
    descricao_completa: '',
    old_price: 0,
    rating: 0,
    status: 'ativo',
  });

  // Estado para a mensagem de sucesso
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Buscar produtos da API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      setError('Erro ao carregar os produtos.');
      console.error('Erro ao buscar os produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Chama a função de fetch ao montar o componente
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/products/adicionar`, newProduct);
      setProducts((prevProducts) => [...prevProducts, response.data]);
      setIsModalOpen(false);
      setNewProduct({
        id: 0,
        nome: '',
        categoria: '',
        preco: 0,
        estoque: 0,
        imagem_url: '',
        imagens: [],
        descricao: '',
        descricao_completa: '',
        old_price: 0,
        rating: 0,
        status: 'ativo',
      });

      // Exibir a mensagem de sucesso
      setSuccessMessage('Produto adicionado com sucesso!');

      // Limpar a mensagem de sucesso após 3 segundos
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      setError('Erro ao adicionar o produto.');
      console.error('Erro ao adicionar produto:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Para os campos de imagens, trata-se de um array
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const imagesArray = value.split(',');
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: imagesArray,
    }));
  };

  

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Gestão de Produtos</h1>
        <Button className="md:self-end" icon={<PlusCircle size={18} />} onClick={() => setIsModalOpen(true)}>
          Adicionar Novo Produto
        </Button>
      </div>

      {/* Exibe a mensagem de sucesso */}
      {successMessage && (
        <div className="text-green-500 font-semibold p-4 bg-green-100 rounded-md">
          {successMessage}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Procurar produtos..."
              className="w-full rounded-md border border-gray-300 py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
          {/* Filtro por Categoria */}
          <div className="flex flex-col"> {/* Novo div para o rótulo */}
            <span className="text-sm font-medium text-gray-700 mb-1">Categoria</span>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <select
                className="rounded-md border border-gray-300 py-2 px-4 focus:outline-none"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
              >
                <option value="todos">Todas as Categorias</option>
                {categoriasUnicas.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Filtro por Stock */}
          <div className="flex flex-col"> {/* Novo div para o rótulo */}
            <span className="text-sm font-medium text-gray-700 mb-1">Stock</span>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <select
                className="rounded-md border border-gray-300 py-2 px-4 focus:outline-none"
                value={filtroEstoque}
                onChange={(e) => setFiltroEstoque(e.target.value)}
              >
                <option value="todos">Todos em Stock</option>
                <option value="em-estoque">Em Stock</option>
                <option value="fora-de-estoque">Fora de Stock</option>
              </select>
            </div>
          </div>

          {/* Filtro por Preço (faixa) */}
          <div className="flex flex-col"> {/* Novo div para o rótulo */}
            <span className="text-sm font-medium text-gray-700 mb-1">Faixa de Preço</span>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <select
                className="rounded-md border border-gray-300 py-2 px-4 focus:outline-none"
                value={filtroPreco}
                onChange={(e) => setFiltroPreco(e.target.value)}
              >
                <option value="todos">Todos os Preços</option>
                <option value="baixo">Até 50€</option>
                <option value="medio">50€ - 200€</option>
                <option value="alto">Acima de 200€</option>
              </select>
            </div>
          </div>

          {/* Ordenação por Preço */}
          <div className="flex flex-col"> {/* Novo div para o rótulo */}
            <span className="text-sm font-medium text-gray-700 mb-1">Ordenar por Preço</span>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" /> {/* Reutilizando o ícone */}
              <select
                className="rounded-md border border-gray-300 py-2 px-4 focus:outline-none"
                value={ordenacaoPreco}
                onChange={(e) => setOrdenacaoPreco(e.target.value)}
              >
                <option value="nenhum">Nenhum</option>
                <option value="maior-menor">Maior para Menor</option>
                <option value="menor-maior">Menor para Maior</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <ProductsTable
        title="Produtos"
        products={products}
        searchTerm={termoBusca}
        category={filtroCategoria}
        stockStatus={filtroEstoque}
        priceFilter={filtroPreco}
        priceOrder={ordenacaoPreco}
      />

      {/* Modal para Adicionar Novo Produto */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Adicionar Novo Produto</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="nome"
                placeholder="Nome do produto"
                value={newProduct.nome || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                name="categoria"
                placeholder="Categoria"
                value={newProduct.categoria || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <input
                type="number"
                name="preco"
                placeholder="Preço"
                value={newProduct.preco || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <input
                type="number"
                name="estoque"
                placeholder="Stock"
                value={newProduct.estoque || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                name="imagem_url"
                placeholder="URL da imagem principal"
                value={newProduct.imagem_url || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                name="imagens"
                placeholder="URLs das imagens (separadas por vírgula)"
                value={newProduct.imagens.join(',') || ''}
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <textarea
                name="descricao"
                placeholder="Descrição curta"
                value={newProduct.descricao || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <textarea
                name="descricao_completa"
                placeholder="Descrição completa"
                value={newProduct.descricao_completa || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <input
                type="number"
                name="old_price"
                placeholder="Preço antigo"
                value={newProduct.old_price || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <input
                type="number"
                name="rating"
                placeholder="Avaliação"
                value={newProduct.rating || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <div className="flex justify-end gap-4 mt-4">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddProduct}>Adicionar Produto</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
