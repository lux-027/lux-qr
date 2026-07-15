import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ArrowRight, QrCode, Home, FileText, Zap, Shield, Users, Mail, CheckCircle, TrendingUp } from 'lucide-react';
import { getAllPosts } from '@/lib/db';
import NewsletterForm from '@/components/NewsletterForm';
import BlogPageContent from '@/components/BlogPageContent';

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
    type: 'website',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LuxQr Blog - QR Kod Rehberi ve Güncel Haberler',
    description: 'QR kod oluşturma ipuçları, kullanım rehberleri ve en son teknoloji haberleri.',
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

  return <BlogPageContent posts={posts} />;
}
