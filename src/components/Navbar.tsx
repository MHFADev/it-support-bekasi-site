import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, ShoppingCart, MessageSquare, Moon, Sun, Laptop } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { CONTACT_INFO } from '../constants';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const { cart, cartCount, cartTotal, removeFromCart, updateQuantity } = useCart();
  const { theme, toggleTheme } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Katalog', path: '/shop' },
    { name: 'Testimoni', path: '/#why-us' },
    { name: 'Kontak', path: '/#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('/#')) {
      const hash = path.split('#')[1];
      if (location.pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      isScrolled 
        ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-lg py-3" 
        : "bg-transparent py-5"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Laptop className="w-8 h-8 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "text-xl font-bold tracking-tight text-primary transition-colors",
                !isScrolled && location.pathname === '/' ? "text-primary" : "text-primary"
              )}>
                IT SUPPORT BEKASI
              </span>
            </div>
          </Link>

          {/* Search Bar (Tokopedia Style) */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Cari laptop impianmu di sini..." 
                className="w-full bg-accent/20 border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-hidden text-foreground"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className={cn(
                  "text-sm font-medium transition-all hover:text-primary relative group",
                  !isScrolled && location.pathname === '/' ? "text-white/90" : "text-foreground/80"
                )}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => toggleTheme()}
              className={cn(
                "p-2 rounded-full transition-all hover:bg-accent/50",
                !isScrolled && location.pathname === '/' ? "text-primary" : "text-foreground"
              )}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className={cn(
                "p-2 rounded-full transition-all hover:bg-accent/50 relative",
                !isScrolled && location.pathname === '/' ? "text-primary" : "text-foreground"
              )}
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-background">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              to="/shop"
              className="hidden lg:flex bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Belanja</span>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "xl:hidden p-2 rounded-full transition-all hover:bg-accent/50",
                !isScrolled && location.pathname === '/' ? "text-white" : "text-foreground"
              )}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-xl overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className="block px-4 py-3 text-lg font-medium text-foreground/80 hover:text-primary hover:bg-accent rounded-xl transition-all"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="flex items-center justify-between px-4 py-3 text-lg font-medium text-foreground/80 hover:bg-accent rounded-xl transition-all"
                >
                  <span>Keranjang</span>
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    {cartCount > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs font-bold rounded-full px-2 py-0.5">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </button>
                <Link
                  to="/shop"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full bg-primary text-primary-foreground px-6 py-4 rounded-xl font-bold text-center shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Belanja Sekarang
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-[100dvh] w-full sm:max-w-md bg-background z-[101] shadow-2xl flex flex-col border-l border-border"
            >
              <div className="p-4 sm:p-6 border-b border-border flex items-center justify-between bg-accent/10 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-foreground">Pesanan Kamu</h2>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{cartCount} Items</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-accent rounded-full transition-all group"
                >
                  <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center px-6">
                    <div className="w-24 h-24 bg-accent/50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                      <ShoppingBag className="w-12 h-12 text-muted-foreground/30" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Keranjang Kosong</h3>
                    <p className="text-sm text-muted-foreground mb-8">Wah, sepertinya kamu belum memilih laptop impianmu. Yuk cek katalog kami!</p>
                    <Link
                      to="/shop"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                    >
                      Mulai Belanja
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={item.id} 
                        className="flex gap-4 p-3 sm:p-4 rounded-2xl border border-border bg-card/50 hover:bg-accent/5 hover:border-primary/20 transition-all group"
                      >
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-xl border border-border bg-accent/10 flex-shrink-0">
                          <img
                            src={item.image_url || 'https://images.unsplash.com/photo-1588872657578-7efd3f1514a4?q=80&w=200'}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div className="pr-6 relative">
                            <h3 className="font-bold text-sm sm:text-base text-foreground truncate group-hover:text-primary transition-colors">{item.title}</h3>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="absolute top-0 right-0 p-1 text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <X size={14} />
                            </button>
                            <p className="text-primary font-black mt-1 text-sm sm:text-lg">
                              Rp {new Intl.NumberFormat('id-ID').format(item.price)}
                            </p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center bg-accent/50 rounded-xl border border-border p-1">
                              <button
                                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                className="w-8 h-8 flex items-center justify-center hover:bg-background rounded-lg transition-colors font-bold text-lg"
                              >
                                -
                              </button>
                              <span className="w-10 text-center text-sm font-black">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-background rounded-lg transition-colors font-bold text-lg"
                              >
                                +
                              </button>
                            </div>
                            <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
                              Sub: Rp {new Intl.NumberFormat('id-ID').format(item.price * item.quantity)}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-4 sm:p-6 border-t border-border bg-card/80 backdrop-blur-xl space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Subtotal Produk</span>
                      <span>Rp {new Intl.NumberFormat('id-ID').format(cartTotal)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Pajak & Biaya Admin</span>
                      <span className="text-green-600 font-bold">FREE</span>
                    </div>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-lg font-bold text-foreground">Total Bayar</span>
                      <span className="text-2xl font-black text-primary">
                        Rp {new Intl.NumberFormat('id-ID').format(cartTotal)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3 pt-2">
                    <button
                      onClick={() => {
                        const message = `Halo IT Support Bekasi, saya ingin memesan:\n\n${cart.map(item => `- ${item.title} (${item.quantity}x) - Rp ${new Intl.NumberFormat('id-ID').format(item.price * item.quantity)}`).join('\n')}\n\nTotal: Rp ${new Intl.NumberFormat('id-ID').format(cartTotal)}`;
                        window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
                      }}
                      className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-black shadow-xl shadow-primary/30 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                    >
                      <MessageSquare className="w-5 h-5 group-hover:scale-125 transition-transform" />
                      Checkout via WhatsApp
                    </button>
                    <p className="text-[10px] text-center text-muted-foreground font-medium uppercase tracking-widest">
                      🔒 Transaksi aman & Terverifikasi
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
