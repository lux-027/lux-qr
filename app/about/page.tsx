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
  Home
} from 'lucide-react';
import BackButton from '@/components/BackButton';

export default function AboutPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <QrCode className="w-8 h-8 md:w-12 md:h-12 text-blue-500" />
            <h1 className="text-2xl md:text-5xl font-bold text-white">
              LuxQr
            </h1>
          </div>
          <p className="text-sm md:text-xl text-gray-400 max-w-2xl mx-auto">
            Dijital dünyada dosya ve metin paylaşımını kolaylaştıran modern QR kod çözümü
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-4 md:p-8">
            <h2 className="text-lg md:text-3xl font-bold text-white mb-3 md:mb-6">Misyonumuz</h2>
            <p className="text-gray-300 text-xs md:text-lg leading-relaxed mb-3 md:mb-4">
              LuxQr, karmaşık dosya paylaşım süreçlerini basitleştirmek için tasarlandı. 
              Geleneksel paylaşım yöntemlerinin karmaşıklığına son vererek, 
              kullanıcıların metin, resim, video ve dosyalarını saniyeler içinde güvenle paylaşmalarını sağlıyoruz.
            </p>
            <p className="text-gray-300 text-xs md:text-lg leading-relaxed">
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
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-6 md:mb-10">Özelliklerimiz</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            <div className="bg-white/5 backdrop-blur-sm glow-border rounded-2xl p-4 md:p-6 hover:bg-white/10 transition-colors">
              <div className="p-2 md:p-3 rounded-xl bg-blue-500/20 glow-border w-fit mb-3 md:mb-4">
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Anında Oluşturma</h3>
              <p className="text-gray-400 text-sm md:text-base">
                QR kodlarınız saniyeler içinde oluşturulur ve hemen kullanıma hazır hale gelir.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm glow-border rounded-2xl p-4 md:p-6 hover:bg-white/10 transition-colors">
              <div className="p-2 md:p-3 rounded-xl bg-blue-500/20 glow-border w-fit mb-3 md:mb-4">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Güvenli Paylaşım</h3>
              <p className="text-gray-400 text-sm md:text-base">
                Vercel KV ve Blob teknolojileri ile verileriniz güvenli bir şekilde saklanır.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm glow-border rounded-2xl p-4 md:p-6 hover:bg-white/10 transition-colors">
              <div className="p-2 md:p-3 rounded-xl bg-blue-500/20 glow-border w-fit mb-3 md:mb-4">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Süreli Paylaşım</h3>
              <p className="text-gray-400 text-sm md:text-base">
                Paylaşımlarınız için geçerlilik süresi belirleyerek kontrolü elinizde tutun.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm glow-border rounded-2xl p-4 md:p-6 hover:bg-white/10 transition-colors">
              <div className="p-2 md:p-3 rounded-xl bg-blue-500/20 glow-border w-fit mb-3 md:mb-4">
                <Globe className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Çoklu Format</h3>
              <p className="text-gray-400 text-sm md:text-base">
                Metin, resim, video ve dosya formatlarını destekleyen esnek yapı.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm glow-border rounded-2xl p-4 md:p-6 hover:bg-white/10 transition-colors">
              <div className="p-2 md:p-3 rounded-xl bg-blue-500/20 glow-border w-fit mb-3 md:mb-4">
                <Lock className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Otomatik Temizlik</h3>
              <p className="text-gray-400 text-sm md:text-base">
                Süresi dolan paylaşımlar otomatik olarak temizlenir, veri güvenliği sağlanır.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm glow-border rounded-2xl p-4 md:p-6 hover:bg-white/10 transition-colors">
              <div className="p-2 md:p-3 rounded-xl bg-blue-500/20 glow-border w-fit mb-3 md:mb-4">
                <QrCode className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Modern Tasarım</h3>
              <p className="text-gray-400 text-sm md:text-base">
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
          <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-4 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Teknoloji</h2>
            <div className="space-y-3 md:space-y-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-blue-400 mb-2">Next.js 14</h3>
                <p className="text-gray-400 text-sm md:text-base">
                  Hızlı ve modern bir web deneyimi için React tabanlı framework.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-blue-400 mb-2">Vercel KV</h3>
                <p className="text-gray-400 text-sm md:text-base">
                  Yüksek performanslı key-value depolama ile anında veri erişimi.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-blue-400 mb-2">Vercel Blob</h3>
                <p className="text-gray-400 text-sm md:text-base">
                  Büyük dosyalar için güvenli ve ölçeklenebilir depolama çözümü.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-blue-400 mb-2">Framer Motion</h3>
                <p className="text-gray-400 text-sm md:text-base">
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
