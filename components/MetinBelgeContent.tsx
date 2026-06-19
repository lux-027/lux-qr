'use client';

import { motion } from 'framer-motion';
import { Type, ImageIcon, Video, FileText, Upload, QrCode, Clock, Shield, Zap } from 'lucide-react';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/components/Notification';

export default function MetinBelgeContent() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<'text' | 'image' | 'video' | 'file'>('text');
  const [textContent, setTextContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [note, setNote] = useState('');
  const [expiration, setExpiration] = useState<'1day' | '1week' | '1month' | '3months'>('1day');
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTypeChange = (type: 'text' | 'image' | 'video' | 'file') => {
    setSelectedType(type);
    setFile(null);
    setTextContent('');
    setUploadStatus('');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Client-side file size validation with warning
      const maxSize = selectedType === 'video' ? 100 * 1024 * 1024 : 10 * 1024 * 1024; // 100MB for video, 10MB for others
      if (selectedFile.size > maxSize) {
        const maxSizeMB = selectedType === 'video' ? '100MB' : '10MB';
        const fileSizeMB = (selectedFile.size / 1024 / 1024).toFixed(2);
        showNotification(`Dosya boyutu çok büyük (${fileSizeMB}MB). Maksimum ${maxSizeMB} limiti var.`, 'error');
        return;
      }
      
      // Warning for large files (over 50MB for videos)
      if (selectedType === 'video' && selectedFile.size > 50 * 1024 * 1024) {
        const fileSizeMB = (selectedFile.size / 1024 / 1024).toFixed(2);
        showNotification(`Büyük dosya (${fileSizeMB}MB). Yükleme biraz zaman alabilir.`, 'info');
      }
      
      setFile(selectedFile);
    }
  };

  const handleGenerate = async () => {
    if (selectedType === 'text' && !textContent.trim()) {
      showNotification('Lütfen metin girin', 'error');
      return;
    }
    if ((selectedType === 'image' || selectedType === 'video' || selectedType === 'file') && !file) {
      showNotification('Lütfen dosya seçin', 'error');
      return;
    }
    if (loading) {
      showNotification('İşlem devam ediyor, lütfen bekleyin', 'error');
      return;
    }

    setLoading(true);
    setUploadStatus(selectedType === 'video' ? 'Video yükleniyor... (bu biraz zaman alabilir)' : 'QR kod oluşturuluyor...');
    try {
      let content = '';
      let contentType: 'text' | 'image' | 'video' | 'file' = selectedType;
      let fileName = null;
      let filePath = null;

      if (selectedType === 'text') {
        content = textContent;
      } else if (file) {
        // Dosyayı Supabase'a yükle
        const formData = new FormData();
        formData.append('file', file);

        // Add timeout to prevent hanging - increased for video files
        const timeoutDuration = selectedType === 'video' ? 300000 : 120000; // 5 minutes for video, 2 minutes for others
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);

        setUploadStatus('Dosya yükleniyor...');

        try {
          const uploadResponse = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (!uploadResponse.ok) {
            const errorText = await uploadResponse.text();
            console.error('Upload failed:', uploadResponse.status, errorText);
            showNotification(`Dosya yüklenemedi: ${uploadResponse.status}`, 'error');
            return;
          }

          const uploadData = await uploadResponse.json();

          if (!uploadData.success) {
            showNotification(uploadData.error || 'Dosya yüklenemedi', 'error');
            return;
          }

          content = file.name;
          fileName = file.name;
          filePath = uploadData.url;
        } catch (error: any) {
          clearTimeout(timeoutId);
          if (error.name === 'AbortError') {
            const timeoutMinutes = selectedType === 'video' ? '5 dakika' : '2 dakika';
            showNotification(`Dosya yüklenirken zaman aşımı oluştu (${timeoutMinutes})`, 'error');
          } else {
            console.error('Upload error:', error);
            showNotification('Dosya yüklenirken bir hata oluştu', 'error');
          }
          return;
        }
      }

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          contentType,
          fileName,
          filePath,
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
      setUploadStatus('');
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
              <QrCode className="w-10 h-10 md:w-12 md:h-14 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">LuxQr</h1>
            </div>
          </div>
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-300 mb-4">
            Modern <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">QR Kod Oluşturma</span>
          </p>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Metin, resim, video ve belge içeriğinizi QR koda dönüştürün ve paylaşın
          </p>
        </motion.div>

        {/* Content Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8"
        >
          <div
            onClick={() => handleTypeChange('text')}
            className={`card-premium p-6 cursor-pointer transition-all ${
              selectedType === 'text'
                ? 'border-2 border-blue-500 bg-gradient-to-br from-blue-600/40 to-purple-600/40 shadow-2xl shadow-blue-500/50 scale-105 ring-2 ring-blue-500/30'
                : 'hover:border-blue-500/50 opacity-70 hover:opacity-100'
            }`}
          >
            <Type className={`w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-4 ${selectedType === 'text' ? 'text-blue-300' : 'text-blue-400'}`} />
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Metin</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">Not veya metin içeriği için QR kod</p>
          </div>

          <div
            onClick={() => handleTypeChange('image')}
            className={`card-premium p-6 cursor-pointer transition-all ${
              selectedType === 'image'
                ? 'border-2 border-blue-500 bg-gradient-to-br from-blue-600/40 to-purple-600/40 shadow-2xl shadow-blue-500/50 scale-105 ring-2 ring-blue-500/30'
                : 'hover:border-blue-500/50 opacity-70 hover:opacity-100'
            }`}
          >
            <ImageIcon className={`w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-4 ${selectedType === 'image' ? 'text-blue-300' : 'text-blue-400'}`} />
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Resim</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">Görsel dosyaları için QR kod</p>
          </div>

          <div
            onClick={() => handleTypeChange('video')}
            className={`card-premium p-6 cursor-pointer transition-all ${
              selectedType === 'video'
                ? 'border-2 border-blue-500 bg-gradient-to-br from-blue-600/40 to-purple-600/40 shadow-2xl shadow-blue-500/50 scale-105 ring-2 ring-blue-500/30'
                : 'hover:border-blue-500/50 opacity-70 hover:opacity-100'
            }`}
          >
            <Video className={`w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-4 ${selectedType === 'video' ? 'text-blue-300' : 'text-blue-400'}`} />
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Video</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">Video dosyaları için QR kod</p>
          </div>

          <div
            onClick={() => handleTypeChange('file')}
            className={`card-premium p-6 cursor-pointer transition-all ${
              selectedType === 'file'
                ? 'border-2 border-blue-500 bg-gradient-to-br from-blue-600/40 to-purple-600/40 shadow-2xl shadow-blue-500/50 scale-105 ring-2 ring-blue-500/30'
                : 'hover:border-blue-500/50 opacity-70 hover:opacity-100'
            }`}
          >
            <FileText className={`w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-4 ${selectedType === 'file' ? 'text-blue-300' : 'text-blue-400'}`} />
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Belge</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">PDF, DOCX ve diğer belgeler için QR kod</p>
          </div>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-premium p-4 md:p-8 md:p-12 mb-6 md:mb-8"
        >
          {selectedType === 'text' ? (
            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-2 md:mb-3">
                <Type className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                Metin İçeriği
              </label>
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="QR koda dönüştürmek istediğiniz metni girin..."
                className="w-full h-32 md:h-40 bg-slate-800/50 border border-white/10 rounded-2xl p-3 md:p-4 text-white placeholder-gray-500 focus:border-blue-500/50 focus:outline-none resize-none text-sm md:text-base"
              />
            </div>
          ) : (
            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-2 md:mb-3">
                <Upload className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                Dosya Yükle
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/20 rounded-2xl p-4 md:p-8 text-center cursor-pointer hover:border-blue-500/50 transition-colors"
              >
                <Upload className="w-8 h-8 md:w-12 md:h-12 text-blue-400 mx-auto mb-2 md:mb-4" />
                <p className="text-gray-400 mb-1 md:mb-2 text-sm md:text-base">
                  {file ? file.name : 'Dosya seçmek için tıklayın veya sürükleyin'}
                </p>
                <p className="text-gray-500 text-xs md:text-sm">
                  {selectedType === 'image' && 'PNG, JPG, GIF (max 10MB)'}
                  {selectedType === 'video' && 'MP4, MOV, AVI (max 100MB)'}
                  {selectedType === 'file' && 'PDF, DOCX, TXT (max 10MB)'}
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                accept={
                  selectedType === 'image'
                    ? 'image/*'
                    : selectedType === 'video'
                    ? 'video/*,.mp4,.mov,.avi,.mkv,.webm'
                    : '.pdf,.doc,.docx,.txt'
                }
                className="hidden"
              />
            </div>
          )}

          {/* Note/Description Field */}
          <div className="mt-4 md:mt-6">
            <label className="flex items-center gap-2 text-white font-semibold mb-2 md:mb-3">
              <FileText className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
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
                  className={`flex flex-col items-center gap-1 md:gap-2 p-2 md:p-4 rounded-2xl border transition-all ${
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

          {/* Action Buttons */}
          <div className="mt-4 md:mt-6">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="btn-primary w-full text-white font-semibold py-3 md:py-4 rounded-2xl disabled:opacity-50 text-sm md:text-base"
            >
              {loading ? uploadStatus || 'Oluşturuluyor...' : 'QR Kod Oluştur'}
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
            <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-2">Çoklu Format</h3>
            <p className="text-gray-400 text-xs md:text-sm hidden md:block">
              Metin, resim, video ve belge için QR kod desteği.
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
          {selectedType === 'text' && (
            <>
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
            </>
          )}
          {selectedType === 'image' && (
            <>
              <div className="card-premium p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 text-gradient">Resim QR Kodları</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  Fotoğraflar, grafikler ve görsel içerikler için QR kod oluşturun. 
                  Sanat galerileri, portfolyolar ve görsel sunumlar için idealdir.
                </p>
              </div>
              <div className="card-premium p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 text-gradient">Yüksek Kalite</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  Resimlerinizi orijinal kalitede paylaşın. 
                  Baskı materyalleri ve dijital ekranlar için optimize edilmiş.
                </p>
              </div>
            </>
          )}
          {selectedType === 'video' && (
            <>
              <div className="card-premium p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 text-gradient">Video QR Kodları</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  Tanıtım videoları, eğitimler ve sunumlar için QR kod oluşturun. 
                  Etkinlikler, konferanslar ve eğitim materyalleri için mükemmeldir.
                </p>
              </div>
              <div className="card-premium p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 text-gradient">Büyük Dosya Desteği</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  100MB'a kadar video dosyalarını destekler. 
                  Yüksek kaliteli videolarınızı kolayca paylaşın.
                </p>
              </div>
            </>
          )}
          {selectedType === 'file' && (
            <>
              <div className="card-premium p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 text-gradient">Dosya Paylaşımı</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  PDF, DOCX, resim ve video dosyalarınızı QR kod ile paylaşın. 
                  Toplantılar, konferanslar ve eğitim materyalleri için hızlı dağıtım sağlar.
                </p>
              </div>
              <div className="card-premium p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3 text-gradient">Çoklu Format</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  Tüm dosya türlerini destekler. 
                  Dokümanlar, sunumlar ve medya dosyaları için tek çözüm.
                </p>
              </div>
            </>
          )}
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-premium p-4 md:p-8 md:p-12"
        >
          <h2 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-4 text-gradient">PDF ve Dosya Paylaşımında QR Kodun Sağladığı Hız</h2>
          <p className="text-gray-400 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
            Geleneksel dosya paylaşım yöntemleri artık yetersiz kalıyor. PDF, DOCX, resim ve video dosyalarınızı QR kod ile paylaşarak saniyeler içinde binlerce kişiye ulaşabilirsiniz. 
            Özellikle toplantılar, konferanslar ve eğitim materyalleri için QR kod tabanlı dosya paylaşımı, kağıt israfını önlerken erişim hızını maksimuma çıkarır.
          </p>

          <h3 className="text-base md:text-xl font-semibold text-white mb-2 md:mb-3">Dijital Dökümantasyon Rehberi</h3>
          <p className="text-gray-400 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
            Dijital dönüşüm çağında dokümantasyon süreçleri de evriliyor. QR kod teknolojisi ile:
          </p>
          <ul className="text-gray-400 space-y-2 md:space-y-3 mb-4 md:mb-6 text-sm md:text-base">
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                <span className="text-blue-400 text-xs">✓</span>
              </div>
              <span>Toplu dosya dağıtımını otomatikleştirin</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                <span className="text-purple-400 text-xs">✓</span>
              </div>
              <span>Kağıt maliyetlerinden tasarruf edin</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center mt-0.5">
                <span className="text-cyan-400 text-xs">✓</span>
              </div>
              <span>Gerçek zamanlı içerik güncellemeleri yapın</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center mt-0.5">
                <span className="text-pink-400 text-xs">✓</span>
              </div>
              <span>Çevre dostu sürdürülebilir çözümler uygulayın</span>
            </li>
          </ul>

          <h3 className="text-base md:text-xl font-semibold text-white mb-2 md:mb-3">Nasıl Kullanılır?</h3>
          <ul className="text-gray-400 space-y-2 md:space-y-3 mb-4 md:mb-6 text-sm md:text-base">
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs md:text-sm">1</span>
              </div>
              <span>İçeriğinizi seçin (metin, resim, video veya belge)</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs md:text-sm">2</span>
              </div>
              <span>Geçerlilik süresini belirleyin</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs md:text-sm">3</span>
              </div>
              <span>QR kod oluşturun</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs md:text-sm">4</span>
              </div>
              <span>QR kodu indirin veya paylaşın</span>
            </li>
          </ul>

          <h3 className="text-base md:text-xl font-semibold text-white mb-2 md:mb-3">Avantajları</h3>
          <ul className="text-gray-400 space-y-2 md:space-y-3 text-sm md:text-base">
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                <span className="text-blue-400 text-xs">✓</span>
              </div>
              <span>Hızlı bilgi erişimi</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                <span className="text-purple-400 text-xs">✓</span>
              </div>
              <span>Kolay paylaşım</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center mt-0.5">
                <span className="text-cyan-400 text-xs">✓</span>
              </div>
              <span>Çok yönlü kullanım</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center mt-0.5">
                <span className="text-pink-400 text-xs">✓</span>
              </div>
              <span>Mobil uyumlu</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}
