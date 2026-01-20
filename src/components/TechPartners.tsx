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
    <section className="py-24 bg-accent/5 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold tracking-widest uppercase text-[10px] mb-4"
        >
          Professional Infrastructure
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold tracking-tight text-foreground"
        >
          Teknologi & <span className="text-primary">Kemitraan</span>
        </motion.h2>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-background to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-background to-transparent z-10"></div>
        
        <motion.div
          animate={{
            x: [0, -2000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
          className="flex gap-20 items-center whitespace-nowrap"
        >
          {scrollItems.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 group"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-8 md:h-12 w-auto object-contain dark:brightness-200 group-hover:scale-110 transition-transform"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechPartners;
