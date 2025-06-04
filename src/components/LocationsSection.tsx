import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';

interface Location {
  name: string;
  address: string;
  hours: string;
  phone: string;
  image: string;
}

const LocationsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeLocation, setActiveLocation] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const locations: Location[] = [
    {
      name: 'Loja Porto Santo',
      address: 'Estrada Padre Ernesto e Jardim Rc 16, 9400-120 Porto Santo',
      hours: 'Segunda a Sábado: 09h00 - 18h00',
      phone: '+(351)291 110 483',
      image: 'https://images.pexels.com/photos/3855623/pexels-photo-3855623.jpeg?auto=compress&cs=tinysrgb&w=1600'
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">A nossa loja</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visite-nos para experimentar os nossos produtos 
            e receber consultoria especializada dos nossos profissionais.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Location tabs */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {locations.map((location, index) => (
                <button
                  key={index}
                  className={`w-full text-left p-6 border-b border-gray-200 transition-all duration-300 ${
                    activeLocation === index 
                      ? 'bg-blue-50 border-l-4 border-l-blue-600' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveLocation(index)}
                >
                  <h3 className={`text-xl font-semibold ${
                    activeLocation === index ? 'text-blue-600' : 'text-gray-800'
                  }`}>
                    {location.name}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    <MapPin size={16} className="inline mr-2" />
                    {location.address}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Location details */}
          <div 
            className={`lg:w-2/3 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={locations[activeLocation].image} 
                  alt={locations[activeLocation].name} 
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <h3 className="text-2xl font-bold text-white p-6">
                    {locations[activeLocation].name}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <MapPin size={20} className="text-blue-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Endereço</h4>
                    <p className="text-gray-600">{locations[activeLocation].address}</p>
                  </div>
                </div>
                <div className="flex items-start mb-4">
                  <Clock size={20} className="text-blue-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Horário de Funcionamento</h4>
                    <p className="text-gray-600">{locations[activeLocation].hours}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone size={20} className="text-blue-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Contacto</h4>
                    <p className="text-gray-600">{locations[activeLocation].phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;