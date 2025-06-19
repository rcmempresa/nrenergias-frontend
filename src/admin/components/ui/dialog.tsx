import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// --- Contexto para gerenciar o estado de abertura/fechamento do diálogo ---
interface DialogContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
};

// --- Componente Principal: Dialog ---
interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open: controlledOpen, onOpenChange, children }) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const setOpen = useCallback((newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else {
      setUncontrolledOpen(newOpen);
    }
  }, [onOpenChange]);

  // Adiciona/remove classes para evitar scroll do corpo da página
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = ''; // Limpa ao desmontar
    };
  }, [open]);

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
};

// --- Componente: DialogContent ---
interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const DialogContent: React.FC<DialogContentProps> = ({ children, className, ...props }) => {
  const { open, setOpen } = useDialog();

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Fecha o modal se clicar no overlay (fora do conteúdo)
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleOverlayClick} // Clica no overlay para fechar
    >
      <div
        className={`relative z-50 bg-white p-6 rounded-lg shadow-xl w-full max-w-sm md:max-w-md lg:max-w-lg animate-in fade-in zoom-in-95 data-[state=open]:slide-in-from-bottom-2 ${className}`}
        // Adiciona um onMouseDown/onMouseUp para evitar fechar ao arrastar e soltar rapidamente
        onMouseDown={e => e.stopPropagation()}
        onMouseUp={e => e.stopPropagation()}
        {...props}
      >
        {children}
        {/* Botão de fechar (opcional, mas comum) */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          <span className="sr-only">Fechar</span>
        </button>
      </div>
    </div>
  );
};

// --- Componente: DialogHeader ---
interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ className, ...props }) => (
  <div
    className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}
    {...props}
  />
);

// --- Componente: DialogTitle ---
interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
}

export const DialogTitle: React.FC<DialogTitleProps> = ({ className, ...props }) => (
  <h2
    className={`text-lg font-semibold leading-none tracking-tight ${className}`}
    {...props}
  />
);

// --- Componente: DialogDescription ---
interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

export const DialogDescription: React.FC<DialogDescriptionProps> = ({ className, ...props }) => (
  <p
    className={`text-sm text-muted-foreground ${className}`}
    {...props}
  />
);