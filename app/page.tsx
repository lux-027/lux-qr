'use client';

import { useState } from 'react';
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
  Upload
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ContentType = 'text' | 'image' | 'video' | 'file';
type ExpirationType = '1day' | '1week' | '1month' | 'unlimited';

export default function Home() {
  const [contentType, setContentType] = useState<ContentType>('text');
  const [expiration, setExpiration] = useState<ExpirationType>('1day');
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFilePath, setUploadedFilePath] = useState('');
  const [qrCodeId, setQrCodeId] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    { id: 'unlimited' as ExpirationType, label: 'Süresiz' },
  ];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError('');

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
        setUploadedFilePath(data.filePath);
      } else {
        setError('Dosya yüklenirken hata oluştu');
      }
    } catch (err) {
      setError('Dosya yüklenirken hata oluştu');
    }
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3 text-white">
            LuxQr
          </h1>
          <p className="text-lg text-gray-400">
            Modern QR Kod Oluşturma
          </p>
        </div>

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
                      accept={contentType === 'image' ? 'image/*' : contentType === 'video' ? 'video/*' : '*/*'}
                      className="hidden"
                      id="file-input"
                    />
                    <label
                      htmlFor="file-input"
                      className="cursor-pointer flex flex-col items-center gap-3"
                    >
                      <Upload className="w-10 h-10 text-gray-400" />
                      <div>
                        <p className="text-white font-medium">
                          {file ? file.name : 'Dosya seçmek için tıklayın'}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          {contentType === 'image' ? 'PNG, JPG, GIF' : contentType === 'video' ? 'MP4, MOV, AVI' : 'Herhangi bir dosya'}
                        </p>
                      </div>
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
                disabled={loading}
                className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed glow-border-strong"
              >
                {loading ? 'QR Kod Oluşturuluyor...' : 'QR Kod Oluştur'}
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
                <div className="p-4 rounded-xl glow-border bg-white/5 border-white/10">
                  <p className="text-gray-400 text-sm mb-1">QR Kod URL</p>
                  <p className="text-blue-400 font-mono text-sm break-all">{qrCodeUrl}</p>
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={downloadQRCode}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors glow-border"
                  >
                    <Download className="w-5 h-5" />
                    İndir
                  </button>
                  <button
                    onClick={() => {
                      setQrCodeId('');
                      setQrCodeUrl('');
                      setText('');
                      setFile(null);
                      setUploadedFilePath('');
                    }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 glow-border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors"
                  >
                    Yeni QR Kod
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
