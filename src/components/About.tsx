
import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { CONTENT } from '../constants';

const About: React.FC = () => {
  const { language } = useApp();
  const t = CONTENT[language].about;

  return (
    <section id="about" className="py-32 bg-background relative overflow-hidden noise-bg">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Images Container */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="col-span-2 rounded-[3rem] overflow-hidden shadow-2xl aspect-video border border-white/10 glass-panel"
            >
              <img 
                src="https://images.unsplash.com/photo-1597872200370-493dee2474a6?q=80&w=1200" 
                alt="Professional Workspace" 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-square border border-white/10 glass-panel -mt-12 md:-mt-20 relative z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600" 
                alt="Technical Precision" 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="rounded-[2.5rem] overflow-hidden shadow-2xl aspect-square border border-white/10 glass-panel -mt-16 md:-mt-28 relative z-20"
            >
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600" 
                alt="Hardware Repair" 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
              />
            </motion.div>
          </div>

          {/* Content Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-px bg-primary/40" />
               <h2 className="text-[10px] font-black text-primary tracking-[0.3em] uppercase">{t.label}</h2>
            </div>
            
            <p className="text-4xl md:text-6xl font-serif text-foreground mb-10 leading-[1.1] tracking-tight">
              {t.title.split(' ').map((word, i) => (
                ['Performa', 'Performance', 'Perangkat', 'Device'].includes(word) ? <span key={i} className="text-primary italic font-medium italic-glow">{word} </span> : word + ' '
              ))}
            </p>
            
            <div className="space-y-8 text-muted-foreground leading-relaxed font-light text-lg mb-12">
              <p>{t.p1}</p>
              <p>{t.p2}</p>
            </div>

            <div className="grid grid-cols-2 gap-12 pt-12 border-t border-border/50">
              <div className="group">
                <p className="text-5xl font-black text-primary tracking-tighter group-hover:scale-110 transition-transform duration-500 origin-left">100%</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-3">{t.stats[0]}</p>
              </div>
              <div className="group">
                <p className="text-5xl font-black text-foreground tracking-tighter group-hover:scale-110 transition-transform duration-500 origin-left">2.5k+</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-3">{t.stats[1]}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
