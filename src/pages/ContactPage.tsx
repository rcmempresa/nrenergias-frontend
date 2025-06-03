import { Phone, Mail, MapPin } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<string | null>(null); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Verificando se todos os campos foram preenchidos
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('Por favor, preencha todos os campos.');
      return;
    }
  
    setStatus('Enviando...');
  
    try {
      // Enviar dados para o backend no localhost:3000
      const response = await fetch(`${process.env.VITE_BACKEND_URL}/api/contacto/enviar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setStatus('✅ Sua mensagem foi enviada com sucesso! Entraremos em contacto o mais breve possível.');
      } else {
        setStatus('❌ Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.');
      }
    } catch (error) {
      setStatus('❌ Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.');
    }
  };
  
  

  return (
    <>
      <Helmet>
        <title>Contactos | NRenergias</title>
        <meta name="description" content="Entre em contacto com a NRenergias — estamos disponíveis para esclarecer dúvidas, fornecer orçamentos e ajudar na escolha dos melhores produtos eletrónicos e soluções sustentáveis. Atendimento em todo o país." />
        <meta name="keywords" content="contactos NRenergias, assistência, suporte técnico, informações, Porto Santo, produtos eletrónicos, sustentabilidade, energia solar, Portugal" />
        <link rel="canonical" href="https://nrenergias.pt/contacto" />
      </Helmet>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mt-44">Entre em Contacto</h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Envie-nos uma mensagem</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Enviar Mensagem
              </button>
            </form>

            {/* Status de envio */}
            {status && (
              <div className={`text-center mt-4 ${status.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>
              {status}
            </div>            
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Informações de Contacto</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-medium">Telefone</h3>
                  <p className="text-gray-600">+351 291 110 483</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">geral@nrenergias.pt</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-medium">Morada</h3>
                  <p className="text-gray-600">
                    Estrada Padre Ernesto e Jardim Rc 16<br />
                    9400-120 Porto Santo<br />
                    Portugal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
