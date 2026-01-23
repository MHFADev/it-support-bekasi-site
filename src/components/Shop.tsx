import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  X,
  SlidersHorizontal,
  ChevronDown,
  LayoutGrid,
  List
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { CATEGORIES } from '@/constants';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from './ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Skeleton } from './ui/skeleton';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000000]);
  const [sortOption, setSortOption] = useState('newest');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory, priceRange, sortOption]);

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

    // Search
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category
    if (selectedCategory !== 'Semua') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Price
    filtered = filtered.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    if (sortOption === 'newest') {
      filtered.sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
    } else if (sortOption === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Semua');
    setPriceRange([0, 50000000]);
    setSortOption('newest');
  };

  const FilterSidebar = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Kategori</h3>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedCategory('Semua')}
            className={`w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200 font-medium flex justify-between items-center ${
              selectedCategory === 'Semua' 
                ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                : 'hover:bg-muted text-slate-600 dark:text-slate-300'
            }`}
          >
            Semua Produk
            {selectedCategory === 'Semua' && <div className="w-2 h-2 rounded-full bg-white" />}
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200 font-medium flex justify-between items-center ${
                selectedCategory === category 
                  ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                  : 'hover:bg-muted text-slate-600 dark:text-slate-300'
              }`}
            >
              {category}
              {selectedCategory === category && <div className="w-2 h-2 rounded-full bg-white" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Rentang Harga</h3>
        <div className="space-y-4">
           <div className="space-y-2">
             <label className="text-xs font-medium text-slate-500">Minimum</label>
             <select
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value={0}>Rp 0</option>
                <option value={3000000}>Rp 3.000.000</option>
                <option value={5000000}>Rp 5.000.000</option>
                <option value={10000000}>Rp 10.000.000</option>
              </select>
           </div>
           <div className="space-y-2">
             <label className="text-xs font-medium text-slate-500">Maksimum</label>
             <select
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value={5000000}>Rp 5.000.000</option>
                <option value={10000000}>Rp 10.000.000</option>
                <option value={20000000}>Rp 20.000.000</option>
                <option value={50000000}>Rp 50.000.000+</option>
              </select>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header Section */}
      <div className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-wide uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Katalog Resmi
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white">
              Temukan Laptop <br/>
              <span className="gradient-text">Impian Anda</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Koleksi laptop terbaik dengan garansi resmi dan layanan purna jual terpercaya.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-8 sticky top-24 h-fit">
            <FilterSidebar />
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Mobile Filter & Sort Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-border">
              {/* Search */}
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Cari produk..." 
                  className="pl-10 bg-slate-50 dark:bg-slate-800 border-none focus-visible:ring-1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                {/* Mobile Filter Trigger */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden flex-1 sm:flex-none">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px]">
                    <SheetHeader className="mb-6">
                      <SheetTitle>Filter Produk</SheetTitle>
                    </SheetHeader>
                    <FilterSidebar />
                  </SheetContent>
                </Sheet>

                {/* Sort Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex-1 sm:flex-none justify-between gap-2 min-w-[140px]">
                      <span className="truncate">
                        {sortOption === 'newest' && 'Terbaru'}
                        {sortOption === 'price_asc' && 'Harga Terendah'}
                        {sortOption === 'price_desc' && 'Harga Tertinggi'}
                      </span>
                      <ChevronDown className="w-4 h-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[180px]">
                    <DropdownMenuItem onClick={() => setSortOption('newest')}>
                      Terbaru
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption('price_asc')}>
                      Harga Terendah
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption('price_desc')}>
                      Harga Tertinggi
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="space-y-4">
                    <Skeleton className="aspect-[4/3] rounded-2xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-border"
              >
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Tidak ada produk ditemukan</h3>
                <p className="text-muted-foreground mb-6">Coba ubah kata kunci atau reset filter anda.</p>
                <Button onClick={resetFilters} variant="outline" className="border-primary text-primary hover:bg-primary/5">
                  Reset Filter
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
