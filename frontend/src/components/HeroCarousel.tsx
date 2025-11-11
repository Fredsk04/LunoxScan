"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Play, Bookmark, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

// Types
interface Manga {
  id: number;
  title: string;
  author?: string;
  coverUrl?: string;
  genre?: string;
  rating?: number;
  isNew?: boolean;
  status?: "En cours" | "Terminé" | "Pause";
  views?: string;
  lastChapter?: string;
  description?: string;
}

interface HeroCarouselProps {
  mangas?: Manga[];
}

// Slides de démonstration
const CAROUSEL_SLIDES = [
  {
    id: 1,
    title: "Dragon Ball Super",
    description:
      "Goku et Vegeta affrontent de nouveaux ennemis cosmiques dans cette suite épique du manga légendaire Dragon Ball Z.",
    backgroundUrl:
      "https://images.unsplash.com/photo-1554310603-d39d43033735?auto=format&fit=crop&w=1080&q=80",
    characterUrl:
      "https://images.unsplash.com/photo-1734517709196-48873cca9599?auto=format&fit=crop&w=1080&q=80",
    genre: "Action",
    lastChapter: "Chapitre 103",
  },
  {
    id: 2,
    title: "Demon Slayer",
    description:
      "Tanjiro et ses compagnons affrontent les démons les plus puissants dans une quête pour sauver l'humanité.",
    backgroundUrl:
      "https://images.unsplash.com/photo-1758084303656-1c1ec0700b68?auto=format&fit=crop&w=1080&q=80",
    characterUrl:
      "https://images.unsplash.com/photo-1737785139572-0418dd8016a1?auto=format&fit=crop&w=1080&q=80",
    genre: "Surnaturel",
    lastChapter: "Chapitre 205",
  },
  {
    id: 3,
    title: "My Hero Academia",
    description:
      "Suivez Deku dans son parcours pour devenir le plus grand héros de tous les temps dans un monde où les super-pouvoirs sont la norme.",
    backgroundUrl:
      "https://images.unsplash.com/photo-1562403960-6565670d55f3?auto=format&fit=crop&w=1080&q=80",
    characterUrl:
      "https://images.unsplash.com/photo-1697059172415-f1e08f9151bb?auto=format&fit=crop&w=1080&q=80",
    genre: "Super-héros",
    lastChapter: "Chapitre 412",
  },
  {
    id: 4,
    title: "Attack on Titan",
    description:
      "L'humanité lutte pour sa survie contre les titans dans cette histoire épique pleine de mystères et de rebondissements.",
    backgroundUrl:
      "https://images.unsplash.com/photo-1554310603-d39d43033735?auto=format&fit=crop&w=1080&q=80",
    characterUrl:
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1080&q=80",
    genre: "Drame",
    lastChapter: "Chapitre 139",
  },
  {
    id: 5,
    title: "One Piece",
    description:
      "Rejoignez Luffy et son équipage dans leur aventure épique à la recherche du trésor ultime, le One Piece.",
    backgroundUrl:
      "https://images.unsplash.com/photo-1562403960-6565670d55f3?auto=format&fit=crop&w=1080&q=80",
    characterUrl:
      "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?auto=format&fit=crop&w=1080&q=80",
    genre: "Aventure",
    lastChapter: "Chapitre 1108",
  },
  {
    id: 6,
    title: "Jujutsu Kaisen",
    description:
      "Yuji Itadori et ses camarades exorcistes affrontent les malédictions les plus redoutables du Japon.",
    backgroundUrl:
      "https://images.unsplash.com/photo-1758084303656-1c1ec0700b68?auto=format&fit=crop&w=1080&q=80",
    characterUrl:
      "https://images.unsplash.com/photo-1761129386720-82a53e04d9b7?auto=format&fit=crop&w=1080&q=80",
    genre: "Surnaturel",
    lastChapter: "Chapitre 251",
  },
];

export function HeroCarousel({ mangas }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play
  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [isHovered]);

  const currentSlide = CAROUSEL_SLIDES[currentIndex];

  const goToPrevious = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length
    );

  const goToNext = () =>
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);

  return (
    <div
      className="relative w-full h-[550px] md:h-[700px] overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* === Background === */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentSlide.id}`}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <motion.div
            className="w-full h-full"
            animate={{ x: [0, -20, 0], y: [0, -10, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          >
            <ImageWithFallback
              src={currentSlide.backgroundUrl}
              alt={currentSlide.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* === Personnage === */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`char-${currentSlide.id}`}
          className="absolute right-0 top-0 bottom-0 w-2/5 hidden md:flex items-center justify-end pr-8 md:pr-16"
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.9 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="relative w-full h-4/5 max-w-md"
            animate={{ scale: [1, 1.05, 1], y: [0, -15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ImageWithFallback
              src={currentSlide.characterUrl}
              alt={currentSlide.title}
              className="w-full h-full object-contain drop-shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-transparent blur-3xl" />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* === Boutons de navigation === */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-all z-20"
        onClick={goToPrevious}
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-all z-20"
        onClick={goToNext}
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      {/* === Contenu gauche === */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="container mx-auto px-6 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentSlide.id}`}
              className="max-w-xl md:max-w-2xl space-y-4 md:space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h1
                className="text-4xl md:text-6xl lg:text-7xl uppercase font-black tracking-tight"
                style={{
                  color: "#fff",
                  textShadow:
                    "0 0 30px rgba(255, 102, 0, 0.5), 0 0 60px rgba(255, 0, 102, 0.3), 4px 4px 8px rgba(0,0,0,0.8)",
                }}
              >
                {currentSlide.title}
              </h1>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-3 py-1">
                  {currentSlide.genre}
                </Badge>
                <Badge className="bg-black/60 text-white/90 border-0 px-3 py-1">
                  {currentSlide.lastChapter}
                </Badge>
              </div>

              <p className="text-white/90 text-base md:text-lg max-w-lg leading-relaxed">
                {currentSlide.description}
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                <Button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-8 py-6 rounded-md shadow-lg shadow-orange-500/30 transition-all hover:scale-105">
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  Lire
                </Button>
                <Button className="bg-black/60 hover:bg-black/80 text-white px-6 py-6 rounded-md transition-all hover:scale-105">
                  <Bookmark className="w-5 h-5" />
                </Button>
                <Button className="bg-black/60 hover:bg-red-500/80 text-white px-6 py-6 rounded-md transition-all hover:scale-105">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* === Indicateurs === */}
      <div className="absolute bottom-6 left-6 md:left-12 flex items-center gap-2 z-10">
        {CAROUSEL_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Slide ${index + 1}`}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentIndex
                ? "bg-orange-500 w-12"
                : "bg-white/40 hover:bg-white/60 w-6"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;
