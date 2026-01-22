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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 noise-bg">
      {/* Background with subtle gradient and imagery */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/80 to-accent/20 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1507764923504-cd90bf7da772?q=80&w=1920" 
          alt="Tech Background" 
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)] z-20" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.2, 0, 0.2, 1] }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-primary-foreground mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium tracking-wider uppercase">{content.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.2, 0, 0.2, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.1] font-serif text-glow"
            >
              {content.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.2, 0, 0.2, 1] }}
              className="text-lg sm:text-xl text-white/90 mb-12 max-w-xl leading-relaxed font-light italic"
            >
              {content.desc}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.2, 0, 0.2, 1] }}
              className="flex flex-wrap gap-6"
            >
              <button
                onClick={() => document.getElementById('shop-premium')?.scrollIntoView({ behavior: 'smooth' })}
                className="premium-gradient text-white px-10 py-4 rounded-full font-bold shadow-[0_0_20px_rgba(var(--accent),0.3)] hover:scale-105 transition-all duration-300 group"
              >
                <span className="flex items-center gap-2">
                  {content.ctaPrimary}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="glass-panel text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all duration-300"
              >
                Hubungi Kami
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.2, 0, 0.2, 1] }}
            className="hidden lg:block relative"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/40 backdrop-blur-sm">
                <img 
                  src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1200" 
                  alt="Professional Tech" 
                  className="w-full h-auto object-cover opacity-90 transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Floating Card */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 glass-panel p-6 rounded-2xl shadow-2xl min-w-[240px]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary-foreground border border-primary/30">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Layanan Premium</p>
                    <p className="text-xs text-white/60">Garansi Kepuasan 100%</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Stats Card */}
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-10 -right-10 glass-panel p-6 rounded-2xl shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent border border-accent/30">
                    <Zap className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Respon Cepat</p>
                    <p className="text-xs text-white/60">IT Support Bekasi</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
