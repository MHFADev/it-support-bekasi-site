
import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../constants';
import { ArrowRight } from 'lucide-react';
import { useApp } from '@/src/context/AppContext';

const Services: React.FC = () => {
  const { language } = useApp();
  const t = CONTENT[language].services;

  return (
    <section id="services" className="py-20 md:py-32 bg-gray-50 dark:bg-dark-surface/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-[1px] bg-brand-500/30" />
            <h2 className="text-[10px] sm:text-[11px] font-black text-brand-500 tracking-premium uppercase">{t.label}</h2>
            <div className="w-10 h-[1px] bg-brand-500/30" />
          </div>
          <p className="text-3xl sm:text-4xl lg:text-6xl font-serif text-gray-900 dark:text-white mb-6 sm:mb-8 tracking-tight leading-tight">
            {t.title.split(' ').map((word, i) => (
              word === 'Kebutuhan' || word === 'Need' ? <span key={i} className="italic text-brand-500 font-medium">{word} </span> : word + ' '
            ))}
          </p>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed px-4">
            {t.desc}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {t.items.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
              }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: false, amount: 0.1 }}
              className="group relative bg-white dark:bg-dark-surface rounded-[2.5rem] sm:rounded-[3rem] border border-gray-100 dark:border-dark-border shadow-sm hover:shadow-2xl hover:shadow-brand-500/5 transition-all duration-500 overflow-hidden flex flex-col h-full"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden shrink-0">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-900/40 mix-blend-multiply opacity-20 group-hover:opacity-60 transition-opacity" />
                <div className="absolute top-6 left-6 sm:top-8 sm:left-8 w-12 h-12 sm:w-14 sm:h-14 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md rounded-xl sm:rounded-2xl flex items-center justify-center text-brand-500 shadow-2xl border border-white/20">
                  {service.icon}
                </div>
              </div>

              <div className="p-8 sm:p-10 flex flex-col flex-grow">
                <h3 className="text-xl sm:text-2xl font-serif text-gray-900 dark:text-white mb-4 leading-tight tracking-tight group-hover:text-brand-500 transition-colors">{service.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm sm:text-base leading-relaxed font-medium">
                  {service.description}
                </p>
                
                <div className="mt-auto pt-6 sm:pt-8 border-t border-gray-100 dark:border-dark-border flex justify-end">
                  <motion.div 
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 dark:bg-dark-bg text-gray-400 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-all duration-500 shadow-sm"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
