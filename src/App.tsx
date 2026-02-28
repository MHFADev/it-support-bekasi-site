import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { AppProvider } from './context/AppContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechPartners from './components/TechPartners';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FAQ from './components/FAQ';
import WhyChooseUs from './components/WhyChooseUs';
import Shop from './components/Shop';
import ProductDetail from './components/ProductDetail';
import LoadingScreen from './components/LoadingScreen';
import { SEO } from './components/SEO';
import { CONTACT_INFO } from './constants';
import { Toaster } from './components/ui/sonner';
import { useAnalytics } from './hooks/useAnalytics';

import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import Products from './admin/Products';
import Settings from './admin/Settings';
import ProtectedRoute from './admin/ProtectedRoute';

const HomePage = () => (
  <div className="flex flex-col">
    <Hero />
    <TechPartners />
    <Shop />
    <WhyChooseUs />
    <Contact />
    <FAQ />
  </div>
);

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  useAnalytics();
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/portal-bekasi-management-88');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => { 
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <SEO type="business" />
      {!isAdminPath && <Navbar />}
      
      <main className="relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          
          <Route path="/portal-bekasi-management-88/login" element={<AdminLogin />} />
          <Route path="/portal-bekasi-management-88" element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/portal-bekasi-management-88/products" element={
            <ProtectedRoute>
              <AdminLayout>
                <Products />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/portal-bekasi-management-88/settings" element={
            <ProtectedRoute>
              <AdminLayout>
                <Settings />
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAdminPath && <Footer />}
      {!isAdminPath && <WhatsAppButton />}
      <Toaster />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AdminAuthProvider>
        <CartProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </CartProvider>
      </AdminAuthProvider>
    </AppProvider>
  );
};

const WhatsAppButton = () => (
  <motion.button
    initial={{ opacity: 0, scale: 0.5, y: 50 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    whileHover={{ scale: 1.1, rotate: 10 }}
    whileTap={{ scale: 0.9 }}
    onClick={() => window.open(`https://wa.me/${CONTACT_INFO.whatsapp}`, '_blank')}
    className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[60] w-12 h-12 sm:w-16 sm:h-16 bg-[#25D366] text-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl shadow-[#25D366]/40 cursor-pointer"
    aria-label="Consult via WhatsApp"
  >
    <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8" />
  </motion.button>
);

export default App;
