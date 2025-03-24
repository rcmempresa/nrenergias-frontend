import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Globe, Flag, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';

// Categories for the tools
const categories = [
  { id: 'all', name: 'Todas Categorias' },
  { id: 'marketing', name: 'Marketing & Automação' },
  { id: 'crm', name: 'CRM & Vendas' },
  { id: 'payment', name: 'Pagamentos & Fintechs' },
  { id: 'ecommerce', name: 'E-commerce & Marketplaces' },
  { id: 'productivity', name: 'Produtividade & Gestão' },
  { id: 'communication', name: 'Comunicação & Suporte' },
  { id: 'analytics', name: 'Analytics & BI' }
];

// Regions for filtering
const regions = [
  { id: 'all', name: 'Todas Regiões' },
  { id: 'international', name: 'Internacional', icon: Globe },
  { id: 'portugal', name: 'Portugal', icon: Flag }
];

type Tool = {
  name: string;
  description: string;
  logo: string;
  likes: string;
  isLocal?: boolean;
};

type ToolsByCategory = {
  [category: string]: {
    international: Tool[];
    portugal: Tool[];
  };
};

// Tools organized by category and region with actual logos
const toolsByCategory: ToolsByCategory = {
  marketing: {
    international: [
      { name: 'HubSpot', description: 'Automação de marketing e CRM', logo: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png', likes: '3.542' },
      { name: 'Mailchimp', description: 'Email marketing', logo: 'https://logos-world.net/wp-content/uploads/2021/02/Mailchimp-Logo.png', likes: '3.210' },
      { name: 'ActiveCampaign', description: 'Automação de e-mails e CRM', logo: 'https://www.activecampaign.com/wp-content/uploads/2021/07/logo-blue.svg', likes: '2.987' },
      { name: 'Marketo', description: 'Marketing automation avançado', logo: 'https://focuslab-cms.imgix.net/coverImages/_1200x630_crop_center-center_82_none/Marketo_16-9.png?mtime=1633971670', likes: '2.654' },
      { name: 'Pipedrive', description: 'Gestão de vendas e CRM', logo: 'https://mms.businesswire.com/media/20240416060312/en/2099450/5/Pipedrive_Logo_Green.jpg', likes: '2.543' },
      { name: 'Semrush', description: 'SEO, PPC e análise de concorrência', logo: 'https://prowly-prod.s3.eu-west-1.amazonaws.com/uploads/60169/assets/601030/-41b7df259e181179ec6cf7184d77bffe.png', likes: '2.432' },
      { name: 'Ahrefs', description: 'Ferramenta de SEO', logo: 'https://cdn.buttercms.com/ec5959u2SMe0zJJzBXVM', likes: '2.187' }
    ],
    portugal: [
      { name: 'E-goi', description: 'Email e SMS marketing', logo: 'https://help.instapage.com/hc/article_attachments/12940121093911', likes: '1.876', isLocal: true },
      { name: 'Sendinblue', description: 'Automação de marketing e CRM', logo: 'https://www.sendinblue.com/wp-content/themes/sendinblue2019/assets/images/common/logo-color.svg', likes: '1.654', isLocal: true },
      { name: 'OutMarketing', description: 'Agência e ferramentas de automação para B2B', logo: 'https://media.licdn.com/dms/image/v2/C4E0BAQFsJg7s5-yA1A/company-logo_200_200/company-logo_200_200/0/1631322400174?e=2147483647&v=beta&t=_T0_1BqoGdAyMgRDm54U8iRge6qXGyFhUROhbUzSp20', likes: '1.432', isLocal: true }
    ]
  },
  crm: {
    international: [
      { name: 'Salesforce', description: 'CRM líder de mercado', logo: 'https://www.salesforce.com/content/dam/sfdc-docs/www/logos/logo-salesforce.svg', likes: '3.876' },
      { name: 'HubSpot CRM', description: 'CRM gratuito e fácil de usar', logo: 'https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png', likes: '3.654' },
      { name: 'Zoho CRM', description: 'CRM acessível e completo', logo: 'https://www.zoho.com/branding/images/zoho-logo.png', likes: '3.432' },
      { name: 'Microsoft Dynamics 365', description: 'CRM corporativo', logo: 'https://sightcall.nyc3.cdn.digitaloceanspaces.com/images/images/_800x418_crop_center-center_82_none/dynamics365.png?mtime=1675871934', likes: '3.210' },
      { name: 'Pipedrive', description: 'CRM visual para vendas', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJtkAnRUyg57BCRfzSD7ZvgH424VrCCofryg&s', likes: '2.987' }
    ],
    portugal: [
      { name: 'PHC CRM', description: 'CRM português com integração ERP', logo: 'https://www.totalsoft.pt/wp-content/uploads/2023/08/banner_erp_phc.png', likes: '1.876', isLocal: true },
      { name: 'Primavera BSS', description: 'CRM integrado ao ERP Primavera', logo: 'https://cotecportugal.pt/wp-content/uploads/2020/01/primavera.jpg', likes: '1.765', isLocal: true },
      { name: 'Bitrix24', description: 'CRM com gestão de equipas e comunicação', logo: 'https://play-lh.googleusercontent.com/Vm1m6FinRA0ZTFgTJ5BazNknbFJv_is9kno3bi_Hl_QCjiMkU8DqcYvy2tLAHi87Y0i2', likes: '1.654', isLocal: true }
    ]
  },
  payment: {
    international: [
      { name: 'Stripe', description: 'Processamento de pagamentos global', logo: 'https://stripe.com/img/v3/home/twitter.png', likes: '3.876' },
      { name: 'PayPal', description: 'Pagamentos online e faturação', logo: 'https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg', likes: '3.765' },
      { name: 'Adyen', description: 'Gateway de pagamento para grandes empresas', logo: 'https://yt3.googleusercontent.com/ytc/AIdro_nvXLtbaPrHkVnA0p25WsfjSKxm8vmmaoYldzD_b7sI_k8=s900-c-k-c0x00ffffff-no-rj', likes: '3.543' },
      { name: 'Square', description: 'Solução de pagamento e POS', logo: 'https://www.nopcommerce.com/images/thumbs/0007555_square-payment-module.jpeg', likes: '3.321' }
    ],
    portugal: [
      { name: 'MB WAY', description: 'Pagamento instantâneo via mobile', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBIFVVey4woYOE1GssFhYy-PWg003E98tcDA&s', likes: '2.987', isLocal: true },
      { name: 'MULTIBANCO', description: 'Referências multibanco', logo: 'https://www.vendus.pt/foto/referencia-multibanco1200-76_og.png', likes: '2.765', isLocal: true },
      { name: 'SIBS', description: 'Soluções de pagamento e multibanco', logo: 'https://www.pay.sibs.com/wp-content/uploads/2022/02/logo.png', likes: '2.654', isLocal: true },
      { name: 'Unicre/Redunicre', description: 'Pagamentos com cartões', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVYzS1C6VnP4pr_upk87rK-tbtGBLCj6eU_Q&s', likes: '2.543', isLocal: true }
    ]
  },
  ecommerce: {
    international: [
      { name: 'Shopify', description: 'Plataforma de e-commerce SaaS', logo: 'https://cdn.shopify.com/assets/images/logos/shopify-bag.png', likes: '3.987' },
      { name: 'WooCommerce', description: 'Plugin para e-commerce no WordPress', logo: 'https://luminfire.com/wp-content/uploads/2019/02/WooCommerce-Logo.png', likes: '3.876' },
      { name: 'Magento', description: 'Plataforma de e-commerce avançada', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGtJOPnrvzxA25T_fbXrdlc-TzJj95GAOSfQ&s', likes: '3.765' },
      { name: 'BigCommerce', description: 'Plataforma SaaS escalável', logo: 'https://www.bigcommerce.com/_next/image/?url=https%3A%2F%2Fs3.amazonaws.com%2Fintegrated-apps%2Fblmpcwnk%2Frftsjlub.png&w=3840&q=75', likes: '3.654' },
      { name: 'Wix eCommerce', description: 'Solução acessível para lojas online', logo: 'https://i.pcmag.com/imagery/reviews/06XUaA1fCiPsIqsN2ve12pD-11..v1569472540.jpg', likes: '3.543' }
    ],
    portugal: [
      { name: 'Shopkit', description: 'Plataforma portuguesa de e-commerce', logo: 'https://shopk.it/blog/wp-content/uploads/2015/02/logo-black.png', likes: '2.432', isLocal: true },
      { name: 'Jumpseller', description: 'E-commerce fácil de usar com suporte PT', logo: 'https://www.jumpseller.com/images/logo.png', likes: '2.321', isLocal: true },
      { name: 'OLX', description: 'Marketplace popular em Portugal', logo: 'https://files.tecnoblog.net/wp-content/uploads/2021/03/olx-novo-700x393.jpg', likes: '2.210', isLocal: true },
      { name: 'KuantoKusta', description: 'Comparador de preços com e-commerce próprio', logo: 'https://s1.kuantokusta.pt/img_upload/Repository/site/logo-v2-two-lines-black.png', likes: '2.109', isLocal: true }
    ]
  },
  productivity: {
    international: [
      { name: 'Notion', description: 'Gestão de notas e bases de dados', logo: 'https://www.notion.so/front-static/logo-ios.png', likes: '3.987' },
      { name: 'Trello', description: 'Gestão de tarefas e projetos visuais', logo: 'https://d2k1ftgv7pobq7.cloudfront.net/meta/u/res/images/brand-assets/Logos/0099ec3754bf473d2bbf317204ab6fea/trello-logo-blue.png', likes: '3.876' },
      { name: 'Asana', description: 'Ferramenta para equipas e projetos', logo: 'https://premiumplus.io/wp-content/uploads/2022/10/Asana-logo.png', likes: '3.765' },
      { name: 'ClickUp', description: 'Gestão de produtividade completa', logo: 'https://clickup.com/landing/images/clickup-logo-gradient.svg', likes: '3.654' },
      { name: 'Jira', description: 'Gestão de projetos para desenvolvimento', logo: 'https://wac-cdn.atlassian.com/dam/jcr:e348b562-4152-4cdc-8a55-3d297e509cc8/Jira%20Software-blue.svg', likes: '3.543' }
    ],
    portugal: [
      { name: 'Runrun.it', description: 'Gestão de projetos popular em Portugal', logo: 'https://runrun.it//static/images/logo_1200X630.png', likes: '2.432', isLocal: true },
      { name: 'KanbanFlow', description: 'Gestão de tarefas em estilo Kanban', logo: 'https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v1426152241/qzcc7pwg2vf3nmoqoxlj.png', likes: '2.321', isLocal: true },
      { name: 'Toggl', description: 'Gestão de tempo e produtividade', logo: 'https://bunny-wp-pullzone-e5uf8op2hb.b-cdn.net/wp-content/uploads/2018/08/toggl.jpg', likes: '2.210', isLocal: true }
    ]
  },
  communication: {
    international: [
      { name: 'Slack', description: 'Comunicação empresarial', logo: 'https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png', likes: '3.987' },
      { name: 'Microsoft Teams', description: 'Comunicação e colaboração', logo: 'https://mattermost.com/wp-content/uploads/2021/04/ms-teams-meetings-integration.webp', likes: '3.876' },
      { name: 'Zoom', description: 'Videoconferências', logo: 'https://st1.zoom.us/zoom.ico', likes: '3.765' },
      { name: 'Intercom', description: 'Chat e suporte ao cliente', logo: 'https://upload.wikimedia.org/wikipedia/en/b/b1/Intercom_Logo_Vertical_Black.png', likes: '3.654' },
      { name: 'Zendesk', description: 'Atendimento ao cliente e helpdesk', logo: 'https://www.zendesk.com/static/images/logos/zendesk.svg', likes: '3.543' }
    ],
    portugal: [
      { name: 'Talkdesk', description: 'Contact center em nuvem (empresa portuguesa)', logo: 'https://www.distribuicaohoje.com/wp-content/uploads/sites/2/2023/01/talkdesk-logo-2021-purple-rgb@2x.png', likes: '2.432', isLocal: true },
      { name: 'Vodafone One Net', description: 'Comunicação empresarial', logo: 'https://pbs.twimg.com/media/ERnBxCKXkAAacHc.png', likes: '2.321', isLocal: true },
      { name: 'Altice Empresas', description: 'Soluções de comunicação', logo: 'https://cld.pt/dl/download/ab6f74c3-4827-4e4b-8692-e8441295ffbb/Solu%C3%A7%C3%A3o%20Go-Online_PR/Altice%20Empresas%20%281%29.jpg?download=true', likes: '2.210', isLocal: true }
    ]
  },
  analytics: {
    international: [
      { name: 'Google Analytics', description: 'Análise de tráfego web', logo: 'https://evolve-systems.com/wp-content/uploads/2021/01/google_analytics-ar21.png', likes: '3.987' },
      { name: 'Google Looker Studio', description: 'Relatórios e dashboards', logo: 'https://media.licdn.com/dms/image/v2/D4D12AQHkS1tCc6LlVA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1722457848250?e=2147483647&v=beta&t=HlZ9mAxtlTnVhblfCroCs1RQ1Y-Gb6ggVUxbUv_zKew', likes: '3.876' },
      { name: 'Tableau', description: 'BI e visualização de dados', logo: 'https://www.talkwalker.com/hubfs/Website/Logos/marketplace/Tableau.png', likes: '3.765' },
      { name: 'Power BI', description: 'Ferramenta de BI poderosa', logo: 'https://powerbi.microsoft.com/pictures/application-logos/svg/powerbi.svg', likes: '3.654' },
      { name: 'Mixpanel', description: 'Análise de comportamento de usuários', logo: 'https://cdn.worldvectorlogo.com/logos/mixpanel.svg', likes: '3.543' }
    ],
    portugal: [
      { name: 'BI4ALL', description: 'Empresa portuguesa de Business Intelligence', logo: 'https://bi4allconsulting.com/wp-content/uploads/2024/03/8c073d4b-76d1-4b51-8839-85bc6f70074f.jpeg', likes: '2.432', isLocal: true },
      { name: 'PRIMAVERA Analytics', description: 'Solução de BI integrada ao ERP', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGIhImlrCK8dYDu-Rfal4HCsHYQ0lxF1QNTQ&s', likes: '2.321', isLocal: true },
      { name: 'Altice Data Analytics', description: 'Soluções de análise de dados', logo: 'https://cdn.mos.cms.futurecdn.net/tJnjXYe5XrMdDjhzi3qd3T.jpg', likes: '2.210', isLocal: true }
    ]
  }
};

const Button = ({ 
  children, 
  className, 
  size = "md", 
  ...props 
}: { 
  children: React.ReactNode; 
  className?: string; 
  size?: "sm" | "md" | "lg"; 
  [key: string]: any;
}) => {
  const sizeClasses = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg"
  };

  return (
    <button
      className={`font-medium rounded-md transition-colors ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

function IntegracoesPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getFilteredTools = () => {
    if (selectedCategory === 'all') {
      const allTools = [];
      Object.keys(toolsByCategory).forEach(category => {
        const categoryTools = [];
        if (selectedRegion === 'all' || selectedRegion === 'international') {
          categoryTools.push(...toolsByCategory[category].international.slice(0, 3));
        }
        if (selectedRegion === 'all' || selectedRegion === 'portugal') {
          categoryTools.push(...toolsByCategory[category].portugal.slice(0, 2));
        }
        allTools.push(...categoryTools);
      });
      return allTools.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      const categoryTools = [];
      if (selectedRegion === 'all' || selectedRegion === 'international') {
        categoryTools.push(...toolsByCategory[selectedCategory].international);
      }
      if (selectedRegion === 'all' || selectedRegion === 'portugal') {
        categoryTools.push(...toolsByCategory[selectedCategory].portugal);
      }
      return categoryTools.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
            <Helmet>
              <title>Ferramentas de Integração| 1way</title>
              <meta name="description" content="Página das ferramentas mais utilizadas para integração de sistemas de pagamento, CRM, automação e muito mais na 1way." />
              <meta name="keywords" content="integração de sistemas, CRM, software personalizado, automação, e-commerce, pagamento" />
              <meta name="robots" content="index, follow" />
            </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Ferramentas por Categoria
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
          >
            Explore nossa biblioteca completa de ferramentas organizadas por categoria e região.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            className="max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar ferramentas por categoria..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-blue-400 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Categorias</h2>
                <div className="space-y-2 mb-8">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                <h2 className="text-lg font-semibold mb-4">Região</h2>
                <div className="space-y-2">
                  {regions.map((region) => (
                    <button
                      key={region.id}
                      onClick={() => setSelectedRegion(region.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                        selectedRegion === region.id
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {region.icon && <region.icon className="h-4 w-4" />}
                      <span>{region.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {selectedCategory === 'all' ? (
                // Display all categories
                <>
                  {Object.keys(toolsByCategory).map((categoryId) => {
                    const categoryTools = [];
                    if (selectedRegion === 'all' || selectedRegion === 'international') {
                      categoryTools.push(...toolsByCategory[categoryId].international.slice(0, 3));
                    }
                    if (selectedRegion === 'all' || selectedRegion === 'portugal') {
                      categoryTools.push(...toolsByCategory[categoryId].portugal.slice(0, 2));
                    }
                    
                    // Filter by search term
                    const filteredTools = categoryTools.filter(tool => 
                      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                    
                    if (filteredTools.length === 0) return null;
                    
                    return (
                      <div key={categoryId} className="mb-12">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-2xl font-bold text-gray-900">
                            {categories.find(c => c.id === categoryId)?.name}
                          </h2>
                          <button 
                            onClick={() => setSelectedCategory(categoryId)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Ver todas
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {filteredTools.map((tool, index) => (
                            <ToolCard 
                              key={`${categoryId}-${tool.name}`} 
                              tool={tool} 
                              index={index} 
                              category={categoryId}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </> ) : (
                // Display specific category
                <>
                  {/* International Tools */}
                  {(selectedRegion === 'all' || selectedRegion === 'international') && (
                    <div className="mb-12">
                      <div className="flex items-center mb-4">
                        <Globe className="h-5 w-5 text-blue-600 mr-2" />
                        <h2 className="text-2xl font-bold text-gray-900">Internacional</h2>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {toolsByCategory[selectedCategory].international
                          .filter(tool => 
                            tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tool.description.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((tool, index) => (
                            <ToolCard 
                              key={`int-${tool.name}`} 
                              tool={tool} 
                              index={index} 
                              category={selectedCategory}
                            />
                          ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Portugal Tools */}
                  {(selectedRegion === 'all' || selectedRegion === 'portugal') && (
                    <div className="mb-12">
                      <div className="flex items-center mb-4">
                        <Flag className="h-5 w-5 text-blue-600 mr-2" />
                        <h2 className="text-2xl font-bold text-gray-900">Portugal</h2>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {toolsByCategory[selectedCategory].portugal
                          .filter(tool => 
                            tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tool.description.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((tool, index) => (
                            <ToolCard 
                              key={`pt-${tool.name}`} 
                              tool={tool} 
                              index={index} 
                              category={selectedCategory}
                            />
                          ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* No Results */}
              {getFilteredTools().length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    Nenhuma ferramenta encontrada com os filtros selecionados.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Integration Request Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Gostaria de criar um projeto?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
            Cria o seu projeto na 1way e conecte-se às maiores ferramentas de tecnologia em Portugal e no mundo.
            </p>
            <Link to="/contacto">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Quero dar o salto
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Ready to Automate Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Pronto para automatizar seu negócio?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Comece agora em menos de 2 minutos.
            </p>
            <Link to="/contacto">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90">
                Começar Agora Grátis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ToolCard({ tool, index, category }) {
  const navigate = useNavigate();
  
  const handleIntegrationClick = () => {
    navigate(`/contacto?tool=${encodeURIComponent(tool.name)}`);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.08 }}
      className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all hover:scale-105 relative cursor-pointer"
    >
      {tool.isLocal && (
        <span className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
          🇵🇹 Local
        </span>
      )}
      <div className="flex flex-col">
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 mr-3 flex items-center justify-center">
            <img 
              src={tool.logo} 
              alt={`${tool.name} logo`} 
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{tool.name}</h3>
            <p className="text-xs text-gray-500">{tool.description}</p>
          </div>
        </div>
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="text-xs text-gray-400 flex items-center">
            <Star className="h-3 w-3 text-yellow-400 mr-1" />
            {tool.likes} utilizadores
          </div>
          <Button 
            size="sm" 
            className="bg-blue-50 hover:bg-blue-100 text-blue-600"
            onClick={handleIntegrationClick}
          >
            Quero integrar
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default IntegracoesPage;