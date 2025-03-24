import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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

  // Handle scrolling to sections when navigating from other pages
  useEffect(() => {
    // Check if we have a section to scroll to from navigation
    if (location.state && location.state.scrollToId) {
      const targetId = location.state.scrollToId;
      const element = document.getElementById(targetId);
      
      if (element) {
        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
          const yOffset = -80; // Header height offset
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  // Also check for hash in URL directly
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
      <main className="pt-20 ">
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
    </>
  );
};

export default HomePage;
