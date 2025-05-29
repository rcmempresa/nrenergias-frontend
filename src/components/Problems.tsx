import React from 'react';
import { Truck, ShieldCheck, BadgePercent, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Problems = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const problems = [
    {
      icon: <Truck className="h-10 w-10 text-blue-500" />,
      title: "Entregas Rápidas",
      description: "Receba os seus produtos em casa com rapidez e segurança, em todo o país."
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-blue-500" />,
      title: "Garantia de Qualidade",
      description: "Trabalhamos apenas com marcas de confiança e produtos certificados."
    },
    {
      icon: <BadgePercent className="h-10 w-10 text-blue-500" />,
      title: "Promoções Especiais",
      description: "Descontos exclusivos e campanhas semanais para aproveitar o melhor preço."
    },
    {
      icon: <CreditCard className="h-10 w-10 text-blue-500" />,
      title: "Pagamentos Seguros",
      description: "Pague com confiança: aceitamos MB Way, cartão, referência multibanco e mais."
    }
  ];
  

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="problems" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"> Porquê comprar connosco?</h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Somos mais do que uma loja. Oferecemos qualidade, confiança e atendimento de excelência.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {problems.map((problem, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              <motion.div 
                className="mb-4"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {problem.icon}
              </motion.div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{problem.title}</h3>
              <p className="text-sm md:text-base text-gray-700">{problem.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12 md:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
         <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-500">
            A tecnologia que precisa, ao seu alcance.
          </h3>
          <p className="mt-4 text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Descubra uma vasta seleção de eletrodomésticos e gadgets, com entrega rápida e apoio sempre que precisar.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Problems;