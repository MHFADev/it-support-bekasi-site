import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Award, ArrowRight, Laptop, Settings, Shield } from 'lucide-react';
import { CONTENT, SITE_INFO } from '../constants';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';
import { Button } from './ui/button';

const Hero: React.FC = () => {
  const { language } = useApp();
  const content = CONTENT[language].hero;

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-b from-blue-600 to-blue-400">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 z-0 bg-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]"></div>
      </div>
      
      {/* Bottom transition gradient to white/background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-blue-600 mb-6 shadow-lg border border-white/20"
            >
              <span className="text-sm font-black uppercase tracking-wider">{content.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.05]"
            >
              {content.title.split(',').map((part, i) => (
                <span key={i} className="block last:text-white/90">
                  {part.trim()}{i === 0 ? ',' : ''}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-white/90 mb-10 max-w-xl leading-relaxed"
            >
              {content.desc}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button asChild size="lg" className="rounded-xl px-10 h-14 font-bold text-lg shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                <Link to="/shop">{content.ctaSecondary}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl px-10 h-14 font-bold text-lg border-2 transition-all hover:bg-primary/5 hover:scale-105 active:scale-95">
                <a href="#services">{content.ctaPrimary}</a>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="hidden lg:block relative"
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/20 backdrop-blur-sm transform rotate-3 hover:rotate-0 transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200" 
                alt="Premium Laptop" 
                className="w-full h-auto object-cover scale-110 hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent"></div>
            </div>
            {/* Floating Card */}
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/50 z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">Kualitas Terjamin</p>
                  <p className="text-xs text-slate-500">QC 100% Lulus</p>
                </div>
              </div>
            </motion.div>
            
            {/* Decorative Element */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/20 blur-3xl rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 -left-20 w-40 h-40 bg-blue-400/20 blur-3xl rounded-full animate-pulse delay-700"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
