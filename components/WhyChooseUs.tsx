
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Users, ThumbsUp } from 'lucide-react';
import { useApp } from '@/src/context/AppContext';
import { CONTENT } from '../constants';

const WhyChooseUs: React.FC = () => {
  const { language } = useApp();
  const t = CONTENT[language].whyChooseUs;
  
  const icons = [<Shield className="w-8 h-8" />, <Clock className="w-8 h-8" />, <Users className="w-8 h-8" />, <ThumbsUp className="w-8 h-8" />];

  return (
    <section className="py-24 bg-brand-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[100px]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-brand-400 font-bold tracking-widest uppercase mb-4">{t.label}</h2>
          <p className="text-4xl font-serif mb-6">{t.title}</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {t.reasons.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-400 border border-white/10">
                {icons[i]}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
