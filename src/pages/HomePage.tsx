import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
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
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const acceptedUntil = localStorage.getItem('cookiesAcceptedUntil');
    if (!acceptedUntil || new Date() > new Date(acceptedUntil)) {
      setShowCookieBanner(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    const expirationDays = 365;
    const now = new Date();
    const expiration = new Date(now.getTime() + expirationDays * 24 * 60 * 60 * 1000);
    localStorage.setItem('cookiesAcceptedUntil', expiration.toISOString());
    setShowCookieBanner(false);
  };

  useEffect(() => {
    if (location.state && location.state.scrollToId) {
      const targetId = location.state.scrollToId;
      const element = document.getElementById(targetId);
      if (element) {
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

      {/* Ícone WhatsApp */}
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

      {/* Banner de Cookies */}
      {showCookieBanner && (
        <div
          className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-50 shadow-lg"
          role="dialog"
          aria-label="Aviso de Cookies"
        >
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-800 text-sm">
              Utilizamos cookies para melhorar a sua experiência. Consulte a nossa{' '}
              <a href="/cookies" className="text-primary-600 underline hover:text-primary-700">
                Política de Cookies
              </a>.
            </p>
            <button
              onClick={handleAcceptCookies}
              className="mt-2 sm:mt-0 bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition"
            >
              Aceitar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
