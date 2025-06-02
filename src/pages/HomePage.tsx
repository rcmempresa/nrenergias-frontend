import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaWhatsapp, FaFacebookMessenger } from 'react-icons/fa';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import PromotionProducts from '../components/PromotionProducts';
import StatsSection from '../components/StatsSection';
import FeaturesSection from '../components/FeaturesSection';
import NovosProdutos from '../components/NovosProdutos';
import Problems from '../components/Problems';
import FAQSection from '../components/FaqSection';
import Footer from '../components/Footer';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollToId) {
      const targetId = location.state.scrollToId;
      const element = document.getElementById(targetId);
      
      if (element) {
        // Adicionado um pequeno delay para ter a certeza que a página foi carregada
        setTimeout(() => {
          const yOffset = -80; 
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1);
      const element = document.getElementById(targetId);
      
      if (element) {
        setTimeout(() => {
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <>
      <Header />
      <main className="pt-20 overflow-x-hidden">
        <Hero />
        <FeaturedProducts />
        <StatsSection />
        <PromotionProducts />
        <FeaturesSection />
        <NovosProdutos />
        <FAQSection />
        <Problems />
      </main>
      <Footer />
      {/* Ícones de WhatsApp e Messenger */}
    <div className="fixed bottom-4 right-4 flex flex-col space-y-3 z-50">
    <a 
      href="https://wa.me/962515190"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600"
    >
      <FaWhatsapp size={30} />
    </a>
  </div>
    </>
  );
};

export default HomePage;
