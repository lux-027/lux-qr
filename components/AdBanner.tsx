'use client';

import { useEffect, useRef } from 'react';
import { ADS_ENABLED, getAdClassName } from '@/lib/ads';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
}

export default function AdBanner({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ADS_ENABLED && typeof window !== 'undefined' && (window as any).adsbygoogle) {
      try {
        (window as any).adsbygoogle.push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, []);

  if (!ADS_ENABLED) {
    return null;
  }

  return (
    <div ref={adRef} className={className}>
      <ins
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6964506660604767"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
