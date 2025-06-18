import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users, Package, CreditCard, Heart, MapPin, ChevronDown, ChevronUp, Menu, X } from 'lucide-react';

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

function NavItem({ to, icon, label, onClick }: NavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => `
        flex items-center gap-3 px-4 py-3 rounded-md transition-colors
        ${isActive 
          ? 'bg-blue-50 text-blue-700 font-medium' 
          : 'text-gray-700 hover:bg-gray-100'
        }
      `}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}

export function Sidebar({ isMobile, isOpen, onToggle }: SidebarProps) {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const handleToggleProducts = () => setIsProductsOpen(!isProductsOpen);
  
  const handleMobileItemClick = () => {
    if (isMobile) {
      onToggle();
    }
  };

  if (isMobile && !isOpen) {
    return (
      <button 
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 bg-white rounded-md shadow-md p-2"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>
    );
  }

  return (
    <aside className={`
      ${isMobile 
        ? 'fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out'
        : 'min-h-screen w-64 border-r border-gray-200 bg-white'
      }
      ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}
    `}>
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-700">Painel de Controlo</h1>
        {isMobile && (
          <button 
            onClick={onToggle}
            className="p-1 rounded-md hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        )}
      </div>
      
      <nav className="py-4 px-3">
        <div className="space-y-1">
          <NavItem 
            to="/admin" 
            icon={<LayoutDashboard size={20} />} 
            label="Início" 
            onClick={handleMobileItemClick}
          />
          
          <div>
            <button 
              onClick={handleToggleProducts}
              className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl"><Package size={20} /></span>
                <span>Produtos</span>
              </div>
              {isProductsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {isProductsOpen && (
              <div className="pl-10 pr-4 py-1 space-y-1">
                <NavLink 
                  to="/admin/products" 
                  onClick={handleMobileItemClick}
                  className={({ isActive }) => `
                    block py-2 px-3 rounded-md transition-colors
                    ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}
                  `}
                >
                  Todos os Produtos
                </NavLink>
              </div>
            )}
          </div>
          
          <NavItem 
            to="/admin/orders" 
            icon={<ShoppingBag size={20} />} 
            label="Encomendas" 
            onClick={handleMobileItemClick}
          />
          <NavItem 
            to="/admin/customers" 
            icon={<Users size={20} />} 
            label="Clientes" 
            onClick={handleMobileItemClick}
          />
          <NavItem 
            to="/admin/transactions" 
            icon={<CreditCard size={20} />} 
            label="Transações" 
            onClick={handleMobileItemClick}
          />
          <NavItem 
            to="/admin/favorites" 
            icon={<Heart size={20} />} 
            label="Favoritos" 
            onClick={handleMobileItemClick}
          />
          <NavItem 
            to="/admin/shipping" 
            icon={<MapPin size={20} />} 
            label="Shipping" 
            onClick={handleMobileItemClick}
          />
        </div>
      </nav>
    </aside>
  );
}