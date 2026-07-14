'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Send,
  CheckCircle,
  MessageSquare,
  QrCode,
  Headphones,
  Lightbulb,
  Handshake,
  Star,
  User,
  FileText,
  AtSign,
  Clock,
  Zap,
  Shield,
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
    console.log('Contact form submitted:', formData);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const reasons = [
    { icon: Headphones, gradient: 'from-blue-500 to-cyan-500', title: 'Teknik Destek', desc: 'QR kod oluşturma ve kullanım konusunda uzman yardımı' },
    { icon: Lightbulb, gradient: 'from-purple-500 to-pink-500', title: 'Öneri ve Görüşler', desc: 'Platform geliştirme fikirlerinizi bizimle paylaşın' },
    { icon: Handshake, gradient: 'from-orange-500 to-red-500', title: 'İşbirliği Teklifleri', desc: 'Kurumsal ve bireysel işbirliği fırsatları için' },
    { icon: Star, gradient: 'from-emerald-500 to-teal-500', title: 'Geri Bildirim', desc: 'Deneyiminizi daha iyi hale getirmemize yardımcı olun' },
  ];

  const stats = [
    { icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-500/10', label: 'Hızlı Yanıt', value: '< 24 saat' },
    { icon: Shield, color: 'text-emerald-400', bg: 'bg-emerald-500/10', label: 'Güvenli İletişim', value: 'SSL Şifreli' },
    { icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10', label: 'Destek Saatleri', value: '7/24' },
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen "
    >
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">

        {/* 3D Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-10 md:mb-16"
        >
          <motion.div
            whileHover={{ y: -4, rotateX: 2, rotateY: -2 }}
            style={{
              transformStyle: 'preserve-3d',
              perspective: '800px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(237,233,254,0.8) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(139,92,246,0.25)',
              boxShadow: '0 8px 32px rgba(139,92,246,0.15), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
            }}
            className="relative rounded-3xl overflow-hidden p-6 md:p-8 max-w-2xl mx-auto"
          >
            <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-3xl pointer-events-none"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)' }} />
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)' }} />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-5 md:gap-8">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-2xl rotate-3 hover:rotate-6 transition-transform duration-300"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)', boxShadow: '0 8px 24px rgba(59,130,246,0.45)' }}>
                    <MessageSquare className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-xl flex items-center justify-center shadow-lg -rotate-12"
                    style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', boxShadow: '0 4px 12px rgba(6,182,212,0.4)' }}>
                    <QrCode className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">
                  Bizimle <span className="bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">İletişime Geçin</span>
                </h1>
                <p className="text-gray-600 text-sm md:text-base">Sorularınız, önerileriniz veya işbirliği teklifleriniz için buradayız</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.2 }}
          className="grid grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-12"
        >
          {stats.map((s, i) => (
            <div key={i} className="card-premium p-3 md:p-5 text-center">
              <div className={`inline-flex p-2 md:p-3 rounded-xl ${s.bg} mb-2`}>
                <s.icon className={`w-4 h-4 md:w-5 md:h-5 ${s.color}`} />
              </div>
              <p className="text-gray-900 font-bold text-sm md:text-lg">{s.value}</p>
              <p className="text-gray-700 text-xs md:text-sm">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Why Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <div className="card-premium p-5 md:p-8">
            <div className="flex items-center gap-2 mb-5">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg">
                <Headphones className="w-4 h-4 text-gray-900" />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900">Nasıl Yardımcı Olabiliriz?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reasons.map((r, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className={`flex-shrink-0 p-2 rounded-xl bg-gradient-to-br ${r.gradient} shadow-lg`}>
                    <r.icon className="w-4 h-4 text-gray-900" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-sm md:text-base">{r.title}</p>
                    <p className="text-gray-700 text-xs md:text-sm mt-0.5">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.2 }}
            className="md:col-span-3"
          >
            <div className="card-premium p-5 md:p-8 h-full">
              <div className="flex items-center gap-2 mb-5">
                <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg">
                  <Send className="w-4 h-4 text-gray-900" />
                </div>
                <h2 className="text-lg md:text-xl font-bold text-gray-900">Mesaj Gönder</h2>
              </div>

              {submitted ? (
                <div className="text-center py-10">
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 mb-5 shadow-lg shadow-emerald-500/30">
                    <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-gray-900" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Mesaj Gönderildi!</h3>
                  <p className="text-gray-500">En kısa sürede size dönüş yapacağız.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-gray-900 font-medium mb-2 text-sm">
                      <User className="w-4 h-4 text-cyan-400" />
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors text-sm"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-gray-900 font-medium mb-2 text-sm">
                      <AtSign className="w-4 h-4 text-purple-400" />
                      E-posta
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors text-sm"
                      placeholder="ornek@email.com"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-gray-900 font-medium mb-2 text-sm">
                      <FileText className="w-4 h-4 text-amber-400" />
                      Konu
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors text-sm"
                      placeholder="Mesaj konusu"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-gray-900 font-medium mb-2 text-sm">
                      <MessageSquare className="w-4 h-4 text-pink-400" />
                      Mesaj
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors resize-none text-sm"
                      placeholder="Mesajınızı buraya yazın..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3 md:py-4 rounded-xl text-gray-900 font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Mesaj Gönder
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.2 }}
            className="md:col-span-2 flex flex-col gap-4"
          >
            {/* Email Card */}
            <div className="card-premium p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30">
                  <Mail className="w-5 h-5 text-gray-900" />
                </div>
                <div>
                  <p className="text-gray-600 text-xs">E-posta</p>
                  <p className="text-gray-900 font-semibold text-sm">luxqrpro@gmail.com</p>
                </div>
              </div>
              <p className="text-gray-700 text-xs">Mesajlarınıza 24 saat içinde yanıt veriyoruz.</p>
            </div>

            {/* Response Time Card */}
            <div className="card-premium p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg">
                  <Zap className="w-4 h-4 text-gray-900" />
                </div>
                <p className="text-gray-900 font-semibold text-sm">Hızlı Destek</p>
              </div>
              <p className="text-gray-700 text-xs leading-relaxed">Teknik sorunlarınız için öncelikli destek hattımız 7/24 aktiftir.</p>
            </div>

            {/* Tips Card */}
            <div className="card-premium p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                  <Lightbulb className="w-4 h-4 text-gray-900" />
                </div>
                <p className="text-gray-900 font-semibold text-sm">İpuçları</p>
              </div>
              <ul className="space-y-2">
                {[
                  { color: 'text-cyan-400', text: 'Konuyu açık belirtin' },
                  { color: 'text-purple-400', text: 'Hata mesajlarını ekleyin' },
                  { color: 'text-emerald-400', text: 'Tarayıcı bilgisi paylaşın' },
                ].map((tip, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-gray-700">
                    <span className={`${tip.color} font-bold`}>•</span>
                    {tip.text}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}
