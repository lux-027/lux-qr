import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SosyalMedyaContent from '@/components/SosyalMedyaContent';
import { SOCIAL_PLATFORM_SEO, type SocialPlatform } from '@/lib/socialPlatformSeo';

export function generateStaticParams() {
  return SOCIAL_PLATFORM_SEO.map((p) => ({ platform: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { platform: string };
}): Promise<Metadata> {
  const platform = params.platform as SocialPlatform;
  const seo = SOCIAL_PLATFORM_SEO.find((p) => p.id === platform);

  if (!seo) {
    return {};
  }

  const url = `https://luxqrpro.site/qr/sosyal-medya/${seo.id}`;

  return {
    title: seo.title,
    description: seo.metaDescription,
    keywords: seo.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: seo.title,
      description: seo.metaDescription,
      url,
      siteName: 'LuxQr',
      locale: 'tr_TR',
      type: 'website',
      images: '/favicon.svg',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.metaDescription,
      images: '/favicon.svg',
    },
  };
}

export default function PlatformSosyalMedyaPage({
  params,
}: {
  params: { platform: string };
}) {
  const platform = params.platform as SocialPlatform;
  const exists = SOCIAL_PLATFORM_SEO.some((p) => p.id === platform);

  if (!exists) {
    notFound();
  }

  return <SosyalMedyaContent initialPlatform={platform} />;
}
