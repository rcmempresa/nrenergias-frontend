import React from 'react';
import { FaHeadset, FaShieldAlt, FaBoxOpen, FaRegHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';


const Hero = () => {
  return (
    <div 
      className="relative bg-cover text-center py-20 "
      style={{ backgroundImage: 'url(/nrenergias_loja.jpeg)', backgroundPosition: 'center 30%' }}
    >
    
      {/* Hero Section com animação */}
      <motion.h1
      className="mt-4 text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      Produtos Eletrónicos de {' '}
            <TypeAnimation
              sequence={[
                'QUALIDADE',
                2000,
                'CONFIANÇA',
                2000,
                'PONTA',
                2000,
              ]}
              wrapper="span"
              speed={50}
              className="bg-white text-blue-600 px-2 rounded"
              repeat={Infinity}
            />
    </motion.h1>

      <motion.p
        className="text-xl text-white mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Compre com confiança e aproveite os melhores serviços!
      </motion.p>
     

      <Link to="/produtos">
        <motion.button
          className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Comprar Agora
        </motion.button>
      </Link>


      {/* Suporte Icons com animação 
      <div className="flex justify-center gap-10 mt-12 flex-wrap">
        <motion.div
          className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-36"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <FaHeadset size={50} className="text-blue-600" />
          <p className="mt-4 text-sm text-gray-700">Suporte 24/7</p>
        </motion.div>
        <motion.div
          className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-36"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <FaShieldAlt size={50} className="text-blue-600" />
          <p className="mt-4 text-sm text-gray-700">Segurança</p>
        </motion.div>
        <motion.div
          className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-36"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <FaBoxOpen size={50} className="text-blue-600" />
          <p className="mt-4 text-sm text-gray-700">Montagem</p>
        </motion.div>
        <motion.div
          className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-36"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <FaRegHandshake size={50} className="text-blue-600" />
          <p className="mt-4 text-sm text-gray-700">Transparência</p>
        </motion.div>
      </div>
      */}
    </div>
  );
};

export default Hero;
