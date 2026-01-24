import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    <div className="min-h-screen pt-24 pb-20 bg-slate-50 dark:bg-slate-950">
      {/* Header Section */}
      <section className="relative py-20 mb-12 overflow-hidden bg-blue-600">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-full shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-sm font-black uppercase tracking-wider">Katalog Terpercaya</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]"
            >
              Hardware <span className="text-white/80">Premium.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              Koleksi laptop bekas kualitas grade A, PC custom, dan hardware original dengan garansi teknisi Bekasi.
            </motion.p>
            
            {/* Main Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative max-w-2xl mx-auto pt-4"
            >
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Cari laptop, hardware, atau aksesoris..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-background border-2 border-border rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none focus:border-primary/50 outline-none transition-all text-foreground"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter & Sort Bar */}
      <section className="container mx-auto px-4 md:px-6 mb-12">
        <div className="bg-card border border-border p-4 rounded-3xl shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shrink-0",
                  activeCategory === cat 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "bg-accent/50 text-muted-foreground hover:bg-accent border border-border/50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-accent/30 border border-border rounded-xl px-4 py-2.5 text-sm font-semibold outline-hidden focus:ring-2 focus:ring-primary/20"
              >
                <option>Terbaru</option>
                <option>Harga Terendah</option>
                <option>Harga Tertinggi</option>
                <option>Nama A-Z</option>
              </select>
            </div>
            <div className="flex bg-accent/50 p-1 rounded-xl border border-border">
              <button 
                onClick={() => setViewMode('grid')}
                className={cn("p-2 rounded-lg transition-all", viewMode === 'grid' ? "bg-background shadow-sm text-primary" : "text-muted-foreground")}
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 md:px-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-card rounded-3xl border border-border p-4 animate-pulse">
                <div className="aspect-square bg-accent rounded-2xl mb-4"></div>
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
          <div className={cn(
            "grid gap-8",
            viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"
          )}>
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "group bg-card rounded-3xl border border-border p-4 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 relative cursor-pointer",
                    viewMode === 'list' ? "flex flex-row gap-8 items-center" : "flex flex-col"
                  )}
                >
                  <Link to={`/product/${product.id}`} className="absolute inset-0 z-10" />
                  
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-3xl border border-border/60 bg-muted shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:shadow-primary/10",
                      viewMode === 'list' ? "w-56 h-56 sm:w-64 sm:h-64" : "aspect-[4/3] sm:aspect-square"
                    )}
                  >
                    <div className="relative w-full h-full flex items-center justify-center">
                      <motion.div
                        className="relative z-10 w-full h-full"
                      >
                        <motion.img
                          src={product.image_url || 'https://images.unsplash.com/photo-1588872657578-7efd3f1514a4?q=80&w=800'}
                          alt={product.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        />
                        {/* Shadow */}
                        <div className="absolute -bottom-6 w-4/5 h-7 bg-foreground/10 blur-3xl rounded-[100%] opacity-0 group-hover:opacity-100 transition-all duration-700 scale-x-75"></div>
                      </motion.div>
                    </div>

                    <div className="absolute top-5 left-5 z-20">
                      <div className="bg-background/70 backdrop-blur-2xl px-4 py-2 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase border border-border/60 text-primary shadow-lg">
                        {product.category}
                      </div>
                    </div>

                    {/* Edge vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>

                  <div className="flex-1 flex flex-col mt-4">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-6 font-medium">
                      {product.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-black">Harga Unit</span>
                        <span className="text-2xl font-black text-primary">
                          Rp {new Intl.NumberFormat('id-ID').format(product.price)}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        disabled={product.stock_status === 'out_of_stock'}
                        className="bg-primary text-primary-foreground p-4 rounded-2xl shadow-xl shadow-primary/20 hover:scale-110 active:scale-95 transition-all disabled:opacity-30 relative z-20 group-hover:bg-primary/90"
                      >
                        <ShoppingCart className="w-6 h-6" />
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
