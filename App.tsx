
import React, { useState, useEffect, createContext, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechPartners from './components/TechPartners';
import Services from './components/Services';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FAQ from './components/FAQ';
import WhyChooseUs from './components/WhyChooseUs';
import Shop from './components/Shop';
import ProductDetail from './components/ProductDetail';
import WorkGallery from './components/WorkGallery';
import { HeroSkeleton } from './components/Skeleton';
import { SEO } from './components/SEO';
import { Product } from './types';
import { CONTACT_INFO } from './constants';

type Theme = 'light' | 'dark';
type Language = 'id' | 'en';
type View = 'home' | 'shop' | 'product-detail';

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  view: View;
  setView: (view: View) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as Theme;
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      return saved || 'id';
    }
    return 'id';
  });

  const [view, setView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleSetView = (newView: View) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView(newView);
  };

  return (
    <AppContext.Provider value={{ 
      theme, 
      toggleTheme, 
      language, 
      setLanguage, 
      view, 
      setView: handleSetView, 
      selectedProduct, 
      setSelectedProduct 
    }}>
      <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-500 selection:bg-brand-500 selection:text-white relative text-gray-900 dark:text-gray-100">
        <SEO type={view === 'product-detail' ? 'product' : 'business'} data={selectedProduct} />
        
        <Navbar />
        
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HeroSkeleton />
            </motion.div>
          ) : (
            <motion.div
              key={view + (selectedProduct?.id || '') + language}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {view === 'home' && (
                <>
                  <Hero />
                  <TechPartners />
                  <Services />
                  <WorkGallery />
                  <WhyChooseUs />
                  <Products />
                  <About />
                  <FAQ />
                  <Contact />
                </>
              )}
              {view === 'shop' && <Shop />}
              {view === 'product-detail' && selectedProduct && <ProductDetail />}
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />

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
      </div>
    </AppContext.Provider>
  );
};

export default App;
