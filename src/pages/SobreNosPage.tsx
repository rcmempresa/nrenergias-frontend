import { motion } from 'framer-motion';
import { Users, Target, Award, Briefcase, Clock, MapPin, Mail, Phone, CheckCircle2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';


const SobreNosPage = () => {
  return (
    <>
    <Helmet>
            <title>Sobre Nós | 1way</title>
            <meta name="description" content="Página sobre a empresa, onde começou o interesse por integrações, métodos de pagamento, crm, desenvolviemnto de software e muito mais" />
            <meta name="keywords" content="integração de sistemas, CRM, software personalizado, automação, e-commerce, pagamento" />
            <meta name="robots" content="index, follow" />
          </Helmet>
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section with Logo */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20 relative overflow-hidden">
          {/* Background animated elements */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <motion.div 
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-400 opacity-20"
              animate={{ 
                scale: [1, 1.2, 1],
                x: [0, 20, 0],
                y: [0, -20, 0]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="absolute bottom-10 left-1/4 w-40 h-40 rounded-full bg-sky-500 opacity-10"
              animate={{ 
                scale: [1, 1.3, 1],
                x: [0, -40, 0],
                y: [0, 10, 0]
              }}
              transition={{ 
                duration: 7,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                className="flex justify-center items-center mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-white rounded-full p-6 shadow-xl">
                  <div className="h-24 w-24 bg-primary-500 rounded-md flex items-center justify-center text-white font-bold text-5xl">
                    1
                  </div>
                </div>
                <span className="ml-4 text-5xl font-bold text-white">way</span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Transformamos o seu negócio através da tecnologia
              </motion.h1>
              
              <motion.p 
                className="text-xl text-blue-100 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Somos especialistas em automação e integração de sistemas, ajudando empresas a otimizar processos e aumentar a sua eficiência desde 2020.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <a 
                  href="#contact" 
                  className="bg-white text-primary-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-md transition-colors inline-block"
                >
                  Conheça a Nossa Equipa
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Story with Timeline */}
        <section className="py-16 bg-white">
  <div className="container mx-auto px-4 md:px-6">
    <div className="max-w-4xl mx-auto">
      <motion.h2 
        className="text-3xl font-bold text-gray-900 mb-10 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        A Nossa História
      </motion.h2>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-100"></div>
        
        {/* Timeline items */}
        {[
          {
            year: "2020",
            title: "O Início da Jornada",
            description: "Embora a 1way tenha sido fundada em 2025, o seu fundador já atuava na área de desenvolvimento de software e automação de processos desde 2020, ganhando experiência valiosa em soluções tecnológicas para empresas."
          },
          {
            year: "2021",
            title: "Desenvolvimento de Experiência",
            description: "Durante estes anos, o foco foi trabalhar em diversos projetos de automação e integração, ajudando empresas a otimizar seus processos e melhorar sua eficiência operacional."
          },
          {
            year: "2022",
            title: "Identificação de Oportunidade",
            description: "Com o crescente sucesso de soluções personalizadas para clientes, foi identificado um mercado promissor para criar uma plataforma própria que unisse várias soluções de automação e integração em um único lugar."
          },
          {
            year: "2023/2024",
            title: "Planeamento e Preparação",
            description: "O trabalho se concentrou em planear o lançamento da 1way, desenvolvendo o modelo de negócios e estruturando as integrações que formariam a base da plataforma. A experiência adquirida até então foi fundamental para essa transição."
          },
          {
            year: "2025",
            title: "O Lançamento da 1way",
            description: "Em 2025, a 1way foi oficialmente lançada, oferecendo soluções inovadoras de automação, integração de ferramentas e plataformas para empresas de todos os portes."
          },
        ].map((item, index) => (
          <motion.div 
            key={index}
            className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-10 md:text-right md:ml-auto md:mr-auto md:pl-0' : 'md:pl-10 md:text-left md:ml-auto md:mr-auto md:pr-0'} md:w-1/2 w-full`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeInOut" }}
          >
            <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 border-primary-500 ${index % 2 === 0 ? 'md:rounded-r-lg md:rounded-l-none' : 'md:rounded-l-lg md:rounded-r-none'}`}>
              <div className="absolute top-6 transform -translate-y-1/2 w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold z-10 border-4 border-white">
                {index + 1}
              </div>
              <span className="inline-block bg-primary-100 text-primary-800 text-sm font-semibold px-3 py-1 rounded-full mb-2">
                {item.year}
              </span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>


        {/* Mission, Vision, Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-10 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Quem Somos
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-md relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-bl-full -mr-16 -mt-16 z-0"></div>
                <div className="relative z-10">
                  <div className="bg-primary-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <Target className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">A Nossa Missão</h3>
                  <p className="text-gray-700 mb-4">
                    Transformar a forma como as empresas trabalham, eliminando tarefas manuais e repetitivas através de soluções tecnológicas inovadoras e personalizadas.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Simplificar processos complexos</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Aumentar a produtividade</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Reduzir custos operacionais</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-md relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-bl-full -mr-16 -mt-16 z-0"></div>
                <div className="relative z-10">
                  <div className="bg-primary-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <Users className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">A Nossa Visão</h3>
                  <p className="text-gray-700 mb-4">
                    Ser a principal referência em automação e integração de sistemas em Portugal, reconhecida pela excelência, inovação e impacto positivo nos negócios dos nossos clientes.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Liderança no mercado português</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Expansão internacional</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Inovação constante</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-md relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-bl-full -mr-16 -mt-16 z-0"></div>
                <div className="relative z-10">
                  <div className="bg-primary-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <Award className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Os Nossos Valores</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Excelência em tudo o que fazemos</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Inovação constante</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Compromisso com os resultados</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Transparência e honestidade</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Foco no cliente</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">O Que Fazemos</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Desenvolvemos soluções personalizadas que automatizam processos, conectam sistemas e impulsionam o crescimento do seu negócio.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Briefcase className="h-8 w-8 text-primary-600" />,
                  title: "Plataformas de Agendamento",
                  description: "Sistemas personalizados para salões, clínicas e profissionais autónomos, com confirmações automáticas e lembretes que reduzem faltas.",
                  color: "from-blue-50 to-blue-100"
                },
                {
                  icon: <Clock className="h-8 w-8 text-primary-600" />,
                  title: "Automação de Processos",
                  description: "Eliminamos tarefas manuais e repetitivas, permitindo que a sua equipa se concentre no que realmente importa para o negócio.",
                  color: "from-green-50 to-green-100"
                },
                {
                  icon: <Users className="h-8 w-8 text-primary-600" />,
                  title: "Integração de Sistemas",
                  description: "Conectamos as suas ferramentas existentes, garantindo que a informação flua de forma consistente entre todos os sistemas.",
                  color: "from-purple-50 to-purple-100"
                },
                {
                  icon: <Award className="h-8 w-8 text-primary-600" />,
                  title: "E-commerce e Pagamentos",
                  description: "Soluções completas para vendas online, assinaturas e pagamentos recorrentes, com suporte a múltiplos métodos de pagamento portugueses.",
                  color: "from-red-50 to-red-100"
                },
                {
                  icon: <Target className="h-8 w-8 text-primary-600" />,
                  title: "Consultoria Tecnológica",
                  description: "Ajudamos a identificar oportunidades de melhoria e a implementar as soluções mais adequadas às necessidades do seu negócio.",
                  color: "from-yellow-50 to-yellow-100"
                },
                {
                  icon: <Briefcase className="h-8 w-8 text-primary-600" />,
                  title: "Desenvolvimento à Medida",
                  description: "Criamos soluções personalizadas que se adaptam perfeitamente aos processos e necessidades específicas da sua empresa.",
                  color: "from-indigo-50 to-indigo-100"
                }
              ].map((service, index) => (
                <motion.div 
                  key={index}
                  className={`p-8 rounded-lg bg-gradient-to-br ${service.color}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                >
                  <div className="bg-white p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6 shadow-sm">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-700">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">A Nossa Equipa</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Somos uma equipa multidisciplinar de especialistas apaixonados por tecnologia e inovação.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 justify-center">
            {[
              {
                name: "Rodrigo Miranda",
                role: "CEO & Fundador",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
                bio: "Com mais de 10 anos de experiência em desenvolvimento de software e gestão de projetos tecnológicos.",
                social: {
                  linkedin: "#",
                  twitter: "#"
                }
              },
              {
                name: "Beatriz Robinson",
                role: "Diretora Executiva de Marketing",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
                bio: "Responsável por garantir a excelência na entrega e implementação de todos os projetos.",
                social: {
                  linkedin: "#",
                  twitter: "#"
                }
              }
            ].map((member, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <div className="relative overflow-hidden flex justify-center">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-48 h-48 object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-700">{member.bio}</p>
                  <div className="flex justify-center space-x-3 mt-4">
                    <a href={member.social.linkedin} className="bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-sm transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                    <a href={member.social.twitter} className="bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-sm transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

        {/* Contact */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Entre em Contacto</h2>
                <p className="text-xl text-gray-700">
                  Estamos disponíveis para responder a todas as suas questões e ajudar a encontrar a melhor solução para o seu negócio.
                </p>
              </motion.div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div 
                  className="bg-gray-50 p-6 rounded-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-primary-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto">
                    <MapPin className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Morada</h3>
                  <p className="text-gray-700">
                    Estrada das Eiras, 34<br />
                    9230-118 Santana<br />
                    Madeira,Portugal
                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-50 p-6 rounded-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-primary-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto">
                    <Mail className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-700">
                    <a href="mailto:geral@1way.pt" className="hover:text-primary-600 transition-colors">
                      geral@1way.pt
                    </a>
                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-50 p-6 rounded-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-primary-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto">
                    <Phone className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Telefone</h3>
                  <p className="text-gray-700">
                    <a href="tel:+351966545381" className="hover:text-primary-600 transition-colors">
                      +351 966 545 381
                    </a>
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SobreNosPage;