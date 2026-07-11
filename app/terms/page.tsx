'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FileText, 
  AlertTriangle, 
  Shield, 
  Clock,
  Home
} from 'lucide-react';
import BackButton from '@/components/BackButton';

export default function TermsPage() {
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
            <FileText className="w-8 h-8 md:w-12 md:h-12 text-blue-500" />
            <h1 className="text-2xl md:text-5xl font-bold text-white">
              Şartlar ve Koşullar
            </h1>
          </div>
          <p className="text-sm md:text-xl text-gray-400 max-w-2xl mx-auto">
            LuxQr hizmetlerini kullanırken bilmeniz gereken kurallar ve sorumluluklar
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* Abuse Policy */}
          <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-4 md:p-8">
            <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="p-2 md:p-3 rounded-xl bg-red-500/20 glow-border flex-shrink-0">
                <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Kötüye Kullanım Yasak</h2>
                <div className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base">
                  <p>
                    LuxQr hizmetleri, yasa dışı, zararlı veya kötü amaçlı içeriklerin oluşturulması ve paylaşılması için kullanılamaz.
                  </p>
                  <p>
                    Aşağıdaki içeriklerin oluşturulması ve paylaşılması kesinlikle yasaktır:
                  </p>
                  <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 text-sm md:text-base">
                    <li>Yasa dışı materyaller ve suç teşkil eden içerikler</li>
                    <li>Telif hakkı ihlali oluşturan materyaller</li>
                    <li>Spam, dolandırıcılık veya phishing içerikleri</li>
                    <li>Kötü amaçlı yazılım, virüs veya zararlı kodlar</li>
                    <li>Kişisel verilerin izinsiz paylaşımı</li>
                    <li>Nefret söylemi, ayrımcılık veya taciz içeren içerikler</li>
                  </ul>
                  <p>
                    Kötüye kullanım tespit edilirse, ilgili QR kodlar derhal silinebilir ve gerekli yasal işlemler başlatılabilir.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* User Responsibility */}
          <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-4 md:p-8">
            <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="p-2 md:p-3 rounded-xl bg-blue-500/20 glow-border flex-shrink-0">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Kullanıcı Sorumluluğu</h2>
                <div className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base">
                  <p>
                    LuxQr üzerinden oluşturulan ve paylaşılan tüm içeriklerin sorumluluğu tamamen kullanıcıya aittir.
                  </p>
                  <p>
                    Kullanıcı, yüklediği veya oluşturduğu içeriklerin:
                  </p>
                  <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 text-sm md:text-base">
                    <li>Kendi mülkiyetinde olduğunu veya kullanım hakkına sahip olduğunu</li>
                    <li>Yerel ve uluslararası yasalara uygun olduğunu</li>
                    <li>Üçüncü şahısların haklarını ihlal etmediğini</li>
                  </ul>
                  <p>
                    garanti eder ve taahhüt eder.
                  </p>
                  <p>
                    LuxQr, kullanıcıların içeriklerini önceden inceleme veya denetleme yükümlülüğüne sahip değildir.
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
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Veri Saklama ve Silme</h2>
                <div className="space-y-2 md:space-y-3 text-gray-400 text-sm md:text-base">
                  <p>
                    Kullanıcıların yüklediği içerikler, seçtikleri geçerlilik süresine göre saklanır:
                  </p>
                  <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 text-sm md:text-base">
                    <li><strong className="text-white">1 Gün:</strong> 24 saat sonra otomatik olarak silinir</li>
                    <li><strong className="text-white">1 Hafta:</strong> 7 gün sonra otomatik olarak silinir</li>
                    <li><strong className="text-white">1 Ay:</strong> 30 gün sonra otomatik olarak silinir</li>
                    <li><strong className="text-white">3 Ay:</strong> 90 gün sonra otomatik olarak silinir</li>
                    <li><strong className="text-white">6 Ay:</strong> 180 gün sonra otomatik olarak silinir</li>
                    <li><strong className="text-white">12 Ay:</strong> 365 gün sonra otomatik olarak silinir</li>
                  </ul>
                  <p>
                    Sistemimiz bir kalıcı depolama servisi değildir; içerikler en fazla 12 ay (365 gün) süreyle barındırılır.
                  </p>
                  <p>
                    Süresi dolan paylaşımlar otomatik olarak sistemden kalıcı olarak silinir ve geri yüklenemez.
                  </p>
                  <p>
                    LuxQr, silinen verilerin yedeklenmesini garanti etmez ve silinen içeriklerin iadesi taleplerini karşılayamaz.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Availability */}
          <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-blue-500/20 glow-border">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Hizmet Kullanımı</h2>
                <div className="space-y-3 text-gray-400">
                  <p>
                    LuxQr hizmetleri "olduğu gibi" sağlanır ve herhangi bir garanti içermez.
                  </p>
                  <p>
                    Hizmetin kesintisiz, hatasız veya güvenli olacağı garanti edilemez.
                  </p>
                  <p>
                    LuxQr, hizmetin kullanımından kaynaklanan doğrudan veya dolaylı zararlardan sorumlu tutulamaz.
                  </p>
                  <p>
                    Hizmet şartları, kullanıcıların hizmeti kullanmaya başladığı anda kabul edilmiş sayılır.
                  </p>
                </div>
              </div>
            </div>
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
