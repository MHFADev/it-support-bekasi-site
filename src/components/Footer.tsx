import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Mail, MapPin, Phone, Facebook, Instagram, Twitter } from 'lucide-react';
import { SITE_INFO, CONTACT_INFO } from '@/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center">
                <Laptop className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="font-bold text-xl text-white">{SITE_INFO.name}</div>
                <div className="text-sm text-gray-400">Laptop Berkualitas</div>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              {SITE_INFO.description}
            </p>
            {/* Social Media */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Menu</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  Katalog Produk
                </Link>
              </li>
              <li>
                <a href="/#services" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  Layanan Jasa
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                  Kontak Kami
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Layanan</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                Jual Beli Laptop Bekas
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                Service & Repair
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                Upgrade Hardware
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                Instalasi Software
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                IT Support
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Kontak</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} className="hover:text-blue-400 transition-colors">
                  +{CONTACT_INFO.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-blue-400 transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} {SITE_INFO.name}. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-blue-400 transition-colors">
                Kebijakan Privasi
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
