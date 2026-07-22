import type { Metadata } from "next";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import LayoutWrapper from "@/components/LayoutWrapper";
import PageWrapper from "@/components/PageWrapper";
import Script from "next/script";
import { CounterProvider } from "@/context/CounterContext";
import { NotificationProvider } from "@/components/Notification";
import "./globals.css";

const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

const inter = Inter({ subsets: ["latin"], display: 'optional' });

export const metadata: Metadata = {
  metadataBase: new URL('https://luxqrpro.site'),
  title: {
    default: "LuxQr ⚡ Ücretsiz QR Kod Oluştur | WiFi, Kartvizit, Sosyal Medya",
    template: "%s | LuxQr"
  },
  description: "Türkiye'nin en hızlı ve ücretsiz QR kod oluşturucusu. Metin, WiFi, kartvizit, sosyal medya, ses ve dosyalarınız için saniyeler içinde QR kod hazırlayın. Şimdi ücretsiz deneyin!",
  keywords: ["qr kod oluşturucu", "ücretsiz qr kod", "bedava qr kod", "wifi qr kod", "kartvizit qr", "instagram qr", "tiktok qr", "metin qr", "dosya qr", "türkiye qr kod", "online qr kod", "hızlı qr kod", "qr kod yap"],
  authors: [{ name: "LuxQr Team" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" }
    ],
    apple: [
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" }
    ]
  },
  openGraph: {
    title: "LuxQr ⚡ Ücretsiz QR Kod Oluştur | WiFi, Kartvizit, Sosyal Medya",
    description: "Türkiye'nin en hızlı ve ücretsiz QR kod oluşturucusu. Metin, WiFi, kartvizit, sosyal medya, ses ve dosyalarınız için saniyeler içinde QR kod hazırlayın.",
    url: "https://luxqrpro.site",
    siteName: "LuxQR",
    locale: "tr_TR",
    type: "website",
    images: '/favicon.svg',
  },
  twitter: {
    card: "summary_large_image",
    title: "LuxQr ⚡ Ücretsiz QR Kod Oluşturucu",
    description: "Türkiye'nin en hızlı ve ücretsiz QR kod oluşturucusu. Metin, WiFi, kartvizit, sosyal medya ve ses dosyaları için saniyeler içinde QR kod oluşturun.",
    images: '/favicon.svg',
  },
  alternates: {
    canonical: './',
  },
  other: {
    "google-adsense-account": "ca-pub-6964506660604767",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="overflow-x-hidden" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://fundingchoicesmessages.google.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fundingchoicesmessages.google.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
        <meta charSet="UTF-8" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="LuxQr" />
        <Script
          id="structured-data-webapp"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "LuxQr - Ücretsiz QR Kod Oluşturucu",
              "description": "Türkiye'nin en gelişmiş QR kod oluşturucu. Metin, resim, video, belge, WiFi, kartvizit, sosyal medya ve ses dosyaları için ücretsiz QR kod oluşturun.",
              "url": "https://luxqrpro.site",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "TRY"
              },
              "featureList": [
                "Metin QR kod oluşturma",
                "WiFi QR kod oluşturma",
                "Kartvizit QR kod oluşturma",
                "Sosyal medya QR kod oluşturma",
                "Dosya QR kod oluşturma",
                "Ses dosyası QR kod oluşturma"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250",
                "bestRating": "5",
                "worstRating": "1"
              },
              "author": {
                "@type": "Organization",
                "name": "LuxQr Team",
                "url": "https://luxqrpro.site"
              }
            })
          }}
        />
        <Script
          id="structured-data-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "LuxQr",
              "url": "https://luxqrpro.site",
              "logo": "https://luxqrpro.site/favicon.svg",
              "description": "Türkiye'nin en gelişmiş QR kod oluşturucu",
              "sameAs": [
                "https://www.facebook.com/luxqr",
                "https://www.twitter.com/luxqr",
                "https://www.instagram.com/luxqr"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "info@luxqrpro.site"
              }
            })
          }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6964506660604767"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <CounterProvider>
          <NotificationProvider>
            <LayoutWrapper footer={<Footer />}>
              <PageWrapper>
                {children}
              </PageWrapper>
            </LayoutWrapper>
          </NotificationProvider>
        </CounterProvider>
      </body>
    </html>
  );
}
