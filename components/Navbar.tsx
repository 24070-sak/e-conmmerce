import React from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useStore, Link, useLocation } from '../context/StoreContext';

const Navbar: React.FC = () => {
  const { cartCount, setIsCartOpen } = useStore();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path ? 'text-black font-semibold' : 'text-gray-500 hover:text-black';

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-tighter">
              Lumina<span className="text-indigo-600">.</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className={`${isActive('/')} transition-colors duration-200`}>Home</Link>
            <Link to="/shop" className={`${isActive('/shop')} transition-colors duration-200`}>Shop</Link>
            <Link to="/about" className={`${isActive('/about')} transition-colors duration-200`}>About</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-black transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-gray-500 hover:text-indigo-600 transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-0 bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-600"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full px-4 py-4 space-y-3 shadow-lg">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 hover:text-indigo-600">Home</Link>
          <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 hover:text-indigo-600">Shop</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block text-gray-600 hover:text-indigo-600">About</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;