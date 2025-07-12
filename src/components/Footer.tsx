import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF } from 'react-icons/fa';
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
          <a href="https://www.facebook.com/profile.php?id=100064182873984" target="_blank" rel="noreferrer" className="text-blue-700 hover:text-blue-900">
            <FaFacebookF size={20} />
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

        {/* Contactos */}
        <div>
          <h3 className="text-md font-semibold mb-3">Contactos</h3>
          <ul className="space-y-1 text-sm">
            <li>Telefone: 291 110 486</li> 
            <li>Email: geral@nrenergias.pt</li>
            <li>Morada: Estrada Padre Silvano Ernesto Jardim, Porto Santo</li>
            <li>Horário: 9h - 18h (dias úteis)</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-md font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacidade" className="hover:underline">Política de Privacidade</Link></li>
            <li><Link to="/termos" className="hover:underline">Termos e Condições</Link></li>
            <li>
              <a
                href="https://www.livroreclamacoes.pt/inicio"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                📖 Livro de Reclamações
              </a>
            </li>
            <li><Link to="/cookies" className="hover:underline">Política de Cookies</Link></li>
          </ul>

          <br />
          <h3 className="text-md font-semibold mb-3">Métodos de Pagamento</h3>
          <div className="mt-4 flex space-x-2">
            <img src="/mbway.png" alt="Mbway" className="h-6" />
            <img src="/multibanco.png" alt="Multibanco" className="h-6" />
            <img src="/cartao.png" alt="Cartão" className="h-6" />
          </div>
        </div>

        {/* Créditos */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-md font-semibold mb-3">Desenvolvido pela</h3>
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
