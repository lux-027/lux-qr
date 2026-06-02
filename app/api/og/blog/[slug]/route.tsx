import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/db';

export const runtime = 'edge';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await getPostBySlug(params.slug);

    if (!post) {
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
              backgroundColor: '#0f172a',
              fontSize: 60,
              fontWeight: 700,
              color: '#fff',
            }}
          >
            <div>Yazı Bulunamadı</div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#0f172a',
            backgroundImage: 'linear-gradient(to bottom right, #1e293b, #0f172a)',
            position: 'relative',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)
              `,
            }}
          />

          {/* Content */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 80,
              height: '100%',
            }}
          >
            {/* Logo/Brand */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginBottom: 40,
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 32,
                  fontWeight: 700,
                  color: '#fff',
                }}
              >
                QR
              </div>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: '#fff',
                }}
              >
                LuxQr
              </div>
            </div>

            {/* Category Badge */}
            <div
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                border: '2px solid rgba(59, 130, 246, 0.5)',
                borderRadius: 20,
                fontSize: 20,
                fontWeight: 600,
                color: '#60a5fa',
                marginBottom: 32,
                alignSelf: 'flex-start',
              }}
            >
              {post.category}
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: 52,
                fontWeight: 800,
                color: '#fff',
                lineHeight: 1.2,
                marginBottom: 24,
                maxWidth: 1000,
              }}
            >
              {post.title}
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: 24,
                color: '#94a3b8',
                lineHeight: 1.5,
                maxWidth: 900,
                marginBottom: 40,
              }}
            >
              {post.description}
            </div>

            {/* Footer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                fontSize: 18,
                color: '#64748b',
              }}
            >
              <div>
                {new Date(post.createdAt).toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
              <div style={{ color: '#475569' }}>•</div>
              <div>luxqrpro.site</div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 400,
              height: 400,
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), transparent)',
              borderRadius: '50%',
              filter: 'blur(80px)',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
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
            backgroundColor: '#0f172a',
            fontSize: 60,
            fontWeight: 700,
            color: '#fff',
          }}
        >
          <div>Hata Oluştu</div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}
