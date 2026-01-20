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
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-linear-to-r from-primary to-purple-500 rounded-lg blur-sm opacity-25 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-background p-2 rounded-lg border border-border shadow-sm">
                <Laptop className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "text-lg font-bold tracking-tight transition-colors",
                !isScrolled && location.pathname === '/' ? "text-white" : "text-foreground"
              )}>
                IT SUPPORT BEKASI
              </span>
              <span className={cn(
                "text-[10px] font-medium tracking-[0.2em] uppercase transition-colors",
                !isScrolled && location.pathname === '/' ? "text-white/70" : "text-muted-foreground"
              )}>
                Premium Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
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
              onClick={toggleTheme}
              className={cn(
                "p-2 rounded-full transition-all hover:bg-accent/50",
                !isScrolled && location.pathname === '/' ? "text-white" : "text-foreground"
              )}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ scale: 0.5, rotate: -45, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0.5, rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ scale: 0.5, rotate: 45, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    exit={{ scale: 0.5, rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className={cn(
                "p-2 rounded-full transition-all hover:bg-accent/50 relative",
                !isScrolled && location.pathname === '/' ? "text-white" : "text-foreground"
              )}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              to="/shop"
              className="hidden sm:flex bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Belanja</span>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "lg:hidden p-2 rounded-full transition-all hover:bg-accent/50",
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
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-[101] shadow-2xl flex flex-col border-l border-border"
            >
              <div className="p-6 border-b border-border flex items-center justify-between bg-accent/20">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Keranjang Belanja</h2>
                  <p className="text-sm text-muted-foreground">{cartCount} items</p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-accent rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                    <div className="bg-accent p-6 rounded-full mb-4">
                      <ShoppingCart className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <p className="text-lg font-medium text-foreground">Keranjang Anda kosong</p>
                    <p className="text-sm text-muted-foreground mt-2">Mulai belanja untuk menambahkan item</p>
                    <Link
                      to="/shop"
                      onClick={() => setIsCartOpen(false)}
                      className="mt-6 text-primary font-bold hover:underline"
                    >
                      Lihat Produk
                    </Link>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-border bg-card/50 hover:bg-accent/10 transition-colors group">
                      <div className="relative w-20 h-20 overflow-hidden rounded-xl border border-border">
                        <img
                          src={item.image_url || 'https://images.unsplash.com/photo-1588872657578-7efd3f1514a4?q=80&w=200'}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground line-clamp-1">{item.title}</h3>
                          <p className="text-primary font-bold mt-0.5">
                            Rp {new Intl.NumberFormat('id-ID').format(item.price)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center bg-accent rounded-lg border border-border">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                              className="w-8 h-8 flex items-center justify-center hover:bg-primary/10 transition-colors rounded-l-lg"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-primary/10 transition-colors rounded-r-lg"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-destructive hover:text-destructive/80 text-xs font-bold"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-border bg-accent/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-2xl font-bold text-primary">
                      Rp {new Intl.NumberFormat('id-ID').format(cartTotal)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const message = `Halo IT Support Bekasi, saya ingin memesan:\n\n${cart.map(item => `- ${item.title} (${item.quantity}x) - Rp ${new Intl.NumberFormat('id-ID').format(item.price * item.quantity)}`).join('\n')}\n\nTotal: Rp ${new Intl.NumberFormat('id-ID').format(cartTotal)}`;
                      window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Checkout via WhatsApp
                  </button>
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
