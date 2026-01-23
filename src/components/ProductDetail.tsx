import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ShoppingCart, 
  BadgeCheck, 
  Share2,
  Check,
  Plus,
  Minus,
  Shield,
  Truck,
  Info,
  ChevronRight
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { CONTACT_INFO } from '@/constants';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock_status: string;
  specifications: any[];
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'detail' | 'specs'>('detail');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setProduct(data);

      const { data: related } = await supabase
        .from('products')
        .select('*')
        .eq('category', data.category)
        .neq('id', id)
        .limit(4);

      setRelatedProducts(related || []);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Gagal memuat detail produk');
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

  const handleWhatsAppOrder = () => {
    if (!product) return;
    const message = `Halo IT Support Bekasi, saya ingin memesan:\n\n*${product.title}*\nJumlah: ${quantity}\nHarga: ${formatPrice(product.price * quantity)}\n\nApakah stok masih tersedia?`;
    const url = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleAddToCart = () => {
    if (!product) return;
    const priceNum = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title: product.title,
        price: priceNum,
        image_url: product.image_url,
      });
    }
    toast.success(`${product.title} berhasil ditambah ke keranjang`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 animate-pulse">
            <div className="lg:col-span-6 aspect-square bg-muted rounded-2xl"></div>
            <div className="lg:col-span-6 space-y-6">
              <div className="h-10 bg-muted rounded w-1/4"></div>
              <div className="h-12 bg-muted rounded"></div>
              <div className="h-6 bg-muted rounded w-1/2"></div>
              <div className="h-32 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <Info className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Produk Tidak Ditemukan</h2>
          <Button asChild className="rounded-full px-8">
            <Link to="/shop">Jelajahi Produk Lain</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 py-4">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/shop" className="hover:text-primary transition-colors">Katalog</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium truncate">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white border border-border group shadow-sm">
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-6 right-6">
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="rounded-full shadow-md bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: product.title, url: window.location.href });
                    }
                  }}
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="space-y-4">
              <Badge variant="outline" className="px-4 py-1 rounded-full border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest">
                {product.category}
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                {product.title}
              </h1>
              <div className="text-4xl font-black text-primary">
                {formatPrice(product.price)}
              </div>
            </div>

            <div className="flex gap-4 border-b border-border">
              {(['detail', 'specs'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "pb-4 text-sm font-bold capitalize transition-all relative",
                    activeTab === tab 
                      ? "text-primary" 
                      : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  )}
                >
                  {tab === 'detail' ? 'Deskripsi' : 'Spesifikasi'}
                  {activeTab === tab && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
              ))}
            </div>

            <div className="min-h-[150px] text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              {activeTab === 'detail' ? (
                <p className="whitespace-pre-wrap">{product.description}</p>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {product.specifications?.length ? (
                    product.specifications.map((spec: any, i: number) => (
                      <div key={i} className="flex py-3 border-b border-border last:border-0">
                        <span className="w-1/3 text-slate-500 font-medium">{spec.label}</span>
                        <span className="w-2/3 font-bold text-slate-900 dark:text-white">{spec.value}</span>
                      </div>
                    ))
                  ) : (
                    <p className="italic text-slate-400">Spesifikasi belum tersedia</p>
                  )}
                </div>
              )}
            </div>

            <div className="pt-8 border-t border-border space-y-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 shrink-0">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all shadow-sm">
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-12 text-center font-black text-xl">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center hover:bg-white dark:hover:bg-slate-700 rounded-xl transition-all shadow-sm">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Total Harga</p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white">{formatPrice(product.price * quantity)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button onClick={handleAddToCart} size="lg" className="h-16 rounded-2xl font-black text-lg bg-slate-900 hover:bg-slate-800 dark:bg-primary dark:hover:bg-primary/90 text-white shadow-xl">
                  + Keranjang
                </Button>
                <Button onClick={handleWhatsAppOrder} size="lg" variant="outline" className="h-16 rounded-2xl font-black text-lg border-2 border-primary text-primary hover:bg-primary/5">
                  Beli Sekarang
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-32 pt-20 border-t border-border">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-10">Produk Terkait</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {relatedProducts.map((related) => (
                <Link key={related.id} to={`/product/${related.id}`}>
                  <motion.div whileHover={{ y: -8 }} className="group">
                    <div className="relative aspect-square overflow-hidden bg-white rounded-3xl border border-border group-hover:shadow-xl transition-all p-6 mb-4">
                      <img src={related.image_url} alt={related.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base line-clamp-1 group-hover:text-primary transition-colors">{related.title}</h3>
                    <p className="text-primary font-black text-lg">{formatPrice(related.price)}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
