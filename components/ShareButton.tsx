'use client';

import { Share2 } from 'lucide-react';
import { showNotification } from '@/components/Notification';

export default function ShareButton() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'LuxQr - Premium QR Code Generator',
          text: 'Dijital içeriklerinizi saniyeler içinde yüksek kaliteli QR kodlara dönüştürün!',
          url: 'https://www.luxqrpro.site',
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText('https://www.luxqrpro.site');
        showNotification('Link panoya kopyalandı!', 'success');
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-white transition-all duration-200 border border-white/10 hover:border-white/20 -ml-2"
      title="Siteyi Paylaş"
    >
      <Share2 className="w-5 h-5" />
    </button>
  );
}
