import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { CONTACT_INFO } from '@/constants';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

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
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setProduct(data);

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
    const message = `Halo IT Support Bekasi, saya tertarik dengan ${product.title} (Rp ${new Intl.NumberFormat('id-ID').format(product.price)}). Bisa tanya-tanya lebih lanjut?`;
    const url = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.title,
          text: product?.description,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product as any);
      toast.success('Ditambahkan ke keranjang', {
        description: product.title
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-32 noise-bg">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 animate-pulse">
            <div className="aspect-square bg-accent/20 rounded-3xl"></div>
            <div className="space-y-8">
              <div className="h-16 bg-accent/20 rounded-2xl"></div>
              <div className="h-8 bg-accent/20 rounded-xl w-3/4"></div>
              <div className="h-32 bg-accent/20 rounded-2xl"></div>
              <div className="h-20 bg-accent/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center noise-bg">
        <div className="text-center glass-panel p-16 rounded-[3rem] shadow-2xl">
          <Laptop className="w-24 h-24 text-primary/20 mx-auto mb-8 animate-bounce" />
          <h2 className="text-3xl font-bold text-foreground mb-6 font-serif">
            Produk tidak ditemukan
          </h2>
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 premium-gradient text-white rounded-full font-bold hover:scale-105 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 noise-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-12 transition-colors font-bold uppercase tracking-widest text-xs group"
        >
          <div className="w-8 h-8 rounded-full bg-accent/50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Kembali ke Katalog
        </motion.button>

        {/* Product Detail */}
        <div className="grid lg:grid-cols-2 gap-16 mb-32 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.2, 0, 0.2, 1] }}
          >
            <div className="sticky top-32">
              <div className="relative aspect-square rounded-[3rem] overflow-hidden glass-panel shadow-2xl group border border-white/10">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-accent/5">
                    <Laptop className="w-32 h-32 text-primary/10" />
                  </div>
                )}
                
                {/* Actions */}
                <div className="absolute top-6 right-6 flex gap-3">
                  <button
                    onClick={handleShare}
                    className="w-12 h-12 glass-panel rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="w-12 h-12 glass-panel rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 hover:bg-red-500 hover:text-white transition-all duration-300">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                {/* Stock Badge */}
                {product.stock_status === 'in_stock' && (
                  <div className="absolute bottom-6 left-6 premium-gradient text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-2xl">
                    <BadgeCheck className="w-4 h-4" />
                    Unit Tersedia
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">(4.9 / 120 Verified reviews)</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground font-serif leading-tight">
                {product.title}
              </h1>

              {/* Category */}
              <div className="inline-flex items-center gap-3 px-5 py-2 glass-panel rounded-full border-primary/20">
                <Laptop className="w-4 h-4 text-primary" />
                <span className="text-primary font-bold text-[10px] uppercase tracking-[0.2em]">{product.category}</span>
              </div>
            </div>

            {/* Price Card */}
            <div className="premium-gradient rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
              <div className="text-white/60 text-xs font-bold uppercase tracking-[0.3em] mb-3 relative z-10">Penawaran Eksklusif</div>
              <div className="text-5xl font-black text-white tracking-tighter relative z-10">
                {formatPrice(product.price)}
              </div>
              <div className="text-white/40 text-[10px] uppercase tracking-widest mt-4 font-medium relative z-10 flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" /> Jaminan Harga Terbaik & Garansi Resmi
              </div>
            </div>

            {/* Description */}
            <div className="glass-panel rounded-[2.5rem] p-10">
              <h3 className="text-xl font-bold text-foreground mb-6 font-serif">Detail Produk</h3>
              <p className="text-muted-foreground leading-relaxed font-light text-lg">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-foreground font-serif ml-2">Spesifikasi Unggulan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.specifications.map((spec: any, index: number) => (
                    <div key={index} className="card-premium group/spec border-beam">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 glass-panel rounded-xl flex items-center justify-center text-primary group-hover/spec:premium-gradient group-hover/spec:text-white transition-all duration-500">
                          {spec.label?.toLowerCase().includes('processor') ? (
                            <Cpu className="w-6 h-6" />
                          ) : spec.label?.toLowerCase().includes('storage') || spec.label?.toLowerCase().includes('ssd') ? (
                            <HardDrive className="w-6 h-6" />
                          ) : (
                            <Monitor className="w-6 h-6" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">{spec.label}</div>
                          <div className="font-bold text-foreground truncate">{spec.value}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 pt-10">
              <button
                onClick={handleWhatsAppOrder}
                className="flex-1 flex items-center justify-center gap-3 px-10 py-5 bg-[#25D366] text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-green-500/30 hover:scale-[1.03] active:scale-[0.98] transition-all group"
              >
                <MessageCircle className="w-6 h-6 group-hover:scale-125 transition-transform" />
                Pesan Sekarang
              </button>
              <button 
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-3 px-10 py-5 glass-panel text-foreground font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-primary hover:text-white hover:border-primary/50 transition-all group shadow-xl"
              >
                <ShoppingCart className="w-6 h-6 group-hover:scale-125 transition-transform" />
                Masuk Keranjang
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-border/50">
              {[
                { icon: <BadgeCheck className="w-8 h-8 text-primary" />, label: "Garansi", sub: "Resmi IT" },
                { icon: <ShieldCheck className="w-8 h-8 text-accent" />, label: "Original", sub: "100% Produk" },
                { icon: <CheckCircle2 className="w-8 h-8 text-green-500" />, label: "Support", sub: "Teknisi Ahli" }
              ].map((badge, i) => (
                <div key={i} className="text-center group">
                  <div className="mb-3 transition-transform group-hover:scale-110 duration-500">{badge.icon}</div>
                  <div className="text-xs font-black text-foreground uppercase tracking-widest">{badge.label}</div>
                  <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">{badge.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-20 border-t border-border/50">
            <h2 className="text-4xl font-bold text-foreground mb-16 font-serif">Koleksi <span className="text-primary italic">Terkait</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {relatedProducts.map((relatedProduct, i) => (
                <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="card-premium group"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-accent/10 mb-6">
                      {relatedProduct.image_url ? (
                        <img
                          src={relatedProduct.image_url}
                          alt={relatedProduct.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Laptop className="w-12 h-12 text-primary/10" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1 font-serif text-xl">
                        {relatedProduct.title}
                      </h3>
                      <div className="text-lg font-black text-primary tracking-tighter">
                        {formatPrice(relatedProduct.price)}
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