import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Laptop, HardDrive, Settings, Zap, Shield } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Wrench,
      title: 'Perbaikan Laptop',
      description: 'Service laptop rusak, maintenance rutin, upgrade komponen',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: HardDrive,
      title: 'Upgrade Hardware',
      description: 'Upgrade RAM, SSD, HDD untuk performa lebih baik',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Settings,
      title: 'Instalasi Software',
      description: 'Install OS, aplikasi, driver, dan konfigurasi sistem',
      color: 'from-pink-500 to-pink-600',
    },
    {
      icon: Shield,
      title: 'IT Support',
      description: 'Konsultasi, troubleshooting, dan solusi IT profesional',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Zap,
      title: 'Pembersihan Sistem',
      description: 'Cleaning virus, malware, optimasi performa laptop',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: Laptop,
      title: 'Maintenance Berkala',
      description: 'Perawatan rutin untuk menjaga kondisi laptop optimal',
      color: 'from-red-500 to-red-600',
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-4">
            <Wrench className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Layanan Kami</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Jasa IT <span className="text-blue-600">Profesional</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Solusi lengkap untuk semua kebutuhan IT Anda
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:scale-105"
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Butuh Bantuan IT?</h3>
            <p className="text-xl mb-8 opacity-90">Hubungi kami untuk konsultasi gratis</p>
            <a
              href="#contact"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              Hubungi Sekarang
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
