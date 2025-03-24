import React from 'react';
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Function to smooth scroll to section
  const scrollWithOffset = (el: HTMLElement | null) => {
    if (!el) return;
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };
  

  // Function to scroll to top when navigating to a new page
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <motion.div 
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-500 opacity-20"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-10 w-10 bg-primary-500 rounded-md flex items-center justify-center text-white font-bold text-2xl">1</div>
              </motion.div>
              <span className="ml-1 text-xl font-bold text-white">way</span>
            </div>
            <p className="mb-4">
              Soluções personalizadas de automação e integração para impulsionar o crescimento do seu negócio.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Instagram className="h-5 w-5" />, href: "https://www.instagram.com/1way.pt/" },
                { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/company/1way.pt" }
              ].map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href} 
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2, y: -5 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Soluções</h3>
            <ul className="space-y-2">
              {[
                { name: "Plataformas de Agendamento", href: "/#agendamentos" },
                { name: "E-commerce e Pagamentos", href: "/#pagamentos" },
                { name: "Automação e Integrações", href: "/#automacao" },
                { name: "Plataformas E-commerce", href: "/#ecommerce" }
              ].map((item, index) => (
                <motion.li key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <HashLink 
                    to={item.href} 
                    className="hover:text-white transition-colors"
                    scroll={el => scrollWithOffset(el)}
                  >
                    {item.name}
                  </HashLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              {[
                { text: "Sobre Nós", href: "/sobre-nos" },
                { text: "Integrações", href: "/integracoes" },
                { text: "Orçamento", href: "/orcamento" },
                { text: "Política de Privacidade", href: "/privacidade" }
              ].map((link, index) => (
                <motion.li key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to={link.href} 
                    className="hover:text-white transition-colors"
                    onClick={scrollToTop}
                  >
                    {link.text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Contacto</h3>
            <ul className="space-y-3">
              {[
                { icon: <Phone className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />, text: "+351 966 545 381" },
                { icon: <Mail className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />, text: "geral@1way.pt" },
                { icon: <MapPin className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />, text: "Madeira, Portugal" }
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  whileHover={{ scale: 1.03 }}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-gray-800 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {currentYear} 1way. Todos os direitos reservados.</p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                {[
                  { text: "Termos", href: "/termos" },
                  { text: "Privacidade", href: "/privacidade" },
                  { text: "Cookies", href: "/cookies" }
                ].map((item, index) => (
                  <motion.li key={index}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link 
                      to={item.href} 
                      className="hover:text-white transition-colors"
                      onClick={scrollToTop}
                    >
                      {item.text}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;