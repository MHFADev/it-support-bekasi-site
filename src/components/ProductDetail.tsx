import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Share2,
  Check,
  Plus,
  Minus,
  Shield,
  Truck,
  MessageCircle,
  ChevronRight,
  Star,
  Box
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { CONTACT_INFO } from '@/constants';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import { Skeleton } from './ui/skeleton';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeImage, setActiveImage] = useState(0);

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
      maximumFractionDigits: 0,
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
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <Skeleton className="aspect-[4/3] rounded-3xl" />
            </div>
            <div className="lg:col-span-5 space-y-6">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Produk Tidak Ditemukan</h2>
          <Button asChild>
            <Link to="/shop">Kembali ke Shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 font-bold">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-12 xl:gap-20">
          {/* Left Column: Images (Sticky) */}
          <div className="lg:col-span-7">
            <div className="sticky top-32 space-y-6">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 shadow-2xl group"
               >
                 <img
                   src={product.image_url}
                   alt={product.title}
                   className="w-full h-full object-cover z-10 transition-transform duration-700 group-hover:scale-105"
                 />
                 
                 <div className="absolute top-6 right-6 z-20">
                   <Button 
                     variant="secondary" 
                     size="icon" 
                     className="rounded-full shadow-lg bg-white/90 backdrop-blur hover:scale-110 transition-transform"
                     onClick={() => {
                        if (navigator.share) {
                          navigator.share({ title: product.title, url: window.location.href });
                        }
                     }}
                   >
                     <Share2 className="w-5 h-5 text-slate-900" />
                   </Button>
                 </div>
               </motion.div>
            </div>
          </div>

          {/* Right Column: Details (Scrollable) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full">
                    {String(product.category)}
                  </Badge>
                  {product.stock_status === 'in_stock' && (
                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" /> Ready Stock
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1]">
                  {product.title}
                </h1>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-primary">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>

              {/* Action Buttons - Top for Mobile */}
              <div className="grid grid-cols-2 gap-4 lg:hidden">
                <Button onClick={handleAddToCart} size="lg" className="rounded-xl font-bold bg-slate-900 text-white">
                  + Keranjang
                </Button>
                <Button onClick={handleWhatsAppOrder} size="lg" className="rounded-xl font-bold bg-green-600 hover:bg-green-700 text-white">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </Button>
              </div>

              <div className="prose prose-slate max-w-none">
                 <p className="text-lg leading-relaxed text-slate-600 font-medium">
                   {product.description}
                 </p>
              </div>

              {/* Specifications */}
              {product.specifications && product.specifications.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                    <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                      <Box className="w-5 h-5 text-primary" />
                      Spesifikasi Teknis
                    </h3>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {product.specifications.map((spec: any, idx: number) => (
                      <div key={idx} className="grid grid-cols-3 px-6 py-4 hover:bg-slate-50 transition-colors">
                        <span className="text-sm font-bold text-slate-500 col-span-1">{spec.label}</span>
                        <span className="text-sm font-black text-slate-900 col-span-2">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-100">
                  <Shield className="w-8 h-8 text-blue-600" />
                  <div>
                    <h4 className="font-black text-sm text-blue-900">Garansi Resmi</h4>
                    <p className="text-xs text-blue-700 font-medium">Jaminan produk original</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-50 border border-green-100">
                  <Truck className="w-8 h-8 text-green-600" />
                  <div>
                    <h4 className="font-black text-sm text-green-900">Pengiriman Aman</h4>
                    <p className="text-xs text-green-700 font-medium">Packing extra bubble</p>
                  </div>
                </div>
              </div>

              {/* Sticky Action Bar for Desktop */}
              <div className="hidden lg:block pt-8 border-t border-slate-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl p-1">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-lg transition-all"
                    >
                      <Minus className="w-4 h-4 text-slate-600" />
                    </button>
                    <span className="w-12 text-center font-black text-lg text-slate-900">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-lg transition-all"
                    >
                      <Plus className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                  <div className="text-sm text-slate-500 font-bold">
                    Total: <span className="font-black text-slate-900 text-2xl ml-1">{formatPrice(product.price * quantity)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    onClick={handleAddToCart} 
                    size="lg" 
                    className="h-14 text-lg rounded-xl font-black bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10"
                  >
                    + Keranjang
                  </Button>
                  <Button 
                    onClick={handleWhatsAppOrder} 
                    size="lg" 
                    className="h-14 text-lg rounded-xl font-black bg-green-600 hover:bg-green-700 text-white shadow-xl shadow-green-600/20"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Beli via WA
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 border-t border-slate-100 pt-20">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-black text-slate-900">Produk Sejenis</h2>
              <Link to="/shop" className="text-primary font-black hover:underline">Lihat Semua</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((related, i) => (
                <ProductCard key={related.id} product={related} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
