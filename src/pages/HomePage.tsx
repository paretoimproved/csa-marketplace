import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { CalendarIcon, UserGroupIcon, TruckIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { AnimatedLogo } from '../components/Logo';
import { Logo } from '../components/Logo';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-amber-50 to-emerald-50">
      <Navbar />

      {/* Hero Section with Stripe-like gradient background */}
      <div className="relative isolate">
        {/* Background gradient */}
        <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto pt-32 pb-24 px-4 sm:pt-40 sm:pb-32 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block font-medium">Fresh food,</span>
              <span className="block mt-1 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 text-transparent bg-clip-text">
                direct from farms
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Millions of customers trust local farmers for fresh, seasonal produce. 
              Build your farm's presence in the growing CSA marketplace.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full 
                  text-white bg-gray-900 hover:bg-gray-800 transition-colors duration-150"
              >
                Create your farm profile →
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-full 
                  text-gray-600 bg-white hover:bg-gray-50 transition-colors duration-150"
              >
                Contact sales
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stripe-like animated gradient border */}
      <div className="h-1 bg-gradient-to-r from-green-600 via-amber-600 to-emerald-600 animate-gradient-x" />

      {/* New navigation links */}
      <div className="space-y-1">
        <NavLink 
          to="/harvest-schedule" 
          className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
        >
          <CalendarIcon className="h-5 w-5 mr-2" />
          Harvest Schedule
        </NavLink>
        <NavLink 
          to="/subscription-mgmt" 
          className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
        >
          <UserGroupIcon className="h-5 w-5 mr-2" />
          CSA Members
        </NavLink>
        <NavLink 
          to="/delivery-routes" 
          className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
        >
          <TruckIcon className="h-5 w-5 mr-2" />
          Delivery Routes
        </NavLink>
      </div>

      {/* Featured Farms Section - Add this instead */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Farms</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Farm cards would go here */}
        </div>
      </div>
    </div>
  );
}; 