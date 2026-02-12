import React from 'react';
import { Laptop } from 'lucide-react';

export const SITE_INFO = {
  name: "IT SUPPORT BEKASI",
  tagline: "Laptop Second Berkualitas & Premium IT Solutions",
  description: "Toko laptop second terpercaya di Bekasi dengan garansi resmi dan koleksi unit premium.",
  email: "nurdin_nh@itsupportbekasi.com",
};

export const CONTACT_INFO = {
  whatsapp: "6285888992827",
  whatsappUrl: 'https://api.whatsapp.com/send/?phone=%2B6285888992827&text=Halo%2C+saya+tertarik+untuk+memesan+layanan+servis+yang+Anda+sediakan.+Apakah+bisa+diinformasikan+lebih+lanjut+mengenai+jenis+layanan%2C+harga%2C+dan+ketersediaan+waktu+untuk+pemesanan%3F+Terima+kasih%21+&type=phone_number&app_absent=0',
  email: "nurdin_nh@itsupportbekasi.com",
  address: "IT Support Bekasi, Jl. Raya Pd. Benda No.28, RT.005/RW.002, Jatirasa, Kec. Jatiasih, Kota Bks, Jawa Barat 17424",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=IT+Support+Bekasi,+Jl.+Raya+Pd.+Benda+No.28,+Jatiasih,+Bekasi",
};

export const CATEGORIES = [
  "Laptop",
  "PC Desktop", 
  "Aksesoris",
  "Hardware",
  "Macbook",
  "Gaming",
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
  about: {
    label: string;
    title: string;
    p1: string;
    p2: string;
    stats: string[];
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
      badge: "Katalog Laptop Terlengkap",
      title: "Pilihan Laptop Second untuk Kebutuhan Profesional.",
      desc: "Upgrade gaya dan performa dengan koleksi laptop premium second berkualitas. Garansi resmi, kondisi mulus, harga paling masuk akal se-Bekasi.",
      ctaPrimary: "Lihat Katalog",
      ctaSecondary: "Hubungi Admin",
      indicators: [
        "100% Original",
        "Garansi Unit",
        "Kondisi Mulus"
      ]
    },
    about: {
      label: "Tentang Kami",
      title: "Optimalkan Performa Perangkat Anda",
      p1: "IT Support Bekasi hadir sebagai mitra terpercaya untuk semua kebutuhan teknologi Anda. Dengan pengalaman lebih dari 5 tahun, kami telah melayani ribuan pelanggan di area Bekasi dan sekitarnya.",
      p2: "Kami berkomitmen memberikan layanan terbaik dengan teknisi berpengalaman, spare part original, dan garansi resmi untuk setiap perbaikan.",
      stats: [
        "Kepuasan Pelanggan",
        "Unit Terjual & Diperbaiki"
      ]
    },
    services: {
      label: "Koleksi Kami",
      title: "Pilih Laptop Impian Anda",
      desc: "Koleksi unit second terbaik yang sudah melalui proses pengecekan ketat (Quality Control).",
      items: [
        {
          id: "laptop-business",
          icon: React.createElement(Laptop, { className: "w-7 h-7" }),
          title: "Laptop Bisnis Second",
          description: "ThinkPad, Dell Latitude, HP EliteBook. Tangguh dan reliabel untuk kerja.",
          image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=400"
        },
        {
          id: "laptop-gaming",
          icon: React.createElement(Laptop, { className: "w-7 h-7 text-primary" }),
          title: "Laptop Gaming 2nd",
          description: "ROG, Legion, Predator. Performa tinggi untuk gaming dan editing.",
          image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400"
        },
        {
          id: "macbook",
          icon: React.createElement(Laptop, { className: "w-7 h-7 text-purple-500" }),
          title: "Apple Macbook Second",
          description: "Macbook Air & Pro. Desain elegan dengan performa mumpuni.",
          image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400"
        },
        {
          id: "accessories",
          icon: React.createElement(Laptop, { className: "w-7 h-7 text-green-500" }),
          title: "Aksesoris",
          description: "Charger original, tas premium, dan upgrade hardware.",
          image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400"
        }
      ]
    },
    whyChooseUs: {
      label: "Kualitas Terjamin",
      title: "Kenapa Belanja di Sini?",
      reasons: [
        {
          title: "Unit Pilihan",
          desc: "Hanya menjual unit dengan kondisi fisik dan fungsi di atas 90%."
        },
        {
          title: "Garansi Pasti",
          desc: "Setiap pembelian mendapatkan kartu garansi resmi dari toko kami."
        },
        {
          title: "Harga Kompetitif",
          desc: "Harga terbaik di Bekasi untuk kualitas unit yang setara."
        },
        {
          title: "After Sales",
          desc: "Bantuan teknis gratis untuk instalasi software standar setelah pembelian."
        }
      ]
    },
    faq: {
      label: "Bantuan",
      title: "Pertanyaan Pembeli",
      items: [
        {
          question: "Apakah bisa COD?",
          answer: "Tentu, kami melayani COD area Bekasi atau datang langsung ke toko untuk cek unit sepuasnya."
        },
        {
          question: "Kondisi baterai bagaimana?",
          answer: "Setiap unit kami pastikan memiliki ketahanan baterai normal (minimal 2-3 jam pemakaian standar)."
        },
        {
          question: "Apakah sudah termasuk Windows original?",
          answer: "Hampir semua unit kami sudah terinstall Windows original bawaan pabrik."
        },
        {
          question: "Bisa tukar tambah?",
          answer: "Kami menerima tukar tambah dengan kondisi unit lama Anda akan kami taksir harganya secara fair."
        }
      ]
    },
    contact: {
      label: "Pemesanan",
      title: "Tanya Stok & Order",
      desc: "Ingin tanya stok terbaru? Langsung hubungi admin via WhatsApp.",
      items: ["WhatsApp", "Email", "Lokasi Toko", "Jam Operasional"],
      form: {
        title: "Form Pemesanan",
        name: "Nama Lengkap",
        email: "Email (Opsional)",
        msg: "Tipe Laptop yang Dicari",
        submit: "Cek Ketersediaan",
        success: "Permintaan Diterima!",
        successDesc: "Admin akan segera membalas pesan Anda."
      }
    }
  },
  en: {
    hero: {
      badge: "Largest Laptop Catalog",
      title: "Premium Laptops. Best Bekasi Prices.",
      desc: "Find quality second laptop collections with official warranty. Selected units for professionals, students, and gamers.",
      ctaPrimary: "View Catalog",
      ctaSecondary: "Contact Admin",
      indicators: [
        "100% Original",
        "Unit Warranty",
        "Mint Condition"
      ]
    },
    about: {
      label: "About Us",
      title: "Optimize Your Device Performance",
      p1: "IT Support Bekasi is here as your trusted partner for all your technology needs. With over 5 years of experience, we have served thousands of customers in the Bekasi area and beyond.",
      p2: "We are committed to providing the best service with experienced technicians, original spare parts, and official warranty for every repair.",
      stats: [
        "Customer Satisfaction",
        "Units Sold & Repaired"
      ]
    },
    services: {
      label: "Our Collection",
      title: "Choose Your Dream Laptop",
      desc: "Best units that have gone through a strict Quality Control process.",
      items: [
        {
          id: "laptop-business",
          icon: React.createElement(Laptop, { className: "w-7 h-7" }),
          title: "Business Laptop",
          description: "ThinkPad, Dell Latitude, HP EliteBook. Tough and reliable for work.",
          image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=400"
        },
        {
          id: "laptop-gaming",
          icon: React.createElement(Laptop, { className: "w-7 h-7 text-primary" }),
          title: "Gaming Laptop",
          description: "ROG, Legion, Predator. High performance for gaming and editing.",
          image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400"
        },
        {
          id: "macbook",
          icon: React.createElement(Laptop, { className: "w-7 h-7 text-purple-500" }),
          title: "Apple Macbook",
          description: "Macbook Air & Pro. Elegant design with capable performance.",
          image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400"
        },
        {
          id: "accessories",
          icon: React.createElement(Laptop, { className: "w-7 h-7 text-green-500" }),
          title: "Accessories",
          description: "Original chargers, premium bags, and hardware upgrades.",
          image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400"
        }
      ]
    },
    whyChooseUs: {
      label: "Guaranteed Quality",
      title: "Why Shop Here?",
      reasons: [
        {
          title: "Selected Units",
          desc: "We only sell units with physical and functional conditions above 90%."
        },
        {
          title: "Warranty",
          desc: "Every purchase gets an official warranty card from our store."
        },
        {
          title: "Competitive Price",
          desc: "Best prices in Bekasi for equivalent quality units."
        },
        {
          title: "After Sales",
          desc: "Free technical assistance for standard software installation after purchase."
        }
      ]
    },
    faq: {
      label: "Help",
      title: "Buyer Questions",
      items: [
        {
          question: "Can I do COD?",
          answer: "Of course, we serve COD in the Bekasi area or come directly to the store to check units."
        },
        {
          question: "What about the battery condition?",
          answer: "We ensure every unit has normal battery life (minimum 2-3 hours of standard use)."
        },
        {
          question: "Is original Windows included?",
          answer: "Almost all our units come with pre-installed original factory Windows."
        },
        {
          question: "Can I trade-in?",
          answer: "We accept trade-ins; we will appraise your old unit fairly."
        }
      ]
    },
    contact: {
      label: "Ordering",
      title: "Check Stock & Order",
      desc: "Want to ask about the latest stock? Contact admin directly via WhatsApp.",
      items: ["WhatsApp", "Email", "Store Location", "Operating Hours"],
      form: {
        title: "Order Form",
        name: "Full Name",
        email: "Email (Optional)",
        msg: "Laptop Type You're Looking For",
        submit: "Check Availability",
        success: "Request Received!",
        successDesc: "Admin will reply to your message soon."
      }
    }
  }
};
