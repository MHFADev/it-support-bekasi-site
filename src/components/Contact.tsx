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
    { icon: <Phone className="w-6 h-6" />, label: content.items[0], value: `+${CONTACT_INFO.whatsapp}`, action: () => window.open(`https://wa.me/${CONTACT_INFO.whatsapp}`) },
    { icon: <Mail className="w-6 h-6" />, label: content.items[1], value: CONTACT_INFO.email, action: () => window.location.href = `mailto:${CONTACT_INFO.email}` },
    { icon: <MapPin className="w-6 h-6" />, label: content.items[2], value: CONTACT_INFO.address, action: () => window.open(CONTACT_INFO.mapsUrl) },
    { icon: <Clock className="w-6 h-6" />, label: content.items[3], value: "09:00 - 21:00 WIB", action: null }
  ];

  return (
    <section id="contact" className="py-32 relative noise-bg overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.05)_0%,transparent_70%)] -z-10" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Info Side */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <span className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-panel text-primary font-bold tracking-widest uppercase text-[10px] mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                {content.label}
              </span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-8 font-serif">
                {content.title}
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-light max-w-xl">
                {content.desc}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {contactItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  onClick={item.action || undefined}
                  className={cn(
                    "card-premium group border-beam",
                    item.action ? "cursor-pointer" : ""
                  )}
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6 border border-primary/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm group-hover:shadow-elegant">
                    {item.icon}
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-2 opacity-70">{item.label}</p>
                  <p className="text-foreground font-bold break-words group-hover:text-primary transition-colors">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.2, 0, 0.2, 1] }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-[3rem] blur opacity-20 transition duration-1000"></div>
            <div className="relative glass-panel rounded-[3rem] p-10 md:p-16 shadow-2xl border border-white/10">
              <h3 className="text-3xl font-bold mb-10 font-serif">{content.form.title}</h3>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">{content.form.name}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-accent/10 border border-border/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-hidden text-foreground"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">{content.form.email}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-accent/10 border border-border/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-hidden text-foreground"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">{content.form.msg}</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Bagaimana kami dapat membantu Anda?"
                    className="w-full bg-accent/10 border border-border/50 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-hidden resize-none text-foreground"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full premium-gradient text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 disabled:opacity-70 group"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>{content.form.submit}</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
