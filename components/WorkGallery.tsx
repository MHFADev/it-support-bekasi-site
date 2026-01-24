
import React from 'react';
import { motion } from 'framer-motion';

const GALLERY_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1591405351990-4726e331f121?auto=format&fit=crop&q=80&w=800', title: 'Motherboard Repair', category: 'Hardware' },
  { url: 'https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&q=80&w=800', title: 'Smart CCTV Setup', category: 'Security' },
  { url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800', title: 'Precision Assembly', category: 'Laptop Service' },
  { url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800', title: 'Advanced Diagnostics', category: 'Troubleshooting' },
  { url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800', title: 'System Maintenance', category: 'Optimasi' },
  { url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800', title: 'Client Consultation', category: 'Technical Support' },
];

const WorkGallery: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-black text-brand-500 tracking-[0.4em] uppercase mb-4">Our Operations</h2>
            <p className="text-4xl lg:text-5xl font-serif text-gray-900 dark:text-white leading-tight">
              Eksplorasi Fasilitas & <span className="italic text-brand-500">Standar Kerja</span> Kami
            </p>
          </div>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm text-sm font-medium leading-relaxed">
            Melihat lebih dekat bagaimana teknisi kami menangani setiap unit laptop, PC, dan sistem CCTV dengan presisi tinggi.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10">
          {GALLERY_IMAGES.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group relative rounded-[2rem] overflow-hidden aspect-square cursor-crosshair shadow-lg"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-brand-900/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <span className="text-[10px] font-black text-brand-400 uppercase tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  {img.category}
                </span>
                <h4 className="text-xl font-serif text-white transform translate-y-4 group-hover:translate-y-0 transition-transform delay-75">
                  {img.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkGallery;
