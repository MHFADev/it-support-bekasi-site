
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { CONTENT } from '../constants';
import { useApp } from '@/src/context/AppContext';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { language } = useApp();
  const t = CONTENT[language].faq;

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-brand-500 tracking-widest uppercase mb-4">{t.label}</h2>
          <p className="text-4xl font-serif text-gray-900 dark:text-white">{t.title}</p>
        </div>

        <div className="space-y-4">
          {t.items.map((faq, index) => (
            <div 
              key={index}
              className="border dark:border-dark-border rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors"
              >
                <span className="text-lg font-bold text-gray-900 dark:text-white">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="p-6 pt-0 text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
