import React from 'react';
import { Laptop, Settings, Shield, Wrench, Monitor, Cpu, HardDrive, Wifi } from 'lucide-react';

export const SITE_INFO = {
  name: "LaptopBekas Bekasi",
  tagline: "Laptop Bekas Berkualitas & Jasa IT Profesional",
  description: "Toko laptop bekas terpercaya di Bekasi dengan garansi dan layanan IT support profesional",
  email: "info@laptopbekasbekasi.com",
};

export const CONTACT_INFO = {
  whatsapp: "6281234567890",
  email: "info@laptopbekasbekasi.com",
  address: "Bekasi, Jawa Barat, Indonesia",
  mapsUrl: "https://maps.google.com/?q=Bekasi,+Jawa+Barat,+Indonesia",
};

export const CATEGORIES = [
  "Laptop",
  "PC Desktop", 
  "Aksesoris",
  "Hardware",
  "Jasa IT Support",
  "Jasa Instalasi",
  "Jasa Maintenance",
];

export const CONTENT: Record<'id' | 'en', {
  hero: {
    badge: string;
    title: string;
    desc: string;
    ctaPrimary: string;
    ctaSecondary: string;
    indicators: string[];
  };
  services: {
    label: string;
    title: string;
    desc: string;
    items: Array<{
      id: string;
      icon: React.ReactNode;
      title: string;
      description: string;
      image: string;
    }>;
  };
  whyChooseUs: {
    label: string;
    title: string;
    reasons: Array<{
      title: string;
      desc: string;
    }>;
  };
  faq: {
    label: string;
    title: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  contact: {
    label: string;
    title: string;
    desc: string;
    items: string[];
    form: {
      title: string;
      name: string;
      email: string;
      msg: string;
      submit: string;
      success: string;
      successDesc: string;
    };
  };
}> = {
  id: {
    hero: {
      badge: "Terpercaya Sejak 2015",
      title: "Laptop Berkualitas. Harga Terjangkau",
      desc: "Dapatkan laptop bekas berkualitas dengan garansi resmi dan dukungan IT profesional untuk bisnis dan personal Anda.",
      ctaPrimary: "Konsultasi Gratis",
      ctaSecondary: "Lihat Produk",
      indicators: [
        "500+ Pelanggan Puas",
        "Garansi Resmi 6 Bulan",
        "Support 24/7"
      ]
    },
    services: {
      label: "Layanan Kami",
      title: "Solusi IT Lengkap untuk Kebutuhan Anda",
      desc: "Dari penjualan laptop bekas hingga layanan IT support profesional, kami siap membantu bisnis dan personal Anda.",
      items: [
        {
          id: "laptop-sales",
          icon: React.createElement(Laptop, { className: "w-7 h-7" }),
          title: "Penjualan Laptop",
          description: "Laptop bekas berkualitas dengan garansi resmi. Semua unit sudah dicek dan diperbaiki oleh teknisi berpengalaman.",
          image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=400"
        },
        {
          id: "it-support",
          icon: React.createElement(Settings, { className: "w-7 h-7" }),
          title: "IT Support",
          description: "Layanan dukungan teknis untuk perusahaan dan personal. Penanganan cepat dan profesional.",
          image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=400"
        },
        {
          id: "installation",
          icon: React.createElement(Wrench, { className: "w-7 h-7" }),
          title: "Jasa Instalasi",
          description: "Instalasi software, hardware, dan jaringan. Setup komputer baru dan migrasi data.",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400"
        },
        {
          id: "maintenance",
          icon: React.createElement(Shield, { className: "w-7 h-7" }),
          title: "Maintenance",
          description: "Perawatan berkala untuk menjaga performa optimal perangkat IT Anda.",
          image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=400"
        }
      ]
    },
    whyChooseUs: {
      label: "Mengapa Kami",
      title: "Alasan Memilih Kami",
      reasons: [
        {
          title: "Garansi Resmi",
          desc: "Setiap produk dilengkapi garansi resmi 6 bulan untuk ketenangan pikiran Anda."
        },
        {
          title: "Respons Cepat",
          desc: "Tim support kami siap membantu dalam waktu kurang dari 24 jam."
        },
        {
          title: "Tim Berpengalaman",
          desc: "Teknisi kami memiliki pengalaman lebih dari 10 tahun di bidang IT."
        },
        {
          title: "Dukungan Purna Jual",
          desc: "Layanan after-sales yang responsif untuk semua kebutuhan Anda."
        }
      ]
    },
    faq: {
      label: "FAQ",
      title: "Pertanyaan yang Sering Diajukan",
      items: [
        {
          question: "Apakah laptop bekas dijamin berkualitas?",
          answer: "Ya, setiap laptop sudah melalui proses pengecekan menyeluruh oleh teknisi berpengalaman kami. Kami juga memberikan garansi 6 bulan untuk setiap pembelian."
        },
        {
          question: "Bagaimana cara konsultasi layanan IT?",
          answer: "Anda bisa menghubungi kami via WhatsApp atau mengisi form kontak di website ini. Tim kami akan merespons dalam waktu kurang dari 24 jam."
        },
        {
          question: "Apakah bisa request spesifikasi laptop tertentu?",
          answer: "Tentu! Kami menerima request spesifikasi khusus. Silakan hubungi kami untuk konsultasi kebutuhan Anda."
        },
        {
          question: "Berapa lama waktu pengerjaan service?",
          answer: "Tergantung jenis kerusakan. Untuk service ringan biasanya 1-2 hari kerja. Service berat maksimal 7 hari kerja."
        }
      ]
    },
    contact: {
      label: "Kontak",
      title: "Hubungi Kami",
      desc: "Siap membantu kebutuhan IT Anda. Hubungi kami untuk konsultasi gratis.",
      items: ["Telepon", "Email", "Alamat", "Jam Operasional"],
      form: {
        title: "Kirim Pesan",
        name: "Nama",
        email: "Email",
        msg: "Pesan",
        submit: "Kirim Pesan",
        success: "Pesan Terkirim!",
        successDesc: "Tim kami akan menghubungi Anda segera."
      }
    }
  },
  en: {
    hero: {
      badge: "Trusted Since 2015",
      title: "Quality Laptops. Affordable Prices",
      desc: "Get quality used laptops with official warranty and professional IT support for your business and personal needs.",
      ctaPrimary: "Free Consultation",
      ctaSecondary: "View Products",
      indicators: [
        "500+ Happy Customers",
        "6 Month Official Warranty",
        "24/7 Support"
      ]
    },
    services: {
      label: "Our Services",
      title: "Complete IT Solutions for Your Needs",
      desc: "From used laptop sales to professional IT support services, we're ready to help your business and personal needs.",
      items: [
        {
          id: "laptop-sales",
          icon: React.createElement(Laptop, { className: "w-7 h-7" }),
          title: "Laptop Sales",
          description: "Quality used laptops with official warranty. All units have been checked and repaired by experienced technicians.",
          image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=400"
        },
        {
          id: "it-support",
          icon: React.createElement(Settings, { className: "w-7 h-7" }),
          title: "IT Support",
          description: "Technical support services for companies and individuals. Fast and professional handling.",
          image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=400"
        },
        {
          id: "installation",
          icon: React.createElement(Wrench, { className: "w-7 h-7" }),
          title: "Installation Services",
          description: "Software, hardware, and network installation. New computer setup and data migration.",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400"
        },
        {
          id: "maintenance",
          icon: React.createElement(Shield, { className: "w-7 h-7" }),
          title: "Maintenance",
          description: "Regular maintenance to keep your IT devices performing optimally.",
          image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=400"
        }
      ]
    },
    whyChooseUs: {
      label: "Why Us",
      title: "Reasons to Choose Us",
      reasons: [
        {
          title: "Official Warranty",
          desc: "Every product comes with a 6-month official warranty for your peace of mind."
        },
        {
          title: "Fast Response",
          desc: "Our support team is ready to help within 24 hours."
        },
        {
          title: "Experienced Team",
          desc: "Our technicians have over 10 years of experience in IT."
        },
        {
          title: "After-Sales Support",
          desc: "Responsive after-sales service for all your needs."
        }
      ]
    },
    faq: {
      label: "FAQ",
      title: "Frequently Asked Questions",
      items: [
        {
          question: "Are used laptops guaranteed quality?",
          answer: "Yes, every laptop has undergone thorough inspection by our experienced technicians. We also provide a 6-month warranty for every purchase."
        },
        {
          question: "How to consult for IT services?",
          answer: "You can contact us via WhatsApp or fill out the contact form on this website. Our team will respond within 24 hours."
        },
        {
          question: "Can I request specific laptop specifications?",
          answer: "Of course! We accept special specification requests. Please contact us for consultation on your needs."
        },
        {
          question: "How long does service take?",
          answer: "Depends on the type of damage. For minor service, usually 1-2 working days. Major service takes maximum 7 working days."
        }
      ]
    },
    contact: {
      label: "Contact",
      title: "Contact Us",
      desc: "Ready to help with your IT needs. Contact us for free consultation.",
      items: ["Phone", "Email", "Address", "Operating Hours"],
      form: {
        title: "Send Message",
        name: "Name",
        email: "Email",
        msg: "Message",
        submit: "Send Message",
        success: "Message Sent!",
        successDesc: "Our team will contact you soon."
      }
    }
  }
};
