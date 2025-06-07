import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tipo, setTipo] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState(['', '']);
  const servicesPerPage = 10;

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/services`)
      .then(response => {
        if (!response.ok) throw new Error('Erro ao carregar serviços');
        return response.json();
      })
      .then(data => {
        setServices(data);
        setFilteredServices(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const minPrice = priceRange[0] === '' ? 0 : Number(priceRange[0]);
    const maxPrice = priceRange[1] === '' ? 1000 : Number(priceRange[1]);

    let filtered = services.filter(service =>
      service.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
      service.preco_por_unidade >= minPrice &&
      service.preco_por_unidade <= maxPrice
    );

    if (tipo) {
      filtered = filtered.filter(service => service.tipo === tipo);
    }

    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.preco_por_unidade - b.preco_por_unidade);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.preco_por_unidade - a.preco_por_unidade);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    setFilteredServices(filtered);
    setCurrentPage(1);
  }, [searchTerm, priceRange, tipo, services, sortBy]);

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

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
          <p className="text-xl font-semibold mb-2">Erro ao carregar os serviços</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Serviços | NRenergias</title>
        <meta name="description" content="Explore os serviços da NRenergias — montagem, eletricidade, assistência técnica e muito mais. Profissionais qualificados ao seu dispor." />
        <meta name="keywords" content="serviços, montagem, eletricidade, assistência, NRenergias, Porto Santo" />
        <link rel="canonical" href="https://nrenergias.pt/servicos" />
      </Helmet>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 mt-44">
          <h1 className="text-3xl font-bold">Serviços</h1>
        </div>

        {/* Filtros e Pesquisa */}
        <div className="mb-8">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Procurar serviços..."
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
                    Tipo de Serviço
                  </label>
                  <select
                    className="w-full p-2 border rounded-lg"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                  >
                    <option value="">Todos</option>
                    <option value="Montagem">Montagem</option>
                    <option value="Eletricidade">Eletricidade</option>
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
                    Faixa de Preço
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      className="w-full p-2 border rounded-lg"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '' || (Number(val) >= 0 && Number(val) <= (priceRange[1] === '' ? 1000 : Number(priceRange[1])))) {
                          setPriceRange([val, priceRange[1]]);
                        }
                      }}
                      min={0}
                      max={priceRange[1] === '' ? 1000 : Number(priceRange[1])}
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
                      max={1000}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Lista de Serviços */}
        {currentServices.length > 0 ? (
          currentServices.map(service => (
            <Link to={`/servico/${service.id}`} key={service.id} className="flex justify-center">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow max-w-sm w-full">
              <div className="relative">
                <img
                  src={service.imagem_url || '/placeholder.jpg'}
                  alt={service.nome}
                  className="w-full h-36 object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-lg mb-1">{service.nome}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{service.descricao}</p>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg text-blue-600">
                    €{service.preco_por_unidade} {service.tipo === 'Montagem' ? `/ quantidade` : service.tipo === 'Eletricidade' ? `/ hora` : ''}
                  </span>
                </div>
              </div>
            </div>
          </Link>
          ))
        ) : (
          <p>Nenhum serviço encontrado.</p>
        )}


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
