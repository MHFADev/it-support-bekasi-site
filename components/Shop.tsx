
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ChevronRight, 
  ShoppingCart, 
  Info, 
  LayoutGrid,
  List,
  SortDesc,
  Tag,
  Star,
  Zap,
  Loader2,
  MessageCircle,
  Phone,
  TrendingUp,
  Award,
  Shield
} from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { useApp } from '@/src/context/AppContext';
import { Product } from '../types';
import { supabase } from '../src/lib/supabase';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'low-high' | 'high-low'>('featured');
  const { setView, setSelectedProduct } = useApp();

  useEffect(() => {
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

    fetchProducts();

    // Setup realtime subscription
    const channel = supabase
      .channel('products-shop-changes')
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

  const categories = useMemo(() => {
    const counts = products.reduce((acc: any, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});

    return [
      { id: 'all', label: 'Semua Koleksi', count: products.length },
      { id: 'Laptop', label: 'Laptop Bisnis', count: counts['Laptop'] || 0 },
      { id: 'PC Desktop', label: 'Hardware Utama', count: counts['PC Desktop'] || 0 },
      { id: 'Aksesoris', label: 'Aksesoris Elite', count: counts['Aksesoris'] || 0 },
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'low-high') {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'high-low') {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('product-detail');
  };

  if (loading) {
    return (
      <div className="pt-40 pb-24 min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-500" size={48} />
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-24 md:pb-32 bg-white dark:bg-dark-bg min-h-screen">
      {/* Premium Header */}
      <div className="relative py-16 md:py-24 mb-10 md:mb-16 bg-brand-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#0070f3,_transparent)] blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-8 md:w-12 h-1 bg-brand-500 rounded-full" />
              <span className="text-[10px] font-black text-brand-400 uppercase tracking-[0.4em]">Official Catalog</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white mb-4 md:mb-6 leading-tight">Elite <span className="italic text-brand-500">Hardware</span> Portfolio.</h1>
            <p className="text-base md:text-xl text-brand-200/70 leading-relaxed font-medium">
              Curated selection of enterprise-grade technology designed for peak performance.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-16">
          
          {/* Enhanced Sidebar - Adaptive Mobile Layout */}
          <aside className="lg:col-span-3 space-y-8 md:space-y-12">
            <div className="sticky top-28 md:top-32">
              <div className="mb-6 md:mb-10">
                <h3 className="hidden lg:block text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6 border-b dark:border-dark-border pb-4">Browse Collection</h3>
                
                {/* Horizontal Scroll on Mobile, Vertical List on Desktop */}
                <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex items-center justify-between whitespace-nowrap lg:w-full px-5 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold transition-all shrink-0 ${
                        activeCategory === cat.id 
                        ? 'bg-brand-500 text-white shadow-xl shadow-brand-500/20 lg:translate-x-2' 
                        : 'bg-gray-50 dark:bg-dark-surface text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-3 md:gap-4">
                        <Tag className={`w-3.5 h-3.5 md:w-4 md:h-4 ${activeCategory === cat.id ? 'text-white' : 'text-brand-500'}`} />
                        {cat.label}
                      </span>
                      <span className={`hidden md:inline text-[10px] opacity-60 ${activeCategory === cat.id ? 'text-white' : ''}`}>({cat.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Quote Card - Hidden on Mobile */}
              <div className="hidden lg:block p-10 bg-gray-950 rounded-[3rem] text-white relative overflow-hidden shadow-2xl group">
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-brand-500/20 rounded-2xl flex items-center justify-center mb-8 border border-brand-500/30">
                    <Zap className="w-7 h-7 text-brand-500 group-hover:scale-125 transition-transform" />
                  </div>
                  <h4 className="text-2xl font-serif mb-4 leading-tight">Custom Configuration?</h4>
                  <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                    Butuh spesifikasi khusus untuk workstation atau server perusahaan?
                  </p>
                  <button 
                    onClick={() => window.open(`https://wa.me/${CONTACT_INFO.whatsapp}`, '_blank')}
                    className="w-full bg-white text-black py-5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-brand-500 hover:text-white transition-all shadow-xl active:scale-95"
                  >
                    Request Special Quote
                  </button>
                </div>
                <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-brand-500/10 rounded-full blur-[80px]" />
              </div>
            </div>
          </aside>

          {/* Main Catalog Area */}
          <div className="lg:col-span-9">
            {/* Toolbar Integration */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-8 md:mb-12 pb-6 md:pb-10 border-b dark:border-dark-border">
              <div className="relative w-full md:w-[400px]">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search catalog..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 md:pl-16 pr-6 md:pr-8 py-4 md:py-5 bg-gray-50 dark:bg-dark-surface border border-transparent focus:border-brand-500/20 rounded-[1.5rem] md:rounded-[2rem] outline-none focus:ring-4 focus:ring-brand-500/5 transition-all dark:text-white font-medium text-sm md:text-base"
                />
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                <div className="flex items-center gap-3 px-5 md:px-6 py-3 bg-gray-50 dark:bg-dark-surface rounded-xl md:rounded-2xl border dark:border-dark-border whitespace-nowrap">
                  <SortDesc className="w-4 h-4 text-brand-500" />
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300 outline-none cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                  </select>
                </div>
                <div className="hidden md:flex gap-2 p-1 bg-gray-50 dark:bg-dark-surface rounded-xl">
                  <button className="p-3 bg-white dark:bg-dark-bg shadow-sm rounded-lg text-brand-500"><LayoutGrid className="w-5 h-5" /></button>
                  <button className="p-3 text-gray-400 hover:text-brand-500 transition-colors"><List className="w-5 h-5" /></button>
                </div>
              </div>
            </div>

            {/* Results Grid - Dynamic Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10 perspective-1000">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ 
                      scale: 1.03, 
                      rotateX: 2, 
                      rotateY: -2, 
                      y: -8,
                      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
                    }}
                    transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="group bg-white dark:bg-dark-surface rounded-[2rem] md:rounded-[3rem] border border-gray-100 dark:border-dark-border overflow-hidden hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transition-all flex flex-col h-full transform-gpu"
                  >
                    <div 
                      className="relative aspect-square md:aspect-[4/5] overflow-hidden bg-gray-50/50 cursor-pointer" 
                      onClick={() => handleProductClick(product)}
                    >
                      <img 
                        src={product.image_url} 
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-col gap-2">
                        <span className="bg-white/90 dark:bg-dark-surface/90 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-brand-600 shadow-xl border dark:border-dark-border">
                          {product.category}
                        </span>
                      </div>
                      
                      {/* Interaction Overlay - Always visible icon on mobile for usability */}
                      <div className="absolute inset-0 bg-brand-950/40 lg:opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 md:gap-5">
                         <button 
                          onClick={(e) => { e.stopPropagation(); handleProductClick(product); }}
                          className="w-12 h-12 md:w-16 md:h-16 bg-white text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95"
                         >
                            <Info className="w-5 h-5 md:w-6 md:h-6" />
                         </button>
                         <button 
                          onClick={(e) => { e.stopPropagation(); handleProductClick(product); }}
                          className="w-12 h-12 md:w-16 md:h-16 bg-brand-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95"
                         >
                            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                         </button>
                      </div>
                    </div>
                    
                    <div className="p-6 md:p-10 flex flex-col flex-grow">
                      <div className="flex items-center gap-1 mb-2 md:mb-3">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-brand-500 fill-brand-500" />)}
                      </div>
                      <h3 
                        onClick={() => handleProductClick(product)}
                        className="text-xl md:text-2xl font-serif text-gray-900 dark:text-white mb-2 md:mb-4 leading-tight hover:text-brand-500 transition-colors cursor-pointer"
                      >
                        {product.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-6 md:mb-10 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                      
                      <div className="mt-auto pt-6 md:pt-8 border-t dark:border-dark-border flex items-end justify-between">
                        <div>
                          <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Price Point</p>
                          <p className="text-xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
                            Rp {new Intl.NumberFormat('id-ID').format(Number(product.price))}
                          </p>
                        </div>
                        <button 
                          onClick={() => handleProductClick(product)}
                          className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gray-50 dark:bg-dark-bg text-gray-400 hover:bg-brand-500 hover:text-white transition-all flex items-center justify-center shadow-sm"
                        >
                          <ChevronRight className="w-5 h-5 md:w-8 md:h-8" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-20 md:py-40 bg-gray-50 dark:bg-dark-surface/30 rounded-[2rem] md:rounded-[4rem] border-2 border-dashed dark:border-dark-border">
                <Search className="w-10 h-10 md:w-14 md:h-14 mx-auto mb-6 md:mb-10 text-gray-300" />
                <h3 className="text-2xl md:text-3xl font-serif text-gray-900 dark:text-white mb-4">No Inventory Matches</h3>
                <p className="text-sm md:text-lg text-gray-500 max-w-md mx-auto leading-relaxed px-6">
                  Maaf, produk yang Anda cari saat ini tidak tersedia. Hubungi teknisi untuk ketersediaan stok offline.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
