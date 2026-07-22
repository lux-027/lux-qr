export type SocialPlatform =
  | 'instagram'
  | 'tiktok'
  | 'facebook'
  | 'youtube'
  | 'twitter'
  | 'linkedin'
  | 'whatsapp'
  | 'pinterest';

export interface PlatformSeo {
  id: SocialPlatform;
  label: string;
  title: string;
  metaDescription: string;
  keywords: string[];
  description: string;
}

export const SOCIAL_PLATFORM_SEO: PlatformSeo[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    title: 'Instagram QR Kodu Oluşturucu - Ücretsiz Instagram QR Kodu | LuxQr',
    metaDescription:
      'Instagram profil, reels ve storyleriniz için ücretsiz QR kod oluşturun. Takipçileriniz tek tıkla hesabınıza ulaşsın.',
    keywords: [
      'instagram qr kod',
      'instagram qr oluşturucu',
      'instagram profil qr',
      'instagram link qr',
      'ücretsiz instagram qr',
    ],
    description:
      'Instagram profil, reels ve storyleriniz için QR kod oluşturun. Takipçileriniz tek tıkla hesabınıza ulaşsın.',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    title: 'TikTok QR Kodu Oluşturucu - Ücretsiz TikTok QR Kodu | LuxQr',
    metaDescription:
      'TikTok profil ve videolarınız için ücretsiz QR kod oluşturun. İzleyicileriniz anında hesabınıza ulaşsın.',
    keywords: [
      'tiktok qr kod',
      'tiktok qr oluşturucu',
      'tiktok profil qr',
      'tiktok link qr',
      'ücretsiz tiktok qr',
    ],
    description:
      'TikTok profil ve videolarınız için QR kod oluşturun. İzleyicileriniz anında hesabınıza ulaşsın.',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    title: 'Facebook QR Kodu Oluşturucu - Ücretsiz Facebook QR Kodu | LuxQr',
    metaDescription:
      'Facebook sayfa ve profilleriniz için ücretsiz QR kod oluşturun. Müşterileriniz tek tıkla sayfanıza ulaşsın.',
    keywords: [
      'facebook qr kod',
      'facebook qr oluşturucu',
      'facebook sayfa qr',
      'facebook profil qr',
      'ücretsiz facebook qr',
    ],
    description:
      'Facebook sayfa ve profilleriniz için QR kod oluşturun. Müşterileriniz tek tıkla sayfanıza ulaşsın.',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    title: 'YouTube QR Kodu Oluşturucu - Ücretsiz YouTube QR Kodu | LuxQr',
    metaDescription:
      'YouTube kanal ve videolarınız için ücretsiz QR kod oluşturun. Aboneleriniz anında kanalınıza ulaşsın.',
    keywords: [
      'youtube qr kod',
      'youtube qr oluşturucu',
      'youtube kanal qr',
      'youtube video qr',
      'ücretsiz youtube qr',
    ],
    description:
      'YouTube kanal ve videolarınız için QR kod oluşturun. Aboneleriniz anında kanalınıza ulaşsın.',
  },
  {
    id: 'twitter',
    label: 'X / Twitter',
    title: 'X / Twitter QR Kodu Oluşturucu - Ücretsiz Twitter QR Kodu | LuxQr',
    metaDescription:
      'X (Twitter) profil ve gönderileriniz için ücretsiz QR kod oluşturun. Takipçileriniz tek tıkla profilinize ulaşsın.',
    keywords: [
      'twitter qr kod',
      'x qr kod',
      'twitter qr oluşturucu',
      'twitter profil qr',
      'ücretsiz twitter qr',
    ],
    description:
      'X (Twitter) profil ve gönderileriniz için QR kod oluşturun. Takipçileriniz tek tıkla profilinize ulaşsın.',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    title: 'LinkedIn QR Kodu Oluşturucu - Ücretsiz LinkedIn QR Kodu | LuxQr',
    metaDescription:
      'LinkedIn profil ve şirket sayfalarınız için ücretsiz QR kod oluşturun. İş ağınıza anında bağlantı sağlayın.',
    keywords: [
      'linkedin qr kod',
      'linkedin qr oluşturucu',
      'linkedin profil qr',
      'linkedin kartvizit qr',
      'ücretsiz linkedin qr',
    ],
    description:
      'LinkedIn profil ve şirket sayfalarınız için QR kod oluşturun. İş ağınıza anında bağlantı sağlayın.',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    title: 'WhatsApp QR Kodu Oluşturucu - Ücretsiz WhatsApp QR Kodu | LuxQr',
    metaDescription:
      'WhatsApp iletişim ve wa.me linkleriniz için ücretsiz QR kod oluşturun. Müşterileriniz doğrudan mesaj atsın.',
    keywords: [
      'whatsapp qr kod',
      'whatsapp qr oluşturucu',
      'wa.me qr kod',
      'whatsapp iletişim qr',
      'ücretsiz whatsapp qr',
    ],
    description:
      'WhatsApp iletişim ve wa.me linkleriniz için QR kod oluşturun. Müşterileriniz doğrudan mesaj atsın.',
  },
  {
    id: 'pinterest',
    label: 'Pinterest',
    title: 'Pinterest QR Kodu Oluşturucu - Ücretsiz Pinterest QR Kodu | LuxQr',
    metaDescription:
      'Pinterest profil ve panolarınız için ücretsiz QR kod oluşturun. Fikirlerinizi tek tıkla paylaşın.',
    keywords: [
      'pinterest qr kod',
      'pinterest qr oluşturucu',
      'pinterest profil qr',
      'pinterest pano qr',
      'ücretsiz pinterest qr',
    ],
    description:
      'Pinterest profil ve panolarınız için QR kod oluşturun. Fikirlerinizi tek tıkla paylaşın.',
  },
];

export const SOCIAL_PLATFORM_IDS = SOCIAL_PLATFORM_SEO.map((p) => p.id);
