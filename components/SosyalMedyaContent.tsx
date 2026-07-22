'use client';

import { motion } from 'framer-motion';
import { Share2, Instagram, Facebook, Youtube, Clock, Shield, Zap, Video, FileText, Music, QrCode, Timer, AlarmClock, CalendarDays, CalendarRange, X as XIcon, Linkedin, MessageCircle, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/components/Notification';
import { SOCIAL_PLATFORM_SEO, type SocialPlatform } from '@/lib/socialPlatformSeo';

interface SosyalMedyaContentProps {
  initialPlatform?: SocialPlatform;
}

export default function SosyalMedyaContent({ initialPlatform }: SosyalMedyaContentProps) {
  const router = useRouter();
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>(initialPlatform || 'instagram');
  const activeSeo = SOCIAL_PLATFORM_SEO.find((p) => p.id === selectedPlatform);
  const isDedicated = !!initialPlatform;
  const [url, setUrl] = useState('');
  const [note, setNote] = useState('');
  const [expiration, setExpiration] = useState<'1day' | '1week' | '1month' | '3months' | '6months' | '12months'>('1day');
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState(false);

  const validateSocialMediaUrl = (platform: string, url: string): boolean => {
    const urlLower = url.toLowerCase();
    
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.replace(/^www\./, '');
      const hasPath = urlObj.pathname.length > 1;
      
      switch (platform) {
        case 'instagram':
          return urlLower.includes('instagram.com') && hasPath;
        case 'tiktok':
          return urlLower.includes('tiktok.com') && hasPath;
        case 'facebook':
          return urlLower.includes('facebook.com') && hasPath;
        case 'youtube':
          return urlLower.includes('youtube.com') && hasPath;
        case 'twitter':
          return (hostname.includes('twitter.com') || hostname.includes('x.com')) && hasPath;
        case 'linkedin':
          return hostname.includes('linkedin.com') && hasPath;
        case 'whatsapp':
          return hostname.includes('wa.me') || hostname.includes('whatsapp.com');
        case 'pinterest':
          return hostname.includes('pinterest.com') && hasPath;
        default:
          return false;
      }
    } catch {
      return false;
    }
  };

  const handlePlatformChange = (platform: SocialPlatform) => {
    setSelectedPlatform(platform);
    setUrl('');
    setNote('');
    setValidationError(false);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setValidationError(false);
  };

  const handleGenerate = async () => {
    if (!url.trim()) {
      showNotification('Lütfen URL girin', 'error');
      setValidationError(true);
      return;
    }

    if (!validateSocialMediaUrl(selectedPlatform, url)) {
      showNotification(`Lütfen geçerli bir ${selectedPlatform} kullanıcı profil URL'si girin`, 'error');
      setValidationError(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: url,
          contentType: 'text',
          expiration,
          note,
        }),
      });

      const data = await response.json();
      if (data.success) {
        router.push(`/qr/${data.id}`);
      }
    } catch (error) {
      console.error('QR oluşturma hatası:', error);
      showNotification('QR kod oluşturulurken bir hata oluştu', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-4 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <motion.div
            whileHover={{ y: -4, rotateX: 3, rotateY: -3 }}
            style={{
              transformStyle: 'preserve-3d',
              perspective: '800px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(252,231,243,0.8) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(236,72,153,0.25)',
              boxShadow: '0 8px 32px rgba(236,72,153,0.15), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
            }}
            className="relative rounded-3xl overflow-hidden p-6 md:p-8 max-w-2xl mx-auto"
          >
            <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-3xl pointer-events-none"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)' }} />
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)' }} />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-5 md:gap-8">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center rotate-3 hover:-rotate-3 transition-transform duration-300"
                    style={{ background: 'linear-gradient(135deg, #ec4899, #e11d48)', boxShadow: '0 8px 24px rgba(236,72,153,0.45)' }}>
                    <Share2 className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-xl flex items-center justify-center shadow-lg -rotate-12"
                    style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)', boxShadow: '0 4px 12px rgba(249,115,22,0.4)' }}>
                    <QrCode className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">
                  {isDedicated ? activeSeo?.label : 'Sosyal Medya'} <span className="bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">QR Kodu</span>
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                  {isDedicated && activeSeo ? activeSeo.description : 'Instagram, TikTok, Facebook, YouTube, LinkedIn, WhatsApp ve daha fazlası için QR kod oluşturun'}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Platform Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mb-6 md:mb-8"
        >
          {[
            {
              id: 'instagram',
              label: 'Instagram',
              desc: 'Instagram hesabınız için QR kod',
              icon: Instagram,
              gradient: 'linear-gradient(135deg, #ec4899, #e11d48)',
              glow: 'rgba(236,72,153,0.45)',
              activeBg: 'linear-gradient(135deg, rgba(236,72,153,0.12) 0%, rgba(225,29,72,0.12) 100%)',
              activeBorder: 'rgba(236,72,153,0.5)',
              activeGlow: 'rgba(236,72,153,0.25)',
              badge: 'Reels · Story',
              badgeColor: 'bg-pink-100 text-pink-700',
            },
            {
              id: 'tiktok',
              label: 'TikTok',
              desc: 'TikTok hesabınız için QR kod',
              icon: Music,
              gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
              glow: 'rgba(6,182,212,0.45)',
              activeBg: 'linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(59,130,246,0.12) 100%)',
              activeBorder: 'rgba(6,182,212,0.5)',
              activeGlow: 'rgba(6,182,212,0.25)',
              badge: 'Video',
              badgeColor: 'bg-cyan-100 text-cyan-700',
            },
            {
              id: 'facebook',
              label: 'Facebook',
              desc: 'Facebook hesabınız için QR kod',
              icon: Facebook,
              gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              glow: 'rgba(59,130,246,0.45)',
              activeBg: 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(37,99,235,0.12) 100%)',
              activeBorder: 'rgba(59,130,246,0.5)',
              activeGlow: 'rgba(59,130,246,0.25)',
              badge: 'Sayfa · Profil',
              badgeColor: 'bg-blue-100 text-blue-700',
            },
            {
              id: 'youtube',
              label: 'YouTube',
              desc: 'YouTube kanalınız için QR kod',
              icon: Youtube,
              gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
              glow: 'rgba(239,68,68,0.45)',
              activeBg: 'linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(220,38,38,0.12) 100%)',
              activeBorder: 'rgba(239,68,68,0.5)',
              activeGlow: 'rgba(239,68,68,0.25)',
              badge: 'Kanal',
              badgeColor: 'bg-red-100 text-red-700',
            },
            {
              id: 'twitter',
              label: 'X / Twitter',
              desc: 'X / Twitter profiliniz için QR kod',
              icon: XIcon,
              gradient: 'linear-gradient(135deg, #111827, #374151)',
              glow: 'rgba(17,24,39,0.45)',
              activeBg: 'linear-gradient(135deg, rgba(17,24,39,0.12) 0%, rgba(55,65,81,0.12) 100%)',
              activeBorder: 'rgba(17,24,39,0.5)',
              activeGlow: 'rgba(17,24,39,0.25)',
              badge: 'Gönderi · Profil',
              badgeColor: 'bg-gray-200 text-gray-800',
            },
            {
              id: 'linkedin',
              label: 'LinkedIn',
              desc: 'LinkedIn profiliniz için QR kod',
              icon: Linkedin,
              gradient: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
              glow: 'rgba(14,165,233,0.45)',
              activeBg: 'linear-gradient(135deg, rgba(14,165,233,0.12) 0%, rgba(2,132,199,0.12) 100%)',
              activeBorder: 'rgba(14,165,233,0.5)',
              activeGlow: 'rgba(14,165,233,0.25)',
              badge: 'Profil · İş',
              badgeColor: 'bg-sky-100 text-sky-700',
            },
            {
              id: 'whatsapp',
              label: 'WhatsApp',
              desc: 'WhatsApp iletişim QR kodu',
              icon: MessageCircle,
              gradient: 'linear-gradient(135deg, #22c55e, #16a34a)',
              glow: 'rgba(34,197,94,0.45)',
              activeBg: 'linear-gradient(135deg, rgba(34,197,94,0.12) 0%, rgba(22,163,74,0.12) 100%)',
              activeBorder: 'rgba(34,197,94,0.5)',
              activeGlow: 'rgba(34,197,94,0.25)',
              badge: 'wa.me',
              badgeColor: 'bg-green-100 text-green-700',
            },
            {
              id: 'pinterest',
              label: 'Pinterest',
              desc: 'Pinterest profiliniz için QR kod',
              icon: MapPin,
              gradient: 'linear-gradient(135deg, #ef4444, #b91c1c)',
              glow: 'rgba(239,68,68,0.45)',
              activeBg: 'linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(185,28,28,0.12) 100%)',
              activeBorder: 'rgba(239,68,68,0.5)',
              activeGlow: 'rgba(239,68,68,0.25)',
              badge: 'Pin · Pano',
              badgeColor: 'bg-red-100 text-red-700',
            },
          ].map(({ id, label, desc, icon: Icon, gradient, glow, activeBg, activeBorder, activeGlow, badge, badgeColor }) => {
            const isActive = selectedPlatform === id;
            return (
              <motion.div
                key={id}
                onClick={() => !loading && handlePlatformChange(id as SocialPlatform)}
                whileHover={loading ? {} : { y: -4, scale: 1.03 }}
                whileTap={loading ? {} : { scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className={`relative rounded-2xl overflow-hidden p-4 md:p-5 ${loading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                style={{
                  background: isActive ? activeBg : 'rgba(255,255,255,0.85)',
                  border: `1.5px solid ${isActive ? activeBorder : 'rgba(209,213,219,0.8)'}`,
                  boxShadow: isActive
                    ? `0 8px 32px ${activeGlow}, 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)`
                    : '0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Top shine */}
                <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, transparent 100%)' }} />

                {/* Active indicator bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                    style={{ background: gradient }} />
                )}

                <div className="relative z-10 flex flex-col items-center text-center gap-2 md:gap-3">
                  {/* Icon box */}
                  <div
                    className="w-10 h-10 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300"
                    style={{
                      background: gradient,
                      boxShadow: isActive ? `0 6px 20px ${glow}` : `0 4px 12px ${glow.replace('0.45', '0.25')}`,
                      transform: isActive ? 'rotate(3deg) scale(1.08)' : 'rotate(0deg) scale(1)',
                    }}
                  >
                    <Icon className="w-5 h-5 md:w-8 md:h-8 text-white drop-shadow" />
                  </div>

                  <div>
                    <h3 className={`text-sm md:text-base font-bold mb-0.5 ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>{label}</h3>
                    <p className="text-gray-500 text-[10px] md:text-xs leading-snug hidden md:block">{desc}</p>
                  </div>

                  <span className={`text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>{badge}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-premium p-4 md:p-8 md:p-12 mb-6 md:mb-8"
        >
          <div>
            <label className="flex items-center gap-2 text-gray-900 font-semibold mb-1 md:mb-2">
              {selectedPlatform === 'instagram' && <Instagram className="w-4 h-4 md:w-5 md:h-5 text-pink-400" />}
              {selectedPlatform === 'tiktok' && <Music className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />}
              {selectedPlatform === 'facebook' && <Facebook className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />}
              {selectedPlatform === 'youtube' && <Youtube className="w-4 h-4 md:w-5 md:h-5 text-red-400" />}
              {selectedPlatform === 'twitter' && <XIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />}
              {selectedPlatform === 'linkedin' && <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-sky-500" />}
              {selectedPlatform === 'whatsapp' && <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500" />}
              {selectedPlatform === 'pinterest' && <MapPin className="w-4 h-4 md:w-5 md:h-5 text-red-500" />}
              {selectedPlatform === 'instagram' && 'Instagram URL'}
              {selectedPlatform === 'tiktok' && 'TikTok URL'}
              {selectedPlatform === 'facebook' && 'Facebook URL'}
              {selectedPlatform === 'youtube' && 'YouTube URL'}
              {selectedPlatform === 'twitter' && 'X / Twitter URL'}
              {selectedPlatform === 'linkedin' && 'LinkedIn URL'}
              {selectedPlatform === 'whatsapp' && 'WhatsApp URL'}
              {selectedPlatform === 'pinterest' && 'Pinterest URL'}
            </label>
            <input
              type="url"
              value={url}
              onChange={handleUrlChange}
              disabled={loading}
              placeholder={
                selectedPlatform === 'instagram'
                  ? 'https://instagram.com/kullaniciadi'
                  : selectedPlatform === 'tiktok'
                  ? 'https://tiktok.com/@kullaniciadi'
                  : selectedPlatform === 'facebook'
                  ? 'https://facebook.com/kullaniciadi'
                  : selectedPlatform === 'youtube'
                  ? 'https://youtube.com/@kanaladi'
                  : selectedPlatform === 'twitter'
                  ? 'https://x.com/kullaniciadi'
                  : selectedPlatform === 'linkedin'
                  ? 'https://linkedin.com/in/kullaniciadi'
                  : selectedPlatform === 'whatsapp'
                  ? 'https://wa.me/905551234567'
                  : 'https://pinterest.com/kullaniciadi'
              }
              className={`w-full bg-white/80 border rounded-xl p-3 md:p-4 text-gray-900 placeholder-gray-400 focus:outline-none text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed ${
                validationError ? 'border-red-500' : 'border-gray-200 focus:border-blue-500/50'
              }`}
            />
            {validationError && (
              <p className="text-red-400 text-xs mt-1">Lütfen geçerli bir URL girin</p>
            )}
          </div>

          {/* Note/Description Field */}
          <div className="mt-4 md:mt-6">
            <label className="flex items-center gap-2 text-gray-900 font-semibold mb-2 md:mb-3">
              <FileText className="w-4 h-4 md:w-5 md:h-5 text-violet-400" />
              Not / Açıklama
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={loading}
              placeholder="QR sosyal medya profili hakkında açıklama veya not ekleyin... (opsiyonel)"
              className="w-full h-20 md:h-24 bg-white/80 border border-gray-200 rounded-xl p-3 md:p-4 text-gray-900 placeholder-gray-400 focus:border-blue-500/50 focus:outline-none resize-none text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Expiration Selection */}
          <div className="mt-4 md:mt-6">
            <label className="flex items-center gap-2 text-gray-900 font-semibold mb-2 md:mb-3">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
              Geçerlilik Süresi
            </label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
              {[
                { value: '1day', label: '1 Gün', icon: Timer, color: 'text-cyan-400', activeColor: 'border-cyan-500/50 bg-cyan-500/10' },
                { value: '1week', label: '1 Hafta', icon: AlarmClock, color: 'text-blue-400', activeColor: 'border-blue-500/50 bg-blue-500/10' },
                { value: '1month', label: '1 Ay', icon: CalendarDays, color: 'text-purple-400', activeColor: 'border-purple-500/50 bg-purple-500/10' },
                { value: '3months', label: '3 Ay', icon: CalendarRange, color: 'text-orange-400', activeColor: 'border-orange-500/50 bg-orange-500/10' },
                { value: '6months', label: '6 Ay', icon: CalendarRange, color: 'text-rose-400', activeColor: 'border-rose-500/50 bg-rose-500/10' },
                { value: '12months', label: '12 Ay', icon: CalendarRange, color: 'text-amber-400', activeColor: 'border-amber-500/50 bg-amber-500/10' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setExpiration(option.value as any)}
                  disabled={loading}
                  className={`flex flex-col items-center gap-1 md:gap-2 p-2 md:p-4 rounded-xl border transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    expiration === option.value ? option.activeColor : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <option.icon className={`w-4 h-4 md:w-5 md:h-5 ${expiration === option.value ? option.color : 'text-gray-500'}`} />
                  <span className={`text-xs md:text-sm font-medium ${expiration === option.value ? option.color : ''}`}>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-4 md:mt-6">
            <button
              onClick={handleGenerate}
              disabled={loading || !url.trim()}
              className="btn-primary w-full py-3 md:py-4 rounded-2xl text-white font-semibold disabled:opacity-50 text-sm md:text-base"
            >
              {loading ? 'Oluşturuluyor...' : 'QR Kod Oluştur'}
            </button>
          </div>
        </motion.div>

        {/* Informative Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8"
        >
          <div className="card-premium p-3 md:p-6">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-2 md:mb-4 shadow-lg">
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Hızlı Erişim</h3>
            <p className="text-gray-600 text-xs md:text-sm hidden md:block">
              Takipçileriniz tek tıkla hesabınıza ulaşsın.
            </p>
          </div>

          <div className="card-premium p-3 md:p-6">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-2 md:mb-4 shadow-lg">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Güvenli</h3>
            <p className="text-gray-600 text-xs md:text-sm hidden md:block">
              Doğrudan ve güvenli yönlendirme.
            </p>
          </div>

          <div className="card-premium p-3 md:p-6 col-span-2 md:col-span-1">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 mb-2 md:mb-4 shadow-lg">
              <Share2 className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Çoklu Platform</h3>
            <p className="text-gray-600 text-xs md:text-sm hidden md:block">
              Instagram, TikTok ve Link-in-bio desteği.
            </p>
          </div>
        </motion.div>

        {/* Additional Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8"
        >
          <div className="card-premium p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3 text-gradient">Link-in-Bio Nedir?</h3>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              Link-in-bio, Instagram, TikTok ve X (Twitter) hesaplarınızı tek ekranda sunan çözümlerdir. 
              QR kod ile birleştirildiğinde, marka değerinizi ve etkileşiminizi maksimuma çıkarabilirsiniz.
            </p>
          </div>

          <div className="card-premium p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3 text-gradient">Sosyal Medya Pazarlaması</h3>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              QR kodlar ile fiziksel pazarlama malzemelerinizi dijital dünyaya bağlayın. 
              Kartvizitler, broşürler ve etkinliklerde takipçi kazanımını artırın.
            </p>
          </div>
        </motion.div>

        {/* SEO Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-premium p-4 md:p-8 md:p-12"
        >
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 text-gradient">Link-in-Bio Çözümlerinin Marka Değerine Etkisi</h2>
          <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
            Instagram, TikTok ve X (Twitter) hesaplarınızı tek ekranda sunan Link-in-bio çözümleri, modern dijital pazarlamanın en önemli araçlarından biri haline geldi.
            QR kod ile birleştirildiğinde, marka değerinizi ve etkileşiminizi maksimuma çıkarabilirsiniz.
          </p>

          <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Marka Değerine Katkıları</h3>
          <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
            Link-in-bio QR kodları ile:
          </p>
          <ul className="text-gray-600 space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Tüm sosyal medya hesaplarınızı tek noktada toplayın</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Takipçi kazanımını artırın</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Profesyonel ve kurumsal görünüm kazanın</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Etkileşim oranlarını optimize edin</span>
            </li>
          </ul>

          <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Nasıl Kullanılır?</h3>
          <ul className="text-gray-600 space-y-2 md:space-y-2 mb-4 md:mb-6 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Platform seçin (Instagram, TikTok veya Link-in-bio)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Hesap URL'nizi girin</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>QR kod oluşturun</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>QR kodu kartvizitinize, pazarlama malzemenize ekleyin</span>
            </li>
          </ul>

          <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Avantajları</h3>
          <ul className="text-gray-600 space-y-2 md:space-y-2 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Tek tıkla takipçi kazanımı</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Çoklu platform yönetimi</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Analitik takibi</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Marka bilinirliği artışı</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}
