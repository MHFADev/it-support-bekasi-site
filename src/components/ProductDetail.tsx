import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Star, 
  BadgeCheck, 
  MessageCircle,
  Share2,
  Heart,
  Laptop,
  Cpu,
  HardDrive,
  Monitor,
  Check,
  Plus,
  Minus,
  Shield,
  Truck,
  Store,
  ChevronRight,
  Info,
  ExternalLink,
  Smartphone,
  Server
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
  const [activeTab, setActiveTab] = useState<'detail' | 'specs' | 'reviews'>('detail');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');

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
      setSelectedImage(data.image_url);

      // Fetch related products
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
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image_url: product.image_url,
      quantity: quantity
    });
    toast.success(`${product.title} berhasil ditambah ke keranjang`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 animate-pulse">
            <div className="lg:col-span-5 aspect-square bg-gray-100 dark:bg-slate-800 rounded-2xl"></div>
            <div className="lg:col-span-4 space-y-6">
              <div className="h-10 bg-gray-100 dark:bg-slate-800 rounded w-1/4"></div>
              <div className="h-12 bg-gray-100 dark:bg-slate-800 rounded"></div>
              <div className="h-6 bg-gray-100 dark:bg-slate-800 rounded w-1/2"></div>
              <div className="h-32 bg-gray-100 dark:bg-slate-800 rounded"></div>
            </div>
            <div className="lg:col-span-3 h-[400px] bg-gray-100 dark:bg-slate-800 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Info className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Produk Tidak Ditemukan</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
            Maaf, produk yang Anda cari mungkin sudah tidak tersedia atau telah dihapus.
          </p>
          <Button asChild className="rounded-full px-8">
            <Link to="/shop">Jelajahi Produk Lain</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8 py-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/shop" className="hover:text-primary transition-colors">Katalog</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 dark:text-white font-medium truncate max-w-[200px] sm:max-w-xs">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-4 xl:col-span-5">
            <div className="sticky top-28 space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group"
              >
                <img
                  src={selectedImage || product.image_url}
                  alt={product.title}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button variant="secondary" size="icon" className="rounded-full shadow-lg hover:scale-110 transition-transform">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="secondary" size="icon" className="rounded-full shadow-lg hover:scale-110 transition-transform" onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: product.title,
                        url: window.location.href
                      });
                    }
                  }}>
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>

                {product.stock_status === 'in_stock' && (
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none px-4 py-1 text-xs text-white">
                      <Check className="w-3 h-3 mr-1" /> Ready Stock
                    </Badge>
                  </div>
                )}
              </motion.div>

              {/* Thumbnails (Mockup for multiple images) */}
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {[product.image_url, product.image_url, product.image_url, product.image_url].map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={cn(
                      "w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-slate-50 dark:bg-slate-900 p-2",
                      selectedImage === img ? "border-primary" : "border-transparent hover:border-slate-300 dark:hover:border-slate-700"
                    )}
                  >
                    <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column: Product Info */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-8">
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {product.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="flex items-center bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                    <span className="font-bold text-amber-600 dark:text-amber-400">4.9</span>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">(150+ Terjual)</span>
                </div>
                <div className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                <Badge variant="outline" className="rounded-full text-xs border-primary text-primary">
                  {product.category}
                </Badge>
              </div>

              <div className="text-3xl sm:text-4xl font-black text-primary py-2">
                {formatPrice(product.price)}
              </div>
            </div>

            {/* Seller Trust */}
            <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Store className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    IT Support Bekasi <BadgeCheck className="w-4 h-4 text-primary" />
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Online 5 menit lalu • Kota Bekasi</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="rounded-full text-xs">Follow</Button>
            </div>

            {/* Tabs Section */}
            <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex gap-8 border-b border-slate-100 dark:border-slate-800 sticky top-24 bg-white dark:bg-slate-950 z-10">
                {(['detail', 'specs', 'reviews'] as const).map((tab) => (
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
                    {tab === 'detail' ? 'Detail Produk' : tab === 'specs' ? 'Spesifikasi' : 'Ulasan'}
                    {activeTab === tab && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      />
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="min-h-[200px]"
                >
                  {activeTab === 'detail' && (
                    <div className="space-y-4">
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                        {product.description}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                          <Shield className="w-5 h-5 text-emerald-500" />
                          <div className="text-xs">
                            <p className="font-bold text-slate-900 dark:text-white">Garansi 1 Tahun</p>
                            <p className="text-slate-500">Resmi IT Support Bekasi</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                          <Truck className="w-5 h-5 text-blue-500" />
                          <div className="text-xs">
                            <p className="font-bold text-slate-900 dark:text-white">Bisa COD</p>
                            <p className="text-slate-500">Khusus area Bekasi & sekitarnya</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <div className="space-y-4">
                      {product.specifications && product.specifications.length > 0 ? (
                        <div className="grid grid-cols-1 gap-2">
                          {product.specifications.map((spec: any, index: number) => (
                            <div key={index} className="flex py-3 border-b border-slate-50 dark:border-slate-900 last:border-0">
                              <span className="w-1/3 text-slate-500 dark:text-slate-400 text-sm">{spec.label}</span>
                              <span className="w-2/3 font-bold text-slate-900 dark:text-white text-sm">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-12 text-center text-slate-500 italic">Spesifikasi belum tersedia</div>
                      )}
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-8">
                      {[1, 2].map((i) => (
                        <div key={i} className="space-y-3 pb-6 border-b border-slate-100 dark:border-slate-800 last:border-0">
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                            </div>
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Verified Purchase</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800" />
                            <span className="text-sm font-bold text-slate-900 dark:text-white">Customer {i}</span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            "Barangnya bagus banget, original 100%. Teknisi ramah pas nanya-nanya spec. Rekomen banget!"
                          </p>
                        </div>
                      ))}
                      <Button variant="ghost" className="w-full text-xs text-primary font-bold">Lihat Semua Ulasan (127)</Button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Order Card */}
          <div className="lg:col-span-3">
            <div className="sticky top-28 space-y-4">
              <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6">
                <h3 className="font-extrabold text-slate-900 dark:text-white">Atur Jumlah</h3>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg p-1">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                    >
                      <Minus className="w-4 h-4 text-slate-600" />
                    </button>
                    <span className="w-10 text-center font-bold text-slate-900 dark:text-white">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                    >
                      <Plus className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                  <div className="text-sm text-slate-500">
                    Stok: <span className="font-bold text-slate-900 dark:text-white">12</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-sm text-slate-500">Subtotal</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white">{formatPrice(product.price * quantity)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={handleAddToCart}
                    className="w-full h-12 rounded-xl font-bold text-sm bg-primary hover:bg-primary/90 text-white"
                  >
                    + Keranjang
                  </Button>
                  <Button 
                    onClick={handleWhatsAppOrder}
                    variant="outline"
                    className="w-full h-12 rounded-xl font-bold text-sm border-2 border-primary text-primary hover:bg-primary/5"
                  >
                    Beli Langsung
                  </Button>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary/40" />
                <div className="text-[10px] text-slate-500 leading-tight">
                  <p className="font-bold text-slate-900 dark:text-white mb-0.5">Transaksi Aman & Nyaman</p>
                  <p>Pembayaran aman, garansi uang kembali jika produk tidak sesuai deskripsi.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-32">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Pilihan Lain Untukmu</h2>
              <Link to="/shop" className="text-sm font-bold text-primary hover:underline">Lihat Semua</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((related) => (
                <Link key={related.id} to={`/product/${related.id}`}>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all h-full flex flex-col"
                  >
                    <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-800 p-4">
                      <img
                        src={related.image_url}
                        alt={related.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-2 mb-2">
                          {related.title}
                        </h3>
                        <p className="text-primary font-black text-base">
                          {formatPrice(related.price)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 mt-3">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-[10px] text-slate-500">4.9 | Terjual 10+</span>
                      </div>
                    </div>
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
