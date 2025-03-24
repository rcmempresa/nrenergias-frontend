import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { FaBars } from 'react-icons/fa';

const Header = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <header className="fixed w-full z-50 bg-white shadow-md">
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
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
          <Instagram size={24} className="text-blue-700" />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
          <Facebook size={24} className="text-blue-700" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
          <Twitter size={24} className="text-blue-700" />
        </a>
      </div>
    </div>
  </div>

  {/* Main Navigation */}
  <div className="container mx-auto px-6 py-4 flex justify-between items-center">
    {/* Logo */}
    <div className="flex items-center space-x-1">
      <Link to="/" className="flex items-center space-x-1">
        <img src="/logo.png" alt="Nrenergias" className="h-10" />
        <span className="text-lg font-bold text-blue-700">NRenergias</span>
      </Link>
    </div>

    <div className="container hidden md:block mx-auto px-6 py-4 flex justify-center ml-60">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-200 rounded-full pl-10 pr-4 py-2 text-sm"
            placeholder="Search Products..."
          />
          <span className="absolute left-3 top-2 text-gray-500">🔍</span>
        </div>
      </div>
    {/* Icons */}
    <div className="flex items-center space-x-6">
      <Link to="/carrinho">
        <ShoppingCart size={24} className="text-blue-700" />
      </Link>
      <Link to="/login">
        <User size={24} className="text-blue-700" />
      </Link>
    </div>
  </div>



  {/* Responsive Menu */}
  <div className="bg-blue-700 text-white shadow-lg">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-8">
        <button
          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          className="relative flex items-center space-x-2 hover:text-blue-300"
        >
          <span>TODAS AS CATEGORIAS</span>
          <FaBars className="text-white" />
          
          {/* Dropdown das Categorias */}
          {isCategoriesOpen && (
            <div className="absolute left-0 top-full mt-2 w-48 bg-white text-black shadow-lg rounded-md">
              <ul className="py-2">
                {categories.map((category, index) => (
                  <li key={index} className="px-4 py-2 hover:bg-gray-200">
                    <Link to={`/categoria/${category.toLowerCase()}`}>{category}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </button>
        <Link to="/produtos" className="hover:text-blue-300">PRODUTOS</Link>
      </div>

      <div className="flex space-x-8">
        <Link to="/sobre-nos" className="hover:text-blue-300">SOBRE NÓS</Link>
      </div>
    </div>
  </div>

  {/* Mobile View Adjustments */}
  <div className="md:hidden flex flex-col items-center">

    {/* Search Bar moved below Icons on Mobile */}
    <div className="container mx-auto px-6 py-4 flex justify-center">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-200 rounded-full pl-10 pr-4 py-2 text-sm"
          placeholder="Search Products..."
        />
        <span className="absolute left-3 top-2 text-gray-500">🔍</span>
      </div>
    </div>
  </div>
</header>

  );
};

export default Header;
