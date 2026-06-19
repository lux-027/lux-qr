import type { Metadata } from "next";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { QrCode, Type, CreditCard, Wifi, Share2, Mic, ArrowRight, Sparkles, Zap, Shield, HelpCircle, ChevronDown } from 'lucide-react';
import BlogSlider from '@/components/BlogSlider';
import { useState } from 'react';

export const metadata: Metadata = {
  title: "LuxQr - Ücretsiz QR Kod Oluşturucu | Metin, WiFi, Kartvizit, Sosyal Medya",
  description: "Türkiye'nin en gelişmiş QR kod oluşturucu. Metin, resim, video, belge, WiFi, kartvizit, sosyal medya ve ses dosyaları için ücretsiz QR kod oluşturun. Hızlı, güvenli ve modern.",
  keywords: ["qr kod oluşturucu", "ücretsiz qr kod", "wifi qr kod", "kartvizit qr", "instagram qr", "tiktok qr", "metin qr", "dosya qr", "türkiye qr kod", "qr kod yap"],
  openGraph: {
    title: "LuxQr - Ücretsiz QR Kod Oluşturucu | Metin, WiFi, Kartvizit, Sosyal Medya",
    description: "Türkiye'nin en gelişmiş QR kod oluşturucu. Ücretsiz ve güvenli QR kod oluşturma platformu.",
    url: "https://www.luxqrpro.site",
    type: "website",
  },
  twitter: {
    title: "LuxQr - Ücretsiz QR Kod Oluşturucu",
    description: "Türkiye'nin en gelişmiş QR kod oluşturucu. Metin, resim, video, belge, WiFi, kartvizit, sosyal medya ve ses dosyaları için ücretsiz QR kod oluşturun.",
  },
};

'use client';

const qrCategories = [
  {
    title: 'Metin, Resim, Video, Belge',
    description: 'Metin, resim, video ve belge yükleyerek QR kod oluşturun',
    icon: Type,
    href: '/qr/metin-belge',
    color: 'from-blue-500 to-purple-500',
  },
  {
    title: 'Kartvizit',
    description: 'vCard formatında dijital kartvizit oluşturun ve paylaşın',
    icon: CreditCard,
    href: '/qr/kartvizit',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'WiFi',
    description: 'WiFi ağ bilgilerinizi QR kod ile kolayca paylaşın',
    icon: Wifi,
    href: '/qr/wifi',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Sosyal Medya',
    description: 'Instagram, TikTok ve Link-in-bio sayfalarınız için QR kod',
    icon: Share2,
    href: '/qr/sosyal-medya',
    color: 'from-pink-500 to-rose-500',
  },
  {
    title: 'Ses Dosyası',
    description: 'Ses dosyalarınız yükleyerek QR kod oluşturun',
    icon: Mic,
    href: '/qr/ses-dosyasi',
    color: 'from-orange-500 to-red-500',
  },
];

export default function Home() {
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
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <div className="px-4 py-8 md:py-12 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
            <div className="relative flex items-center justify-center gap-3 mb-4">
              <QrCode className="w-10 h-10 md:w-12 md:h-14 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                LuxQr
              </h1>
            </div>
          </div>
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-300 mb-4">
            Modern{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              QR Kod Oluşturma
            </span>
          </p>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
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
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Link href={category.href}>
                <div className="card-premium group relative overflow-hidden h-full p-4 md:p-6 min-h-[140px] md:min-h-auto">
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className="relative">
                    <div className={`inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br ${category.color} mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <category.icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                    </div>
                    
                    <h3 className="text-sm md:text-xl font-bold text-white mb-1 md:mb-2 group-hover:text-gradient transition-colors">
                      {category.title}
                    </h3>
                    
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
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16"
        >
          <div className="card-premium p-3 md:p-6 text-center">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-2 md:mb-4 shadow-lg">
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Hızlı ve Kolay</h3>
            <p className="text-gray-400 text-xs md:text-sm">Saniyeler içinde QR kod oluşturun</p>
          </div>
          
          <div className="card-premium p-3 md:p-6 text-center">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-2 md:mb-4 shadow-lg">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Güvenli Depolama</h3>
            <p className="text-gray-400 text-xs md:text-sm">Verileriniz şifreli olarak saklanır</p>
          </div>
          
          <div className="card-premium p-3 md:p-6 text-center col-span-2 md:col-span-1">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 mb-2 md:mb-4 shadow-lg">
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
          transition={{ delay: 0.6 }}
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
          transition={{ delay: 0.6 }}
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
          transition={{ delay: 0.7 }}
          className="card-premium p-4 md:p-8 md:p-12 mb-16"
        >
          <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-8 text-gradient">
            Neden Dinamik QR Kod Tercih Etmelisiniz?
          </h3>
          <div className="space-y-4 md:space-y-8">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm md:text-base">1</span>
              </div>
              <div>
                <h4 className="text-base md:text-xl font-semibold text-white mb-1 md:mb-2">İçerik Güncelleme Esnekliği</h4>
                <p className="text-gray-400 leading-relaxed text-xs md:text-sm">
                  Dinamik QR kodlar, basılı materyalleri değiştirmeden arkasındaki yönlendirme linkini güncellemenize olanak tanır. Bu sayede promosyon kampanyalarınızı, ürün bilgilerinizi veya iletişim detaylarınızı anında güncelleyebilirsiniz. Statik QR kodlarda ise bir kez basıldıktan sonra içeriği değiştirilemez.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm md:text-base">2</span>
              </div>
              <div>
                <h4 className="text-base md:text-xl font-semibold text-white mb-1 md:mb-2">Gelişmiş Veri Analitiği</h4>
                <p className="text-gray-400 leading-relaxed text-xs md:text-sm">
                  LuxQR dinamik QR kodları ile tarama istatistiklerini takip edebilir, coğrafi konum verilerini analiz edebilir ve kullanıcı etkileşimini ölçebilirsiniz. Hangi saatlerde daha fazla tarama yapıldığını, hangi bölgelerden ilgi gördüğünüzü ve kampanyalarınızın performansını detaylı raporlarla inceleyebilirsiniz.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm md:text-base">3</span>
              </div>
              <div>
                <h4 className="text-base md:text-xl font-semibold text-white mb-1 md:mb-2">Tıklama Takibi ve Optimizasyon</h4>
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
          transition={{ delay: 0.8 }}
          className="card-premium p-4 md:p-8 md:p-12 mb-16"
        >
          <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-8 text-gradient">
            3 Kolay Adımda QR Kod Oluşturun
          </h3>
          <div className="space-y-4 md:space-y-8">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-base md:text-xl">1</span>
              </div>
              <div>
                <h4 className="text-base md:text-xl font-semibold text-white mb-1 md:mb-2">Kategori Seçin</h4>
                <p className="text-gray-400 leading-relaxed text-xs md:text-sm">
                  İhtiyacınıza uygun QR kod türünü seçin. WiFi ağ bilgileri için WiFi QR, dijital kartvizit için vCard QR, sosyal medya hesaplarınız için Sosyal Medya QR, ses dosyaları için Ses Dosyası QR veya metin, resim, video ve belgeler için Metin/Resim/Video QR kategorisini tercih edin. Her kategori özel olarak tasarlanmıştır ve maksimum kullanıcı deneyimi sunar.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-base md:text-xl">2</span>
              </div>
              <div>
                <h4 className="text-base md:text-xl font-semibold text-white mb-1 md:mb-2">Bilgilerinizi Girin veya Dosyanızı Yükleyin</h4>
                <p className="text-gray-400 leading-relaxed text-xs md:text-sm">
                  Seçtiğiniz kategoriye göre gerekli bilgileri girin. WiFi için ağ adı ve şifre, kartvizit için iletişim bilgileri, sosyal medya için profil linkleri veya metin/resim/video için içeriklerinizi sağlayın. Dosya yüklemeleri için maksimum 100MB boyutunda dosyalarınızı güvenli bir şekilde yükleyebilirsiniz. Tüm veriler şifreli olarak işlenir.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-base md:text-xl">3</span>
              </div>
              <div>
                <h4 className="text-base md:text-xl font-semibold text-white mb-1 md:mb-2">Özelleştirin ve Yüksek Çözünürlüklü Olarak İndirin</h4>
                <p className="text-gray-400 leading-relaxed text-xs md:text-sm">
                  QR kodunuzu oluşturduktan sonra yüksek çözünürlüklü PNG formatında indirebilir, doğrudan sosyal medyada paylaşabilir veya link olarak kopyalayabilirsiniz. QR kodunuz mobil uyumlu, baskı kalitesinde ve tarama hızı optimize edilmiştir. İsterseniz geçerlilik süresi belirleyerek verilerinizin güvenli bir şekilde saklanmasını sağlayabilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security and Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="card-premium p-4 md:p-8 md:p-12 mb-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className="relative z-10">
            <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-8">
              <div className="flex-shrink-0 p-2 md:p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                <Shield className="w-5 h-5 md:w-8 md:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2 text-gradient">
                  Güvenlik ve Gizlilik Önceliğimiz
                </h3>
                <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
                  LuxQR platformu, kullanıcı verilerinin güvenliğini ve gizliliğini en üst düzeyde korumayı taahhüt eder. Tüm verileriniz endüstri standardı şifreleme protokolleri ile korunur ve güvenli bulut sistemlerinde saklanır. Kişisel bilgilerinizi asla üçüncü taraflarla paylaşmıyoruz ve veri toplama politikamız şeffaftır.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-3 md:gap-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3 md:p-6 hover:border-blue-500/30 transition-colors">
                <h4 className="text-sm md:text-lg font-semibold text-white mb-2 md:mb-3">Şifreli Veri Saklama</h4>
                <p className="text-gray-400 leading-relaxed text-xs md:text-sm">
                  Tüm QR kod verileriniz AES-256 şifreleme ile korunur. Dosyalarınız ve içerikleriniz güvenli bulut depolama sistemlerinde saklanır ve sadece QR kod URL'sini bilen kişiler tarafından erişilebilir.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3 md:p-6 hover:border-purple-500/30 transition-colors">
                <h4 className="text-sm md:text-lg font-semibold text-white mb-2 md:mb-3">Otomatik Veri Temizleme</h4>
                <p className="text-gray-400 leading-relaxed text-xs md:text-sm">
                  Belirlediğiniz geçerlilik süresi dolduğunda verileriniz otomatik olarak sistemden güvenli bir şekilde silinir. Bu sayede verilerinizin kontrolü sizde kalır ve gizliliğiniz korunur.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3 md:p-6 hover:border-cyan-500/30 transition-colors">
                <h4 className="text-sm md:text-lg font-semibold text-white mb-2 md:mb-3">GDPR Uyumluluğu</h4>
                <p className="text-gray-400 leading-relaxed text-xs md:text-sm">
                  Platformumuz Avrupa Birliği Genel Veri Koruma Tüzüğü (GDPR) ile tam uyumludur. Veri işleme politikalarımız şeffaftır ve kullanıcı haklarına saygı duyarız.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3 md:p-6 hover:border-pink-500/30 transition-colors">
                <h4 className="text-sm md:text-lg font-semibold text-white mb-2 md:mb-3">Güvenli Altyapı</h4>
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
          transition={{ delay: 1.0 }}
          className="card-premium p-4 md:p-8 md:p-12 mb-16"
        >
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-8">
            <div className="p-2 md:p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
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
