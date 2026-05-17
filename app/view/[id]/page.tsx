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
  Clock
} from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

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

  useEffect(() => {
    fetchQrCode();
  }, [params.id]);

  const fetchQrCode = async () => {
    try {
      const response = await fetch(`/api/qr/${params.id}`);
      const result = await response.json();

      if (result.success) {
        setData(result.data);
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
        <div className="bg-white/5 backdrop-blur-sm glow-border-strong rounded-2xl p-8 max-w-md w-full text-center">
          <Clock className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Süre Doldu</h2>
          <p className="text-gray-400 mb-6">
            Bu QR kodun süresi dolmuştur ve içeriğe erişim engellenmiştir.
          </p>
          <div className="p-4 rounded-xl glow-border bg-white/5 border-white/10">
            <p className="text-blue-500 font-mono text-sm">LuxQr</p>
          </div>
        </div>
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
          <div className="p-6 rounded-xl glow-border bg-white/5 border-white/10">
            <p className="text-white whitespace-pre-wrap">{data.content}</p>
          </div>
        );
      case 'image':
        return (
          <div className="rounded-xl overflow-hidden glow-border border-2 border-white/10">
            <img
              src={data.filePath || ''}
              alt={data.fileName || 'Image'}
              className="w-full h-auto max-h-96 object-contain bg-black"
            />
          </div>
        );
      case 'video':
        return (
          <div className="rounded-xl overflow-hidden glow-border border-2 border-white/10">
            <video
              src={data.filePath || ''}
              controls
              className="w-full h-auto max-h-96 bg-black"
            />
          </div>
        );
      case 'file':
        return (
          <div className="p-8 rounded-xl glow-border bg-white/5 border-white/10 text-center">
            <FileText className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <p className="text-white font-medium mb-2">{data.fileName}</p>
            <button
              onClick={downloadFile}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors mx-auto glow-border"
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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-12">
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
            <div className="flex flex-wrap gap-4 justify-between items-center pt-6 border-t border-white/10">
              <div className="text-sm text-gray-400">
                <p>Oluşturulma: {data && format(new Date(data.createdAt), 'dd MMM yyyy HH:mm', { locale: tr })}</p>
                {data?.expiresAt && (
                  <p>Son Kullanma: {format(new Date(data.expiresAt), 'dd MMM yyyy HH:mm', { locale: tr })}</p>
                )}
              </div>
              <div className="text-blue-500 font-mono text-sm">
                LuxQr
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
