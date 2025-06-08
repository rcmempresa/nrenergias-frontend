import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermosPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">Termos e Condições</h1>
              <p className="text-blue-100">Última atualização: 8 de Junho de 2025</p>
            </div>
            
            <div className="p-8">
              <div className="prose prose-lg max-w-none">
                <p>
                  Bem-vindo aos Termos e Condições da nrenergias. Ao aceder e utilizar os nossos serviços, concorda com estes termos. Por favor, leia-os atentamente.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">1. Aceitação dos Termos</h2>
                <p>
                  Ao aceder ou utilizar os serviços da nrenergias, incluindo o nosso website, aplicações, APIs, e quaisquer outros serviços oferecidos (coletivamente, os "Serviços"), concorda em ficar vinculado a estes Termos e Condições ("Termos"). Se não concordar com estes Termos, não deverá aceder ou utilizar os nossos Serviços.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">2. Descrição dos Serviços</h2>
                <p>
                  A nrenergias fornece soluções de automação e integração para empresas, incluindo mas não limitado a:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Plataformas personalizadas para agendamentos</li>
                  <li>Integrações de e-commerce e pagamentos</li>
                  <li>Automação e conexão de sistemas</li>
                  <li>Plataformas de e-commerce personalizadas</li>
                </ul>
                <p>
                  Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer aspeto dos Serviços a qualquer momento, incluindo a disponibilidade de qualquer funcionalidade, base de dados ou conteúdo.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">3. Registo e Contas</h2>
                <p>
                  Para utilizar determinados Serviços, poderá ser necessário criar uma conta. Ao registar-se, concorda em fornecer informações precisas, atuais e completas. É responsável por manter a confidencialidade da sua palavra-passe e por todas as atividades que ocorram na sua conta.
                </p>
                <p>
                  Deverá notificar-nos imediatamente de qualquer utilização não autorizada da sua conta ou de qualquer outra violação de segurança. A nrenergias não será responsável por quaisquer perdas resultantes da utilização não autorizada da sua conta.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">4. Pagamentos e Faturação</h2>
                <p>
                  Alguns dos nossos Serviços são oferecidos mediante pagamento. Ao subscrever um Serviço pago, concorda em pagar todas as taxas aplicáveis conforme indicado no momento da compra. As taxas são não reembolsáveis, exceto quando exigido por lei ou conforme especificado nos nossos termos de reembolso.
                </p>
                <p>
                  Reservamo-nos o direito de alterar os nossos preços mediante aviso prévio. Se não concordar com uma alteração de preço, tem o direito de rejeitar a alteração cancelando o Serviço aplicável antes que a alteração de preço entre em vigor.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">5. Propriedade Intelectual</h2>
                <p>
                  Os Serviços e todo o conteúdo, características e funcionalidades, incluindo mas não limitado a todo o texto, gráficos, logótipos, ícones e imagens, bem como a sua seleção e disposição, são propriedade da nrenergias, dos seus licenciadores ou outros fornecedores e estão protegidos por leis de direitos de autor, marcas registadas, patentes, segredos comerciais e outras leis de propriedade intelectual.
                </p>
                <p>
                  É-lhe concedida uma licença limitada, não exclusiva e não transferível para aceder e utilizar os Serviços para fins comerciais internos, sujeita a estes Termos.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">6. Conteúdo do Utilizador</h2>
                <p>
                  Ao submeter, publicar ou exibir conteúdo nos Serviços ("Conteúdo do Utilizador"), concede à nrenergias uma licença mundial, não exclusiva, isenta de royalties para utilizar, reproduzir, adaptar, publicar, traduzir e distribuir o seu Conteúdo do Utilizador em qualquer meio existente ou futuro.
                </p>
                <p>
                  Declara e garante que: (i) possui ou controla todos os direitos sobre o Conteúdo do Utilizador que publica; (ii) o Conteúdo do Utilizador é preciso e não enganoso; e (iii) a utilização e publicação do Conteúdo do Utilizador não viola estes Termos ou quaisquer leis aplicáveis.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">7. Conduta Proibida</h2>
                <p>
                  Ao utilizar os Serviços, concorda em não:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Violar quaisquer leis, regulamentos ou direitos de terceiros</li>
                  <li>Utilizar os Serviços para qualquer finalidade ilegal ou não autorizada</li>
                  <li>Transmitir vírus, worms, ou qualquer código de natureza destrutiva</li>
                  <li>Interferir ou interromper a integridade ou o desempenho dos Serviços</li>
                  <li>Tentar obter acesso não autorizado aos Serviços ou sistemas relacionados</li>
                  <li>Recolher ou armazenar informações pessoais de outros utilizadores</li>
                </ul>

                <h2 className="text-xl font-semibold mt-8 mb-4">8. Limitação de Responsabilidade</h2>
                <p>
                  Em nenhuma circunstância a nrenergias, os seus diretores, funcionários, parceiros, agentes, fornecedores ou afiliados serão responsáveis por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo sem limitação, perda de lucros, dados, uso, boa vontade, ou outras perdas intangíveis, resultantes de:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>O seu acesso ou utilização ou incapacidade de aceder ou utilizar os Serviços</li>
                  <li>Qualquer conduta ou conteúdo de terceiros nos Serviços</li>
                  <li>Conteúdo obtido dos Serviços</li>
                  <li>Acesso não autorizado, uso ou alteração das suas transmissões ou conteúdo</li>
                </ul>

                <h2 className="text-xl font-semibold mt-8 mb-4">9. Indemnização</h2>
                <p>
                  Concorda em defender, indemnizar e isentar a nrenergias, os seus diretores, funcionários, parceiros, agentes, contratados, licenciadores, fornecedores de serviços e subcontratados de e contra quaisquer reclamações, responsabilidades, danos, julgamentos, prémios, perdas, custos, despesas ou honorários (incluindo honorários razoáveis de advogados) resultantes da sua violação destes Termos ou do seu uso dos Serviços.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">10. Rescisão</h2>
                <p>
                  Podemos terminar ou suspender o seu acesso aos Serviços imediatamente, sem aviso prévio ou responsabilidade, por qualquer motivo, incluindo, sem limitação, se violar estes Termos. Após a rescisão, o seu direito de utilizar os Serviços cessará imediatamente.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">11. Lei Aplicável</h2>
                <p>
                  Estes Termos serão regidos e interpretados de acordo com as leis de Portugal, sem consideração aos seus princípios de conflito de leis.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">12. Alterações aos Termos</h2>
                <p>
                  Reservamo-nos o direito, a nosso critério exclusivo, de modificar ou substituir estes Termos a qualquer momento. Se uma revisão for material, tentaremos fornecer um aviso com pelo menos 30 dias de antecedência antes que quaisquer novos termos entrem em vigor.
                </p>
                <p>
                  Ao continuar a aceder ou utilizar os nossos Serviços após essas revisões se tornarem efetivas, concorda em ficar vinculado aos termos revistos. Se não concordar com os novos termos, deixe de utilizar os Serviços.
                </p>

                <h2 className="text-xl font-semibold mt-8 mb-4">13. Contacto</h2>
                <p>
                  Se tiver alguma dúvida sobre estes Termos, por favor contacte-nos em:
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

export default TermosPage;
