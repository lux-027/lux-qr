'use client';

import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  description: string;
  slug: string;
}

export default function ShareButton({ title, description, slug }: ShareButtonProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: description,
        url: `https://luxqrpro.site/blog/${slug}`,
      });
    } else {
      navigator.clipboard.writeText(`https://luxqrpro.site/blog/${slug}`);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
    >
      <Share2 className="w-4 h-4" />
      Paylaş
    </button>
  );
}
