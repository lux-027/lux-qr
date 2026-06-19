'use client';

import { motion } from 'framer-motion';
import { Wifi, Clock, Shield, Zap, HelpCircle, FileText, Eye, EyeOff, Lock as LockIcon } from 'lucide-react';
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
  const [expiration, setExpiration] = useState<'1day' | '1week' | '1month' | '3months'>('1day');
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleGenerate = async () => {
    if (!formData.ssid) {
      showNotification('Lütfen ağ adı (SSID) girin', 'error');
      return;
    }

    // Validate SSID (1-32 characters, no special characters that might cause issues)
    if (formData.ssid.length < 1 || formData.ssid.length > 32) {
      showNotification('Ağ adı (SSID) 1-32 karakter arasında olmalıdır', 'error');
      return;
    }

    // Validate password based on security type
    if (formData.security !== 'nopass') {
      if (!formData.password) {
        showNotification('Lütfen WiFi şifresi girin', 'error');
        return;
      }

      if (formData.security === 'WPA' || formData.security === 'WPA2') {
        if (formData.password.length < 8 || formData.password.length > 63) {
          showNotification('WPA/WPA2 şifresi 8-63 karakter arasında olmalıdır', 'error');
          return;
        }
      } else if (formData.security === 'WEP') {
        if (formData.password.length !== 5 && formData.password.length !== 13) {
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
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
            <div className="relative flex items-center justify-center gap-3 mb-4">
              <Wifi className="w-10 h-10 md:w-12 md:h-14 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">LuxQr</h1>
            </div>
          </div>
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-300 mb-4">
            Modern <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">QR Kod Oluşturma</span>
          </p>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            WiFi ağ bilgilerinizi QR kod ile kolayca paylaşın
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-premium p-4 md:p-8 md:p-12 mb-6 md:mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-1 md:mb-2">
                <Wifi className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                Ağ Adı (SSID) *
              </label>
              <input
                type="text"
                value={formData.ssid}
                onChange={(e) => setFormData({ ...formData, ssid: e.target.value })}
                className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-3 md:p-4 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none text-sm md:text-base"
                placeholder="WiFi ağ adı"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-2">
                <LockIcon className="w-5 h-5 text-blue-400" />
                Şifre
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  disabled={formData.security === 'nopass'}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed pr-12"
                  placeholder={formData.security === 'nopass' ? 'Şifre gerekmez' : 'WiFi şifresi'}
                />
                {formData.security !== 'nopass' && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-2">
                <Shield className="w-5 h-5 text-blue-400" />
                Güvenlik Türü
              </label>
              <select
                value={formData.security}
                onChange={(e) => setFormData({ ...formData, security: e.target.value })}
                className="w-full bg-slate-800/50 border border-white/10 rounded-xl p-4 text-white focus:border-blue-500/50 focus:outline-none"
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
                  className="w-5 h-5 rounded border-white/10 bg-slate-800/50 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-white">Gizli Ağ</span>
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowTooltip(!showTooltip)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
                {showTooltip && (
                  <div className="absolute right-0 top-6 z-10 w-64 p-3 bg-slate-800 border border-white/10 rounded-xl shadow-xl">
                    <p className="text-gray-300 text-sm">
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
            <label className="flex items-center gap-2 text-white font-semibold mb-2 md:mb-3">
              <FileText className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
              Not / Açıklama
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="WiFi QR kodu hakkında açıklama veya not ekleyin... (opsiyonel)"
              className="w-full h-20 md:h-24 bg-slate-800/50 border border-white/10 rounded-xl p-3 md:p-4 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none resize-none text-sm md:text-base"
            />
          </div>

          {/* Expiration Selection */}
          <div className="mt-4 md:mt-6">
            <label className="flex items-center gap-2 text-white font-semibold mb-2 md:mb-3">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
              Geçerlilik Süresi
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              {[
                { value: '1day', label: '1 Gün', icon: Clock },
                { value: '1week', label: '1 Hafta', icon: Clock },
                { value: '1month', label: '1 Ay', icon: Clock },
                { value: '3months', label: '3 Ay', icon: Clock },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setExpiration(option.value as any)}
                  className={`flex flex-col items-center gap-1 md:gap-2 p-2 md:p-4 rounded-xl border transition-all ${
                    expiration === option.value
                      ? 'border-blue-500/50 bg-blue-500/10 text-blue-400'
                      : 'border-white/10 text-gray-400 hover:border-blue-500/50'
                  }`}
                >
                  <option.icon className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-xs md:text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-4 md:mt-6">
            <button
              onClick={handleGenerate}
              disabled={loading}
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
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Hızlı Bağlantı</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">
              Şifre yazma derdine son. Tek tıkla WiFi'a bağlanın.
            </p>
          </div>

          <div className="card-premium p-3 md:p-6">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-2 md:mb-4 shadow-lg">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Güvenli</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">
              Şifreleriniz güvende. Sadece yetkili kişiler erişebilir.
            </p>
          </div>

          <div className="card-premium p-3 md:p-6 col-span-2 md:col-span-1">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 mb-2 md:mb-4 shadow-lg">
              <Wifi className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Kolay Kullanım</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">
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
            <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 text-gradient">Güvenlik Türleri</h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              WPA/WPA2 en güvenli seçenektir ve modern router'lar için önerilir. 
              WEP eski bir teknolojidir ve daha az güvenlidir. Şifresiz ağlar herkese açıktır.
            </p>
          </div>

          <div className="card-premium p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 text-gradient">Gizli Ağ Nedir?</h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
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
          <h2 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-4 text-gradient">İşletmeler ve Restoranlar İçin Güvenli QR Kodlu Ağ Paylaşım Rehberi</h2>
          <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">
            Geleneksel WiFi şifre paylaşımı hem zaman alıcı hem de güvenlik açısından riskli olabilir. QR kod tabanlı WiFi paylaşımı ile:
          </p>
          <ul className="text-gray-400 space-y-2 mb-6">
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

          <h3 className="text-base md:text-xl font-semibold text-white mb-2 md:mb-3">Nasıl Kullanılır?</h3>
          <ul className="text-gray-400 space-y-2 md:space-y-2 mb-4 md:mb-6 text-sm md:text-base">
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

          <h3 className="text-base md:text-xl font-semibold text-white mb-2 md:mb-3">Avantajları</h3>
          <ul className="text-gray-400 space-y-2 md:space-y-2 text-sm md:text-base">
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
