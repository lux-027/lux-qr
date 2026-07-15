import type { Metadata } from 'next';
import BioLinkContent from '@/components/BioLinkContent';

export const metadata: Metadata = {
  title: "Bio Link / Link Ağacı QR Kod Oluşturucu | LuxQr",
  description: "Tüm sosyal medya ve web linklerinizi tek bir sayfada toplayın. Bio link QR kodu oluşturun.",
  keywords: ["bio link qr kod", "link ağacı qr kod", "linktree qr kod", "sosyal medya link qr kod"],
  openGraph: {
    title: "Bio Link / Link Ağacı QR Kod Oluşturucu | LuxQr",
    description: "Tüm sosyal medya ve web linklerinizi tek bir sayfada toplayın.",
    url: "https://luxqrpro.site/qr/bio-link",
    type: "website",
  },
  twitter: {
    title: "Bio Link / Link Ağacı QR Kod Oluşturucu",
    description: "Tüm sosyal medya ve web linklerinizi tek bir sayfada toplayın.",
  },
};

export default function BioLinkPage() {
  return <BioLinkContent />;
}
