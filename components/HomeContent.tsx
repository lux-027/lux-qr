'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { QrCode, Type, CreditCard, Wifi, Share2, Mic, ArrowRight, Sparkles, Zap, Shield, HelpCircle, ChevronDown, Landmark, Image as ImageIcon, ShoppingBag } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const BlogSlider = dynamic(() => import('@/components/BlogSlider'), {
  ssr: false,
  loading: () => <div className="h-64 bg-white/5 rounded-2xl animate-pulse" />
});

const qrCategories = [
  {
    title: 'Metin',
    description: 'Metin içeriğinizi QR koda dönüştürün',
    icon: Type,
    href: '/qr/metin',
    color: 'from-blue-500 to-purple-500',
  },
  {
    title: 'Resim/Video/Belge',
    description: 'Resim, video ve belge yükleyerek QR kod oluşturun',
    icon: ImageIcon,
    href: '/qr/metin-belge',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Kartvizit',
    description: 'vCard formatında dijital kartvizit oluşturun ve paylaşın',
    icon: CreditCard,
    href: '/qr/kartvizit',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'WiFi',
    description: 'WiFi ağ bilgilerinizi QR kod ile kolayca paylaşın',
    icon: Wifi,
    href: '/qr/wifi',
    color: 'from-pink-500 to-rose-500',
  },
  {
    title: 'Sosyal Medya',
    description: 'Instagram, TikTok ve Link-in-bio sayfalarınız için QR kod',
    icon: Share2,
    href: '/qr/sosyal-medya',
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Ses Dosyası',
    description: 'Ses dosyalarınız yükleyerek QR kod oluşturun',
    icon: Mic,
    href: '/qr/ses-dosyasi',
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'IBAN',
    description: 'IBAN bilgilerinizi QR kod ile kolayca paylaşın',
    icon: Landmark,
    href: '/qr/iban',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Fiyat Listesi',
    description: 'Restoran menüsü, hizmet ve ürün fiyat listenizi QR koda dönüştürün',
    icon: ShoppingBag,
    href: '/qr/fiyat-listesi',
    color: 'from-orange-500 to-amber-500',
  },
];

export default function HomeContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqData = [
    {
      question: "QR kod ücretsiz mi?",
      answer: "Evet, LuxQR platformunda QR kod oluşturma tamamen ücretsizdir. Temel özelliklerin tamamını hiçbir ücret ödemeden kullanabilirsiniz."
    },
    {
      question: "QR kodun geçerlilik süresi nedir?",
      answer: "QR kodlarınız için 1 gün, 1 hafta, 1 ay veya 3 ay geçerlilik süresi seçebilirsiniz. Süre dolduğunda verileriniz otomatik olarak güvenli bir şekilde silinir."
    },
    {
      question: "QR kodu nerede kullanabilirim?",
      answer: "QR kodlarınızı kartvizitlerde, broşürlerde, menülerde, sosyal medyada, web sitelerinde ve daha birçok yerde kullanabilirsiniz. Yüksek çözünürlüklü baskı kalitesindedir."
    },
    {
      question: "Verilerim güvende mi?",
      answer: "Evet, tüm verileriniz AES-256 şifreleme ile korunur ve güvenli bulut sistemlerinde saklanır. Belirlediğiniz geçerlilik süresi dolduğunda verileriniz otomatik olarak silinir."
    },
    {
      question: "Dinamik QR kod nedir?",
      answer: "Dinamik QR kodlar, basılı materyalleri değiştirmeden arkasındaki yönlendirme linkini güncellemenize olanak tanır. Ayrıca tarama istatistiklerini takip edebilirsiniz."
    }
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <div className="px-4 py-8 md:py-12 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-center mb-12 md:mb-24"
          style={{ minHeight: '160px' }}
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-blue-500/20 blur-2xl md:blur-3xl rounded-full"></div>
            <div className="relative flex items-center justify-center gap-3 mb-4">
              <QrCode className="w-7 h-7 md:w-12 md:h-14 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.4)] md:drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
              <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-white">
                LuxQr
              </h1>
            </div>
          </div>
          <p className="text-base md:text-3xl lg:text-4xl font-semibold text-gray-300 mb-3">
            Modern{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] md:drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              QR Kod Oluşturma
            </span>
          </p>
          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto">
            İhtiyacınıza uygun QR kod türünü seçin ve saniyeler içinde profesyonel QR kodlar oluşturun
          </p>
        </motion.div>

        {/* QR Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {qrCategories.map((category, index) => (
            <motion.div
              key={category.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.03 * index, duration: 0.2 }}
            >
              <Link href={category.href}>
                <div className="card-premium group relative overflow-hidden h-full p-4 md:p-6 min-h-[140px] md:min-h-auto" style={{ minHeight: '140px' }}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className="relative">
                    <div className={`inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br ${category.color} mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md md:shadow-lg`}>
                      <category.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                    </div>
                    
                    <h2 className="text-sm md:text-xl font-bold text-white mb-1 md:mb-2 group-hover:text-gradient transition-colors">
                      {category.title}
                    </h2>
                    
                    <p className="text-gray-400 mb-2 md:mb-4 leading-relaxed text-xs md:text-sm">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center text-blue-400 font-semibold group-hover:translate-x-2 transition-transform duration-300 text-xs md:text-sm">
                      <span>Başla</span>
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16"
        >
          <div className="card-premium p-3 md:p-6 text-center">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-2 md:mb-4 shadow-md md:shadow-lg">
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Hızlı ve Kolay</h3>
            <p className="text-gray-400 text-xs md:text-sm">Saniyeler içinde QR kod oluşturun</p>
          </div>
          
          <div className="card-premium p-3 md:p-6 text-center">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-2 md:mb-4 shadow-md md:shadow-lg">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Güvenli Depolama</h3>
            <p className="text-gray-400 text-xs md:text-sm">Verileriniz şifreli olarak saklanır</p>
          </div>
          
          <div className="card-premium p-3 md:p-6 text-center col-span-2 md:col-span-1">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 mb-2 md:mb-4 shadow-md md:shadow-lg">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Modern Tasarım</h3>
            <p className="text-gray-400 text-xs md:text-sm">Şık ve kullanıcı dostu arayüz</p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.2 }}
          className="text-center card-premium p-4 md:p-8 md:p-12 mb-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className="relative z-10">
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4 text-gradient">
              Hemen Başlayın
            </h2>
            <p className="text-gray-300 text-sm md:text-lg mb-4 md:mb-6 max-w-2xl mx-auto">
              LuxQr ile dijital içeriklerinizi profesyonel QR kodlara dönüştürün. Ücretsiz ve hızlı.
            </p>
            <button
              onClick={() => {
                const startPosition = window.pageYOffset;
                const duration = 1500;
                let start: number | null = null;

                const animation = (currentTime: number) => {
                  if (!start) start = currentTime;
                  const timeElapsed = currentTime - start;
                  const run = easeInOutQuad(timeElapsed, startPosition, -startPosition, duration);
                  window.scrollTo(0, run);
                  if (timeElapsed < duration) requestAnimationFrame(animation);
                };

                const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
                  t /= d / 2;
                  if (t < 1) return c / 2 * t * t + b;
                  t--;
                  return -c / 2 * (t * (t - 2) - 1) + b;
                };

                requestAnimationFrame(animation);
              }}
              className="btn-primary inline-flex items-center gap-2 px-4 md:px-8 py-2 md:py-4 text-white font-semibold rounded-xl text-sm md:text-base"
            >
              İlk QR Kodunuzu Oluşturun
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </motion.div>

        {/* Blog Slider */}
        <BlogSlider />

        {/* Advanced QR Code Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.2 }}
          className="card-premium p-4 md:p-8 md:p-12 mb-16"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 text-gradient">
            LuxQR ile Profesyonel ve Dinamik QR Kod Yönetimi
          </h2>
          <div className="space-y-4 md:space-y-6 text-gray-300 leading-relaxed text-sm md:text-lg">
            <p className="border-l-4 border-blue-500/50 pl-3 md:pl-4">
              QR kodları, modern iş dünyasında dijital ve fiziksel dünyaları birbirine bağlayan en güçlü araçlardan biri haline gelmiştir. Restoranlarda menülere hızlı erişim sağlamak, sosyal medya hesaplarını büyütmek, dijital pazarlama kampanyalarını optimize etmek ve işletmelerin müşteri deneyimini geliştirmek için QR kod teknolojisi vazgeçilmezdir. LuxQR platformu, bu ihtiyacı karşılamak için gelişmiş QR kod çözümleri sunar.
            </p>
            <p className="border-l-4 border-purple-500/50 pl-3 md:pl-4">
              İş dünyasında vCard QR kodları, profesyonel kartvizitlerin dijital dönüşümünü sağlar. Toplantılarda, networking etkinliklerinde ve iş toplantılarında tek bir tarama ile tüm iletişim bilgilerinizi paylaşabilirsiniz. WiFi QR kodları, restoranlar, kafeler, oteller ve ofislerde müşterilere şifre paylaşımı sorununu ortadan kaldırır. Sosyal medya QR kodları, Instagram, TikTok ve diğer platformlarda takipçi kitlenizi artırmanızı sağlarken, Link-in-bio QR kodları ile tüm dijital varlıklarınızı tek bir noktada toplayabilirsiniz.
            </p>
            <p className="border-l-4 border-cyan-500/50 pl-3 md:pl-4">
              Dijital pazarlamada QR kodlar, kampanyaların takibini kolaylaştırır, kullanıcı etkileşimini ölçer ve dönüşüm oranlarını artırır. LuxQR ile oluşturulan QR kodlar, yüksek çözünürlüklü baskı kalitesi ve tarama hızı ile markanızın profesyonel imajını güçlendirir. Mobil uyumlu yapısı sayesinde her cihazda kusursuz çalışır ve kullanıcı dostu arayüzü ile QR kod oluşturma sürecini saniyeler içinde tamamlamanızı sağlar.
            </p>
          </div>
        </motion.div>

        {/* Dynamic vs Static QR Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.2 }}
          className="card-premium p-4 md:p-8 md:p-12 mb-16"
        >
          <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-8 text-gradient">
            Neden Dinamik QR Kod Tercih Etmelisiniz?
          </h2>
          <div className="space-y-4 md:space-y-8">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md md:shadow-lg">
                <span className="text-white font-bold text-sm md:text-base">1</span>
              </div>
              <div>
                <h3 className="text-base md:text-xl font-semibold text-white mb-1 md:mb-2">İçerik Güncelleme Esnekliği</h3>
                <p className="text-gray-400 leading-relaxed text-xs md:text-sm">
                  Dinamik QR kodlar, basılı materyalleri değiştirmeden arkasındaki yönlendirme linkini güncellemenize olanak tanır. Bu sayede promosyon kampanyalarınızı, ürün bilgilerinizi veya iletişim detaylarınızı anında güncelleyebilirsiniz. Statik QR kodlarda ise bir kez basıldıktan sonra içeriği değiştirilemez.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md md:shadow-lg">
                <span className="text-white font-bold text-sm md:text-base">2</span>
              </div>
              <div>
                <h3 className="text-base md:text-xl font-semibold text-white mb-1 md:mb-2">Gelişmiş Veri Analitiği</h3>
                <p className="text-gray-400 leading-relaxed text-xs md:text-sm">
                  LuxQR dinamik QR kodları ile tarama istatistiklerini takip edebilir, coğrafi konum verilerini analiz edebilir ve kullanıcı etkileşimini ölçebilirsiniz. Hangi saatlerde daha fazla tarama yapıldığını, hangi bölgelerden ilgi gördüğünüzü ve kampanyalarınızın performansını detaylı raporlarla inceleyebilirsiniz.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-md md:shadow-lg">
                <span className="text-white font-bold text-sm md:text-base">3</span>
              </div>
              <div>
                <h3 className="text-base md:text-xl font-semibold text-white mb-1 md:mb-2">Tıklama Takibi ve Optimizasyon</h3>
                <p className="text-gray-400 leading-relaxed text-xs md:text-sm">
                  Her QR kod taraması kaydedilir ve analiz edilir. Bu veriler sayesinde pazarlama stratejilerinizi optimize edebilir, hedef kitlenizin davranışlarını daha iyi anlayabilir ve dönüşüm oranlarınızı artırabilirsiniz. A/B testleri yaparak farklı QR kod versiyonlarının performansını karşılaştırabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step-by-Step Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-8 md:mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-3">Nasıl Çalışır?</span>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white">
              3 Adımda QR Kodunuz Hazır
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-6 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-gradient-to-r from-orange-500/40 via-amber-500/60 to-orange-500/40 z-0" />

            {/* Step 1 */}
            <div className="relative z-10 card-premium p-3 md:p-7 flex flex-col items-center text-center group hover:border-orange-500/40 transition-all">
              <div className="relative mb-5">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-xl shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h8" /></svg>
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-slate-800 border-2 border-orange-500 rounded-xl flex items-center justify-center">
                  <span className="text-orange-400 font-black text-sm">1</span>
                </div>
              </div>
              <h3 className="text-white font-bold text-base md:text-lg mb-2">Tür Seçin</h3>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">WiFi, kartvizit, sosyal medya, fiyat listesi, ses, metin veya dosya — ihtiyacınıza uygun QR türünü seçin.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                {['WiFi', 'vCard', 'Sosyal Medya', 'Fiyat Listesi'].map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-slate-700/60 border border-slate-600 text-slate-400 text-[10px] font-medium">{t}</span>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 card-premium p-3 md:p-7 flex flex-col items-center text-center group hover:border-amber-500/40 transition-all">
              <div className="relative mb-5">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center shadow-xl shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-all">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-slate-800 border-2 border-amber-500 rounded-xl flex items-center justify-center">
                  <span className="text-amber-400 font-black text-sm">2</span>
                </div>
              </div>
              <h3 className="text-white font-bold text-base md:text-lg mb-2">Bilgileri Girin</h3>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">Formları doldurun ya da dosyanızı sürükleyip bırakın. Verileriniz şifreli olarak işlenir, güvenliğiniz önceliğimizdir.</p>
              <div className="mt-4 w-full bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-slate-500 text-[10px]">Ağ Adı</span>
                </div>
                <div className="h-1.5 bg-slate-700 rounded-full w-3/4 mb-2" />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-slate-500 text-[10px]">Şifre</span>
                </div>
                <div className="h-1.5 bg-slate-700 rounded-full w-1/2 mt-2" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 card-premium p-3 md:p-7 flex flex-col items-center text-center group hover:border-emerald-500/40 transition-all">
              <div className="relative mb-5">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-xl shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.243m-4.243 0a1 1 0 00-1 1M9 17h2m2 0h2M3 21l1.5-1.5M21 21l-1.5-1.5M3 3l1.5 1.5M21 3l-1.5 1.5" /></svg>
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-slate-800 border-2 border-emerald-500 rounded-xl flex items-center justify-center">
                  <span className="text-emerald-400 font-black text-sm">3</span>
                </div>
              </div>
              <h3 className="text-white font-bold text-base md:text-lg mb-2">QR Kodunuzu Alın</h3>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">Saniyeler içinde yüksek çözünürlüklü QR kodunuz hazır. İndirin, paylaşın veya baskıya gönderin.</p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </div>
                  <span className="text-slate-500 text-[9px]">İndir</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                  </div>
                  <span className="text-slate-500 text-[9px]">Paylaş</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </div>
                  <span className="text-slate-500 text-[9px]">Kopyala</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security and Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.2 }}
          className="card-premium p-4 md:p-8 md:p-12 mb-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className="relative z-10">
            <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-8">
              <div className="flex-shrink-0 p-2 md:p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-md md:shadow-lg">
                <Shield className="w-5 h-5 md:w-8 md:h-8 text-white" />
              </div>
              <div>
                <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2 text-gradient">
                  Güvenlik ve Gizlilik Önceliğimiz
                </h2>
                <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
                  LuxQR platformu, kullanıcı verilerinin güvenliğini ve gizliliğini en üst düzeyde korumayı taahhüt eder. Tüm verileriniz endüstri standardı şifreleme protokolleri ile korunur ve güvenli bulut sistemlerinde saklanır. Kişisel bilgilerinizi asla üçüncü taraflarla paylaşmıyoruz ve veri toplama politikamız şeffaftır.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-3 md:gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 md:p-6 hover:border-blue-500/30 transition-colors">
                <h3 className="text-sm md:text-lg font-semibold text-white mb-2 md:mb-3">Şifreli Veri Saklama</h3>
                <p className="text-gray-400 leading-relaxed text-xs md:text-sm">
                  Tüm QR kod verileriniz AES-256 şifreleme ile korunur. Dosyalarınız ve içerikleriniz güvenli bulut depolama sistemlerinde saklanır ve sadece QR kod URL'sini bilen kişiler tarafından erişilebilir.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 md:p-6 hover:border-purple-500/30 transition-colors">
                <h3 className="text-sm md:text-lg font-semibold text-white mb-2 md:mb-3">Otomatik Veri Temizleme</h3>
                <p className="text-gray-400 leading-relaxed text-xs md:text-sm">
                  Belirlediğiniz geçerlilik süresi dolduğunda verileriniz otomatik olarak sistemden güvenli bir şekilde silinir. Bu sayede verilerinizin kontrolü sizde kalır ve gizliliğiniz korunur.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 md:p-6 hover:border-cyan-500/30 transition-colors">
                <h3 className="text-sm md:text-lg font-semibold text-white mb-2 md:mb-3">GDPR Uyumluluğu</h3>
                <p className="text-gray-400 leading-relaxed text-xs md:text-sm">
                  Platformumuz Avrupa Birliği Genel Veri Koruma Tüzüğü (GDPR) ile tam uyumludur. Veri işleme politikalarımız şeffaftır ve kullanıcı haklarına saygı duyarız.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 md:p-6 hover:border-pink-500/30 transition-colors">
                <h3 className="text-sm md:text-lg font-semibold text-white mb-2 md:mb-3">Güvenli Altyapı</h3>
                <p className="text-gray-400 leading-relaxed text-xs md:text-sm">
                  Vercel'in güçlü altyapısı ve modern güvenlik protokolleri ile platformumuz sürekli olarak güvenlik testlerinden geçer. DDoS koruması, SSL sertifikası ve düzenli güvenlik güncellemeleri ile verileriniz güvende.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.2 }}
          className="card-premium p-4 md:p-8 md:p-12 mb-16"
          style={{ minHeight: '300px' }}
        >
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-8">
            <div className="p-2 md:p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-md md:shadow-lg">
              <HelpCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-white text-gradient">
              Sıkça Sorulan Sorular
            </h2>
          </div>
          
          <div className="space-y-3 md:space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="card-premium overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-3 md:p-6 text-left"
                >
                  <span className="text-sm md:text-lg font-semibold text-white flex-1">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 md:w-5 md:h-5 text-blue-400 transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-3 md:px-6 pb-3 md:pb-6"
                  >
                    <p className="text-gray-400 leading-relaxed text-xs md:text-sm">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 md:mt-8 text-center">
            <Link href="/faq" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-semibold text-sm md:text-base">
              Tüm Soruları Gör
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
