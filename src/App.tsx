import { Routes, Route } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import HomePage from './pages/HomePage';
import IntegracoesPage from './pages/IntegracoesPage';
import OrcamentoPage from './pages/OrcamentoPage';
import TermosPage from './pages/TermosPage';
import PrivacidadePage from './pages/PrivacidadePage';
import CookiesPage from './pages/CookiesPage';
import SobreNosPage from './pages/SobreNosPage';
import ContactPage from './pages/ContactPage';
import DuvidasPage from './pages/DuvidasPage';
import CartPage from './pages/CartPage';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary-500 z-50 origin-left"
        style={{ scaleX }}
      />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/carrinho" element={<CartPage />} />
        <Route path="/integracoes" element={<IntegracoesPage />} />
        <Route path="/orcamento" element={<OrcamentoPage />} />
        <Route path="/termos" element={<TermosPage />} />
        <Route path="/privacidade" element={<PrivacidadePage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/sobre-nos" element={<SobreNosPage />} />
        <Route path="/duvidas-frequentes" element={<DuvidasPage />} />
        <Route path="/contacto" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

export default App;