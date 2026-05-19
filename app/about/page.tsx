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

export default function AboutPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <div className="container mx-auto px-4 py-16">
        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 glow-border border-white/10 text-white hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-blue-400" />
              <span className="font-bold">LuxQr</span>
            </div>
            <div className="w-px h-4 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Ana Sayfaya Dön
            </div>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <QrCode className="w-12 h-12 text-blue-500" />
            <h1 className="text-5xl font-bold text-white">
              LuxQr
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
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
          <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Misyonumuz</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              LuxQr, karmaşık dosya paylaşım süreçlerini basitleştirmek için tasarlandı. 
              Geleneksel paylaşım yöntemlerinin karmaşıklığına son vererek, 
              kullanıcıların metin, resim, video ve dosyalarını saniyeler içinde güvenle paylaşmalarını sağlıyoruz.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
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
          <h2 className="text-3xl font-bold text-white text-center mb-10">Özelliklerimiz</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm glow-border rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="p-3 rounded-xl bg-blue-500/20 glow-border w-fit mb-4">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Anında Oluşturma</h3>
              <p className="text-gray-400">
                QR kodlarınız saniyeler içinde oluşturulur ve hemen kullanıma hazır hale gelir.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm glow-border rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="p-3 rounded-xl bg-blue-500/20 glow-border w-fit mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Güvenli Paylaşım</h3>
              <p className="text-gray-400">
                Vercel KV ve Blob teknolojileri ile verileriniz güvenli bir şekilde saklanır.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm glow-border rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="p-3 rounded-xl bg-blue-500/20 glow-border w-fit mb-4">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Süreli Paylaşım</h3>
              <p className="text-gray-400">
                Paylaşımlarınız için geçerlilik süresi belirleyerek kontrolü elinizde tutun.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm glow-border rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="p-3 rounded-xl bg-blue-500/20 glow-border w-fit mb-4">
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Çoklu Format</h3>
              <p className="text-gray-400">
                Metin, resim, video ve dosya formatlarını destekleyen esnek yapı.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm glow-border rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="p-3 rounded-xl bg-blue-500/20 glow-border w-fit mb-4">
                <Lock className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Otomatik Temizlik</h3>
              <p className="text-gray-400">
                Süresi dolan paylaşımlar otomatik olarak temizlenir, veri güvenliği sağlanır.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm glow-border rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="p-3 rounded-xl bg-blue-500/20 glow-border w-fit mb-4">
                <QrCode className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Modern Tasarım</h3>
              <p className="text-gray-400">
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
          <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Teknoloji</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">Next.js 14</h3>
                <p className="text-gray-400">
                  Hızlı ve modern bir web deneyimi için React tabanlı framework.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">Vercel KV</h3>
                <p className="text-gray-400">
                  Yüksek performanslı key-value depolama ile anında veri erişimi.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">Vercel Blob</h3>
                <p className="text-gray-400">
                  Büyük dosyalar için güvenli ve ölçeklenebilir depolama çözümü.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-2">Framer Motion</h3>
                <p className="text-gray-400">
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
