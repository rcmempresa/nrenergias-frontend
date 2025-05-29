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
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 rounded-md border border-gray-300 py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <Settings size={20} />
            </button>
            
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