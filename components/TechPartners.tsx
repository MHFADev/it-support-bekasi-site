
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
  // Triple the items for a seamless, never-ending scroll
  const scrollItems = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section className="py-24 bg-gray-50/50 dark:bg-dark-bg/50 border-y border-gray-100 dark:border-dark-border/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-12 h-[1px] bg-brand-500/30" />
            <h2 className="text-[11px] font-black text-brand-500 uppercase tracking-[0.6em]">Professional Infrastructure</h2>
            <div className="w-12 h-[1px] bg-brand-500/30" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-serif text-gray-900 dark:text-white"
          >
            Technology <span className="italic text-brand-500 font-medium">Solutions</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wide"
          >
            Partnering with global industry leaders to provide reliable IT excellence.
          </motion.p>
        </div>
      </div>

      <div className="relative flex items-center">
        {/* Marquee Animation */}
        <motion.div
          animate={{
            x: [0, -2800], // Constant smooth motion
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 60, // Slower for a more "calm/premium" feel
              ease: "linear",
            },
          }}
          className="flex gap-28 items-center whitespace-nowrap"
        >
          {scrollItems.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex items-center justify-center min-w-[140px] px-4 group cursor-pointer"
            >
              <img
                src={partner.logo}
                alt={`${partner.name} certified solution`}
                className="h-8 md:h-10 w-auto object-contain transition-all duration-700 
                           grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110
                           dark:invert dark:brightness-150 dark:group-hover:invert-0 dark:group-hover:brightness-100"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>

        {/* Premium Edge Fades (Glassmorphism effect on the sides) */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-gray-50 dark:from-dark-bg to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-gray-50 dark:from-dark-bg to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

export default TechPartners;
