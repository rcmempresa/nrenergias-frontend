import React from 'react';
import { motion } from 'framer-motion';

export function Dashboard() {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-full bg-gradient-to-r from-blue-50 via-white to-blue-50 p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4 select-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
      >
        Painel de Controlo NR Energias
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-blue-600 max-w-xl text-center tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1, duration: 1.2 }}
      >
        Aqui podes gerir tudo de forma simples e segura. Bem-vindo ao núcleo da tua empresa.
      </motion.p>
    </motion.div>
  );
}
