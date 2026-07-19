import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, QrCode, Clock, ArrowLeft } from 'lucide-react';
import { getPostBySlug } from '@/lib/db';
import ShareButton from './ShareButton';
import RelatedPostsCarousel from './RelatedPostsCarousel';
import BlogContent from '@/components/BlogContent';

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
        type: 'article',
        locale: 'tr_TR',
        images: '/luxqrlogo2.png',
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
        creator: '@luxqrpro',
        images: '/luxqrlogo2.png',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'LuxQr Blog',
    };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  let post: any = null;
  try {
    post = await getPostBySlug(params.slug);
  } catch (error) {
    console.error('Error fetching post:', error);
  }

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-gray-900 mb-4">Yazı Bulunamadı</h1>
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
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto mb-4 md:mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Blog&apos;a Dön
          </Link>
        </div>

        {/* Article */}
        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            {/* Info Bar */}
            <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-50 backdrop-blur-sm rounded-xl border border-gray-200">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">
                <QrCode className="w-4 h-4" />
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>{Math.ceil((post.content?.split(' ')?.length || 0) / 200)} dk okuma</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar className="w-4 h-4 text-blue-400" />
                {new Date(post.createdAt).toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600">
              {post.description}
            </p>
          </div>

          {/* Main Image and Content */}
          <div className="flex flex-col gap-8">
            {/* Main Image */}
            {post.mainImage && (
              <div className="w-full max-w-lg mx-auto">
                <div className="rounded-xl overflow-hidden shadow-2xl glow-border">
                  <img
                    src={post.mainImage}
                    alt={post.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}

            {/* Content Container */}
            <div className="max-w-4xl mx-auto">
              <BlogContent content={post.content} category={post.category} />
            </div>
          </div>

          {/* Share Section */}
          <div className="mt-8 flex items-center justify-between p-6 bg-gray-50 border border-gray-200 rounded-2xl">
            <div className="flex items-center gap-3">
              <QrCode className="w-5 h-5 text-blue-500" />
              <span className="text-gray-600">Bu yazıyı paylaş</span>
            </div>
            <ShareButton
              title={post.title}
              description={post.description}
              slug={post.slug}
            />
          </div>

          {/* Related Posts */}
          <RelatedPostsCarousel currentSlug={params.slug} />
        </article>
      </div>
    </main>
  );
}
