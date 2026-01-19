import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { AppProvider } from './context/AppContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { CartProvider } from './context/CartContext';

// Components from root directory (using @ alias)
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TechPartners from '@/components/TechPartners';
import Products from '@/components/Products';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import WhyChooseUs from '@/components/WhyChooseUs';
import Shop from '@/components/ShopPremium';
import ProductDetail from '@/components/ProductDetail';
import { SEO } from '@/components/SEO';
import { CONTACT_INFO } from '@/constants';

// Admin Components
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/Dashboard';
import AdminProducts from './admin/Products';
import AdminSettings from './admin/Settings';
import AdminLogin from './admin/AdminLogin';
import ProtectedRoute from './admin/ProtectedRoute';

const HomePage = () => (
  <>
    <Hero />
    <TechPartners />
    <Products />
    <WhyChooseUs />
    <FAQ />
    <Contact />
  </>
);

const App: React.FC = () => {
  return (
    <AppProvider>
      <AdminAuthProvider>
        <CartProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-500 selection:bg-brand-500 selection:text-white relative text-gray-900 dark:text-gray-100">
              
              <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <>
                  <SEO type="business" />
                  <Navbar />
                  <HomePage />
                  <Footer />
                  <WhatsAppButton />
                </>
              } />
              <Route path="/shop" element={
                <>
                  <SEO type="business" />
                  <Navbar />
                  <Shop />
                  <Footer />
                  <WhatsAppButton />
                </>
              } />
              <Route path="/product/:id" element={
                <>
                  <SEO type="product" />
                  <Navbar />
                  <ProductDetail />
                  <Footer />
                  <WhatsAppButton />
                </>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout><AdminDashboard /></AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/products" element={
                <ProtectedRoute>
                  <AdminLayout><AdminProducts /></AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/settings" element={
                <ProtectedRoute>
                  <AdminLayout><AdminSettings /></AdminLayout>
                </ProtectedRoute>
              } />
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>

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
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={() => window.open(`https://wa.me/${CONTACT_INFO.whatsapp}`, '_blank')}
    className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/40 cursor-pointer"
    aria-label="Consult via WhatsApp"
  >
    <MessageSquare className="w-8 h-8" />
  </motion.button>
);

export default App;
