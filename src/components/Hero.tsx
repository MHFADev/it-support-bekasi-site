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
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-28 bg-primary">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_60%)]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-300/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4"></div>
      </div>
      
      {/* Bottom transition gradient to background */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10 opacity-40"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-10 sm:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="text-left order-2 lg:order-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-primary mb-8 shadow-2xl"
            >
              <span className="text-[13px] font-black uppercase tracking-[0.1em]">{content.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight text-white mb-8 leading-[1.1] sm:leading-[1]"
            >
              {content.title.split(',').map((part, i) => (
                <span key={i} className="block">
                  {part.trim()}{i === 0 ? ',' : ''}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-white/90 mb-12 max-w-xl leading-relaxed font-medium"
            >
              {content.desc}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-5"
            >
              <Button asChild size="lg" className="rounded-2xl px-12 h-16 font-black text-xl bg-blue-700 hover:bg-blue-800 text-white shadow-[0_20px_50px_rgba(29,78,216,0.3)] transition-all hover:scale-[1.03] active:scale-[0.97] border-none">
                <Link to="/shop">{content.ctaSecondary}</Link>
              </Button>
              <Button asChild size="lg" className="rounded-2xl px-12 h-16 font-black text-xl bg-white hover:bg-white/90 text-slate-900 shadow-xl transition-all hover:scale-[1.03] active:scale-[0.97] border-none">
                <a href="#shop">{content.ctaPrimary}</a>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative z-10 group">
              {/* Main Image Container */}
              <div className="relative rounded-[2rem] sm:rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] bg-blue-900/10 backdrop-blur-sm border-4 border-white/10 group-hover:border-white/20 transition-all duration-700">
                <img 
                  src="https://cdn.jsdelivr.net/gh/mhfadev/asset@main/itsupport/20260203_120154_0000.png" 
                  alt="Technician working" 
                  className="w-full h-auto object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>

              {/* Advanced Decorative Elements */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, -3, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-8 w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 flex items-center justify-center z-20 hidden md:flex"
              >
                <Laptop className="w-10 h-10 text-white opacity-80" />
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 bg-white p-6 rounded-[2rem] shadow-2xl border border-white/20 z-20 hidden md:block"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-base font-black text-slate-900 leading-none mb-1">Garansi Unit</p>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">100% Aman</p>
                  </div>
                </div>
              </motion.div>

              {/* Glowing Background Glows */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-400/30 blur-[100px] rounded-full -z-10 animate-pulse"></div>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/30 blur-[120px] rounded-full -z-10 animate-pulse delay-700"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;