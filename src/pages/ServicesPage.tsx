import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Star } from 'lucide-react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ServicesPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState(['', '']); 
  const productsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/products`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Converte os valores da faixa de preço para números, ou usa valores padrão se vazios
    const minPrice = priceRange[0] === '' ? 0 : Number(priceRange[0]);
    const maxPrice = priceRange[1] === '' ? 5000 : Number(priceRange[1]);

    let filtered = products.filter(product =>
      product.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.preco >= minPrice && product.preco <= maxPrice
    );

    if (category) {
      filtered = filtered.filter(product => product.categoria === category);
    }

    // Ordenação
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.preco - b.preco);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.preco - a.preco);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, priceRange, category, products, sortBy]);

  // Paginação
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold mb-2">Erro ao carregar os produtos</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Produtos Eletrónicos | NRenergias</title>
        <meta name="description" content="Explore a seleção de produtos eletrónicos da NRenergias — desde cabos de carregamento e câmaras de vigilância até ar condicionados e soluções solares. Tecnologia e sustentabilidade ao seu alcance, com entrega em todo o país." />
        <meta name="keywords" content="produtos eletrónicos, cabos de carregamento, ar condicionado, câmara de vigilância, NRenergias, Porto Santo, painéis solares, sustentabilidade, Portugal" />
        <link rel="canonical" href="https://nrenergias.pt/produtos" />
      </Helmet>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 mt-44">
          <h1 className="text-3xl font-bold">Produtos</h1>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Procurar Produtos..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-gray-100 rounded-lg flex items-center gap-2 hover:bg-gray-200"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filtros
            </button>
          </div>

          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoria
                  </label>
                  <select
                    className="w-full p-2 border rounded-lg"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Todas as Categorias</option>
                    <option value="Ar Condicionado">Ar Condicionado</option>
                    <option value="Câmara Segurança">Câmara de Segurança/Vídeo Porteiro</option>
                    <option value="Switch">Reyee</option>
                    <option value="Bombas de Calor">Bombas de Calor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ordenar por
                  </label>
                  <select
                    className="w-full p-2 border rounded-lg"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="">Apresentados</option>
                    <option value="price-asc">Preço: Menor para Maior</option>
                    <option value="price-desc">Preço: Maior para Menor</option>
                    <option value="name">Nome</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Faixa de preço
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      className="w-full p-2 border rounded-lg"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => {
                        const val = e.target.value;
                        // Permitir string vazia para limpar input
                        if (val === '' || (Number(val) >= 0 && Number(val) <= (priceRange[1] === '' ? 5000 : Number(priceRange[1])))) {
                          setPriceRange([val, priceRange[1]]);
                        }
                      }}
                      min={0}
                      max={priceRange[1] === '' ? 5000 : Number(priceRange[1])}
                    />
                    <input
                      type="number"
                      className="w-full p-2 border rounded-lg"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '' || (Number(val) >= (priceRange[0] === '' ? 0 : Number(priceRange[0])))) {
                          setPriceRange([priceRange[0], val]);
                        }
                      }}
                      min={priceRange[0] === '' ? 0 : Number(priceRange[0])}
                      max={5000}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.length > 0 ? (
            currentProducts.map(product => (
              <Link to={`/produto/${product.id}`} key={product.id} className="text-blue-500 hover:text-blue-600">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src={product.imagem_url}
                      alt={product.nome}
                      className="w-full h-48 object-cover"
                    />
                    {product.stock < 5 && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Pouco stock
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{product.nome}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.descricao}</p>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating || 3)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      {product.rating !== undefined && (
                        <span className="text-sm text-gray-500">({product.rating})</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg text-blue-600">€{product.preco}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>Nenhum produto encontrado.</p>
          )}
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
              Anterior
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => paginate(idx + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === idx + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
              Próximo
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ServicesPage;
