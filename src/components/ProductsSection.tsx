import React, { useState, useEffect, useRef } from 'react';
import { Wind, Cable, Camera, Lightbulb, BatteryCharging, DoorOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCategory {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ProductsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const productCategories: ProductCategory[] = [
    {
      icon: <Wind size={32} className="text-blue-600" />,
      title: 'Ar Condicionado',
      description: 'Sistemas de climatização eficientes para residências e empresas, incluindo instalação e manutenção.'
    },
    {
      icon: <Cable size={32} className="text-blue-600" />,
      title: 'Cabos de Carregamento',
      description: 'Soluções de carregamento para veículos elétricos, incluindo cabos e acessórios de alta qualidade.'
    },
    {
      icon: <Camera size={32} className="text-blue-600" />,
      title: 'Câmaras de Vigilância',
      description: 'Sistemas de segurança e monitorização para proteção residencial e empresarial.'
    },
    {
      icon: <DoorOpen size={32} className="text-blue-600" />,
      title: 'Automatismos',
      description: 'Painéis e sistemas de controlo para portões e portas de garagem automáticas.'
    },
    {
      icon: <BatteryCharging size={32} className="text-blue-600" />,
      title: 'Energia Renovável',
      description: 'Painéis solares, baterias e soluções para uma energia mais sustentável.'
    },
    {
      icon: <Lightbulb size={32} className="text-blue-600" />,
      title: 'Iluminação',
      description: 'Soluções de iluminação eficientes e modernas para todos os ambientes.'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
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
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Nossos Produtos</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Oferecemos uma ampla gama de produtos eletrónicos e elétricos, 
            combinando qualidade, inovação e as melhores marcas do mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCategories.map((category, index) => (
            <div 
              key={index}
              className={`bg-white rounded-lg shadow-lg p-8 transition-all duration-700 transform hover:scale-105 hover:shadow-xl delay-${index * 100} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-blue-50 rounded-full">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{category.title}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-12 text-center transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Link  to="/produtos" className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-3 px-8 rounded-full text-lg font-medium transition-all duration-300">
            Ver Todos os Produtos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;