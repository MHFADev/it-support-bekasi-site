
import React from 'react';
import { 
  Laptop, 
  Settings, 
  Cpu, 
  ShieldCheck, 
  Wrench,
  Monitor,
  Video,
  Database,
  Search,
  CheckCircle2
} from 'lucide-react';
import { Service, Product, Testimonial, FAQItem } from './types';

export const CONTENT = {
  id: {
    hero: {
      badge: "Spesialis Laptop, PC & Keamanan",
      title: "Solusi Performa & Keamanan Digital.",
      desc: "Ahli perbaikan Laptop, PC Maintenance, hingga Instalasi CCTV profesional. Kami pastikan teknologi Anda bekerja cepat dan tetap aman.",
      ctaPrimary: "Service & Konsultasi",
      ctaSecondary: "Katalog Hardware",
      indicators: ["Garansi Resmi", "Ahli Keamanan", "Teknisi Tersertifikasi"]
    },
    services: {
      label: "Solusi Perusahaan",
      title: "Layanan IT Profesional untuk Setiap Kebutuhan Anda",
      desc: "Kami memahami bahwa infrastruktur IT adalah tulang punggung operasional Anda. Dapatkan dukungan dari tenaga ahli kami dengan standar kualitas terbaik.",
      items: [
        {
          id: 'repair-hardware',
          title: 'Service Laptop & PC Pro',
          description: 'Diagnosa mendalam dan perbaikan hardware level komponen. Spesialis mati total, ganti chipset, perbaikan engsel, dan penggantian layar original.',
          icon: <Laptop className="w-6 h-6" />,
          image: 'https://raw.githubusercontent.com/mhfadev/asset/main/itsupport/IMG-20221029-WA0056.jpg',
        },
        {
          id: 'system-maintenance',
          title: 'Deep Maintenance & Cleaning',
          description: 'Optimasi suhu dengan thermal paste premium, pembersihan debu internal, dan pemeliharaan sistem agar performa tetap di level maksimal.',
          icon: <Wrench className="w-6 h-6" />,
          image: 'https://cdn.jsdelivr.net/gh/mhfadev/asset@main/itsupport/IMG-20201128-WA0027.jpg',
        },
        {
          id: 'software-os',
          title: 'Instalasi OS & Optimalisasi',
          description: 'Instalasi Windows & macOS dengan driver paling stabil. Optimasi software desain, office, dan perlindungan dari malware.',
          icon: <Settings className="w-6 h-6" />,
          image: 'https://cdn.jsdelivr.net/gh/mhfadev/asset@main/itsupport/IMG-20221029-WA0056.jpg',
        },
        {
          id: 'cctv-security',
          title: 'Instalasi CCTV & Keamanan',
          description: 'Solusi keamanan digital terintegrasi. Pemasangan CCTV IP Camera resolusi tinggi dengan akses remote via smartphone.',
          icon: <Video className="w-6 h-6" />,
          image: 'https://cdn.jsdelivr.net/gh/mhfadev/asset@main/itsupport/IMG_20211227_122324.jpg',
        }
      ]
    },
    whyChooseUs: {
      label: "Mengapa Kami?",
      title: "Standardisasi Tinggi Untuk Kepuasan Anda",
      reasons: [
        { title: "Resmi & Bergaransi", desc: "Semua hardware dan pengerjaan kami berikan jaminan garansi resmi." },
        { title: "Layanan Cepat", desc: "Respon instan untuk urgensi IT Support bisnis dan personal Anda." },
        { title: "Teknisi Tersertifikasi", desc: "Dikerjakan oleh teknisi ahli dengan pengalaman lebih dari 5 tahun." },
        { title: "Terpercaya", desc: "Ratusan ulasan positif dari klien individu maupun korporasi di Bekasi." }
      ]
    },
    products: {
      label: "Koleksi Unggulan",
      title: "Produk Unggulan Pilihan Teknisi",
      cta: "Buka Katalog Lengkap"
    },
    about: {
      label: "Tentang IT Support Bekasi",
      title: "Dedikasi Pada Detail dan Performa Perangkat Anda",
      p1: "IT Support Bekasi didirikan dengan visi menjadi pusat perbaikan laptop dan komputer paling terpercaya di Bekasi. Kami percaya bahwa setiap perangkat memiliki nilai penting bagi penggunanya.",
      p2: "Fokus utama kami adalah pada kesehatan hardware dan optimalisasi software. Kami tidak hanya memperbaiki kerusakan, tetapi memberikan edukasi bagi klien.",
      stats: ["Hardware Original", "Unit Diperbaiki"]
    },
    faq: {
      label: "FAQ",
      title: "Pertanyaan Yang Sering Diajukan",
      items: [
        {
          question: 'Berapa biaya instal ulang Windows?',
          answer: 'Biaya instal ulang mulai dari Rp 150rb, sudah termasuk driver terbaru dan aplikasi standar produktivitas. Kami menjamin data tetap aman.',
        },
        {
          question: 'Bisa service laptop yang mati total?',
          answer: 'Bisa. Kami spesialis perbaikan motherboard level komponen. Kami akan melakukan diagnosa terlebih dahulu untuk memberikan estimasi biaya yang akurat.',
        },
        {
          question: 'Melayani pemasangan CCTV di area Bekasi?',
          answer: 'Ya, kami melayani instalasi CCTV untuk rumah, ruko, maupun kantor di seluruh wilayah Bekasi dengan paket lengkap.',
        },
        {
          question: 'Apakah upgrade hardware bergaransi?',
          answer: 'Tentu. Semua upgrade SSD, RAM, atau hardware lainnya memiliki garansi resmi distributor ditambah garansi pemasangan dari kami.',
        }
      ]
    },
    contact: {
      label: "Mari Terhubung",
      title: "Solusi IT Anda Hanya Satu Klik Menjauh.",
      desc: "Butuh bantuan mendesak atau konsultasi pengadaan hardware? Hubungi kami melalui kanal resmi berikut atau kunjungi HQ kami di Bekasi.",
      items: ["Jalur Langsung", "Email Korporat", "Alamat Kantor", "Jam Operasional"],
      form: {
        title: "Konsultasi Kilat",
        name: "Nama Lengkap",
        email: "Alamat Email",
        msg: "Pesan Detail",
        submit: "Kirim Permintaan",
        success: "Permintaan Terkirim",
        successDesc: "Tim kami akan segera menghubungi Anda dalam waktu maksimal 1x24 jam kerja."
      }
    }
  },
  en: {
    hero: {
      badge: "Laptop, PC & Security Specialist",
      title: "Performance & Digital Security Solutions.",
      desc: "Experts in Laptop repair, PC Maintenance, and professional CCTV Installation. We ensure your technology works fast and stays secure.",
      ctaPrimary: "Service & Consultation",
      ctaSecondary: "Hardware Catalog",
      indicators: ["Official Warranty", "Security Experts", "Certified Technicians"]
    },
    services: {
      label: "Enterprise Solutions",
      title: "Professional IT Services for Your Every Need",
      desc: "We understand that IT infrastructure is the backbone of your operations. Get support from our experts with the highest quality standards.",
      items: [
        {
          id: 'repair-hardware',
          title: 'Pro Laptop & PC Service',
          description: 'In-depth diagnostics and component-level hardware repair. Specialist in dead boards, chipset replacement, and original screen replacement.',
          icon: <Laptop className="w-6 h-6" />,
          image: 'https://images.unsplash.com/photo-1591405351990-4726e331f121?auto=format&fit=crop&q=80&w=800',
        },
        {
          id: 'system-maintenance',
          title: 'Deep Maintenance & Cleaning',
          description: 'Temperature optimization with premium thermal paste, internal dust cleaning, and system maintenance for peak performance.',
          icon: <Wrench className="w-6 h-6" />,
          image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
        },
        {
          id: 'software-os',
          title: 'OS Installation & Optimization',
          description: 'Original Windows & macOS installation with the most stable drivers. Optimization for design software, office, and malware protection.',
          icon: <Settings className="w-6 h-6" />,
          image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
        },
        {
          id: 'cctv-security',
          title: 'CCTV Installation & Security',
          description: 'Integrated digital security solutions. High-resolution IP Camera CCTV installation with remote access via smartphone.',
          icon: <Video className="w-6 h-6" />,
          image: 'https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&q=80&w=800',
        }
      ]
    },
    whyChooseUs: {
      label: "Why Choose Us?",
      title: "High Standards For Your Satisfaction",
      reasons: [
        { title: "Official & Warranted", desc: "All hardware and workmanship are covered by our official warranty guarantee." },
        { title: "Fast Service", desc: "Instant response for your business and personal IT Support urgencies." },
        { title: "Certified Technicians", desc: "Handled by expert technicians with over 5 years of experience." },
        { title: "Trusted", desc: "Hundreds of positive reviews from individual and corporate clients in Bekasi." }
      ]
    },
    products: {
      label: "Featured Collection",
      title: "Technician's Top Product Picks",
      cta: "Open Full Catalog"
    },
    about: {
      label: "About IT Support Bekasi",
      title: "Dedicated to Detail and Your Device Performance",
      p1: "IT Support Bekasi was founded with the vision of becoming the most trusted laptop and computer repair center in Bekasi. We believe every device has value.",
      p2: "Our main focus is on hardware health and software optimization. We don't just fix problems; we educate our clients.",
      stats: ["Original Hardware", "Units Repaired"]
    },
    faq: {
      label: "FAQ",
      title: "Frequently Asked Questions",
      items: [
        {
          question: 'How much does a Windows re-install cost?',
          answer: 'Re-install starts from IDR 150k, including the latest drivers and standard productivity apps. We guarantee your data stays safe.',
        },
        {
          question: 'Can you fix a laptop that is completely dead?',
          answer: 'Yes. We specialize in component-level motherboard repair. we will diagnose it first to give an accurate cost estimate.',
        },
        {
          question: 'Do you serve CCTV installations in Bekasi?',
          answer: 'Yes, we serve CCTV installations for homes, shops, or offices across Bekasi with a complete package.',
        },
        {
          question: 'Is hardware upgrade warranted?',
          answer: 'Of course. All SSD, RAM, or other hardware upgrades carry an official distributor warranty plus our installation warranty.',
        }
      ]
    },
    contact: {
      label: "Let's Connect",
      title: "Your IT Solution is Just One Click Away.",
      desc: "Need urgent help or hardware procurement consultation? Contact us via these official channels or visit our HQ in Bekasi.",
      items: ["Direct Line", "Corporate Email", "Office Address", "Opening Hours"],
      form: {
        title: "Express Consultation",
        name: "Full Name",
        email: "Email Address",
        msg: "Detailed Message",
        submit: "Submit Inquiry",
        success: "Inquiry Received",
        successDesc: "Our team will contact you within a maximum of 1x24 business hours."
      }
    }
  }
};

export const PRODUCTS: Product[] = [];
export const TESTIMONIALS: Testimonial[] = [];

export const CONTACT_INFO = {
  phone: '+62 812 3456 7890',
  whatsapp: '6281234567890',
  email: 'info@itsupportbekasi.com',
  address: 'Jl. Ahmad Yani No. 123, Bekasi Selatan, Kota Bekasi, Jawa Barat 17141',
  mapsUrl: 'https://www.google.com/maps/search/Jl.+Ahmad+Yani+Bekasi+Selatan',
};
