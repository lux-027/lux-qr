import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ArrowLeft, QrCode, Share2 } from 'lucide-react';
import { getPostBySlug, getAllPosts } from '@/lib/db';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);

    if (!post) {
      return {
        title: 'Yazı Bulunamadı | LuxQr',
      };
    }

    return {
      title: `${post.title} | LuxQr`,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        url: `https://luxqrpro.site/blog/${post.slug}`,
        siteName: 'LuxQr',
        images: [
          {
            url: post.mainImage,
            width: 1200,
            height: 630,
          },
        ],
        type: 'article',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'LuxQr Blog',
    };
  }
}

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  let post = null;
  try {
    post = await getPostBySlug(params.slug);
  } catch (error) {
    console.error('Error fetching post:', error);
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Yazı Bulunamadı</h1>
          <Link href="/blog" className="text-blue-400 hover:text-blue-300">
            Blog'a Dön
          </Link>
        </div>
      </main>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: post.description,
    image: post.mainImage,
    datePublished: post.createdAt,
    author: {
      '@type': 'Organization',
      name: 'LuxQr',
    },
    publisher: {
      '@type': 'Organization',
      name: 'LuxQr',
      logo: {
        '@type': 'ImageObject',
        url: 'https://luxqrpro.site/icon.png',
      },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Blog'a Dön
          </Link>
        </div>

        {/* Article */}
        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar className="w-4 h-4" />
                {new Date(post.createdAt).toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>

            <p className="text-xl text-gray-300">
              {post.description}
            </p>
          </div>

          {/* Main Image */}
          {post.mainImage && (
            <div className="mb-8 rounded-2xl overflow-hidden glow-border">
              <img
                src={post.mainImage}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Content */}
          <div className="bg-white/5 backdrop-blur-sm glow-border rounded-2xl p-8">
            <div
              className="prose prose-invert prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Share Section */}
          <div className="mt-8 flex items-center justify-between p-6 bg-white/5 backdrop-blur-sm glow-border rounded-2xl">
            <div className="flex items-center gap-3">
              <QrCode className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">Bu yazıyı paylaş</span>
            </div>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: post.title,
                    text: post.description,
                    url: `https://luxqrpro.site/blog/${post.slug}`,
                  });
                } else {
                  navigator.clipboard.writeText(`https://luxqrpro.site/blog/${post.slug}`);
                }
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Paylaş
            </button>
          </div>
        </article>
      </div>
    </main>
  );
}
