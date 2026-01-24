import React from 'react';
import { motion } from 'framer-motion';

const PARTNERS = [
  { name: 'Acer', logo: 'https://raw.githubusercontent.com/mhfadev/asset/main/logo/06a6a175-34f2-47ff-bb0d-6b94aa1c8fb7.png' },
  { name: 'Cisco', logo: 'https://raw.githubusercontent.com/mhfadev/asset/main/logo/d71b6916-c1cd-494a-a15d-28c1f9fa7fd8.png' },
  { name: 'Lenovo', logo: 'https://raw.githubusercontent.com/mhfadev/asset/main/logo/download(4).png' },
  { name: 'ThinkPad', logo: 'https://raw.githubusercontent.com/mhfadev/asset/main/logo/dac05710-ded8-4a31-bb72-90c6d1e4c7cb.png' },
  { name: 'MikroTik', logo: 'https://raw.githubusercontent.com/mhfadev/asset/main/logo/8e0a1c26-a73c-4bbb-a433-a088bcc16d3f.png' },
  { name: 'ASUS', logo: 'https://raw.githubusercontent.com/mhfadev/asset/main/logo/ce78fb15-5715-4111-8e3e-6992465593a5.png' },
  { name: 'TP-Link', logo: 'https://raw.githubusercontent.com/mhfadev/asset/main/logo/8cd98100-effe-4f88-bac6-c630f9176713.png' },
];

const TechPartners: React.FC = () => {
  const scrollItems = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section className="py-24 bg-background">
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

      {/* PERUBAHAN UTAMA: Hapus overflow-hidden di parent, atur z-index dengan benar */}
      <div className="relative">
        {/* Gradient overlay - turunkan z-index */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background via-background/90 to-transparent z-20 hidden md:block"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background via-background/90 to-transparent z-20 hidden md:block"></div>
        
        {/* Container untuk logo - naikkan z-index */}
        <div className="overflow-hidden py-8">
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
            className="flex gap-24 items-center whitespace-nowrap z-30 relative"
          >
            {scrollItems.map((partner, index) => (
              <motion.div
                key={`single-row-${partner.name}-${index}`}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 0,
                  filter: "grayscale(0%)",
                  opacity: 1,
                }}
                className="flex items-center justify-center grayscale opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer p-4 rounded-xl"
              >
                <div className="relative group">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-12 md:h-16 w-auto object-contain"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback text jika gambar gagal
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const fallback = document.createElement('div');
                        fallback.className = 'h-12 md:h-16 flex items-center justify-center min-w-[80px]';
                        fallback.innerHTML = `<span class="text-xs font-bold text-gray-500">${partner.name}</span>`;
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                  {/* Tooltip untuk debug */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {partner.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Debug info */}
      <div className="text-center mt-8 text-sm text-gray-500">
        <p>Menampilkan {PARTNERS.length} partner teknologi</p>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {PARTNERS.map(partner => (
            <span key={partner.name} className="px-2 py-1 bg-gray-100 rounded text-xs">
              {partner.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechPartners;
