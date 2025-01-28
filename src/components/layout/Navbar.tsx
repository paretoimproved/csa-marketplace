import { Link } from 'react-router-dom';
import { Logo } from '../Logo';

export const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-lg z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-12">
            <Link to="/" className="flex items-center space-x-2">
              <Logo className="h-8 w-8 text-green-600" />
              <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                CSA Market
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">How it works</Link>
              <Link to="/farms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Browse Farms</Link>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Sign in</Link>
            <Link 
              to="/register" 
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full 
                text-white bg-gray-900 hover:bg-gray-800 transition-all duration-200 
                shadow-[0_1px_2px_rgba(0,0,0,0.16)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
            >
              Start now →
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}; 