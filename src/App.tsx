import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

const HomePage = () => (
  <div className="flex flex-col">
    <Hero />
    <Shop />
    <WhyChooseUs />
    <TechPartners />
    <Contact />
    <FAQ />
  </div>
);

const App: React.FC = () => {
  return (
    <AppProvider>
      <AdminAuthProvider>
        <CartProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
              <SEO type="business" />
              <Navbar />
              
              <main className="relative">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<div>Admin Login (TBD)</div>} />
                  {/* Add other admin routes if needed */}
                  
                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              <Footer />
              <WhatsAppButton />
              <Toaster />
            </div>
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
    className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-[#25D366] text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-[#25D366]/40 cursor-pointer"
    aria-label="Consult via WhatsApp"
  >
    <MessageSquare className="w-8 h-8" />
  </motion.button>
);

export default App;
