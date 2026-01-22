
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
    <section className="py-32 bg-background relative overflow-hidden noise-bg">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="w-12 h-px bg-primary/40" />
              <h2 className="text-[10px] font-black text-primary tracking-[0.4em] uppercase">Our Operations</h2>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-serif text-foreground leading-[1.1]"
            >
              Standar <span className="text-primary italic">Presisi</span> & Fasilitas Kami
            </motion.p>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-sm text-lg font-light leading-relaxed lg:mb-2"
          >
            Melihat lebih dekat bagaimana teknisi kami menangani setiap unit dengan dedikasi tinggi dan peralatan mutakhir.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
          {GALLERY_IMAGES.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="group relative rounded-[2.5rem] overflow-hidden aspect-square cursor-none shadow-2xl border border-white/10"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                <span className="text-[10px] font-black text-white/70 uppercase tracking-[0.2em] mb-3 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                  {img.category}
                </span>
                <h4 className="text-2xl font-serif text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {img.title}
                </h4>
              </div>
              
              {/* Custom Cursor Overlay */}
              <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 text-white font-bold text-[10px] uppercase tracking-widest">View</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkGallery;
