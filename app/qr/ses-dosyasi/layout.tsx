import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MP3 ve Ses Dosyası QR Kod Dönüştürücü - LuxQR',
  description: 'Podcast, sesli not ve müzik dosyalarınızı (MP3, WAV) buluta yükleyip menülere veya sergilere özel sesli QR kodlar üretin.',
  keywords: ['ses dosyası qr kod', 'mp3 qr', 'müzik qr kod', 'audio qr', 'ses paylaşım qr'],
  openGraph: {
    title: 'MP3 ve Ses Dosyası QR Kod Dönüştürücü - LuxQR',
    description: 'Podcast, sesli not ve müzik dosyalarınızı (MP3, WAV) buluta yükleyip menülere veya sergilere özel sesli QR kodlar üretin.',
    url: 'https://luxqrpro.site/qr/ses-dosyasi',
    siteName: 'LuxQR',
    locale: 'tr_TR',
    type: 'website',
    images: '/favicon.svg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MP3 ve Ses Dosyası QR Kod Dönüştürücü - LuxQR',
    description: 'Podcast, sesli not ve müzik dosyalarınızı (MP3, WAV) buluta yükleyip menülere veya sergilere özel sesli QR kodlar üretin.',
    images: '/favicon.svg',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
