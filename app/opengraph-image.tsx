import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Background Glow - matching page.tsx */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            background: 'rgba(59, 130, 246, 0.2)',
            filter: 'blur(80px)',
            borderRadius: '50%',
          }}
        />
        
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '80px',
            zIndex: 1,
          }}
        >
          {/* QR Code Logo - matching page.tsx QrCode component */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '320px',
              height: '320px',
              borderRadius: '40px',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
              border: '8px solid #3b82f6',
              boxShadow: '0 0 60px rgba(59, 130, 246, 0.5)',
            }}
          >
            <svg
              width="200"
              height="200"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.6))',
              }}
            >
              <rect x="3" y="3" width="7" height="7" rx="1" fill="#60a5fa" />
              <rect x="14" y="3" width="7" height="7" rx="1" fill="#60a5fa" />
              <rect x="3" y="14" width="7" height="7" rx="1" fill="#60a5fa" />
              <rect x="5" y="5" width="3" height="3" rx="0.5" fill="#0f172a" />
              <rect x="16" y="5" width="3" height="3" rx="0.5" fill="#0f172a" />
              <rect x="5" y="16" width="3" height="3" rx="0.5" fill="#0f172a" />
              <rect x="12" y="12" width="4" height="4" rx="1" fill="#a78bfa" />
              <rect x="12" y="6" width="2" height="2" rx="0.5" fill="#a78bfa" />
              <rect x="6" y="12" width="2" height="2" rx="0.5" fill="#a78bfa" />
              <rect x="16" y="14" width="2" height="2" rx="0.5" fill="#a78bfa" />
              <rect x="14" y="16" width="2" height="2" rx="0.5" fill="#a78bfa" />
            </svg>
          </div>

          {/* Text Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <h1
              style={{
                fontSize: '80px',
                fontWeight: 'bold',
                color: '#ffffff',
                margin: 0,
                letterSpacing: '2px',
                textShadow: '0 0 40px rgba(59, 130, 246, 0.6)',
              }}
            >
              LuxQr
            </h1>
            <p
              style={{
                fontSize: '40px',
                fontWeight: '600',
                color: '#94a3b8',
                margin: 0,
                letterSpacing: '1px',
              }}
            >
              Premium QR Generator
            </p>
            <div
              style={{
                display: 'flex',
                gap: '20px',
                marginTop: '8px',
              }}
            >
              <span
                style={{
                  fontSize: '28px',
                  color: '#60a5fa',
                  fontWeight: '500',
                }}
              >
                ✓ Hızlı
              </span>
              <span
                style={{
                  fontSize: '28px',
                  color: '#a78bfa',
                  fontWeight: '500',
                }}
              >
                ✓ Güvenli
              </span>
              <span
                style={{
                  fontSize: '28px',
                  color: '#60a5fa',
                  fontWeight: '500',
                }}
              >
                ✓ Modern
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
