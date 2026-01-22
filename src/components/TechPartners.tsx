import React from 'react';
import { motion } from 'framer-motion';

const PARTNERS = [
  { name: 'Acer', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Acer_Logo.svg' },
  { name: 'Cisco', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg' },
  { name: 'Lenovo', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg' },
  { name: 'ThinkPad', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/ThinkPad_logo.svg' },
  { name: 'MikroTik', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/MikroTik_Logo.svg' },
  { name: 'ASUS', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Asus_logo.svg' },
  { name: 'TP-Link', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/TP-Link_logo.svg' },
];

const TechPartners: React.FC = () => {
  const scrollItems = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section className="py-32 bg-background relative overflow-hidden noise-bg">
      <div className="container mx-auto px-4 md:px-6 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-panel text-primary font-bold tracking-widest uppercase text-[10px] mb-6"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
          Trusted Partners
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tight text-foreground font-serif"
        >
          Kemitraan <span className="text-primary italic underline underline-offset-8 decoration-primary/20">Strategis</span>
        </motion.h2>
      </div>

      <div className="relative mt-16 group">
        {/* Alpha Mask for Marquee edges */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background to-transparent z-10" />
        
        <div className="flex flex-col gap-12 overflow-hidden py-10">
          <motion.div
            animate={{ x: [0, -2000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
            className="flex gap-32 items-center whitespace-nowrap px-16"
          >
            {scrollItems.map((partner, index) => (
              <motion.div
                key={`single-row-${partner.name}-${index}`}
                whileHover={{ 
                  scale: 1.15, 
                  filter: "grayscale(0%) opacity(100%)",
                }}
                className="flex items-center justify-center grayscale opacity-20 transition-all duration-500 cursor-pointer p-6 rounded-[2rem] glass-panel border-transparent hover:border-primary/20 group/logo"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-14 md:h-20 w-auto object-contain dark:invert transition-all duration-500 group-hover/logo:brightness-110"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechPartners;
