import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '24%',
          boxShadow: '0 0 60px rgba(59, 130, 246, 0.5)',
        }}
      >
        <svg
          width="512"
          height="512"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.6))',
          }}
        >
          <defs>
            <linearGradient id="faviconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          <rect width="32" height="32" rx="6" fill="url(#faviconGradient)" />
          <rect x="6" y="6" width="8" height="8" rx="1" fill="white" />
          <rect x="8" y="8" width="4" height="4" rx="0.5" fill="url(#faviconGradient)" />
          <rect x="18" y="6" width="8" height="8" rx="1" fill="white" />
          <rect x="20" y="8" width="4" height="4" rx="0.5" fill="url(#faviconGradient)" />
          <rect x="6" y="18" width="8" height="8" rx="1" fill="white" />
          <rect x="8" y="20" width="4" height="4" rx="0.5" fill="url(#faviconGradient)" />
          <rect x="14" y="14" width="4" height="4" rx="0.5" fill="white" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
