'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, FileText, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  mainImage?: string;
  createdAt: string;
}

export default function BlogSlider() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const blogsPerView = 3;

  useEffect(() => {
    fetchBlogs();
    // Refresh blogs every 5 minutes to get new posts
    const interval = setInterval(fetchBlogs, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [blogs]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      if (data.success && data.posts) {
        setBlogs(data.posts);
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const startAutoSlide = () => {
    stopAutoSlide();
    if (blogs.length > blogsPerView) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % blogs.length);
      }, 5000);
    }
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleNext = () => {
    stopAutoSlide();
    setCurrentIndex((prev) => (prev + 1) % blogs.length);
    startAutoSlide();
  };

  const handlePrev = () => {
    stopAutoSlide();
    setCurrentIndex((prev) => (prev - 1 + blogs.length) % blogs.length);
    startAutoSlide();
  };

  const handleDotClick = (index: number) => {
    stopAutoSlide();
    setCurrentIndex(index);
    startAutoSlide();
  };

  // Create infinite loop of blogs
  const getDisplayBlogs = () => {
    if (blogs.length === 0) return [];
    const result = [...blogs];
    // Add blogs at the beginning and end for infinite loop effect
    for (let i = 0; i < blogsPerView; i++) {
      const indexFromEnd = (blogs.length - 1 - i + blogs.length) % blogs.length;
      const indexFromStart = i % blogs.length;
      result.unshift(blogs[indexFromEnd]);
      result.push(blogs[indexFromStart]);
    }
    return result;
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card-premium p-8 mb-16"
      >
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/20 rounded-2xl w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-white/10 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="card-premium p-8 mb-16 relative overflow-hidden"
    >
      {/* Background Glow Effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white text-gradient">Son Blog Yazıları</h2>
            <p className="text-gray-400 text-xs">En son güncellemeler ve rehberler</p>
          </div>
        </div>
        <Link href="/blog" className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors text-xs font-medium">
          Tümünü Gör
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <button
          onClick={handleNext}
          disabled={blogs.length <= blogsPerView}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Horizontal Scroll Container */}
        <div
          ref={sliderRef}
          className="flex gap-3 overflow-hidden pb-4 px-12"
        >
          {getDisplayBlogs().map((blog, index) => {
            if (!blog || !blog.slug) return null;
            
            const actualIndex = index - blogsPerView;
            const isVisible = actualIndex >= 0 && actualIndex < blogs.length;
            
            return (
              <motion.div
                key={`${blog.slug}-${index}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: isVisible ? 1 : 0.3, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`flex-shrink-0 w-full md:w-[calc(33.333%-12px)] transition-all duration-500 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-30 scale-95'
                }`}
              >
                <Link href={`/blog/${blog.slug}`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="card-premium overflow-hidden h-full hover:border-blue-500/50 transition-all duration-300"
                  >
                    {blog.mainImage && (
                      <div className="relative h-36 overflow-hidden">
                        <motion.img
                          src={blog.mainImage}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          Blog
                        </div>
                      </div>
                    )}
                    
                    <div className="p-3">
                      <h3 className="text-base font-bold text-white mb-2 line-clamp-2 leading-tight">
                        {blog.title}
                      </h3>
                      <p className="text-gray-400 text-xs mb-2 line-clamp-2 leading-relaxed">
                        {blog.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {format(new Date(blog.createdAt), 'dd MMM yyyy', { locale: tr })}
                        </div>
                        <motion.div
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="w-3 h-3 text-blue-400" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {blogs.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === i ? 'bg-blue-500 w-6' : 'bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
