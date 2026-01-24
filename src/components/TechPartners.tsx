import React from 'react';
import { motion } from 'framer-motion';

const PARTNERS = [
  { name: 'CISCO', logo: 'https://raw.githubusercontent.com/mhfadev/asset/main/logo/d71b6916-c1cd-494a-a15d-28c1f9fa7fd8.png' },
  { name: 'Mikrotik', logo: 'https://raw.githubusercontent.com/mhfadev/asset/main/logo/8e0a1c26-a73c-4bbb-a433-a088bcc16d3f.png' },
  { name: 'tp-link', logo: 'https://raw.githubusercontent.com/mhfadev/asset/main/logo/8cd98100-effe-4f88-bac6-c630f9176713.png' },
  { name: 'Lenovo', logo: 'https://raw.githubusercontent.com/mhfadev/asset/main/logo/download (4).png' },
  { name: 'Acer', logo: 'https://raw.githubusercontent.com/mhfadev/asset/main/logo/06a6a175-34f2-47ff-bb0d-6b94aa1c8fb7.png' },
  { name: 'ThinkPad', logo: 'https://raw.githubusercontent.com/mhfadev/asset/main/logo/dac05710-ded8-4a31-bb72-90c6d1e4c7cb.png' },
  { name: 'ASUS', logo: 'https://raw.githubusercontent.com/mhfadev/asset/main/logo/ce78fb15-5715-4111-8e3e-6992465593a5.png' },
];

const TechPartners: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-6 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider rounded-full mb-4"
          >
            Technology Solutions
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6"
          >
            Trusted <span className="text-blue-600 dark:text-blue-400">Technology Partners</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Collaborating with industry leaders to deliver cutting-edge solutions
          </motion.p>
        </div>

        {/* Logo Grid - SEDERHANA dan JELAS */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
            {PARTNERS.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                {/* Logo Container */}
                <div className="w-full h-24 flex items-center justify-center mb-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-16 w-auto object-contain dark:brightness-100"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback jika gambar error
                      console.error(`Failed to load logo for ${partner.name}`);
                      e.currentTarget.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'h-16 flex items-center justify-center';
                      fallback.innerHTML = `
                        <div class="text-center">
                          <div class="text-2xl font-bold text-gray-400">${partner.name.charAt(0)}</div>
                          <div class="text-xs text-gray-500 mt-1">LOGO</div>
                        </div>
                      `;
                      e.currentTarget.parentElement?.appendChild(fallback);
                    }}
                  />
                </div>
                
                {/* Partner Name */}
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <h3 className="font-bold text-gray-800 dark:text-white text-lg">
                    {partner.name}
                  </h3>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Alternative: Horizontal Scrolling untuk banyak logo */}
        <div className="mt-16">
          <div className="relative overflow-hidden">
            {/* Gradient edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10"></div>
            
            {/* Scrolling logos */}
            <div className="flex items-center space-x-12 py-8 animate-scroll">
              {[...PARTNERS, ...PARTNERS].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center"
                >
                  <div className="w-48 h-20 flex items-center justify-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Debug Info - bisa dihapus di production */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center text-sm text-gray-500">
            <p className="mb-2">Debug Info: {PARTNERS.length} partners loaded</p>
            <div className="flex flex-wrap justify-center gap-2">
              {PARTNERS.map(partner => (
                <a
                  key={partner.name}
                  href={partner.logo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  {partner.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS untuk animasi scroll */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 3rem)); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
          display: flex;
          width: max-content;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TechPartners;          {PARTNERS.map(partner => (
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
