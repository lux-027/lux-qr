'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight, QrCode, Home, FileText, Zap, Shield, Users, CheckCircle, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const NewsletterForm = dynamic(() => import('@/components/NewsletterForm'), {
  ssr: false,
  loading: () => <div className="h-32 bg-gray-50 rounded-2xl animate-pulse" />
});

interface BlogPageContentProps {
  posts: any[];
}

export default function BlogPageContent({ posts }: BlogPageContentProps) {
  const [qrIndex, setQrIndex] = useState(0);
  const [qrPerPage, setQrPerPage] = useState(3);

  useEffect(() => {
    const onResize = () => setQrPerPage(window.innerWidth < 768 ? 1 : 3);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const qrTypes = [
    { icon: FileText, title: 'Metin & Belge', desc: 'PDF ve dosya paylaşımı', link: '/qr/metin-belge' },
    { icon: Users, title: 'Kartvizit', desc: 'Dijital vCard', link: '/qr/kartvizit' },
    { icon: Zap, title: 'WiFi', desc: 'Ağ paylaşımı', link: '/qr/wifi' },
    { icon: Shield, title: 'Sosyal Medya', desc: 'Link-in-bio', link: '/qr/sosyal-medya' },
  ];

  const maxQrIndex = Math.max(0, qrTypes.length - qrPerPage);

  useEffect(() => {
    if (qrIndex > maxQrIndex) setQrIndex(maxQrIndex);
  }, [qrIndex, maxQrIndex]);

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.3 }}
          className="mb-10 md:mb-14"
        >
          <motion.div
            whileHover={{ y: -4, rotateX: 2, rotateY: -2 }}
            style={{
              transformStyle: 'preserve-3d',
              perspective: '800px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(219,234,254,0.8) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(59,130,246,0.25)',
              boxShadow: '0 8px 32px rgba(59,130,246,0.15), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
            }}
            className="relative rounded-3xl overflow-hidden p-6 md:p-8 max-w-2xl mx-auto"
          >
            <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-3xl pointer-events-none"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)' }} />
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)' }} />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-5 md:gap-8">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-2xl rotate-3 hover:rotate-6 transition-transform duration-300"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)', boxShadow: '0 8px 24px rgba(59,130,246,0.45)' }}>
                    <FileText className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-xl flex items-center justify-center shadow-lg -rotate-12"
                    style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', boxShadow: '0 4px 12px rgba(6,182,212,0.4)' }}>
                    <QrCode className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">
                  LuxQr <span className="bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">Blog</span>
                </h1>
                <p className="text-gray-600 text-sm md:text-base">QR Kod Rehberi ve Güncel Haberler</p>
              </div>
            </div>
          </motion.div>
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
                        <Image
                          src={post.mainImage}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
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
                      <h2 className="text-base md:text-xl font-bold text-gray-900 mb-2 md:mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                      
                      {/* Description */}
                      <p className="text-gray-400 text-xs md:text-sm mb-2 md:mb-4 line-clamp-2 md:line-clamp-3 flex-1">
                        {post.description}
                      </p>
                      
                      {/* Date & Read More */}
                      <div className="flex items-center justify-between pt-2 md:pt-4 border-t border-gray-200">
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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-8 text-center text-gradient">
            QR Kod Türleri
          </h2>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${qrIndex * (100 / qrTypes.length)}%)` }}
              >
                {qrTypes.map((item, index) => (
                  <div key={index} className="flex-shrink-0 w-full md:w-1/3 px-1.5 md:px-3">
                    <Link href={item.link}>
                      <div className="card-premium overflow-hidden h-full flex flex-col group">
                        <div className="relative h-32 md:h-40 flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-500">
                          <item.icon className="w-12 h-12 md:w-16 md:h-16 text-white drop-shadow-lg transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <div className="p-3 md:p-4 flex-1 flex flex-col">
                          <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1 md:mb-2">{item.title}</h3>
                          <p className="text-gray-500 text-xs md:text-sm">{item.desc}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-4 md:mt-6">
              <button
                onClick={() => setQrIndex(i => Math.max(0, i - 1))}
                disabled={qrIndex === 0}
                className="p-2 rounded-full btn-secondary disabled:opacity-40"
                aria-label="Önceki"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button
                onClick={() => setQrIndex(i => Math.min(maxQrIndex, i + 1))}
                disabled={qrIndex >= maxQrIndex}
                className="p-2 rounded-full btn-secondary disabled:opacity-40"
                aria-label="Sonraki"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
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
            <h2 className="text-xl md:text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4 text-gradient">
              Hemen QR Kod Oluşturun
            </h2>
            <p className="text-gray-600 text-sm md:text-lg mb-4 md:mb-8 max-w-2xl mx-auto">
              LuxQr ile saniyeler içinde profesyonel QR kodlar oluşturun. Ücretsiz, hızlı ve güvenli.
            </p>
            <Link
              href="/"
              className="btn-primary w-full text-sm md:text-base group"
            >
              QR Kod Oluştur
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-16"
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
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">{stat.value}</p>
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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-8 text-center text-gradient">
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
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-gray-900" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold mb-1 md:mb-2 text-sm md:text-base">{faq.q}</h3>
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

