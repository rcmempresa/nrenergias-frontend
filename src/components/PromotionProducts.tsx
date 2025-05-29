import React from 'react';
import { Link } from 'react-router-dom';

const PromotionProducts = () => {
  return (
    <section className="py-12 px-4 bg-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">
              Transporte grátis para todo o lado!
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Especial para pedidos acima de 500,00€ no mundo todo.
              <br />
              Disponível durante maio e junho de 2025.
            </p>
            {/* Envolvendo o botão com Link para navegar até a página do produto */}
            <Link to="/produto/24"> {/* Substitua "1" pelo ID do produto */}
              <button className="mt-4 bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Comprar Agora
              </button>
            </Link>
          </div>
          <img
            src="nexya_9000.webp"
            alt="Ar condicionado"
            className="w-40 h-auto rounded-lg object-cover"
          />
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">
              Oferta Especial Câmara de Vigilância
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Proteja-se a si e á sua casa o mais rápido possível!
            </p>
            {/* Envolvendo o botão com Link para navegar até a página do produto */}
            <Link to="/produto/25"> {/* Substitua "2" pelo ID do produto */}
              <button className="mt-4 bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Comprar Agora
              </button>
            </Link>
          </div>
          <img
            src="ezviz_galeria_1.jpg"
            alt="Smartwatch"
            className="w-40 h-auto rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default PromotionProducts;