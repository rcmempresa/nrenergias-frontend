import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';

const DuvidasPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Dúvidas Frequentes | 1way</title>
        <meta name="description" content="Página de dúvidas frequentes sobre integração de sistemas de pagamento, CRM, automação e muito mais na 1way." />
        <meta name="keywords" content="integração de sistemas, CRM, software personalizado, automação, e-commerce, pagamento" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Header />
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <div className="mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>Voltar</span>
            </button>
          </div>

          <motion.div 
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">Dúvidas Frequentes</h1>
              <p className="text-blue-100">
                Última atualização: 2 de Março de 2025
              </p>
            </div>
            
            {/* Content */}
            <div className="p-8">
              <div className="prose prose-lg max-w-none">
                <p>
                  Na 1way, focamo-nos em proporcionar soluções eficientes através do desenvolvimento de software personalizado, integração de sistemas e automação de processos. Abaixo, respondemos a algumas das dúvidas mais comuns relacionadas com as nossas ofertas de soluções em software, métodos de pagamento, CRM, marketing e muito mais.
                </p>

                <article>
                  <h2 className="text-xl font-semibold mt-8 mb-4">
                    1. Porque o desenvolvimento de software para integrações empresariais é essencial para o sucesso dos negócios?
                  </h2>
                  <h3 className="text-lg font-medium text-gray-700 mb-4">
                    Objetivo: Apresentar á sua empresa a importância das integrações modernas.
                  </h3>
                  <p>
                    Definição de integrações de software, o papel crucial que elas desempenham na eficiência dos processos de negócios e como a sua empresa se destaca nesse mercado. Explique como sua plataforma pode conectar e otimizar sistemas de CRM, agendamento, pagamentos, entre outros.
                  </p>
                </article>


                <article>
                  <h2 className="text-xl font-semibold mt-8 mb-4">
                    2. Qual a importância dos métodos de pagamento?
                  </h2>
                  <h3 className="text-lg font-medium text-gray-700 mb-4">
                    Objetivo: Explicar a importância da integração de sistemas de pagamento e como ela melhora a experiência do cliente.
                  </h3>
                  <p>
                  A integração de sistemas de pagamento oferece uma experiência mais fluida para os clientes, permitindo transações rápidas e seguras. Além disso, facilita a gestão financeira do seu negócio ao integrar diretamente os pagamentos aos sistemas de contabilidade e ERP. Sua plataforma pode simplificar esse processo, conectando múltiplos gateways de pagamento para facilitar as transações.
                  </p>
                </article>


                <article>
                  <h2 className="text-xl font-semibold mt-8 mb-4">
                    3. Como integrar o seu CRM com outros sistema pode melhorar a gestão de clientes e aumentar a eficiência?
                  </h2>
                  <h3 className="text-lg font-medium text-gray-700 mb-4">
                    Objetivo: Explicar a importância da integração de sistemas de pagamento e como ela melhora a experiência do cliente.
                  </h3>
                  <p>
                  A integração de sistemas de pagamento oferece uma experiência mais fluida para os clientes, permitindo transações rápidas e seguras. Além disso, facilita a gestão financeira do seu negócio ao integrar diretamente os pagamentos aos sistemas de contabilidade e ERP. Sua plataforma pode simplificar esse processo, conectando múltiplos gateways de pagamento para facilitar as transações.
                  </p>
                </article>


                <article>
                  <h2 className="text-xl font-semibold mt-8 mb-4">
                    3. Como integrar o seu CRM com outros sistema pode melhorar a gestão de clientes e aumentar a eficiência?
                  </h2>
                  <h3 className="text-lg font-medium text-gray-700 mb-4">
                    Objetivo: Explicar a importância da integração de sistemas de pagamento e como ela melhora a experiência do cliente.
                  </h3>
                  <p>
                  A integração de sistemas de pagamento oferece uma experiência mais fluida para os clientes, permitindo transações rápidas e seguras. Além disso, facilita a gestão financeira do seu negócio ao integrar diretamente os pagamentos aos sistemas de contabilidade e ERP. Sua plataforma pode simplificar esse processo, conectando múltiplos gateways de pagamento para facilitar as transações.
                  </p>
                </article>

                

                <article>
                  <h2 className="text-xl font-semibold mt-8 mb-4">
                    4. Como integrar sistemas de e-commerce com métodos de pagamento pode impulsionar as suas vendas?
                  </h2>
                  <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Objetivo: Falar sobre como os e-commerce podem se beneficiar da integração de sistemas de pagamento eficientes
                  </h3>
                  <p>
                  Integrar plataformas de e-commerce com sistemas de pagamento, como PayPal, Stripe e outros, facilita a experiência do cliente e aumenta a conversão de vendas. Oferecer múltiplas opções de pagamento pode aumentar as vendas, além de permitir a gestão de transações de forma eficiente. Sua plataforma ajuda a integrar essas soluções, proporcionando uma experiência de compra mais fluida.
                  </p>
                </article>


                <article>
                  <h2 className="text-xl font-semibold mt-8 mb-4">
                    5. Como Integrar Ferramentas de Marketing ao Seu CRM Pode Impulsionar o Crescimento do Seu Negócio?
                  </h2>
                  <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Objetivo: Mostrar como integrar ferramentas de CRM e marketing pode acelerar o crescimento de uma empresa.
                  </h3>        
                  <p>
                  A integração entre CRM e ferramentas de marketing, como HubSpot ou Mailchimp, permite uma comunicação mais eficaz com os clientes e otimiza campanhas de marketing. Isso melhora a segmentação e a personalização, resultando em campanhas mais eficazes e melhores resultados de vendas. Sua plataforma facilita essa integração, garantindo que as equipes de marketing e vendas trabalhem de maneira mais integrada e eficiente.
                  </p>
                </article>

                <article>
                  <h2 className="text-xl font-semibold mt-8 mb-4">
                    6. Quais soluções de marketing podemos automatizar?
                  </h2>
                  <p>
                    Automatizamos diversas tarefas de marketing, como campanhas de e-mail, segmentação de clientes, criação de relatórios de desempenho e muito mais. Utilizamos plataformas como Mailchimp e ActiveCampaign para ajudar a maximizar a eficiência das suas campanhas.
                  </p>
                </article>

                <article>
                  <h2 className="text-xl font-semibold mt-8 mb-4">
                    7. Como funciona o desenvolvimento de software sob medida?
                  </h2>
                  <p>
                    Oferecemos desenvolvimento de software personalizado para resolver as necessidades específicas do seu negócio. Se você precisa de uma plataforma de e-commerce, uma solução de agendamento, ou uma ferramenta interna, nossa equipe de desenvolvedores cria soluções sob medida para você.
                  </p>
                </article>

                <article>
                  <h2 className="text-xl font-semibold mt-8 mb-4">
                    8. Como é feito o gerenciamento de dados e segurança?
                  </h2>
                  <p>
                    Garantimos a segurança dos seus dados com criptografia, autenticação de dois fatores e medidas rigorosas de controle de acesso. Nosso objetivo é garantir que suas informações estejam sempre protegidas contra acessos não autorizados.
                  </p>
                </article>

                <article>
                  <h2 className="text-xl font-semibold mt-8 mb-4">
                    9. Quais são as opções de personalização dos serviços?
                  </h2>
                  <p>
                    Oferecemos pacotes de personalização de acordo com as necessidades do seu negócio. Se você precisar de integrações específicas ou customizações nos processos de pagamento ou CRM, trabalhamos de perto com você para garantir que todas as ferramentas se ajustem perfeitamente ao seu fluxo de trabalho.
                  </p>
                </article>

                <article>
                  <h2 className="text-xl font-semibold mt-8 mb-4">
                    10. Como posso acessar suporte técnico?
                  </h2>
                  <p>
                    Nosso suporte técnico está disponível 24/7. Se você tiver dúvidas ou problemas, pode entrar em contato através de nosso chat online, por e-mail ou por telefone. Estamos sempre prontos para ajudar a resolver qualquer questão.
                  </p>
                </article>

                <article>
                  <h2 className="text-xl font-semibold mt-8 mb-4">
                    11. Quais sistemas de ERP podem ser integrados?
                  </h2>
                  <p>
                    Integramos sistemas de ERP como Odoo, SAP e QuickBooks, permitindo que você gerencie as operações financeiras, estoques e processos internos de forma integrada com o seu e-commerce e CRM.
                  </p>
                </article>

                <article>
                  <h2 className="text-xl font-semibold mt-8 mb-4">
                    12. Como gerenciar as automações?
                  </h2>
                  <p>
                    Com a nossa plataforma, você pode gerenciar todas as automações de negócios diretamente de um painel de controle centralizado. As automações podem ser personalizadas para acionar tarefas específicas, como enviar e-mails ou atualizar registros no CRM quando determinadas condições são atendidas.
                  </p>
                </article>

                <article>
                  <h2 className="text-xl font-semibold mt-8 mb-4">
                    13. Contacto
                  </h2>
                  <p>
                    Se tiver mais dúvidas sobre os nossos serviços ou precisar de uma consulta personalizada, entre em contacto connosco:
                  </p>
                  <p className="font-medium">
                    Email: geral@1way.pt<br />
                    Telefone: +351 966 545 381<br />
                    Endereço: Madeira, Portugal
                  </p>
                </article>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DuvidasPage;
