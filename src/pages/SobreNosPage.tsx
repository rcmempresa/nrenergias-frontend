// pages/SobreNosPage.jsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  Users, Truck, Star, Globe, Shield, Clock,
  Target, Zap, Sun, MessageCircle, Award, Leaf
} from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import FounderSection from '../components/FounderSection';
import ProductsSection from '../components/ProductsSection';
import ValuesSection from '../components/ValuesSection';
import LocationsSection from '../components/LocationsSection';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 }
  })
};

const SobreNosPage = () => {
  const [productCount, setProductCount] = useState(120);
  const [clientCount, setClientCount] = useState(80);

  useEffect(() => {
    const productInterval = setInterval(() => setProductCount(p => p + 1), 60000);
    const clientInterval = setInterval(() => setClientCount(c => c + 1), 120000);
    return () => {
      clearInterval(productInterval);
      clearInterval(clientInterval);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Sobre a NRenergias | Produtos Eletrónicos em Portugal</title>
        <meta name="description" content="Conheça a história da NRenergias — especialistas em equipamentos eletrónicos e sustentabilidade. Fundada por Nuno Robinson no Porto Santo, com atuação em todo o país." />
        <meta name="keywords" content="produtos eletrónicos, cabos de carregamento, ar condicionado, câmara de vigilância, NRenergias, Porto Santo, painéis solares, sustentabilidade, Portugal" />
        <link rel="canonical" href="https://nrenergias.pt/sobre-nos" />
      </Helmet>

      <Header />

      <main className="max-w-7xl mx-auto px-4 py-20">

        {/* Hero */}
      <section className="text-center my-12 mt-40">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-4xl md:text-5xl font-bold text-blue-900 mb-6"
        >
          Conheça a <span className="text-yellow-500">NRenergias</span>
        </motion.h1>

        <FounderSection />

        <ProductsSection />

      </section>
      <ValuesSection />

    
      
      <LocationsSection />


        {/* Destaques */}
        <section className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { Icon: Sun, title: 'Energia Solar', desc: 'Projetos personalizados com alto rendimento energético.' },
            { Icon: Shield, title: 'Qualidade Garantida', desc: 'Equipamentos certificados com suporte técnico local.' },
            { Icon: Users, title: 'Equipa Especializada', desc: 'Profissionais formados e apaixonados por energia.' }
          ].map(({ Icon, title, desc }, i) => (
            <motion.div
              key={i}
              className="bg-white p-8 rounded-xl shadow-lg text-center"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <Icon className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-700">{desc}</p>
            </motion.div>
          ))}
        </section>

        

        {/* Nossos Números */}
        <section className="text-center mb-20">
          <h2 className="text-3xl font-bold text-blue-900 mb-10">Impacto Real</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white p-8 shadow rounded-xl">
              <h3 className="text-4xl font-bold text-yellow-500">{clientCount}+</h3>
              <p className="text-gray-700 mt-2">Clientes satisfeitos em todo o país</p>
            </div>
            <div className="bg-white p-8 shadow rounded-xl">
              <h3 className="text-4xl font-bold text-yellow-500">{productCount}+</h3>
              <p className="text-gray-700 mt-2">Instalações concluídas com sucesso</p>
            </div>
          </div>
        </section>


        {/* Depoimentos (opcional) */}
        <section className="bg-white shadow rounded-2xl p-10 mb-24">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">O que dizem nossos clientes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Joana Silva",
                text: "A instalação foi rápida, limpa e muito profissional. Estou a economizar na conta de luz todos os meses!",
                icon: MessageCircle
              },
              {
                name: "Carlos Mendes",
                text: "Atendimento excelente e equipamentos de primeira. Recomendo a NRenergias a todos.",
                icon: MessageCircle
              }
            ].map(({ name, text, icon: Icon }, i) => (
              <motion.div key={i} className="p-6 border rounded-lg" custom={i} initial="hidden" animate="visible" variants={fadeUp}>
                <Icon className="w-6 h-6 mb-4 text-yellow-500" />
                <p className="text-gray-700 italic">"{text}"</p>
                <p className="mt-4 font-semibold text-blue-800">— {name}</p>
              </motion.div>
            ))}
            
          </div>
        </section>
        <motion.section className="text-center py-16 bg-blue-800 text-white rounded-2xl" initial="hidden" animate="visible" variants={fadeUp}>
          <h2 className="text-3xl font-bold mb-4">Pronto para transformar sua energia?</h2>
          <p className="text-lg mb-6">Entre em contacto connosco e descubra como a NRenergias pode ajudar você a economizar e proteger o planeta.</p>
          <a href="/contacto" className="inline-block px-8 py-3 bg-white text-blue-800 font-semibold rounded-full hover:bg-gray-100 transition">
            Fale Connosco
          </a>
        </motion.section>
      </main>

      <Footer />
    </>
  );
};

export default SobreNosPage;