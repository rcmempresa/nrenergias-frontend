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
  const [ordenacaoPreco, setOrdenacaoPreco] = useState<string>('nenhum');

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

  // NOVO: Estado para erros de validação do formulário
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === 'preco' || name === 'estoque' || name === 'old_price' || name === 'rating' || name === 'avaliacoes' ? Number(value) : value,
    }));
    // Limpar erro de validação para o campo que está a ser editado
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleAdditionalImagesTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const imagesArray = value.split(',').map(url => url.trim()).filter(url => url !== '');
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: imagesArray,
    }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleMainImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedMainImage(e.target.files[0]);
      setNewProduct((prev) => ({ ...prev, imagem_url: '' })); // Limpa URL se arquivo selecionado
      setValidationErrors((prevErrors) => ({ ...prevErrors, imagem_url: '' })); // Limpa erro de imagem
    } else {
      setSelectedMainImage(null);
    }
  };

  const handleAdditionalImageFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedAdditionalImages(e.target.files);
      setNewProduct((prev) => ({ ...prev, imagens: [] })); // Limpa URLs se arquivos selecionados
      setValidationErrors((prevErrors) => ({ ...prevErrors, imagens: '' })); // Limpa erro de imagens
    } else {
      setSelectedAdditionalImages(null);
    }
  };

  // NOVO: Função para validar o formulário
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    // Validações para campos obrigatórios
    if (!newProduct.nome.trim()) errors.nome = 'O nome do produto é obrigatório.';
    if (!newProduct.categoria.trim()) errors.categoria = 'A categoria é obrigatória.';
    if (newProduct.preco <= 0) errors.preco = 'O preço deve ser maior que 0.';
    if (newProduct.estoque <= 0) errors.estoque = 'O stock deve ser maior que 0.';
    if (!newProduct.descricao.trim()) errors.descricao = 'A descrição curta é obrigatória.';
    if (!newProduct.descricao_completa.trim()) errors.descricao_completa = 'A descrição completa é obrigatória.';
    if (!newProduct.marca.trim()) errors.marca = 'A marca é obrigatória.';
    if (newProduct.rating < 0 || newProduct.rating > 5) errors.rating = 'A avaliação deve ser entre 0 e 5.';
    if (newProduct.avaliacoes < 0) errors.avaliacoes = 'O número de avaliações não pode ser negativo.';


    // Validação para imagem principal (ou upload ou URL direta)
    if (!selectedMainImage && !newProduct.imagem_url.trim()) {
      errors.imagem_url = 'É obrigatório selecionar uma imagem principal ou fornecer uma URL.';
    }

    // Validação para imagens adicionais (opcional, mas se quiser tornar obrigatório, ajuste aqui)
    // if (!selectedAdditionalImages?.length && newProduct.imagens.length === 0) {
    //   errors.imagens = 'É obrigatório selecionar imagens adicionais ou fornecer URLs.';
    // }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Retorna true se não houver erros
  };


  const handleAddProduct = async () => {
    // NOVO: Validar o formulário antes de prosseguir
    if (!validateForm()) {
      setError('Por favor, preencha todos os campos obrigatórios corretamente.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    let mainImageUrl = newProduct.imagem_url;
    const additionalImageUrls: string[] = [...newProduct.imagens];

    try {
      if (selectedMainImage) {
        const formData = new FormData();
        formData.append('image', selectedMainImage);
        const uploadResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/upload/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        mainImageUrl = uploadResponse.data.url;
      }

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

      const productToCreate = {
        ...newProduct,
        id: uuidv4(),
        imagem_url: mainImageUrl,
        imagens: additionalImageUrls,
      };

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/products/adicionar`, productToCreate);
      setProducts((prevProducts) => [...prevProducts, response.data]);
      setIsModalOpen(false);

      // Resetar estados do formulário e uploads
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
      setValidationErrors({}); // NOVO: Limpar erros de validação
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

  const categoriasUnicas = Array.from(new Set(products.map(p => p.categoria))).filter(Boolean);

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
      {/* Mensagem de erro geral do formulário (se houver) */}
      {Object.keys(validationErrors).length > 0 && error && (
        <div className="text-red-500 font-semibold p-4 bg-red-100 rounded-md">
          {error}
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
          <div className="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Adicionar Novo Produto</h3>
            <div className="space-y-4">
              {/* Campos do formulário com validação e feedback visual */}
              <div>
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome do produto"
                  value={newProduct.nome || ''}
                  onChange={handleChange}
                  className={`w-full border rounded-md p-2 ${validationErrors.nome ? 'border-red-500' : 'border-gray-300'}`}
                />
                {validationErrors.nome && <p className="text-red-500 text-xs mt-1">{validationErrors.nome}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="categoria"
                  placeholder="Categoria"
                  value={newProduct.categoria || ''}
                  onChange={handleChange}
                  className={`w-full border rounded-md p-2 ${validationErrors.categoria ? 'border-red-500' : 'border-gray-300'}`}
                />
                {validationErrors.categoria && <p className="text-red-500 text-xs mt-1">{validationErrors.categoria}</p>}
              </div>
              <div>
                <input
                  type="number"
                  name="preco"
                  placeholder="Preço"
                  value={newProduct.preco || ''}
                  onChange={handleChange}
                  className={`w-full border rounded-md p-2 ${validationErrors.preco ? 'border-red-500' : 'border-gray-300'}`}
                />
                {validationErrors.preco && <p className="text-red-500 text-xs mt-1">{validationErrors.preco}</p>}
              </div>
              <div>
                <input
                  type="number"
                  name="estoque"
                  placeholder="Stock"
                  value={newProduct.estoque || ''}
                  onChange={handleChange}
                  className={`w-full border rounded-md p-2 ${validationErrors.estoque ? 'border-red-500' : 'border-gray-300'}`}
                />
                {validationErrors.estoque && <p className="text-red-500 text-xs mt-1">{validationErrors.estoque}</p>}
              </div>

              {/* Imagem Principal */}
              <div>
                <label htmlFor="mainImageFile" className="block text-sm font-medium text-gray-700 mb-1">Upload Imagem Principal:</label>
                <input
                  type="file"
                  id="mainImageFile"
                  name="mainImageFile"
                  onChange={handleMainImageFileChange}
                  className={`w-full border rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${validationErrors.imagem_url ? 'border-red-500' : 'border-gray-300'}`}
                  accept="image/*"
                />
                <p className="text-xs text-gray-500 mt-1">Ou insira a URL direta da imagem principal:</p>
                <input
                  type="text"
                  name="imagem_url"
                  placeholder="URL da imagem principal (se não fizer upload)"
                  value={newProduct.imagem_url || ''}
                  onChange={handleChange}
                  className={`w-full border rounded-md p-2 ${validationErrors.imagem_url ? 'border-red-500' : 'border-gray-300'}`}
                />
                {validationErrors.imagem_url && <p className="text-red-500 text-xs mt-1">{validationErrors.imagem_url}</p>}
              </div>

              {/* Imagens Adicionais (opcionalmente obrigatórias, como comentado) */}
              <div>
                <label htmlFor="additionalImageFiles" className="block text-sm font-medium text-gray-700 mb-1">Upload Imagens Adicionais:</label>
                <input
                  type="file"
                  id="additionalImageFiles"
                  name="additionalImageFiles"
                  onChange={handleAdditionalImageFilesChange}
                  multiple
                  className={`w-full border rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${validationErrors.imagens ? 'border-red-500' : 'border-gray-300'}`}
                  accept="image/*"
                />
                <p className="text-xs text-gray-500 mt-1">Ou insira URLs adicionais (separadas por vírgula):</p>
                <input
                  type="text"
                  name="imagens"
                  placeholder="URLs das imagens adicionais (se não fizer upload)"
                  value={newProduct.imagens.join(',') || ''}
                  onChange={handleAdditionalImagesTextChange}
                  className={`w-full border rounded-md p-2 ${validationErrors.imagens ? 'border-red-500' : 'border-gray-300'}`}
                />
                {validationErrors.imagens && <p className="text-red-500 text-xs mt-1">{validationErrors.imagens}</p>}
              </div>

              <div>
                <textarea
                  name="descricao"
                  placeholder="Descrição curta"
                  value={newProduct.descricao || ''}
                  onChange={handleChange}
                  className={`w-full border rounded-md p-2 ${validationErrors.descricao ? 'border-red-500' : 'border-gray-300'}`}
                />
                {validationErrors.descricao && <p className="text-red-500 text-xs mt-1">{validationErrors.descricao}</p>}
              </div>
              <div>
                <textarea
                  name="descricao_completa"
                  placeholder="Descrição completa"
                  value={newProduct.descricao_completa || ''}
                  onChange={handleChange}
                  className={`w-full border rounded-md p-2 ${validationErrors.descricao_completa ? 'border-red-500' : 'border-gray-300'}`}
                />
                {validationErrors.descricao_completa && <p className="text-red-500 text-xs mt-1">{validationErrors.descricao_completa}</p>}
              </div>
              <div>
                <input
                  type="number"
                  name="old_price"
                  placeholder="Preço antigo"
                  value={newProduct.old_price || ''}
                  onChange={handleChange}
                  className={`w-full border rounded-md p-2 ${validationErrors.old_price ? 'border-red-500' : 'border-gray-300'}`}
                />
                {validationErrors.old_price && <p className="text-red-500 text-xs mt-1">{validationErrors.old_price}</p>}
              </div>
              <div>
                <input
                  type="number"
                  name="rating"
                  placeholder="Avaliação (0-5)"
                  value={newProduct.rating || ''}
                  onChange={handleChange}
                  className={`w-full border rounded-md p-2 ${validationErrors.rating ? 'border-red-500' : 'border-gray-300'}`}
                />
                {validationErrors.rating && <p className="text-red-500 text-xs mt-1">{validationErrors.rating}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="marca"
                  placeholder="Marca do produto"
                  value={newProduct.marca || ''}
                  onChange={handleChange}
                  className={`w-full border rounded-md p-2 ${validationErrors.marca ? 'border-red-500' : 'border-gray-300'}`}
                />
                {validationErrors.marca && <p className="text-red-500 text-xs mt-1">{validationErrors.marca}</p>}
              </div>
              <div>
                <input
                  type="number"
                  name="avaliacoes"
                  placeholder="Número de avaliações"
                  value={newProduct.avaliacoes || ''}
                  onChange={handleChange}
                  className={`w-full border rounded-md p-2 ${validationErrors.avaliacoes ? 'border-red-500' : 'border-gray-300'}`}
                />
                {validationErrors.avaliacoes && <p className="text-red-500 text-xs mt-1">{validationErrors.avaliacoes}</p>}
              </div>
              <div>
                <textarea
                  name="caracteristicas"
                  placeholder="Características (ex: 'cor:azul,tamanho:M' ou JSON)"
                  value={typeof newProduct.caracteristicas === 'string' ? newProduct.caracteristicas : JSON.stringify(newProduct.caracteristicas || '')}
                  onChange={handleChange}
                  className={`w-full border rounded-md p-2 ${validationErrors.caracteristicas ? 'border-red-500' : 'border-gray-300'}`}
                />
                {validationErrors.caracteristicas && <p className="text-red-500 text-xs mt-1">{validationErrors.caracteristicas}</p>}
              </div>
              <div>
                <select
                  name="status"
                  value={newProduct.status}
                  onChange={handleChange}
                  className={`w-full border rounded-md p-2 ${validationErrors.status ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
                {validationErrors.status && <p className="text-red-500 text-xs mt-1">{validationErrors.status}</p>}
              </div>


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