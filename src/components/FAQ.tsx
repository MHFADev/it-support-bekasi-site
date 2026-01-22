import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus, HelpCircle } from 'lucide-react';
import { CONTENT } from '../constants';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';

const FAQ: React.FC = () => {
  const { language } = useApp();
  const content = CONTENT[language].faq;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 bg-accent/5 noise-bg relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-panel text-primary font-bold tracking-widest uppercase text-[10px] mb-6"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{content.label}</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-foreground font-serif"
          >
            {content.title}
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {content.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "rounded-[2rem] border transition-all duration-500 overflow-hidden",
                activeIndex === index 
                  ? "glass-panel shadow-elegant ring-1 ring-primary/20 border-primary/30" 
                  : "bg-card/40 border-border/50 hover:bg-card/60 hover:border-primary/20"
              )}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-8 text-left group"
              >
                <span className={cn(
                  "text-xl font-bold transition-colors font-serif italic",
                  activeIndex === index ? "text-primary" : "text-foreground group-hover:text-primary/70"
                )}>
                  {item.question}
                </span>
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500",
                  activeIndex === index 
                    ? "premium-gradient text-white rotate-180 shadow-glow" 
                    : "bg-accent/50 text-muted-foreground group-hover:bg-primary/10"
                )}>
                  <ChevronDown className="w-6 h-6" />
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.2, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-muted-foreground leading-relaxed font-light text-lg">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
