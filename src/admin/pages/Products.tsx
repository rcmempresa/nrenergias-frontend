import React, { useState, useEffect } from 'react';
import { Search, Filter, PlusCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ProductsTable } from '../components/dashboard/ProductsTable';
import { Product } from '../../types';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para filtros e ordenação
  const [termoBusca, setTermoBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [filtroEstoque, setFiltroEstoque] = useState('todos');
  const [filtroPreco, setFiltroPreco] = useState<string>('todos');
  const [ordenacaoPreco, setOrdenacaoPreco] = useState<string>('nenhum'); // 'nenhum', 'maior-menor', 'menor-maior'

  // Estados para o modal de adicionar produto
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({
    id: uuidv4(),
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
    marca: '',
    avaliacoes: 0,
    caracteristicas: '',
  });

  // Estados para upload de arquivos de imagem
  const [selectedMainImage, setSelectedMainImage] = useState<File | null>(null);
  const [selectedAdditionalImages, setSelectedAdditionalImages] = useState<FileList | null>(null);

  // Estado para a mensagem de sucesso
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Buscar produtos da API
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`);
      setProducts(response.data);
    } catch (err) {
      setError('Erro ao carregar os produtos.');
      console.error('Erro ao buscar os produtos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Chama a função de fetch ao montar o componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handler genérico para inputs de texto/número/select do formulário de novo produto
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === 'preco' || name === 'estoque' || name === 'old_price' || name === 'rating' || name === 'avaliacoes' ? Number(value) : value,
    }));
  };

  // Handler específico para o input de imagens adicionais (string separada por vírgulas)
  const handleAdditionalImagesTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const imagesArray = value.split(',').map(url => url.trim()).filter(url => url !== '');
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: imagesArray,
    }));
  };

  // Handler para seleção de arquivo de imagem principal
  const handleMainImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedMainImage(e.target.files[0]);
    } else {
      setSelectedMainImage(null);
    }
  };

  // Handler para seleção de múltiplos arquivos de imagens adicionais
  const handleAdditionalImageFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedAdditionalImages(e.target.files);
    } else {
      setSelectedAdditionalImages(null);
    }
  };

  // Função para adicionar um novo produto, incluindo upload de imagens
  const handleAddProduct = async () => {
    setLoading(true);
    setError(null);

    let mainImageUrl = newProduct.imagem_url; // Assume que pode vir de uma URL direta
    const additionalImageUrls: string[] = [...newProduct.imagens]; // Começa com as URLs já existentes (se houver)

    try {
      // 1. Upload da Imagem Principal (se um novo arquivo foi selecionado)
      if (selectedMainImage) {
        const formData = new FormData();
        formData.append('image', selectedMainImage);

        const uploadResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/upload/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        mainImageUrl = uploadResponse.data.url; // A URL da imagem salva que o backend retorna
      }

      // 2. Upload de Imagens Adicionais (se novos arquivos foram selecionados)
      if (selectedAdditionalImages && selectedAdditionalImages.length > 0) {
        for (let i = 0; i < selectedAdditionalImages.length; i++) {
          const file = selectedAdditionalImages[i];
          const formData = new FormData();
          formData.append('image', file);

          const uploadResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/upload/image`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
          },
        });
          additionalImageUrls.push(uploadResponse.data.url);
        }
      }

      // 3. Montar o objeto do produto com as URLs de imagem (obtidas do upload ou as diretas)
      const productToCreate = {
        ...newProduct,
        id: uuidv4(), // Garante um novo UUID para o produto
        imagem_url: mainImageUrl, // Usa a URL obtida do upload ou a URL direta
        imagens: additionalImageUrls, // Usa as URLs obtidas dos uploads + as já existentes
      };

      // 4. Enviar o produto para o backend
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/products/adicionar`, productToCreate);
      setProducts((prevProducts) => [...prevProducts, response.data]);
      setIsModalOpen(false);

      // 5. Resetar estados do formulário e uploads
      setNewProduct({
        id: uuidv4(),
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
        marca: '',
        avaliacoes: 0,
        caracteristicas: '',
      });
      setSelectedMainImage(null);
      setSelectedAdditionalImages(null);
      // Limpar os inputs de arquivo
      const mainFileInput = document.querySelector('input[name="mainImageFile"]') as HTMLInputElement;
      if (mainFileInput) mainFileInput.value = '';
      const additionalFileInput = document.querySelector('input[name="additionalImageFiles"]') as HTMLInputElement;
      if (additionalFileInput) additionalFileInput.value = '';


      setSuccessMessage('Produto adicionado com sucesso!');
      setTimeout(() => setSuccessMessage(null), 3000);

    } catch (err) {
      setError('Erro ao adicionar o produto ou fazer upload da imagem.');
      console.error('Erro ao adicionar produto:', err);
    } finally {
      setLoading(false);
    }
  };

  // Extrair categorias únicas para o filtro
  const categoriasUnicas = Array.from(new Set(products.map(p => p.categoria))).filter(Boolean); // filtra valores nulos/vazios

  if (loading) {
    return <div className="text-center py-8">Carregando produtos...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Gestão de Produtos</h1>
        <Button className="md:self-end" icon={<PlusCircle size={18} />} onClick={() => setIsModalOpen(true)}>
          Adicionar Novo Produto
        </Button>
      </div>

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
            <div className="flex flex-col">
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
            <div className="flex flex-col">
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
            <div className="flex flex-col">
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
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700 mb-1">Ordenar por Preço</span>
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-500" />
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
          <div className="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto"> {/* Adicionado max-h e overflow para scroll */}
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

              <div>
                <label htmlFor="mainImageFile" className="block text-sm font-medium text-gray-700 mb-1">Upload Imagem Principal:</label>
                <input
                  type="file"
                  id="mainImageFile"
                  name="mainImageFile"
                  onChange={handleMainImageFileChange}
                  className="w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  accept="image/*"
                />
              </div>

              {/* Input para upload de IMAGENS ADICIONAIS */}
              <div>
                <label htmlFor="additionalImageFiles" className="block text-sm font-medium text-gray-700 mb-1">Upload Imagens Adicionais:</label>
                <input
                  type="file"
                  id="additionalImageFiles"
                  name="additionalImageFiles"
                  onChange={handleAdditionalImageFilesChange}
                  multiple
                  className="w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  accept="image/*"
                />
              </div>

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
                placeholder="Avaliação (0-5)"
                value={newProduct.rating || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <input
                type="text"
                name="marca"
                placeholder="Marca do produto"
                value={newProduct.marca || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <input
                type="number"
                name="avaliacoes"
                placeholder="Número de avaliações"
                value={newProduct.avaliacoes || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <textarea
                name="caracteristicas"
                placeholder="Características (ex: 'cor:azul,tamanho:M' ou JSON)"
                value={typeof newProduct.caracteristicas === 'string' ? newProduct.caracteristicas : JSON.stringify(newProduct.caracteristicas || '')}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <select
                name="status"
                value={newProduct.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>

              <div className="flex justify-end gap-4 mt-4">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddProduct} disabled={loading}>
                  {loading ? 'Adicionando...' : 'Adicionar Produto'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}