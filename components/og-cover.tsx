import { ImageResponse } from 'next/og';

export const alt = 'LuxQr - Ücretsiz QR Kod Oluşturucu';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function ogCoverImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #0891b2 100%)',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Decorative blurred orbs */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            left: -80,
            width: 420,
            height: 420,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.16)',
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -140,
            right: -60,
            width: 520,
            height: 520,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.12)',
            filter: 'blur(100px)',
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 22,
            marginBottom: 28,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 92,
              height: 92,
              borderRadius: 24,
              background: 'rgba(255, 255, 255, 0.18)',
              border: '2px solid rgba(255, 255, 255, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 24px 48px rgba(0, 0, 0, 0.18)',
            }}
          >
            <svg width="72" height="72" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="ogFaviconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
              <rect width="32" height="32" rx="6" fill="url(#ogFaviconGradient)" />
              <rect x="6" y="6" width="8" height="8" rx="1" fill="white" />
              <rect x="8" y="8" width="4" height="4" rx="0.5" fill="url(#ogFaviconGradient)" />
              <rect x="18" y="6" width="8" height="8" rx="1" fill="white" />
              <rect x="20" y="8" width="4" height="4" rx="0.5" fill="url(#ogFaviconGradient)" />
              <rect x="6" y="18" width="8" height="8" rx="1" fill="white" />
              <rect x="8" y="20" width="4" height="4" rx="0.5" fill="url(#ogFaviconGradient)" />
              <rect x="14" y="14" width="4" height="4" rx="0.5" fill="white" />
            </svg>
          </div>
          <span style={{ fontSize: 64, fontWeight: 900, letterSpacing: -1.5 }}>LuxQr</span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 52,
            fontWeight: 800,
            marginBottom: 18,
            zIndex: 1,
            textAlign: 'center',
          }}
        >
          Ücretsiz QR Kod Oluşturucu
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 28,
            fontWeight: 500,
            opacity: 0.92,
            zIndex: 1,
            textAlign: 'center',
          }}
        >
          Metin • WiFi • Kartvizit • Sosyal Medya • Dosya
        </p>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
