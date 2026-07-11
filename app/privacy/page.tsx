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
import BackButton from '@/components/BackButton';

export default function PrivacyPage() {
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
            <Shield className="w-8 h-8 md:w-12 md:h-12 text-blue-500" />
            <h1 className="text-2xl md:text-5xl font-bold text-white">
              Gizlilik Politikası
            </h1>
          </div>
          <p className="text-sm md:text-xl text-gray-400 max-w-2xl mx-auto">
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
          <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-4 md:p-8">
            <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="p-2 md:p-3 rounded-xl bg-blue-500/20 glow-border flex-shrink-0">
                <Database className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Veri Toplama</h2>
                <p className="text-gray-400 text-sm md:text-base">
                  LuxQr, QR kod oluştururken paylaştığınız içerikleri (metin, resim, video veya dosya) 
                  güvenli bir şekilde saklar. Kişisel bilgilerinizi (isim, e-posta, telefon vb.) toplamayız.
                </p>
              </div>
            </div>
          </div>

          {/* Data Storage */}
          <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-4 md:p-8">
            <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="p-2 md:p-3 rounded-xl bg-blue-500/20 glow-border flex-shrink-0">
                <Lock className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Veri Depolama</h2>
                <div className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base">
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
          <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-4 md:p-8">
            <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="p-2 md:p-3 rounded-xl bg-blue-500/20 glow-border flex-shrink-0">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Veri Saklama Süresi</h2>
                <div className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base">
                  <p>
                    QR kod oluştururken seçtiğiniz geçerlilik süresine göre verileriniz saklanır:
                  </p>
                  <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 text-sm md:text-base">
                    <li><strong className="text-white">1 Gün:</strong> 24 saat sonra otomatik silinir</li>
                    <li><strong className="text-white">1 Hafta:</strong> 7 gün sonra otomatik silinir</li>
                    <li><strong className="text-white">1 Ay:</strong> 30 gün sonra otomatik silinir</li>
                    <li><strong className="text-white">3 Ay:</strong> 90 gün sonra otomatik silinir</li>
                    <li><strong className="text-white">6 Ay:</strong> 180 gün sonra otomatik silinir</li>
                    <li><strong className="text-white">12 Ay:</strong> 365 gün sonra otomatik silinir</li>
                  </ul>
                  <p>
                    Kullanıcı gizliliği ve veri güvenliği gereği, oluşturulan QR kodlar ve ilgili içerikler seçilen süre sonunda (maksimum 12 ay) sistemimizden kalıcı olarak silinmektedir. LuxQr bünyesinde sonsuza dek veri saklanmaz.
                  </p>
                  <p>
                    Süresi dolan paylaşımlar otomatik olarak sistemden temizlenir.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Access */}
          <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-4 md:p-8">
            <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="p-2 md:p-3 rounded-xl bg-blue-500/20 glow-border flex-shrink-0">
                <Eye className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Veri Erişimi</h2>
                <div className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base">
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
