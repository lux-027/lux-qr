'use client';

import { Facebook, Twitter, Linkedin, Link2, Check } from 'lucide-react';
import { useState } from 'react';
import { showNotification } from './Notification';

interface SocialShareProps {
  title: string;
  url: string;
  description?: string;
}

export default function SocialShare({ title, url, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      showNotification('Link kopyalandı', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      showNotification('Kopyalama başarısız', 'error');
    }
  };

  const handleShare = (platform: string) => {
    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleShare('facebook')}
        className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        title="Facebook'ta paylaş"
      >
        <Facebook className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleShare('twitter')}
        className="p-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white transition-colors"
        title="Twitter'da paylaş"
      >
        <Twitter className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleShare('linkedin')}
        className="p-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition-colors"
        title="LinkedIn'de paylaş"
      >
        <Linkedin className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleShare('whatsapp')}
        className="p-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
        title="WhatsApp'ta paylaş"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.135-.05-.297-.15-.572-.297-.272-.15-.672-.371-1.072-.672-.398-.298-.848-.596-1.372-.596-.497 0-.922.173-1.247.497-.322.322-.497.722-.497 1.223 0 .672.223 1.272.672 1.797.747.872 1.647 1.572 2.672 2.097 1.023.522 2.047.747 3.047.747.997 0 1.997-.247 2.972-.747.472-.247.872-.547 1.172-.872.297-.322.497-.722.497-1.223 0-.497-.173-.897-.497-1.223z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.491a.75.75 0 0 0 .917.917l4.457-1.495A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.487 0-4.907-.745-6.967-2.148l-.432-.3-3.035 1.017 1.017-3.035-.3-.432A9.96 9.96 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
        </svg>
      </button>
      <button
        onClick={handleCopy}
        className="p-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-colors"
        title="Linki kopyala"
      >
        {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
