'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Mail, 
  Send, 
  CheckCircle,
  MessageSquare,
  Home
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Log to console as requested
    console.log('Contact form submitted:', formData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLoading(false);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-center mb-8 md:mb-16"
        >
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
            <MessageSquare className="w-8 h-8 md:w-12 md:h-12 text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
            <h1 className="text-3xl md:text-5xl font-bold text-white text-gradient">
              İletişim
            </h1>
          </div>
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto">
            Sorularınız veya önerileriniz için bizimle iletişime geçin
          </p>
        </motion.div>

        {/* Why Contact Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.2 }}
          className="max-w-4xl mx-auto mb-8 md:mb-12"
        >
          <div className="card-premium p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 text-gradient">Neden İletişime Geçmelisiniz?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="flex items-start gap-2 md:gap-3">
                <div className="flex-shrink-0 p-1.5 md:p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm md:text-base">Teknik Destek</p>
                  <p className="text-gray-400 text-xs md:text-sm">QR kod oluşturma ve kullanım konusunda yardım</p>
                </div>
              </div>
              <div className="flex items-start gap-2 md:gap-3">
                <div className="flex-shrink-0 p-1.5 md:p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm md:text-base">Öneri ve Görüşler</p>
                  <p className="text-gray-400 text-xs md:text-sm">Platform geliştirme önerilerinizi paylaşın</p>
                </div>
              </div>
              <div className="flex items-start gap-2 md:gap-3">
                <div className="flex-shrink-0 p-1.5 md:p-2 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm md:text-base">İşbirliği Teklifleri</p>
                  <p className="text-gray-400 text-xs md:text-sm">Kurumsal işbirliği fırsatları için</p>
                </div>
              </div>
              <div className="flex items-start gap-2 md:gap-3">
                <div className="flex-shrink-0 p-1.5 md:p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
                  <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm md:text-base">Geribildirim</p>
                  <p className="text-gray-400 text-xs md:text-sm">Kullanıcı deneyiminizi iyileştirmek için</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="card-premium p-4 md:p-8">
            {submitted ? (
              <div className="text-center py-8 md:py-12">
                <div className="inline-flex p-3 md:p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 mb-4 md:mb-6 shadow-lg">
                  <CheckCircle className="w-12 h-12 md:w-20 md:h-20 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4 text-gradient">Mesaj Gönderildi!</h2>
                <p className="text-gray-400 text-sm md:text-lg">
                  Mesajınız başarıyla iletildi. En kısa sürede size dönüş yapacağız.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-white font-medium mb-1 md:mb-2 text-sm md:text-base">Ad Soyad</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm md:text-base"
                    placeholder="Adınız Soyadınız"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-1 md:mb-2 text-sm md:text-base">E-posta</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm md:text-base"
                    placeholder="ornek@email.com"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-1 md:mb-2 text-sm md:text-base">Konu</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm md:text-base"
                    placeholder="Mesaj konusu"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-1 md:mb-2 text-sm md:text-base">Mesaj</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none text-sm md:text-base"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3 md:py-4 rounded-2xl text-white font-semibold text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 md:w-5 md:h-5" />
                      Mesaj Gönder
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.2 }}
          className="max-w-2xl mx-auto mt-8 md:mt-12"
        >
          <div className="card-premium p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 text-gradient">İletişim Bilgileri</h2>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex-shrink-0 p-2 md:p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs md:text-sm">E-posta</p>
                  <p className="text-white font-medium text-sm md:text-base">luxqrpro@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
