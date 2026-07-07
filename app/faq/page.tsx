'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  HelpCircle, 
  ChevronDown,
  Home,
  FileText,
  Zap,
  Shield,
  Users,
  Mail,
  CheckCircle,
  QrCode
} from 'lucide-react';

const faqData = [
  {
    question: 'LuxQr nedir?',
    answer: 'LuxQr; dosya, metin, resim ve videolarınızı saniyeler içinde yüksek kaliteli QR kodlara dönüştüren modern bir platformdur.'
  },
  {
    question: 'Oluşturduğum QR kodlar ne kadar süre geçerli?',
    answer: 'Kullanıcılarımıza 1 gün, 1 hafta, 1 ay ve maksimum 3 ay olmak üzere farklı geçerlilik süreleri sunuyoruz. Veri güvenliği gereği 3 aydan uzun süreli saklama yapılmamaktadır.'
  },
  {
    question: 'Hangi dosya türlerini yükleyebilirim?',
    answer: 'PNG, JPG, PDF, MP4 gibi popüler formatların yanı sıra düz metin ve URL paylaşımlarını da destekliyoruz. Maksimum 100MB boyutunda dosya yükleyebilirsiniz.'
  },
  {
    question: 'Verilerim güvende mi?',
    answer: 'Evet. Yüklediğiniz içerikler şifreli altyapımızda saklanır ve belirlediğiniz süre sonunda sistemimizden kalıcı olarak silinir. Sadece QR kod URL\'sini bilen kişiler verilerinize erişebilir.'
  },
  {
    question: 'Hizmetiniz ücretsiz mi?',
    answer: 'LuxQr temel QR oluşturma özelliklerini tüm kullanıcılarına tamamen ücretsiz olarak sunar. Gelecekte premium özellikler eklenebilir ancak temel hizmet her zaman ücretsiz kalacaktır.'
  },
  {
    question: 'QR kodumun içeriğini değiştirebilir miyim?',
    answer: 'QR kod oluşturulduktan sonra içeriği değiştiremezsiniz. Ancak yeni bir QR kod oluşturabilir ve eski kodun geçerlilik süresi dolduğunda otomatik silinmesini bekleyebilirsiniz.'
  },
  {
    question: 'QR kodumun istatistiklerini görebilir miyim?',
    answer: 'Şu an için QR kod tarama istatistikleri sunmuyoruz, ancak bu özellik gelecekte eklenebilir. QR kodunuzun kaç kez tarandığını şu an için göremeyebilirsiniz.'
  },
  {
    question: 'Kaç tane QR kod oluşturabilirim?',
    answer: 'Sınırsız sayıda QR kod oluşturabilirsiniz. Herhangi bir kısıtlama yoktur. İhtiyacınız kadar QR kod üretebilirsiniz.'
  },
  {
    question: 'Mobil uyumlu mu?',
    answer: 'Evet, LuxQr tamamen mobil uyumludur. Herhangi bir cihazdan QR kod oluşturabilir ve tarayabilirsiniz. iOS ve Android cihazlarda sorunsuz çalışır.'
  },
  {
    question: 'QR kodumun süresi dolduğunda ne olur?',
    answer: 'Geçerlilik süresi dolduğunda QR kod çalışmayı durdurur ve verileriniz sistemden otomatik olarak silinir. Kullanıcılar QR kodu taramaya çalıştığında hata mesajı alır.'
  },
  {
    question: 'Dinamik QR kod ne demek?',
    answer: 'Dinamik QR kodlar, oluşturulduktan sonra bile içeriğini değiştirebileceğiniz kodlardır. QR kodun kendisi değişmez, ancak yönlendirdiği içerik güncellenebilir. LuxQr şu an için statik QR kodlar sunmaktadır.'
  },
  {
    question: 'QR kodumu paylaşabilir miyim?',
    answer: 'Evet, QR kodunuzu indirebilir veya link olarak paylaşabilirsiniz. İndirdiğiniz QR kodu herhangi bir platformda kullanabilir veya linki arkadaşlarınızla paylaşabilirsiniz.'
  },
  {
    question: 'Verilerim kime ait?',
    answer: 'Yüklediğiniz veriler size aittir. Geçerlilik süresi boyunca verileriniz güvenli bir şekilde saklanır. Süre dolduğunda veriler kalıcı olarak silinir.'
  },
  {
    question: 'Kartvizit QR kodu nasıl oluştururum?',
    answer: 'Kartvizit sayfasına giderek ad, soyad, telefon, e-posta ve diğer iletişim bilgilerinizi girerek vCard formatında dijital kartvizit QR kodu oluşturabilirsiniz.'
  },
  {
    question: 'WiFi QR kodu güvenli mi?',
    answer: 'Evet, WiFi QR kodları şifrenizi metin olarak değil, güvenli bir şekilde kodlar. Sadece QR kodu tarayan kişiler ağa erişebilir.'
  },
  {
    question: 'Ses dosyası QR kodu nedir?',
    answer: 'Ses dosyası QR kodları, MP3, WAV, M4A gibi ses dosyalarınızı paylaşmanızı sağlar. Maksimum 50MB boyutunda ses dosyaları yükleyebilirsiniz.'
  },
  {
    question: 'Sosyal medya QR kodu hangi platformları destekler?',
    answer: 'Instagram, TikTok, Facebook ve YouTube hesaplarınız için QR kod oluşturabilirsiniz. Link-in-bio sayfalarınız için de QR kod paylaşabilirsiniz.'
  }
];

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
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
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
          className="text-center mb-16"
        >
          <div className="flex flex-col items-center justify-center gap-3 mb-6">
            <HelpCircle className="w-12 h-12 text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
            <h1 className="text-5xl font-bold text-white text-gradient">
              Sıkça Sorulan Sorular
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            LuxQr hakkında merak edilenler ve sıkça karşılaşılan sorular
          </p>
        </motion.div>

        {/* FAQ Accordion - 2 Column Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.2 }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-16"
        >
          {faqData.map((item, index) => (
            <div
              key={index}
              className="card-premium overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-4 md:px-6 py-3 md:py-5 flex items-center justify-between text-left hover:bg-white/10 transition-colors"
              >
                <h2 className="text-sm md:text-lg font-semibold text-white flex-1">
                  {item.question}
                </h2>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-2 md:ml-4"
                >
                  <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 md:px-6 pb-3 md:pb-5">
                      <p className="text-gray-400 leading-relaxed text-xs md:text-sm">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        {/* QR Code Types Section */}
        <div className="mb-8 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-8 text-center text-gradient">
            QR Kod Türleri
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {[
              { icon: FileText, title: 'Metin', desc: 'Metin içeriği', link: '/qr/metin' },
              { icon: FileText, title: 'Resim/Video/Belge', desc: 'PDF ve dosya paylaşımı', link: '/qr/metin-belge' },
              { icon: Users, title: 'Kartvizit', desc: 'Dijital vCard', link: '/qr/kartvizit' },
              { icon: Zap, title: 'WiFi', desc: 'Ağ paylaşımı', link: '/qr/wifi' },
            ].map((item, index) => (
              <Link key={index} href={item.link}>
                <div className="card-premium p-3 md:p-6 hover:border-blue-500/50 transition-all group">
                  <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-2 md:mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-sm md:text-lg font-semibold text-white mb-1 md:mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-xs md:text-sm">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="card-premium p-4 md:p-8 md:p-12 mb-8 md:mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-xl md:text-3xl md:text-4xl font-bold text-white mb-2 md:mb-4 text-gradient">
              Hala Sorularınız mı Var?
            </h2>
            <p className="text-gray-300 text-sm md:text-lg mb-4 md:mb-8 max-w-2xl mx-auto">
              Bizimle iletişime geçin, size yardımcı olalım.
            </p>
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center gap-2 px-4 md:px-8 py-2 md:py-4 text-white font-semibold rounded-xl md:rounded-2xl text-sm md:text-base"
            >
              İletişime Geç
              <ChevronDown className="w-4 h-4 md:w-5 md:h-5 rotate-[-90deg]" />
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-16">
          {[
            { icon: QrCode, value: faqData.length.toString(), label: 'SSS Cevabı' },
            { icon: Users, value: '5+', label: 'QR Kod Türü' },
            { icon: Shield, value: '24/7', label: 'Destek' },
          ].map((stat, index) => (
            <div key={index} className="card-premium p-3 md:p-6 text-center">
              <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-2 md:mb-4 shadow-lg">
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">{stat.value}</p>
              <p className="text-gray-400 text-xs md:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Links Section */}
        <div className="card-premium p-4 md:p-8 mb-8 md:mb-16">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 text-center text-gradient">
            Hızlı Linkler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {[
              { label: 'Ana Sayfa', link: '/' },
              { label: 'Blog', link: '/blog' },
              { label: 'İletişim', link: '/contact' },
              { label: 'Gizlilik Politikası', link: '/privacy' },
              { label: 'Şartlar ve Koşullar', link: '/terms' },
              { label: 'Hakkımızda', link: '/about' },
            ].map((item, index) => (
              <Link key={index} href={item.link}>
                <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 transition-colors border border-white/10 hover:border-blue-500/30">
                  <div className="flex-shrink-0 p-1.5 md:p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white" />
                  </div>
                  <span className="text-white font-medium text-sm md:text-base">{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.main>
  );
}
