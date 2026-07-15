'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { QrCode, Type, CreditCard, Wifi, Share2, Mic, ArrowRight, Sparkles, Zap, Shield, HelpCircle, ChevronDown, Landmark, Image as ImageIcon, ShoppingBag, ExternalLink } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

const BlogSlider = dynamic(() => import('@/components/BlogSlider'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
});

const basicQrCategories = [
  { title: 'Metin',             description: 'Metin içeriğinizi QR koda dönüştürün',                              icon: Type,        href: '/qr/metin',         color: 'from-blue-500 to-purple-500',   iconColor: '#6366f1' },
  { title: 'Resim/Video/Belge', description: 'Resim, video ve belge yükleyerek QR kod oluşturun',                 icon: ImageIcon,   href: '/qr/metin-belge',   color: 'from-purple-500 to-pink-500',   iconColor: '#a855f7' },
  { title: 'Ses Dosyası',       description: 'Ses dosyalarınız yükleyerek QR kod oluşturun',                      icon: Mic,         href: '/qr/ses-dosyasi',   color: 'from-green-500 to-emerald-500', iconColor: '#22c55e' },
  { title: 'WiFi',              description: 'WiFi ağ bilgilerinizi QR kod ile kolayca paylaşın',                 icon: Wifi,        href: '/qr/wifi',          color: 'from-pink-500 to-rose-500',     iconColor: '#ec4899' },
  { title: 'IBAN',              description: 'IBAN bilgilerinizi QR kod ile kolayca paylaşın',                    icon: Landmark,    href: '/qr/iban',          color: 'from-blue-500 to-cyan-500',     iconColor: '#3b82f6' },
];

const advancedQrCategories = [
  { title: 'Kartvizit',         description: 'vCard formatında dijital kartvizit oluşturun ve paylaşın',         icon: CreditCard,  href: '/qr/kartvizit',     color: 'from-cyan-500 to-blue-500',     iconColor: '#06b6d4' },
  { title: 'Sosyal Medya',      description: 'Instagram, TikTok ve Link-in-bio sayfalarınız için QR kod',        icon: Share2,      href: '/qr/sosyal-medya',  color: 'from-orange-500 to-red-500',    iconColor: '#f97316' },
  { title: 'Fiyat Listesi',     description: 'Restoran menüsü, hizmet ve ürün fiyat listenizi QR koda dönüştürün', icon: ShoppingBag, href: '/qr/fiyat-listesi', color: 'from-orange-500 to-amber-500',  iconColor: '#f59e0b' },
  { title: 'Bio Link',          description: 'Tüm sosyal medya ve web linklerinizi tek bir sayfada toplayın',    icon: ExternalLink, href: '/qr/bio-link',     color: 'from-emerald-500 to-teal-500',  iconColor: '#10b981' },
];

function HeroCanvas() {
  return (
    <>
      <style>{`
        @keyframes hblob1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(60px,-30px) scale(1.15); }
          66%      { transform: translate(-40px,20px) scale(0.92); }
        }
        @keyframes hblob2 {
          0%,100% { transform: translate(0,0) scale(1); }
          40%      { transform: translate(-80px,40px) scale(1.2); }
          70%      { transform: translate(50px,-20px) scale(0.88); }
        }
        @keyframes hblob3 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(30px,50px) scale(1.1); }
        }
        @keyframes hblob4 {
          0%,100% { transform: translate(0,0) scale(1); }
          45%      { transform: translate(-50px,-40px) scale(1.18); }
          80%      { transform: translate(30px,30px) scale(0.9); }
        }
        @keyframes hblob5 {
          0%,100% { transform: translate(0,0) scale(1); }
          35%      { transform: translate(70px,20px) scale(1.12); }
          65%      { transform: translate(-30px,-50px) scale(0.95); }
        }
        .hblob-1 { width: 240px; height: 160px; filter: blur(20px); }
        .hblob-2 { width: 200px; height: 140px; filter: blur(18px); }
        .hblob-3 { width: 180px; height: 120px; filter: blur(16px); }
        .hblob-4 { width: 170px; height: 120px; filter: blur(16px); }
        .hblob-5 { width: 320px; height: 100px; filter: blur(24px); }
        @media (min-width: 768px) {
          .hblob-1 { width: 420px; height: 260px; filter: blur(32px); }
          .hblob-2 { width: 360px; height: 220px; filter: blur(28px); }
          .hblob-3 { width: 300px; height: 200px; filter: blur(24px); }
          .hblob-4 { width: 280px; height: 190px; filter: blur(26px); }
          .hblob-5 { width: 560px; height: 160px; filter: blur(40px); }
        }
      `}</style>

      {/* blob 1 — vivid blue */}
      <div className="hblob-1" style={{
        position:'absolute', pointerEvents:'none', zIndex:0,
        top:'-80px', left:'5%',
        borderRadius:'50%',
        background:'radial-gradient(ellipse, rgba(59,130,246,0.28) 0%, transparent 70%)',
        animation:'hblob1 9s ease-in-out infinite',
      }}/>
      {/* blob 2 — electric violet */}
      <div className="hblob-2" style={{
        position:'absolute', pointerEvents:'none', zIndex:0,
        top:'-60px', left:'30%',
        borderRadius:'50%',
        background:'radial-gradient(ellipse, rgba(124,58,237,0.22) 0%, transparent 70%)',
        animation:'hblob2 11s ease-in-out infinite',
      }}/>
      {/* blob 3 — cyan */}
      <div className="hblob-3" style={{
        position:'absolute', pointerEvents:'none', zIndex:0,
        top:'-40px', left:'55%',
        borderRadius:'50%',
        background:'radial-gradient(ellipse, rgba(6,182,212,0.20) 0%, transparent 70%)',
        animation:'hblob3 8s ease-in-out infinite',
      }}/>
      {/* blob 4 — hot pink */}
      <div className="hblob-4" style={{
        position:'absolute', pointerEvents:'none', zIndex:0,
        top:'-70px', right:'8%',
        borderRadius:'50%',
        background:'radial-gradient(ellipse, rgba(236,72,153,0.18) 0%, transparent 70%)',
        animation:'hblob4 13s ease-in-out infinite',
      }}/>
      {/* blob 5 — indigo wide base */}
      <div className="hblob-5" style={{
        position:'absolute', pointerEvents:'none', zIndex:0,
        top:'-20px', left:'20%',
        borderRadius:'50%',
        background:'radial-gradient(ellipse, rgba(99,102,241,0.14) 0%, transparent 70%)',
        animation:'hblob5 15s ease-in-out infinite',
      }}/>
    </>
  );
}

export default function HomeContent() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const faqCategories = [
    {
      label: 'Genel',
      icon: HelpCircle,
      from: '#3b82f6', to: '#06b6d4',
      glow: 'rgba(59,130,246,0.30)',
      accent: '#3b82f6',
      items: [
        { question: 'LuxQr nedir?', answer: 'LuxQr, metin, resim, video, kartvizit, WiFi, IBAN, ses dosyası, sosyal medya ve fiyat listesi gibi içerikleri saniyeler içinde QR koda dönüştüren ücretsiz bir platformdur.' },
        { question: 'QR kod ücretsiz mi?', answer: 'Evet, LuxQR platformunda QR kod oluşturma tamamen ücretsizdir. Temel özelliklerin tamamını hiçbir ücret ödemeden kullanabilirsiniz.' },
        { question: 'QR kodu nerede kullanabilirim?', answer: 'QR kodlarınızı kartvizitlerde, broşürlerde, menülerde, sosyal medyada, web sitelerinde ve daha birçok yerde kullanabilirsiniz. Yüksek çözünürlüklü baskı kalitesindedir.' },
      ],
    },
    {
      label: 'Güvenlik & Veri',
      icon: Shield,
      from: '#10b981', to: '#06b6d4',
      glow: 'rgba(16,185,129,0.28)',
      accent: '#10b981',
      items: [
        { question: 'Verilerim güvende mi?', answer: 'Evet, tüm verileriniz AES-256 şifreleme ile korunur ve güvenli bulut sistemlerinde saklanır. Belirlediğiniz geçerlilik süresi dolduğunda verileriniz otomatik olarak silinir.' },
        { question: 'QR kodun geçerlilik süresi nedir?', answer: 'QR kodlarınız için 1 gün, 1 hafta, 1 ay, 3 ay, 6 ay veya 12 ay geçerlilik süresi seçebilirsiniz. Süre dolduğunda verileriniz otomatik olarak güvenli bir şekilde silinir.' },
        { question: 'Kişisel bilgilerimi topluyor musunuz?', answer: 'Hayır. LuxQr; isim, e-posta veya telefon gibi kişisel bilgileri toplamaz. Yalnızca oluşturduğunuz QR içerik verileri güvenli sistemlerde saklanır.' },
      ],
    },
    {
      label: 'Kullanım',
      icon: Zap,
      from: '#f97316', to: '#f59e0b',
      glow: 'rgba(249,115,22,0.28)',
      accent: '#f97316',
      items: [
        { question: 'Hangi dosya türlerini yükleyebilirim?', answer: 'Resim (JPG, PNG, WebP), video (MP4, MOV), ses (MP3, WAV) ve belge (PDF, DOC) dosyalarını yükleyebilirsiniz. Maksimum dosya boyutu içerik türüne göre değişir.' },
        { question: 'Dinamik QR kod nedir?', answer: 'Dinamik QR kodlar, basılı materyalleri değiştirmeden arkasındaki içeriği güncellemenize olanak tanır. LuxQr ile oluşturulan QR kodlar bu esnekliği sunar.' },
        { question: 'Kaç QR kod oluşturabilirim?', answer: 'Sınırsız QR kod oluşturabilirsiniz. Her QR kod bağımsız olarak çalışır ve seçtiğiniz süre boyunca aktif kalır.' },
      ],
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen"
    >
      <div className="px-4 max-w-7xl mx-auto">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative flex flex-col items-center justify-center text-center pt-36 pb-28 md:pt-60 md:pb-52 overflow-visible md:overflow-hidden w-screen left-1/2 -translate-x-1/2">

          {/* RGB wave + micro-star canvas */}
          <HeroCanvas />

          {/* ambient glow blobs */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[320px] rounded-full bg-indigo-400/10 blur-[80px]" />
          <div className="pointer-events-none absolute top-10 left-[10%] w-64 h-64 rounded-full bg-violet-400/8 blur-[60px]" />
          <div className="pointer-events-none absolute top-16 right-[8%] w-52 h-52 rounded-full bg-cyan-400/8 blur-[60px]" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-[11px] font-bold uppercase tracking-[0.14em]"
              style={{
                background: 'rgba(99,102,241,0.07)',
                border: '1px solid rgba(99,102,241,0.18)',
                color: '#6366f1',
              }}>
              <Sparkles className="w-3 h-3" />
              Türkiye&apos;nin Modern QR Platformu
            </div>

            {/* wordmark */}
            <h1
              className="text-7xl md:text-8xl font-black tracking-tight leading-[0.92] select-none mb-6"
              style={{
                background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              LuxQr
            </h1>

            {/* tagline */}
            <p className="text-gray-600 font-medium mb-3 max-w-xl" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
              Saniyeler içinde{' '}
              <span style={{
                background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                profesyonel QR kodlar
              </span>
            </p>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto mb-10 leading-relaxed">
              WiFi, kartvizit, sosyal medya, fiyat listesi ve daha fazlası — ücretsiz, hızlı, güvenli.
            </p>

            {/* stat pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
              {[
                { label: '9+ QR Türü', color: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.20)', text: '#4f46e5' },
                { label: 'Ücretsiz', color: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.22)', text: '#059669' },
                { label: 'AES-256 Şifreleme', color: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.20)', text: '#7c3aed' },
              ].map(s => (
                <span key={s.label} className="px-3.5 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: s.color, border: `1px solid ${s.border}`, color: s.text }}>
                  {s.label}
                </span>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                const target = document.getElementById('kategoriler');
                if (!target) return;
                const start = window.scrollY;
                const end = target.getBoundingClientRect().top + start;
                const duration = 1000;
                let startTime: number | null = null;
                const ease = (t: number) => t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2, 2)/2;
                const step = (now: number) => {
                  if (!startTime) startTime = now;
                  const p = Math.min((now - startTime) / duration, 1);
                  window.scrollTo(0, start + (end - start) * ease(p));
                  if (p < 1) requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
              }}
              className="btn-primary text-sm md:text-base group"
            >
              QR Kod Oluştur
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* divider */}
          <div className="relative z-10 mt-14 md:mt-20 w-full max-w-xs mx-auto h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.25), transparent)' }} />
        </section>

        {/* spacer */}
        <div id="kategoriler" className="pt-2 md:pt-4" />

        {/* QR Category Cards */}
        <div className="mb-16">
          <h2 className="flex items-center justify-center gap-2 text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 text-center">
            <span className="inline-flex p-1.5 md:p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-md shadow-blue-500/20">
              <QrCode className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </span>
            <span className="text-gradient">Temel QR</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 md:mb-12">
            {basicQrCategories.map((category, index) => (
              <motion.div
                key={category.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 * index, duration: 0.2 }}
              >
                <Link href={category.href}>
                  <div className="card-premium group relative overflow-hidden h-full p-4 md:p-6 min-h-[140px] md:min-h-auto">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 md:w-32 md:h-32 pointer-events-none select-none transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" style={{ opacity: 0.22, color: category.iconColor }}>
                      <category.icon className="w-full h-full" strokeWidth={1.2} />
                    </div>
                    <div className="relative">
                      <div className={`inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br ${category.color} mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md md:shadow-lg`}>
                        <category.icon className="w-5 h-5 md:w-7 md:h-7 text-gray-900" />
                      </div>
                      <h2 className="text-sm md:text-xl font-bold text-gray-900 mb-1 md:mb-2 group-hover:text-gradient transition-colors">
                        {category.title}
                      </h2>
                      <p className="text-gray-700 mb-2 md:mb-4 leading-relaxed text-xs md:text-sm">
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

          <h2 className="flex items-center justify-center gap-2 text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 text-center">
            <span className="inline-flex p-1.5 md:p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 ring-2 ring-white/20">
              <QrCode className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </span>
            <span className="text-gradient">Gelişmiş QR</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {advancedQrCategories.map((category, index) => (
              <motion.div
                key={category.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 * index, duration: 0.2 }}
              >
                <Link href={category.href}>
                  <div className="card-premium group relative overflow-hidden h-full p-4 md:p-6 min-h-[140px] md:min-h-auto">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 md:w-32 md:h-32 pointer-events-none select-none transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" style={{ opacity: 0.22, color: category.iconColor }}>
                      <category.icon className="w-full h-full" strokeWidth={1.2} />
                    </div>
                    <div className="relative">
                      <div className={`inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br ${category.color} mb-2 md:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md md:shadow-lg`}>
                        <category.icon className="w-5 h-5 md:w-7 md:h-7 text-gray-900" />
                      </div>
                      <h2 className="text-sm md:text-xl font-bold text-gray-900 mb-1 md:mb-2 group-hover:text-gradient transition-colors">
                        {category.title}
                      </h2>
                      <p className="text-gray-700 mb-2 md:mb-4 leading-relaxed text-xs md:text-sm">
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
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16"
        >
          {[
            { icon: Zap,      title: 'Hızlı ve Kolay',    desc: 'Saniyeler içinde QR kod oluşturun',          from: '#3b82f6', to: '#06b6d4', glow: 'rgba(59,130,246,0.28)',  accent: '#3b82f6', iconColor: '#1d4ed8' },
            { icon: Shield,   title: 'Güvenli Depolama',  desc: 'AES-256 şifreleme ile verileriniz korunur',  from: '#8b5cf6', to: '#ec4899', glow: 'rgba(139,92,246,0.28)', accent: '#8b5cf6', iconColor: '#6d28d9' },
            { icon: Sparkles, title: 'Modern Tasarım',    desc: 'Şık ve kullanıcı dostu arayüz',              from: '#f97316', to: '#f59e0b', glow: 'rgba(249,115,22,0.28)',  accent: '#f97316', iconColor: '#c2410c', colSpan: true },
          ].map(({ icon: Icon, title, desc, from, to, glow, accent, iconColor, colSpan }) => (
            <div key={title} className={`relative overflow-hidden rounded-2xl p-4 md:p-6 flex flex-col items-center text-center${colSpan ? ' col-span-2 md:col-span-1' : ''}`}
              style={{
                background: 'rgba(255,255,255,0.88)',
                border: `1.5px solid ${accent}22`,
                boxShadow: `0 8px 32px ${glow}, 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.95)`,
                backdropFilter: 'blur(12px)',
              }}>
              {/* top shine */}
              <div className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none rounded-t-2xl"
                style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0.5) 0%,transparent 100%)' }} />
              {/* top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{ background: `linear-gradient(90deg,${from},${to})` }} />
              {/* large bg icon */}
              <div className="absolute -bottom-3 -right-3 w-20 h-20 pointer-events-none"
                style={{ opacity: 0.06, color: accent }}>
                <Icon className="w-full h-full" strokeWidth={1} />
              </div>
              {/* icon badge */}
              <div className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-3 md:mb-4 flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg,${from},${to})`,
                  boxShadow: `0 6px 20px ${glow}, inset 0 1px 0 rgba(255,255,255,0.3)`,
                }}>
                <Icon className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow" />
              </div>
              <h3 className="relative z-10 text-sm md:text-base font-bold text-gray-900 mb-1">{title}</h3>
              <p className="relative z-10 text-gray-600 text-xs md:text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
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
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-gradient">
              Hemen Başlayın
            </h2>
            <p className="text-gray-700 text-sm md:text-lg mb-4 md:mb-6 max-w-2xl mx-auto">
              LuxQr ile dijital içeriklerinizi profesyonel QR kodlara dönüştürün. Ücretsiz ve hızlı.
            </p>
            <CtaButton />
          </div>
        </motion.div>

        {/* Blog Slider */}
        <BlogSlider />

        <ExtraContent openFaq={openFaq} setOpenFaq={setOpenFaq} faqCategories={faqCategories} />
      </div>
    </motion.main>
  );
}

function CtaButton() {
  return (
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
              className="btn-primary w-full py-3 md:py-4 rounded-2xl text-white font-semibold text-sm md:text-base flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap"
            >
              İlk QR Kodunuzu Oluşturun
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
    </button>
  );
}

type FaqCategory = { label: string; icon: React.ElementType; from: string; to: string; glow: string; accent: string; items: { question: string; answer: string }[] };
function ExtraContent({ openFaq, setOpenFaq, faqCategories }: { openFaq: string | null; setOpenFaq: (v: string | null) => void; faqCategories: FaqCategory[] }) {
  return (
    <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.2 }}
          className="card-premium p-4 md:p-8 md:p-12 mb-16"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gradient">
            LuxQR ile Profesyonel ve Dinamik QR Kod Yönetimi
          </h2>
          <div className="space-y-4 md:space-y-6 text-gray-600 leading-relaxed text-sm md:text-lg">
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
          <h2 className="text-lg md:text-2xl lg:text-3xl font-bold mb-4 md:mb-8 text-gradient">
            Neden Dinamik QR Kod Tercih Etmelisiniz?
          </h2>
          <div className="space-y-4 md:space-y-8">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md md:shadow-lg">
                <span className="text-gray-900 font-bold text-sm md:text-base">1</span>
              </div>
              <div>
                <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">İçerik Güncelleme Esnekliği</h3>
                <p className="text-gray-700 leading-relaxed text-xs md:text-sm">
                  Dinamik QR kodlar, basılı materyalleri değiştirmeden arkasındaki yönlendirme linkini güncellemenize olanak tanır. Bu sayede promosyon kampanyalarınızı, ürün bilgilerinizi veya iletişim detaylarınızı anında güncelleyebilirsiniz. Statik QR kodlarda ise bir kez basıldıktan sonra içeriği değiştirilemez.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md md:shadow-lg">
                <span className="text-gray-900 font-bold text-sm md:text-base">2</span>
              </div>
              <div>
                <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Gelişmiş Veri Analitiği</h3>
                <p className="text-gray-700 leading-relaxed text-xs md:text-sm">
                  LuxQR dinamik QR kodları ile tarama istatistiklerini takip edebilir, coğrafi konum verilerini analiz edebilir ve kullanıcı etkileşimini ölçebilirsiniz. Hangi saatlerde daha fazla tarama yapıldığını, hangi bölgelerden ilgi gördüğünüzü ve kampanyalarınızın performansını detaylı raporlarla inceleyebilirsiniz.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-md md:shadow-lg">
                <span className="text-gray-900 font-bold text-sm md:text-base">3</span>
              </div>
              <div>
                <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Tıklama Takibi ve Optimizasyon</h3>
                <p className="text-gray-700 leading-relaxed text-xs md:text-sm">
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
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              3 Adımda QR Kodunuz Hazır
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-px bg-gradient-to-r from-orange-500/40 via-amber-500/60 to-orange-500/40 z-0" />

            {/* Step 1 */}
            <div className="relative z-10 card-premium p-3 md:p-7 flex flex-col items-center text-center group hover:border-orange-500/40 transition-all">
              <div className="relative mb-5">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-xl shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h8" /></svg>
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-white border-2 border-orange-500 rounded-xl flex items-center justify-center shadow-sm">
                  <span className="text-orange-400 font-black text-sm">1</span>
                </div>
              </div>
              <h3 className="text-gray-900 font-bold text-base md:text-lg mb-2">Tür Seçin</h3>
              <p className="text-gray-700 text-xs md:text-sm leading-relaxed">İhtiyacınıza uygun QR türünü seçin.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                {['WiFi', 'vCard', 'Sosyal Medya', 'Fiyat Listesi', 'Bio Link'].map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-gray-100 border border-gray-200 text-gray-600 text-[10px] font-medium">{t}</span>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 card-premium p-3 md:p-7 flex flex-col items-center text-center group hover:border-amber-500/40 transition-all">
              <div className="relative mb-5">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center shadow-xl shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-all">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-white border-2 border-amber-500 rounded-xl flex items-center justify-center shadow-sm">
                  <span className="text-amber-400 font-black text-sm">2</span>
                </div>
              </div>
              <h3 className="text-gray-900 font-bold text-base md:text-lg mb-2">Bilgileri Girin</h3>
              <p className="text-gray-700 text-xs md:text-sm leading-relaxed">Formları doldurun veya dosyanızı yükleyin.</p>
              <div className="mt-4 w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-gray-400 text-[10px]">Ağ Adı</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full w-3/4 mb-2" />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-gray-400 text-[10px]">Şifre</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full w-1/2 mt-2" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 card-premium p-3 md:p-7 flex flex-col items-center text-center group hover:border-emerald-500/40 transition-all col-span-2 md:col-span-1">
              <div className="relative mb-5">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-xl shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.243m-4.243 0a1 1 0 00-1 1M9 17h2m2 0h2M3 21l1.5-1.5M21 21l-1.5-1.5M3 3l1.5 1.5M21 3l-1.5 1.5" /></svg>
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-white border-2 border-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
                  <span className="text-emerald-400 font-black text-sm">3</span>
                </div>
              </div>
              <h3 className="text-gray-900 font-bold text-base md:text-lg mb-2">QR Kodunuzu Alın</h3>
              <p className="text-gray-700 text-xs md:text-sm leading-relaxed">QR kodunuzu saniyeler içinde indirin ve paylaşın.</p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </div>
                  <span className="text-gray-600 text-[9px]">İndir</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                  </div>
                  <span className="text-gray-600 text-[9px]">Paylaş</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </div>
                  <span className="text-gray-600 text-[9px]">Kopyala</span>
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
                <Shield className="w-5 h-5 md:w-8 md:h-8 text-gray-900" />
              </div>
              <div>
                <h2 className="text-lg md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2 text-gradient">
                  Güvenlik ve Gizlilik Önceliğimiz
                </h2>
                <p className="text-gray-600 text-sm md:text-lg leading-relaxed">
                  LuxQR platformu, kullanıcı verilerinin güvenliğini ve gizliliğini en üst düzeyde korumayı taahhüt eder. Tüm verileriniz endüstri standardı şifreleme protokolleri ile korunur ve güvenli bulut sistemlerinde saklanır. Kişisel bilgilerinizi asla üçüncü taraflarla paylaşmıyoruz ve veri toplama politikamız şeffaftır.
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-3 md:gap-6">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3 md:p-6 hover:border-blue-500/30 transition-colors">
                <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-2 md:mb-3">Şifreli Veri Saklama</h3>
                <p className="text-gray-700 leading-relaxed text-xs md:text-sm">
                  Tüm QR kod verileriniz AES-256 şifreleme ile korunur. Dosyalarınız ve içerikleriniz güvenli bulut depolama sistemlerinde saklanır ve sadece QR kod URL'sini bilen kişiler tarafından erişilebilir.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3 md:p-6 hover:border-purple-500/30 transition-colors">
                <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-2 md:mb-3">Otomatik Veri Temizleme</h3>
                <p className="text-gray-700 leading-relaxed text-xs md:text-sm">
                  Belirlediğiniz geçerlilik süresi dolduğunda verileriniz otomatik olarak sistemden güvenli bir şekilde silinir. Bu sayede verilerinizin kontrolü sizde kalır ve gizliliğiniz korunur.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3 md:p-6 hover:border-cyan-500/30 transition-colors">
                <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-2 md:mb-3">GDPR Uyumluluğu</h3>
                <p className="text-gray-700 leading-relaxed text-xs md:text-sm">
                  Platformumuz Avrupa Birliği Genel Veri Koruma Tüzüğü (GDPR) ile tam uyumludur. Veri işleme politikalarımız şeffaftır ve kullanıcı haklarına saygı duyarız.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3 md:p-6 hover:border-pink-500/30 transition-colors">
                <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-2 md:mb-3">Güvenli Altyapı</h3>
                <p className="text-gray-700 leading-relaxed text-xs md:text-sm">
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
          className="mb-16"
        >
          {/* Section header */}
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#3b82f6,#06b6d4)', boxShadow: '0 6px 20px rgba(59,130,246,0.35), inset 0 1px 0 rgba(255,255,255,0.3)' }}>
              <HelpCircle className="w-5 h-5 text-white drop-shadow" />
            </div>
            <h2 className="text-lg md:text-3xl lg:text-4xl font-bold text-gradient">Sıkça Sorulan Sorular</h2>
          </div>

          <div className="space-y-6">
            {faqCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.label}>
                  {/* 3D category header */}
                  <div className="relative overflow-hidden flex items-center gap-3 px-4 py-3 rounded-2xl mb-3"
                    style={{
                      background: 'rgba(255,255,255,0.85)',
                      border: `1.5px solid ${cat.accent}28`,
                      boxShadow: `0 6px 20px ${cat.glow}, inset 0 1px 0 rgba(255,255,255,0.9)`,
                      backdropFilter: 'blur(10px)',
                    }}>
                    {/* top accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                      style={{ background: `linear-gradient(90deg,${cat.from},${cat.to})` }} />
                    {/* top shine */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl pointer-events-none"
                      style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0.4) 0%,transparent 100%)' }} />
                    <div className="relative z-10 w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow"
                      style={{ background: `linear-gradient(135deg,${cat.from},${cat.to})`, boxShadow: `0 4px 12px ${cat.glow}` }}>
                      <Icon className="w-4 h-4 text-white drop-shadow" />
                    </div>
                    <span className="relative z-10 text-sm md:text-base font-bold text-gray-900 tracking-wide">{cat.label}</span>
                    <div className="relative z-10 ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold"
                      style={{ background: `${cat.accent}15`, color: cat.accent }}>
                      {cat.items.length} soru
                    </div>
                  </div>

                  {/* Questions */}
                  <div className="space-y-2 pl-1">
                    {cat.items.map((faq, index) => {
                      const key = `${cat.label}-${index}`;
                      const isOpen = openFaq === `${cat.label}-${index}`;
                      return (
                        <div key={key} className="card-premium overflow-hidden">
                          <button
                            onClick={() => setOpenFaq(isOpen ? null : `${cat.label}-${index}`)}
                            className="w-full flex items-center justify-between px-4 md:px-5 py-3 md:py-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-sm md:text-base font-semibold text-gray-900 flex-1 pr-3">{faq.question}</span>
                            <ChevronDown
                              className="w-4 h-4 flex-shrink-0 transition-transform duration-300"
                              style={{ color: cat.accent, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                            />
                          </button>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="px-4 md:px-5 pb-4"
                            >
                              <div className="h-px mb-3" style={{ background: `linear-gradient(90deg,${cat.from}33,transparent)` }} />
                              <p className="text-gray-700 leading-relaxed text-xs md:text-sm">{faq.answer}</p>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <Link href="/faq" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors font-semibold text-sm md:text-base">
              Tüm Soruları Gör
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </div>
        </motion.div>
    </>
  );
}

