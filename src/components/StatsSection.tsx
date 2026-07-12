import { motion } from 'framer-motion';

export function StatsSection() {

  return (
    <section>
      <motion.div
        className=""
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="p-4 md:p-8 rounded-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 items-center justify-items-center">
            {[
              "/logo_instagram.png",
              "/partner_2.jpeg",
              "/partner_3.jpg",
              "/follow_1.jpeg",
            ].map((logo, index) => {
              // Condicional para adicionar a imagem extra (Instagram)
              if (logo === "/logo_instagram.png") {
                return (
                  <motion.div
                    key={index}
                    className="flex items-center justify-center p-2 md:p-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.2 }} // Efeito de hover mais chamativo
                  >
                    {/* Adicionando link ao logotipo do Instagram */}
                    <a href="https://www.1way.pt" target="_blank" rel="noopener noreferrer">
                      <img
                        src={logo}
                        alt="Instagram Logo"
                        className="h-16 md:h-20 lg:h-24 object-contain grayscale hover:grayscale-0 transition-all border-4 border-blue-500 rounded-full shadow-lg"
                      />
                    </a>
                  </motion.div>
                );
              }

              // Para as outras imagens, processa as URLs normalmente
              return (
                <motion.div
                  key={index}
                  className="flex items-center justify-center p-2 md:p-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <img
                    src={logo}
                    alt={`Partner ${index + 1}`}
                    className="h-6 md:h-8 lg:h-10 object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default StatsSection;
