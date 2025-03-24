import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  const handleConsultClick = () => {
    // Implement WhatsApp link with structured message
    const whatsappNumber = "351966545381"; // Removed the + sign
    const currentDate = new Date().toLocaleDateString('pt-PT');
    
    const whatsappMessage = 
`Olá equipa 1way! 🚀

Gostaria de solicitar uma *consultoria gratuíta* das vossas soluções de automação.

*Sobre a minha empresa:*
▫️ Nome da empresa: 
▫️ Setor de atividade: 
▫️ Website: 

*Estou interessado(a) em:*
□ Automatizar agendamentos
□ Integrar sistemas de pagamento
□ Conectar diferentes plataformas
□ Otimizar processos internos
□ Outro: 

*Disponibilidade para reunião:*
▫️ Dia(s) preferido(s): 
▫️ Horário preferido: 

Agradeço desde já a vossa atenção e aguardo o vosso contacto para agendar a reunião.

Cumprimentos,
[Seu nome]
Data do pedido: ${currentDate}`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  const benefits = [
    "Consultoria personalizada para o seu negócio",
    "Demonstração prática das soluções",
    "Orçamento detalhado sem compromisso",
    "Suporte técnico especializado"
  ];

  return (
    <section className="py-20 bg-primary-500 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
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
          className="absolute top-40 -left-20 w-80 h-80 rounded-full bg-sky-500 opacity-10"
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, -10, 0],
            y: [0, 30, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-10 right-1/4 w-40 h-40 rounded-full bg-blue-400 opacity-10"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 40, 0],
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
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            className="lg:w-1/2 mb-10 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Quer transformar o seu negócio com automação inteligente?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Agende uma demonstração gratuita e descubra como as nossas soluções podem otimizar os seus processos e aumentar a sua receita.
            </p>
            
            <motion.ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay:  0.2 + (index * 0.1) }}
                >
                  <CheckCircle2 className="h-6 w-6 text-blue-300 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-blue-100">{benefit}</span>
                </motion.li>
              ))}
            </motion.ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                onClick={handleConsultClick}
                className="bg-white hover:bg-gray-100 text-primary-600 font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Solicite uma demonstração gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-2/5"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-lg"
              whileHover={{ 
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Vagas limitadas este mês!</h3>
              <p className="text-gray-700 mb-6">
                Estamos a aceitar apenas 5 novos projetos para garantir qualidade e atenção personalizada. Garanta a sua vaga agora!
              </p>
              
              <motion.div 
                className="bg-blue-50 p-4 rounded-md mb-6"
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-blue-800 font-medium">
                  "A melhor decisão que tomámos foi implementar a automação. O retorno sobre o investimento foi visível logo no primeiro mês."
                </p>
                <p className="text-blue-600 text-sm mt-2">— Roberto Almeida, Clínica Fisio Saúde</p>
              </motion.div>
              
              <motion.button 
                onClick={handleConsultClick}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Quero garantir a minha vaga
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;