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
    <div className="min-h-screen pt-24 pb-20 bg-background">
      {/* Header Section */}
      <section className="relative py-12 mb-8 overflow-hidden bg-primary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-black tracking-tight text-white"
            >
              Hardware Pilihan <span className="text-white/80">Terbaik.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/90 max-w-2xl mx-auto"
            >
              Dapatkan laptop bekas berkualitas, PC custom, dan hardware original dengan jaminan garansi teknisi kami.
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
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none focus:border-primary/50 outline-none transition-all dark:text-white"
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
                  
                  <div className={cn(
                    "relative overflow-hidden rounded-2xl bg-accent/10",
                    viewMode === 'list' ? "w-48 h-48" : "aspect-square mb-5"
                  )}>
                    <img
                      src={product.image_url || 'https://images.unsplash.com/photo-1588872657578-7efd3f1514a4?q=80&w=800'}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-border text-primary">
                        {product.category}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-[10px] text-muted-foreground font-bold ml-1">5.0</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {product.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Harga</span>
                        <span className="text-xl font-extrabold text-primary">
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
                        className="bg-primary text-primary-foreground p-3 rounded-2xl shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all disabled:opacity-30 relative z-20"
                      >
                        <ShoppingCart className="w-5 h-5" />
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
