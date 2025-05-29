import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-purple-600 hover:bg-purple-700 text-white',
  outline: 'border border-gray-300 hover:bg-gray-100 text-gray-700',
  ghost: 'hover:bg-gray-100 text-gray-700',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-xs py-1 px-2',
  md: 'text-sm py-2 px-4',
  lg: 'text-base py-2.5 px-5',
};

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  onClick, 
  disabled = false,
  type = 'button',
  icon
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`
        rounded font-medium transition-colors focus:outline-none 
        focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} 
        ${variantClasses[variant]} ${sizeClasses[size]} ${className}
        ${icon ? 'inline-flex items-center gap-2' : ''}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}