import React from 'react';
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
import Services from './components/Services';
import Shop from './components/ShopPremium';
import ProductDetail from './components/ProductDetail';
import { SEO } from './components/SEO';
import { CONTACT_INFO } from './constants';
import { Toaster } from './components/ui/sonner';
import { useAnalytics } from './hooks/useAnalytics';

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

import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import Products from './admin/Products';
import Settings from './admin/Settings';
import ProtectedRoute from './admin/ProtectedRoute';

import { blink } from './lib/blink';

const AppContent = () => {
  useAnalytics();
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  React.useEffect(() => {
    // Basic presence tracking
    let channel: any = null;
    const setupPresence = async () => {
      try {
        channel = blink.realtime.channel('global-presence');
        await channel.subscribe({
          userId: `guest-${Math.random().toString(36).substr(2, 9)}`,
          metadata: { path: location.pathname }
        });
      } catch (err) {
        console.error('Presence error:', err);
      }
    };
    setupPresence();
    return () => { channel?.unsubscribe(); };
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <SEO type="business" />
      {!isAdminPath && <Navbar />}
      
      <main className="relative">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/products" element={
            <ProtectedRoute>
              <AdminLayout>
                <Products />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute>
              <AdminLayout>
                <Settings />
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          {/* Fallback */}
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
