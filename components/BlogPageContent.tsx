'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight, QrCode, FileText, Users, CheckCircle, TrendingUp } from 'lucide-react';
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

const allQrTypes = [
  { title: 'Metin', desc: 'Metin içeriğinizi QR koda dönüştürün', link: '/qr/metin', image: 'https://images.unsplash.com/photo-1770368787728-73c60309cb42?w=800&q=80&fm=webp' },
  { title: 'Resim / Video / Belge', desc: 'PDF, fotoğraf ve video dosyalarınıza QR ile ulaşım', link: '/qr/resim-video-belge', image: 'https://images.unsplash.com/photo-1762859370515-dfddfb7fe1d6?w=800&q=80&fm=webp' },
  { title: 'Kartvizit', desc: 'Dijital vCard ile profesyonel bağlantılar', link: '/qr/kartvizit', image: 'https://images.unsplash.com/photo-1636247498719-a8a04ed961a4?w=800&q=80&fm=webp' },
  { title: 'WiFi', desc: 'Ağ şifresini tek tarama ile paylaşın', link: '/qr/wifi', image: 'https://images.unsplash.com/photo-1606420187127-dae7c868fa7a?w=800&q=80&fm=webp' },
  { title: 'Sosyal Medya', desc: 'Takipçilerinizi tek linke yönlendirin', link: '/qr/sosyal-medya', image: 'https://images.unsplash.com/photo-1622549037543-49cf1ca0babc?w=800&q=80&fm=webp' },
  { title: 'Ses Dosyası', desc: 'Müzik, podcast ve sesli rehberleri paylaşın', link: '/qr/ses-dosyasi', image: 'https://images.unsplash.com/photo-1692646057797-7a4bce55efb4?w=800&q=80&fm=webp' },
  { title: 'IBAN', desc: 'Hızlı ve hatasız havale QR kodu', link: '/qr/iban', image: 'https://images.unsplash.com/photo-1771587529573-7f514f51f2a4?w=800&q=80&fm=webp' },
  { title: 'Fiyat Listesi', desc: 'Ürün ve hizmet fiyatlarınızı listeleyin', link: '/qr/fiyat-listesi', image: 'https://images.unsplash.com/photo-1715865871494-6bba579c2dc0?w=800&q=80&fm=webp' },
  { title: 'Bio Link', desc: 'Tüm sosyal medya linkleriniz tek sayfada', link: '/qr/bio-link', image: 'https://images.unsplash.com/photo-1618986919774-0ec4cffd3a1a?w=800&q=80&fm=webp' },
];

export default function BlogPageContent({ posts }: BlogPageContentProps) {
  const [recommended, setRecommended] = useState(allQrTypes.slice(0, 3));

  useEffect(() => {
    const shuffled = [...allQrTypes].sort(() => 0.5 - Math.random());
    setRecommended(shuffled.slice(0, 3));
  }, []);

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.3 }}
          className="mb-6 md:mb-14"
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
            className="relative rounded-3xl overflow-hidden p-5 md:p-8 max-w-2xl mx-auto"
          >
            <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-3xl pointer-events-none"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)' }} />
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)' }} />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-5 md:gap-8">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-2xl rotate-3 hover:rotate-6 transition-transform duration-300"
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)', boxShadow: '0 8px 24px rgba(59,130,246,0.45)' }}>
                    <FileText className="w-7 h-7 md:w-10 md:h-10 text-white drop-shadow-lg" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-xl flex items-center justify-center shadow-lg -rotate-12"
                    style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', boxShadow: '0 4px 12px rgba(6,182,212,0.4)' }}>
                    <QrCode className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                  </div>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-xl md:text-4xl font-bold text-gray-900 mb-1">
                  LuxQr <span className="bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">Blog</span>
                </h1>
                <p className="text-gray-600 text-xs md:text-base">QR Kod Rehberi ve Güncel Haberler</p>
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
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 mb-6 md:mb-16">
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
                      <div className="relative h-28 md:h-48 overflow-hidden">
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
                    <div className="p-3 md:p-6 flex-1 flex flex-col">
                      {/* Category */}
                      <div className="mb-2 md:mb-3">
                        <span className="inline-block px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-semibold text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">
                          {post.category}
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h2 className="text-sm md:text-xl font-bold text-gray-900 mb-1 md:mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                      
                      {/* Description */}
                      <p className="text-gray-400 text-[10px] md:text-sm mb-1 md:mb-4 line-clamp-2 md:line-clamp-3 flex-1">
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
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-8 text-center text-gradient">
            Önerilen QR
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-5 md:mb-8">
            {recommended.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.3 }}
              >
                <Link href={item.link}>
                  <div className="card-premium overflow-hidden h-full flex flex-col group">
                    <div className="relative h-36 md:h-52 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    </div>
                    <div className="p-3 md:p-5 flex-1 flex flex-col">
                      <h3 className="text-sm md:text-base font-bold text-gray-900 mb-0.5 md:mb-2">{item.title}</h3>
                      <p className="text-gray-500 text-[10px] md:text-sm mb-2 md:mb-4 flex-1">{item.desc}</p>
                      <div className="flex items-center text-blue-400 font-semibold text-xs md:text-sm group-hover:translate-x-2 transition-transform">
                        <span>Oluştur</span>
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/#kategoriler"
              className="btn-primary text-xs md:text-base group"
            >
              Tüm QR Çeşitlerini Gör
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="card-premium p-4 md:p-12 mb-6 md:mb-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-lg md:text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4 text-gradient">
              Hemen QR Kod Oluşturun
            </h2>
            <p className="text-gray-600 text-xs md:text-lg mb-4 md:mb-8 max-w-2xl mx-auto">
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
          className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 mb-6 md:mb-16"
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
              <div className="card-premium p-2.5 md:p-6 text-center">
                <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-2 md:mb-4 shadow-lg">
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
                </div>
                <p className="text-xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">{stat.value}</p>
                <p className="text-gray-400 text-[10px] md:text-sm">{stat.label}</p>
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
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-8 text-center text-gradient">
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
                <div className="card-premium p-2.5 md:p-6">
                  <div className="flex items-start gap-2 md:gap-3">
                    <div className="flex-shrink-0 p-1.5 md:p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-gray-900" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 font-semibold mb-1 md:mb-2 text-sm md:text-base">{faq.q}</h3>
                      <p className="text-gray-400 text-[10px] md:text-sm">{faq.a}</p>
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

