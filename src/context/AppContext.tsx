import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/types';

type Theme = 'light';
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

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme] = useState<Theme>('light');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark');
    root.classList.add('light');
    localStorage.setItem('theme', 'light');
  }, []);

  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      return saved || 'id';
    }
    return 'id';
  });

  const [view, setView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleTheme = () => {}; // No-op

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
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
