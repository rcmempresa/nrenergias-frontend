import React from 'react';
import { Bell, User, Settings, Search } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        
        <div className="flex items-center gap-4"> 
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 ml-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <User size={18} />
              </div>
              <span className="text-sm font-medium hidden md:block">NRENERGIAS</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}