'use client';

import { motion } from 'framer-motion';
import { Type, QrCode, Clock, Shield, Zap, FileText, CalendarDays, CalendarRange, Timer, AlarmClock } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/components/Notification';

export default function MetinContent() {
  const router = useRouter();
  const [textContent, setTextContent] = useState('');
  const [note, setNote] = useState('');
  const [expiration, setExpiration] = useState<'1day' | '1week' | '1month' | '3months'>('1day');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleGenerate = async () => {
    if (!textContent.trim()) {
      setShowError(true);
      showNotification('Lütfen metin girin', 'error');
      return;
    }
    if (loading) {
      showNotification('İşlem devam ediyor, lütfen bekleyin', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: textContent,
          contentType: 'text',
          expiration,
          note,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Generate failed:', response.status, errorText);
        showNotification(`QR oluşturulamadı: ${response.status}`, 'error');
        return;
      }

      const data = await response.json();
      if (data.success) {
        router.push(`/qr/${data.id}`);
      } else {
        showNotification(data.error || 'QR kod oluşturulamadı', 'error');
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
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
            <div className="relative flex items-center justify-center gap-3 mb-4">
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40 rotate-3 hover:rotate-6 transition-transform duration-300">
                  <Type className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/40 -rotate-12">
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
            Metin içeriğinizi saniyeler içinde QR koda dönüştürün ve paylaşın
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-premium p-4 md:p-8 md:p-12 mb-6 md:mb-8"
        >
          <div>
            <label className="flex items-center gap-2 text-white font-semibold mb-2 md:mb-3">
              <div className="p-1 rounded-lg bg-blue-500/20">
                <Type className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
              </div>
              Metin İçeriği
            </label>
            <textarea
              value={textContent}
              onChange={(e) => {
                setTextContent(e.target.value);
                setShowError(false);
              }}
              placeholder="QR koda dönüştürmek istediğiniz metni girin..."
              className={`w-full h-32 md:h-40 bg-slate-800/50 border rounded-2xl p-3 md:p-4 text-white placeholder-gray-500 focus:outline-none resize-none text-sm md:text-base ${
                showError ? 'border-red-500' : 'border-white/10 focus:border-blue-500/50'
              }`}
            />
            {showError && (
              <p className="text-red-400 text-xs mt-1">Lütfen metin girin</p>
            )}
          </div>

          {/* Note/Description Field */}
          <div className="mt-4 md:mt-6">
            <label className="flex items-center gap-2 text-white font-semibold mb-2 md:mb-3">
              <div className="p-1 rounded-lg bg-purple-500/20">
                <FileText className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
              </div>
              Not / Açıklama
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="QR kod hakkında açıklama veya not ekleyin... (opsiyonel)"
              className="w-full h-20 md:h-24 bg-slate-800/50 border border-white/10 rounded-2xl p-3 md:p-4 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none resize-none text-sm md:text-base"
            />
          </div>

          {/* Expiration Selection */}
          <div className="mt-4 md:mt-6">
            <label className="flex items-center gap-2 text-white font-semibold mb-2 md:mb-3">
              <div className="p-1 rounded-lg bg-orange-500/20">
                <Clock className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
              </div>
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
                  className={`flex flex-col items-center gap-1 md:gap-2 p-2 md:p-4 rounded-2xl border transition-all ${
                    expiration === option.value
                      ? option.activeColor
                      : 'border-white/10 text-gray-400 hover:border-white/20'
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
              disabled={loading || !textContent.trim()}
              className="btn-primary w-full text-white font-semibold py-3 md:py-4 rounded-2xl disabled:opacity-50 text-sm md:text-base"
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
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Hızlı ve Kolay</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">
              Saniyeler içinde QR kod oluşturun. Tek tıkla içeriğinizi paylaşın.
            </p>
          </div>

          <div className="card-premium p-3 md:p-6">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-2 md:mb-4 shadow-lg">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Güvenli</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">
              Verileriniz güvende. Şifreli ve güvenli QR kod oluşturma.
            </p>
          </div>

          <div className="card-premium p-3 md:p-6 col-span-2 md:col-span-1">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 mb-2 md:mb-4 shadow-lg">
              <QrCode className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Metin QR</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">
              Notlar, açıklamalar ve kısa metinler için ideal.
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
            <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 text-gradient">Metin QR Kodları</h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Notlar, açıklamalar, iletişim bilgileri ve kısa mesajlar için idealdir. 
              Restoran menüleri, etkinlik programları ve bilgi panolarında kullanılabilir.
            </p>
          </div>
          <div className="card-premium p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 text-gradient">Hızlı Paylaşım</h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Metin içeriğinizi saniyeler içinde QR koda dönüştürün. 
              Sosyal medya, broşürler ve dijital ekranlarda kolayca paylaşın.
            </p>
          </div>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-premium p-4 md:p-8 md:p-12"
        >
          <h2 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-4 text-gradient">Metin QR Kodlarının Kullanım Alanları</h2>
          <p className="text-gray-400 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
            Metin QR kodları, kısa metin içeriğini hızlı ve kolay bir şekilde paylaşmak için mükemmel bir çözümdür. 
            Restoran menüleri, etkinlik programları, iletişim bilgileri, notlar ve kısa açıklamalar için idealdir.
          </p>

          <h3 className="text-base md:text-xl font-semibold text-white mb-2 md:mb-3">Kullanım Alanları</h3>
          <ul className="text-gray-400 space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Restoran menüleri ve fiyat listeleri</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Etkinlik programları ve takvimler</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>İletişim bilgileri ve adresler</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Notlar ve kısa açıklamalar</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Bilgi panoları ve yönlendirmeler</span>
            </li>
          </ul>

          <h3 className="text-base md:text-xl font-semibold text-white mb-2 md:mb-3">Avantajları</h3>
          <ul className="text-gray-400 space-y-2 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Saniyeler içinde oluşturma</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Kolay paylaşım ve dağıtım</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Yüksek kaliteli çıktı</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Özelleştirilebilir tasarım</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}
