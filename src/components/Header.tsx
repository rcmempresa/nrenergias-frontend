import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Header = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const categories = [
    'Eletrônicos',
    'Casa e Jardim',
    'Moda',
    'Esportes',
    'Beleza',
    'Livros',
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (searchTerm.length > 0) {
        try {
          const response = await fetch(`${process.env.VITE_BACKEND_URL}/products?search=${searchTerm}`);
          if (!response.ok) {
            throw new Error(`Erro do servidor: ${response.statusText}`);
          }
          const data = await response.json();
          setSearchResults(data);
        } catch (error) {
          console.error("Erro ao buscar produtos:", error.message);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    };    

    const debounceFetch = setTimeout(fetchProducts, 500);
    return () => clearTimeout(debounceFetch);
  }, [searchTerm]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <header className={`fixed w-full z-50 bg-white shadow-md ${isScrolled ? 'shadow-lg' : ''}`}>
      {/* Top Bar */}
      <div className="hidden md:flex justify-between items-center py-2 px-6 text-sm bg-gray-100">
        <div className="flex space-x-4">
          <span>📍 Estrada Padre Ernesto e Jardim Rc 16, 9400-120 Porto Santo</span>
          <span>📞 +(351)291 110 483</span>
        </div>
        <div className="flex space-x-4">
          <select className="bg-transparent border-none outline-none cursor-pointer">
            <option>EUR</option>
          </select>
          <select className="bg-transparent border-none outline-none cursor-pointer">
            <option>Português</option>
          </select>
          <div className="flex space-x-2">
            <a href="https://www.facebook.com/profile.php?id=100064182873984" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <Facebook size={24} className="text-blue-700" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1">
            <img src="/logo.png" alt="Nrenergias" className="h-10" />
            <span className="text-lg font-bold text-blue-700">NRenergias</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-200 rounded-full pl-10 pr-4 py-2 text-sm"
                placeholder="Procurar Produtos..."
              />
              <span className="absolute left-3 top-2 text-gray-500">🔍</span>
              {searchResults.length > 0 && (
                <div className="absolute w-full bg-white shadow-lg rounded-lg mt-2 z-50">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/produto/${product.id}`}
                      className="flex items-center p-3 hover:bg-gray-100"
                    >
                      <img
                        src={product.imagem_url}
                        alt={product.nome}
                        className="h-16 w-16 object-cover rounded-md"
                      />
                      <div className="ml-4">
                        <p className="font-semibold">{product.nome}</p>
                        <p className="text-sm text-gray-600">{product.descricao}</p>
                        <p className="font-semibold text-blue-700">€{product.preco}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/carrinho" className="relative">
              <ShoppingCart size={24} className="text-blue-700" />
            </Link>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Sair
              </button>
            ) : (
              <Link to="/login">
                <User size={24} className="text-blue-700" />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search - Always visible on mobile */}
        {/* Mobile Search - Always visible on mobile */}
      {/* Mobile Search */}
<div className="md:hidden mt-4 px-4">
  <div className="relative">
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full bg-gray-200 rounded-full pl-10 pr-4 py-2 text-sm"
      placeholder="Procurar Produtos..."
    />
    <span className="absolute left-3 top-2 text-gray-500">🔍</span>

    {searchResults.length > 0 && (
      <div className="absolute w-full bg-white shadow-lg rounded-lg mt-2 z-50">
        {searchResults.map((product) => (
          <Link
            key={product.id}
            to={`/produto/${product.id}`}
            className="flex items-center p-3 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)} // para fechar o menu se aberto
          >
            <img
              src={product.imagem_url}
              alt={product.nome}
              className="h-16 w-16 object-cover rounded-md"
            />
            <div className="ml-4">
              <p className="font-semibold">{product.nome}</p>
              <p className="text-sm text-gray-600">{product.descricao}</p>
              <p className="font-semibold text-blue-700">€{product.preco}</p>
            </div>
          </Link>
        ))}
      </div>
    )}
  </div>
</div>

      </div>

      {/* Desktop Navigation Bar */}
      <nav className="hidden md:block bg-blue-700 text-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/produtos" className="hover:text-blue-300">PRODUTOS</Link>
            <Link to="/sobre-nos" className="hover:text-blue-300">SOBRE NÓS</Link>
            <Link to="/contacto" className="hover:text-blue-300">CONTACTOS</Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-2 space-y-4">
              <Link
                to="/produtos"
                className="block py-2 text-blue-700 hover:bg-blue-50 px-4 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                PRODUTOS
              </Link>
              <Link
                to="/sobre-nos"
                className="block py-2 text-blue-700 hover:bg-blue-50 px-4 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                SOBRE NÓS
              </Link>
              <div className="flex items-center justify-between py-2 px-4">
                <Link to="/carrinho" className="text-blue-700" onClick={() => setIsMenuOpen(false)}>
                  <ShoppingCart size={24} />
                </Link>
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                  >
                    Sair
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="text-blue-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={24} />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;