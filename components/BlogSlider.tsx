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
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [activeDot, setActiveDot] = useState(0);

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

  const handleScroll = () => {
    if (!sliderRef.current || blogs.length === 0) return;
    const cardWidth = sliderRef.current.scrollWidth / blogs.length;
    
    // Calculate active dot based on scroll position
    const scrollPosition = sliderRef.current.scrollLeft;
    const dotIndex = Math.round(scrollPosition / cardWidth);
    setActiveDot(Math.min(dotIndex, blogs.length - 1));
  };


  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 400;
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
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all hover:scale-110"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Horizontal Scroll Container */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto py-8 px-16 scrollbar-hide cursor-grab active:cursor-grabbing select-none"
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
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              className="flex-shrink-0 w-full md:w-[calc(33.333%-16px)]"
            >
              <Link href={`/blog/${blog.slug}`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="card-premium overflow-hidden h-full hover:border-blue-500/50 transition-all duration-300"
                >
                  {blog.mainImage && (
                    <div className="relative h-40 overflow-hidden">
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
          ))}
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {blogs.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeDot === index
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 w-6'
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
