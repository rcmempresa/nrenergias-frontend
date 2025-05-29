import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import logo from '/logo.png'; // ajusta o caminho se necessário

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row">
      {/* Esquerda: Logo + Redes sociais */}
      <div className="bg-white text-gray-800 w-full md:w-1/3 p-6 flex flex-col justify-between">
        <div>
          <img src={logo} alt="Logotipo" className="w-36 mb-3" />
          <p className="text-sm text-gray-600">
            A tua loja de confiança em produtos eletrónicos.
          </p>
        </div>

        <div className="mt-6 flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-blue-700 hover:text-blue-900">
            <FaFacebookF size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-blue-700 hover:text-blue-900">
            <FaInstagram size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-blue-700 hover:text-blue-900">
            <FaLinkedinIn size={20} />
          </a>
        </div>
      </div>

      {/* Direita: Menus e Créditos */}
      <div className="bg-blue-600 text-white w-full md:w-2/3 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        
        {/* Empresa */}
        <div>
          <h3 className="text-md font-semibold mb-3">Empresa</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/sobre-nos" className="hover:underline">Sobre Nós</Link></li>
            <li><Link to="/contacto" className="hover:underline">Contactos</Link></li>
          </ul>
        </div>

        {/* Produtos */}
        <div>
          <h3 className="text-md font-semibold mb-3">Produtos</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/produtos?categoria=smartphones" className="hover:underline">Smartphones</Link></li>
            <li><Link to="/produtos?categoria=laptops" className="hover:underline">Laptops</Link></li>
            <li><Link to="/produtos?categoria=acessorios" className="hover:underline">Acessórios</Link></li>
            <li><Link to="/produtos" className="hover:underline">Ver Todos</Link></li>
          </ul>
        </div>

        {/* Políticas */}
        <div>
          <h3 className="text-md font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/politica-de-privacidade" className="hover:underline">Política de Privacidade</Link></li>
            <li><Link to="/termos-e-condicoes" className="hover:underline">Termos e Condições</Link></li>
          </ul>
        </div>

        {/* Créditos */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-md font-semibold mb-3">Desenvolvido por</h3>
            <a
              href="https://1way.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 text-xl font-semibold"
            >
              1way.pt
            </a>
          </div>
          <div className="mt-6 text-xs text-gray-200">
            &copy; {new Date().getFullYear()} Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
