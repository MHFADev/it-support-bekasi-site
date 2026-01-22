import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../constants';
import { useApp } from '../context/AppContext';
import { ArrowRight, ChevronRight } from 'lucide-react';

const Services: React.FC = () => {
  const { language } = useApp();
  const content = CONTENT[language].services;

  return (
    <section id="services" className="py-32 relative overflow-hidden bg-accent/5 noise-bg">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="w-16 h-px bg-primary/40"></span>
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px]">
              {content.label}
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-8 font-serif"
          >
            {content.title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-xl text-muted-foreground leading-relaxed max-w-3xl font-light"
          >
            {content.desc}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.items.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group card-premium h-full flex flex-col border-beam"
            >
              {/* Image background on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                <img src={service.image} alt="" className="w-full h-full object-cover grayscale scale-110 group-hover:scale-100 transition-transform duration-1000 ease-premium" />
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-8 border border-primary/10 group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm group-hover:shadow-elegant">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors font-serif italic">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-8 font-light flex-1">
                  {service.description}
                </p>

                <button className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest group/btn mt-auto">
                  <span>Konsultasi Layanan</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-32 p-12 rounded-[3rem] premium-gradient text-white flex flex-col lg:flex-row items-center justify-between gap-12 shadow-[0_20px_50px_rgba(var(--primary),0.2)] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div className="text-center lg:text-left relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Butuh Layanan IT Kustom?</h3>
            <p className="text-white/80 text-lg max-w-xl font-light">Konsultasikan kebutuhan spesifik perusahaan Anda dengan tenaga ahli kami untuk solusi paling efisien.</p>
          </div>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-12 py-5 bg-white text-primary rounded-full font-bold hover:bg-white/90 transition-all flex items-center gap-3 shadow-2xl hover:scale-105 active:scale-95"
          >
            <span>Hubungi Teknisi Kami</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
