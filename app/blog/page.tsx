import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ArrowRight, QrCode, Home } from 'lucide-react';
import { getAllPosts } from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'LuxQr Blog - QR Kod Rehberi ve Güncel Haberler',
  description: 'QR kod oluşturma ipuçları, kullanım rehberleri ve en son teknoloji haberleri. LuxQr blogunda QR kod dünyasını keşfedin.',
  keywords: ['qr kod blog', 'qr kod rehberi', 'qr kod ipuçları', 'luxqr blog'],
  openGraph: {
    title: 'LuxQr Blog - QR Kod Rehberi ve Güncel Haberler',
    description: 'QR kod oluşturma ipuçları, kullanım rehberleri ve en son teknoloji haberleri.',
    url: 'https://luxqrpro.site/blog',
    siteName: 'LuxQr',
    images: [
      {
        url: '/api/og/blog',
        width: 1200,
        height: 630,
        alt: 'LuxQr Blog',
      },
    ],
    type: 'website',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LuxQr Blog - QR Kod Rehberi ve Güncel Haberler',
    description: 'QR kod oluşturma ipuçları, kullanım rehberleri ve en son teknoloji haberleri.',
    images: ['/api/og/blog'],
    creator: '@luxqrpro',
  },
};

async function getPosts() {
  try {
    const posts = await getAllPosts();
    console.log('Posts data:', posts);
    return posts || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header with Hamburger Menu and Back Button */}
        <div className="mb-8 max-md:flex max-md:justify-end max-md:items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 glow-border border-white/10 text-white hover:bg-white/10 transition-colors max-md:text-sm max-md:px-3 max-md:py-1.5 z-10"
          >
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-blue-400" />
              <span className="font-bold">LuxQr</span>
            </div>
            <div className="w-px h-4 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Ana Sayfaya Dön
            </div>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
            <QrCode className="relative w-12 h-12 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            LuxQr Blog
          </h1>
          <p className="text-xl text-gray-300">
            QR Kod Rehberi ve Güncel Haberler
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Henüz blog yazısı bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any, index: number) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <div className="bg-white/5 backdrop-blur-sm glow-border rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 h-full flex flex-col">
                  {/* Image */}
                  {post.mainImage && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.mainImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Category */}
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">
                        {post.category}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    
                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
                      {post.description}
                    </p>
                    
                    {/* Date & Read More */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.createdAt).toLocaleDateString('tr-TR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center gap-1 text-blue-400 text-sm font-semibold hover:text-blue-300 transition-colors">
                        Devamını Oku
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
