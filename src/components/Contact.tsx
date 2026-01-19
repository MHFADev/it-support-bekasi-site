import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '@/constants';

const Contact: React.FC = () => {
  const contactMethods = [
    {
      icon: MapPin,
      title: 'Alamat',
      content: CONTACT_INFO.address,
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Phone,
      title: 'WhatsApp',
      content: '+62 812-3456-7890',
      link: `https://wa.me/${CONTACT_INFO.whatsapp}`,
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Mail,
      title: 'Email',
      content: CONTACT_INFO.email,
      link: `mailto:${CONTACT_INFO.email}`,
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      content: 'Senin - Sabtu, 09:00 - 18:00',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
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
            <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Hubungi Kami</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Siap Membantu <span className="text-blue-600">Anda</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ada pertanyaan? Kami siap membantu Anda 24/7
          </p>
        </motion.div>

        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              {method.link ? (
                <a
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:scale-105"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{method.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{method.content}</p>
                </a>
              ) : (
                <div className="group bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center mb-4`}>
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{method.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{method.content}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-3xl p-12 text-white text-center"
        >
          <MessageCircle className="w-16 h-16 mx-auto mb-6" />
          <h3 className="text-3xl font-bold mb-4">Konsultasi Gratis via WhatsApp</h3>
          <p className="text-xl mb-8 opacity-90">Tanya langsung, respon cepat!</p>
          <a
            href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            Chat via WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
