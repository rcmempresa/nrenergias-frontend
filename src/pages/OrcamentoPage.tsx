import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Check, Send, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Integration options with icons
const integrationOptions = [
  {
    id: 'agendamento',
    name: 'Agendamento Online',
    icon: 'https://cdn-icons-png.flaticon.com/512/2693/2693507.png',
    description: 'Sistema de agendamentos com confirmações automáticas'
  },
  {
    id: 'pagamentos',
    name: 'Pagamentos Online',
    icon: 'https://cdn-icons-png.flaticon.com/512/2331/2331941.png',
    description: 'Integração com métodos de pagamento portugueses'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: 'https://cdn-icons-png.flaticon.com/512/3144/3144456.png',
    description: 'Loja online completa e personalizada'
  },
  {
    id: 'crm',
    name: 'CRM',
    icon: 'https://cdn-icons-png.flaticon.com/512/1968/1968641.png',
    description: 'Gestão de relacionamento com clientes'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670051.png',
    description: 'Automação de mensagens e atendimento'
  },
  {
    id: 'email',
    name: 'Email Marketing',
    icon: 'https://cdn-icons-png.flaticon.com/512/3178/3178158.png',
    description: 'Campanhas e automação de emails'
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: 'https://cdn-icons-png.flaticon.com/512/1150/1150498.png',
    description: 'Relatórios e análise de dados'
  },
  {
    id: 'custom',
    name: 'Personalizado',
    icon: 'https://cdn-icons-png.flaticon.com/512/5307/5307794.png',
    description: 'Solução à medida para o seu negócio'
  }
];

// API service for budget requests
const budgetRequestService = {
  // This function will be used to submit the form data to your backend API
  submitBudgetRequest: async (formData) => {
    try {
      // Replace this URL with your actual API endpoint
      const apiUrl = 'https://api.1way.pt/budget-requests';
      
      // Prepare the data for the API
      const requestData = {
        client: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company || null
        },
        integrations: formData.selectedIntegrations,
        message: formData.message || null,
        requestDate: new Date().toISOString()
      };
      
      // For now, we'll just log the data that would be sent to the API
      console.log('Data to be sent to API:', requestData);
      
      // Uncomment this code when your API is ready
      /*
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any authentication headers if needed
          // 'Authorization': 'Bearer YOUR_API_TOKEN'
        },
        body: JSON.stringify(requestData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit budget request');
      }
      
      return await response.json();
      */
      
      // For now, simulate a successful API response
      return {
        success: true,
        message: 'Budget request submitted successfully',
        requestId: 'sim-' + Math.random().toString(36).substring(2, 10)
      };
    } catch (error) {
      console.error('Error submitting budget request:', error);
      throw error;
    }
  }
};

const OrcamentoPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    selectedIntegrations: []
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestId, setRequestId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const toggleIntegration = (integrationId) => {
    setFormData(prevData => {
      const isSelected = prevData.selectedIntegrations.includes(integrationId);
      
      if (isSelected) {
        return {
          ...prevData,
          selectedIntegrations: prevData.selectedIntegrations.filter(id => id !== integrationId)
        };
      } else {
        return {
          ...prevData,
          selectedIntegrations: [...prevData.selectedIntegrations, integrationId]
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || formData.selectedIntegrations.length === 0) {
      setFormError('Por favor, preencha todos os campos obrigatórios e selecione pelo menos uma integração.');
      return;
    }
    
    setIsSubmitting(true);
    setFormError('');
    
    try {
      // Here you would normally send the data to your backend
      // For now, we'll just simulate a successful submission
      const response = await axios.post(`${process.env.VITE_BACKEND_URL}/api/orcamento`, formData);

      

      // Se a requisição for bem-sucedida
      if (response.status === 200) {
        setFormSubmitted(true); // Atualiza o estado para mostrar a mensagem de sucesso
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormError('Ocorreu um erro ao processar o seu pedido. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <div className="mb-8">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>Voltar</span>
            </button>
          </div>

          {formSubmitted ? (
            <motion.div 
              className="bg-white rounded-lg shadow-lg p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Solicitação Enviada com Sucesso!</h1>
              <p className="text-lg text-gray-700 mb-8">
                Obrigado por entrar em contacto connosco. Recebemos o seu pedido de orçamento e entraremos em contacto em breve.
              </p>
              {requestId && (
                <p className="text-gray-600 mb-8">
                  Referência do seu pedido: <strong>{requestId}</strong>
                </p>
              )}
              <p className="text-gray-600 mb-8">
                Enviámos um email de confirmação para <strong>{formData.email}</strong> com os detalhes do seu pedido.
              </p>
              <Link to="/">
                <motion.button 
                  className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-8 rounded-md transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Voltar para a Página Inicial
                </motion.button>
              </Link>
            </motion.div>
          ) : (
            <motion.div 
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-8 text-white">
                <h1 className="text-3xl font-bold mb-2">Solicite o seu Orçamento</h1>
                <p className="text-blue-100">
                  Selecione as integrações que deseja e preencha o formulário abaixo para receber um orçamento personalizado.
                </p>
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8">
                {formError && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
                    {formError}
                  </div>
                )}
                
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Quais integrações precisa?</h2>
                
                {/* Integration options */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {integrationOptions.map((option) => (
                    <motion.div
                      key={option.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        formData.selectedIntegrations.includes(option.id)
                          ? 'border-primary-500 bg-primary-50 shadow-md'
                          : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                      }`}
                      onClick={() => toggleIntegration(option.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-3">
                          <img 
                            src={option.icon} 
                            alt={option.name} 
                            className="w-12 h-12 object-contain" 
                          />
                          {formData.selectedIntegrations.includes(option.id) && (
                            <div className="absolute -top-2 -right-2 bg-primary-500 rounded-full w-6 h-6 flex items-center justify-center">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                        <h3 className="font-medium text-gray-900">{option.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Os seus dados de contacto</h2>
                
                {/* Contact information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    />
                  </div>
                </div>
                
                <div className="mb-8">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Detalhes adicionais sobre o seu projeto
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                    placeholder="Descreva brevemente o que precisa..."
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <motion.button
                    type="submit"
                    className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-8 rounded-md transition-colors flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        A processar...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Solicitar Orçamento
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OrcamentoPage;