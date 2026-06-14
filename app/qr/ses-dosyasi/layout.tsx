import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ses Dosyası QR Kod Oluşturucu - LuxQr',
  description: 'Ses dosyalarınızı MP3, WAV formatında QR koda dönüştürün. Müzik ve ses içeriklerinizi paylaşın.',
  keywords: ['ses dosyası qr kod', 'mp3 qr', 'müzik qr kod', 'audio qr', 'ses paylaşım qr'],
  openGraph: {
    title: 'Ses Dosyası QR Kod Oluşturucu - LuxQr',
    description: 'Ses dosyalarınızı MP3, WAV formatında QR koda dönüştürün.',
    url: 'https://www.luxqrpro.site/qr/ses-dosyasi',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
