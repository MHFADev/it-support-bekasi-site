import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useApp } from '@/src/context/AppContext';
import { CONTACT_INFO } from '../constants';

const Hero: React.FC = () => {
  const { language } = useApp();
  
  const handleContact = () => {
    const msg = language === 'id' 
      ? 'Halo IT Support Bekasi, saya ingin service laptop/PC atau pasang CCTV.'
      : 'Hello IT Support Bekasi, I would like to service my laptop/PC or install CCTV.';
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center bg-white pt-20 overflow-hidden">
      {/* Background decoration - faint gradient blob */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 w-full py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Side: Card Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative z-10"
          >
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-50 relative overflow-hidden group">
              {/* Subtle hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative flex gap-6">
                {/* Vertical Gradient Bar */}
                <div className="w-2 rounded-full bg-gradient-to-b from-[#FF512F] to-[#DD2476] shrink-0" />
                
                <div className="flex-1">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.15] mb-6 font-sans tracking-tight">
                    Perbaiki <br />
                    Masalah IT <br />
                    Anda Dengan <br />
                    Cepat Dan <br />
                    Efektif
                  </h1>
                  
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-10 max-w-md">
                    IT Support Bekasi hadir untuk menyediakan layanan lengkap, 
                    mulai dari Service dan Maintenance hingga Instalasi CCTV, 
                    Website, dan Consulting IT, untuk memenuhi semua 
                    kebutuhan teknologi Anda.
                  </p>
                  
                  <button 
                    onClick={handleContact}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FF512F] to-[#DD2476] text-white px-8 py-4 rounded-full font-bold text-base md:text-lg shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 group/btn"
                  >
                    Baca Selengkapnya
                    <div className="bg-white/20 rounded-full p-1">
                      <ArrowRight size={16} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-1/2 relative h-[500px] md:h-[600px] flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              {/* Image Masking Effect to fade into white on the left */}
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-transparent to-transparent lg:w-1/3" />
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-white via-transparent to-transparent lg:h-1/4 bottom-0" />
              
              <img 
                src="https://images.unsplash.com/photo-1632910121591-29e2484c0259?ixlib=rb-4.1.0&q=80&w=1080" 
                alt="IT Technicians Working" 
                className="w-full h-full object-cover rounded-3xl lg:rounded-l-none lg:rounded-r-3xl mask-image-gradient"
                style={{ objectPosition: 'center 20%' }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
