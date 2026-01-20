import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Filter, Laptop, Cpu, Shield, ArrowRight, Star, ShoppingCart } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import { CATEGORIES } from '../constants';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

const ShopPremium: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'Semua' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['Semua', ...CATEGORIES];

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success('Ditambahkan ke keranjang', {
      description: product.title
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      {/* Header Section */}
      <section className="relative py-12 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-accent/5 -z-10"></div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold tracking-widest uppercase text-xs mb-6"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Katalog Hardware</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6"
            >
              Hardware Pilihan <span className="text-primary">Terbaik.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Dapatkan laptop bekas berkualitas, PC custom, dan hardware original dengan jaminan garansi teknisi kami.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="container mx-auto px-4 md:px-6 mb-8">
        <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all border shrink-0",
                activeCategory === cat 
                  ? "bg-primary text-white border-primary" 
                  : "bg-white text-[#6D7588] border-[#E5E7E9] hover:border-primary hover:text-primary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 md:px-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-card rounded-[2.5rem] border border-border p-4 animate-pulse">
                <div className="aspect-square bg-accent rounded-3xl mb-4"></div>
                <div className="h-4 bg-accent rounded-full w-2/3 mb-2"></div>
                <div className="h-4 bg-accent rounded-full w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 opacity-50">
            <div className="bg-accent w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">Tidak ada produk ditemukan</h3>
            <p className="text-muted-foreground">Coba gunakan kata kunci atau kategori lain.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="group bg-white rounded-lg border border-[#E5E7E9] overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
                  onClick={() => handleAddToCart(product)}
                >
                  <div className="relative aspect-square overflow-hidden mb-3">
                    <img
                      src={product.image_url || 'https://images.unsplash.com/photo-1588872657578-7efd3f1514a4?q=80&w=800'}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="bg-[#6D7588] text-white px-2 py-1 rounded text-[10px] font-bold uppercase">Stok Habis</span>
                      </div>
                    )}
                  </div>

                  <div className="px-2 pb-3 flex-1 flex flex-col">
                    <h3 className="text-sm font-medium text-[#212121] mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    
                    <div className="mt-auto">
                      <span className="text-base font-bold text-[#212121]">
                        Rp {new Intl.NumberFormat('id-ID').format(product.price)}
                      </span>
                      
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 fill-[#FFC400] text-[#FFC400]" />
                        <span className="text-xs text-[#6D7588]">5.0 | Terjual 10+</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
};

export default ShopPremium;
