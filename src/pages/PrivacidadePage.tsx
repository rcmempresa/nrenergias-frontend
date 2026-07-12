import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacidadePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">
          {/* Back button */}
          <div className="mb-10">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded transition-colors cursor-pointer select-none"
              aria-label="Voltar à página anterior"
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
              <h1 className="text-3xl font-bold mb-2">Política de Privacidade</h1>
              <p className="text-blue-100">
                Última atualização: 8 de Junho de 2025
              </p>
            </div>
            
            {/* Content */}
            <div className="p-8">
              <div className="prose prose-lg max-w-none">
                <p>
                  A nrtechsolucion valoriza a sua privacidade e está empenhada em proteger os seus dados pessoais. Esta Política de Privacidade descreve como recolhemos, utilizamos e partilhamos as suas informações quando utiliza os nossos serviços.
                </p>

                <h2>1. Informações que Recolhemos</h2>
                <p>
                  Podemos recolher vários tipos de informações, incluindo:
                </p>
                <ul>
                  <li><strong>Informações de Identificação Pessoal:</strong> Nome, endereço de email, número de telefone, endereço postal, e outras informações semelhantes.</li>
                  <li><strong>Informações de Pagamento:</strong> Detalhes do cartão de crédito, informações bancárias e histórico de transações.</li>
                  <li><strong>Informações de Utilização:</strong> Como interage com os nossos serviços, incluindo páginas visitadas, tempo gasto no site, e outras estatísticas.</li>
                  <li><strong>Informações do Dispositivo:</strong> Tipo de dispositivo, sistema operativo, tipo de navegador, endereço IP, e identificadores únicos do dispositivo.</li>
                  <li><strong>Informações de Localização:</strong> Localização geográfica geral baseada no seu endereço IP ou localização mais precisa se permitido.</li>
                </ul>

                <h2>2. Como Recolhemos Informações</h2>
                <p>
                  Recolhemos informações através de:
                </p>
                <ul>
                  <li><strong>Informações que nos fornece diretamente:</strong> Quando se regista para uma conta, preenche formulários, ou comunica connosco.</li>
                  <li><strong>Utilização automatizada:</strong> Através de cookies, web beacons, e tecnologias semelhantes quando utiliza os nossos serviços.</li>
                  <li><strong>Fontes de terceiros:</strong> Podemos receber informações de parceiros comerciais, fornecedores de serviços, e outras fontes externas.</li>
                </ul>

                <h2>3. Como Utilizamos as Suas Informações</h2>
                <p>
                  Utilizamos as suas informações para:
                </p>
                <ul>
                  <li>Fornecer, manter e melhorar os nossos serviços</li>
                  <li>Processar transações e enviar notificações relacionadas</li>
                  <li>Enviar comunicações de marketing, atualizações e promoções</li>
                  <li>Responder a pedidos, perguntas e fornecer suporte ao cliente</li>
                  <li>Monitorizar e analisar tendências, utilização e atividades</li>
                  <li>Detetar, prevenir e resolver problemas técnicos e de segurança</li>
                  <li>Cumprir obrigações legais e proteger os nossos direitos</li>
                </ul>

                <h2>4. Partilha de Informações</h2>
                <p>
                  Podemos partilhar as suas informações com:
                </p>
                <ul>
                  <li><strong>Fornecedores de Serviços:</strong> Empresas que nos ajudam a fornecer e melhorar os nossos serviços (processamento de pagamentos, análise de dados, entrega de emails, hospedagem, etc.).</li>
                  <li><strong>Parceiros Comerciais:</strong> Empresas com as quais colaboramos para oferecer produtos ou serviços conjuntos.</li>
                  <li><strong>Afiliadas:</strong> Empresas que são propriedade ou controladas pela nrtechsolucion.</li>
                  <li><strong>Conformidade Legal:</strong> Quando acreditamos de boa fé que a divulgação é necessária para cumprir a lei, proteger os nossos direitos, ou proteger a segurança de outros.</li>
                  <li><strong>Transações Comerciais:</strong> Em conexão com uma transação comercial, como uma fusão, aquisição, ou venda de ativos.</li>
                </ul>
                <p>
                  Não vendemos as suas informações pessoais a terceiros.
                </p>

                <h2>5. Segurança de Dados</h2>
                <p>
                  Implementamos medidas de segurança técnicas, administrativas e físicas para proteger as suas informações contra acesso não autorizado, divulgação, alteração e destruição. No entanto, nenhum método de transmissão pela Internet ou método de armazenamento eletrónico é 100% seguro, e não podemos garantir a sua segurança absoluta.
                </p>

                <h2>6. Retenção de Dados</h2>
                <p>
                  Retemos as suas informações pessoais pelo tempo necessário para cumprir as finalidades descritas nesta Política de Privacidade, a menos que um período de retenção mais longo seja exigido ou permitido por lei.
                </p>

                <h2>7. Os Seus Direitos</h2>
                <p>
                  Dependendo da sua localização, pode ter certos direitos em relação às suas informações pessoais, incluindo:
                </p>
                <ul>
                  <li>Aceder às suas informações pessoais</li>
                  <li>Corrigir informações imprecisas ou incompletas</li>
                  <li>Apagar as suas informações pessoais</li>
                  <li>Restringir ou opor-se ao processamento das suas informações</li>
                  <li>Portabilidade de dados</li>
                  <li>Retirar o consentimento a qualquer momento</li>
                  <li>Apresentar uma reclamação a uma autoridade de proteção de dados</li>
                </ul>
                <p>
                  Para exercer estes direitos, por favor contacte-nos utilizando as informações fornecidas abaixo.
                </p>

                <h2>8. Transferências Internacionais de Dados</h2>
                <p>
                  As suas informações podem ser transferidas e processadas em países diferentes daquele em que reside. Estes países podem ter leis de proteção de dados diferentes das do seu país. Tomamos medidas para garantir que as suas informações permanecem protegidas de acordo com esta Política de Privacidade.
                </p>

                <h2>9. Crianças</h2>
                <p>
                  Os nossos serviços não se destinam a crianças com menos de 16 anos, e não recolhemos intencionalmente informações pessoais de crianças com menos de 16 anos. Se souber que uma criança nos forneceu informações pessoais, por favor contacte-nos para que possamos tomar medidas para remover essas informações.
                </p>

                <h2>10. Alterações a Esta Política de Privacidade</h2>
                <p>
                  Podemos atualizar esta Política de Privacidade periodicamente. A versão mais recente estará sempre disponível no nosso website, e notificaremos sobre quaisquer alterações materiais conforme exigido por lei.
                </p>

                <h2>11. Contacto</h2>
                <p>
                  Se tiver alguma dúvida sobre esta Política de Privacidade ou as nossas práticas de privacidade, por favor contacte-nos em:
                </p>
                <p className="font-medium">
                  Email: geral@nrtechsolucion.pt<br />
                  Telefone: +(351)291 110 483<br />
                  Endereço: Estrada Padre Ernesto e Jardim Rc 16, 9400-120 Porto Santo
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacidadePage;
