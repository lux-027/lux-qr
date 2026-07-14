'use client';

import { motion } from 'framer-motion';
import { Shield, Database, Clock, Eye, Trash2, Lock, Cookie, Mail } from 'lucide-react';

const sections = [
  {
    icon: Database,
    title: 'Veri Toplama',
    from: '#3b82f6', to: '#06b6d4',
    glow: 'rgba(59,130,246,0.30)',
    accent: '#3b82f6',
    content: (
      <p className="text-gray-700 text-sm md:text-base leading-relaxed">
        LuxQr, QR kod oluştururken paylaştığınız içerikleri (metin, resim, video veya dosya)
        güvenli bir şekilde saklar. <strong className="text-gray-900">Kişisel bilgilerinizi
        (isim, e-posta, telefon vb.) toplamayız.</strong>
      </p>
    ),
  },
  {
    icon: Lock,
    title: 'Veri Depolama',
    from: '#8b5cf6', to: '#6366f1',
    glow: 'rgba(139,92,246,0.30)',
    accent: '#8b5cf6',
    content: (
      <div className="space-y-3 text-gray-700 text-sm md:text-base leading-relaxed">
        <p><strong className="text-gray-900">Vercel KV:</strong> QR kod meta verileri ve içerik bilgileri, yüksek performanslı key-value depolama sisteminde saklanır.</p>
        <p><strong className="text-gray-900">Vercel Blob:</strong> Resim, video ve dosya içerikleri, güvenli ve ölçeklenebilir blob depolama sisteminde tutulur.</p>
        <p>Tüm veriler şifreli bağlantılar üzerinden iletilir ve güvenli sunucularda depolanır.</p>
      </div>
    ),
  },
  {
    icon: Clock,
    title: 'Veri Saklama Süresi',
    from: '#f97316', to: '#f59e0b',
    glow: 'rgba(249,115,22,0.30)',
    accent: '#f97316',
    content: (
      <div className="space-y-3 text-gray-700 text-sm md:text-base leading-relaxed">
        <p>QR kod oluştururken seçtiğiniz geçerlilik süresine göre verileriniz saklanır:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[['1 Gün','24 saat'],['1 Hafta','7 gün'],['1 Ay','30 gün'],['3 Ay','90 gün'],['6 Ay','180 gün'],['12 Ay','365 gün']].map(([label, val]) => (
            <div key={label} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-50 border border-orange-100">
              <span className="w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />
              <span><strong className="text-gray-900">{label}:</strong> <span className="text-gray-600">{val} sonra silinir</span></span>
            </div>
          ))}
        </div>
        <p>Maksimum 12 ay sonunda veriler kalıcı olarak silinir. LuxQr bünyesinde sonsuza dek veri saklanmaz.</p>
      </div>
    ),
  },
  {
    icon: Eye,
    title: 'Veri Erişimi',
    from: '#10b981', to: '#06b6d4',
    glow: 'rgba(16,185,129,0.30)',
    accent: '#10b981',
    content: (
      <div className="space-y-3 text-gray-700 text-sm md:text-base leading-relaxed">
        <p>QR kod içeriğine sadece QR kod URL'sini bilen kişiler erişebilir.</p>
        <p>Her QR kod benzersiz bir kimliğe sahiptir ve bu kimlik sadece oluşturan kişi ve QR kodu tarayan kişiler tarafından bilinir.</p>
        <p><strong className="text-gray-900">Verileriniz üçüncü şahıslarla paylaşılmaz, satılmaz veya kiralanmaz.</strong></p>
      </div>
    ),
  },
  {
    icon: Trash2,
    title: 'Veri Silme',
    from: '#ef4444', to: '#f97316',
    glow: 'rgba(239,68,68,0.25)',
    accent: '#ef4444',
    content: (
      <div className="space-y-3 text-gray-700 text-sm md:text-base leading-relaxed">
        <p>Süresi dolan paylaşımlar otomatik olarak sistemden silinir.</p>
        <p>Verilerinizin silinmesini istiyorsanız, lütfen bizimle iletişime geçin.</p>
        <p><strong className="text-gray-900">Silinen veriler geri yüklenemez</strong> ve kalıcı olarak sistemden kaldırılır.</p>
      </div>
    ),
  },
  {
    icon: Cookie,
    title: 'Çerezler',
    from: '#f59e0b', to: '#eab308',
    glow: 'rgba(245,158,11,0.25)',
    accent: '#f59e0b',
    content: (
      <p className="text-gray-700 text-sm md:text-base leading-relaxed">
        LuxQr, kullanıcı deneyimini iyileştirmek için yalnızca temel çerezler kullanabilir.
        Tarayıcınızın çerez ayarlarından çerezleri istediğiniz zaman yönetebilirsiniz.
      </p>
    ),
  },
  {
    icon: Mail,
    title: 'İletişim',
    from: '#6366f1', to: '#8b5cf6',
    glow: 'rgba(99,102,241,0.25)',
    accent: '#6366f1',
    content: (
      <p className="text-gray-700 text-sm md:text-base leading-relaxed">
        Gizlilik politikamız hakkında sorularınız varsa{' '}
        <a href="/contact" className="text-blue-600 font-semibold hover:underline">İletişim</a>{' '}
        sayfası üzerinden bizimle iletişime geçebilirsiniz.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen">
      <div className="container mx-auto px-4 py-16">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl"
                style={{ background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', boxShadow: '0 12px 40px rgba(59,130,246,0.4), inset 0 1px 0 rgba(255,255,255,0.3)' }}>
                <Shield className="w-10 h-10 text-white drop-shadow-lg" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-white shadow flex items-center justify-center">
                <span className="text-white text-[8px] font-black">✓</span>
              </div>
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-3">Gizlilik Politikası</h1>
          <p className="text-gray-600 text-sm md:text-lg max-w-xl mx-auto">
            Verilerinizin güvenliği ve gizliliği bizim için önceliklidir
          </p>
        </motion.div>

        {/* Cards */}
        <div className="max-w-4xl mx-auto space-y-5">
          {sections.map(({ icon: Icon, title, from, to, glow, accent, content }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className="relative overflow-hidden rounded-2xl p-5 md:p-7"
              style={{
                background: 'rgba(255,255,255,0.88)',
                border: `1.5px solid ${accent}28`,
                boxShadow: `0 8px 32px ${glow}, 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)`,
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* top shine */}
              <div className="absolute top-0 left-0 right-0 h-1/3 rounded-t-2xl pointer-events-none"
                style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0.45) 0%,transparent 100%)' }} />
              {/* top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{ background: `linear-gradient(90deg,${from},${to})` }} />

              <div className="relative z-10 flex items-start gap-4 md:gap-5">
                {/* Icon badge */}
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

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="text-center text-gray-500 text-xs pt-2">
            Son güncelleme: Mayıs 2026
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}
