'use client';

import { motion } from 'framer-motion';
import { Mic, Clock, Shield, Zap, Upload, FileText, Square, Play, QrCode, Timer, AlarmClock, CalendarDays, CalendarRange } from 'lucide-react';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@/components/Notification';

export default function SesDosyasiContent() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [expiration, setExpiration] = useState<'1day' | '1week' | '1month' | '3months' | '6months' | '12months'>('1day');
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      setUploading(true);
      setUploadStatus('Dosya yükleniyor...');
      
      // Simulate upload delay
      setTimeout(() => {
        setFile(selectedFile);
        setShowError(false);
        setUploading(false);
        setUploadStatus('');
        
        // Create preview URL for audio
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
      }, 1000);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioFile = new File([audioBlob], 'kayit-ses.webm', { type: 'audio/webm' });
        
        setFile(audioFile);
        setShowError(false);
        
        const url = URL.createObjectURL(audioBlob);
        setPreviewUrl(url);
        
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      showNotification('Kayıt başladı', 'info');
    } catch (error) {
      console.error('Kayıt hatası:', error);
      showNotification('Mikrofon erişimi reddedildi', 'error');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      
      showNotification('Kayıt tamamlandı', 'success');
    }
  };

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleGenerate = async () => {
    if (!file) {
      setShowError(true);
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
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,237,213,0.8) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(249,115,22,0.25)',
              boxShadow: '0 8px 32px rgba(249,115,22,0.15), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
            }}
            className="relative rounded-3xl overflow-hidden p-6 md:p-8 max-w-2xl mx-auto"
          >
            <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-3xl pointer-events-none"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)' }} />
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.2) 0%, transparent 70%)' }} />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-5 md:gap-8">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center -rotate-3 hover:rotate-3 transition-transform duration-300"
                    style={{ background: 'linear-gradient(135deg, #f97316, #dc2626)', boxShadow: '0 8px 24px rgba(249,115,22,0.45)' }}>
                    <Mic className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-xl flex items-center justify-center shadow-lg -rotate-12"
                    style={{ background: 'linear-gradient(135deg, #eab308, #f97316)', boxShadow: '0 4px 12px rgba(234,179,8,0.4)' }}>
                    <QrCode className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">
                  Ses Dosyası <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">QR Kodu</span>
                </h1>
                <p className="text-gray-600 text-sm md:text-base">Ses dosyalarınızı yükleyerek QR kod oluşturun ve paylaşın</p>
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
          <div>
            <label className="flex items-center gap-2 text-gray-900 font-semibold mb-2 md:mb-3">
              <Upload className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
              Ses Dosyası Yükle
            </label>
            <div className="relative">
              {file && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    setPreviewUrl(null);
                    setShowError(false);
                  }}
                  className="absolute top-2 right-2 z-10 bg-gray-500/60 hover:bg-gray-500/80 text-gray-900 rounded-full p-1 md:p-2 transition-colors backdrop-blur-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-5 md:h-5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
              <div className="flex gap-3">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex-1 border-2 border-dashed rounded-xl p-4 md:p-8 text-center cursor-pointer transition-colors ${
                    showError ? 'border-red-500' : 'border-gray-300 hover:border-blue-500/50'
                  }`}
                >
                  {previewUrl ? (
                    <div className="mb-4">
                      <audio src={previewUrl} controls className="w-full max-w-md mx-auto" />
                    </div>
                  ) : (
                    <Upload className="w-8 h-8 md:w-12 md:h-12 text-orange-400 mx-auto mb-2 md:mb-4" />
                  )}
                  <p className="text-gray-600 mb-1 md:mb-2 text-sm md:text-base">
                    {file ? file.name : 'Dosya seçmek için tıklayın veya ses kaydedin'}
                  </p>
                  <p className="text-gray-600 text-xs md:text-sm">
                    MP3, WAV, M4A (max 50MB) veya ses kaydı
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-3">
                  {/* Record button */}
                  <div className="relative">
                    {/* Pulsing rings when recording */}
                    {isRecording && (
                      <>
                        <span className="absolute inset-0 rounded-full bg-red-500/30 animate-ping" />
                        <span className="absolute -inset-2 rounded-full bg-red-500/15 animate-ping" style={{ animationDelay: '0.3s' }} />
                      </>
                    )}
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      disabled={uploading || loading}
                      className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${
                        isRecording
                          ? 'bg-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.25),0_8px_24px_rgba(239,68,68,0.4)] scale-110'
                          : 'shadow-[0_4px_20px_rgba(59,130,246,0.35),0_0_0_3px_rgba(59,130,246,0.15)] hover:scale-110 hover:shadow-[0_6px_28px_rgba(59,130,246,0.5),0_0_0_4px_rgba(59,130,246,0.2)]'
                      }`}
                      style={!isRecording ? {
                        background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                      } : {}}
                    >
                      {/* Inner glass highlight */}
                      <span className="absolute inset-0 rounded-full pointer-events-none"
                        style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.35) 0%, transparent 60%)' }} />
                      {isRecording ? (
                        <Square className="w-6 h-6 md:w-7 md:h-7 text-white drop-shadow" fill="white" />
                      ) : (
                        <Mic className="w-6 h-6 md:w-7 md:h-7 text-white drop-shadow" />
                      )}
                    </button>
                  </div>

                  {/* Label + timer */}
                  {isRecording ? (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                      <span className="text-red-600 text-xs font-bold tabular-nums">{formatRecordingTime(recordingTime)}</span>
                      <span className="text-red-400 text-xs">Kaydediliyor</span>
                    </div>
                  ) : (
                    <span className="text-xs font-semibold text-gray-600 tracking-wide uppercase">Ses Kaydı</span>
                  )}
                </div>
              </div>
            </div>
            {showError && (
              <p className="text-red-400 text-xs mt-1">Lütfen ses dosyası seçin veya ses kaydedin</p>
            )}
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              accept=".mp3,.wav,.m4a,audio/mp3,audio/wav,audio/m4a,audio/x-m4a"
              className="hidden"
            />
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
              placeholder="QR ses dosyası hakkında açıklama veya not ekleyin... (opsiyonel)"
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
              disabled={loading || uploading || !file}
              className="btn-primary w-full py-3 md:py-4 rounded-2xl text-white font-semibold disabled:opacity-50 text-sm md:text-base"
            >
              {loading ? uploadStatus || 'Oluşturuluyor...' : uploading ? uploadStatus || 'Yükleniyor...' : 'QR Kod Oluştur'}
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
            <h3 className="text-sm md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Hızlı Paylaşım</h3>
            <p className="text-gray-600 text-xs md:text-sm hidden md:block">
              Ses dosyalarınızı saniyeler içinde paylaşın.
            </p>
          </div>

          <div className="card-premium p-3 md:p-6">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-2 md:mb-4 shadow-lg">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Güvenli</h3>
            <p className="text-gray-600 text-xs md:text-sm hidden md:block">
              Dosyalarınız güvende. Şifreli ve güvenli yükleme.
            </p>
          </div>

          <div className="card-premium p-3 md:p-6 col-span-2 md:col-span-1">
            <div className="inline-flex p-2 md:p-3 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 mb-2 md:mb-4 shadow-lg">
              <Mic className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
            </div>
            <h3 className="text-sm md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Çoklu Format</h3>
            <p className="text-gray-600 text-xs md:text-sm hidden md:block">
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
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3 text-gradient">Podcast Yayınları</h3>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              Podcast bölümlerinizi QR kod ile fiziksel olarak paylaşın. 
              Etkinliklerde, konferanslarda ve tanıtımlarda dinleyicilerinize kolay erişim sağlayın.
            </p>
          </div>

          <div className="card-premium p-4 md:p-6">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 md:mb-3 text-gradient">Sesli Rehberler</h3>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
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
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 text-gradient">Podcast ve Sesli Notları QR Kod ile Menülere veya Sergilere Entegre Etme Rehberi</h2>
          <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
            Podcast bölümleri, sesli notlar ve müzik dosyalarınızı QR kod ile fiziksel mekanlara entegre ederek, kullanıcı deneyimini zenginleştirebilirsiniz.
            Restoran menüleri, müze sergileri ve etkinlik alanlarında sesli içeriklere kolayca erişim sağlayın.
          </p>

          <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Kullanım Alanları</h3>
          <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
            Ses dosyası QR kodları ile:
          </p>
          <ul className="text-gray-600 space-y-2 mb-6">
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

          <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Nasıl Kullanılır?</h3>
          <ul className="text-gray-600 space-y-2 md:space-y-2 mb-4 md:mb-6 text-sm md:text-base">
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

          <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">Avantajları</h3>
          <ul className="text-gray-600 space-y-2 md:space-y-2 text-sm md:text-base">
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
