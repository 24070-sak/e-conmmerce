import React from 'react';
import { ArrowRight, Star, ShieldCheck, Truck } from 'lucide-react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Link } from '../context/StoreContext';

const Home: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 flex flex-col justify-center h-full">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-2xl">
            Future-Ready <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Lifestyle Essentials.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
            Curated tech, fashion, and home goods for the modern minimalist. 
            Experience shopping reimagined with AI assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/shop" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-900 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg"
            >
              Shop Collection
            </Link>
            <Link 
              to="/shop?category=Electronics" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white border border-white/30 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
            >
              View Electronics <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Star, title: "Curated Quality", desc: "Every item is hand-picked for excellence." },
            { icon: Truck, title: "Fast Shipping", desc: "Free delivery on orders over $100." },
            { icon: ShieldCheck, title: "Secure Checkout", desc: "Bank-level encryption for your peace of mind." },
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full mb-4">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
            <p className="text-gray-500 mt-2">Our most popular items this week.</p>
          </div>
          <Link to="/shop" className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center">
            View All <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      {/* Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-600 rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-500 rounded-full opacity-50 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-500 rounded-full opacity-50 blur-3xl"></div>
            
            <div className="relative px-8 py-16 md:px-16 md:py-20 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
                <div className="mb-8 md:mb-0 max-w-lg">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Smart Accessories Sale</h2>
                    <p className="text-indigo-100 text-lg mb-8">Upgrade your daily carry with 20% off all electronic accessories this weekend.</p>
                    <Link to="/shop?category=Accessories" className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-gray-50 transition-colors">
                        Shop Sale
                    </Link>
                </div>
                <img 
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                    alt="Watch" 
                    className="w-64 h-64 object-cover rounded-xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
                />
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;