
import React, { useState } from 'react';
import { motion } from 'framer-motion';
// Fix: Added ArrowRight to the imports from lucide-react to resolve the missing name error
import { Phone, Mail, MapPin, Send, Clock, ArrowUpRight, CheckCircle, Navigation, ArrowRight } from 'lucide-react';
import { CONTACT_INFO, CONTENT } from '../constants';
import { useApp } from '@/src/context/AppContext';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const { language } = useApp();
  const t = CONTENT[language].contact;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  const contactData = [
    { icon: Phone, label: t.items[0], value: CONTACT_INFO.phone, action: () => window.open(`tel:${CONTACT_INFO.phone}`) },
    { icon: Mail, label: t.items[1], value: CONTACT_INFO.email, action: () => window.open(`mailto:${CONTACT_INFO.email}`) },
    { icon: MapPin, label: t.items[2], value: CONTACT_INFO.address, action: () => window.open(`https://www.google.com/maps/search/${encodeURIComponent(CONTACT_INFO.address)}`, '_blank') },
    { icon: Clock, label: t.items[3], value: language === 'id' ? "Sen - Sab: 09:00 - 18:00" : "Mon - Sat: 09:00 - 18:00", action: null }
  ];

  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.113296152862!2d106.99478441021465!3d-6.248805293712399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698c2818617887%3A0x6334a170560946d0!2sJl.%20Ahmad%20Yani%2C%20Bekasi%2C%20Jawa%20Barat!5e0!3m2!1sid!4v1710000000000!5m2!1sid!2sen";

  return (
    <section id="contact" className="py-16 md:py-32 bg-gray-50 dark:bg-dark-surface/30 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        {/* Header & Contact Details */}
        <div className="px-6 md:px-12 lg:px-16 mb-16 md:mb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[10px] md:text-[11px] font-black text-brand-500 tracking-premium uppercase mb-6">{t.label}</h2>
              <h3 className="text-3xl md:text-5xl lg:text-7xl font-serif text-gray-900 dark:text-white mb-6 md:mb-10 leading-[1.15] tracking-tight">
                {t.title.split(' ').map((word, i) => (
                  ['Satu', 'Klik', 'One', 'Click'].includes(word) ? <span key={i} className="text-brand-500 italic font-medium">{word} </span> : word + ' '
                ))}
              </h3>
              <p className="text-base md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed font-medium max-w-xl">
                {t.desc}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {contactData.slice(0, 2).map((item, i) => (
                <div key={i} onClick={item.action!} className="p-6 bg-white dark:bg-dark-surface rounded-3xl border dark:border-dark-border cursor-pointer hover:border-brand-500/30 transition-all group">
                  <div className="w-10 h-10 bg-brand-50 dark:bg-brand-900/20 rounded-xl flex items-center justify-center text-brand-500 mb-4 group-hover:bg-brand-500 group-hover:text-white transition-all">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full Immersive Map Section */}
        <div className="lg:px-12 xl:px-16 mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative w-full h-[70svh] sm:h-[500px] lg:h-[600px] lg:rounded-[4rem] overflow-hidden shadow-2xl bg-gray-200 dark:bg-dark-surface border-y lg:border dark:border-dark-border group"
          >
            <iframe 
              src={mapEmbedUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="IT Support Bekasi Office Location"
              className="grayscale contrast-[1.05] brightness-[0.98] group-hover:grayscale-0 transition-all duration-1000 ease-in-out dark:opacity-70 dark:group-hover:opacity-100"
            />
            
            {/* Visual Depth Overlays */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/20 to-transparent pointer-events-none sm:hidden" />

            {/* Strategic Floating Info - Simplified for Mobile Visibility */}
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-12 sm:left-12 lg:right-auto lg:w-[450px] flex flex-col gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white/95 dark:bg-dark-bg/95 backdrop-blur-2xl p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl border border-white/20 dark:border-white/5 flex gap-4 sm:gap-6 items-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-brand-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-brand-500/30">
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <h4 className="font-black text-gray-900 dark:text-white text-[9px] sm:text-[10px] tracking-[0.25em] uppercase">{language === 'id' ? 'MARKAS KAMI' : 'OUR HEADQUARTERS'}</h4>
                  </div>
                  <p className="text-[13px] sm:text-base text-gray-600 dark:text-gray-300 leading-tight font-bold">
                    {CONTACT_INFO.address}
                  </p>
                </div>
              </motion.div>

              <button 
                onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(CONTACT_INFO.address)}`, '_blank')}
                className="w-full bg-brand-500 text-white py-5 sm:py-6 rounded-[1.2rem] sm:rounded-[2.5rem] shadow-xl hover:bg-brand-600 transition-all active:scale-[0.97] flex items-center justify-center gap-3 font-bold text-xs sm:text-sm tracking-[0.2em] uppercase"
              >
                <Navigation className="w-5 h-5" />
                {language === 'id' ? 'Navigasi Penuh' : 'Full Navigation'}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Contact Form - Refined Spacing */}
        <div className="px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-dark-surface p-8 sm:p-12 lg:p-20 rounded-[2.5rem] md:rounded-[4rem] border border-gray-100 dark:border-dark-border shadow-2xl relative"
          >
            {formStatus === 'success' ? (
              <div className="text-center py-12">
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/20"
                >
                  <CheckCircle className="w-10 h-10" />
                </motion.div>
                <h4 className="text-3xl font-serif mb-4 tracking-tight">{t.form.success}</h4>
                <p className="text-base text-gray-500 dark:text-gray-400 mb-8 font-medium">{t.form.successDesc}</p>
                <button onClick={() => setFormStatus('idle')} className="text-brand-500 font-bold hover:underline text-[10px] uppercase tracking-premium">
                  {language === 'id' ? 'Kirim pesan lain' : 'Send another inquiry'}
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-6">
                  <h4 className="text-3xl lg:text-5xl font-serif flex items-center gap-5 tracking-tight text-gray-900 dark:text-white">
                    <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900/20 rounded-2xl flex items-center justify-center text-brand-500 shrink-0">
                      <Send className="w-6 h-6" />
                    </div>
                    {t.form.title}
                  </h4>
                  <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-gray-50 dark:bg-dark-bg border dark:border-dark-border">
                    <Clock className="w-4 h-4 text-brand-500" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      {language === 'id' ? 'Buka: 09:00 - 18:00' : 'Open: 09:00 - 18:00'}
                    </span>
                  </div>
                </div>

                <form className="grid gap-8" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-premium text-gray-400 ml-2">{t.form.name}</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Ex: Adrian Wijaya"
                        className="w-full bg-gray-50 dark:bg-dark-bg border border-transparent focus:border-brand-500/30 px-8 py-5 rounded-2xl outline-none focus:ring-4 focus:ring-brand-500/5 transition-all dark:text-white font-semibold"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-premium text-gray-400 ml-2">{t.form.email}</label>
                      <input 
                        required
                        type="email" 
                        placeholder="Ex: adrian@office.com"
                        className="w-full bg-gray-50 dark:bg-dark-bg border border-transparent focus:border-brand-500/30 px-8 py-5 rounded-2xl outline-none focus:ring-4 focus:ring-brand-500/5 transition-all dark:text-white font-semibold"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-premium text-gray-400 ml-2">{t.form.msg}</label>
                      <textarea 
                        required
                        rows={4}
                        placeholder={language === 'id' ? 'Jelaskan kendala atau kebutuhan IT Anda secara detail...' : 'Describe your IT constraints or needs in detail...'}
                        className="w-full bg-gray-50 dark:bg-dark-bg border border-transparent focus:border-brand-500/30 px-8 py-5 rounded-2xl outline-none focus:ring-4 focus:ring-brand-500/5 transition-all dark:text-white resize-none font-semibold"
                      ></textarea>
                  </div>
                  <button 
                    disabled={formStatus === 'submitting'}
                    type="submit"
                    className="w-full group bg-brand-500 text-white py-6 rounded-3xl font-bold text-xl flex items-center justify-center gap-4 hover:bg-brand-600 transition-all shadow-2xl shadow-brand-500/25 active:scale-[0.98] disabled:opacity-70"
                  >
                    {formStatus === 'submitting' ? (language === 'id' ? 'MENGIRIM...' : 'SENDING...') : t.form.submit}
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
