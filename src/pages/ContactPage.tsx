import {useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Send, ArrowLeft, CheckCircle2, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';

// Service options with icons
const serviceOptions = [
  {
    id: 'agendamento',
    name: 'Agendamento Online',
    icon: '📅',
    description: 'Sistema de agendamentos com confirmações automáticas'
  },
  {
    id: 'pagamentos',
    name: 'Pagamentos Online',
    icon: '💳',
    description: 'Integração com métodos de pagamento portugueses'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: '🛒',
    description: 'Loja online completa e personalizada'
  },
  {
    id: 'crm',
    name: 'CRM',
    icon: '👥',
    description: 'Gestão de relacionamento com clientes'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    icon: '💬',
    description: 'Automação de mensagens e atendimento'
  },
  {
    id: 'email',
    name: 'Email Marketing',
    icon: '📧',
    description: 'Campanhas e automação de emails'
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: '📊',
    description: 'Relatórios e análise de dados'
  },
  {
    id: 'custom',
    name: 'Personalizado',
    icon: '⚙️',
    description: 'Solução à medida para o seu negócio'
  }
];

// Integration tools from the IntegracoesPage
const integrationTools : {
  [key: string]: Category;} = {
  marketing: {
    international: [
      { name: 'HubSpot', description: 'Automação de marketing e CRM', icon: '🚀', likes: '3.542' },
      { name: 'Mailchimp', description: 'Email marketing', icon: '📧', likes: '3.210' },
      { name: 'ActiveCampaign', description: 'Automação de e-mails e CRM', icon: '📊', likes: '2.987' },
      { name: 'Marketo (Adobe)', description: 'Marketing automation avançado', icon: '📈', likes: '2.654' },
      { name: 'Pipedrive', description: 'Gestão de vendas e CRM', icon: '📱', likes: '2.543' },
      { name: 'Semrush', description: 'SEO, PPC e análise de concorrência', icon: '🔍', likes: '2.432' },
      { name: 'Ahrefs', description: 'Ferramenta de SEO', icon: '📊', likes: '2.187' }
    ],
    portugal: [
      { name: 'E-goi', description: 'Email e SMS marketing', icon: '📱', likes: '1.876', isLocal: true },
      { name: 'Sendinblue (Brevo)', description: 'Automação de marketing e CRM', icon: '📧', likes: '1.654', isLocal: true },
      { name: 'OutMarketing', description: 'Agência e ferramentas de automação para B2B', icon: '🚀', likes: '1.432', isLocal: true }
    ]
  },
  crm: {
    international: [
      { name: 'Salesforce', description: 'CRM líder de mercado', icon: '☁️', likes: '3.876' },
      { name: 'HubSpot CRM', description: 'CRM gratuito e fácil de usar', icon: '🚀', likes: '3.654' },
      { name: 'Zoho CRM', description: 'CRM acessível e completo', icon: '📊', likes: '3.432' },
      { name: 'Microsoft Dynamics 365', description: 'CRM corporativo', icon: '💼', likes: '3.210' },
      { name: 'Pipedrive', description: 'CRM visual para vendas', icon: '📱', likes: '2.987' }
    ],
    portugal: [
      { name: 'PHC CRM', description: 'CRM português com integração ERP', icon: '🇵🇹', likes: '1.876', isLocal: true },
      { name: 'Primavera BSS', description: 'CRM integrado ao ERP Primavera', icon: '🌱', likes: '1.765', isLocal: true },
      { name: 'Bitrix24', description: 'CRM com gestão de equipas e comunicação', icon: '👥', likes: '1.654', isLocal: true }
    ]
  },
  payment: {
    international: [
      { name: 'Stripe', description: 'Processamento de pagamentos global', icon: '💳', likes: '3.876' },
      { name: 'PayPal', description: 'Pagamentos online e faturação', icon: '💰', likes: '3.765' },
      { name: 'Adyen', description: 'Gateway de pagamento para grandes empresas', icon: '💲', likes: '3.543' },
      { name: 'Square', description: 'Solução de pagamento e POS', icon: '🔲', likes: '3.321' }
    ],
    portugal: [
      { name: 'MB WAY', description: 'Pagamento instantâneo via mobile', icon: '📱', likes: '2.987', isLocal: true },
      { name: 'IfthenPay', description: 'Referências multibanco e MB WAY', icon: '💶', likes: '2.765', isLocal: true },
      { name: 'SIBS', description: 'Soluções de pagamento e multibanco', icon: '🏧', likes: '2.654', isLocal: true },
      { name: 'Unicre/Redunicre', description: 'Pagamentos com cartões', icon: '💳', likes: '2.543', isLocal: true }
    ]
  },
  ecommerce: {
    international: [
      { name: 'Shopify', description: 'Plataforma de e-commerce SaaS', icon: '🛍️', likes: '3.987' },
      { name: 'WooCommerce', description: 'Plugin para e-commerce no WordPress', icon: '🛒', likes: '3.876' },
      { name: 'Magento (Adobe Commerce)', description: 'Plataforma de e-commerce avançada', icon: '🏪', likes: '3.765' },
      { name: 'BigCommerce', description: 'Plataforma SaaS escalável', icon: '📈', likes: '3.654' },
      { name: 'Wix eCommerce', description: 'Solução acessível para lojas online', icon: '🌐', likes: '3.543' }
    ],
    portugal: [
      { name: 'Shopkit', description: 'Plataforma portuguesa de e-commerce', icon: '🇵🇹', likes: '2.432', isLocal: true },
      { name: 'Jumpseller', description: 'E-commerce fácil de usar com suporte PT', icon: '🦘', likes: '2.321', isLocal: true },
      { name: 'OLX', description: 'Marketplace popular em Portugal', icon: '📦', likes: '2.210', isLocal: true },
      { name: 'KuantoKusta', description: 'Comparador de preços com e-commerce próprio', icon: '💰', likes: '2.109', isLocal: true }
    ]
  },
  productivity: {
    international: [
      { name: 'Notion', description: 'Gestão de notas e bases de dados', icon: '📝', likes: '3.987' },
      { name: 'Trello', description: 'Gestão de tarefas e projetos visuais', icon: '📋', likes: '3.876' },
      { name: 'Asana', description: 'Ferramenta para equipas e projetos', icon: '✅', likes: '3.765' },
      { name: 'ClickUp', description: 'Gestão de produtividade completa', icon: '🖱️', likes: '3.654' },
      { name: 'Jira', description: 'Gestão de projetos para desenvolvimento', icon: '🔄', likes: '3.543' }
    ],
    portugal: [
      { name: 'Runrun.it', description: 'Gestão de projetos popular em Portugal', icon: '🏃', likes: '2.432', isLocal: true },
      { name: 'KanbanFlow', description: 'Gestão de tarefas em estilo Kanban', icon: '📊', likes: '2.321', isLocal: true },
      { name: 'Toggl', description: 'Gestão de tempo e produtividade', icon: '⏱️', likes: '2.210', isLocal: true }
    ]
  },
  communication: {
    international: [
      { name: 'Slack', description: 'Comunicação empresarial', icon: '💬', likes: '3.987' },
      { name: 'Microsoft Teams', description: 'Comunicação e colaboração', icon: '👥', likes: '3.876' },
      { name: 'Zoom', description: 'Videoconferências', icon: '🎥', likes: '3.765' },
      { name: 'Intercom', description: 'Chat e suporte ao cliente', icon: '💬', likes: '3.654' },
      { name: 'Zendesk', description: 'Atendimento ao cliente e helpdesk', icon: '🎧', likes: '3.543' }
    ],
    portugal: [
      { name: 'Talkdesk', description: 'Contact center em nuvem (empresa portuguesa)', icon: '☎️', likes: '2.432', isLocal: true },
      { name: 'Vodafone One Net', description: 'Comunicação empresarial', icon: '📱', likes: '2.321', isLocal: true },
      { name: 'Altice Empresas', description: 'Soluções de comunicação', icon: '📡', likes: '2.210', isLocal: true }
    ]
  },
  analytics: {
    international: [
      { name: 'Google Analytics', description: 'Análise de tráfego web', icon: '📊', likes: '3.987' },
      { name: 'Google Looker Studio', description: 'Relatórios e dashboards', icon: '📈', likes: '3.876' },
      { name: 'Tableau', description: 'BI e visualização de dados', icon: '📊', likes: '3.765' },
      { name: 'Power BI (Microsoft)', description: 'Ferramenta de BI poderosa', icon: '⚡', likes: '3.654' },
      { name: 'Mixpanel', description: 'Análise de comportamento de usuários', icon: '📱', likes: '3.543' }
    ],
    portugal: [
      { name: 'BI4ALL', description: 'Empresa portuguesa de Business Intelligence', icon: '🇵🇹', likes: '2.432', isLocal: true },
      { name: 'PRIMAVERA Analytics', description: 'Solução de BI integrada ao ERP', icon: '🌱', likes: '2.321', isLocal: true },
      { name: 'Altice Data Analytics', description: 'Soluções de análise de dados', icon: '📡', likes: '2.210', isLocal: true }
    ]
  }
};

// Business size options
const businessSizeOptions = [
  { id: 'small', name: 'Pequena (1-10 funcionários)' },
  { id: 'medium', name: 'Média (11-50 funcionários)' },
  { id: 'large', name: 'Grande (51+ funcionários)' }
];

type Tool = {
  name: string;
  description: string;
  icon: string;
  likes: string;
  isLocal?: boolean; // 'isLocal' é opcional
};

type Category = {
  [key: string]: Tool[]; // Um objeto com chaves do tipo string e valores como arrays de 'Tool'
};

type ToolWithCategoryAndRegion = {
  name: string;
  description: string;
  icon: string;
  likes: string;
  category: string; // Por exemplo, "marketing"
  region: string;   // Por exemplo, "international"
}


// Function to get all tools in a flat array
const getAllTools = (): ToolWithCategoryAndRegion[] => {
  const allTools: ToolWithCategoryAndRegion[] = [];
  Object.keys(integrationTools).forEach((category) => {
    Object.keys(integrationTools[category]).forEach((region) => {
      (integrationTools[category][region] as Tool[]).forEach((tool) => {
        allTools.push({
          ...tool,
          category,
          region
        });
      });
    });
  });
  return allTools;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  businessSize: string;
  message: string;
  selectedServices: any[]; // Defina o tipo de services, se necessário
  selectedTools: ToolWithCategoryAndRegion[];
};

const ContactPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Definindo o estado com o tipo de FormData
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    businessSize: '',
    message: '',
    selectedServices: [],
    selectedTools: []
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToolSelector, setShowToolSelector] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Check if we have a tool from the query params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const toolName = queryParams.get('tool');
    
    if (toolName) {
      const allTools = getAllTools();
      const tool = allTools.find(t => t.name === toolName);
      
      if (tool) {
        setFormData(prev => ({
          ...prev,
          selectedTools: [tool],
          message: `Estou interessado em integrar ${tool.name} no meu negócio.`
        }));
      }
    }
  }, [location.search]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };

  const toggleService = (serviceId: string) => {
    setFormData(prevData => {
      const isSelected = prevData.selectedServices.includes(serviceId);
  
      if (isSelected) {
        return {
          ...prevData,
          selectedServices: prevData.selectedServices.filter(id => id !== serviceId)
        };
      } else {
        return {
          ...prevData,
          selectedServices: [...prevData.selectedServices, serviceId]
        };
      }
    });
  };
  

  const addTool = (tool: ToolWithCategoryAndRegion) => {
    setFormData(prevData => ({
      ...prevData,
      selectedTools: [...prevData.selectedTools, tool]
    }));
    setShowToolSelector(false);
  };

  const removeTool = (toolName: string) => {
    setFormData(prevData => ({
      ...prevData,
      selectedTools: prevData.selectedTools.filter(tool => tool.name !== toolName)
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || (formData.selectedServices.length === 0 && formData.selectedTools.length === 0)) {
      setFormError('Por favor, preencha todos os campos obrigatórios e selecione pelo menos um serviço ou ferramenta.');
      return;
    }

    
    setIsSubmitting(true);
    setFormError('');
    
    try {
      // Here you would normally send the data to your backend
      // For now, we'll just simulate a successful submission
      const response = await axios.post('http://localhost:3000/api/contato', formData);

      console.log(response);

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

  // Filter tools based on category and search term
  const getFilteredTools = () => {
    const allTools = getAllTools();
    
    return allTools.filter(tool => {
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  return (
    <>
                <Helmet>
                  <title>Página de Contacto | 1way</title>
                  <meta name="description" content="Página de contacto para esclarecermos tudo sobre integração de sistemas de pagamento, CRM, automação e muito mais na 1way." />
                  <meta name="keywords" content="integração de sistemas, CRM, software personalizado, automação, e-commerce, pagamento" />
                  <meta name="robots" content="index, follow" />
                </Helmet>
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
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Mensagem Enviada com Sucesso!</h1>
              <p className="text-lg text-gray-700 mb-8">
                Obrigado por entrar em contacto connosco. Recebemos a sua mensagem e entraremos em contacto em breve.
              </p>
              <p className="text-gray-600 mb-8">
                Enviámos um email de confirmação para <strong>{formData.email}</strong> com os detalhes da sua solicitação.
              </p>
              <button 
                onClick={() => navigate('/')}
                className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-8 rounded-md transition-colors"
              >
                Voltar para a Página Inicial
              </button>
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
                <h1 className="text-3xl font-bold mb-2">Entre em Contacto</h1>
                <p className="text-blue-100">
                  Preencha o formulário abaixo para nos dizer como podemos ajudar o seu negócio.
                </p>
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8">
                {formError && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
                    {formError}
                  </div>
                )}
                
                {/* Selected Tools Section */}
                {formData.selectedTools.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Ferramentas selecionadas</h2>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex flex-wrap gap-2">
                        {formData.selectedTools.map((tool) => (
                          <div 
                            key={tool.name} 
                            className="bg-white rounded-lg p-3 shadow-sm flex items-center gap-2 group relative"
                          >
                            <div className="text-2xl">{tool.icon}</div>
                            <div>
                              <div className="font-medium text-gray-900">{tool.name}</div>
                              <div className="text-xs text-gray-500">{tool.description}</div>
                            </div>
                            <button 
                              type="button"
                              onClick={() => removeTool(tool.name)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => setShowToolSelector(true)}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg p-3 flex items-center gap-2"
                        >
                          <span className="text-xl">+</span>
                          <span>Adicionar outra ferramenta</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Tool Selector Modal */}
                {showToolSelector && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] overflow-hidden">
                      <div className="p-6 border-b">
                        <div className="flex justify-between items-center">
                          <h2 className="text-xl font-semibold text-gray-900">Selecione uma ferramenta</h2>
                          <button 
                            type="button"
                            onClick={() => setShowToolSelector(false)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                        
                        <div className="mt-4 flex gap-4">
                          <div className="flex-1">
                            <input
                              type="text"
                              placeholder="Pesquisar ferramentas..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                            />
                          </div>
                          <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                          >
                            <option value="all">Todas Categorias</option>
                            <option value="marketing">Marketing & Automação</option>
                            <option value="crm">CRM & Vendas</option>
                            <option value="payment">Pagamentos & Fintechs</option>
                            <option value="ecommerce">E-commerce & Marketplaces</option>
                            <option value="productivity">Produtividade & Gestão</option>
                            <option value="communication">Comunicação & Suporte</option>
                            <option value="analytics">Analytics & BI</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="p-6 overflow-y-auto max-h-[60vh]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {getFilteredTools().map((tool) => (
                            <div 
                              key={`${tool.category}-${tool.name}`}
                              className="bg-white border border-gray-200 hover:border-primary-300 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md"
                              onClick={() => addTool(tool)}
                            >
                              <div className="flex items-center gap-3">
                                <div className="text-2xl">{tool.icon}</div>
                                <div>
                                  <div className="font-medium text-gray-900">{tool.name}</div>
                                  <div className="text-xs text-gray-500">{tool.description}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {getFilteredTools().length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            Nenhuma ferramenta encontrada com os filtros selecionados.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* If no tools are selected, show the "Add tool" button */}
                {formData.selectedTools.length === 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Ferramentas de integração</h2>
                    <button
                      type="button"
                      onClick={() => setShowToolSelector(true)}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg p-4 w-full flex items-center justify-center gap-2"
                    >
                      <span className="text-xl">+</span>
                      <span>Selecionar ferramentas para integrar</span>
                    </button>
                  </div>
                )}
                
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Quais serviços está procurando?</h2>
                
                {/* Service options */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {serviceOptions.map((option) => (
                    <motion.div
                      key={option.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        formData.selectedServices.includes(option.id)
                          ? 'border-primary-500 bg-primary-50 shadow-md'
                          : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                      }`}
                      onClick={() => toggleService(option.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center mb-2">
                          <div className={`w-5 h-5 rounded-full border ${
                            formData.selectedServices.includes(option.id)
                              ? 'bg-primary-500 border-primary-500'
                              : 'border-gray-300'
                          } mr-2 flex items-center justify-center`}>
                            {formData.selectedServices.includes(option.id) && (
                              <CheckCircle2 className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <h3 className="font-medium text-gray-900">{option.name}</h3>
                        </div>
                        <p className="text-xs text-gray-500 ml-7">{option.description}</p>
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
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
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
                
                <div className="mb-6">
                  <label htmlFor="businessSize" className="block text-sm font-medium text-gray-700 mb-1">
                    Tamanho da empresa
                  </label>
                  <select
                    id="businessSize"
                    name="businessSize"
                    value={formData.businessSize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                  >
                    <option value="">Selecione uma opção</option>
                    {businessSizeOptions.map(option => (
                      <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-8">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensagem
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
                        Enviar Mensagem
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

export default ContactPage;