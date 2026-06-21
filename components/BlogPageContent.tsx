'use client';

import Link from 'next/link';
import { Calendar, ArrowRight, QrCode, Home, FileText, Zap, Shield, Users, CheckCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import NewsletterForm from '@/components/NewsletterForm';

interface BlogPageContentProps {
  posts: any[];
}

export default function BlogPageContent({ posts }: BlogPageContentProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.3 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
            <QrCode className="relative w-12 h-12 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 text-gradient">
            LuxQr Blog
          </h1>
          <p className="text-xl text-gray-300">
            QR Kod Rehberi ve Güncel Haberler
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        {posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="text-center py-20"
          >
            <p className="text-gray-400 text-lg">Henüz blog yazısı bulunmuyor.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-16">
            {posts.map((post: any, index: number) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.3 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="card-premium overflow-hidden hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col">
                    {/* Image */}
                    {post.mainImage && (
                      <div className="relative h-32 md:h-48 overflow-hidden">
                        <img
                          src={post.mainImage}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="p-4 md:p-6 flex-1 flex flex-col">
                      {/* Category */}
                      <div className="mb-2 md:mb-3">
                        <span className="inline-block px-2 md:px-3 py-0.5 md:py-1 text-xs font-semibold text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">
                          {post.category}
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h2 className="text-base md:text-xl font-bold text-white mb-2 md:mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                      
                      {/* Description */}
                      <p className="text-gray-400 text-xs md:text-sm mb-2 md:mb-4 line-clamp-2 md:line-clamp-3 flex-1">
                        {post.description}
                      </p>
                      
                      {/* Date & Read More */}
                      <div className="flex items-center justify-between pt-2 md:pt-4 border-t border-white/10">
                        <div className="flex items-center gap-1 md:gap-2 text-gray-500 text-xs md:text-sm">
                          <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                          {new Date(post.createdAt).toLocaleDateString('tr-TR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </div>
                        <div className="flex items-center gap-1 text-blue-400 text-xs md:text-sm font-semibold hover:text-blue-300 transition-colors">
                          Devamını Oku
                          <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* QR Code Types Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-8 text-center text-gradient">
            QR Kod Türleri
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {[
              { icon: FileText, title: 'Metin & Belge', desc: 'PDF ve dosya paylaşımı', link: '/qr/metin-belge' },
              { icon: Users, title: 'Kartvizit', desc: 'Dijital vCard', link: '/qr/kartvizit' },
              { icon: Zap, title: 'WiFi', desc: 'Ağ paylaşımı', link: '/qr/wifi' },
              { icon: Shield, title: 'Sosyal Medya', desc: 'Link-in-bio', link: '/qr/sosyal-medya' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + 0.05 * index, duration: 0.3 }}
              >
                <Link href={item.link}>
                  <div className="card-premium p-3 md:p-6 hover:border-blue-500/50 transition-all group">
                    <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-2 md:mb-4 shadow-lg group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-sm md:text-lg font-semibold text-white mb-1 md:mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-xs md:text-sm">{item.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="card-premium p-4 md:p-8 md:p-12 mb-8 md:mb-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-xl md:text-3xl md:text-4xl font-bold text-white mb-2 md:mb-4 text-gradient">
              Hemen QR Kod Oluşturun
            </h2>
            <p className="text-gray-300 text-sm md:text-lg mb-4 md:mb-8 max-w-2xl mx-auto">
              LuxQr ile saniyeler içinde profesyonel QR kodlar oluşturun. Ücretsiz, hızlı ve güvenli.
            </p>
            <Link
              href="/"
              className="btn-primary inline-flex items-center gap-2 px-4 md:px-8 py-2 md:py-4 text-white font-semibold rounded-xl md:rounded-2xl text-sm md:text-base"
            >
              QR Kod Oluştur
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-16"
        >
          {[
            { icon: FileText, value: posts.length.toString(), label: 'Blog Yazısı' },
            { icon: Users, value: '5+', label: 'Kategori' },
            { icon: TrendingUp, value: 'Haftalık', label: 'Güncelleme' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + 0.05 * index, duration: 0.3 }}
            >
              <div className="card-premium p-3 md:p-6 text-center">
                <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-2 md:mb-4 shadow-lg">
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">{stat.value}</p>
                <p className="text-gray-400 text-xs md:text-sm">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.3 }}
        >
          <NewsletterForm />
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="mt-8 md:mt-16 mb-8 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-8 text-center text-gradient">
            Sıkça Sorulan Sorular
          </h2>
          <div className="max-w-3xl mx-auto space-y-3 md:space-y-4">
            {[
              { q: 'QR kod ücretsiz mi?', a: 'Evet, LuxQr ile tamamen ücretsiz QR kod oluşturabilirsiniz.' },
              { q: 'QR kod nasıl çalışır?', a: 'QR kod, kamera ile tarandığında içeriğe yönlendirir.' },
              { q: 'QR kod güvenli mi?', a: 'Evet, LuxQr güvenli ve şeffaf bir platformdur.' },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + 0.05 * index, duration: 0.3 }}
              >
                <div className="card-premium p-3 md:p-6">
                  <div className="flex items-start gap-2 md:gap-3">
                    <div className="flex-shrink-0 p-1.5 md:p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1 md:mb-2 text-sm md:text-base">{faq.q}</h3>
                      <p className="text-gray-400 text-xs md:text-sm">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
