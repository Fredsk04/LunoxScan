"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Bookmark, Star, Clock, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState<any[]>([]);

  useEffect(() => {
    const fetchFeaturedMangas = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/mangas");
        if (res.ok) {
          const data = await res.json();
          // Get first 3 mangas for carousel
          setSlides(data.slice(0, 3));
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchFeaturedMangas();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  if (slides.length === 0) return null;

  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={slides[current].cover_url || slides[current].banner_url}
              alt={slides[current].title}
              className="h-full w-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="container relative mx-auto h-full px-6 flex flex-col justify-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-primary rounded-full text-[10px] font-black uppercase tracking-wider text-white">
                  {slides[current].status || "New"}
                </span>
                <span className="text-white/60 text-xs font-medium uppercase tracking-widest flex items-center gap-2">
                  <Clock size={12} />
                  Updated recently
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
                {slides[current].title.split(':').map((part: string, i: number) => (
                  <span key={i} className={i === 1 ? "text-primary block italic mt-2" : "block text-white"}>
                    {part.trim()}{i === 0 && slides[current].title.includes(':') ? ':' : ''}
                  </span>
                ))}
              </h1>

              <p className="text-white/70 text-lg mb-8 line-clamp-3 leading-relaxed max-w-xl">
                {slides[current].description || "Discover this amazing series..."}
              </p>

              <div className="flex items-center gap-4">
                <Link
                  href={`/series/${slides[current].id}`}
                  className="px-10 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl shadow-[0_10px_30px_rgba(124,58,237,0.4)] flex items-center gap-3 transition-all hover:scale-105 active:scale-95"
                >
                  <Play size={20} fill="currentColor" />
                  READ NOW
                </Link>
                <button
                  className="w-14 h-14 glass flex items-center justify-center rounded-2xl hover:bg-white/10 transition-all"
                >
                  <Bookmark size={24} />
                </button>
                <button
                  className="w-14 h-14 glass flex items-center justify-center rounded-2xl hover:bg-white/10 transition-all"
                >
                  <Heart size={24} />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 right-6 md:right-12 flex items-center gap-4">
        <button onClick={prev} className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-primary transition-all">
          <ChevronLeft size={24} />
        </button>
        <button onClick={next} className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-primary transition-all">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 left-6 md:left-12 flex items-center gap-2">
        {slides.map((_: any, i: number) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-500 ${i === current ? "w-12 bg-primary" : "w-6 bg-white/20 hover:bg-white/40"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
