import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Adicionando Link para navegação (se estiver usando React Router)
import "react-responsive-carousel/lib/styles/carousel.min.css";

const FeaturedProducts = () => {
  const products = [
    { id: 1, name: 'Produto 1', image: 'ar_condicionado.png', price: '€19,99' },
    { id: 2, name: 'Produto 2', image: 'camara_1.png', price: '€29,99' },
    { id: 3, name: 'Produto 3', image: 'ar_condicionado.png', price: '€39,99' },
    { id: 4, name: 'Produto 4', image: 'camara_1.png', price: '€49,99' },
    { id: 5, name: 'Produto 5', image: 'ar_condicionado.png', price: '€59,99' },
    { id: 6, name: 'Produto 6', image: 'camara_1.png', price: '€69,99' },
    { id: 7, name: 'Produto 7', image: 'ar_condicionado.png', price: '€79,99' },
    { id: 8, name: 'Produto 8', image: 'camara_1.png', price: '€89,99' },
  ];

  // Função para dividir os produtos em grupos de 4
  const chunkedProducts = [];
  for (let i = 0; i < products.length; i += 4) {
    chunkedProducts.push(products.slice(i, i + 4));
  }

  return (
    <section className="px-6 py-12 relative">
      {/* Botão para ver todos os produtos */}
      <Link to="/produtos" className="absolute top-6 right-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Ver Todos os Produtos
      </Link>

      <h2 className="text-2xl font-bold mb-6">Produtos em Destaque</h2>

      <Carousel
        showArrows={true}
        showThumbs={false}
        infiniteLoop
        autoPlay
        interval={3000} // Alterar para o valor que você deseja (em milissegundos)
        transitionTime={500} // Tempo de transição entre os slides
        dynamicHeight={false} // Desativa a altura dinâmica (útil para imagens de tamanhos diferentes)
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              onClick={onClickHandler}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-blue-500 rounded-full p-2 shadow-lg"
            >
              ‹
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              onClick={onClickHandler}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-blue-500 rounded-full p-2 shadow-lg"
            >
              ›
            </button>
          )
        }
      >
        {chunkedProducts.map((chunk, index) => (
          <div key={index} className="flex space-x-4 overflow-x-auto">
            {chunk.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                initial={{ opacity: 0, x: -100 }} // Começa fora da tela à esquerda
                animate={{ opacity: 1, x: 0 }} // Move para a posição final
                exit={{ opacity: 0, x: 100 }} // Sai para a direita
                transition={{ duration: 0.5 }} // Duração da animação
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-[300px] h-[300px] object-cover rounded-lg"
                />
                <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.price}</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Adicionar ao Carrinho
                </button>
              </motion.div>
            ))}
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default FeaturedProducts;
