import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 };

  const [address, setAddress] = useState({
    nome: '',
    rua: '',
    cidade: '',
    codigoPostal: '',
    telefone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('mbway');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
  const { nome, rua, cidade, codigoPostal, telefone } = address;

  // Validação básica do endereço
  if (!nome || !rua || !cidade || !codigoPostal || !telefone) {
    alert('Por favor, preencha todos os campos de endereço.');
    return;
  }

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Precisas de estar logado para finalizar a compra.");
      navigate('/login');
      return;
    }

    if (paymentMethod === 'multibanco') {
      // Exemplo de dados para enviar para backend Multibanco
      const body = {
        customer: {
          name: nome,
          phone: telefone,
          phone_indicative: "+351", // fixo para PT, ou adaptar
        },
        value: totalPrice,
        capture: {
          descriptive: `Compra na loja, total ${totalPrice.toFixed(2)}€`,
          transaction_key: "chave-transacao-exemplo" // gerar dinamicamente ou remover se não usar
        }
      };

      const response = await fetch("http://localhost:3000/api/referencia/multibanco/create", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const result = await response.json();

      if (response.ok && result.status === "ok") {
        alert(`Pedido realizado com sucesso!\nEntidade: ${result.method.entity}\nReferência: ${result.method.reference}\nValor:${totalPrice.toFixed(2)}€`);
        navigate("/pedido/confirmacao", {
          state: {
            ...result,
            totalPrice,
            nome,
          },
        });
      } else {
        alert(result.message || "Erro ao criar referência Multibanco.");
      }

    } else {
      // Fluxo padrão para outras formas de pagamento
      const response = await fetch("http://localhost:3000/api/checkout/add", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          shipping_details: {
            full_name: nome,
            address: rua,
            city: cidade,
            zip_code: codigoPostal,
            country: "Portugal",  
            phone: telefone
          },
          payment: {
            payment_method: paymentMethod
          },
          order: {
            total_amount: totalPrice
          }
        })
      });

      const result = await response.json();

      if (response.ok) {
        navigate("/pedido/confirmacao", { state: result });
      } else {
        alert(result.message || "Erro ao finalizar o pedido.");
      }
    }

  } catch (error) {
    console.error("Erro ao finalizar pedido:", error);
    alert("Erro ao finalizar o pedido.");
  }
};

  
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="mt-60 container mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Finalizar Compra</h1>

        {/* 🛒 Resumo do carrinho */}
        {cartItems.length === 0 ? (
          <p className="text-gray-500">O teu carrinho está vazio.</p>
        ) : (
          <>
            <table className="w-full mb-6 border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left">Produto</th>
                  <th className="p-4">Qtd</th>
                  <th className="p-4">Preço</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.product_id} className="border-b">
                    <td className="p-4">{item.nome}</td>
                    <td className="p-4 text-center">{item.quantidade}</td>
                    <td className="p-4 text-right">{parseFloat(item.preco_total).toFixed(2)}€</td>
                  </tr>
                ))}
                <tr className="border-t font-bold bg-blue-100">
                  <td className="p-4 text-right" colSpan="2">Total:</td>
                  <td className="p-4 text-right">{totalPrice.toFixed(2)}€</td>
                </tr>
              </tbody>
            </table>

            {/* 🧾 Formulário de Endereço */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Endereço de Entrega</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="nome" placeholder="Nome completo" value={address.nome} onChange={handleInputChange} className="border p-2 rounded" />
                <input type="text" name="telefone" placeholder="Telefone" value={address.telefone} onChange={handleInputChange} className="border p-2 rounded" />
                <input type="text" name="rua" placeholder="Rua / Avenida" value={address.rua} onChange={handleInputChange} className="border p-2 rounded" />
                <input type="text" name="cidade" placeholder="Cidade" value={address.cidade} onChange={handleInputChange} className="border p-2 rounded" />
                <input type="text" name="codigoPostal" placeholder="Código Postal" value={address.codigoPostal} onChange={handleInputChange} className="border p-2 rounded" />
              </div>
            </div>

            {/* 💳 Método de Pagamento */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Método de Pagamento</h2>
              <div className="flex flex-col md:flex-row gap-4">
                {/* MBWay */}
                <label className="flex flex-col items-center space-y-2">
                  <input
                    type="radio"
                    name="payment"
                    value="mbway"
                    checked={paymentMethod === 'mbway'}
                    onChange={() => setPaymentMethod('mbway')}
                  />
                  <span>MBWay</span>
                  {/* Imagem do MBWay */}
                  <img
                    src="mbway.png"
                    alt="MBWay"
                    className="w-32 h-auto mt-2"
                  />
                </label>

                {/* Multibanco */}
                <label className="flex flex-col items-center space-y-4">
                  <input
                    type="radio"
                    name="payment"
                    value="multibanco"
                    checked={paymentMethod === 'multibanco'}
                    onChange={() => setPaymentMethod('multibanco')}
                  />
                  <span >Multibanco</span>
                  {/* Imagem do Multibanco */}
                  <img
                    src="multibanco.png"
                    alt="Multibanco"
                    className="w-48 h-auto mt-2"
                  />
                </label>

                {/* Cartão de Crédito */}
                <label className="flex flex-col items-center space-y-4">
                  <input
                    type="radio"
                    name="payment"
                    value="cartao"
                    checked={paymentMethod === 'cartao'}
                    onChange={() => setPaymentMethod('cartao')}
                  />
                  <span >Cartão de Crédito</span>
                  {/* Imagem do Cartão de Crédito */}
                  <img
                    src="cartao.png"
                    alt="Cartão de Crédito"
                    className="w-48 h-auto mt-2"
                  />
                </label>
              </div>
            </div>


            {/* ✅ Confirmar Pedido */}
            <div className="text-right">
              <button 
                onClick={handlePlaceOrder}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Confirmar Pedido
              </button>
            </div>
          </>
        )}
      </div>
      <div className="mb-48"></div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
