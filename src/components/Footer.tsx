import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Mail, MapPin, Phone, Facebook, Instagram, Twitter, MessageSquare, ArrowRight } from 'lucide-react';
import { SITE_INFO, CONTACT_INFO } from '../constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-400 rounded-lg blur-sm opacity-25 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-background p-2 rounded-lg border border-border">
                  <Laptop className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-foreground">
                  IT SUPPORT BEKASI
                </span>
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground">
                  Premium Solutions
                </span>
              </div>
            </Link>
            
            <p className="text-muted-foreground mb-8 text-base leading-relaxed">
              {SITE_INFO.description}
            </p>

            <div className="flex gap-4">
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
                  className="w-11 h-11 rounded-xl bg-accent/50 border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-foreground font-bold text-lg mb-8 uppercase tracking-widest text-xs">Navigasi</h3>
            <ul className="space-y-4">
              {[
                { label: 'Beranda', href: '/' },
                { label: 'Katalog', href: '/shop' },
                { label: 'Layanan', href: '/#services' },
                { label: 'Kontak', href: '/#contact' }
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="text-muted-foreground hover:text-primary transition-all flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3">
            <h3 className="text-foreground font-bold text-lg mb-8 uppercase tracking-widest text-xs">Produk Kami</h3>
            <ul className="space-y-4">
              {[
                'Laptop Bisnis',
                'Laptop Gaming',
                'Apple Macbook',
                'Aksesoris Laptop',
                'Custom PC'
              ].map((service) => (
                <li key={service} className="text-muted-foreground flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h3 className="text-foreground font-bold text-lg mb-8 uppercase tracking-widest text-xs">Kontak</h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/50 flex items-center justify-center text-primary shrink-0 border border-border">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-sm text-muted-foreground leading-relaxed">
                  {CONTACT_INFO.address}
                </span>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/50 flex items-center justify-center text-primary shrink-0 border border-border">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">WhatsApp</span>
                  <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} className="text-sm font-bold text-foreground hover:text-primary transition-colors">
                    +{CONTACT_INFO.whatsapp}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/50 flex items-center justify-center text-primary shrink-0 border border-border">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Email</span>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm font-bold text-foreground hover:text-primary transition-colors">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-12 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-muted-foreground text-sm font-medium">
            © {currentYear} <span className="text-foreground font-bold">{SITE_INFO.name}</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
