import React from 'react';
import { Product } from '../types';
import { useStore, Link } from '../context/StoreContext';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useStore();

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end">
            <button 
                onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                }}
                className="bg-white text-indigo-600 p-3 rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition-colors"
            >
                <Plus className="w-5 h-5" />
            </button>
        </div>
      </Link>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
            <div>
                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                <Link to={`/product/${product.id}`}>
                    <h3 className="text-base font-semibold text-gray-900 line-clamp-1 hover:text-indigo-600 transition-colors">
                    {product.name}
                    </h3>
                </Link>
            </div>
        </div>
        
        <div className="mt-auto flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            <div className="flex items-center text-yellow-500 text-xs font-medium">
                ★ {product.rating} <span className="text-gray-400 ml-1">({product.reviews})</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;