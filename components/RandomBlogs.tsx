'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  mainImage?: string;
  createdAt: string;
}

export default function RandomBlogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRandomBlogs();
  }, []);

  const fetchRandomBlogs = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      if (data.success && data.posts) {
        // Shuffle the blogs randomly
        const shuffled = [...data.posts].sort(() => Math.random() - 0.5);
        // Show up to 5 blogs, or all if fewer than 5
        const blogsToShow = shuffled.slice(0, Math.min(5, shuffled.length));
        setBlogs(blogsToShow);
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="hidden lg:block w-80 space-y-4">
        <div className="bg-white/5 backdrop-blur-sm glow-border rounded-2xl p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-white/20 rounded w-3/4"></div>
            <div className="h-3 bg-white/10 rounded w-full"></div>
            <div className="h-3 bg-white/10 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden lg:block w-80 space-y-4 pt-8">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5 text-blue-400" />
        Blog Yazıları
      </h3>
      {blogs.length === 0 ? (
        <div className="text-gray-400 text-sm text-center py-4">
          Henüz blog yazısı yok
        </div>
      ) : (
        blogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blog/${blog.slug}`}
            className="block bg-white/5 backdrop-blur-sm glow-border rounded-2xl p-4 hover:bg-white/10 transition-all duration-300"
          >
            {blog.mainImage && (
              <div className="mb-3 rounded-xl overflow-hidden">
                <img
                  src={blog.mainImage}
                  alt={blog.title}
                  className="w-full h-32 object-cover"
                />
              </div>
            )}
            <h4 className="text-lg font-bold text-white mb-2 line-clamp-2">
              {blog.title}
            </h4>
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">
              {blog.description}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              {format(new Date(blog.createdAt), 'dd MMM yyyy', { locale: tr })}
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
