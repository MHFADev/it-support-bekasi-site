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
  Shield,
  ArrowRight,
  Check,
  X
} from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { useApp } from '@/src/context/AppContext';
import { Product } from '../types';
import { supabase } from '../src/lib/supabase';

const ShopNew: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'low-high' | 'high-low'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { setView, setSelectedProduct } = useApp();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('stock_status', 'in_stock')
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
      { id: 'all', label: 'Semua Produk', count: products.length },
      ...Object.keys(counts).map(cat => ({
        id: cat,
        label: cat,
        count: counts[cat]
      }))
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

  const handleContactWhatsApp = (product?: Product) => {
    const message = product 
      ? `Halo, saya tertarik dengan ${product.title} (Rp ${new Intl.NumberFormat('id-ID').format(Number(product.price))}). Apakah masih tersedia?`
      : `Halo, saya ingin bertanya tentang produk IT Support Bekasi.`;
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="pt-40 pb-24 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-dark-bg dark:to-dark-surface">
        <div className="text-center">
          <Loader2 className="animate-spin text-primary mx-auto mb-4" size={48} />
          <p className="text-sm font-medium text-muted-foreground">Memuat katalog produk...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-24 md:pb-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg min-h-screen">
      {/* Premium Hero Section */}
      <div className="relative py-20 md:py-32 mb-16 md:mb-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                Produk Terlengkap & Terpercaya
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground mb-6 leading-tight">
              Solusi IT{' '}
              <span className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Profesional
              </span>
              <br />untuk Bisnis Anda
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
              Laptop bisnis berkualitas, hardware terpercaya, dan aksesori premium untuk mendukung produktivitas maksimal
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">Garansi Resmi</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">Produk Original</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">Harga Kompetitif</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="#catalog"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-bold text-sm uppercase tracking-wider shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 transition-all flex items-center gap-2"
              >
                Lihat Katalog
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.button
                onClick={() => handleContactWhatsApp()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white dark:bg-dark-surface text-foreground rounded-2xl font-bold text-sm uppercase tracking-wider border-2 border-border hover:border-primary transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Hubungi Kami
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Catalog Section */}
      <div className="max-w-7xl mx-auto px-6" id="catalog">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-16">
          
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3">
            <div className="sticky top-32 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-black text-muted-foreground uppercase tracking-wider mb-4 pb-3 border-b">
                  Kategori
                </h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        activeCategory === cat.id 
                        ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                        : 'bg-gray-100 dark:bg-dark-surface text-muted-foreground hover:bg-gray-200 dark:hover:bg-dark-bg'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        {cat.label}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        activeCategory === cat.id ? 'bg-white/20' : 'bg-gray-200 dark:bg-dark-bg'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Card */}
              <div className="p-6 bg-gradient-to-br from-primary to-secondary rounded-3xl text-white shadow-2xl">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-serif mb-2">Butuh Konsultasi?</h4>
                <p className="text-sm text-white/80 mb-6 leading-relaxed">
                  Tim ahli kami siap membantu Anda memilih produk yang tepat
                </p>
                <button 
                  onClick={() => handleContactWhatsApp()}
                  className="w-full bg-white text-primary py-3 rounded-xl text-sm font-black uppercase tracking-wider hover:bg-gray-50 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat WhatsApp
                </button>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-9">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 pb-6 border-b">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input 
                  type="text"
                  placeholder="Cari produk..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-dark-surface border-2 border-transparent focus:border-primary/30 rounded-2xl outline-none transition-all text-sm font-medium"
                />
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="flex-1 md:flex-none px-4 py-3 bg-gray-100 dark:bg-dark-surface rounded-xl text-sm font-semibold outline-none cursor-pointer border-2 border-transparent focus:border-primary/30 transition-all"
                >
                  <option value="featured">Unggulan</option>
                  <option value="low-high">Harga: Rendah - Tinggi</option>
                  <option value="high-low">Harga: Tinggi - Rendah</option>
                </select>

                <div className="flex gap-2 p-1 bg-gray-100 dark:bg-dark-surface rounded-xl">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-dark-bg shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-dark-bg shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-32 bg-gray-50 dark:bg-dark-surface/30 rounded-3xl border-2 border-dashed">
                <Search className="w-16 h-16 mx-auto mb-6 text-gray-300" />
                <h3 className="text-2xl font-serif text-foreground mb-3">Produk Tidak Ditemukan</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                  Maaf, tidak ada produk yang sesuai dengan pencarian Anda
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8" 
                : "space-y-6"
              }>
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, idx) => (
                    viewMode === 'grid' ? (
                      // Grid View
                      <motion.div
                        layout
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className="group bg-white dark:bg-dark-surface rounded-3xl border border-gray-200 dark:border-dark-border overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
                      >
                        {/* Product Image */}
                        <div 
                          className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-dark-bg cursor-pointer" 
                          onClick={() => handleProductClick(product)}
                        >
                          <img 
                            src={product.image_url} 
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {/* Hover Actions */}
                          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleProductClick(product); }}
                              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                            >
                              <Info className="w-5 h-5 text-foreground" />
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleContactWhatsApp(product); }}
                              className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                            >
                              <ShoppingCart className="w-5 h-5 text-white" />
                            </button>
                          </div>

                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1.5 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-wider text-primary border border-primary/20">
                              {product.category}
                            </span>
                          </div>
                        </div>
                        
                        {/* Product Info */}
                        <div className="p-6">
                          <div className="flex items-center gap-1 mb-3">
                            {[1,2,3,4,5].map(i => (
                              <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                            ))}
                            <span className="ml-2 text-xs text-muted-foreground font-medium">(5.0)</span>
                          </div>
                          
                          <h3 
                            onClick={() => handleProductClick(product)}
                            className="text-xl font-serif text-foreground mb-3 leading-tight hover:text-primary transition-colors cursor-pointer line-clamp-2"
                          >
                            {product.title}
                          </h3>
                          
                          <p className="text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                          
                          <div className="flex items-end justify-between pt-4 border-t">
                            <div>
                              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider mb-1">
                                Harga
                              </p>
                              <p className="text-2xl font-black text-foreground tracking-tight">
                                Rp {new Intl.NumberFormat('id-ID').format(Number(product.price))}
                              </p>
                            </div>
                            <button 
                              onClick={() => handleContactWhatsApp(product)}
                              className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                            >
                              Order
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      // List View
                      <motion.div
                        layout
                        key={product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3, delay: idx * 0.03 }}
                        className="group bg-white dark:bg-dark-surface rounded-2xl border border-gray-200 dark:border-dark-border overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
                      >
                        <div className="flex flex-col sm:flex-row gap-6 p-6">
                          <div 
                            className="w-full sm:w-48 aspect-square sm:aspect-auto rounded-2xl overflow-hidden bg-gray-100 dark:bg-dark-bg flex-shrink-0 cursor-pointer"
                            onClick={() => handleProductClick(product)}
                          >
                            <img 
                              src={product.image_url} 
                              alt={product.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          <div className="flex-1 flex flex-col">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div className="flex-1">
                                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-wider mb-3">
                                  {product.category}
                                </span>
                                <h3 
                                  onClick={() => handleProductClick(product)}
                                  className="text-2xl font-serif text-foreground mb-2 hover:text-primary transition-colors cursor-pointer"
                                >
                                  {product.title}
                                </h3>
                                <div className="flex items-center gap-1 mb-3">
                                  {[1,2,3,4,5].map(i => (
                                    <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                                  ))}
                                  <span className="ml-2 text-xs text-muted-foreground font-medium">(5.0)</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider mb-1">
                                  Harga
                                </p>
                                <p className="text-3xl font-black text-foreground tracking-tight">
                                  Rp {new Intl.NumberFormat('id-ID').format(Number(product.price))}
                                </p>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-2">
                              {product.description}
                            </p>

                            <div className="mt-auto flex gap-3">
                              <button 
                                onClick={() => handleProductClick(product)}
                                className="flex-1 px-6 py-3 bg-gray-100 dark:bg-dark-bg text-foreground rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-dark-border transition-all flex items-center justify-center gap-2"
                              >
                                <Info className="w-4 h-4" />
                                Detail
                              </button>
                              <button 
                                onClick={() => handleContactWhatsApp(product)}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2"
                              >
                                <MessageCircle className="w-4 h-4" />
                                Order Sekarang
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="max-w-7xl mx-auto px-6 mt-24">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-[3rem] p-12 md:p-16 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-[100px]" />
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif mb-6">
              Tidak Menemukan Produk yang Anda Cari?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
              Tim kami siap membantu Anda menemukan solusi IT yang tepat untuk kebutuhan bisnis Anda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleContactWhatsApp()}
                className="px-8 py-4 bg-white text-primary rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-gray-50 transition-all shadow-2xl flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Chat WhatsApp
              </button>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-white/20 transition-all border-2 border-white/30 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {CONTACT_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopNew;
