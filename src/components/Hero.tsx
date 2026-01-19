import React from 'react';
import { motion } from 'framer-motion';
import { Laptop, ShoppingBag, BadgeCheck, TrendingUp, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_INFO } from '@/constants';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-3xl"></div>
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6"
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-white text-sm font-semibold">Laptop Berkualitas #1 di Bekasi</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
            >
              Toko Laptop
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Terpercaya
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 mb-8 font-medium"
            >
              Laptop bekas berkualitas premium dengan harga terjangkau
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <BadgeCheck className="w-5 h-5 text-green-300" />
                <span className="text-white text-sm font-medium">100% Original</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Shield className="w-5 h-5 text-blue-300" />
                <span className="text-white text-sm font-medium">Garansi Resmi</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <TrendingUp className="w-5 h-5 text-yellow-300" />
                <span className="text-white text-sm font-medium">Harga Terbaik</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                to="/shop"
                className="group relative px-8 py-4 bg-white text-purple-600 font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/50 hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Belanja Sekarang
                </span>
              </Link>

              <a
                href="#products"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/30 transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:scale-105 flex items-center justify-center gap-2"
              >
                <Laptop className="w-5 h-5" />
                Lihat Produk
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-3 gap-6 mt-12 max-w-xl mx-auto lg:mx-0"
            >
              <div className="text-center lg:text-left bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-black text-yellow-300 mb-1">500+</div>
                <div className="text-sm text-white/80">Laptop Terjual</div>
              </div>
              <div className="text-center lg:text-left bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-black text-green-300 mb-1">100%</div>
                <div className="text-sm text-white/80">Garansi Original</div>
              </div>
              <div className="text-center lg:text-left bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl font-black text-blue-300 mb-1">4.9★</div>
                <div className="text-sm text-white/80">Rating</div>
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
                className="relative bg-white/20 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl"
              >
                <div className="aspect-video bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center">
                  <Laptop className="w-32 h-32 text-white" />
                </div>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">Premium Quality</span>
                    <BadgeCheck className="w-6 h-6 text-green-300" />
                  </div>
                  <div className="text-3xl font-black text-white">Mulai dari 3 Jutaan</div>
                  <div className="text-white/80 font-medium">Garansi resmi tersedia</div>
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
                className="absolute -top-6 -left-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-5 shadow-2xl"
              >
                <ShoppingBag className="w-10 h-10 text-white" />
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
                className="absolute -bottom-6 -right-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-5 shadow-2xl"
              >
                <BadgeCheck className="w-10 h-10 text-white" />
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
