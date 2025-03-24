import React from 'react';
import { Calendar, CreditCard, Link as LinkIcon, CheckCircle2, ShoppingCart, Clock, MessageSquare, ExternalLink } from 'lucide-react';
import { m, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const Solutions = () => {
  const solutions = [
    {
      id: "agendamentos",
      icon: <Calendar className="h-12 w-12 text-primary-500" />,
      title: "Agendamentos",
      description: "Sistemas sob medida para salões, clínicas e profissionais autônomos, com confirmações automáticas e lembretes que reduzem faltas em até 80%.",
      features: [
        "Agendamento online 24/7",
        "Lembretes automáticos via WhatsApp",
        "Painel administrativo intuitivo",
        "Histórico completo de clientes",
        "Aumento da Receita e Eficiência"
      ],
      platforms: [
        {
          name: "Calendly",
          logo: "https://mms.businesswire.com/media/20220302005343/en/1376587/23/Calendly_Primary_Logo_2_%282%29.jpg"
        },
        {
          name: "SimplyBook.me",
          logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMvzmGFU_ZIHdLHcyX2vedJ9D2w4wC2r58nQ&s"
        },
        {
          name: "Acuity Scheduling",
          logo: "https://images.squarespace-cdn.com/content/v1/4f6792f624ac778428aca39d/1556041588038-SX4UNOUXQMAU62POI07J/acuity_blogimage_1.png"
        },
        {
          name:"Fresha",
          logo:"https://www.barberevo.com/wp-content/uploads/2023/07/Barber_UK39_Website_Slider-1-1.jpg"
        },
        {
          name:"OnceHub",
          logo:"https://www.smbguide.com/wp-content/uploads/2023/12/oncehub-review.png"
        },
        {
          name:"Booksy",
          logo:"https://salon-evo.com/wp-content/uploads/2023/02/My-project-1-13.png"
        }
      ],
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      id: "pagamentos",
      icon: <CreditCard className="h-12 w-12 text-primary-500" />,
      title: "Pagamentos",
      description: "Soluções completas para vendas online, assinaturas e pagamentos recorrentes, com suporte a múltiplos métodos de pagamento utilizados em Portugal como Multibanco, MB WAY, cartões e mais.",
      features: [
        "Checkout otimizado para conversão",
        "Assinaturas e pagamentos recorrentes",
        "Integração com métodos de pagamento mais utilizados em Portugal",
        "Relatórios financeiros detalhados",
        "Processamento Rápido e Menos Burocracia",
        "Integração com Sistemas de Gestão e Automação"
      ],
      paymentMethods: [
        {
          name: "Multibanco",
          logo: "https://www.vendus.pt/foto/referencia-multibanco1200-76_og.png"
        },
        {
          name: "MB WAY",
          logo: "https://play-lh.googleusercontent.com/uFiCg8DkG7F2uW4jQSs7PzwZyxuxkyYUEfUAT6ju_qFmvk8WR1z6xG3HKMjWCLm-1rc"
        },
        {
          name: "Cartão de Crédito",
          logo: "https://cdn-icons-png.flaticon.com/512/179/179457.png"
        },
        {
          name: "PayPal",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png"
        },
        {
          name:"Klarna",
          logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Klarna_Payment_Badge.svg/2560px-Klarna_Payment_Badge.svg.png"
        },
        {
          name:"Paysafecard",
          logo:"https://reloadbase.com/wp-content/uploads/2022/04/paysafecard-600x392-1.png?_t=1658923947"
        }
      ],
      bgColor: "from-green-50 to-green-100"
    },
    {
      id: "automacao",
      icon: <LinkIcon className="h-12 w-12 text-primary-500" />,
      title: "CRM",
      description: "Integrações que conectam suas ferramentas existentes, eliminando a inserção manual de dados e garantindo informações consistentes em todos os sistemas.",
      features: [
        "Conexão entre CRMs e ERPs",
        "Automação de WhatsApp Business",
        "Sincronização com planilhas Google",
        "Fluxos de trabalho automatizados",
        "Centralização dos Dados dos Clientes",
        "Gestão de vendas da Equipa"
      ],
      integrations: [
        {
          name: "Zapier",
          logo: "https://gamipress.com/wp-content/uploads/2024/04/zapier-reverse.svg"
        },
        {
          name: "Moloni",
          logo: "https://cdn.cookielaw.org/logos/80df487c-62ab-4978-b310-891309e09de5/be92ee27-6037-411c-aa7c-b1bae1029e4d/0043feb3-8bd6-4c8a-a08e-d22801670b77/logo_moloni_horizontal_cores.png"
        },
        {
          name: "Primavera BSS" ,
          logo: "https://i1.sndcdn.com/avatars-000007412905-xt1nzg-t240x240.jpg"
        },
        {
          name: "Odoo ERP",
          logo: "https://ucarecdn.com/1bf45853-e215-41d8-97fd-c94ee47e5849/-/resize/1050/"
        },
        {
          name: "QuickBooks",
          logo: "https://static.tildacdn.one/tild6633-3230-4131-b365-376665393265/blog_pics16.png"
        },
        {
          name: "Oracle NetSuite",
          logo: "https://i.pcmag.com/imagery/reviews/01k4aU3JRC4dAV4ice3VJcz-9..v1569482560.jpg"
        }
      ],
      bgColor: "from-purple-50 to-purple-100"
    },
    {
      id: "ecommerce",
      icon: <ShoppingCart className="h-12 w-12 text-primary-500" />,
      title: "E-commerce",
      description: "Lojas online completas e personalizadas para seu negócio, com design exclusivo, otimização para SEO e integração com métodos de pagamento portugueses.",
      features: [
        "Design responsivo e personalizado",
        "Integração com métodos de pagamento locais",
        "Gestão de stock automatizada",
        "Relatórios de vendas em tempo real"
      ],
      platforms: [
        {
          name: "WooCommerce",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/WooCommerce_logo.svg/2560px-WooCommerce_logo.svg.png"
        },
        {
          name: "Shopify",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/2560px-Shopify_logo_2018.svg.png"
        },
        {
          name: "Magento",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magento_Logo.svg/2560px-Magento_Logo.svg.png"
        },
        {
          name:"Prestashop",
          logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3wTfKiIF_wsErfjTc6Tz6RyfcNPZflnYVGA&s"
        },
        {
          name:"OpenCart",
          logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU8e0AJez6wOaJtcxs_QatydLqCvk6sboS5g&s"
        },
        {
          name:"Wix",
          logo:"https://cdn-icons-png.flaticon.com/512/5968/5968753.png"
        }
      ],
      bgColor: "from-red-50 to-red-100"
    }
  ];

  return (
    <section id="solutions" className="py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Nossas Soluções Personalizadas</h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
            Desenvolvemos tecnologias sob medida que automatizam processos, conectam sistemas e impulsionam o crescimento do seu negócio.
          </p>
        </motion.div>

        {/* Navegação das seções - Versão melhorada */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {solutions.map((solution, index) => (
            <motion.a
              key={index}
              href={`#${solution.id}`}
              className={`bg-gradient-to-br ${solution.bgColor} hover:shadow-lg border border-white shadow-sm rounded-xl transition-all duration-300 overflow-hidden`}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex flex-col items-center p-4 md:p-5">
                <div className="bg-white rounded-full p-3 shadow-md mb-3">
                  <div className="h-10 w-10 md:h-12 md:w-12">{solution.icon}</div>
                </div>
                <span className="font-medium text-gray-800 text-center">{solution.title}</span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <div className="space-y-20 md:space-y-32">
          {solutions.map((solution, index) => {
            const [ref, inView] = useInView({
              triggerOnce: true,
              threshold: 0.1
            });
            
            return (
              <motion.div 
                key={index} 
                id={solution.id}
                ref={ref}
                className="pt-16 -mt-16" // Para ajustar o scroll com o header fixo
              >
                <motion.div
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {/* Cabeçalho da seção */}
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-4 md:p-6 lg:p-8">
                    <div className="flex items-center">
                      <motion.div
                        className="bg-white rounded-full p-2 md:p-3 mr-3 md:mr-4"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.8 }}
                      >
                        <div className="h-8 w-8 md:h-12 md:w-12">{solution.icon}</div>
                      </motion.div>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">{solution.title}</h3>
                    </div>
                  </div>
                  
                  {/* Conteúdo da seção */}
                  <div className="p-4 md:p-6 lg:p-8">
                    <motion.p 
                      className="text-base md:text-lg text-gray-700 mb-6 md:mb-8"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {solution.description}
                    </motion.p>
                    
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                      <div>
                        <motion.h4 
                          className="text-lg md:text-xl font-semibold mb-4 flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        >
                          <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-green-500 mr-2" />
                          Principais Recursos
                        </motion.h4>
                        
                        <motion.ul 
                          className="space-y-2 md:space-y-3 mb-6"
                          initial={{ opacity: 0 }}
                          animate={inView ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        >
                          {solution.features.map((feature, idx) => (
                            <motion.li 
                              key={idx} 
                              className="flex items-start"
                              initial={{ opacity: 0, x: -10 }}
                              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                              transition={{ duration: 0.3, delay: 0.5 + (idx * 0.1) }}
                            >
                              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-sm md:text-base text-gray-700">{feature}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                        
                        {/* Botões de ação */}
                        <div className="flex flex-col sm:flex-row gap-4">
                          <motion.button
                            className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 md:py-3 px-4 md:px-6 rounded-md transition-colors flex items-center justify-center text-sm md:text-base"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            onClick={() => window.open('https://wa.me/351966545381?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20' + solution.title, '_blank')}
                          >
                            <MessageSquare className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                            Saiba mais 
                          </motion.button>
                          
                          <Link to="/integracoes">
                            <motion.button
                              className="bg-white border border-primary-500 hover:bg-primary-50 text-primary-600 font-medium py-2 md:py-3 px-4 md:px-6 rounded-md transition-colors flex items-center justify-center text-sm md:text-base"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0 }}
                              animate={inView ? { opacity: 1 } : { opacity: 0 }}
                              transition={{ duration: 0.5, delay: 0.8 }}
                            >
                              <ExternalLink className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                              Ver todas as ferramentas
                            </motion.button>
                          </Link>
                        </div>
                      </div>
                      
                      <div>
                        {/* Plataformas de Agendamento */}
                        {solution.platforms && (
                          <motion.div
                            className="bg-gray-50 rounded-lg p-4 md:p-6 mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                          >
                            <h4 className="text-base md:text-lg font-semibold mb-4 flex items-center">
                              {solution.id === "agendamentos" ? (
                                <Clock className="h-4 w-4 md:h-5 md:w-5 mr-2 text-primary-500" />
                              ) : (
                                <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 mr-2 text-primary-500" />
                              )}
                              Plataformas Compatíveis
                            </h4>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                              {solution.platforms.map((platform, idx) => (
                                <motion.div
                                  key={idx}
                                  className="bg-white rounded-lg p-3 md:p-4 shadow-sm flex flex-col items-center text-center"
                                  whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                                >
                                  <img 
                                    src={platform.logo} 
                                    alt={platform.name} 
                                    className="h-8 md:h-12 object-contain mb-2 md:mb-3" 
                                  />
                                  <span className="text-xs md:text-sm font-medium">{platform.name}</span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Métodos de Pagamento */}
                        {solution.paymentMethods && (
                          <motion.div
                            className="bg-gray-50 rounded-lg p-4 md:p-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                          >
                            <h4 className="text-base md:text-lg font-semibold mb-4 flex items-center">
                              <CreditCard className="h-4 w-4 md:h-5 md:w-5 mr-2 text-primary-500" />
                              Métodos de Pagamento 
                            </h4>
                            
                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                              {solution.paymentMethods.map((method, idx) => (
                                <motion.div
                                  key={idx}
                                  className="bg-white rounded-lg p-3 md:p-4 shadow-sm flex flex-col items-center text-center"
                                  whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                                >
                                  <img 
                                    src={method.logo} 
                                    alt={method.name} 
                                    className="h-8 md:h-10 object-contain mb-2 md:mb-3" 
                                    style={{ maxWidth: "100px" }}
                                  />
                                  <span className="text-xs md:text-sm font-medium">{method.name}</span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Integrações */}
                        {solution.integrations && (
                          <motion.div
                            className="bg-gray-50 rounded-lg p-4 md:p-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                          >
                            <h4 className="text-base md:text-lg font-semibold mb-4 flex items-center">
                              <LinkIcon className="h-4 w-4 md:h-5 md:w-5 mr-2 text-primary-500" />
                              Ferramentas de Integração
                            </h4>
                            
                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                              {solution.integrations.map((integration, idx) => (
                                <motion.div
                                  key={idx}
                                  className="bg-white rounded-lg p-3 md:p-4 shadow-sm flex flex-col items-center text-center"
                                  whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                                >
                                  <img 
                                    src={integration.logo} 
                                    alt={integration.name} 
                                    className="h-8 md:h-10 object-contain mb-2 md:mb-3" 
                                    style={{ maxWidth: "100px" }}
                                  />
                                  <span className="text-xs md:text-sm font-medium">{integration.name}</span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Seção de Parceiros */}
        <motion.div 
          className="mt-16 md:mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Nossos Parceiros Tecnológicos</h2>
          
          <div className="bg-gray-50 p-4 md:p-8 rounded-xl">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8 items-center justify-items-center">
              {[
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/2560px-LinkedIn_Logo.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/2560px-Shopify_logo_2018.svg.png",
                "https://cdn.pixabay.com/photo/2013/02/12/09/07/microsoft-80658_1280.png"
              ].map((logo, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center justify-center p-2 md:p-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <img 
                    src={logo} 
                    alt={`Partner ${index + 1}`} 
                    className="h-6 md:h-8 lg:h-10 object-contain grayscale hover:grayscale-0 transition-all" 
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Solutions;