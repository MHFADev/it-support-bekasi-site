import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../constants';
import { useApp } from '../context/AppContext';
import { ArrowRight, ChevronRight } from 'lucide-react';

const Services: React.FC = () => {
  const { language } = useApp();
  const content = CONTENT[language].services;

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-accent/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-12 h-px bg-primary"></span>
            <span className="text-primary font-bold tracking-widest uppercase text-xs">
              {content.label}
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6"
          >
            {content.title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            {content.desc}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.items.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative bg-card p-8 rounded-3xl border border-border shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden"
            >
              {/* Image background on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                <img src={service.image} alt="" className="w-full h-full object-cover grayscale" />
              </div>

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <button className="flex items-center gap-2 text-primary font-bold text-sm group/btn">
                  <span>Pelajari Selengkapnya</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-[2rem] bg-linear-to-r from-primary to-purple-600 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-primary/20"
        >
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Butuh Layanan IT Kustom?</h3>
            <p className="text-white/80">Konsultasikan kebutuhan spesifik perusahaan Anda dengan tenaga ahli kami.</p>
          </div>
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-background text-primary rounded-2xl font-bold hover:bg-accent transition-colors flex items-center gap-2"
          >
            <span>Hubungi Kami Sekarang</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
