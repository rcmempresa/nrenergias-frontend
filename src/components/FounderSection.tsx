import React, { useEffect, useState, useRef } from 'react';

const FounderSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image */}
          <div 
            className={`lg:w-1/2 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-64 h-64 bg-blue-100 rounded-lg"></div>
              <img 
                src="/nuno.jpeg" 
                alt="Nuno Robinson, fundador da NREnergias" 
                className="rounded-lg shadow-xl relative z-10 w-full h-auto object-cover"
              />
              <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-blue-500 rounded-lg"></div>
            </div>
          </div>
          
          {/* Text Content */}
          <div 
            className={`lg:w-1/2 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">O Nosso Fundador</h2>
            <div className="w-20 h-1 bg-blue-600 mb-6"></div>
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Nuno Robinson</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Nascido e criado no Porto Santo, Nuno Robinson sempre teve uma paixão por tecnologia e 
              uma visão inovadora. Com formação em Engenharia Eletrotécnica e vasta experiência no setor, 
              decidiu fundar a NREnergias em 2010, com o objetivo de fornecer produtos de qualidade e 
              serviços especializados à sua ilha natal e além.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              "Acredito que a tecnologia deve ser acessível a todos e que a inovação é a chave para 
              um futuro mais sustentável. Na NREnergias, estamos comprometidos em oferecer soluções 
              que melhoram a vida das pessoas e contribuem para um mundo mais eficiente."
            </p>
            <p className="italic text-gray-700">— Nuno Robinson, Fundador e CEO</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;