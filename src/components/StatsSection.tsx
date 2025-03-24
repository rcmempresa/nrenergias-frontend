import { motion } from 'framer-motion'

export function StatsSection() {

  return (
    <section >
        <motion.div
        className=""
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="p-4 md:p-8 rounded-xl">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8 items-center justify-items-center">
            {[
              "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
              "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
              "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/2560px-LinkedIn_Logo.svg.png",
              "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png",
              "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/2560px-Shopify_logo_2018.svg.png",
              "https://cdn.pixabay.com/photo/2013/02/12/09/07/microsoft-80658_1280.png"
            ].map((logo, index) => (
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
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default StatsSection;