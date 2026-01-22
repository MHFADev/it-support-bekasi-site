import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Zap, Users, HeartHandshake, Headphones } from 'lucide-react';
import { CONTENT } from '../constants';
import { useApp } from '../context/AppContext';

const WhyChooseUs: React.FC = () => {
  const { language } = useApp();
  const content = CONTENT[language].whyChooseUs;

  const icons = [
    <ShieldCheck className="w-7 h-7" />,
    <Zap className="w-7 h-7" />,
    <Users className="w-7 h-7" />,
    <Headphones className="w-7 h-7" />
  ];

  return (
    <section id="why-us" className="py-32 bg-background relative overflow-hidden noise-bg">
      {/* Abstract decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] -z-10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] -z-10 rounded-full animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-panel text-primary font-bold tracking-widest uppercase text-[10px] mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
            {content.label}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card-premium group border-beam"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-8 border border-primary/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm group-hover:shadow-elegant">
                {icons[index] || <CheckCircle2 className="w-7 h-7" />}
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4 font-serif italic">
                {reason.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed font-light">
                {reason.desc}
              </p>
              
              {/* Card Footer Decoration */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
