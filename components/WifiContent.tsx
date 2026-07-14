'use client';

import { motion } from 'framer-motion';
import { Wifi, Clock, Shield, Zap, HelpCircle, FileText, Eye, EyeOff, Lock as LockIcon, QrCode, Timer, AlarmClock, CalendarDays, CalendarRange } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/components/Notification';

export default function WifiContent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ssid: '',
    password: '',
    security: 'WPA',
    hidden: false,
  });
  const [note, setNote] = useState('');
  const [expiration, setExpiration] = useState<'1day' | '1week' | '1month' | '3months' | '6months' | '12months'>('1day');
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  const fillDemo = () => {
    setFormData({
      ssid: 'Cafe Lux Misafir',
      password: 'cafelux2025',
      security: 'WPA',
      hidden: false,
    });
    setShowError(false);
  };

  const handleGenerate = async () => {
    if (!formData.ssid) {
      setShowError(true);
      showNotification('Lütfen ağ adı (SSID) girin', 'error');
      return;
    }

    // Validate SSID (1-32 characters, no special characters that might cause issues)
    if (formData.ssid.length < 1 || formData.ssid.length > 32) {
      setShowError(true);
      showNotification('Ağ adı (SSID) 1-32 karakter arasında olmalıdır', 'error');
      return;
    }

    // Validate password based on security type
    if (formData.security !== 'nopass') {
      if (!formData.password) {
        setShowError(true);
        showNotification('Lütfen WiFi şifresi girin', 'error');
        return;
      }

      if (formData.security === 'WPA' || formData.security === 'WPA2') {
        if (formData.password.length < 8 || formData.password.length > 63) {
          setShowError(true);
          showNotification('WPA/WPA2 şifresi 8-63 karakter arasında olmalıdır', 'error');
          return;
        }
      } else if (formData.security === 'WEP') {
        if (formData.password.length !== 5 && formData.password.length !== 13) {
          setShowError(true);
          showNotification('WEP şifresi 5 veya 13 karakter olmalıdır', 'error');
          return;
        }
      }
    }

    setLoading(true);
    try {
      // WiFi QR code format: WIFI:S:MySSID;T:WPA;P:MyPassword;H:false;;
      const wifiContent = `WIFI:S:${formData.ssid};T:${formData.security};P:${formData.password};H:${formData.hidden};;`;

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: wifiContent,
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
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(209,250,229,0.8) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(16,185,129,0.25)',
              boxShadow: '0 8px 32px rgba(16,185,129,0.15), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
            }}
            className="relative rounded-3xl overflow-hidden p-6 md:p-8 max-w-2xl mx-auto"
          >
            <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-3xl pointer-events-none"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)' }} />
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)' }} />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-5 md:gap-8">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center -rotate-3 hover:rotate-3 transition-transform duration-300"
                    style={{ background: 'linear-gradient(135deg, #10b981, #0d9488)', boxShadow: '0 8px 24px rgba(16,185,129,0.45)' }}>
                    <Wifi className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-xl flex items-center justify-center shadow-lg -rotate-12"
                    style={{ background: 'linear-gradient(135deg, #06b6d4, #10b981)', boxShadow: '0 4px 12px rgba(6,182,212,0.4)' }}>
                    <QrCode className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">
                  WiFi <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">QR Kodu</span>
                </h1>
                <p className="text-gray-600 text-sm md:text-base">WiFi ağ bilgilerinizi QR kod ile kolayca paylaşın</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-premium p-4 md:p-8 md:p-12 mb-6 md:mb-8"
        >
          <div className="flex items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg">
                <Wifi className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-gray-900">WiFi Bilgileri</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="flex items-center gap-2 text-gray-900 font-semibold mb-1 md:mb-2">
                <Wifi className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                Ağ Adı (SSID) *
              </label>
              <input
                type="text"
                value={formData.ssid}
                onChange={(e) => {
                  setFormData({ ...formData, ssid: e.target.value });
                  setShowError(false);
                }}
                className={`w-full bg-white/80 border rounded-xl p-3 md:p-4 text-gray-900 placeholder-gray-400 focus:outline-none text-sm md:text-base ${
                  showError && !formData.ssid ? 'border-red-500' : 'border-gray-200 focus:border-blue-500/50'
                }`}
                placeholder="WiFi ağ adı"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-900 font-semibold mb-2">
                <LockIcon className="w-5 h-5 text-rose-400" />
                Şifre
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    setShowError(false);
                  }}
                  disabled={formData.security === 'nopass'}
                  className={`w-full bg-white/80 border rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed pr-12 ${
                    showError && formData.security !== 'nopass' && !formData.password ? 'border-red-500' : 'border-gray-200 focus:border-blue-500/50'
                  }`}
                  placeholder={formData.security === 'nopass' ? 'Şifre gerekmez' : 'WiFi şifresi'}
                />
                {formData.security !== 'nopass' && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-900 font-semibold mb-2">
                <Shield className="w-5 h-5 text-amber-400" />
                Güvenlik Türü
              </label>
              <select
                value={formData.security}
                onChange={(e) => setFormData({ ...formData, security: e.target.value })}
                className="w-full bg-white/80 border border-gray-200 rounded-xl p-4 text-gray-900 focus:border-blue-500/50 focus:outline-none"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">Şifresiz</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hidden}
                  onChange={(e) => setFormData({ ...formData, hidden: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-200 bg-white/80 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-gray-900">Gizli Ağ</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowTooltip(!showTooltip)}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
                {showTooltip && (
                  <div className="absolute right-0 top-6 z-10 w-64 p-3 bg-gray-100 border border-gray-200 rounded-xl shadow-xl">
                    <p className="text-gray-600 text-sm">
                      Gizli ağ, WiFi ağının normal taramada görünmez olmasını sağlar. 
                      Kullanıcıların ağ adını manuel olarak girmesi gerekir.
                    </p>
                  </div>
                )}
              </div>
            </div>
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
              placeholder="WiFi QR kodu hakkında açıklama veya not ekleyin... (opsiyonel)"
              className="w-full h-20 md:h-24 bg-white/80 border border-gray-200 rounded-xl p-3 md:p-4 text-gray-900 placeholder-gray-400 focus:border-blue-500/50 focus:outline-none resize-none text-sm md:text-base"
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
                  className={`flex flex-col items-center gap-1 md:gap-2 p-2 md:p-4 rounded-xl border transition-all ${
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
              disabled={loading || !formData.ssid || (formData.security !== 'nopass' && !formData.password)}
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
            <h3 className="text-sm md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Hızlı Bağlantı</h3>
            <p className="text-gray-600 text-xs md:text-sm hidden md:block">
              Şifre yazma derdine son. Tek tıkla WiFi'a bağlanın.
            </p>
          </div>

          <div className="card-premium p-3 md:p-6">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-2 md:mb-4 shadow-lg">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Güvenli</h3>
            <p className="text-gray-600 text-xs md:text-sm hidden md:block">
              Şifreleriniz güvende. Sadece yetkili kişiler erişebilir.
            </p>
          </div>

          <div className="card-premium p-3 md:p-6 col-span-2 md:col-span-1">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 mb-2 md:mb-4 shadow-lg">
              <Wifi className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Kolay Kullanım</h3>
            <p className="text-gray-600 text-xs md:text-sm hidden md:block">
              Müşterileriniz için WiFi erişimini kolaylaştırın.
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
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3 text-gradient">Güvenlik Türleri</h3>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              WPA/WPA2 en güvenli seçenektir ve modern router'lar için önerilir. 
              WEP eski bir teknolojidir ve daha az güvenlidir. Şifresiz ağlar herkese açıktır.
            </p>
          </div>

          <div className="card-premium p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3 text-gradient">Gizli Ağ Nedir?</h3>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              Gizli ağ, WiFi ağının normal taramada görünmez olmasını sağlar. 
              Kullanıcıların ağ adını manuel olarak girmesi gerekir, bu da ekstra güvenlik sağlar.
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
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 text-gradient">İşletmeler ve Restoranlar İçin Güvenli QR Kodlu Ağ Paylaşım Rehberi</h2>
          <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
            Geleneksel WiFi şifre paylaşımı hem zaman alıcı hem de güvenlik açısından riskli olabilir. QR kod tabanlı WiFi paylaşımı ile:
          </p>
          <ul className="text-gray-600 space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Şifreleri manuel yazma derdinden kurtulun</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Müşteri deneyimini iyileştirin</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Güvenlik risklerini azaltın</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Personel maliyetlerini düşürün</span>
            </li>
          </ul>

          <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Nasıl Kullanılır?</h3>
          <ul className="text-gray-600 space-y-2 md:space-y-2 mb-4 md:mb-6 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>WiFi ağ adı (SSID) ve şifrenizi girin</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Güvenlik türünü seçin (WPA, WEP veya şifresiz)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>QR kod oluşturun</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>QR kodu masalarınıza veya giriş bölgenize yerleştirin</span>
            </li>
          </ul>

          <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Avantajları</h3>
          <ul className="text-gray-600 space-y-2 md:space-y-2 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Otomatik bağlantı</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Şifre güvenliği</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Kolay yönetim</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Profesyonel görünüm</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}
