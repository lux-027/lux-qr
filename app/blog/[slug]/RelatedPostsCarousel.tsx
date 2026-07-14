"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  mainImage?: string;
  createdAt: string;
}

interface RelatedPostsCarouselProps {
  currentSlug: string;
}

export default function RelatedPostsCarousel({ currentSlug }: RelatedPostsCarouselProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeDot, setActiveDot] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        if (data.success && data.posts) {
          // Filter out current post and show all other posts
          const filtered = data.posts.filter((post: BlogPost) => post.slug !== currentSlug);
          setBlogs(filtered);
        }
      } catch (error) {
        console.error('Failed to fetch related posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentSlug]);

  useEffect(() => {
    if (!loading && blogs.length > 0) {
      startAutoSlide();
    }
    return () => stopAutoSlide();
  }, [loading, blogs.length]);

  const handleScroll = () => {
    if (!sliderRef.current || blogs.length === 0) return;
    const cardWidth = sliderRef.current.scrollWidth / blogs.length;
    const scrollPosition = sliderRef.current.scrollLeft;
    const dotIndex = Math.round(scrollPosition / cardWidth);
    setActiveDot(Math.min(dotIndex, blogs.length - 1));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    stopAutoSlide();
    setStartX(e.pageX - sliderRef.current!.offsetLeft);
    setScrollLeft(sliderRef.current!.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    startAutoSlide();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    startAutoSlide();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current!.scrollLeft = scrollLeft - walk;
  };

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const goToSlide = (index: number) => {
    if (sliderRef.current && blogs.length > 0) {
      const cardWidth = sliderRef.current.scrollWidth / blogs.length;
      const targetScroll = index * cardWidth;
      sliderRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      setActiveDot(index);
    }
  };

  const startAutoSlide = () => {
    stopAutoSlide();
    if (blogs.length > 0) {
      intervalRef.current = setInterval(() => {
        if (sliderRef.current) {
          const cardWidth = sliderRef.current.scrollWidth / blogs.length;
          const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;

          if (sliderRef.current.scrollLeft >= maxScroll - cardWidth) {
            sliderRef.current.scrollLeft = 0;
          } else {
            sliderRef.current.scrollBy({
              left: cardWidth,
              behavior: 'smooth'
            });
          }
        }
      }, 5000);
    }
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  if (loading) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Diğer Yazılar
        </h2>
        <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Diğer Yazılar
        </h2>
        <Link
          href="/blog"
          className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-blue-500/30 rounded-xl text-blue-400 hover:text-blue-300 transition-all duration-300 text-sm font-medium"
        >
          Tümünü Gör
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="relative">
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto py-4 scrollbar-hide cursor-grab active:cursor-grabbing select-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onScroll={handleScroll}
        >
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="flex-shrink-0 w-full snap-center"
            >
              <Link href={`/blog/${blog.slug}`}>
                <div className="group/card bg-gray-50 backdrop-blur-sm border border-gray-200 hover:border-blue-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 h-full flex flex-col">
                  {blog.mainImage && (
                    <div className="relative h-56 overflow-hidden flex-shrink-0">
                      <Image
                        src={blog.mainImage}
                        alt={blog.title}
                        fill
                        sizes="100vw"
                        className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-gray-900 text-xs font-semibold rounded-full shadow-lg">
                          Blog
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-snug group-hover/card:text-blue-400 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed flex-1">
                      {blog.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        {format(new Date(blog.createdAt), 'dd MMM yyyy', { locale: tr })}
                      </div>
                      <div className="flex items-center gap-2 text-blue-400 text-sm font-medium group-hover/card:gap-3 transition-all">
                        <span>Oku</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Minimal Pagination */}
      {blogs.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => scroll('left')}
            aria-label="Önceki"
            className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-blue-500/30 flex items-center justify-center text-gray-900 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <span className="text-gray-900 font-semibold">{activeDot + 1}</span>
            <span className="text-gray-500">/</span>
            <span className="text-gray-400">{blogs.length}</span>
          </div>

          <button
            onClick={() => scroll('right')}
            aria-label="Sonraki"
            className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-blue-500/30 flex items-center justify-center text-gray-900 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
