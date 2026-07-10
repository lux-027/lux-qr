'use client';

import { motion } from 'framer-motion';
import { Share2, Instagram, Facebook, Youtube, Clock, Shield, Zap, Video, FileText, Music, QrCode, Timer, AlarmClock, CalendarDays, CalendarRange } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/components/Notification';

export default function SosyalMedyaContent() {
  const router = useRouter();
  const [selectedPlatform, setSelectedPlatform] = useState<'instagram' | 'tiktok' | 'facebook' | 'youtube'>('instagram');
  const [url, setUrl] = useState('');
  const [note, setNote] = useState('');
  const [expiration, setExpiration] = useState<'1day' | '1week' | '1month' | '3months'>('1day');
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState(false);

  const validateSocialMediaUrl = (platform: string, url: string): boolean => {
    const urlLower = url.toLowerCase();
    
    try {
      const urlObj = new URL(url);
      
      switch (platform) {
        case 'instagram':
          return urlLower.includes('instagram.com') && urlObj.pathname.length > 1;
        case 'tiktok':
          return urlLower.includes('tiktok.com') && urlObj.pathname.length > 1;
        case 'facebook':
          return urlLower.includes('facebook.com') && urlObj.pathname.length > 1;
        case 'youtube':
          return urlLower.includes('youtube.com') && urlObj.pathname.length > 1;
        default:
          return false;
      }
    } catch {
      return false;
    }
  };

  const handlePlatformChange = (platform: 'instagram' | 'tiktok' | 'facebook' | 'youtube') => {
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
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-pink-500/20 blur-3xl rounded-full" />
            <div className="relative flex items-center justify-center gap-3 mb-4">
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-pink-500/40 rotate-3 hover:-rotate-3 transition-transform duration-300">
                  <Share2 className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg -rotate-12">
                  <QrCode className="w-4 h-4 text-white" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">LuxQr</h1>
            </div>
          </div>
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-300 mb-4">
            Modern <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">QR Kod Oluşturma</span>
          </p>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Instagram, TikTok, Facebook ve YouTube sayfalarınız için QR kod oluşturun
          </p>
        </motion.div>

        {/* Platform Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8"
        >
          <div
            onClick={() => handlePlatformChange('instagram')}
            className={`card-premium p-3 md:p-6 cursor-pointer transition-all ${
              selectedPlatform === 'instagram'
                ? 'border-blue-500/50'
                : 'hover:border-blue-500/50'
            }`}
          >
            <Instagram className="w-8 h-8 md:w-12 md:h-12 text-pink-400 mb-2 md:mb-4" />
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Instagram</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">Instagram hesabınız için QR kod</p>
          </div>

          <div
            onClick={() => handlePlatformChange('tiktok')}
            className={`card-premium p-3 md:p-6 cursor-pointer transition-all ${
              selectedPlatform === 'tiktok'
                ? 'border-blue-500/50'
                : 'hover:border-blue-500/50'
            }`}
          >
            <Music className="w-8 h-8 md:w-12 md:h-12 text-cyan-400 mb-2 md:mb-4" />
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">TikTok</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">TikTok hesabınız için QR kod</p>
          </div>

          <div
            onClick={() => handlePlatformChange('facebook')}
            className={`card-premium p-3 md:p-6 cursor-pointer transition-all ${
              selectedPlatform === 'facebook'
                ? 'border-blue-500/50'
                : 'hover:border-blue-500/50'
            }`}
          >
            <Facebook className="w-8 h-8 md:w-12 md:h-12 text-blue-500 mb-2 md:mb-4" />
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Facebook</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">Facebook hesabınız için QR kod</p>
          </div>

          <div
            onClick={() => handlePlatformChange('youtube')}
            className={`card-premium p-3 md:p-6 cursor-pointer transition-all ${
              selectedPlatform === 'youtube'
                ? 'border-blue-500/50'
                : 'hover:border-blue-500/50'
            }`}
          >
            <Youtube className="w-8 h-8 md:w-12 md:h-12 text-red-400 mb-2 md:mb-4" />
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">YouTube</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">YouTube kanalınız için QR kod</p>
          </div>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-premium p-4 md:p-8 md:p-12 mb-6 md:mb-8"
        >
          <div>
            <label className="flex items-center gap-2 text-white font-semibold mb-1 md:mb-2">
              {selectedPlatform === 'instagram' && <Instagram className="w-4 h-4 md:w-5 md:h-5 text-pink-400" />}
              {selectedPlatform === 'tiktok' && <Music className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />}
              {selectedPlatform === 'facebook' && <Facebook className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />}
              {selectedPlatform === 'youtube' && <Youtube className="w-4 h-4 md:w-5 md:h-5 text-red-400" />}
              {selectedPlatform === 'instagram' && 'Instagram URL'}
              {selectedPlatform === 'tiktok' && 'TikTok URL'}
              {selectedPlatform === 'facebook' && 'Facebook URL'}
              {selectedPlatform === 'youtube' && 'YouTube URL'}
            </label>
            <input
              type="url"
              value={url}
              onChange={handleUrlChange}
              placeholder={
                selectedPlatform === 'instagram'
                  ? 'https://instagram.com/kullaniciadi'
                  : selectedPlatform === 'tiktok'
                  ? 'https://tiktok.com/@kullaniciadi'
                  : selectedPlatform === 'facebook'
                  ? 'https://facebook.com/kullaniciadi'
                  : 'https://youtube.com/@kanaladi'
              }
              className={`w-full bg-slate-800/50 border rounded-xl p-3 md:p-4 text-white placeholder-gray-500 focus:outline-none text-sm md:text-base ${
                validationError ? 'border-red-500' : 'border-white/10 focus:border-blue-500/50'
              }`}
            />
            {validationError && (
              <p className="text-red-400 text-xs mt-1">Lütfen geçerli bir URL girin</p>
            )}
          </div>

          {/* Note/Description Field */}
          <div className="mt-4 md:mt-6">
            <label className="flex items-center gap-2 text-white font-semibold mb-2 md:mb-3">
              <FileText className="w-4 h-4 md:w-5 md:h-5 text-violet-400" />
              Not / Açıklama
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="QR sosyal medya profili hakkında açıklama veya not ekleyin... (opsiyonel)"
              className="w-full h-20 md:h-24 bg-slate-800/50 border border-white/10 rounded-xl p-3 md:p-4 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none resize-none text-sm md:text-base"
            />
          </div>

          {/* Expiration Selection */}
          <div className="mt-4 md:mt-6">
            <label className="flex items-center gap-2 text-white font-semibold mb-2 md:mb-3">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
              Geçerlilik Süresi
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              {[
                { value: '1day', label: '1 Gün', icon: Timer, color: 'text-cyan-400', activeColor: 'border-cyan-500/50 bg-cyan-500/10' },
                { value: '1week', label: '1 Hafta', icon: AlarmClock, color: 'text-blue-400', activeColor: 'border-blue-500/50 bg-blue-500/10' },
                { value: '1month', label: '1 Ay', icon: CalendarDays, color: 'text-purple-400', activeColor: 'border-purple-500/50 bg-purple-500/10' },
                { value: '3months', label: '3 Ay', icon: CalendarRange, color: 'text-orange-400', activeColor: 'border-orange-500/50 bg-orange-500/10' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setExpiration(option.value as any)}
                  className={`flex flex-col items-center gap-1 md:gap-2 p-2 md:p-4 rounded-xl border transition-all ${
                    expiration === option.value ? option.activeColor : 'border-white/10 text-gray-400 hover:border-white/20'
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
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Hızlı Erişim</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">
              Takipçileriniz tek tıkla hesabınıza ulaşsın.
            </p>
          </div>

          <div className="card-premium p-3 md:p-6">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-2 md:mb-4 shadow-lg">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Güvenli</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">
              Doğrudan ve güvenli yönlendirme.
            </p>
          </div>

          <div className="card-premium p-3 md:p-6 col-span-2 md:col-span-1">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 mb-2 md:mb-4 shadow-lg">
              <Share2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Çoklu Platform</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">
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
            <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 text-gradient">Link-in-Bio Nedir?</h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Link-in-bio, Instagram, TikTok ve X (Twitter) hesaplarınızı tek ekranda sunan çözümlerdir. 
              QR kod ile birleştirildiğinde, marka değerinizi ve etkileşiminizi maksimuma çıkarabilirsiniz.
            </p>
          </div>

          <div className="card-premium p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 text-gradient">Sosyal Medya Pazarlaması</h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
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
          <h2 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-4 text-gradient">Link-in-Bio Çözümlerinin Marka Değerine Etkisi</h2>
          <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">
            Instagram, TikTok ve X (Twitter) hesaplarınızı tek ekranda sunan Link-in-bio çözümleri, modern dijital pazarlamanın en önemli araçlarından biri haline geldi.
            QR kod ile birleştirildiğinde, marka değerinizi ve etkileşiminizi maksimuma çıkarabilirsiniz.
          </p>

          <h3 className="text-base md:text-xl font-semibold text-white mb-2 md:mb-3">Marka Değerine Katkıları</h3>
          <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">
            Link-in-bio QR kodları ile:
          </p>
          <ul className="text-gray-400 space-y-2 mb-6">
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

          <h3 className="text-base md:text-xl font-semibold text-white mb-2 md:mb-3">Nasıl Kullanılır?</h3>
          <ul className="text-gray-400 space-y-2 md:space-y-2 mb-4 md:mb-6 text-sm md:text-base">
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

          <h3 className="text-base md:text-xl font-semibold text-white mb-2 md:mb-3">Avantajları</h3>
          <ul className="text-gray-400 space-y-2 md:space-y-2 text-sm md:text-base">
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
