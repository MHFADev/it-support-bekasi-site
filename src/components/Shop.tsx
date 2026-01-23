import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Laptop, 
  Search, 
  Filter, 
  ShoppingCart, 
  Star, 
  BadgeCheck,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { CATEGORIES } from '@/constants';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock_status: string;
}

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory, priceRange]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
      setFilteredProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'Semua') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Semua');
    setPriceRange([0, 50000000]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-6 animate-pulse">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 relative"
        >
          <div className="absolute -top-10 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-5 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <span className="inline-block px-4 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary rounded-full text-sm font-semibold mb-4 tracking-wide">
              🛒 Toko Online Terpercaya
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              <span className="text-foreground">Katalog Laptop</span>{' '}
              <span className="gradient-text">Terlengkap</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Temukan <span className="text-primary font-semibold">{filteredProducts.length}</span> produk laptop & hardware berkualitas dengan harga terbaik
            </p>
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari laptop..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>

            {/* Filter Toggle Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filter
            </button>
          </div>

          {/* Filters (Desktop always visible, Mobile toggle) */}
          <div className={`mt-4 space-y-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
            {/* Category Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Kategori
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('Semua')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === 'Semua'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                  }`}
                >
                  Semua
                </button>
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Rentang Harga
                </label>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </span>
              </div>
              <div className="flex gap-4">
                <select
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="flex-1 px-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                >
                  <option value={0}>Rp 0</option>
                  <option value={3000000}>Rp 3 Juta</option>
                  <option value={5000000}>Rp 5 Juta</option>
                  <option value={10000000}>Rp 10 Juta</option>
                </select>
                <select
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="flex-1 px-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                >
                  <option value={5000000}>Rp 5 Juta</option>
                  <option value={10000000}>Rp 10 Juta</option>
                  <option value={20000000}>Rp 20 Juta</option>
                  <option value={50000000}>Rp 50 Juta+</option>
                </select>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetFilters}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
              Reset Filter
            </button>
          </div>
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <Laptop className="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Produk tidak ditemukan
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Coba ubah filter atau kata kunci pencarian
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Reset Filter
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link to={`/product/${product.id}`}>
                  <div className="group product-card-hover bg-card rounded-3xl overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-3">
                    {/* Image Container - Modern Dynamic Design */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {/* Animated Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800" />
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.15),transparent_50%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--ring)/0.1),transparent_50%)]" />
                      
                      {/* Decorative Elements */}
                      <div className="absolute top-4 right-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                      <div className="absolute bottom-4 left-4 w-16 h-16 bg-blue-400/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
                      
                      {/* Product Image */}
                      <div className="relative w-full h-full flex items-center justify-center p-6">
                        {product.image_url ? (
                          <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1000px' }}>
                            <img
                              src={product.image_url}
                              alt={product.title}
                              className="max-w-[90%] max-h-[90%] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-700 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_30px_50px_rgba(0,0,0,0.25)]"
                              style={{ 
                                transform: 'rotateY(0deg)',
                                transition: 'transform 0.7s ease-out'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.transform = 'rotateY(-8deg) rotateX(5deg) scale(1.1)'}
                              onMouseLeave={(e) => e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)'}
                            />
                            {/* Dynamic Shadow */}
                            <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-black/10 to-transparent blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="p-6 rounded-2xl bg-muted/50">
                              <Laptop className="w-16 h-16 text-muted-foreground" />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Status Badge */}
                      {product.stock_status === 'in_stock' && (
                        <div className="absolute top-4 left-4 badge-glass px-3 py-1.5 rounded-full z-20 flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-[10px] font-bold tracking-wider uppercase text-foreground">Ready Stock</span>
                        </div>
                      )}
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>

                    {/* Content */}
                    <div className="p-5 lg:p-6">
                      {/* Category Tag */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-bold tracking-wider uppercase rounded-md">
                          {product.category}
                        </span>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      
                      <h3 className="text-lg lg:text-xl font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-300">
                        {product.title}
                      </h3>

                      <p className="text-sm text-muted-foreground mb-5 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-0.5">Harga</div>
                          <div className="text-xl lg:text-2xl font-extrabold text-primary">
                            {formatPrice(product.price)}
                          </div>
                        </div>
                        <div className="bg-primary text-primary-foreground w-11 h-11 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center shadow-lg shadow-primary/25 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                          <ShoppingCart className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
