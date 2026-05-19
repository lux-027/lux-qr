'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Shield, 
  Database, 
  Clock, 
  Eye,
  Trash2,
  Lock,
  Home
} from 'lucide-react';

export default function PrivacyPage() {
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
              <Shield className="w-5 h-5 text-blue-400" />
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
            <Shield className="w-12 h-12 text-blue-500" />
            <h1 className="text-5xl font-bold text-white">
              Gizlilik Politikası
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Verilerinizin güvenliği ve gizliliği bizim için önceliklidir
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Data Collection */}
          <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-blue-500/20 glow-border">
                <Database className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Veri Toplama</h2>
                <p className="text-gray-400">
                  LuxQr, QR kod oluştururken paylaştığınız içerikleri (metin, resim, video veya dosya) 
                  güvenli bir şekilde saklar. Kişisel bilgilerinizi (isim, e-posta, telefon vb.) toplamayız.
                </p>
              </div>
            </div>
          </div>

          {/* Data Storage */}
          <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-blue-500/20 glow-border">
                <Lock className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Veri Depolama</h2>
                <div className="space-y-3 text-gray-400">
                  <p>
                    <strong className="text-white">Vercel KV:</strong> QR kod meta verileri ve içerik bilgileri, 
                    yüksek performanslı key-value depolama sisteminde saklanır.
                  </p>
                  <p>
                    <strong className="text-white">Vercel Blob:</strong> Resim, video ve dosya içerikleri, 
                    güvenli ve ölçeklenebilir blob depolama sisteminde tutulur.
                  </p>
                  <p>
                    Tüm veriler şifreli bağlantılar üzerinden iletilir ve güvenli sunucularda depolanır.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Retention */}
          <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-blue-500/20 glow-border">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Veri Saklama Süresi</h2>
                <div className="space-y-3 text-gray-400">
                  <p>
                    QR kod oluştururken seçtiğiniz geçerlilik süresine göre verileriniz saklanır:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li><strong className="text-white">1 Gün:</strong> 24 saat sonra otomatik silinir</li>
                    <li><strong className="text-white">1 Hafta:</strong> 7 gün sonra otomatik silinir</li>
                    <li><strong className="text-white">1 Ay:</strong> 30 gün sonra otomatik silinir</li>
                    <li><strong className="text-white">3 Ay:</strong> 90 gün sonra otomatik silinir</li>
                  </ul>
                  <p>
                    Kullanıcı gizliliği ve veri güvenliği gereği, oluşturulan QR kodlar ve ilgili içerikler seçilen süre sonunda (maksimum 3 ay) sistemimizden kalıcı olarak silinmektedir. LuxQr bünyesinde sonsuza dek veri saklanmaz.
                  </p>
                  <p>
                    Süresi dolan paylaşımlar otomatik olarak sistemden temizlenir.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Access */}
          <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-blue-500/20 glow-border">
                <Eye className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Veri Erişimi</h2>
                <div className="space-y-3 text-gray-400">
                  <p>
                    QR kod içeriğine sadece QR kod URL'sini bilen kişiler erişebilir.
                  </p>
                  <p>
                    Her QR kod benzersiz bir kimliğe sahiptir ve bu kimlik sadece oluşturan kişi 
                    ve QR kodu tarayan kişiler tarafından bilinir.
                  </p>
                  <p>
                    Verileriniz üçüncü şahıslarla paylaşılmaz, satılmaz veya kiralınmaz.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Deletion */}
          <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-blue-500/20 glow-border">
                <Trash2 className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Veri Silme</h2>
                <div className="space-y-3 text-gray-400">
                  <p>
                    Süresi dolan paylaşımlar otomatik olarak sistemden silinir.
                  </p>
                  <p>
                    Verilerinizin silinmesini istiyorsanız, lütfen bizimle iletişime geçin.
                  </p>
                  <p>
                    Silinen veriler geri yüklenemez ve kalıcı olarak sistemden kaldırılır.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-blue-500/20 glow-border">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Çerezler</h2>
                <p className="text-gray-400">
                  LuxQr, kullanıcı deneyimini iyileştirmek için temel çerezler kullanabilir. 
                  Tarayıcınızın çerez ayarlarından çerezleri yönetebilirsiniz.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">İletişim</h2>
            <p className="text-gray-400">
              Gizlilik politikamız hakkında sorularınız varsa, lütfen 
              <a href="/contact" className="text-blue-400 hover:text-blue-300 ml-1">İletişim</a> 
              sayfası üzerinden bizimle iletişime geçin.
            </p>
          </div>

          {/* Last Updated */}
          <div className="text-center text-gray-500 text-sm pt-4">
            Son güncelleme: Mayıs 2026
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
