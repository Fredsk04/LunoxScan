"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import styles from "./styles/HeroCarousel.module.css";

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
    title: "My Hero Academia My Hero Academia My Hero Academia My Hero Academia",
    description:
      "Suivez Deku dans son parcours pour devenir le plus grand héros de tous les temps dans un monde où les super-pouvoirs sont la norme.",
    backgroundUrl:
      "https://images.unsplash.com/photo-1562403960-6565670d55f3?auto=format&fit=crop&w=1080&q=80",
    characterUrl:
      "https://images.unsplash.com/photo-1697059172415-f1e08f9151bb?auto=format&fit=crop&w=1080&q=80",
    genre: "Super-héros",
    lastChapter: "Chapitre 412",
  },
];

export function HeroCarousel({ mangas }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, isHovered ? 10000 : 6000);

    return () => clearInterval(timer);
  }, [isHovered]);

  const currentSlide = CAROUSEL_SLIDES[currentIndex];

  const goToPrev = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length
    );

  const goToNext = () =>
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);

  return (
    <div
      className={styles.carousel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* BACKGROUND */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentSlide.id}`}
          className={styles.background}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <ImageWithFallback
            src={currentSlide.backgroundUrl}
            alt={currentSlide.title}
            className={styles.bgImage}
          />
          <div className={styles.bgGradient1} />
          <div className={styles.bgGradient2} />
        </motion.div>
      </AnimatePresence>

      {/* CHARACTER */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`char-${currentSlide.id}`}
          className={styles.characterContainer}
          initial={{ opacity: 0, x: 120, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.9 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className={styles.characterImageWrapper}
            animate={{ scale: [1, 1.05, 1], y: [0, -12, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ImageWithFallback
              src={currentSlide.characterUrl}
              alt={currentSlide.title}
              className={styles.characterImage}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* BUTTONS LEFT / RIGHT */}
      <button className={styles.navButtonLeft} onClick={goToPrev}>
        <ChevronLeft size={22} />
      </button>

      <button className={styles.navButtonRight} onClick={goToNext}>
        <ChevronRight size={22} />
      </button>

      {/* CONTENT */}
      <div className={styles.contentWrapper}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentSlide.id}`}
            className={styles.content}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className={styles.title}>{currentSlide.title}</h1>

            <p className={styles.description}>
              {currentSlide.description}
            </p>

            {/* ACTION BUTTONS */}
            <div className={styles.actionButtons}>
              <button className={styles.readBtn}>
                <Play size={20} />
                Read
              </button>

              <button
                className={styles.saveBtn}
                onClick={() => setBookmarked(!bookmarked)}
              >
                <Bookmark 
                  size={28}
                  color={bookmarked ? "#7c3aed" : "white"}
                  fill={bookmarked ? "#7c3aed" : "none"}
                />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* INDICATORS */}
      <div className={styles.indicators}>
        {CAROUSEL_SLIDES.map((_, index) => (
          <button
            key={index}
            className={
              index === currentIndex
                ? styles.indicatorActive
                : styles.indicator
            }
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;
