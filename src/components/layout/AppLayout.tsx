import { ReactNode } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Logo } from "../Logo";
import { NavLink } from 'react-router-dom';
import { UserGroupIcon, TruckIcon } from '@heroicons/react/24/outline';

interface Props {
  children: ReactNode;
}

export const AppLayout = ({ children }: Props) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-3">
              <Logo className="h-6 w-6 text-green-600" />
              <span className="text-lg font-semibold text-gray-900">
                {user?.role === 'FARMER' ? 'Farmer Dashboard' : 'CSA Marketplace'}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 hidden sm:inline">
                {user?.firstName || 'Welcome'}
              </span>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <svg 
                  className="w-5 h-5 text-gray-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 9l-7 7-7-7" 
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}; 