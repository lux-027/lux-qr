"use client";

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface Post {
  slug: string;
  title: string;
  description: string;
  mainImage?: string;
}

interface RelatedPostsCarouselProps {
  posts: Post[];
}

export default function RelatedPostsCarousel({ posts }: RelatedPostsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  if (posts.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Diğer Yazılar
      </h2>
      <div className="relative">
        {/* Carousel Container */}
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {posts.map((post) => (
              <div key={post.slug} className="w-full flex-shrink-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="block bg-white/5 backdrop-blur-sm glow-border rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  {post.mainImage && (
                    <div className="mb-4 rounded-xl overflow-hidden">
                      <img
                        src={post.mainImage}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/50 rounded-xl text-white font-semibold hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300">
                    Oku
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {posts.length > 1 && (
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              aria-label="Önceki Yazı"
              className="p-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/50 rounded-xl text-white hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Sonraki Yazı"
              className="p-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/50 rounded-xl text-white hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Dots Indicator */}
        {posts.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {posts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Slayt ${index + 1}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 p-6 ${
                  index === currentIndex
                    ? 'bg-blue-400 w-6'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
