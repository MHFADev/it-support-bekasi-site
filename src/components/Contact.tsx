import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';
import { CONTACT_INFO, CONTENT } from '../constants';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

const Contact: React.FC = () => {
  const { language } = useApp();
  const content = CONTENT[language].contact;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { blink } = await import('../lib/blink');
      await blink.db.contactMessages.create({
        id: crypto.randomUUID(),
        ...formData,
        status: 'unread'
      });

      toast.success(content.form.success, {
        description: content.form.successDesc
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting message:', error);
      toast.error('Gagal mengirim pesan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    { icon: <Phone />, label: content.items[0], value: `+${CONTACT_INFO.whatsapp}`, action: () => window.open(CONTACT_INFO.whatsappUrl || `https://wa.me/${CONTACT_INFO.whatsapp}`) },
    { icon: <Mail />, label: content.items[1], value: CONTACT_INFO.email, action: () => window.location.href = `mailto:${CONTACT_INFO.email}` },
    { icon: <MapPin />, label: content.items[2], value: CONTACT_INFO.address, action: () => window.open(CONTACT_INFO.mapsUrl) },
    { icon: <Clock />, label: content.items[3], value: "09:00 - 21:00 WIB", action: null }
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Info Side */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold tracking-widest uppercase text-xs mb-4">
                {content.label}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                {content.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {content.desc}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  onClick={item.action || undefined}
                  className={cn(
                    "p-6 rounded-2xl border border-border bg-card/50 transition-all group",
                    item.action ? "hover:bg-accent hover:border-primary/30 cursor-pointer" : ""
                  )}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-1">{item.label}</p>
                  <p className="text-foreground font-semibold break-words">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-linear-to-r from-primary/10 to-purple-500/10 rounded-[3rem] blur-3xl -z-10"></div>
            <div className="bg-card border border-border rounded-[2.5rem] p-8 md:p-12 shadow-2xl elegant-shadow">
              <h3 className="text-2xl font-bold mb-8">{content.form.title}</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{content.form.name}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-accent/50 border border-border rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-hidden"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{content.form.email}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-accent/50 border border-border rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-hidden"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{content.form.msg}</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Apa yang bisa kami bantu?"
                    className="w-full bg-accent/50 border border-border rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-hidden resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground py-5 rounded-2xl font-bold shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{content.form.submit}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full h-[500px] rounded-[3rem] overflow-hidden border border-border shadow-2xl mt-12 relative group"
        >
          {/* Professional Overlay Card */}
          <div className="absolute top-6 left-6 z-10 hidden md:block">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-card/95 backdrop-blur-md border border-border p-6 rounded-2xl shadow-xl max-w-xs"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-base">IT Support Bekasi</h4>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Workshop Kami</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                {CONTACT_INFO.address}
              </p>
              <button 
                onClick={() => window.open(CONTACT_INFO.mapsUrl)}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                <span>Petunjuk Arah</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </div>

          {/* Map Iframe with more precise query for Pin */}
          <iframe
            className="block w-full h-full"
            src="https://maps.google.com/maps?width=600&height=400&hl=id&q=Jl. Raya Pd. Benda No.28, RT.005/RW.002, Jatirasa, Kec. Jatiasih, Kota Bks, Jawa Barat 17424&t=&z=16&ie=UTF8&iwloc=B&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi IT Support Bekasi"
          />
          
          {/* Bottom Floating Button for Mobile */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden">
            <button 
              onClick={() => window.open(CONTACT_INFO.mapsUrl)}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-full shadow-xl font-bold flex items-center gap-2 whitespace-nowrap"
            >
              <MapPin className="w-4 h-4" />
              <span>Buka di Google Maps</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
