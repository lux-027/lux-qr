'use client';

import { motion } from 'framer-motion';
import { Mic, Clock, Shield, Zap, Upload, FileText } from 'lucide-react';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/components/Notification';

export default function SesDosyasiContent() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [note, setNote] = useState('');
  const [expiration, setExpiration] = useState<'1day' | '1week' | '1month' | '3months'>('1day');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploading(true);
      setTimeout(() => setUploading(false), 2000);
    }
  };

  const handleGenerate = async () => {
    if (!file) {
      showNotification('Lütfen ses dosyası seçin', 'error');
      return;
    }
    if (uploading) {
      showNotification('Dosya yükleniyor, lütfen bekleyin', 'error');
      return;
    }

    setLoading(true);
    try {
      // Dosyayı Supabase'a yükle
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok || !uploadData.success) {
        showNotification(uploadData.error || 'Dosya yüklenemedi', 'error');
        return;
      }

      const content = file.name;
      const fileName = file.name;
      const filePath = uploadData.url;

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          contentType: 'file',
          fileName,
          filePath,
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
              <Mic className="w-10 h-10 md:w-12 md:h-14 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">LuxQr</h1>
            </div>
          </div>
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-300 mb-4">
            Modern <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">QR Kod Oluşturma</span>
          </p>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ses dosyalarınız yükleyerek QR kod oluşturun
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-premium p-4 md:p-8 md:p-12 mb-6 md:mb-8"
        >
          <div>
            <label className="flex items-center gap-2 text-white font-semibold mb-2 md:mb-3">
              <Upload className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
              Ses Dosyası Yükle
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-white/20 rounded-xl p-4 md:p-8 text-center cursor-pointer hover:border-blue-500/50 transition-colors"
            >
              <Upload className="w-8 h-8 md:w-12 md:h-12 text-blue-400 mx-auto mb-2 md:mb-4" />
              <p className="text-gray-400 mb-1 md:mb-2 text-sm md:text-base">
                {file ? file.name : 'Dosya seçmek için tıklayın veya sürükleyin'}
              </p>
              <p className="text-gray-500 text-xs md:text-sm">
                MP3, WAV, M4A (max 50MB)
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              accept="audio/*"
              className="hidden"
            />
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
              placeholder="QR ses dosyası hakkında açıklama veya not ekleyin... (opsiyonel)"
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
              disabled={loading || uploading}
              className="btn-primary w-full py-3 md:py-4 rounded-2xl text-white font-semibold disabled:opacity-50 text-sm md:text-base"
            >
              {loading ? 'Oluşturuluyor...' : uploading ? 'Yükleniyor...' : 'QR Kod Oluştur'}
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
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Hızlı Paylaşım</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">
              Ses dosyalarınızı saniyeler içinde paylaşın.
            </p>
          </div>

          <div className="card-premium p-3 md:p-6">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-2 md:mb-4 shadow-lg">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Güvenli</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">
              Dosyalarınız güvende. Şifreli ve güvenli yükleme.
            </p>
          </div>

          <div className="card-premium p-3 md:p-6 col-span-2 md:col-span-1">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 mb-2 md:mb-4 shadow-lg">
              <Mic className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Çoklu Format</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">
              MP3, WAV, M4A format desteği.
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
            <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 text-gradient">Podcast Yayınları</h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Podcast bölümlerinizi QR kod ile fiziksel olarak paylaşın. 
              Etkinliklerde, konferanslarda ve tanıtımlarda dinleyicilerinize kolay erişim sağlayın.
            </p>
          </div>

          <div className="card-premium p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 text-gradient">Sesli Rehberler</h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Müze sergileri, sanat galerileri ve turistik yerlerde sesli rehberler oluşturun. 
              Ziyaretçileriniz QR kod ile tesisat gereksinimi olmadan sesli içeriklere ulaşabilir.
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
          <h2 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-4 text-gradient">Podcast ve Sesli Notları QR Kod ile Menülere veya Sergilere Entegre Etme Rehberi</h2>
          <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">
            Podcast bölümleri, sesli notlar ve müzik dosyalarınızı QR kod ile fiziksel mekanlara entegre ederek, kullanıcı deneyimini zenginleştirebilirsiniz.
            Restoran menüleri, müze sergileri ve etkinlik alanlarında sesli içeriklere kolayca erişim sağlayın.
          </p>

          <h3 className="text-base md:text-xl font-semibold text-white mb-2 md:mb-3">Kullanım Alanları</h3>
          <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">
            Ses dosyası QR kodları ile:
          </p>
          <ul className="text-gray-400 space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Restoran menülerinde sesli açıklamalar sunun</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Müze sergilerinde rehberli turlar sağlayın</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Podcast bölümlerini fiziksel olarak paylaşın</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Etkinliklerde sesli duyurular yapın</span>
            </li>
          </ul>

          <h3 className="text-base md:text-xl font-semibold text-white mb-2 md:mb-3">Nasıl Kullanılır?</h3>
          <ul className="text-gray-400 space-y-2 md:space-y-2 mb-4 md:mb-6 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Ses dosyanızı seçin (MP3, WAV, M4A)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Geçerlilik süresini belirleyin</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>QR kod oluşturun</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>QR kodu menünüze, serginize veya etkinliğinize yerleştirin</span>
            </li>
          </ul>

          <h3 className="text-base md:text-xl font-semibold text-white mb-2 md:mb-3">Avantajları</h3>
          <ul className="text-gray-400 space-y-2 md:space-y-2 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>İnteraktif deneyim</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Kolay erişim</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Çoklu format desteği</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Mobil uyumlu</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}
