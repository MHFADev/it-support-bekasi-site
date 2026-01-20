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
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 z-0 bg-[#F0F3F7]">
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 text-primary mb-6"
            >
              <span className="text-sm font-bold">{content.badge}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#212121] mb-6 leading-tight"
            >
              {content.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-[#6D7588] mb-10 max-w-xl leading-relaxed"
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
              <button
                onClick={() => document.getElementById('shop-premium')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary text-white px-10 py-3 rounded-lg font-bold shadow-sm hover:brightness-110 transition-all"
              >
                {content.ctaPrimary}
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200" 
                alt="Premium Laptop" 
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Kualitas Terjamin</p>
                  <p className="text-[10px] text-muted-foreground">QC 100% Lulus</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
