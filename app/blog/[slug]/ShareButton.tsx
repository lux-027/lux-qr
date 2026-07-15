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
      className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 transition-colors duration-200"
      title="Paylaş"
    >
      <Share2 className="w-4 h-4" strokeWidth={1.5} />
    </button>
  );
}
