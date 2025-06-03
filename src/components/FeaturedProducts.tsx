import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 
import { FaShoppingCart, FaHeart, FaShareAlt } from 'react-icons/fa';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { toast } from 'react-toastify';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlToCopy, setUrlToCopy] = useState('');

  useEffect(() => {
    fetch(`${process.env.VITE_BACKEND_URL}/products`)  
      .then(response => response.json())
      .then(data => setProducts(data))  
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);

  const limitedProducts = products.slice(0, 8); 

  // Agrupar produtos em grupos de 4 para o desktop
  const chunkedProducts = [];
  for (let i = 0; i < limitedProducts.length; i += 4) {
    chunkedProducts.push(limitedProducts.slice(i, i + 4));
  }
  
  const handleAddToCart = async (product) => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      toast.info(
        <span>
          Por favor, <Link to="/login" className="text-blue-500 underline">faça login</Link> para adicionar produtos ao carrinho.
        </span>
      );
      return;
    }
    try {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        const bodyData = {
            productId: product.id,
            quantidade: 1,
            precoUnitario: product.preco,
        };
        const response = await fetch(`${process.env.VITE_BACKEND_URL}/api/carrinho/add`, {
            method: 'POST',
            headers,
            body: JSON.stringify(bodyData),
        });
        if (response.ok) {
            toast.success('Produto adicionado ao carrinho!');
        } else {
            toast.error(`Erro ao adicionar produto ao carrinho, TENS QUE FAZER LOGIN!`);
        }
    } catch (error) {
        console.error('Erro ao adicionar produto ao carrinho:', error);
        toast.error('Erro ao adicionar produto ao carrinho');
    }
  };

  const handleToggleFavorite = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.info(
        <span>
          Por favor, <Link to="/login" className="text-blue-500 underline">faça login</Link> para adicionar produtos aos favoritos.
        </span>
      );
      return;
    }
    try {
      const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const bodyData = {
        produto_id: product.id,
      };
      const response = await fetch(`${process.env.VITE_BACKEND_URL}/api/favoritos/add`, {
        method: "POST",
        headers,
        body: JSON.stringify(bodyData),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || "Produto adicionado aos favoritos!");
      } else {
        toast("O produto já se encontra adicionado!", {
          icon: "⚠️",
        });
      }
    } catch (error) {
      console.error("Erro ao adicionar/remover favorito:", error);
      toast.error("Erro ao adicionar/remover favorito");
    }
  };

  const handleShareClick = () => {
    setUrlToCopy(window.location.href);
    setIsModalOpen(true);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(urlToCopy)
      .then(() => alert('URL copiado com sucesso!'))
      .catch((error) => alert('Falha ao copiar URL:', error));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="px-6 py-12 relative">


      <h2 className="text-2xl font-bold mb-6">Produtos em Destaque</h2>

      <Link 
        to="/produtos" 
        className="static mt-6 mb-6 md:absolute md:top-6 md:right-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Ver Todos os Produtos
      </Link>


      <Carousel
        showArrows={true}
        showThumbs={false}
        infiniteLoop
        autoPlay
        interval={3000}
        transitionTime={500}
        dynamicHeight={false}
        swipeable={true}
        emulateTouch={true}
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <button
              onClick={onClickHandler}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-blue-500 rounded-full p-2 shadow-lg z-10"
            >
              ‹
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <button
              onClick={onClickHandler}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-blue-500 rounded-full p-2 shadow-lg z-10"
            >
              ›
            </button>
          )
        }
      >
        {chunkedProducts.map((chunk, index) => (
          <div 
            key={index} 
            className="flex space-x-4 overflow-x-auto"
          >
            {chunk.map((product) => (
              <div 
                key={product.id} 
                className="relative bg-white p-4 rounded-lg shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0"
              >
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute top-2 right-2 flex space-x-2 z-20">
                    <button className="text-gray-500 hover:text-red-500" onClick={() => handleToggleFavorite(product)}>
                      <FaHeart size={20} />
                    </button>
                    <button 
                      className="text-gray-500 hover:text-blue-500" 
                      onClick={handleShareClick}
                    >
                      <FaShareAlt size={20} />
                    </button>
                  </div>

                  <Link 
                    to={`/produto/${product.id}`} 
                    className="block"
                  >
                    <img
                      src={product.imagem_url}
                      alt={product.nome}
                      className="w-[300px] h-[300px] object-cover rounded-lg mx-auto"
                    />

                    <h3 className="mt-4 text-lg font-semibold">{product.nome}</h3>

                    <p className="text-gray-500 text-sm mt-1 truncate w-full">
                      {product.descricao}
                    </p>

                    <div className="flex flex-col items-center mt-2">
                      <div className="flex items-center space-x-2">
                        <p className="text-blue-600 font-semibold text-lg">€{product.preco}</p>
                        {product.old_price && (
                          <p className="text-sm text-gray-400 line-through">€{product.old_price}</p>
                        )}
                      </div>
                    </div>
                  </Link>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full"
                  >
                    <FaShoppingCart className="mr-2" /> Adicionar ao Carrinho
                  </button>
                </motion.div>
              </div>
            ))}
          </div>
        ))}
      </Carousel>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Compartilhar no WhatsApp</h3>
            <div className="flex items-center mb-4">
              <input
                type="text"
                value={urlToCopy}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={handleCopyUrl}
                className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Copiar URL
              </button>
            </div>
            <a 
              href={`https://wa.me/?text=${encodeURIComponent(urlToCopy)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 w-full"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6 mr-2" />
              Compartilhar no WhatsApp
            </a>
            <button 
              onClick={closeModal}
              className="mt-4 text-gray-500 hover:text-gray-700 w-full"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
