import React, { useState, useEffect, useRef } from 'react';
import { Award, Zap, Heart, Shield } from 'lucide-react';

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ValuesSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const values: Value[] = [
    {
      icon: <Award size={40} className="text-white" />,
      title: 'Qualidade',
      description: 'Compromisso com produtos e serviços da mais alta qualidade, mantendo os mais elevados padrões em tudo o que fazemos.'
    },
    {
      icon: <Zap size={40} className="text-white" />,
      title: 'Inovação',
      description: 'Busca constante por novas tecnologias e soluções que possam transformar e melhorar a vida dos nossos clientes.'
    },
    {
      icon: <Heart size={40} className="text-white" />,
      title: 'Paixão pelo Cliente',
      description: 'Dedicação em entender e superar as expectativas dos nossos clientes, oferecendo uma experiência excepcional.'
    },
    {
      icon: <Shield size={40} className="text-white" />,
      title: 'Sustentabilidade',
      description: 'Compromisso com práticas comerciais responsáveis e soluções que contribuam para um futuro mais sustentável.'
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
    <section 
      ref={sectionRef} 
      className="py-20 bg-cover bg-center text-white"
      style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1600')" 
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-2">Os Nossos Valores</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-300">
            Os valores que nos definem e guiam todas as nossas ações e decisões, 
            desde o atendimento ao cliente até o desenvolvimento de novos produtos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {values.map((value, index) => (
            <div 
              key={index}
              className={`transition-all duration-1000 delay-${index * 150} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <div className="flex items-start">
                <div className="mr-6 bg-blue-600 p-4 rounded-lg">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;