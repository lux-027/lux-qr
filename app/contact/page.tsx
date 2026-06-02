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
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <div className="container mx-auto px-4 py-16">
        {/* Header with Hamburger Menu and Back Button */}
        <div className="mb-8 max-md:flex max-md:justify-end max-md:items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 glow-border border-white/10 text-white hover:bg-white/10 transition-colors max-md:text-sm max-md:px-3 max-md:py-1.5 z-10"
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              <span className="font-bold">LuxQr</span>
            </div>
            <div className="w-px h-4 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Ana Sayfaya Dön
            </div>
          </Link>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <MessageSquare className="w-12 h-12 text-blue-500" />
            <h1 className="text-5xl font-bold text-white">
              İletişim
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Sorularınız veya önerileriniz için bizimle iletişime geçin
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-8">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">Mesaj Gönderildi!</h2>
                <p className="text-gray-400 text-lg">
                  Mesajınız başarıyla iletildi. En kısa sürede size dönüş yapacağız.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Ad Soyad</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 glow-border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Adınız Soyadınız"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">E-posta</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 glow-border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="ornek@email.com"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Konu</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 glow-border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Mesaj konusu"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Mesaj</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 glow-border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed glow-border-strong flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
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
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto mt-12"
        >
          <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">İletişim Bilgileri</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-500/20 glow-border">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">E-posta</p>
                  <p className="text-white">contact@luxqr.com</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
