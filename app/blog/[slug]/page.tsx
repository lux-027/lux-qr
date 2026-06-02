import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ArrowLeft, QrCode, Clock, User, ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { getPostBySlug, getAllPosts } from '@/lib/db';
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
        images: [
          {
            url: `/api/og/blog/${post.slug}`,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        type: 'article',
        locale: 'tr_TR',
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
        images: [`/api/og/blog/${post.slug}`],
        creator: '@luxqrpro',
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
  let post: any = null;
  let relatedPosts: any[] = [];
  try {
    post = await getPostBySlug(params.slug);
    if (post) {
      const allPosts = await getAllPosts();
      relatedPosts = allPosts
        .filter((p: any) => p.slug !== post.slug)
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
        {/* Mobile Back Button */}
        <div className="mb-8 md:hidden flex justify-end">
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 glow-border border-white/10 text-white hover:bg-white/10 transition-colors text-sm z-10"
          >
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-blue-400" />
              <span className="font-bold">LuxQr</span>
            </div>
            <div className="w-px h-4 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Blog'a Dön
            </div>
          </Link>
        </div>
        
        {/* Desktop Back Button */}
        <div className="mb-8 hidden md:block flex justify-start">
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 glow-border border-white/10 text-white hover:bg-white/10 transition-colors z-10"
          >
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-blue-400" />
              <span className="font-bold">LuxQr</span>
            </div>
            <div className="w-px h-4 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Blog'a Dön
            </div>
          </Link>
        </div>

        {/* Article */}
        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            {/* Info Bar */}
            <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">
                <QrCode className="w-4 h-4" />
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>{Math.ceil(post.content.split(' ').length / 200)} dk okuma</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Calendar className="w-4 h-4 text-blue-400" />
                {new Date(post.createdAt).toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {post.title}
            </h1>

            <p className="text-xl text-gray-300">
              {post.description}
            </p>
          </div>

          {/* Main Image and Content */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Main Image */}
            {post.mainImage && (
              <div className="w-full md:w-1/3 max-w-md flex-shrink-0">
                <div className="rounded-2xl overflow-hidden shadow-lg glow-border">
                  <img
                    src={post.mainImage}
                    alt={post.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 bg-white/5 backdrop-blur-sm glow-border rounded-2xl p-8 md:p-12">
              <BlogContent content={post.content} />
            </div>
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
            <RelatedPostsCarousel posts={relatedPosts} />
          )}
        </article>
      </div>
    </main>
  );
}
