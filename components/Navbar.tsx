import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Menu, X } from 'lucide-react';
import { useApp } from '@/src/context/AppContext';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language } = useApp();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled || isOpen ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-black text-white p-1.5 rounded-lg group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-purple-600 transition-all duration-300">
             <ShieldCheck size={24} fill="white" className="text-black" />
          </div>
          <span className="text-xl font-bold tracking-tight text-black group-hover:text-gray-700 transition-colors">
            IT SUPPORT BEKASI
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = link.href.startsWith('/') 
              ? location.pathname === link.href 
              : false;
            
            return link.href.startsWith('/') ? (
              <Link
                key={link.label}
                to={link.href}
                className={`text-sm font-medium transition-all relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-red-500 after:to-purple-600 after:transition-all ${
                  isActive 
                    ? 'text-black font-bold after:w-full' 
                    : 'text-gray-800 hover:text-black hover:font-bold after:w-0 hover:after:w-full'
                }`}
              >
                {link.label}
              </Link>
            ) : (
              <a 
                key={link.label} 
                href={link.href}
                className="text-sm font-medium text-gray-800 hover:text-black hover:font-bold transition-all relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-red-500 after:to-purple-600 after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => {
                const isActive = link.href.startsWith('/') 
                  ? location.pathname === link.href 
                  : false;
                
                return link.href.startsWith('/') ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-medium py-2 border-b border-gray-50 ${
                      isActive ? 'text-black font-bold' : 'text-gray-800 hover:text-black'
                    }`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a 
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-base font-medium text-gray-800 hover:text-black py-2 border-b border-gray-50"
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
