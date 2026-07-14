'use client';

import { motion } from 'framer-motion';
import { FileText, AlertTriangle, Shield, Clock, Zap } from 'lucide-react';

const sections = [
  {
    icon: AlertTriangle,
    title: 'Kötüye Kullanım Yasak',
    from: '#ef4444', to: '#f97316',
    glow: 'rgba(239,68,68,0.28)',
    accent: '#ef4444',
    content: (
      <div className="space-y-3 text-gray-700 text-sm md:text-base leading-relaxed">
        <p>LuxQr hizmetleri, yasa dışı, zararlı veya kötü amaçlı içeriklerin oluşturulması ve paylaşılması için <strong className="text-gray-900">kullanılamaz</strong>.</p>
        <p className="font-semibold text-gray-800">Kesinlikle yasak içerikler:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            'Yasa dışı materyaller ve suç teşkil eden içerikler',
            'Telif hakkı ihlali oluşturan materyaller',
            'Spam, dolandırıcılık veya phishing içerikleri',
            'Kötü amaçlı yazılım, virüs veya zararlı kodlar',
            'Kişisel verilerin izinsiz paylaşımı',
            'Nefret söylemi, ayrımcılık veya taciz içerikleri',
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 px-3 py-2 rounded-xl bg-red-50 border border-red-100">
              <span className="text-red-400 font-black flex-shrink-0 mt-0.5">✕</span>
              <span className="text-gray-700 text-xs md:text-sm">{item}</span>
            </div>
          ))}
        </div>
        <p>Kötüye kullanım tespit edilirse, ilgili QR kodlar derhal silinebilir ve gerekli yasal işlemler başlatılabilir.</p>
      </div>
    ),
  },
  {
    icon: Shield,
    title: 'Kullanıcı Sorumluluğu',
    from: '#3b82f6', to: '#6366f1',
    glow: 'rgba(59,130,246,0.28)',
    accent: '#3b82f6',
    content: (
      <div className="space-y-3 text-gray-700 text-sm md:text-base leading-relaxed">
        <p>LuxQr üzerinden oluşturulan ve paylaşılan tüm içeriklerin sorumluluğu <strong className="text-gray-900">tamamen kullanıcıya aittir</strong>.</p>
        <p>Kullanıcı, yüklediği veya oluşturduğu içeriklerin aşağıdakileri garanti eder ve taahhüt eder:</p>
        <div className="space-y-2">
          {[
            'Kendi mülkiyetinde olduğunu veya kullanım hakkına sahip olduğunu',
            'Yerel ve uluslararası yasalara uygun olduğunu',
            'Üçüncü şahısların haklarını ihlal etmediğini',
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 px-3 py-2 rounded-xl bg-blue-50 border border-blue-100">
              <span className="text-blue-500 font-black flex-shrink-0 mt-0.5">✓</span>
              <span className="text-gray-700 text-xs md:text-sm">{item}</span>
            </div>
          ))}
        </div>
        <p>LuxQr, kullanıcıların içeriklerini önceden inceleme veya denetleme yükümlülüğüne sahip değildir.</p>
      </div>
    ),
  },
  {
    icon: Clock,
    title: 'Veri Saklama ve Silme',
    from: '#f97316', to: '#f59e0b',
    glow: 'rgba(249,115,22,0.28)',
    accent: '#f97316',
    content: (
      <div className="space-y-3 text-gray-700 text-sm md:text-base leading-relaxed">
        <p>Kullanıcıların yüklediği içerikler, seçtikleri geçerlilik süresine göre saklanır:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[['1 Gün','24 saat'],['1 Hafta','7 gün'],['1 Ay','30 gün'],['3 Ay','90 gün'],['6 Ay','180 gün'],['12 Ay','365 gün']].map(([label, val]) => (
            <div key={label} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-50 border border-orange-100">
              <span className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />
              <span className="text-xs md:text-sm"><strong className="text-gray-900">{label}:</strong> <span className="text-gray-600">{val}</span></span>
            </div>
          ))}
        </div>
        <p>Sistemimiz <strong className="text-gray-900">kalıcı depolama servisi değildir</strong>; içerikler en fazla 12 ay süreyle barındırılır ve süresi dolan içerikler geri yüklenemez.</p>
      </div>
    ),
  },
  {
    icon: Zap,
    title: 'Hizmet Kullanımı',
    from: '#8b5cf6', to: '#6366f1',
    glow: 'rgba(139,92,246,0.28)',
    accent: '#8b5cf6',
    content: (
      <div className="space-y-3 text-gray-700 text-sm md:text-base leading-relaxed">
        <p>LuxQr hizmetleri <strong className="text-gray-900">"olduğu gibi"</strong> sağlanır ve herhangi bir garanti içermez.</p>
        <p>Hizmetin kesintisiz, hatasız veya güvenli olacağı garanti edilemez.</p>
        <p>LuxQr, hizmetin kullanımından kaynaklanan doğrudan veya dolaylı zararlardan sorumlu tutulamaz.</p>
        <div className="px-4 py-3 rounded-xl bg-purple-50 border border-purple-100">
          <p className="text-purple-800 text-xs md:text-sm font-medium">Hizmeti kullanmaya başladığınız anda bu şartları kabul etmiş sayılırsınız.</p>
        </div>
      </div>
    ),
  },
  {
    icon: FileText,
    title: 'İletişim',
    from: '#10b981', to: '#06b6d4',
    glow: 'rgba(16,185,129,0.25)',
    accent: '#10b981',
    content: (
      <p className="text-gray-700 text-sm md:text-base leading-relaxed">
        Şartlar ve koşullar hakkında sorularınız varsa{' '}
        <a href="/contact" className="text-blue-600 font-semibold hover:underline">İletişim</a>{' '}
        sayfası üzerinden bizimle iletişime geçebilirsiniz.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen">
      <div className="container mx-auto px-4 py-16">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl"
                style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 12px 40px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.3)' }}>
                <FileText className="w-10 h-10 text-white drop-shadow-lg" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-400 border-2 border-white shadow flex items-center justify-center">
                <span className="text-white text-[8px] font-black">§</span>
              </div>
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-3">Şartlar ve Koşullar</h1>
          <p className="text-gray-600 text-sm md:text-lg max-w-xl mx-auto">
            LuxQr hizmetlerini kullanırken bilmeniz gereken kurallar ve sorumluluklar
          </p>
        </motion.div>

        {/* Cards */}
        <div className="max-w-4xl mx-auto space-y-5">
          {sections.map(({ icon: Icon, title, from, to, glow, accent, content }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="relative overflow-hidden rounded-2xl p-5 md:p-7"
              style={{
                background: 'rgba(255,255,255,0.88)',
                border: `1.5px solid ${accent}28`,
                boxShadow: `0 8px 32px ${glow}, 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)`,
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-1/3 rounded-t-2xl pointer-events-none"
                style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0.45) 0%,transparent 100%)' }} />
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{ background: `linear-gradient(90deg,${from},${to})` }} />

              <div className="relative z-10 flex items-start gap-4 md:gap-5">
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{
                    background: `linear-gradient(135deg,${from},${to})`,
                    boxShadow: `0 6px 20px ${glow}, inset 0 1px 0 rgba(255,255,255,0.3)`,
                  }}>
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-white drop-shadow" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{title}</h2>
                  {content}
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="text-center text-gray-500 text-xs pt-2">
            Son güncelleme: Mayıs 2026
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}
