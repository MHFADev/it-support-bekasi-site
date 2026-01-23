import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Laptop, ShoppingCart, Star, BadgeCheck, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock_status: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('stock_status', 'in_stock')
        .eq('category', 'Laptop')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-6 animate-pulse">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 dark:bg-primary/20 rounded-full mb-6 border border-primary/20">
              <Laptop className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">Laptop Pilihan Terbaik</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6">
              Laptop Bekas <span className="gradient-text">Berkualitas</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Pilihan laptop bekas terbaik dengan garansi resmi dan harga terjangkau untuk kebutuhan Anda
            </p>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link to={`/product/${product.id}`}>
                <div className="group product-card-hover bg-card rounded-3xl overflow-hidden border border-border/50 shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-4">
                  {/* Image Container - Premium Design */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* Multi-layer Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.12),transparent_60%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--ring)/0.08),transparent_50%)]" />
                    
                    {/* Decorative Circles */}
                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 group-hover:bg-primary/15 transition-all duration-700" />
                    <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl group-hover:scale-125 transition-all duration-700" />
                    
                    {/* Product Image */}
                    <div className="relative w-full h-full flex items-center justify-center p-6 lg:p-8">
                      {product.image_url ? (
                        <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1200px' }}>
                          <img
                            src={product.image_url}
                            alt={product.title}
                            className="max-w-[85%] max-h-[85%] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.2)] transition-all duration-700 ease-out group-hover:scale-110"
                            style={{ 
                              transform: 'rotateY(0deg) rotateX(0deg)',
                              transition: 'all 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'rotateY(-12deg) rotateX(8deg) scale(1.12)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)'}
                          />
                          {/* Reflection/Shadow */}
                          <div className="absolute bottom-2 inset-x-8 h-8 bg-gradient-to-t from-black/15 to-transparent blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-x-75" />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="p-8 rounded-3xl bg-muted/30">
                            <Laptop className="w-20 h-20 text-muted-foreground" />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Premium Badge */}
                    <div className="absolute top-4 left-4 badge-glass px-4 py-2 rounded-full z-10 flex items-center gap-2">
                      <BadgeCheck className="w-4 h-4 text-primary" />
                      <span className="text-[10px] font-bold tracking-wider uppercase text-foreground">Best Choice</span>
                    </div>

                    {/* Hover Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div className="p-5 lg:p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">(4.8)</span>
                    </div>

                    <h3 className="text-lg lg:text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {product.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-5 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-0.5">Harga Mulai</div>
                        <div className="text-xl lg:text-2xl font-extrabold text-primary">
                          {formatPrice(product.price)}
                        </div>
                      </div>
                      <div className="bg-primary/10 text-primary w-11 h-11 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
          >
            Lihat Semua Produk
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
