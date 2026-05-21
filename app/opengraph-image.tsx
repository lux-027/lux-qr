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
        {/* Background Glow Effect */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '60px',
            zIndex: 1,
          }}
        >
          {/* QR Code Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '280px',
              height: '280px',
              borderRadius: '32px',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
              border: '6px solid #3b82f6',
              boxShadow: '0 0 60px rgba(59, 130, 246, 0.6), 0 0 120px rgba(139, 92, 246, 0.4)',
            }}
          >
            <svg
              width="180"
              height="180"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.8))',
              }}
            >
              <rect x="3" y="3" width="7" height="7" rx="1" fill="#3b82f6" />
              <rect x="14" y="3" width="7" height="7" rx="1" fill="#3b82f6" />
              <rect x="3" y="14" width="7" height="7" rx="1" fill="#3b82f6" />
              <rect x="5" y="5" width="3" height="3" rx="0.5" fill="#0f172a" />
              <rect x="16" y="5" width="3" height="3" rx="0.5" fill="#0f172a" />
              <rect x="5" y="16" width="3" height="3" rx="0.5" fill="#0f172a" />
              <rect x="12" y="12" width="4" height="4" rx="1" fill="#8b5cf6" />
              <rect x="12" y="6" width="2" height="2" rx="0.5" fill="#8b5cf6" />
              <rect x="6" y="12" width="2" height="2" rx="0.5" fill="#8b5cf6" />
              <rect x="16" y="14" width="2" height="2" rx="0.5" fill="#8b5cf6" />
              <rect x="14" y="16" width="2" height="2" rx="0.5" fill="#8b5cf6" />
            </svg>
          </div>

          {/* Text Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: '#ffffff',
                margin: 0,
                letterSpacing: '2px',
                textShadow: '0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(139, 92, 246, 0.6)',
              }}
            >
              LuxQr
            </h1>
            <p
              style={{
                fontSize: '36px',
                fontWeight: '600',
                color: '#94a3b8',
                margin: 0,
                letterSpacing: '1px',
              }}
            >
              Premium QR Code Generator
            </p>
            <div
              style={{
                display: 'flex',
                gap: '16px',
                marginTop: '10px',
              }}
            >
              <span
                style={{
                  fontSize: '24px',
                  color: '#3b82f6',
                  fontWeight: '500',
                }}
              >
                ✓ Hızlı
              </span>
              <span
                style={{
                  fontSize: '24px',
                  color: '#8b5cf6',
                  fontWeight: '500',
                }}
              >
                ✓ Güvenli
              </span>
              <span
                style={{
                  fontSize: '24px',
                  color: '#3b82f6',
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
