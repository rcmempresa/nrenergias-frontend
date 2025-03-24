import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LazyMotion, domAnimation } from 'framer-motion';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LazyMotion features={domAnimation}>
        <App />
      </LazyMotion>
    </BrowserRouter>
  </StrictMode>
);