import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Ana Silva",
      business: "Clínica Estética Beleza Natural",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      quote: "Desde que implementamos o sistema de agendamento online, reduzimos as faltas em 75% e aumentamos nossa receita em 30%. Os clientes adoram a facilidade de marcar horários a qualquer momento.",
      stars: 5
    },
    {
      name: "Carlos Mendes",
      business: "Academia Corpo em Forma",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      quote: "A automação do WhatsApp revolucionou nosso atendimento. Economizamos 20 horas semanais que eram gastas respondendo mensagens repetitivas. Agora focamos no que realmente importa: treinar nossos alunos.",
      stars: 5
    },
    {
      name: "Mariana Costa",
      business: "Boutique Online Mari Fashion",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      quote: "A integração do e-commerce com nosso controle de estoque eliminou vendas de produtos indisponíveis e automatizou todo o processo de pedidos. As vendas cresceram 45% em apenas três meses!",
      stars: 5
    },
    {
      name: "Roberto Almeida",
      business: "Clínica Fisio Saúde",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      quote: "A melhor decisão que tomamos foi implementar a automação. O retorno sobre o investimento foi visível já no primeiro mês. Nossos pacientes estão mais satisfeitos e nossa agenda está sempre cheia.",
      stars: 5
    },
    {
      name: "Juliana Ferreira",
      business: "Salão de Beleza Juliana Hair",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      quote: "Antes perdíamos muitos clientes por não conseguir atender as mensagens rapidamente. Com o sistema de agendamento automático, aumentamos nossa clientela em 40% em apenas dois meses!",
      stars: 5
    }
  ];

  const renderStars = (count: number) => {
    return Array(count).fill(0).map((_, i) => (
      <Star key={i} className="h-4 w-4 md:h-5 md:w-5 text-yellow-500 fill-yellow-500" />
    ));
  };  

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Get visible testimonials (current and next two)
  const visibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const idx = (currentIndex + i) % testimonials.length;
      result.push(testimonials[idx]);
    }
    return result;
  };

  return (
    <section id="testimonials" className="py-16 md:py-20 bg-gradient-to-br from-blue-50 to-sky-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">O que nossos clientes dizem</h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
            Histórias reais de empresas que transformaram seus negócios com nossas soluções personalizadas.
          </p>
        </motion.div>

        {/* Desktop Testimonials */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
            <AnimatePresence mode="wait">
              {visibleTestimonials().map((testimonial, index) => (
                <motion.div 
                  key={`${currentIndex}-${index}`}
                  className="bg-white p-6 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                >
                  <div className="flex items-center mb-4">
                    <motion.img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover mr-4"
                      loading="lazy"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.business}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {renderStars(testimonial.stars)}
                  </div>
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-6 w-6 md:h-8 md:w-8 text-blue-200 opacity-50" />
                    <p className="text-gray-700 italic pl-4 text-sm md:text-base">{testimonial.quote}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <div className="flex justify-center space-x-4 mt-8">
            <motion.button 
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </motion.button>
            <motion.button 
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </motion.button>
          </div>
        </div>

        {/* Mobile Testimonials */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              className="bg-white p-5 rounded-lg shadow-md mb-6"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name} 
                  className="w-12 h-12 rounded-full object-cover mr-3"
                  loading="lazy"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{testimonials[currentIndex].name}</h3>
                  <p className="text-xs text-gray-600">{testimonials[currentIndex].business}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {renderStars(testimonials[currentIndex].stars)}
              </div>
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 h-6 w-6 text-blue-200 opacity-50" />
                <p className="text-gray-700 italic pl-4 text-sm">{testimonials[currentIndex].quote}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center items-center space-x-2">
            <button 
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center">
              {testimonials.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-2 w-2 mx-1 rounded-full ${idx === currentIndex ? 'bg-blue-600' : 'bg-blue-200'}`}
                  onClick={() => setCurrentIndex(idx)}
                ></div>
              ))}
            </div>
            <button 
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <motion.div 
          className="mt-12 md:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Junte-se a mais de 100 empresas que já transformaram seus processos e aumentaram sua eficiência com nossas soluções.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;