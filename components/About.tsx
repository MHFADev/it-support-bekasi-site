
import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/src/context/AppContext';
import { CONTENT } from '../constants';

const About: React.FC = () => {
  const { language } = useApp();
  const t = CONTENT[language].about;

  return (
    <section id="about" className="py-20 md:py-32 bg-gray-50 dark:bg-dark-surface/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Images Container - Mobile First: Order 1, Desktop: Order 1 */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 md:gap-6 relative order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="col-span-2 rounded-[2rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl aspect-video border-[1px] border-gray-200 dark:border-dark-border"
            >
              <img 
                src="https://images.unsplash.com/photo-1597872200370-493dee2474a6?auto=format&fit=crop&q=80&w=1200" 
                alt="Professional Workspace" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl aspect-square border-[1px] border-gray-200 dark:border-dark-border -mt-8 md:-mt-16 relative z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600" 
                alt="Technical Precision" 
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl aspect-square border-[1px] border-gray-200 dark:border-dark-border -mt-12 md:-mt-24 relative z-20"
            >
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600" 
                alt="Hardware Repair" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Content Container - Order 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 order-2"
          >
            <div className="flex items-center gap-4 mb-6 md:mb-8">
               <div className="w-10 h-[2px] bg-brand-500" />
               <h2 className="text-[10px] md:text-[11px] font-black text-brand-500 tracking-premium uppercase">{t.label}</h2>
            </div>
            
            <p className="text-3xl md:text-4xl lg:text-6xl font-serif text-gray-900 dark:text-white mb-6 md:mb-10 leading-[1.1] tracking-tight">
              {t.title.split(' ').map((word, i) => (
                ['Performa', 'Performance', 'Perangkat', 'Device'].includes(word) ? <span key={i} className="italic text-brand-500 font-medium">{word} </span> : word + ' '
              ))}
            </p>
            
            <div className="space-y-6 md:space-y-8 text-gray-500 dark:text-gray-400 leading-relaxed font-medium text-base md:text-lg">
              <p>{t.p1}</p>
              <p>{t.p2}</p>
            </div>

            <div className="grid grid-cols-2 gap-8 md:gap-12 mt-12 md:mt-16 pt-8 md:pt-12 border-t dark:border-dark-border">
              <div>
                <p className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter">100%</p>
                <p className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-premium font-black mt-2 md:mt-3">{t.stats[0]}</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter">2.5k+</p>
                <p className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-premium font-black mt-2 md:mt-3">{t.stats[1]}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
