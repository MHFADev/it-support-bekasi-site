import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, ShoppingBag, BadgeCheck, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_INFO } from '@/constants';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.2),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30 mb-6"
            >
              <BadgeCheck className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">Garansi 100% Original</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              {SITE_INFO.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-8"
            >
              {SITE_INFO.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 mb-10 text-lg max-w-xl mx-auto lg:mx-0"
            >
              {SITE_INFO.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                to="/shop"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Lihat Katalog
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <a
                href="#services"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/20 transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:scale-105 flex items-center justify-center gap-2"
              >
                <Wrench className="w-5 h-5" />
                Layanan Jasa
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-6 mt-12 max-w-xl mx-auto lg:mx-0"
            >
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-blue-400 mb-1">500+</div>
                <div className="text-sm text-gray-400">Laptop Terjual</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-blue-400 mb-1">100%</div>
                <div className="text-sm text-gray-400">Garansi Original</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-blue-400 mb-1">24/7</div>
                <div className="text-sm text-gray-400">Support</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Laptop Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Floating Laptop Card */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-900/50 to-slate-900/50 rounded-xl flex items-center justify-center">
                  <Laptop className="w-32 h-32 text-blue-400" />
                </div>
                
                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 font-medium">Premium Quality</span>
                    <BadgeCheck className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">Mulai dari 3 Jutaan</div>
                  <div className="text-gray-400">Garansi resmi tersedia</div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  x: [0, 5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-6 -left-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 shadow-xl"
              >
                <ShoppingBag className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  x: [0, -5, 0]
                }}
                transition={{ 
                  duration: 3.5, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute -bottom-6 -right-6 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 shadow-xl"
              >
                <Wrench className="w-8 h-8 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
