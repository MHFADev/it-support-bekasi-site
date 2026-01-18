import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  MessageSquare, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  ChevronRight,
  CheckCircle2,
  Package,
  Clock,
  Award
} from 'lucide-react';
import { useApp } from '@/src/context/AppContext';
import { CONTACT_INFO } from '../constants';

const ProductDetail: React.FC = () => {
  const { selectedProduct, setView } = useApp();
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'warranty'>('desc');

  if (!selectedProduct) return null;

  const handleBuy = () => {
    const text = `Halo IT Support Bekasi, saya tertarik dengan produk ${selectedProduct.title} seharga Rp ${new Intl.NumberFormat('id-ID').format(Number(selectedProduct.price))}. Apakah barang ini ready stok?`;
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-12 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
          <button onClick={() => setView('home')} className="hover:text-brand-500 transition-colors">Home</button>
          <ChevronRight className="w-4 h-4 shrink-0" />
          <button onClick={() => setView('shop')} className="hover:text-brand-500 uppercase tracking-widest font-bold transition-colors">Catalog</button>
          <ChevronRight className="w-4 h-4 shrink-0" />
          <span className="text-gray-900 dark:text-white font-bold">{selectedProduct.title}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Image Section */}
          <div className="space-y-8 sticky top-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square sm:aspect-[4/3] rounded-[3.5rem] overflow-hidden bg-gray-50 border dark:border-dark-border shadow-2xl group"
            >
              <img 
                src={selectedProduct.image_url} 
                alt={selectedProduct.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
            </motion.div>
            
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-2xl bg-gray-50 border dark:border-dark-border overflow-hidden opacity-60 hover:opacity-100 transition-all cursor-pointer hover:border-brand-500/50">
                  <img src={selectedProduct.image_url} className="w-full h-full object-cover" alt="Detail View" />
                </div>
              ))}
            </div>

            <div className="p-8 bg-brand-50 dark:bg-brand-900/10 rounded-[2.5rem] border border-brand-100 dark:border-brand-500/20">
              <h4 className="font-bold text-brand-900 dark:text-brand-400 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Standard Delivery Included
              </h4>
              <p className="text-sm text-brand-800 dark:text-brand-300/70 leading-relaxed">
                Pengiriman aman menggunakan bubble wrap tebal dan asuransi penuh untuk menjamin perangkat sampai dalam kondisi sempurna.
              </p>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-widest mb-8">
                <CheckCircle2 className="w-3.5 h-3.5" />
                In Stock & Ready to Ship
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-serif text-gray-900 dark:text-white mb-6 leading-[1.1]">
                {selectedProduct.title}
              </h1>
              
              <div className="flex items-baseline gap-4 mb-10">
                <span className="text-4xl font-black text-brand-500">Rp {new Intl.NumberFormat('id-ID').format(Number(selectedProduct.price))}</span>
                <span className="text-sm text-gray-400 line-through">Rp {(Number(selectedProduct.price) * 1.1).toLocaleString('id-ID', { minimumFractionDigits: 0 })}</span>
              </div>

              {/* Quick Action Tabs */}
              <div className="flex border-b dark:border-dark-border mb-10">
                {['desc', 'specs', 'warranty'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-6 py-4 text-sm font-bold uppercase tracking-widest transition-all relative ${
                      activeTab === tab ? 'text-brand-500' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {tab === 'desc' ? 'Description' : tab === 'specs' ? 'Tech Specs' : 'Warranty'}
                    {activeTab === tab && (
                      <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-500 rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="min-h-[200px] mb-12"
                >
                  {activeTab === 'desc' && (
                    <div className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">
                      <p>{selectedProduct.description}</p>
                      <p>Perangkat ini telah melewati pengujian beban kerja (stress test) oleh teknisi profesional kami untuk memastikan performa yang konsisten di lingkungan kerja yang berat.</p>
                      <ul className="space-y-3 mt-6">
                        {['High Durability Components', 'Pre-installed Productivity Tools', 'Clean OS Installation', 'Enterprise-grade Security'].map((item) => (
                          <li key={item} className="flex items-center gap-3 text-sm font-medium">
                            <CheckCircle2 className="w-5 h-5 text-brand-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {activeTab === 'specs' && (
                    <div className="grid gap-4">
                      {[
                        { label: 'Condition', value: 'Original / Refurbished Grade A+' },
                        { label: 'Display', value: '14.0" Full HD IPS Anti-glare' },
                        { label: 'Battery', value: 'Up to 8 Hours typical usage' },
                        { label: 'Storage', value: 'Scalable up to 2TB NVMe SSD' },
                        { label: 'Build Material', value: 'Military Grade Aluminum / Carbon Fiber' }
                      ].map((spec) => (
                        <div key={spec.label} className="flex justify-between p-4 rounded-2xl bg-gray-50 dark:bg-dark-surface border dark:border-dark-border">
                          <span className="text-gray-500 font-bold text-sm uppercase tracking-wider">{spec.label}</span>
                          <span className="text-gray-900 dark:text-white font-bold text-sm">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === 'warranty' && (
                    <div className="p-8 rounded-[2.5rem] bg-brand-900 text-white space-y-6">
                      <div className="flex items-start gap-4">
                        <Award className="w-8 h-8 text-brand-400 shrink-0" />
                        <div>
                          <h4 className="text-xl font-bold mb-2">Garansi 1 Tahun</h4>
                          <p className="text-brand-200 text-sm">Cakupan meliputi perbaikan hardware dan penggantian sparepart selama pemakaian normal.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <ShieldCheck className="w-8 h-8 text-brand-400 shrink-0" />
                        <div>
                          <h4 className="text-xl font-bold mb-2">Layanan Aftersales</h4>
                          <p className="text-brand-200 text-sm">Dapatkan dukungan prioritas via WhatsApp dan konsultasi teknis gratis selamanya.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Footer Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleBuy}
                  className="flex-grow inline-flex items-center justify-center gap-3 bg-brand-500 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-brand-600 transition-all shadow-2xl shadow-brand-500/30 active:scale-95 group"
                >
                  <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Order via WhatsApp
                </button>
                <button 
                  onClick={() => setView('shop')}
                  className="inline-flex items-center justify-center gap-2 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border text-gray-900 dark:text-white px-8 py-5 rounded-2xl font-bold transition-all hover:bg-gray-50 dark:hover:bg-dark-border"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
              </div>

              {/* Service Indicators */}
              <div className="grid grid-cols-3 gap-6 pt-12 mt-12 border-t dark:border-dark-border">
                {[
                  { icon: Truck, label: 'Safe Delivery' },
                  { icon: RefreshCw, label: '7-Day Return' },
                  { icon: Clock, label: '24/7 Support' }
                ].map((item, i) => (
                  <div key={i} className="text-center group">
                    <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-dark-surface flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-500 group-hover:text-white transition-all">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
