'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  const [itemsPerScreen, setItemsPerScreen] = useState(3);

  useEffect(() => {
    setActiveDot(prev => Math.min(prev, getTotalPages() - 1));
  }, [blogs.length, itemsPerScreen]);

  useEffect(() => {
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

    fetchBlogs();
  }, []);

  useEffect(() => {
    const updateItemsPerScreen = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerScreen(3); // lg: 3 items
      } else if (window.innerWidth >= 768) {
        setItemsPerScreen(2); // md: 2 items
      } else {
        setItemsPerScreen(1); // mobile: 1 item
      }
    };

    updateItemsPerScreen();
    window.addEventListener('resize', updateItemsPerScreen);
    return () => window.removeEventListener('resize', updateItemsPerScreen);
  }, []);

  useEffect(() => {
    if (!loading && blogs.length > 0) {
      startAutoSlide();
    }
    return () => stopAutoSlide();
  }, [loading, blogs.length]);

  const getTotalPages = () => Math.max(1, blogs.length - itemsPerScreen + 1);

  const getSlideStep = () => {
    if (!sliderRef.current || blogs.length === 0) return 0;
    const firstChild = sliderRef.current.firstElementChild as HTMLElement | null;
    if (!firstChild) return 0;
    const gap = parseFloat(getComputedStyle(sliderRef.current).gap) || 16;
    return firstChild.clientWidth + gap;
  };

  const handleScroll = () => {
    if (!sliderRef.current || blogs.length === 0) return;
    const step = getSlideStep();
    if (step === 0) return;
    const totalPages = getTotalPages();
    const dotIndex = Math.round(sliderRef.current.scrollLeft / step);
    setActiveDot(Math.max(0, Math.min(dotIndex, totalPages - 1)));
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
    const step = getSlideStep();
    if (step === 0) return;
    const totalPages = getTotalPages();
    const newIndex = direction === 'left'
      ? Math.max(0, activeDot - 1)
      : Math.min(totalPages - 1, activeDot + 1);
    goToSlide(newIndex);
  };

  const goToSlide = (index: number) => {
    if (!sliderRef.current || blogs.length === 0) return;
    const step = getSlideStep();
    if (step === 0) return;
    const totalPages = getTotalPages();
    const clamped = Math.max(0, Math.min(index, totalPages - 1));
    sliderRef.current.scrollTo({
      left: clamped * step,
      behavior: 'smooth'
    });
    setActiveDot(clamped);
  };

  const startAutoSlide = () => {
    stopAutoSlide();
    if (blogs.length > 0) {
      intervalRef.current = setInterval(() => {
        if (!sliderRef.current) return;
        const step = getSlideStep();
        if (step === 0) return;
        const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
        if (sliderRef.current.scrollLeft >= maxScroll - step / 2) {
          sliderRef.current.scrollLeft = 0;
        } else {
          sliderRef.current.scrollBy({
            left: step,
            behavior: 'smooth'
          });
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
          <div className="h-8 bg-gray-200 rounded-2xl w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-100 rounded-2xl"></div>
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
      className="mb-16"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Son Blog Yazıları</h2>
            <p className="text-gray-600 text-sm">En son güncellemeler ve rehberler</p>
          </div>
        </div>
        <Link 
          href="/blog" 
          className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-blue-500/30 rounded-xl text-blue-600 hover:text-blue-700 transition-all duration-300 text-xs md:text-sm font-medium whitespace-nowrap"
        >
          Tümünü Gör
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Slider Container */}
      <div className="relative px-4 lg:px-0">
        {/* Horizontal Scroll Container */}
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
              className="flex-shrink-0 w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] xl:w-[calc(33.333%-11px)] snap-center"
            >
              <Link href={`/blog/${blog.slug}`}>
                <div className="group/card bg-gray-50 backdrop-blur-sm border border-gray-200 hover:border-blue-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 h-full flex flex-col">
                  {blog.mainImage && (
                    <div className="relative h-48 overflow-hidden flex-shrink-0">
                      <Image
                        src={blog.mainImage}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold rounded-full shadow-lg">
                          Blog
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-snug group-hover/card:text-blue-400 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed flex-1">
                      {blog.description}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Clock className="w-3.5 h-3.5" />
                        {format(new Date(blog.createdAt), 'dd MMM yyyy', { locale: tr })}
                      </div>
                      <div className="flex items-center gap-2 text-blue-600 text-sm font-medium group-hover/card:gap-3 transition-all">
                        <span>Devamını Oku</span>
                        <ArrowRight className="w-4 h-4" />
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
          <span className="text-gray-600">/</span>
          <span className="text-gray-600">{getTotalPages()}</span>
        </div>

        <button
          onClick={() => scroll('right')}
          aria-label="Sonraki"
          className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-blue-500/30 flex items-center justify-center text-gray-900 transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
