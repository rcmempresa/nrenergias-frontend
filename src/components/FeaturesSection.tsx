const FeaturesSection = () => {
  const features = [
    {
      icon: "🎧",
      title: "Responsivo",
      description: "Atendimento ao cliente disponível 24/7",
    },
    {
      icon: "🛡️",
      title: "Seguro",
      description: "Marketplace certificado desde 2017",
    },
    {
      icon: "🚚",
      title: "Transporte",
      description: "Gratuito, rápido, e para todo o lado",
    },
    {
      icon: "🔄",
      title: "Transparência",
      description: "Processos claros e comunicação aberta com os clientes",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-6 py-6 bg-white text-gray-700 space-y-4 md:space-y-0 md:space-x-6">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center space-x-3 w-full md:w-auto">
          <span className="text-3xl">{feature.icon}</span>
          <div>
            <h3 className="font-bold text-lg">{feature.title}</h3>
            <p className="text-sm">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturesSection;
