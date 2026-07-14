'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  HelpCircle, 
  ChevronDown,
  FileText,
  Zap,
  Shield,
  Users,
  CheckCircle,
  QrCode,
  Smartphone,
  Lock,
} from 'lucide-react';

const faqCategories = [
  {
    label: 'Genel',
    icon: HelpCircle,
    from: '#3b82f6', to: '#06b6d4',
    glow: 'rgba(59,130,246,0.28)',
    accent: '#3b82f6',
    items: [
      { question: 'LuxQr nedir?', answer: 'LuxQr; dosya, metin, resim ve videolarınızı saniyeler içinde yüksek kaliteli QR kodlara dönüştüren modern bir platformdur.' },
      { question: 'Hizmetiniz ücretsiz mi?', answer: 'LuxQr temel QR oluşturma özelliklerini tüm kullanıcılarına tamamen ücretsiz olarak sunar. Gelecekte premium özellikler eklenebilir ancak temel hizmet her zaman ücretsiz kalacaktır.' },
      { question: 'Kaç tane QR kod oluşturabilirim?', answer: 'Sınırsız sayıda QR kod oluşturabilirsiniz. Herhangi bir kısıtlama yoktur. İhtiyacınız kadar QR kod üretebilirsiniz.' },
      { question: 'Mobil uyumlu mu?', answer: 'Evet, LuxQr tamamen mobil uyumludur. Herhangi bir cihazdan QR kod oluşturabilir ve tarayabilirsiniz. iOS ve Android cihazlarda sorunsuz çalışır.' },
    ],
  },
  {
    label: 'Güvenlik & Veri',
    icon: Lock,
    from: '#10b981', to: '#06b6d4',
    glow: 'rgba(16,185,129,0.28)',
    accent: '#10b981',
    items: [
      { question: 'Verilerim güvende mi?', answer: "Evet. Yüklediğiniz içerikler şifreli altyapımızda saklanır ve belirlediğiniz süre sonunda sistemimizden kalıcı olarak silinir. Sadece QR kod URL'sini bilen kişiler verilerinize erişebilir." },
      { question: 'Oluşturduğum QR kodlar ne kadar süre geçerli?', answer: 'Kullanıcılarımıza 1 gün, 1 hafta, 1 ay ve maksimum 3 ay olmak üzere farklı geçerlilik süreleri sunuyoruz. Veri güvenliği gereği 3 aydan uzun süreli saklama yapılmamaktadır.' },
      { question: 'Verilerim kime ait?', answer: 'Yüklediğiniz veriler size aittir. Geçerlilik süresi boyunca verileriniz güvenli bir şekilde saklanır. Süre dolduğunda veriler kalıcı olarak silinir.' },
      { question: 'QR kodumun süresi dolduğunda ne olur?', answer: 'Geçerlilik süresi dolduğunda QR kod çalışmayı durdurur ve verileriniz sistemden otomatik olarak silinir. Kullanıcılar QR kodu taramaya çalıştığında hata mesajı alır.' },
    ],
  },
  {
    label: 'Kullanım',
    icon: Zap,
    from: '#f97316', to: '#f59e0b',
    glow: 'rgba(249,115,22,0.28)',
    accent: '#f97316',
    items: [
      { question: 'Hangi dosya türlerini yükleyebilirim?', answer: 'PNG, JPG, PDF, MP4 gibi popüler formatların yanı sıra düz metin ve URL paylaşımlarını da destekliyoruz. Maksimum 100MB boyutunda dosya yükleyebilirsiniz.' },
      { question: 'QR kodumun içeriğini değiştirebilir miyim?', answer: 'QR kod oluşturulduktan sonra içeriği değiştiremezsiniz. Ancak yeni bir QR kod oluşturabilir ve eski kodun geçerlilik süresi dolduğunda otomatik silinmesini bekleyebilirsiniz.' },
      { question: 'QR kodumu paylaşabilir miyim?', answer: 'Evet, QR kodunuzu indirebilir veya link olarak paylaşabilirsiniz. İndirdiğiniz QR kodu herhangi bir platformda kullanabilir veya linki arkadaşlarınızla paylaşabilirsiniz.' },
      { question: 'Dinamik QR kod ne demek?', answer: 'Dinamik QR kodlar, oluşturulduktan sonra bile içeriğini değiştirebileceğiniz kodlardır. QR kodun kendisi değişmez, ancak yönlendirdiği içerik güncellenebilir. LuxQr şu an için statik QR kodlar sunmaktadır.' },
    ],
  },
  {
    label: 'QR Türleri',
    icon: QrCode,
    from: '#8b5cf6', to: '#6366f1',
    glow: 'rgba(139,92,246,0.28)',
    accent: '#8b5cf6',
    items: [
      { question: 'Kartvizit QR kodu nasıl oluştururum?', answer: 'Kartvizit sayfasına giderek ad, soyad, telefon, e-posta ve diğer iletişim bilgilerinizi girerek vCard formatında dijital kartvizit QR kodu oluşturabilirsiniz.' },
      { question: 'WiFi QR kodu güvenli mi?', answer: 'Evet, WiFi QR kodları şifrenizi metin olarak değil, güvenli bir şekilde kodlar. Sadece QR kodu tarayan kişiler ağa erişebilir.' },
      { question: 'Ses dosyası QR kodu nedir?', answer: 'Ses dosyası QR kodları, MP3, WAV, M4A gibi ses dosyalarınızı paylaşmanızı sağlar. Maksimum 50MB boyutunda ses dosyaları yükleyebilirsiniz.' },
      { question: 'Sosyal medya QR kodu hangi platformları destekler?', answer: 'Instagram, TikTok, Facebook ve YouTube hesaplarınız için QR kod oluşturabilirsiniz. Link-in-bio sayfalarınız için de QR kod paylaşabilirsiniz.' },
    ],
  },
];

const faqData = faqCategories.flatMap(c => c.items);

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  }))
};

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen "
    >
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
                    style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)', boxShadow: '0 8px 24px rgba(59,130,246,0.45)' }}>
                    <HelpCircle className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-xl flex items-center justify-center shadow-lg -rotate-12"
                    style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', boxShadow: '0 4px 12px rgba(6,182,212,0.4)' }}>
                    <QrCode className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">
                  Sıkça Sorulan <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">Sorular</span>
                </h1>
                <p className="text-gray-600 text-sm md:text-base">LuxQr hakkında merak edilenler ve sıkça karşılaşılan sorular</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* FAQ Accordion - Categorized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.2 }}
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 md:mb-16 items-start"
        >
          {faqCategories.map((cat, catIdx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + catIdx * 0.07, duration: 0.25 }}
              >
                {/* 3D category header */}
                <div className="relative overflow-hidden flex items-center gap-3 px-4 py-3 rounded-2xl mb-3"
                  style={{
                    background: 'rgba(255,255,255,0.88)',
                    border: `1.5px solid ${cat.accent}28`,
                    boxShadow: `0 6px 24px ${cat.glow}, inset 0 1px 0 rgba(255,255,255,0.95)`,
                    backdropFilter: 'blur(12px)',
                  }}>
                  <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                    style={{ background: `linear-gradient(90deg,${cat.from},${cat.to})` }} />
                  <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl pointer-events-none"
                    style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0.45) 0%,transparent 100%)' }} />
                  <div className="relative z-10 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow"
                    style={{ background: `linear-gradient(135deg,${cat.from},${cat.to})`, boxShadow: `0 4px 14px ${cat.glow}, inset 0 1px 0 rgba(255,255,255,0.3)` }}>
                    <Icon className="w-4 h-4 text-white drop-shadow" />
                  </div>
                  <span className="relative z-10 text-sm md:text-base font-bold text-gray-900">{cat.label}</span>
                  <div className="relative z-10 ml-auto px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                    style={{ background: `${cat.accent}15`, color: cat.accent }}>
                    {cat.items.length} soru
                  </div>
                </div>

                {/* Questions */}
                <div className="space-y-2 pl-1">
                  {cat.items.map((item, idx) => {
                    const key = `${cat.label}-${idx}`;
                    const isOpen = openIndex === (catIdx * 100 + idx);
                    return (
                      <div key={key} className="card-premium overflow-hidden">
                        <button
                          onClick={() => toggleAccordion(catIdx * 100 + idx)}
                          className="w-full px-4 md:px-5 py-3 md:py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                        >
                          <h2 className="text-sm md:text-base font-semibold text-gray-900 flex-1 pr-3">
                            {item.question}
                          </h2>
                          <ChevronDown
                            className="w-4 h-4 flex-shrink-0 transition-transform duration-300"
                            style={{ color: cat.accent, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                          />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 md:px-5 pb-4">
                                <div className="h-px mb-3" style={{ background: `linear-gradient(90deg,${cat.from}33,transparent)` }} />
                                <p className="text-gray-700 leading-relaxed text-xs md:text-sm">{item.answer}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-3 md:gap-5 mb-8 md:mb-14">
          {[
            { icon: QrCode,  value: faqData.length.toString(), label: 'SSS Cevabı', from: '#3b82f6', to: '#06b6d4', glow: 'rgba(59,130,246,0.28)',  accent: '#3b82f6' },
            { icon: Smartphone, value: '9+',  label: 'QR Kod Türü',   from: '#8b5cf6', to: '#6366f1', glow: 'rgba(139,92,246,0.28)', accent: '#8b5cf6' },
            { icon: Shield,  value: '24/7',   label: 'Güvenli Destek', from: '#10b981', to: '#06b6d4', glow: 'rgba(16,185,129,0.28)', accent: '#10b981' },
          ].map(({ icon: Icon, value, label, from, to, glow, accent }) => (
            <div key={label} className="relative overflow-hidden rounded-2xl p-4 md:p-6 flex flex-col items-center text-center"
              style={{
                background: 'rgba(255,255,255,0.88)',
                border: `1.5px solid ${accent}22`,
                boxShadow: `0 8px 28px ${glow}, inset 0 1px 0 rgba(255,255,255,0.95)`,
                backdropFilter: 'blur(12px)',
              }}>
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{ background: `linear-gradient(90deg,${from},${to})` }} />
              <div className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-2xl"
                style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0.5) 0%,transparent 100%)' }} />
              <div className="absolute -bottom-3 -right-3 w-16 h-16 pointer-events-none"
                style={{ opacity: 0.06, color: accent }}>
                <Icon className="w-full h-full" strokeWidth={1} />
              </div>
              <div className="relative z-10 w-11 h-11 md:w-13 md:h-13 rounded-2xl flex items-center justify-center mb-3 flex-shrink-0"
                style={{ background: `linear-gradient(135deg,${from},${to})`, boxShadow: `0 5px 16px ${glow}, inset 0 1px 0 rgba(255,255,255,0.3)` }}>
                <Icon className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow" />
              </div>
              <p className="relative z-10 text-2xl md:text-3xl font-black text-gray-900 mb-0.5">{value}</p>
              <p className="relative z-10 text-gray-600 text-xs md:text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* QR Code Types Section */}
        <div className="mb-8 md:mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#8b5cf6,#6366f1)', boxShadow: '0 4px 14px rgba(139,92,246,0.35)' }}>
              <QrCode className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg md:text-2xl font-bold text-gray-900">QR Kod Türleri</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: FileText,   title: 'Metin',            desc: 'Metin içeriği',       link: '/qr/metin',       from: '#3b82f6', to: '#6366f1', glow: 'rgba(59,130,246,0.22)',  accent: '#3b82f6' },
              { icon: FileText,   title: 'Resim/Belge',      desc: 'PDF ve dosya paylaşımı', link: '/qr/metin-belge', from: '#8b5cf6', to: '#ec4899', glow: 'rgba(139,92,246,0.22)', accent: '#8b5cf6' },
              { icon: Users,      title: 'Kartvizit',        desc: 'Dijital vCard',        link: '/qr/kartvizit',   from: '#06b6d4', to: '#3b82f6', glow: 'rgba(6,182,212,0.22)',   accent: '#06b6d4' },
              { icon: Zap,        title: 'WiFi',             desc: 'Ağ paylaşımı',         link: '/qr/wifi',        from: '#10b981', to: '#06b6d4', glow: 'rgba(16,185,129,0.22)', accent: '#10b981' },
            ].map(({ icon: Icon, title, desc, link, from, to, glow, accent }) => (
              <Link key={title} href={link}>
                <div className="relative overflow-hidden rounded-2xl p-4 md:p-5 group transition-transform hover:-translate-y-1 duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.88)',
                    border: `1.5px solid ${accent}22`,
                    boxShadow: `0 6px 20px ${glow}, inset 0 1px 0 rgba(255,255,255,0.95)`,
                    backdropFilter: 'blur(12px)',
                  }}>
                  <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                    style={{ background: `linear-gradient(90deg,${from},${to})` }} />
                  <div className="absolute -bottom-3 -right-3 w-14 h-14 pointer-events-none transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                    style={{ opacity: 0.07, color: accent }}>
                    <Icon className="w-full h-full" strokeWidth={1.2} />
                  </div>
                  <div className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `linear-gradient(135deg,${from},${to})`, boxShadow: `0 4px 12px ${glow}, inset 0 1px 0 rgba(255,255,255,0.3)` }}>
                    <Icon className="w-5 h-5 text-white drop-shadow" />
                  </div>
                  <h3 className="relative z-10 text-sm md:text-base font-bold text-gray-900 mb-0.5">{title}</h3>
                  <p className="relative z-10 text-gray-600 text-xs">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-2xl p-6 md:p-10 mb-8 md:mb-14 text-center"
          style={{
            background: 'rgba(255,255,255,0.88)',
            border: '1.5px solid rgba(99,102,241,0.18)',
            boxShadow: '0 8px 32px rgba(99,102,241,0.18), inset 0 1px 0 rgba(255,255,255,0.95)',
            backdropFilter: 'blur(12px)',
          }}>
          <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
            style={{ background: 'linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4)' }} />
          <div className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-2xl"
            style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0.4) 0%,transparent 100%)' }} />
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle,rgba(99,102,241,0.08) 0%,transparent 70%)' }} />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 6px 20px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.3)' }}>
              <HelpCircle className="w-7 h-7 text-white drop-shadow" />
            </div>
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">Hâlâ Sorularınız mı Var?</h2>
            <p className="text-gray-600 text-sm md:text-base mb-6 max-w-xl mx-auto">Bizimle iletişime geçin, size yardımcı olalım.</p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl text-white font-bold text-sm md:text-base transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 4px 20px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
              İletişime Geç
              <ChevronDown className="w-4 h-4 -rotate-90" />
            </Link>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="relative overflow-hidden rounded-2xl p-5 md:p-7 mb-8 md:mb-16"
          style={{
            background: 'rgba(255,255,255,0.88)',
            border: '1.5px solid rgba(59,130,246,0.14)',
            boxShadow: '0 6px 24px rgba(59,130,246,0.10), inset 0 1px 0 rgba(255,255,255,0.95)',
            backdropFilter: 'blur(12px)',
          }}>
          <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
            style={{ background: 'linear-gradient(90deg,#3b82f6,#06b6d4)' }} />
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', boxShadow: '0 4px 12px rgba(59,130,246,0.35)' }}>
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-base md:text-xl font-bold text-gray-900">Hızlı Linkler</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
            {[
              { label: 'Ana Sayfa',          link: '/',         from: '#3b82f6', to: '#06b6d4' },
              { label: 'Blog',               link: '/blog',     from: '#8b5cf6', to: '#6366f1' },
              { label: 'İletişim',           link: '/contact',  from: '#10b981', to: '#06b6d4' },
              { label: 'Gizlilik Politikası',link: '/privacy',  from: '#f97316', to: '#f59e0b' },
              { label: 'Şartlar ve Koşullar',link: '/terms',    from: '#ec4899', to: '#8b5cf6' },
              { label: 'Hakkımızda',         link: '/about',    from: '#6366f1', to: '#3b82f6' },
            ].map(({ label, link, from, to }) => (
              <Link key={label} href={link}>
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all hover:-translate-y-0.5 duration-200"
                  style={{
                    background: 'rgba(248,250,252,0.8)',
                    border: `1px solid ${from}22`,
                    boxShadow: `0 2px 8px ${from}10`,
                  }}>
                  <div className="w-5 h-5 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg,${from},${to})` }}>
                    <ChevronDown className="w-2.5 h-2.5 text-white -rotate-90" />
                  </div>
                  <span className="text-gray-800 font-medium text-xs md:text-sm">{label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.main>
  );
}
