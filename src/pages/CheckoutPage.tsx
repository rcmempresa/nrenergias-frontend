import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [montagem, setMontagem] = useState(false);
  const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 };
  
  // 💰 Aplica taxas adicionais
  let finalPrice = montagem ? totalPrice + 250 : totalPrice;
  const isLowValueOrder = finalPrice < 100;
  if (isLowValueOrder) finalPrice += 5;

  const [address, setAddress] = useState({
    nome: '',
    rua: '',
    cidade: '',
    codigoPostal: '',
    telefone: '',
    email: '',
    nif:'',
  });

  const [paymentMethod, setPaymentMethod] = useState('mbway');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    const { nome, rua, cidade, codigoPostal, telefone, email, nif } = address;

    if (!nome || !rua || !cidade || !codigoPostal || !telefone || !email || !nif) {
      toast.info('Por favor, preencha todos os campos de endereço.');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.info("Precisas de estar logado para finalizar a compra.");
        navigate('/login');
        return;
      }

      // 1️⃣ Cria o pedido na base de dados
      const createOrderResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/add`, {
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
            nif: nif,
            country: "Portugal",
            phone: telefone
          },
          payment: {
            payment_method: paymentMethod
          },
          order: {
            total_amount: finalPrice,
            items: [
              ...cartItems.map(item => ({
                product_id: item.product_id,
                quantity: item.quantidade,
                price: parseFloat(item.preco_unitario),
              })),
              ...(montagem ? [{
                product_id: "montagem",
                quantity: 1,
                price: 250,
              }] : [])
            ]
          }
        })
      });

      const orderResult = await createOrderResponse.json();

      if (!createOrderResponse.ok) {
        toast.error(orderResult.message || "Erro ao criar o pedido.");
        return;
      }

      const orderId = orderResult.order_id;

      // 2️⃣ Cria a referência de pagamento
      if (paymentMethod === 'multibanco' || paymentMethod === 'mbway' || paymentMethod === 'cc') {
        const body = {
          customer: {
            name: nome,
            phone: telefone,
            phone_indicative: "+351",
            email: email,
          },
          value: finalPrice,
          capture: {
            descriptive: `Compra #${orderId} - total de  ${finalPrice.toFixed(2)}€`,
            transaction_key: String(orderId)
          }
        };

        let url = "";
        if (paymentMethod === 'multibanco') {
          url = `${import.meta.env.VITE_BACKEND_URL}/api/referencia/multibanco/create`;
        } else if (paymentMethod === 'mbway') {
          url = `${import.meta.env.VITE_BACKEND_URL}/api/referencia/mbway/create`;
        } else if (paymentMethod === 'cc') {
          url = `${import.meta.env.VITE_BACKEND_URL}/api/referencia/cc/create`;
        }

        const paymentResponse = await fetch(url, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        });

        const paymentResult = await paymentResponse.json();
        console.log(paymentResult);

        if (paymentResponse.ok && paymentResult.status === "ok") {
          navigate("/pedido/confirmacao", {
            state: {
              ...paymentResult,
              finalPrice,
              nome,
              orderId
            },
          });
        } else {
          toast.error(paymentResult.message || `Erro ao criar referência para o método ${paymentMethod}.`);
        }

      } else {
        navigate("/pedido/confirmacao", {
          state: {
            orderId,
            finalPrice,
            nome
          }
        });
      }

    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
      toast.error("Erro ao finalizar o pedido.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Helmet>
        <title>Checkout | NRenergias</title>
        <meta name="description" content="Entre em contacto com a NRenergias — estamos disponíveis para esclarecer dúvidas, fornecer orçamentos e ajudar na escolha dos melhores produtos eletrónicos e soluções sustentáveis. Atendimento em todo o país." />
        <meta name="keywords" content="carrinho NRenergias, finalização de compra, checkout, produtos eletrónicos, soluções sustentáveis, energia solar, pagamento seguro, Portugal"/>
        <link rel="canonical" href="https://nrenergias.pt/contacto" />
      </Helmet>

      <Header />

      <div className="mt-60 container mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Finalizar Compra</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">O teu carrinho está vazio.</p>
        ) : (
          <>
            {/* 🛒 Resumo do carrinho */}
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
                {montagem && (
                  <tr className="bg-blue-100 text-sm text-gray-800">
                    <td className="p-4 text-right" colSpan="2">
                      Montagem do equipamento
                    </td>
                    <td className="p-4 text-right">+250,00€</td>
                  </tr>
                )}
                {isLowValueOrder && (
                  <tr className="bg-yellow-100 text-sm text-gray-800">
                    <td className="p-4 text-right" colSpan="2">
                      Taxa de encomendas inferiores a 100€
                    </td>
                    <td className="p-4 text-right">+5,00€</td>
                  </tr>
                )}
                <tr className="border-t font-bold bg-blue-100">
                  <td className="p-4 text-right" colSpan="2">Total:</td>
                  <td className="p-4 text-right">{finalPrice.toFixed(2)}€</td>
                </tr>
              </tbody>
            </table>

            {/* 🔧 Opção de montagem */}
            <div className="mb-6 flex items-center gap-2 border border-blue-400 rounded-lg p-3 bg-blue-50 shadow-sm">
              <input
                type="checkbox"
                id="montagem"
                checked={montagem}
                onChange={() => setMontagem(!montagem)}
                className="w-4 h-4 accent-blue-500"
              />
              <label htmlFor="montagem" className="text-base font-semibold text-blue-900">
                Quero incluir a montagem do equipamento até 3 metros de tubo de cobre (+250€)
              </label>
            </div>

            {/* 🧾 Formulário de Endereço */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Endereço de Entrega</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="nome" placeholder="Nome completo" value={address.nome} onChange={handleInputChange} className="border p-2 rounded" />
                <input type="email" name="email" placeholder="Email" value={address.email} onChange={handleInputChange} className="border p-2 rounded" />
                <input type="text" name="telefone" placeholder="Telefone" value={address.telefone} onChange={handleInputChange} className="border p-2 rounded" />
                <input type="text" name="rua" placeholder="Rua / Avenida" value={address.rua} onChange={handleInputChange} className="border p-2 rounded" />
                <input type="text" name="cidade" placeholder="Cidade" value={address.cidade} onChange={handleInputChange} className="border p-2 rounded" />
                <input type="text" name="codigoPostal" placeholder="Código Postal" value={address.codigoPostal} onChange={handleInputChange} className="border p-2 rounded" />
                <input type="text" name="nif" placeholder="Número de Contribuinte" value={address.nif} onChange={handleInputChange} className="border p-2 rounded" />
              </div>
            </div>

            {/* 💳 Método de Pagamento */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Método de Pagamento</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <label className="flex flex-col items-center space-y-2">
                  <input
                    type="radio"
                    name="payment"
                    value="mbway"
                    checked={paymentMethod === 'mbway'}
                    onChange={() => setPaymentMethod('mbway')}
                  />
                  <span>MBWay</span>
                  <img src="mbway.png" alt="MBWay" className="w-32 h-auto mt-2" />
                </label>

                <label className="flex flex-col items-center space-y-4">
                  <input
                    type="radio"
                    name="payment"
                    value="multibanco"
                    checked={paymentMethod === 'multibanco'}
                    onChange={() => setPaymentMethod('multibanco')}
                  />
                  <span>Multibanco</span>
                  <img src="multibanco.png" alt="Multibanco" className="w-48 h-auto mt-2" />
                </label>

                <label className="flex flex-col items-center space-y-4">
                  <input
                    type="radio"
                    name="payment"
                    value="cc"
                    checked={paymentMethod === 'cc'}
                    onChange={() => setPaymentMethod('cc')}
                  />
                  <span>Cartão de Crédito</span>
                  <img src="cartao.png" alt="Cartão de Crédito" className="w-48 h-auto mt-2" />
                </label>
              </div>
            </div>

            {/* ✅ Confirmar Pedido */}
            <div className="text-right">
              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className={`bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'A processar...' : 'Confirmar Pedido'}
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
