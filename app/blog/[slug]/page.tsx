import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ArrowLeft, QrCode, Clock, User } from 'lucide-react';
import { getPostBySlug, getAllPosts } from '@/lib/db';
import ShareButton from './ShareButton';

interface PageProps {
  params: {
    slug: string;
  };
}

export const dynamic = "force-dynamic";

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
  let relatedPosts = [];
  try {
    post = await getPostBySlug(params.slug);
    if (post) {
      const allPosts = await getAllPosts();
      relatedPosts = allPosts
        .filter(p => p.slug !== post.slug)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    }
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
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <User className="w-4 h-4" />
                <span>LuxQr Team</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar className="w-4 h-4" />
                {new Date(post.createdAt).toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Clock className="w-4 h-4" />
                <span>{Math.ceil(post.content.split(' ').length / 200)} dk okuma</span>
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
          <div className="bg-white/5 backdrop-blur-sm glow-border rounded-2xl p-8 md:p-12">
            <div
              className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4 prose-strong:text-white prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-ul:text-gray-300 prose-ol:text-gray-300 prose-li:mb-2 prose-code:text-blue-300 prose-code:bg-blue-500/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Share Section */}
          <div className="mt-8 flex items-center justify-between p-6 bg-white/5 backdrop-blur-sm glow-border rounded-2xl">
            <div className="flex items-center gap-3">
              <QrCode className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">Bu yazıyı paylaş</span>
            </div>
            <ShareButton
              title={post.title}
              description={post.description}
              slug={post.slug}
            />
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6">Diğer Yazılar</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group bg-white/5 backdrop-blur-sm glow-border rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    {relatedPost.mainImage && (
                      <div className="mb-4 rounded-xl overflow-hidden">
                        <img
                          src={relatedPost.mainImage}
                          alt={relatedPost.title}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {relatedPost.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-blue-400 text-sm font-semibold group-hover:gap-3 transition-all">
                      Oku
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </main>
  );
}
