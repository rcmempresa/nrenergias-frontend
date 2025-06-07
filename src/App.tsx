import { Routes, Route } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Páginas públicas
import HomePage from './pages/HomePage';
import OrcamentoPage from './pages/OrcamentoPage';
import TermosPage from './pages/TermosPage';
import PrivacidadePage from './pages/PrivacidadePage';
import CookiesPage from './pages/CookiesPage';
import ContactoPage from './pages/ContactPage';
import DuvidasPage from './pages/DuvidasPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';
import ProdutoDetalhes from './pages/ProdutoDetalhes';
import Checkout from './pages/CheckoutPage';
import SobreNosPage from './pages/SobreNosPage';
import RegisterPage from './pages/RegisterPage';
import ConfirmacaoPedido from './pages/ConfirmacaoPedido';
import ServicesPage from './pages/ServicesPage';


// Admin layout + páginas admin
import { Layout } from './admin/components/layout/Layout';
import { Dashboard } from './admin/pages/Dashboard';
import { Products } from './admin/pages/Products';
import { Orders } from './admin/pages/Orders';
import { Customers } from './admin/pages/Customers';
import { Favorites } from './admin/pages/Favorites';
import { Shipping } from './admin/pages/Shipping';

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
        {/* Rotas públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/carrinho" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/produtos" element={<ProductPage />} />
        <Route path="/produto/:id" element={<ProdutoDetalhes />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orcamento" element={<OrcamentoPage />} />
        <Route path="/termos" element={<TermosPage />} />
        <Route path="/privacidade" element={<PrivacidadePage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/sobre-nos" element={<SobreNosPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/duvidas-frequentes" element={<DuvidasPage />} />
        <Route path="/servicos" element={<ServicesPage />} />
        <Route path="/pedido/confirmacao" element={<ConfirmacaoPedido />}/>

        {/* Rotas admin aninhadas */}
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="shipping" element={<Shipping />} />
        </Route>

      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
