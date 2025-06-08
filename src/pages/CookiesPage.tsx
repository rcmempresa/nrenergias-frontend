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
          {/* Botão voltar */}
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
            {/* Cabeçalho */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">Política de Cookies</h1>
              <p className="text-blue-100">
                Última atualização: 1 de Junho de 2025
              </p>
            </div>

            {/* Conteúdo */}
            <div className="p-8">
              <div className="prose prose-lg max-w-none">
                <p>
                  Esta Política de Cookies explica como a <strong>1way</strong> utiliza cookies e tecnologias semelhantes para melhorar a sua experiência enquanto navega no nosso website. Aqui poderá encontrar detalhes sobre os tipos de cookies, as suas finalidades, e como pode geri-los.
                </p>

                <h2>1. O que são Cookies?</h2>
                <p>
                  Cookies são pequenos ficheiros de texto armazenados no seu dispositivo quando visita um site. Estes ficheiros ajudam-nos a reconhecer o seu navegador, armazenar preferências, medir a eficácia das campanhas e melhorar a navegação no site.
                </p>

                <h2>2. Por que utilizamos Cookies?</h2>
                <p>
                  Utilizamos cookies para garantir o funcionamento correto do nosso site, oferecer funcionalidades adicionais, personalizar conteúdos e anúncios, analisar o tráfego e melhorar a experiência do utilizador.
                </p>

                <h2>3. Tipos de Cookies que Utilizamos</h2>

                <h3>3.1. Cookies Essenciais</h3>
                <p>Necessários para o funcionamento básico do site.</p>
                <table className="min-w-full border border-gray-300 mb-6">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-4 py-2 text-left">Nome</th>
                      <th className="border px-4 py-2 text-left">Finalidade</th>
                      <th className="border px-4 py-2 text-left">Duração</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">session_id</td>
                      <td className="border px-4 py-2">Mantém a sessão do utilizador ativa</td>
                      <td className="border px-4 py-2">Sessão</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">auth_token</td>
                      <td className="border px-4 py-2">Autenticação de utilizadores registados</td>
                      <td className="border px-4 py-2">30 dias</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">csrf_token</td>
                      <td className="border px-4 py-2">Prevenção de ataques CSRF</td>
                      <td className="border px-4 py-2">Sessão</td>
                    </tr>
                  </tbody>
                </table>

                <h3>3.2. Cookies de Funcionalidade</h3>
                <p>Melhoram a funcionalidade, como lembrar preferências.</p>
                <table className="min-w-full border border-gray-300 mb-6">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-4 py-2 text-left">Nome</th>
                      <th className="border px-4 py-2 text-left">Finalidade</th>
                      <th className="border px-4 py-2 text-left">Duração</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">language</td>
                      <td className="border px-4 py-2">Guarda a língua preferida do utilizador</td>
                      <td className="border px-4 py-2">1 ano</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">theme</td>
                      <td className="border px-4 py-2">Preferência de tema claro/escuro</td>
                      <td className="border px-4 py-2">1 ano</td>
                    </tr>
                  </tbody>
                </table>

                <h3>3.3. Cookies Analíticos</h3>
                <p>Ajudam-nos a analisar como o site está a ser utilizado.</p>
                <table className="min-w-full border border-gray-300 mb-6">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-4 py-2 text-left">Nome</th>
                      <th className="border px-4 py-2 text-left">Finalidade</th>
                      <th className="border px-4 py-2 text-left">Duração</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">_ga</td>
                      <td className="border px-4 py-2">Distinção de utilizadores (Google Analytics)</td>
                      <td className="border px-4 py-2">2 anos</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">_gid</td>
                      <td className="border px-4 py-2">Distinção de sessões (Google Analytics)</td>
                      <td className="border px-4 py-2">24 horas</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">_gat</td>
                      <td className="border px-4 py-2">Limita pedidos ao Analytics</td>
                      <td className="border px-4 py-2">1 minuto</td>
                    </tr>
                  </tbody>
                </table>

                <h3>3.4. Cookies de Marketing</h3>
                <p>Personalizam anúncios com base nos seus interesses.</p>
                <table className="min-w-full border border-gray-300 mb-6">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-4 py-2 text-left">Nome</th>
                      <th className="border px-4 py-2 text-left">Finalidade</th>
                      <th className="border px-4 py-2 text-left">Duração</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">_fbp</td>
                      <td className="border px-4 py-2">Publicidade direcionada (Facebook)</td>
                      <td className="border px-4 py-2">3 meses</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">ads/ga-audiences</td>
                      <td className="border px-4 py-2">Remarketing (Google Ads)</td>
                      <td className="border px-4 py-2">Sessão</td>
                    </tr>
                  </tbody>
                </table>

                <h2>4. Como Pode Gerir Cookies?</h2>
                <p>
                  Pode aceitar ou rejeitar cookies diretamente no banner de consentimento ao entrar no nosso website. Também pode alterar as definições do seu navegador para bloquear cookies. Note que a desativação de alguns cookies pode afetar a funcionalidade do site.
                </p>
                <p>
                  Para mais informações sobre como gerir cookies, visite:
                  <a href="https://www.aboutcookies.org/" className="text-primary-600 hover:underline"> aboutcookies.org</a>
                  ou
                  <a href="https://www.youronlinechoices.com/" className="text-primary-600 hover:underline"> youronlinechoices.com</a>.
                </p>

                <h2>5. Alterações a Esta Política</h2>
                <p>
                  Podemos atualizar esta política a qualquer momento. A data no início desta página indica a última modificação.
                </p>

                <h2>6. Contacto</h2>
                <p>
                  Para questões relacionadas com esta política de cookies, pode contactar-nos:
                </p>
                <p className="font-medium">
                  Email: geral@nrenergias.pt<br />
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

export default CookiesPage;
