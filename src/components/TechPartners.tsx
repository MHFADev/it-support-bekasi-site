import React from 'react';
import { motion } from 'framer-motion';

const PARTNERS = [
  { name: 'Acer', logo: 'https://cdn.jsdelivr.net/gh/mhfadev/asset@main/logo/06a6a175-34f2-47ff-bb0d-6b94aa1c8fb7.png' },
  { name: 'Cisco', logo: 'https://cdn.jsdelivr.net/gh/mhfadev/asset@main/logo/d71b6916-c1cd-494a-a15d-28c1f9fa7fd8.png' },
  { name: 'Lenovo', logo: 'https://cdn.jsdelivr.net/gh/mhfadev/asset@main/logo/download (4).png' },
  { name: 'ThinkPad', logo: 'https://cdn.jsdelivr.net/gh/mhfadev/asset@main/logo/dac05710-ded8-4a31-bb72-90c6d1e4c7cb.png' },
  { name: 'MikroTik', logo: 'https://cdn.jsdelivr.net/gh/mhfadev/asset@main/logo/8e0a1c26-a73c-4bbb-a433-a088bcc16d3f.png' },
  { name: 'ASUS', logo: 'https://cdn.jsdelivr.net/gh/mhfadev/asset@main/logo/ce78fb15-5715-4111-8e3e-6992465593a5.png' },
  { name: 'TP-Link', logo: 'https://cdn.jsdelivr.net/gh/mhfadev/asset@main/logo/8cd98100-effe-4f88-bac6-c630f9176713.png' },
];

const TechPartners: React.FC = () => {
  const scrollItems = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-black tracking-widest uppercase text-[10px] mb-4 border border-primary/20"
        >
          Trusted Partners
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-3xl md:text-5xl font-black tracking-tight text-foreground"
        >
          Teknologi & <span className="text-primary relative inline-block">
            Kemitraan
            <motion.span 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-2 left-0 h-1 bg-primary/20 rounded-full"
            />
          </span>
        </motion.h2>
      </div>

      <div className="relative mt-12 px-4">
        <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background to-transparent z-10 hidden md:block"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent z-10 hidden md:block"></div>
        
        <div className="flex flex-col gap-12 overflow-hidden">
          <motion.div
            animate={{ x: [0, -1500] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            className="flex gap-24 items-center whitespace-nowrap px-12"
          >
            {scrollItems.map((partner, index) => (
              <motion.div
                key={`single-row-${partner.name}-${index}`}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: [0, -5, 5, -5, 0],
                  filter: "grayscale(0%) opacity(100%)",
                }}
                transition={{
                  rotate: { duration: 0.5, repeat: Infinity },
                  scale: { duration: 0.2 }
                }}
                className="flex items-center justify-center grayscale opacity-30 transition-all duration-300 cursor-pointer p-4 rounded-2xl hover:bg-primary/5 border border-transparent hover:border-primary/10"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 md:h-16 w-auto object-contain dark:brightness-200"
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
