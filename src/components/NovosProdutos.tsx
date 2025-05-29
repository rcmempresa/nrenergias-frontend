import { useState, useEffect } from "react";
import { ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'; 


export default function NovosProdutos() {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(5);
  const [startIndex, setStartIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);  // Estado para o modal
  const [urlToCopy, setUrlToCopy] = useState('');  // Estado para o URL

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleNext = () => {
    if (startIndex + visibleProducts < products.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleLoadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 5, products.length));
  };

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem('token'); 

   if (!token) {
         toast.info(
           <span>
             Por favor, <Link to="/login" className="text-blue-500 underline">faça login</Link> para adicionar produtos ao carrinho.
           </span>
         );
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

        const response = await fetch('http://localhost:3000/api/carrinho/add', {
            method: 'POST',
            headers,
            body: JSON.stringify(bodyData),
        });

        if (response.ok) {
            toast.success('Produto adicionado ao carrinho!');
        } else {
            toast.error(`Erro ao adicionar produto ao carrinho: ${response.status}`);
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
    
        const response = await fetch("http://localhost:3000/api/favoritos/add", {
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

     // Função para abrir o modal com o URL atual
  const handleShareClick = () => {
    setUrlToCopy(window.location.href);  // Pega o URL da página atual
    setIsModalOpen(true);  // Abre o modal
  };

  // Função para copiar o URL para a área de transferência
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(urlToCopy)  // Copia o URL para a área de transferência
      .then(() => alert('URL copiado com sucesso!'))
      .catch((error) => alert('Falha ao copiar URL:', error));
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <section className="py-10 px-4 sm:px-10 lg:px-20">
      <h2 className="text-2xl font-bold mb-6 text-center text-black-700">Novos Produtos</h2>

      <div className="relative flex items-center">
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className={`absolute left-0 z-10 p-2 bg-blue-100 rounded-full shadow ${
            startIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-200"
          }`}
        >
          <ChevronLeft size={24} className="text-blue-700" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mx-auto">
          {products.slice(startIndex, startIndex + visibleProducts).map((product, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition relative"
            >
              {product.discount && (
                <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {product.discount}%
                </span>
              )}
              <img
                src={product.imagem_url}
                alt={product.nome}
                className="w-full h-32 object-contain mb-4"
              />
              <p className="text-xs text-gray-500 uppercase">{product.categoria}</p>
              <h3 className="text-sm font-semibold line-clamp-2 text-blue-700">{product.nome}</h3>
              <div className="flex items-center my-2">
                <span className="text-lg font-bold text-blue-600">{product.preco}€</span>
                {product.old_price && (
                  <span className="text-xs text-gray-400 line-through ml-2">
                    {product.old_price} €
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-yellow-500 text-sm">
                {Array.from({ length: product.rating ?? Math.floor(Math.random() * 3) + 3 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
                <span className="text-gray-500 text-xs">
                  ({product.reviews ?? Math.floor(Math.random() * 200 + 10)})
                </span>
              </div>
              <div className="flex space-x-3 mt-3">
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200">
                  <ShoppingCart size={16} />
                </button>
                <button  onClick={() => handleToggleFavorite(product)} className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200">
                  <Heart size={16} />
                </button>
                <button  onClick={handleShareClick} className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={startIndex + visibleProducts >= products.length}
          className={`absolute right-0 z-10 p-2 bg-blue-100 rounded-full shadow ${
            startIndex + visibleProducts >= products.length
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-200"
          }`}
        >
          <ChevronRight size={24} className="text-blue-700" />
        </button>
      </div>

      {visibleProducts < products.length && (
        <div className="text-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
          >
            Carregar Mais
          </button>
        </div>
      )}
      {/* Modal de Compartilhamento */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
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
            {/* Ícone do WhatsApp */}
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
              className="mt-4 text-gray-500 hover:text-gray-700"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
