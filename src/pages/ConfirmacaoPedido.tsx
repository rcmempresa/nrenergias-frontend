import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';


const paymentImages = {
  mb: '/multibanco.png',
  mbw: '/mbway.png',
  card: '/cartao.png',
};

const ConfirmacaoPedido = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pedido = location.state;

  if (!pedido) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center p-6">
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
  const paymentImage = paymentImages[metodo.type];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
       <Helmet>
        <title>Página de Confirmação | NRenergias</title>
        <meta name="description" content="Entre em contacto com a NRenergias — estamos disponíveis para esclarecer dúvidas, fornecer orçamentos e ajudar na escolha dos melhores produtos eletrónicos e soluções sustentáveis. Atendimento em todo o país." />
        <meta name="keywords" content="carrinho NRenergias, finalização de compra, checkout, produtos eletrónicos, soluções sustentáveis, energia solar, pagamento seguro, Portugal"/>
        <link rel="canonical" href="https://nrenergias.pt/contacto" />
      </Helmet>
      <Header />
      <main className="container mx-auto p-6 sm:p-8 bg-white rounded-lg shadow-md mt-20 mb-24 max-w-md sm:max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-green-700 mt-16 sm:mt-20 text-center sm:text-left">
          Pedido Confirmado!
        </h1>

  <p className="mb-4 text-center sm:text-left">Obrigado pelo seu pedido, {nomeCliente}.</p>

  {/* Mostrar imagem no topo somente se método NÃO for 'mb' */}
  {paymentImage && metodo.type !== 'mb' && (
    <div className="mb-6 flex flex-col items-center">
      <img
        src={paymentImage}
        alt={`Método de pagamento: ${metodo.type}`}
        className="h-16 sm:h-20 mb-4"
      />

      {/* Mensagem específica para MB WAY abaixo da imagem */}
      {metodo.type === 'mbw' && (
        <div className="max-w-md text-center bg-blue-100 border border-blue-400 text-blue-800 px-4 py-3 rounded shadow-md flex items-center gap-2">
          <span role="img" aria-label="info" className="text-xl">ℹ️</span>
          <p className="text-sm font-medium">
            Pedido realizado com sucesso!<br />
            Aguarde a notificação no telemóvel MB WAY para autorizar o pagamento.
          </p>
        </div>
      )}
    </div>
  )}

  {/* Detalhes pagamento Multibanco com imagem de fundo */}
  {metodo.type === 'mb' && (
    <div
      className="mb-6 p-4 sm:p-6 border border-green-500 rounded bg-green-50 relative overflow-hidden"
      style={{
        backgroundImage: `url(${paymentImages.mb})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        backgroundSize: 'contain',
        backgroundColor: '#dcfce7',
      }}
    >
      {/* Overlay branco semitransparente para legibilidade */}
      <div className="absolute inset-0 bg-white opacity-70 pointer-events-none rounded"></div>

      {/* Conteúdo em cima da imagem */}
      <div className="relative z-10 pl-24 sm:pl-80">
        <h2 className="text-xl font-semibold mb-2">Detalhes do pagamento Multibanco</h2>
        <p><strong>Entidade:</strong> {metodo.entity}</p>
        <p><strong>Referência:</strong> {metodo.reference}</p>
        <p><strong>Valor:</strong> {valor ? `${valor.toFixed(2)}€` : 'N/A'}</p>
        <p className="mt-2 italic text-sm text-gray-600">
          Por favor, utilize estes dados para efectuar o pagamento num terminal Multibanco.
        </p>
      </div>
    </div>
  )}

  {metodo.type === 'cc' && (
    <div className="mb-6 flex flex-col items-center">
      <img
        src={paymentImages.card}
        alt="Método de pagamento: cartão de crédito"
        className="h-16 sm:h-20 mb-4"
      />

      <div className="max-w-md text-center bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded shadow-md flex flex-col items-center gap-2">
        <span role="img" aria-label="pending" className="text-3xl">⏳</span>
        <p className="text-sm font-medium mb-2">
          Pagamento por cartão está no estado: <strong>{metodo.status}</strong>.
        </p>
        <p className="text-sm">
          Para completar ou visualizar os detalhes do pagamento,{' '}
          <a
            href={metodo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            clique aqui
          </a>.
        </p>
      </div>
    </div>
  )}

  <div className="p-4 mt-4 border border-green-500 rounded bg-green-50 shadow-sm">
    <h2 className="text-xl font-semibold mb-2 text-green-700 flex items-center justify-center sm:justify-start">
      <svg className="w-5 h-5 mr-2 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-3-3v6m6 6a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Resumo do Pedido
    </h2>
    <p className="mt-2 text-green-800 font-medium text-center sm:text-left">
      Acabámos de enviar todas as informações sobre o seu pagamento diretamente para o seu e-mail! 
      Por favor, verifique a sua caixa de entrada ou a pasta de spam para garantir que não perde nenhum detalhe importante. 
      <span className="block mt-1">Obrigado por escolher a nossa loja – estamos sempre aqui para ajudar!</span>
    </p>
  </div>

  <button
    onClick={() => navigate('/checkout')}
    className="mt-8 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
  >
    Voltar Atrás
  </button>
</main>

      <Footer />
    </div>
  );
};

export default ConfirmacaoPedido;
