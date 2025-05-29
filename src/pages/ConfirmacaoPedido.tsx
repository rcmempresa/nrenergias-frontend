import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const paymentImages = {
  mb: '/multibanco.png',
  paypal: '/paypal.png',
  card: '/card.png',
};


const ConfirmacaoPedido = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pedido = location.state;

  if (!pedido) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center p-8">
          <h1 className="text-2xl font-bold mb-4">Nenhum pedido encontrado</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Voltar ao início
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  const metodo = pedido.method || {};
  const nomeCliente = pedido.nome || 'cliente';
  const valor = parseFloat(pedido.totalPrice) || 0;

  // Seleciona a imagem para o método atual, se existir
  const paymentImage = paymentImages[metodo.type];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-8 bg-white rounded-lg shadow-md mt-24 mb-24">
        <h1 className="text-3xl font-bold mb-6 text-green-700 mb-6 mt-20">Pedido Confirmado!</h1>

        <p className="mb-4">Obrigado pelo seu pedido, {nomeCliente}.</p>

        {/* Imagem do método de pagamento, se existir */}
        {paymentImage && (
          <div className="mb-6 flex justify-center">
            <img src={paymentImage} alt={`Método de pagamento: ${metodo.type}`} className="h-20" />
          </div>
        )}

        {/* Dados de Multibanco */}
        {metodo.type === 'mb' && (
          <div className="mb-6 p-4 border border-green-500 rounded bg-green-50">
            <h2 className="text-xl font-semibold mb-2">Detalhes do pagamento Multibanco</h2>
            <p><strong>Entidade:</strong> {metodo.entity}</p>
            <p><strong>Referência:</strong> {metodo.reference}</p>
            <p><strong>Valor:</strong> {valor ? `${valor.toFixed(2)}€` : 'N/A'}</p>
            <p className="mt-2 italic text-sm text-gray-600">
              Por favor, utilize estes dados para efectuar o pagamento num terminal Multibanco.
            </p>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold mb-2">Resumo do Pedido</h2>
          <p><strong>ID do Pedido:</strong> {pedido.id}</p>
          <p><strong>Estado do Pedido:</strong> {metodo.status || 'pendente'}</p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="mt-8 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Voltar à Página Inicial
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default ConfirmacaoPedido;
