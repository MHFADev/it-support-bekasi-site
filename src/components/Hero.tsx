import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Award, ArrowRight, Laptop, Settings, Shield } from 'lucide-react';
import { CONTENT, SITE_INFO } from '../constants';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';

const Hero: React.FC = () => {
  const { language } = useApp();
  const content = CONTENT[language].hero;

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000" 
          alt="Tech Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/90 via-background/70 to-background"></div>
        
        {/* Animated Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8 backdrop-blur-sm"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-bold tracking-widest uppercase">{content.badge}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]"
          >
            {content.title.split('.').map((part, i) => (
              <span key={i} className={i === 0 ? "block" : "block text-primary mt-2"}>
                {part}{i === 0 ? '.' : ''}
              </span>
            ))}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {content.desc}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => document.getElementById('shop-premium')?.scrollIntoView({ behavior: 'smooth' })}
              className="group w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>{content.ctaPrimary}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => window.location.href = '/shop'}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold bg-accent/50 border border-border hover:bg-accent backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <Laptop className="w-5 h-5" />
              <span>{content.ctaSecondary}</span>
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 py-8 border-y border-border/50"
          >
            {content.indicators.map((indicator, i) => (
              <div key={i} className="flex items-center justify-center gap-3 text-sm font-medium text-muted-foreground group">
                <div className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  {i === 0 && <Award className="w-5 h-5 text-primary" />}
                  {i === 1 && <Shield className="w-5 h-5 text-primary" />}
                  {i === 2 && <Zap className="w-5 h-5 text-primary" />}
                </div>
                <span className="group-hover:text-foreground transition-colors">{indicator}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
