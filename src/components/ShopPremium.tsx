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

  const [sortBy, setSortBy] = useState('Terbaru');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'Harga Terendah') return a.price - b.price;
    if (sortBy === 'Harga Tertinggi') return b.price - a.price;
    if (sortBy === 'Nama A-Z') return a.title.localeCompare(b.title);
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const filteredProducts = sortedProducts.filter(p => {
    const matchesCategory = activeCategory === 'Semua' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const categories = ['Semua', ...CATEGORIES];

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success('Ditambahkan ke keranjang', {
      description: product.title
    });
  };

  return (
    <div id="shop-premium" className="min-h-screen pt-32 pb-20 bg-background noise-bg">
      {/* Header Section */}
      <section className="relative py-20 mb-16 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-primary font-bold tracking-widest uppercase text-[10px] mb-8"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Katalog Eksklusif</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "premium" }}
              className="text-6xl md:text-8xl font-bold tracking-tight text-foreground mb-10 font-serif leading-tight"
            >
              Temukan Laptop <span className="text-primary italic">Premium</span> Anda
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "premium" }}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed italic"
            >
              Koleksi terkurasi dari brand terkemuka, diinspeksi secara mendalam oleh teknisi ahli IT Support Bekasi.
            </motion.p>
          </div>
        </div>
        
        {/* Decor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10 animate-pulse delay-700" />
      </section>

      {/* Filter & Search Bar */}
      <section className="container mx-auto px-4 md:px-6 mb-16">
        <div className="glass-panel p-6 rounded-[2rem] flex flex-col lg:flex-row items-center gap-8">
          {/* Search */}
          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text"
              placeholder="Cari laptop impian..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-accent/10 border border-border/50 rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-hidden"
            />
          </div>

          {/* Categories */}
          <div className="flex-1 flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
                  activeCategory === cat 
                    ? "premium-gradient text-white shadow-xl shadow-primary/20 scale-105" 
                    : "bg-accent/30 text-muted-foreground hover:bg-accent border border-border/30"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="w-full lg:w-auto flex items-center gap-4">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-accent/30 border border-border/50 rounded-2xl px-6 py-3 text-xs font-bold uppercase tracking-wider outline-hidden focus:ring-2 focus:ring-primary/20"
            >
              <option>Terbaru</option>
              <option>Harga Terendah</option>
              <option>Harga Tertinggi</option>
              <option>Nama A-Z</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 md:px-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card-premium animate-pulse">
                <div className="aspect-square bg-accent/20 rounded-2xl mb-6"></div>
                <div className="h-4 bg-accent/20 rounded-full w-2/3 mb-3"></div>
                <div className="h-4 bg-accent/20 rounded-full w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-32 glass-panel rounded-[3rem]">
            <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3 font-serif">Tidak ada produk ditemukan</h3>
            <p className="text-muted-foreground font-light">Coba gunakan kata kunci atau kategori lain.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i % 4 * 0.1 }}
                  className="card-premium group border-beam"
                >
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-accent/10 mb-6">
                    <img
                      src={product.image_url || 'https://images.unsplash.com/photo-1588872657578-7efd3f1514a4?q=80&w=800'}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-premium group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="glass-panel px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase text-primary border border-primary/20">
                        {product.category}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                      ))}
                      <span className="text-[9px] text-muted-foreground font-bold ml-1 uppercase tracking-wider opacity-60">Premium Inspection</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors font-serif italic">
                      {product.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-6 font-light leading-relaxed">
                      {product.description}
                    </p>

                    <div className="mt-auto pt-6 border-t border-border/30 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-1 opacity-70">Price Starts At</span>
                        <span className="text-2xl font-black text-primary tracking-tighter">
                          <span className="text-sm font-bold mr-0.5">Rp</span>
                          {new Intl.NumberFormat('id-ID').format(product.price)}
                        </span>
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        disabled={product.stock === 0}
                        className="premium-gradient text-white p-4 rounded-2xl shadow-lg hover:shadow-primary/40 hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-30 group/btn"
                      >
                        <ShoppingCart className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                      </button>
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
