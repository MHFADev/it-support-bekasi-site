
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../constants';
import { ShoppingCart, Eye, ArrowRight, Loader2 } from 'lucide-react';
import { useApp } from '@/src/context/AppContext';
import { Product } from '../types';
import { supabase } from '../src/lib/supabase';

const Products: React.FC = () => {
  const { setView, setSelectedProduct, language } = useApp();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const t = CONTENT[language].products;

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);
      
      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();

    // Setup realtime subscription
    const channel = supabase
      .channel('products-home-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        () => {
          fetchProducts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setView('product-detail');
  };

  return (
    <section id="products" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-brand-500 tracking-widest uppercase mb-4">{t.label}</h2>
            <p className="text-4xl font-serif text-gray-900 dark:text-white">{t.title}</p>
          </div>
          <button 
            onClick={() => setView('shop')}
            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-900 text-white font-bold hover:bg-brand-950 transition-all shadow-xl shadow-brand-900/10 active:scale-95"
          >
            {t.cta}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-brand-500" size={40} />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateX: 4, 
                  rotateY: 4, 
                  y: -10,
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
                }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: false, amount: 0.1 }}
                className="group cursor-pointer transform-gpu"
                onClick={() => handleProductDetail(product)}
              >
                <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-gray-100 mb-6 border border-gray-100 dark:border-dark-border">
                  <img 
                    src={product.image_url} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-brand-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button className="p-3 bg-white text-brand-900 rounded-full shadow-xl hover:scale-110 transition-transform">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-brand-500 text-white rounded-full shadow-xl hover:scale-110 transition-transform">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="px-4">
                  <p className="text-[10px] font-bold text-brand-500 uppercase tracking-widest mb-2">{product.category}</p>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-brand-500 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xl font-black text-gray-900 dark:text-white">
                    Rp {new Intl.NumberFormat('id-ID').format(Number(product.price))}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
