import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import CartSidebar from './components/CartSidebar';
import ChatAssistant from './components/ChatAssistant';
import { StoreProvider, HashRouter, Routes, Route, Navigate } from './context/StoreContext';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <HashRouter>
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
          <Navbar />
          <CartSidebar />
          <ChatAssistant />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/about" element={<div className="p-20 text-center text-gray-500">About Page Placeholder</div>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <footer className="bg-white border-t border-gray-100 py-12 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <span className="text-xl font-bold tracking-tight">Lumina<span className="text-indigo-600">.</span></span>
                <p className="text-gray-500 text-sm mt-2">© 2024 Lumina Inc. All rights reserved.</p>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-600">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-gray-600">Terms</a>
                <a href="#" className="text-gray-400 hover:text-gray-600">Contact</a>
              </div>
            </div>
          </footer>
        </div>
      </HashRouter>
    </StoreProvider>
  );
};

export default App;