import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Category } from '../types';
import { SlidersHorizontal } from 'lucide-react';
import { useLocation } from '../context/StoreContext';

const Shop: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = (queryParams.get('category') as Category) || 'All';

  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const categories: Category[] = ['All', 'Electronics', 'Fashion', 'Home', 'Accessories'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shop All</h1>
          <p className="text-gray-500 mt-1">Explore our premium collection</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
           {/* Search */}
           <div className="relative">
                <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-4 pr-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full sm:w-64"
                />
           </div>

           {/* Mobile Filter Dropdown could go here, simplified to tabs for now */}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
        <div className="flex items-center mr-4 text-gray-400">
            <SlidersHorizontal className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Filters:</span>
        </div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-black text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">No products found matching your criteria.</p>
          <button 
            onClick={() => {setSelectedCategory('All'); setSearchQuery('');}}
            className="mt-4 text-indigo-600 font-semibold hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;