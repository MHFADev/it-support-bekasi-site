import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Using Simple Icons CDN - reliable, no rate limits, free for commercial use
const PARTNERS = [
  { name: 'Acer', logo: 'https://cdn.simpleicons.org/acer/83B81A' },
  { name: 'Cisco', logo: 'https://cdn.simpleicons.org/cisco/1BA0D7' },
  { name: 'Lenovo', logo: 'https://cdn.simpleicons.org/lenovo/E2231A' },
  { name: 'Dell', logo: 'https://cdn.simpleicons.org/dell/007DB8' },
  { name: 'HP', logo: 'https://cdn.simpleicons.org/hp/0096D6' },
  { name: 'ASUS', logo: 'https://cdn.simpleicons.org/asus/000000' },
  { name: 'Intel', logo: 'https://cdn.simpleicons.org/intel/0071C5' },
];

// Logo component with error handling - continues showing other logos if one fails
const PartnerLogo: React.FC<{ partner: { name: string; logo: string }; index: number }> = ({ partner, index }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // If error, hide this item but don't affect others
  if (hasError) {
    return null;
  }

  return (
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
        className={`h-12 md:h-16 w-auto object-contain dark:brightness-200 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </motion.div>
  );
};

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
              <PartnerLogo key={`logo-${partner.name}-${index}`} partner={partner} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechPartners;
