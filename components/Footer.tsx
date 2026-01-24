
import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { useApp } from '@/src/context/AppContext';

const Footer: React.FC = () => {
  const { language } = useApp();
  
  const servicesList = language === 'id' 
    ? ['IT Support Corporate', 'Service Laptop', 'Hardware Upgrade', 'Instalasi CCTV', 'Data Recovery']
    : ['Corporate IT Support', 'Laptop Service', 'Hardware Upgrade', 'CCTV Installation', 'Data Recovery'];

  const navList = language === 'id'
    ? ['Beranda', 'Katalog Produk', 'Tentang Kami', 'Testimoni', 'Kontak Kami']
    : ['Home', 'Product Catalog', 'About Us', 'Testimonials', 'Contact Us'];

  return (
    <footer className="bg-white dark:bg-dark-bg border-t dark:border-dark-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="https://itsupportbekasi.vercel.app/Logo/Logo.png" 
                alt="IT Support Bekasi" 
                className="h-10 w-auto object-contain dark:brightness-110"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">IT Support</span>
                <span className="text-lg font-light tracking-tight text-brand-500 -mt-1">Bekasi</span>
              </div>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              {language === 'id' 
                ? 'Partner IT terpercaya di Bekasi. Menyediakan solusi hardware dan software premium untuk meningkatkan efisiensi operasional Anda.'
                : 'Your trusted IT partner in Bekasi. Providing premium hardware and software solutions to enhance your operational efficiency.'}
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-dark-surface flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-brand-500 hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6 uppercase text-sm tracking-widest">{language === 'id' ? 'Layanan Kami' : 'Our Services'}</h4>
            <ul className="space-y-4">
              {servicesList.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-brand-500 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6 uppercase text-sm tracking-widest">{language === 'id' ? 'Navigasi' : 'Navigation'}</h4>
            <ul className="space-y-4">
              {navList.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-brand-500 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 dark:text-white font-bold mb-6 uppercase text-sm tracking-widest">{language === 'id' ? 'Informasi Kontak' : 'Contact Info'}</h4>
            <div className="space-y-4 text-gray-500 dark:text-gray-400">
              <p className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-brand-500" />
                {CONTACT_INFO.address}
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0 text-brand-500" />
                {CONTACT_INFO.phone}
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0 text-brand-500" />
                {CONTACT_INFO.email}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t dark:border-dark-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} IT Support Bekasi. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-gray-500 dark:text-gray-400">
            <a href="/admin" className="hover:text-brand-500 font-medium">{language === 'id' ? 'Panel Admin' : 'Admin Panel'}</a>
            <a href="#" className="hover:text-brand-500">{language === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy'}</a>
            <a href="#" className="hover:text-brand-500">{language === 'id' ? 'Syarat Ketentuan' : 'Terms of Service'}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
