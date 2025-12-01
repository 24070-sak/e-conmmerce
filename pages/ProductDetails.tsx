import React from 'react';
import { PRODUCTS, MOCK_PRICE_HISTORY } from '../constants';
import { useStore, Link, useParams } from '../context/StoreContext';
import { Star, Truck, Shield, ArrowLeft, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === id);
  const { addToCart } = useStore();

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        <Link to="/shop" className="mt-4 text-indigo-600 hover:underline">Back to Shop</Link>
      </div>
    );
  }

  // Generate slightly random data based on base mock data to simulate different history per product
  const chartData = MOCK_PRICE_HISTORY.map(d => ({
    name: d.name,
    price: d.price + (Math.random() * 20 - 10)
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/shop" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="space-y-6">
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
            />
            </div>
            {/* Thumbnails (Mock) */}
            <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square bg-gray-50 rounded-lg overflow-hidden cursor-pointer hover:ring-2 ring-indigo-500 transition-all">
                        <img src={product.image} alt="" className="w-full h-full object-cover opacity-70 hover:opacity-100" />
                    </div>
                ))}
            </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-indigo-600 font-semibold tracking-wide text-sm uppercase">{product.category}</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            <div className="flex items-center text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
              ))}
              <span className="ml-2 text-gray-500 text-sm">({product.reviews} reviews)</span>
            </div>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="mb-8">
             <h3 className="font-semibold text-gray-900 mb-3">Key Features:</h3>
             <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-3"></div>
                        {feature}
                    </li>
                ))}
             </ul>
          </div>

          <div className="flex gap-4 mb-10">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2" /> Add to Cart
            </button>
            <button className="px-6 py-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                 <span className="sr-only">Wishlist</span>
                 <Star className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-12">
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                <Truck className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                <div>
                    <p className="font-semibold text-gray-900 text-sm">Free Shipping</p>
                    <p className="text-xs text-gray-500 mt-1">On all orders over $100</p>
                </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                <Shield className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                <div>
                    <p className="font-semibold text-gray-900 text-sm">2 Year Warranty</p>
                    <p className="text-xs text-gray-500 mt-1">Full coverage included</p>
                </div>
            </div>
          </div>

          {/* Price History Chart */}
          <div className="border-t border-gray-100 pt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Price Trend History</h3>
            <div className="h-64 w-full bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} domain={['auto', 'auto']} prefix="$" />
                        <Tooltip 
                            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                        />
                        <Line type="monotone" dataKey="price" stroke="#4f46e5" strokeWidth={3} dot={{r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">Historical pricing data for the last 6 months.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;