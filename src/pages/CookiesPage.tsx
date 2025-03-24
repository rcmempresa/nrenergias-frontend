import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CookiesPage = () => {
  const navigate = useNavigate();

  return (
    <>
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
              <h1 className="text-3xl font-bold mb-2">Política de Cookies</h1>
              <p className="text-blue-100">
                Última atualização: 1 de Junho de 2025
              </p>
            </div>
            
            {/* Content */}
            <div className="p-8">
              <div className="prose prose-lg max-w-none">
                <p>
                  Esta Política de Cookies explica como a 1way utiliza cookies e tecnologias semelhantes para reconhecê-lo quando visita o nosso website. Explica o que são estas tecnologias e porque as utilizamos, bem como os seus direitos para controlar o nosso uso delas.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">1. O que são Cookies?</h2>
                <p>
                  Cookies são pequenos ficheiros de dados que são colocados no seu dispositivo quando visita um website. Os cookies são amplamente utilizados pelos proprietários de websites para fazer com que os seus websites funcionem, ou funcionem de forma mais eficiente, bem como para fornecer informações de relatórios.
                </p>
                <p>
                  Os cookies definidos pelo proprietário do website (neste caso, 1way) são chamados de "cookies primários". Os cookies definidos por partes que não o proprietário do website são chamados de "cookies de terceiros". Os cookies de terceiros permitem que funcionalidades ou características de terceiros sejam fornecidas no ou através do website (por exemplo, publicidade, conteúdo interativo e análises).
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">2. Por que Utilizamos Cookies?</h2>
                <p>
                  Utilizamos cookies primários e de terceiros por vários motivos. Alguns cookies são necessários por razões técnicas para que o nosso website funcione, e referimo-nos a eles como cookies "essenciais" ou "estritamente necessários". Outros cookies também nos permitem rastrear e direcionar os interesses dos nossos utilizadores para melhorar a experiência no nosso website. Terceiros servem cookies através do nosso website para publicidade, análise e outras finalidades.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">3. Tipos de Cookies que Utilizamos</h2>
                <p>
                  Os tipos específicos de cookies primários e de terceiros servidos através do nosso website e as finalidades que cumprem são descritos abaixo:
                </p>

                <h3 className="text-lg font-semibold mt-6 mb-3">3.1. Cookies Essenciais</h3>
                <p>
                  Estes cookies são estritamente necessários para fornecer-lhe serviços disponíveis através do nosso website e para utilizar algumas das suas funcionalidades, como o acesso a áreas seguras.
                </p>
                <table className="min-w-full border border-gray-300 mb-6">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Nome</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Finalidade</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Duração</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">session_id</td>
                      <td className="border border-gray-300 px-4 py-2">Utilizado para manter a sua sessão ativa enquanto navega no website</td>
                      <td className="border border-gray-300 px-4 py-2">Sessão</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">auth_token</td>
                      <td className="border border-gray-300 px-4 py-2">Utilizado para autenticar utilizadores registados</td>
                      <td className="border border-gray-300 px-4 py-2">30 dias</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">csrf_token</td>
                      <td className="border border-gray-300 px-4 py-2">Utilizado para prevenir ataques de falsificação de solicitação entre sites</td>
                      <td className="border border-gray-300 px-4 py-2">Sessão</td>
                    </tr>
                  </tbody>
                </table>

                <h3 className="text-lg font-semibold mt-6 mb-3">3.2. Cookies de Desempenho e Funcionalidade</h3>
                <p>
                  Estes cookies são utilizados para melhorar o desempenho e a funcionalidade do nosso website, mas não são essenciais para o seu uso. No entanto, sem estes cookies, certas funcionalidades podem tornar-se indisponíveis.
                </p>
                <table className="min-w-full border border-gray-300 mb-6">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Nome</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Finalidade</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Duração</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">language</td>
                      <td className="border border-gray-300 px-4 py-2">Lembra as preferências de idioma do utilizador</td>
                      <td className="border border-gray-300 px-4 py-2">1 ano</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">theme</td>
                      <td className="border border-gray-300 px-4 py-2">Lembra as preferências de tema do utilizador (claro/escuro)</td>
                      <td className="border border-gray-300 px-4 py-2">1 ano</td>
                    </tr>
                  </tbody>
                </table>

                <h3 className="text-lg font-semibold mt-6 mb-3">3.3. Cookies Analíticos e de Personalização</h3>
                <p>
                  Estes cookies recolhem informações que são utilizadas para nos ajudar a entender como o nosso website é utilizado ou quão eficazes são as nossas campanhas de marketing, ou para nos ajudar a personalizar o nosso website para si.
                </p>
                <table className="min-w-full border border-gray-300 mb-6">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Nome</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Finalidade</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Duração</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">_ga</td>
                      <td className="border border-gray-300 px-4 py-2">Utilizado pelo Google Analytics para distinguir utilizadores</td>
                      <td className="border border-gray-300 px-4 py-2">2 anos</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">_gid</td>
                      <td className="border border-gray-300 px-4 py-2">Utilizado pelo Google Analytics para distinguir utilizadores</td>
                      <td className="border border-gray-300 px-4 py-2">24 horas</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">_gat</td>
                      <td className="border border-gray-300 px-4 py-2">Utilizado pelo Google Analytics para limitar a taxa de solicitação</td>
                      <td className="border border-gray-300 px-4 py-2">1 minuto</td>
                    </tr>
                  </tbody>
                </table>

                <h3 className="text-lg font-semibold mt-6 mb-3">3.4. Cookies de Marketing</h3>
                <p>
                  Estes cookies são utilizados para rastrear os visitantes em websites. A intenção é exibir anúncios que sejam relevantes e envolventes para o utilizador individual e, portanto, mais valiosos para editores e anunciantes terceiros.
                </p>
                <table className="min-w-full border border-gray-300 mb-6">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Nome</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Finalidade</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Duração</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">_fbp</td>
                      <td className="border border-gray-300 px-4 py-2">Utilizado pelo Facebook para fornecer uma série de produtos publicitários</td>
                      <td className="border border-gray-300 px-4 py-2">3 meses</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">ads/ga-audiences</td>
                      <td className="border border-gray-300 px-4 py-2">Utilizado pelo Google AdWords para reconectar visitantes que provavelmente se converterão em clientes</td>
                      <td className="border border-gray-300 px-4 py-2">Sessão</td>
                    </tr>
                  </tbody>
                </table>

                <h2 className="text-xl font-semibold mt-8 mb-4">4. Como Pode Controlar os Cookies</h2>
                <p>
                  Pode definir ou alterar os controlos do seu navegador web para aceitar ou recusar cookies. Se optar por recusar cookies, ainda poderá utilizar o nosso website, mas o seu acesso a algumas funcionalidades e áreas do nosso website pode ser restrito. Como os meios pelos quais pode recusar cookies através dos controlos do seu navegador web variam de navegador para navegador, deve visitar o menu de ajuda do seu navegador para mais informações.
                </p>
                <p>
                  Além disso, a maioria das redes de publicidade oferece-lhe uma forma de optar por não receber publicidade direcionada. Se gostaria de obter mais informações, por favor visite <a href="http://www.aboutads.info/choices/" className="text-primary-600 hover:underline">http://www.aboutads.info/choices/</a> ou <a href="http://www.youronlinechoices.com" className="text-primary-600 hover:underline">http://www.youronlinechoices.com</a>.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">5. Cookies Servidos no Passado</h2>
                <p>
                  Podemos obter o seu consentimento por escrito para colocar cookies no seu dispositivo utilizando um banner de cookies quando visita o nosso website pela primeira vez. Quando visita o nosso website, pode ver um banner informando-o sobre a nossa utilização de cookies. Ao clicar em "Aceitar" ou continuar a utilizar o website, está a consentir com a nossa utilização de cookies conforme descrito nesta Política de Cookies. Pode retirar o seu consentimento a qualquer momento alterando as suas preferências de cookies.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">6. Alterações a Esta Política de Cookies</h2>
                <p>
                  Podemos atualizar esta Política de Cookies de tempos a tempos para refletir, por exemplo, alterações nos cookies que utilizamos ou por outros motivos operacionais, legais ou regulamentares. Por favor, visite esta Política de Cookies regularmente para se manter informado sobre a nossa utilização de cookies e tecnologias relacionadas.
                </p>
                <p>
                  A data no topo desta Política de Cookies indica quando foi atualizada pela última vez.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">7. Contacto</h2>
                <p>
                  Se tiver alguma dúvida sobre a nossa utilização de cookies ou outras tecnologias, por favor contacte-nos em:
                </p>
                <p className="font-medium">
                  Email: geral@1way.pt<br />
                  Telefone: +351 966 545 381<br />
                  Endereço: Madeira, Portugal
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

export default CookiesPage;