import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Mail, MapPin, Phone, Facebook, Instagram, Twitter, MessageSquare, ArrowRight } from 'lucide-react';
import { SITE_INFO, CONTACT_INFO } from '../constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border pt-32 pb-16 relative overflow-hidden noise-bg">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/40 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-20 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-4 mb-10 group">
              <div className="relative">
                <div className="absolute -inset-2 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img 
                  src="https://cdn.jsdelivr.net/gh/mhfadev/asset@main/logo/Logo.png" 
                  alt="IT Support Bekasi Logo" 
                  className="w-12 h-12 object-contain relative transition-transform group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter text-primary font-serif italic">
                  IT SUPPORT
                </span>
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-muted-foreground opacity-80">
                  Bekasi Premium
                </span>
              </div>
            </Link>
            
            <p className="text-muted-foreground mb-10 text-lg leading-relaxed font-light">
              {SITE_INFO.description}
            </p>

            <div className="flex gap-5">
              {[
                { icon: <Facebook className="w-5 h-5" />, href: "#" },
                { icon: <Instagram className="w-5 h-5" />, href: "#" },
                { icon: <Twitter className="w-5 h-5" />, href: "#" },
                { icon: <MessageSquare className="w-5 h-5" />, href: `https://wa.me/${CONTACT_INFO.whatsapp}` }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl glass-panel flex items-center justify-center text-muted-foreground hover:premium-gradient hover:text-white hover:scale-110 transition-all duration-500"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-foreground font-bold text-xs mb-10 uppercase tracking-[0.2em]">Navigasi</h3>
            <ul className="space-y-5">
              {[
                { label: 'Beranda', href: '/' },
                { label: 'Katalog', href: '/shop' },
                { label: 'Layanan', href: '/#services' },
                { label: 'Kontak', href: '/#contact' }
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-muted-foreground hover:text-primary transition-all flex items-center gap-3 group"
                  >
                    <div className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all duration-300 rounded-full" />
                    <span className="font-light tracking-wide">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3">
            <h3 className="text-foreground font-bold text-xs mb-10 uppercase tracking-[0.2em]">Kategori Produk</h3>
            <ul className="space-y-5">
              {[
                'Laptop Bisnis & Pro',
                'High-End Gaming PC',
                'Apple Ecosystem',
                'Networking Solutions',
                'CCTV Security Systems'
              ].map((service) => (
                <li key={service} className="text-muted-foreground flex items-center gap-4 font-light">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h3 className="text-foreground font-bold text-xs mb-10 uppercase tracking-[0.2em]">Hubungi Kami</h3>
            <ul className="space-y-8">
              <li className="flex gap-5 group">
                <div className="w-12 h-12 rounded-2xl glass-panel flex items-center justify-center text-primary group-hover:premium-gradient group-hover:text-white transition-all duration-500">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-sm text-muted-foreground leading-relaxed font-light">
                  {CONTACT_INFO.address}
                </span>
              </li>
              <li className="flex gap-5 group">
                <div className="w-12 h-12 rounded-2xl glass-panel flex items-center justify-center text-primary group-hover:premium-gradient group-hover:text-white transition-all duration-500">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1 font-bold">WhatsApp</span>
                  <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} className="text-base font-bold text-foreground hover:text-primary transition-colors font-serif">
                    +{CONTACT_INFO.whatsapp}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-16 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-muted-foreground text-sm font-light tracking-wide">
            © {currentYear} <span className="text-primary font-bold font-serif">IT Support Bekasi</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-10">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-light">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-light">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
