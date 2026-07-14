'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  QrCode, 
  Shield, 
  Zap, 
  Globe,
  Clock,
  Lock,
  Home,
  Info
} from 'lucide-react';
import BackButton from '@/components/BackButton';

export default function AboutPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen "
    >
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-16"
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
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', boxShadow: '0 8px 24px rgba(59,130,246,0.45)' }}>
                    <QrCode className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-xl flex items-center justify-center shadow-lg -rotate-12"
                    style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)', boxShadow: '0 4px 12px rgba(139,92,246,0.4)' }}>
                    <Info className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">
                  Hakkımızda — <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">LuxQr</span>
                </h1>
                <p className="text-gray-600 text-sm md:text-base">Dijital dünyada dosya ve metin paylaşımını kolaylaştıran modern QR kod çözümü</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-gray-50 backdrop-blur-sm glow-border-strong rounded-2xl p-4 md:p-8">
            <h2 className="text-lg md:text-3xl font-bold text-gray-900 mb-3 md:mb-6">Misyonumuz</h2>
            <p className="text-gray-700 text-xs md:text-lg leading-relaxed mb-3 md:mb-4">
              LuxQr, karmaşık dosya paylaşım süreçlerini basitleştirmek için tasarlandı. 
              Geleneksel paylaşım yöntemlerinin karmaşıklığına son vererek, 
              kullanıcıların metin, resim, video ve dosyalarını saniyeler içinde güvenle paylaşmalarını sağlıyoruz.
            </p>
            <p className="text-gray-700 text-xs md:text-lg leading-relaxed">
              Teknolojiyi herkes için erişilebilir kılarak, dijital iletişimi daha hızlı, 
              daha güvenli ve daha verimli hale getiriyoruz.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-6xl mx-auto mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6 md:mb-10">Özelliklerimiz</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            <div className="bg-gray-50 backdrop-blur-sm glow-border rounded-2xl p-4 md:p-6 hover:bg-gray-100 transition-colors">
              <div className="p-2 md:p-3 rounded-xl bg-blue-500/20 glow-border w-fit mb-3 md:mb-4">
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Anında Oluşturma</h3>
              <p className="text-gray-700 text-sm md:text-base">
                QR kodlarınız saniyeler içinde oluşturulur ve hemen kullanıma hazır hale gelir.
              </p>
            </div>

            <div className="bg-gray-50 backdrop-blur-sm glow-border rounded-2xl p-4 md:p-6 hover:bg-gray-100 transition-colors">
              <div className="p-2 md:p-3 rounded-xl bg-blue-500/20 glow-border w-fit mb-3 md:mb-4">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Güvenli Paylaşım</h3>
              <p className="text-gray-700 text-sm md:text-base">
                Vercel KV ve Blob teknolojileri ile verileriniz güvenli bir şekilde saklanır.
              </p>
            </div>

            <div className="bg-gray-50 backdrop-blur-sm glow-border rounded-2xl p-4 md:p-6 hover:bg-gray-100 transition-colors">
              <div className="p-2 md:p-3 rounded-xl bg-blue-500/20 glow-border w-fit mb-3 md:mb-4">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Süreli Paylaşım</h3>
              <p className="text-gray-700 text-sm md:text-base">
                Paylaşımlarınız için geçerlilik süresi belirleyerek kontrolü elinizde tutun.
              </p>
            </div>

            <div className="bg-gray-50 backdrop-blur-sm glow-border rounded-2xl p-4 md:p-6 hover:bg-gray-100 transition-colors">
              <div className="p-2 md:p-3 rounded-xl bg-blue-500/20 glow-border w-fit mb-3 md:mb-4">
                <Globe className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Çoklu Format</h3>
              <p className="text-gray-700 text-sm md:text-base">
                Metin, resim, video ve dosya formatlarını destekleyen esnek yapı.
              </p>
            </div>

            <div className="bg-gray-50 backdrop-blur-sm glow-border rounded-2xl p-4 md:p-6 hover:bg-gray-100 transition-colors">
              <div className="p-2 md:p-3 rounded-xl bg-blue-500/20 glow-border w-fit mb-3 md:mb-4">
                <Lock className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Otomatik Temizlik</h3>
              <p className="text-gray-700 text-sm md:text-base">
                Süresi dolan paylaşımlar otomatik olarak temizlenir, veri güvenliği sağlanır.
              </p>
            </div>

            <div className="bg-gray-50 backdrop-blur-sm glow-border rounded-2xl p-4 md:p-6 hover:bg-gray-100 transition-colors">
              <div className="p-2 md:p-3 rounded-xl bg-blue-500/20 glow-border w-fit mb-3 md:mb-4">
                <QrCode className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Modern Tasarım</h3>
              <p className="text-gray-700 text-sm md:text-base">
                Kullanıcı dostu arayüz ve akıcı animasyonlarla mükemmel deneyim.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Technology Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gray-50 backdrop-blur-sm glow-border-strong rounded-2xl p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Teknoloji</h2>
            <div className="space-y-3 md:space-y-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-blue-400 mb-2">Next.js 14</h3>
                <p className="text-gray-700 text-sm md:text-base">
                  Hızlı ve modern bir web deneyimi için React tabanlı framework.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-blue-400 mb-2">Vercel KV</h3>
                <p className="text-gray-700 text-sm md:text-base">
                  Yüksek performanslı key-value depolama ile anında veri erişimi.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-blue-400 mb-2">Vercel Blob</h3>
                <p className="text-gray-700 text-sm md:text-base">
                  Büyük dosyalar için güvenli ve ölçeklenebilir depolama çözümü.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-blue-400 mb-2">Framer Motion</h3>
                <p className="text-gray-700 text-sm md:text-base">
                  Akıcı animasyonlar ve etkileşimli kullanıcı deneyimi.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
