import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom'; 
import { Heart, Share2, CreditCard, Smartphone, Banknote } from "lucide-react";
import { HomeIcon } from "@heroicons/react/24/outline";
import { toast } from 'react-toastify';

const ProdutoDetalhes = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [produtosRelacionados, setProdutosRelacionados] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [timeLeft, setTimeLeft] = useState(3600); 
  const [urlToCopy, setUrlToCopy] = useState('');

  const produto_avaliacao = {
    descricao_completa: "Descrição completa do produto aqui...",
    avaliacoes: [
      {
        nome_cliente: "Joana Lopes",
        nota: 5,
        comentario: "Produto incrível! Superou todas as minhas expectativas. Com certeza vou comprar novamente!"
      },
      {
        nome_cliente: "André Pinto",
        nota: 5,
        comentario: "Excelente qualidade e desempenho. Recomendo muito!Obrigado á NRenergias, muito atenciosos na montagem!"
      },
      {
        nome_cliente: "Maria Silva",
        nota: 5,
        comentario: "Perfeito! Amei a compra. Produto de altíssima qualidade, vale cada cêntimo!Obrigado ao Nuno!"
      }
    ]
  };
  
  


  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduto(data))
      .catch((error) => console.error("Erro ao carregar produto:", error));

    // Carregar produtos relacionados (exemplo de produtos da mesma categoria)
    fetch(`http://localhost:3000/products?categoria=${produto?.categoria}`)
      .then((response) => response.json())
      .then((data) => setProdutosRelacionados(data))
      .catch((error) => console.error("Erro ao carregar produtos relacionados:", error));
  }, [id, produto?.categoria]); // Recarregar quando o produto ou sua categoria mudar

  useEffect(() => {
    // Função para reduzir o tempo a cada segundo
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!produto) {
    return <div className="text-center mt-10">Carregando...</div>;
  }

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem('token'); 

    if (!token) {
        alert('Token não encontrado, você precisa fazer login!');
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

        const response = await fetch('http://localhost:3000/api/carrinho/add', {
            method: 'POST',
            headers,
            body: JSON.stringify(bodyData),
        });

        if (response.ok) {
            toast.success('Produto adicionado ao carrinho!');
        } else {
            toast.error(`Erro ao adicionar produto ao carrinho, tens que fazer LOGIN!`);
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
            alert(data.message || "Produto adicionado aos favoritos!");
        } else {
            alert(`O produto já se encontra adicionado!`);
        }
    } catch (error) {
        console.error("Erro ao adicionar/remover favorito:", error);
        alert("Erro ao adicionar/remover favorito");
    }
};

  

  // Função para formatar preço
  const formatPreco = (preco) => {
    return (parseFloat(preco) || 0).toFixed(2);
  };

  // Função para formatar tempo
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
    <>
      <Header />
      <div className="container mx-auto px-4 py-10">
        <nav className="text-base text-gray-600 mb-6 mt-40" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-blue-600 hover:underline font-medium">
                <HomeIcon className="w-5 h-5 mr-2" />
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/produtos" className="text-blue-600 hover:underline font-medium">
                Produtos
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-semibold">
              {produto.nome}
            </li>
          </ol>
        </nav>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          {/* Imagem principal do produto */}
          <div className="flex justify-center">
            <img
              src={produto.imagem_url}
              alt={produto.nome}
              className="w-50 h-50 object-cover rounded-lg shadow-lg" 
            />
          </div>

          {/* Detalhes do produto */}
          <div>
            <h1 className="text-3xl font-bold">{produto.nome}</h1>
            <p className="text-gray-500 mt-2">{produto.descricao}</p>

            <div className="mt-4">
              <span className="text-2xl font-semibold text-red-500">
                €{formatPreco(produto.preco)}
              </span>
              {produto.preco_original && (
                <span className="text-gray-500 line-through ml-3">
                  €{formatPreco(produto.preco_original)}
                </span>
              )}
            </div>

            <div className="mt-6">
              <h3 className="font-semibold">Categoria:</h3>
              <p className="text-gray-600">{produto.categoria}</p>
            </div>

            <div className="mt-6">
              <button
                onClick={() => handleAddToCart(produto)}
                className="bg-red-500 text-white px-6 py-3 rounded-lg shadow hover:bg-red-600 transition"
              >
                Comprar Agora
              </button>
            </div>

            {/* Timer e Métodos de Pagamento */}
            <div className="mt-10 p-6 border rounded-xl shadow-lg space-y-6 bg-white">
              {/* Timer */}
              <div className="text-center">
                <p className="text-sm text-gray-500">Compra até o cronómetro chegar ao fim e não percas esta oportunidade!</p>
                <p className="text-3xl font-bold text-red-600">{formatTime(timeLeft)}</p>
              </div>

              {/* Explicações dos métodos */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CreditCard className="text-blue-500 mt-1" />
                  <p className="text-sm text-gray-700">
                    Pague com <strong>cartão de crédito ou débito</strong> com segurança.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Smartphone className="text-green-500 mt-1" />
                  <p className="text-sm text-gray-700">
                    Use <strong>MB WAY</strong> e conclua o pagamento rapidamente.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Banknote className="text-purple-500 mt-1" />
                  <p className="text-sm text-gray-700">
                    Também disponível pagamento por <strong>referência Multibanco</strong>.
                  </p>
                </div>
              </div>

              {/* Ícones dos métodos aceites */}
              <div className="flex items-center justify-center gap-6 border-t pt-4">
                <img src="/mbway.png" alt="MB WAY" className="h-6" />
                <img src="/multibanco.png" alt="Multibanco" className="h-6" />
                <img src="/cartao.png" alt="Visa / Cartão de Crédito" className="h-6" />
              </div>

              {/* Botões de ação */}
              <div className="flex justify-between pt-2">
                <button className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-gray-100 transition" onClick={handleShareClick}>
                  <Share2 size={16} /> Partilhar
                </button>
                <button
                  onClick={() => handleToggleFavorite(produto)}
                  className="text-red-500 hover:text-red-600 transition ml-4"
                  title="Adicionar aos Favoritos"
                >
                  <Heart />
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* Galeria de fotos do produto */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Galeria de Fotos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {produto.imagens && produto.imagens.map((imgUrl, index) => (
              <div key={index} className="flex justify-center">
                <img
                  src={imgUrl}
                  alt={`Imagem ${index + 1}`}
                  className="w-full max-w-xs rounded-lg shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>
        

        {/* Descrição e Avaliação */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Descrição Completa</h2>
          <p className="text-gray-600 mt-4">{produto.descricao_completa}</p>

          {/* Características do produto */}
          {produto.caracteristicas && produto.caracteristicas.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold">Características do Produto</h3>
              <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                {produto.caracteristicas.map((caracteristica, index) => (
                  <li key={index}>{caracteristica}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6">
            <h3 className="font-semibold">Avaliações</h3>
            <div className="mt-2">
              {produto_avaliacao.avaliacoes && produto_avaliacao.avaliacoes.length > 0 ? (
                produto_avaliacao.avaliacoes.map((avaliacao, index) => (
                  <div key={index} className="border-b py-4">
                    <div className="flex items-center">
                      <span className="font-semibold">{avaliacao.nome_cliente}</span>
                      <span className="text-yellow-500 ml-2">
                        {"★".repeat(avaliacao.nota)}{"☆".repeat(5 - avaliacao.nota)}
                      </span>
                    </div>
                    <p className="text-gray-600">{avaliacao.comentario}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">Ainda não há avaliações para este produto.</p>
              )}
            </div>
          </div>
        </div>



        {/* Produtos Relacionados */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Produtos Relacionados</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
            {produtosRelacionados.slice(0, 5).map((produtoRelacionado) => (
              <Link 
                key={produtoRelacionado.id} 
                to={`/produto/${produtoRelacionado.id}`} // Definindo a URL para a página de detalhes do produto
                className="border p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <img
                  src={produtoRelacionado.imagem_url}
                  alt={produtoRelacionado.nome}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="text-lg font-semibold mt-2">{produtoRelacionado.nome}</h3>
                <p className="text-gray-500 mt-2">{produtoRelacionado.descricao}</p>
                <div className="mt-3">
                  <span className="text-red-500">€{formatPreco(produtoRelacionado.preco)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
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
      <Footer />
    </>
  );
};

export default ProdutoDetalhes;
