'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertCircle, 
  Download, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Type,
  Clock,
  Copy,
  Check,
  Plus,
  Home,
  QrCode
} from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import Link from 'next/link';

type QrCodeData = {
  id: string;
  content: string;
  contentType: string;
  fileName: string | null;
  filePath: string | null;
  expiresAt: string | null;
  createdAt: string;
};

export default function ViewPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<QrCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchQrCode();
  }, [params.id]);

  const fetchQrCode = async () => {
    try {
      const response = await fetch(`/api/qr/${params.id}`);
      const result = await response.json();

      if (result.success) {
        setData(result.data);
        // Client-side expiration check for extra safety
        if (result.data.expiresAt && new Date() > new Date(result.data.expiresAt)) {
          setExpired(true);
          setData(null);
        }
      } else if (result.expired) {
        setExpired(true);
      } else {
        setError('QR kod bulunamadı');
      }
    } catch (err) {
      setError('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadFile = () => {
    if (data?.filePath) {
      const link = document.createElement('a');
      link.href = data.filePath;
      link.download = data.fileName || 'download';
      link.click();
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Yükleniyor...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Hata</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </main>
    );
  }

  if (expired) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-3xl p-10 max-w-md w-full text-center border border-red-500/20"
        >
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Clock className="w-20 h-20 text-red-500 mx-auto mb-6" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-3">Süre Doldu</h2>
          <p className="text-gray-400 mb-8 text-lg leading-relaxed">
            Bu QR kodun geçerlilik süresi dolmuştur. İçeriğe erişim güvenlik nedeniyle engellenmiştir.
          </p>
          <div className="p-5 rounded-2xl glow-border bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/30">
            <p className="text-red-400 font-mono text-sm tracking-wider">LUXQR • EXPIRED</p>
          </div>
        </motion.div>
      </main>
    );
  }

  const getIcon = () => {
    switch (data?.contentType) {
      case 'text':
        return <Type className="w-12 h-12 text-blue-500" />;
      case 'image':
        return <ImageIcon className="w-12 h-12 text-blue-500" />;
      case 'video':
        return <Video className="w-12 h-12 text-blue-500" />;
      case 'file':
        return <FileText className="w-12 h-12 text-blue-500" />;
      default:
        return <FileText className="w-12 h-12 text-blue-500" />;
    }
  };

  const renderContent = () => {
    if (!data) return null;

    switch (data.contentType) {
      case 'text':
        return (
          <div className="relative">
            <div className="p-6 rounded-2xl glow-border bg-gradient-to-br from-white/5 to-white/0 border-white/10 backdrop-blur-sm">
              <p className="text-white whitespace-pre-wrap text-lg leading-relaxed font-light">{data.content}</p>
            </div>
            <button
              onClick={copyToClipboard}
              className="mt-4 flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200 glow-border mx-auto"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Kopyalandı' : 'Kopyala'}
            </button>
          </div>
        );
      case 'image':
        return (
          <div className="rounded-2xl overflow-hidden glow-border border-2 border-white/10 backdrop-blur-sm">
            <img
              src={data.filePath || ''}
              alt={data.fileName || 'Image'}
              className="w-full h-auto max-h-[600px] object-contain bg-black"
            />
          </div>
        );
      case 'video':
        return (
          <div className="rounded-2xl overflow-hidden glow-border border-2 border-white/10 backdrop-blur-sm">
            <video
              src={data.filePath || ''}
              controls
              className="w-full h-auto max-h-[600px] bg-black"
            />
          </div>
        );
      case 'file':
        return (
          <div className="p-10 rounded-2xl glow-border bg-gradient-to-br from-white/5 to-white/0 border-white/10 text-center backdrop-blur-sm">
            <FileText className="w-20 h-20 text-blue-500 mx-auto mb-6" />
            <p className="text-white font-medium mb-2 text-xl">{data.fileName}</p>
            <button
              onClick={downloadFile}
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200 glow-border mx-auto"
            >
              <Download className="w-5 h-5" />
              Dosyayı İndir
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      <div className="container mx-auto px-4 py-12">
        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 glow-border border-white/10 text-white hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-blue-400" />
              <span className="font-bold">LuxQr</span>
            </div>
            <div className="w-px h-4 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Ana Sayfaya Dön
            </div>
          </Link>
        </motion.div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-white">
            LuxQr
          </h1>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              {getIcon()}
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {data?.contentType === 'text' ? 'Not' : 
                   data?.contentType === 'image' ? 'Resim' : 
                   data?.contentType === 'video' ? 'Video' : 'Dosya'}
                </h2>
                {data?.fileName && (
                  <p className="text-gray-400 text-sm">{data.fileName}</p>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="mb-6">
              {renderContent()}
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
              {/* QR URL Section */}
              <div className="p-4 rounded-xl glow-border bg-white/5 border-white/10">
                <p className="text-gray-400 text-sm mb-2 hidden md:block">QR Kod URL</p>
                <div className="flex items-center gap-2">
                  <a
                    href={typeof window !== 'undefined' ? window.location.href : ''}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-blue-400 font-mono text-sm break-all hover:text-blue-300 transition-colors hidden md:block"
                  >
                    {typeof window !== 'undefined' ? window.location.href : ''}
                  </a>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm transition-colors glow-border"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Kopyalandı' : 'Kopyala'}
                  </button>
                </div>
              </div>

              {/* Info and Actions */}
              <div className="flex flex-wrap gap-4 justify-between items-center">
                <div className="text-sm text-gray-400">
                  <p>Oluşturulma: {data && format(new Date(data.createdAt), 'dd MMM yyyy HH:mm', { locale: tr })}</p>
                  {data?.expiresAt && (
                    <p>Son Kullanma: {format(new Date(data.expiresAt), 'dd MMM yyyy HH:mm', { locale: tr })}</p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 glow-border text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Kendi QR Oluştur
                  </Link>
                  <div className="text-blue-500 font-mono text-sm">
                    LuxQr
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
