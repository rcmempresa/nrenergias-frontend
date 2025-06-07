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
 ;

  // 🚀 Carregar os produtos do carrinho
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = "/login";
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
          window.location.href = "/login";
          return;
        }

        if (!response.ok) {
          throw new Error("Erro ao buscar o carrinho");
        }

        const data = await response.json();
        setCartItems(data.items); // Define os itens do carrinho
        setCartId(data.cart_id);  // Guarda o cart_id
      } catch (error) {
        console.error("Erro ao carregar o carrinho:", error);
      }
    };

    fetchCartItems();    
  }, []);

  // 🛒 Atualiza o preço total sempre que os itens mudam
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + parseFloat(item.preco_total), 0);
    setTotalPrice(total);
  }, [cartItems]);

  // ➖ Remover item do carrinho
  const handleRemoveItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/carrinho/remover/${productId}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      const result = await response.json();

      if (response.ok) {
        setCartItems(cartItems.filter(item => item.product_id !== productId));
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Erro ao remover o item:", error);
      toast.error('Erro ao remover o item do carrinho');
    }
  };

  // ➕ Aumentar quantidade
  const handleIncreaseQuantity = async (id, isProduct) => {
  if (!cartId) return;
  try {
    const token = localStorage.getItem('token');
    if (!token) return;

    // Monta o body dinamicamente conforme o tipo
    const body = isProduct 
      ? { cartId, productId: id } 
      : { cartId, serviceId: id };

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/carrinho/aumentar`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const updatedItem = await response.json();

    if (response.ok) {
      setCartItems(cartItems.map(item => {
        const itemId = item.product_id ?? item.service_id;
        if (itemId === id) {
          return { ...item, quantidade: updatedItem.quantidade, preco_total: updatedItem.preco_total };
        }
        return item;
      }));
    } else {
      toast.error(updatedItem.message);
    }
  } catch (error) {
    console.error("Erro ao aumentar quantidade:", error);
  }
};

  
  const handleDecreaseQuantity = async (productId) => {
    if (!cartId) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
  
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/carrinho/diminuir`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ cartId, productId })
      });
  
      const updatedItem = await response.json();
  
      if (response.ok) {
        setCartItems(cartItems.map(item => 
          item.product_id === productId 
            ? { ...item, quantidade: updatedItem.quantidade, preco_total: updatedItem.preco_total } 
            : item
        ));
      } else {
        toast.error(updatedItem.message);
      }
    } catch (error) {
      console.error("Erro ao diminuir quantidade:", error);
    }
  };

  
  const handleGoToCheckout = () => {
    // 1. Verificar se o carrinho está vazio
    if (cartItems.length === 0) {
      toast.info("Seu carrinho está vazio! Adicione produtos antes de continuar.");
      return; // Não permite seguir para o checkout
    }

    
  
    // 3. Caso a validação passe, redireciona para a página de checkout
    navigate('/checkout', { state: { cartItems, totalPrice } }); 
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Helmet>
        <title>Carrinho | NRenergias</title>
        <meta name="description" content="Entre em contacto com a NRenergias — estamos disponíveis para esclarecer dúvidas, fornecer orçamentos e ajudar na escolha dos melhores produtos eletrónicos e soluções sustentáveis. Atendimento em todo o país." />
        <meta name="keywords" content="carrinho NRenergias, finalização de compra, checkout, produtos eletrónicos, soluções sustentáveis, energia solar, pagamento seguro, Portugal"/>
        <link rel="canonical" href="https://nrenergias.pt/contacto" />
      </Helmet>
      <Header />
      <div className=" mt-60 container mx-auto p-8 bg-white rounded-lg shadow-md mt-20">
        <h1 className="text-3xl font-bold mb-6">O teu Carrinho</h1>
        
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">O teu carrinho está vazio.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-4">Produto</th>
                  <th className="p-4">Preço</th>
                  <th className="p-4">Quantidade</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Ação</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 flex items-center">
                      <img src={item.imagem_url} alt={item.nome} className="w-16 h-16 mr-4" />
                      <div>
                        <p className="font-semibold">{item.nome}</p>
                      </div>
                    </td>
                    <td className="p-4">{parseFloat(item.preco_unitario).toFixed(2)}€</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <button className="px-3 py-1 border rounded" onClick={() => handleDecreaseQuantity(item.product_id)}>-</button>
                        <input 
                          type="number" 
                          value={item.quantidade} 
                          readOnly
                          className="w-12 mx-2 text-center border rounded" 
                        />
                        <button className="px-3 py-1 border rounded" onClick={() => handleIncreaseQuantity(item.id, isProduct)}>+</button>
                      </div>
                    </td>
                    <td className="p-4 font-semibold">{parseFloat(item.preco_total).toFixed(2)}€</td>
                    <td className="p-4">
                      <button className="text-red-500 hover:underline" onClick={() => handleRemoveItem(item.product_id)}>Remover</button>
                    </td>
                  </tr>
                ))}
                <tr className="border-t bg-blue-300">
                  <td colSpan="3" className="p-4 text-right font-semibold text-white">TOTAL:</td>
                  <td className="p-4 font-semibold text-white bg-blue-500">{totalPrice.toFixed(2)}€</td>
                  <td></td>
                </tr>

              </tbody>
            </table>
          </div>
        )}



          <div className="mt-6 flex justify-between">
            <Link to="/produtos" className="text-blue-600 hover:text-blue-800">Continuar a comprar</Link>
            {cartItems.length > 0 && (
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