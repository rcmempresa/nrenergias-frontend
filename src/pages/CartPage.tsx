import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  // Definir o ID e preço do serviço de montagem (apenas para frontend)
  const MOUNTING_SERVICE_ID = 'frontend-mounting-service'; // ID único para o frontend
  const MOUNTING_SERVICE_PRICE = 250.00;
  const MOUNTING_SERVICE_NAME = "Montagem de Equipamento (até 3m de tubo)";
  const MOUNTING_SERVICE_IMAGE = "montagem_equipamento.webp"; // Exemplo de imagem para o frontend

  // Estado para controlar se a montagem está selecionada
  // Vamos derivar este estado de cartItems, para que seja sempre consistente
  const isMountingSelected = cartItems.some(item => item.service_id === MOUNTING_SERVICE_ID);

  // 🚀 Carregar os produtos do carrinho
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/carrinho/listar`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (response.status === 401) {
          navigate("/login");
          return;
        }

        if (!response.ok) {
          throw new Error("Erro ao buscar o carrinho");
        }

        const data = await response.json();
        console.log("📦 Carrinho:", data.items);
        setCartItems(data.items);
        setCartId(data.cart_id);

      } catch (error) {
        console.error("Erro ao carregar o carrinho:", error);
        toast.error("Erro ao carregar o seu carrinho.");
      }
    };

    fetchCartItems();
  }, [navigate]);

  // 🛒 Atualiza o preço total sempre que os itens mudam
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + parseFloat(item.preco_total), 0);
    setTotalPrice(total);
  }, [cartItems]);

  const handleRemoveItem = async (id, isProduct) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      // Se for o serviço de montagem, apenas o remove do estado local
      if (!isProduct && id === MOUNTING_SERVICE_ID) {
        setCartItems(cartItems.filter(item => item.service_id !== id));
        toast.success("Serviço de montagem removido do carrinho!");
        return; // Não chama o backend
      }

      // Para produtos e outros serviços, chama o backend
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/carrinho/remover/${id}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ isProduct })
      });

      const result = await response.json();

      if (response.ok) {
        setCartItems(cartItems.filter(item =>
          (isProduct ? item.product_id !== id : item.service_id !== id)
        ));
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Erro ao remover o item:", error);
      toast.error('Erro ao remover o item do carrinho');
    }
  };

  // Refatoração para aumentar/diminuir quantidade (NÃO se aplica ao serviço de montagem, pois é sempre 1)
  const updateQuantity = async (id, isProduct, action) => {
    // Não permite alterar a quantidade do serviço de montagem (é sempre 1)
    if (!isProduct && id === MOUNTING_SERVICE_ID) {
        return;
    }

    if (!cartId) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const body = {
        cartId,
        ...(isProduct ? { productId: id } : { serviceId: id })
      };

      const endpoint = action === 'increase' ? 'aumentar' : 'diminuir';
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/carrinho/${endpoint}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const updatedItem = await response.json();

      if (response.ok) {
        setCartItems(cartItems.map(item =>
          (item.product_id === id || item.service_id === id)
            ? { ...item, quantidade: updatedItem.quantidade, preco_total: updatedItem.preco_total }
            : item
        ));
      } else {
        toast.error(updatedItem.message);
      }
    } catch (error) {
      console.error(`Erro ao ${action} quantidade:`, error);
      toast.error(`Erro ao ${action} a quantidade do item`);
    }
  };

  const handleIncreaseQuantity = (id, isProduct) => updateQuantity(id, isProduct, 'increase');
  const handleDecreaseQuantity = (id, isProduct) => updateQuantity(id, isProduct, 'decrease');

  const handleToggleMountingService = () => {
    if (isMountingSelected) {
      // Se estiver selecionado, remover do carrinho (estado local)
      setCartItems(prevItems => prevItems.filter(item => item.service_id !== MOUNTING_SERVICE_ID));
      toast.success("Serviço de montagem removido do carrinho!");
    } else {
      // Se não estiver selecionado, adicionar ao carrinho (estado local)
      const newMountingItem = {
        id: Date.now(), // Um ID único temporário para o frontend
        service_id: MOUNTING_SERVICE_ID,
        nome: MOUNTING_SERVICE_NAME,
        preco_unitario: MOUNTING_SERVICE_PRICE,
        quantidade: 1,
        preco_total: MOUNTING_SERVICE_PRICE,
        imagem_url: MOUNTING_SERVICE_IMAGE
      };
      setCartItems(prevItems => [...prevItems, newMountingItem]);
      toast.success("Serviço de montagem adicionado ao carrinho!");
    }
  };

  const handleGoToCheckout = () => {
    if (cartItems.length === 0) {
      toast.info("Seu carrinho está vazio! Adicione produtos antes de continuar.");
      return;
    }
    // Ao ir para o checkout, cartItems já conterá ou não o serviço de montagem.
    navigate('/checkout', { state: { cartItems, totalPrice } });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Helmet>
        <title>Carrinho | NRenergias</title>
        <meta name="description" content="Entre em contacto com a NRenergias — estamos disponíveis para esclarecer dúvidas, fornecer orçamentos e ajudar na escolha dos melhores produtos eletrónicos e soluções sustentáveis. Atendimento em todo o país." />
        <meta name="keywords" content="carrinho NRenergias, finalização de compra, checkout, produtos eletrónicos, soluções sustentáveis, energia solar, pagamento seguro, Portugal"/>
        <link rel="canonical" href="https://nrenergias.pt/carrinho" />
      </Helmet>
      <Header />
      <div className=" mt-60 container mx-auto p-8 bg-white rounded-lg shadow-md mt-20">
        <h1 className="text-3xl font-bold mb-6">O teu Carrinho</h1>

        {cartItems.length === 0 && !isMountingSelected ? ( // Considera o carrinho vazio se não há itens e nem montagem
          <p className="text-gray-500 text-center">O teu carrinho está vazio.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-4">Produto/Serviço</th>
                  <th className="p-4">Preço</th>
                  <th className="p-4">Quantidade</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Ação</th>
                </tr>
              </thead>
              <tbody>
            {cartItems.map(item => {
              const id = item.product_id ?? item.service_id;
              const isProduct = !!item.product_id;

              return (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 flex items-center">
                    {item.imagem_url && <img src={item.imagem_url} alt={item.nome} className="w-16 h-16 mr-4" />}
                    <div>
                      <p className="font-semibold">{item.nome}</p>
                    </div>
                  </td>
                  <td className="p-4">{parseFloat(item.preco_unitario).toFixed(2)}€</td>
                  <td className="p-4">
                    <div className="flex items-center">
                      {/* Desabilitar botões de quantidade para o serviço de montagem */}
                      <button
                        className="px-3 py-1 border rounded"
                        onClick={() => handleDecreaseQuantity(id, isProduct)}
                        disabled={!isProduct && id === MOUNTING_SERVICE_ID}
                      >-</button>
                      <input
                        type="number"
                        value={item.quantidade}
                        readOnly
                        className="w-12 mx-2 text-center border rounded"
                      />
                      <button
                        className="px-3 py-1 border rounded"
                        onClick={() => handleIncreaseQuantity(id, isProduct)}
                        disabled={!isProduct && id === MOUNTING_SERVICE_ID}
                      >+</button>
                    </div>
                  </td>
                  <td className="p-4 font-semibold">{parseFloat(item.preco_total).toFixed(2)}€</td>
                  <td className="p-4">
                    <button className="text-red-500 hover:underline" onClick={() => handleRemoveItem(id, isProduct)}>Remover</button>
                  </td>
                </tr>
              );
            })}
            <tr className="border-t bg-blue-300">
              <td colSpan="3" className="p-4 text-right font-semibold text-white">TOTAL:</td>
              <td className="p-4 font-semibold text-white bg-blue-500">{totalPrice.toFixed(2)}€</td>
              <td></td>
            </tr>
          </tbody>
            </table>
          </div>
        )}

        {/* Nova seção para a opção de montagem */}
        <div className="mt-8 p-4 border rounded-lg bg-gray-50">
            <label className="flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    checked={isMountingSelected}
                    onChange={handleToggleMountingService}
                />
                <span className="ml-3 text-lg font-medium text-gray-900">
                    Incluir montagem do equipamento até 3 metros de tubo de cobre (+{MOUNTING_SERVICE_PRICE.toFixed(2)}€)
                </span>
            </label>
            <p className="ml-8 text-sm text-gray-600">
                Este serviço inclui a instalação básica e configuração do equipamento.
            </p>
        </div>


          <div className="mt-6 flex justify-between">
            <Link to="/produtos" className="text-blue-600 hover:text-blue-800">Continuar a comprar</Link>
            {(cartItems.length > 0 || isMountingSelected) && ( // Habilita o botão se houver itens ou montagem
              <button
                onClick={handleGoToCheckout}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Fazer o checkout
              </button>
            )}
          </div>
      </div>
      <div className="mb-52"></div>
      <Footer />
    </div>
  );
};

export default CartPage;