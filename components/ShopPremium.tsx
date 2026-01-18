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
  Package,
  Truck,
  CheckCircle,
  ArrowRight,
  Filter,
  X
} from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { Product } from '../types';
import { supabase } from '../src/lib/supabase';
import { Link, useNavigate } from 'react-router-dom';

const ShopPremium: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'low-high' | 'high-low'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

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
      .channel('products-shop-premium')
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
      { id: 'all', label: 'Semua Produk', count: products.length, icon: Package },
      { id: 'Laptop', label: 'Laptop', count: counts['Laptop'] || 0, icon: Package },
      { id: 'PC Desktop', label: 'PC Desktop', count: counts['PC Desktop'] || 0, icon: Package },
      { id: 'Aksesoris', label: 'Aksesoris', count: counts['Aksesoris'] || 0, icon: Package },
      { id: 'Hardware', label: 'Hardware', count: counts['Hardware'] || 0, icon: Package },
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

  const handleContactWhatsApp = (product: Product) => {
    const message = `Halo, saya tertarik dengan produk:\n\n*${product.title}*\nHarga: Rp ${new Intl.NumberFormat('id-ID').format(Number(product.price))}\n\nBisakah saya mendapatkan informasi lebih lanjut?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodedMessage}`, '_blank');
  };

  const handleContactPhone = () => {
    window.open(`tel:${CONTACT_INFO.phone}`, '_self');
  };

  if (loading) {
    return (
      <div className="pt-40 pb-24 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg">
        <div className="text-center">
          <Loader2 className="animate-spin text-brand-500 mx-auto mb-4" size={48} />
          <p className="text-gray-600 dark:text-gray-400 font-medium">Memuat produk...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-24 md:pb-32 bg-gray-50 dark:bg-dark-bg min-h-screen">
      {/* Premium Header with Gradient */}
      <div className="relative py-20 md:py-32 mb-12 md:mb-20 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6"
            >
              <Award className="w-4 h-4 text-brand-300" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Official Store</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              Toko <span className="text-brand-300">IT Equipment</span><br className="hidden md:block" /> Premium Bekasi
            </h1>
            
            <p className="text-lg md:text-xl text-brand-100/80 leading-relaxed font-medium max-w-2xl mx-auto mb-8">
              Produk IT berkualitas tinggi dengan garansi resmi, harga kompetitif, dan layanan pelanggan terbaik.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              {[
                { icon: Shield, text: 'Garansi Resmi' },
                { icon: Truck, text: 'Gratis Ongkir*' },
                { icon: CheckCircle, text: 'Produk Original' },
              ].map((badge, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="flex items-center gap-2 text-white/90"
                >
                  <badge.icon className="w-5 h-5 text-brand-300" />
                  <span className="text-sm font-semibold">{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-16">
          
          {/* Sidebar Filters */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-32 space-y-6">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-dark-surface rounded-2xl shadow-sm border dark:border-dark-border"
              >
                <span className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Filter size={18} />
                  Filter & Kategori
                </span>
                {showFilters ? <X size={20} /> : <ChevronRight size={20} />}
              </button>

              {/* Filters Panel */}
              <div className={`${showFilters ? 'block' : 'hidden lg:block'} space-y-6`}>
                {/* Categories */}
                <div className="bg-white dark:bg-dark-surface rounded-2xl p-6 shadow-sm border dark:border-dark-border">
                  <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Tag size={16} className="text-brand-500" />
                    Kategori
                  </h3>
                  <div className="space-y-2">
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setActiveCategory(cat.id);
                          setShowFilters(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                          activeCategory === cat.id 
                          ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' 
                          : 'bg-gray-50 dark:bg-dark-bg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <cat.icon size={16} />
                          {cat.label}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${activeCategory === cat.id ? 'bg-white/20' : 'bg-gray-200 dark:bg-dark-border'}`}>
                          {cat.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact CTA Card */}
                <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
                  <div className="relative z-10">
                    <Zap className="w-10 h-10 text-brand-300 mb-4" />
                    <h4 className="text-xl font-bold mb-2">Butuh Bantuan?</h4>
                    <p className="text-sm text-brand-100/80 mb-6 leading-relaxed">
                      Konsultasi gratis dengan ahli IT kami untuk rekomendasi produk terbaik.
                    </p>
                    <div className="space-y-3">
                      <button 
                        onClick={() => window.open(`https://wa.me/${CONTACT_INFO.whatsapp}`, '_blank')}
                        className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                      >
                        <MessageCircle size={18} />
                        WhatsApp
                      </button>
                      <button 
                        onClick={handleContactPhone}
                        className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all border border-white/20 flex items-center justify-center gap-2"
                      >
                        <Phone size={18} />
                        Telepon
                      </button>
                    </div>
                  </div>
                </div>

                {/* Why Choose Us */}
                <div className="bg-white dark:bg-dark-surface rounded-2xl p-6 shadow-sm border dark:border-dark-border">
                  <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                    Keunggulan Kami
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    {[
                      'Produk 100% Original',
                      'Garansi Resmi Distributor',
                      'Teknisi Berpengalaman',
                      'After-Sales Support 24/7',
                      'Harga Kompetitif',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Product Area */}
          <div className="lg:col-span-9">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-8 md:mb-12">
              {/* Search Bar */}
              <div className="relative w-full md:flex-1 md:max-w-md">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Cari laptop, PC, atau aksesoris..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border focus:border-brand-500 rounded-2xl outline-none focus:ring-4 focus:ring-brand-500/10 transition-all dark:text-white font-medium shadow-sm"
                />
              </div>
              
              {/* Sort & View Controls */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-dark-surface rounded-xl border dark:border-dark-border shadow-sm flex-1 md:flex-initial">
                  <SortDesc className="w-4 h-4 text-brand-500" />
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent text-sm font-semibold text-gray-700 dark:text-gray-300 outline-none cursor-pointer"
                  >
                    <option value="featured">Unggulan</option>
                    <option value="low-high">Harga: Rendah ke Tinggi</option>
                    <option value="high-low">Harga: Tinggi ke Rendah</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="hidden md:flex gap-2 p-1 bg-white dark:bg-dark-surface rounded-xl border dark:border-dark-border shadow-sm">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-brand-500 text-white shadow-md' : 'text-gray-400 hover:text-brand-500'}`}
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-lg transition-all ${viewMode === 'list' ? 'bg-brand-500 text-white shadow-md' : 'text-gray-400 hover:text-brand-500'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Info */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Menampilkan <span className="font-bold text-gray-900 dark:text-white">{filteredProducts.length}</span> produk
                {activeCategory !== 'all' && (
                  <span> dalam kategori <span className="font-bold text-brand-500">{categories.find(c => c.id === activeCategory)?.label}</span></span>
                )}
              </p>
            </div>

            {/* Products Grid/List */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8' : 'space-y-6'}>
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, idx) => (
                  viewMode === 'grid' ? (
                    <ProductCard key={product.id} product={product} index={idx} onContact={handleContactWhatsApp} />
                  ) : (
                    <ProductListItem key={product.id} product={product} index={idx} onContact={handleContactWhatsApp} />
                  )
                ))}
              </AnimatePresence>
            </div>
            
            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20 md:py-32 bg-white dark:bg-dark-surface/30 rounded-3xl border-2 border-dashed dark:border-dark-border">
                <Package className="w-16 h-16 mx-auto mb-6 text-gray-300" />
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Produk Tidak Ditemukan</h3>
                <p className="text-gray-500 max-w-md mx-auto leading-relaxed mb-8">
                  Maaf, produk yang Anda cari tidak tersedia. Coba ubah filter atau kata kunci pencarian.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="px-8 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-semibold transition-all shadow-lg shadow-brand-500/20"
                >
                  Reset Pencarian
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Grid View Product Card
const ProductCard: React.FC<{ product: Product; index: number; onContact: (product: Product) => void }> = ({ product, index, onContact }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group bg-white dark:bg-dark-surface rounded-3xl border border-gray-100 dark:border-dark-border overflow-hidden hover:shadow-2xl transition-all flex flex-col h-full"
    >
      {/* Image */}
      <div 
        className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-dark-bg cursor-pointer" 
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img 
          src={product.image_url} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/95 dark:bg-dark-surface/95 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-brand-600 shadow-lg border dark:border-dark-border">
            {product.category}
          </span>
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
          <button 
            onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
            className="w-full bg-white text-gray-900 py-3 rounded-xl font-bold text-sm hover:bg-brand-500 hover:text-white transition-all shadow-xl flex items-center justify-center gap-2"
          >
            <Info size={18} />
            Detail Produk
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}
          <span className="text-xs text-gray-500 ml-1">(5.0)</span>
        </div>

        {/* Title */}
        <h3 
          onClick={() => navigate(`/product/${product.id}`)}
          className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight hover:text-brand-500 transition-colors cursor-pointer line-clamp-2"
        >
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        {/* Price & CTA */}
        <div className="mt-auto pt-6 border-t dark:border-dark-border">
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Harga</p>
              <p className="text-2xl font-black text-gray-900 dark:text-white">
                Rp {new Intl.NumberFormat('id-ID').format(Number(product.price))}
              </p>
            </div>
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => navigate(`/product/${product.id}`)}
              className="px-4 py-3 bg-gray-100 dark:bg-dark-bg text-gray-700 dark:text-white rounded-xl font-semibold text-sm hover:bg-gray-200 dark:hover:bg-dark-border transition-all flex items-center justify-center gap-2"
            >
              <Info size={16} />
              Info
            </button>
            <button 
              onClick={() => onContact(product)}
              className="px-4 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2"
            >
              <ShoppingCart size={16} />
              Beli
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// List View Product Item
const ProductListItem: React.FC<{ product: Product; index: number; onContact: (product: Product) => void }> = ({ product, index, onContact }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className="group bg-white dark:bg-dark-surface rounded-2xl border border-gray-100 dark:border-dark-border overflow-hidden hover:shadow-xl transition-all"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div 
          className="relative w-full md:w-64 aspect-square md:aspect-auto cursor-pointer overflow-hidden bg-gray-50 dark:bg-dark-bg" 
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <img 
            src={product.image_url} 
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-white/95 dark:bg-dark-surface/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-brand-600 shadow-lg">
              {product.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />)}
            <span className="text-xs text-gray-500 ml-1">(5.0)</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => navigate(`/product/${product.id}`)}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-3 hover:text-brand-500 transition-colors cursor-pointer"
          >
            {product.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Price & Actions */}
          <div className="mt-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 border-t dark:border-dark-border">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Harga Terbaik</p>
              <p className="text-3xl font-black text-gray-900 dark:text-white">
                Rp {new Intl.NumberFormat('id-ID').format(Number(product.price))}
              </p>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => navigate(`/product/${product.id}`)}
                className="px-6 py-3 bg-gray-100 dark:bg-dark-bg text-gray-700 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-dark-border transition-all flex items-center gap-2"
              >
                <Info size={18} />
                Detail
              </button>
              <button 
                onClick={() => onContact(product)}
                className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-semibold transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2"
              >
                <ShoppingCart size={18} />
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShopPremium;
