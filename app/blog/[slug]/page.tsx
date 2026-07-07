import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ArrowLeft, QrCode, Clock, User, ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { getPostBySlug, getAllPosts } from '@/lib/db';
import ShareButton from './ShareButton';
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
                <span>{Math.ceil((post.content?.split(' ')?.length || 0) / 200)} dk okuma</span>
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
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-10 max-w-3xl mx-auto">
              <div className="prose prose-invert prose-lg max-w-prose prose-slate prose-headings:text-white prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-blue-400 prose-h3:text-2xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-blue-400 prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-lg prose-p:mb-6 prose-strong:text-white prose-strong:font-bold prose-strong:text-blue-400 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-ul:text-gray-300 prose-ol:text-gray-300 prose-li:mb-3 prose-li:text-lg prose-li:leading-relaxed prose-code:text-blue-300 prose-code:bg-blue-500/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700 prose-blockquote:bg-slate-900 prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-gray-300">
                <BlogContent content={post.content} />
              </div>
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
        </article>
      </div>
    </main>
  );
}
