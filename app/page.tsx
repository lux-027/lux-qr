'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { 
  Type, 
  Image as ImageIcon, 
  Video, 
  FileText, 
  Clock, 
  Download,
  CheckCircle,
  Upload,
  QrCode,
  Zap,
  Shield,
  Sparkles,
  UploadCloud,
  Share2,
  Link as LinkIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import AdBanner from '@/components/AdBanner';
import RandomBlogs from '@/components/RandomBlogs';
import { useCounter } from '@/context/CounterContext';

type ContentType = 'text' | 'image' | 'video' | 'file';
type ExpirationType = '1day' | '1week' | '1month' | '3months';

export default function Home() {
  const [contentType, setContentType] = useState<ContentType>('text');
  const [expiration, setExpiration] = useState<ExpirationType>('1week');
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFilePath, setUploadedFilePath] = useState('');
  const [qrCodeId, setQrCodeId] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [imageShared, setImageShared] = useState(false);
  const { incrementCounter } = useCounter();

  const contentTypes = [
    { id: 'text' as ContentType, label: 'Not/Metin', icon: Type },
    { id: 'image' as ContentType, label: 'Resim', icon: ImageIcon },
    { id: 'video' as ContentType, label: 'Video', icon: Video },
    { id: 'file' as ContentType, label: 'Dosya', icon: FileText },
  ];

  const expirationOptions = [
    { id: '1day' as ExpirationType, label: '1 Gün' },
    { id: '1week' as ExpirationType, label: '1 Hafta' },
    { id: '1month' as ExpirationType, label: '1 Ay' },
    { id: '3months' as ExpirationType, label: '3 Ay' },
  ];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // File size validation (100MB limit)
    const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('Dosya boyutu çok büyük (Max 100MB)');
      return;
    }

    setFile(selectedFile);
    setError('');
    setUploading(true);

    // Upload file immediately
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setUploadedFilePath(data.url);
      } else {
        setError(data.error || 'Dosya yüklenirken hata oluştu');
      }
    } catch (err) {
      setError('Sunucu bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.');
    } finally {
      setUploading(false);
    }
  };

  const isButtonDisabled = () => {
    if (loading || uploading) return true;
    if (contentType === 'text' && !text.trim()) return true;
    if (contentType !== 'text' && !uploadedFilePath) return true;
    return false;
  };

  const generateQRCode = async () => {
    setLoading(true);
    setError('');

    try {
      if (contentType === 'text' && !text) {
        setError('Lütfen bir metin girin');
        setLoading(false);
        return;
      }

      if (contentType !== 'text' && !uploadedFilePath) {
        setError('Lütfen bir dosya seçin ve yükleyin');
        setLoading(false);
        return;
      }

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: contentType === 'text' ? text : '',
          contentType,
          fileName: file?.name || null,
          filePath: uploadedFilePath || null,
          expiration,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setQrCodeId(data.id);
        const qrLink = 'https://lux-qr-delta.vercel.app/view/' + data.id;
        setQrCodeUrl(qrLink);
        incrementCounter();
      } else {
        setError(data.error || 'QR kod oluşturulurken hata oluştu');
      }
    } catch (err) {
      setError('QR kod oluşturulurken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `luxqr-${qrCodeId}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(qrCodeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'LuxQr - QR Kodum',
          text: 'LuxQr ile yeni bir QR kod oluşturdum, Hemen QR kodumu tarat.\n\nSenden de QR oluştur: https://luxqrpro.site',
          url: qrCodeUrl,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(qrCodeUrl);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const handleShareImage = async () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;

    try {
      // Convert SVG to canvas
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = async () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        // Convert canvas to blob
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          
          const file = new File([blob], 'luxqr.png', { type: 'image/png' });
          
          if (navigator.share && navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({
                title: 'LuxQr - QR Kodum',
                text: 'LuxQr ile yeni bir QR kod oluşturdum, içeriğe ulaşmak için kodu taratabilirsin! 👇\n\nhttps://luxqrpro.site',
                files: [file],
              });
            } catch (err) {
              console.error('Image share failed:', err);
              // Fallback: download
              downloadQRCode();
            }
          } else {
            // Fallback: download
            downloadQRCode();
          }
        }, 'image/png');
      };

      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    } catch (err) {
      console.error('Failed to share image:', err);
      // Fallback: download
      downloadQRCode();
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Vertical Ad */}
        <div className="hidden lg:block sticky top-4 h-[80vh]">
          <AdBanner
            slot="sol_dikey"
            format="vertical"
            responsive={false}
            className="h-full"
          />
        </div>

        {/* Main Content Area - QR Generator */}
        <div className="col-span-1 lg:col-span-2">
          <div className="px-4 py-12 -ml-80">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
                <div className="relative flex items-center justify-center gap-3 mb-3">
                  <QrCode className="w-10 h-10 md:w-12 md:h-12 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
                  <h1 className="text-5xl md:text-6xl font-bold text-white">
                    LuxQr
                  </h1>
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-300">
                Modern{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                  QR Kod Oluşturma
                </span>
              </p>
            </motion.div>

        <div className="max-w-3xl mx-auto">
          {!qrCodeId ? (
            <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-8">
              {/* Content Type Selection */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  İçerik Türü
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {contentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setContentType(type.id);
                        setFile(null);
                        setUploadedFilePath('');
                        setText('');
                        setError('');
                      }}
                      className={cn(
                        'p-4 rounded-xl border transition-all duration-200 flex flex-col items-center gap-2',
                        contentType === type.id
                          ? 'glow-border-active border-blue-500 bg-blue-500/10'
                          : 'glow-border border-white/10 bg-white/5 hover:border-white/30'
                      )}
                    >
                      <type.icon className={cn(
                        'w-6 h-6',
                        contentType === type.id ? 'text-blue-500' : 'text-gray-400'
                      )} />
                      <span className={cn(
                        'text-sm font-medium',
                        contentType === type.id ? 'text-blue-500' : 'text-gray-300'
                      )}>
                        {type.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Input */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  İçerik
                </h2>
                {contentType === 'text' ? (
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Metninizi buraya yazın..."
                    className="w-full h-32 p-4 rounded-xl bg-white/5 glow-border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                ) : (
                  <div className="glow-border border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-white/40 transition-colors">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept={
                        contentType === 'image' 
                          ? 'image/png,image/jpeg,image/gif,image/webp' 
                          : contentType === 'video' 
                          ? 'video/mp4,video/webm,video/quicktime' 
                          : '.pdf,.docx,.zip,.txt,.png,.jpg,.jpeg,.gif,.mp4,.webm'
                      }
                      className="hidden"
                      id="file-input"
                      disabled={uploading}
                    />
                    <label
                      htmlFor="file-input"
                      className={`cursor-pointer flex flex-col items-center gap-3 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {uploading ? (
                        <>
                          <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <div>
                            <p className="text-white font-medium">
                              Dosya yükleniyor...
                            </p>
                            <p className="text-gray-500 text-sm mt-1">
                              Lütfen bekleyin
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <Upload className="w-10 h-10 text-gray-400" />
                          <div>
                            <p className="text-white font-medium">
                              {file ? file.name : 'Dosya seçmek için tıklayın'}
                            </p>
                            <p className="text-gray-500 text-sm mt-1">
                              {contentType === 'image' 
                                ? 'PNG, JPG, GIF, WebP (Max 100MB)' 
                                : contentType === 'video' 
                                ? 'MP4, WebM, MOV (Max 100MB)' 
                                : 'PDF, DOCX, ZIP, TXT, Resim, Video (Max 100MB)'}
                            </p>
                          </div>
                        </>
                      )}
                    </label>
                  </div>
                )}
              </div>

              {/* Expiration Selection */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  Geçerlilik Süresi
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {expirationOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setExpiration(option.id)}
                      className={cn(
                        'p-3 rounded-xl border transition-all duration-200 flex items-center justify-center gap-2',
                        expiration === option.id
                          ? 'glow-border-active border-blue-500 bg-blue-500/10'
                          : 'glow-border border-white/10 bg-white/5 hover:border-white/30'
                      )}
                    >
                      <Clock className={cn(
                        'w-4 h-4',
                        expiration === option.id ? 'text-blue-500' : 'text-gray-400'
                      )} />
                      <span className={cn(
                        'text-sm font-medium',
                        expiration === option.id ? 'text-blue-500' : 'text-gray-300'
                      )}>
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 rounded-xl glow-border bg-red-500/10 border-red-500/30 text-red-400 text-center">
                  {error}
                </div>
              )}

              {/* Generate Button */}
              <button
                onClick={generateQRCode}
                disabled={isButtonDisabled()}
                className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed glow-border-strong flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    QR Kod Oluşturuluyor...
                  </>
                ) : uploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Yükleniyor...
                  </>
                ) : (
                  'QR Kod Oluştur'
                )}
              </button>
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-8 text-center">
              <div className="mb-6">
                <CheckCircle className="w-14 h-14 text-blue-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">QR Kodunuz Hazır!</h2>
                <p className="text-gray-400">QR kodunuz başarıyla oluşturuldu</p>
              </div>

              <div className="bg-white rounded-xl p-6 inline-block mb-6 glow-border">
                <QRCodeSVG
                  id="qr-code-svg"
                  value={qrCodeUrl}
                  size={256}
                  level="H"
                  includeMargin={true}
                  bgColor="#ffffff"
                  fgColor="#000000"
                />
              </div>

              <div className="space-y-4">
                {/* Desktop URL Display */}
                <div className="hidden md:block p-4 rounded-xl glow-border bg-white/5 border-white/10">
                  <p className="text-gray-400 text-sm mb-1">QR Kod URL</p>
                  <p className="text-blue-400 font-mono text-sm break-all">{qrCodeUrl}</p>
                </div>

                <div className="grid grid-cols-2 lg:flex gap-2 lg:gap-4 justify-center">
                  <button
                    onClick={downloadQRCode}
                    className="flex items-center justify-center gap-1 lg:gap-2 px-3 py-2 lg:px-6 lg:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm lg:text-base font-semibold transition-colors glow-border"
                  >
                    <Download className="w-4 h-4 lg:w-5 lg:h-5" />
                    İndir
                  </button>
                  <button
                    onClick={handleShareLink}
                    className="flex items-center justify-center gap-1 lg:gap-2 px-3 py-2 lg:px-6 lg:py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm lg:text-base font-semibold transition-colors glow-border"
                  >
                    {shared ? (
                      <>
                        <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5" />
                        Link panoya kopyalandı!
                      </>
                    ) : (
                      <>
                        <LinkIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                        Linki Paylaş
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleShareImage}
                    className="flex items-center justify-center gap-1 lg:gap-2 px-3 py-2 lg:px-6 lg:py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm lg:text-base font-semibold transition-colors glow-border"
                  >
                    {imageShared ? (
                      <>
                        <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5" />
                        İndirildi!
                      </>
                    ) : (
                      <>
                        <QrCode className="w-4 h-4 lg:w-5 lg:h-5" />
                        QR Paylaş
                      </>
                    )}
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center justify-center gap-1 lg:gap-2 px-3 py-2 lg:px-6 lg:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm lg:text-base font-semibold transition-colors glow-border"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5" />
                        Kopyalandı!
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 lg:w-5 lg:h-5" />
                        Linki Kopyala
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setQrCodeId('');
                      setQrCodeUrl('');
                      setText('');
                      setFile(null);
                      setUploadedFilePath('');
                    }}
                    className="col-span-2 lg:col-span-1 flex items-center justify-center gap-1 lg:gap-2 px-3 py-2 lg:px-6 lg:py-3 rounded-xl bg-white/10 glow-border border-white/20 text-white text-sm lg:text-base font-semibold hover:bg-white/20 transition-colors"
                  >
                    Yeni QR Kod
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SEO Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-6xl mx-auto mt-16 space-y-12"
        >
          {/* Horizontal Banner Ad - Above "How It Works" */}
          <AdBanner
            slot="yazi_ustu_1"
            format="horizontal"
            responsive={true}
            className="w-full"
          />

          {/* How It Works - Two Column Layout */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
                <h2 className="relative text-5xl md:text-6xl font-bold text-white mb-4">
                  Sistemimizle Adım Adım{' '}
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                    QR Kodları
                  </span>{' '}
                  Oluşturun
                </h2>
              </div>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Dijital içeriklerinizi saniyeler içinde yüksek kaliteli ve güvenli QR kodlara dönüştürün.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left Column - UI Illustration */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-3xl p-8 relative overflow-hidden">
                  {/* Glassmorphism UI Mockup */}
                  <div className="space-y-4">
                    {/* Mock Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 glow-border flex items-center justify-center">
                        <QrCode className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="h-4 bg-white/20 rounded w-24 mb-2"></div>
                        <div className="h-3 bg-white/10 rounded w-32"></div>
                      </div>
                    </div>

                    {/* Mock Content Type Selection */}
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {[1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className={`p-3 rounded-xl border ${
                            i === 1
                              ? 'glow-border-active border-blue-500 bg-blue-500/10'
                              : 'glow-border border-white/10 bg-white/5'
                          }`}
                        >
                          <div className="w-4 h-4 rounded-full mx-auto mb-2 bg-blue-400/50"></div>
                          <div className="h-2 bg-white/20 rounded"></div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Mock Content Input */}
                    <div className="p-4 rounded-xl glow-border bg-white/5 border-white/10 mb-4">
                      <div className="h-3 bg-white/10 rounded w-full mb-2"></div>
                      <div className="h-3 bg-white/10 rounded w-3/4"></div>
                    </div>

                    {/* Mock Expiration */}
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {[1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                          className={`p-2 rounded-xl border ${
                            i === 2
                              ? 'glow-border-active border-blue-500 bg-blue-500/10'
                              : 'glow-border border-white/10 bg-white/5'
                          }`}
                        >
                          <div className="h-2 bg-white/20 rounded"></div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Mock Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="h-12 rounded-xl bg-blue-600 glow-border-strong"
                    ></motion.div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500/20 rounded-full blur-xl"></div>
                </div>
              </motion.div>

              {/* Right Column - Step by Step */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/5 backdrop-blur-sm glow-border rounded-2xl p-6 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/20 glow-border flex items-center justify-center">
                      <Type className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Seçim Yapın</h3>
                      <p className="text-gray-400">
                        İçerik türünü (Metin, Dosya, Video) belirleyin.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/5 backdrop-blur-sm glow-border rounded-2xl p-6 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/20 glow-border flex items-center justify-center">
                      <UploadCloud className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Buluta Yükleyin</h3>
                      <p className="text-gray-400">
                        Verinizi şifreli Vercel Blob depolarımıza aktarın.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/5 backdrop-blur-sm glow-border rounded-2xl p-6 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/20 glow-border flex items-center justify-center">
                      <Share2 className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">QR Kodunuz Hazır</h3>
                      <p className="text-gray-400">
                        Saniyeler içinde oluşan kodu indirin veya link olarak paylaşın.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Horizontal Banner Ad - Above "Why LuxQr" */}
          <AdBanner
            slot="yazi_ustu_2"
            format="horizontal"
            responsive={true}
            className="w-full"
          />

          {/* Why LuxQr */}
          <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-blue-500/20 glow-border">
                <Sparkles className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                Neden LuxQr Kullanmalısınız?
              </h2>
            </div>
            
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                LuxQr, dijital dünyada dosya ve metin paylaşımını saniyeler içinde gerçekleştiren 
                yenilikçi bir QR kod platformudur. Geleneksel paylaşım yöntemlerinin karmaşıklığına 
                son vererek, kullanıcıların metin, resim, video ve dosyalarını güvenli ve hızlı bir 
                şekilde paylaşmalarını sağlar.
              </p>
              
              <p>
                <strong className="text-white">Hız ve Performans:</strong> LuxQr, Next.js 14 ve modern 
                web teknolojileri ile oluşturulmuş olup, QR kodlarınızı milisaniyeler içinde oluşturur. 
                Vercel'in güçlü altyapısı sayesinde, dünya çapında anında erişilebilir ve kesintisiz 
                bir deneyim sunar.
              </p>
              
              <p>
                <strong className="text-white">Güvenlik ve Gizlilik:</strong> Verileriniz Vercel KV ve 
                Blob teknolojileri ile şifreli olarak saklanır. Kişisel bilgilerinizi toplamayız ve 
                paylaşımlarınız sadece QR kod URL'sini bilen kişiler tarafından erişilebilir. 
                Geçerlilik süresi seçeneği ile verilerinizin ne kadar süre saklanacağını siz kontrol 
                edersiniz. Süresi dolan paylaşımlar otomatik olarak sistemden temizlenir.
              </p>
              
              <p>
                <strong className="text-white">Modern Tasarım:</strong> LuxQr, kullanıcı dostu arayüzü, 
                akıcı animasyonları ve şık tasarımı ile mükemmel bir kullanıcı deneyimi sunar. Mobil 
                uyumlu ve responsive yapısı sayesinde her cihazda kusursuz çalışır. Framer Motion ile 
                güçlendirilmiş animasyonlar, uygulamanızı sadece işlevsel değil, aynı zamanda görsel 
                olarak da çekici kılar.
              </p>
              
              <p>
                İster kişisel kullanım, ister iş amaçlı olsun, LuxQr ile paylaşım sürecinizi basitleştirin 
                ve dijital iletişiminizi bir üst seviyeye taşıyın.
              </p>
            </div>
          </div>
        </motion.div>
          </div>
        </div>

        {/* Random Blogs - Right Side */}
        <div className="hidden lg:block">
          <RandomBlogs />
        </div>
      </div>

      {/* Bottom Ad Placeholder - 728x90 */}
      {/* <div className="hidden md:block container mx-auto px-4 py-4">
        <div className="w-full h-[90px] border border-white/10 rounded-xl bg-white/5 flex items-center justify-center mx-auto max-w-[728px]">
          <p className="text-gray-500 text-xs text-center px-2">Reklam Alanı 728x90</p>
        </div>
      </div> */}
    </motion.main>
  );
}
