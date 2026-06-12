/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { BRANDS } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function BrandCard({ brand, priority }: { brand: (typeof BRANDS)[number]; priority: boolean }) {
  const isPrama = brand.name.toLowerCase() === "prama";
  const [isHovered, setIsHovered] = useState(false);

  // Hex color transparency helper
  const getGlowColor = (color: string) => {
    if (color.startsWith("#")) {
      // Map pure white to a soft grey so it glows visibly on the white background
      if (color.toUpperCase() === "#FFFFFF") {
        return "rgba(100, 100, 100, 0.35)";
      }
      return `${color}66`; // ~40% opacity hex glow for high visibility
    }
    return "rgba(0, 0, 0, 0.25)";
  };

  return (
    <Link
      href={`/products?company=${encodeURIComponent(brand.name)}`}
      className={`group relative aspect-9/16 w-60 sm:w-65 md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] xl:w-[calc(20%-20px)] snap-center shrink-0 rounded-2xl overflow-hidden  border transition-all duration-500 ${
        isPrama ? "border-gray-200/80" : "border-gray-200/30"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        flexShrink: 0,
        boxShadow: isHovered
          ? `0 25px 55px 6px ${getGlowColor(brand.color)}`
          : "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08)",
        transform: isHovered
          ? `${isPrama ? "scale(0.995)" : "scale(1.025)"}`
          : `${isPrama ? "scale(0.985)" : "scale(1)"}`,
      }}
    >
      {brand.productImageSrc ? (
        <>
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
            <Image
              src={brand.productImageSrc}
              alt={`${brand.name} Card`}
              fill
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center"
              priority={priority}
            />
          </div>
          {/* Subtle dark overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{ backgroundColor: brand.color }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-gray-900/50 via-transparent to-gray-900/10" />
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
            <p className="text-white font-bold text-sm sm:text-[15px] leading-tight drop-shadow-sm">
              {brand.name}
            </p>
            {brand.tagline && (
              <p className="text-white/60 text-[10px] sm:text-[11px] mt-0.5 leading-snug line-clamp-2 font-medium">
                {brand.tagline}
              </p>
            )}
          </div>
        </>
      )}

      {/* Modern, elegant hover pill */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-white/95 text-gray-900 text-xs font-bold shadow-lg tracking-wide">
          Browse Products
          <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
        </span>
      </div>
    </Link>
  );
}

export default function DiscoverBrands() {
  const headingRef = useScrollReveal<HTMLDivElement>({ animation: "up", delay: 0 });
  const carouselRevealRef = useScrollReveal<HTMLDivElement>({ animation: "up", delay: 150 });
  
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [shuffledBrands, setShuffledBrands] = useState<typeof BRANDS>(BRANDS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fisher-Yates Shuffle on mount to avoid Next.js hydration mismatch
  useEffect(() => {
    const shuffleArray = (array: typeof BRANDS) => {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };
    setShuffledBrands(shuffleArray(BRANDS));
  }, []);

  // Triplicate array to support seamless infinite 360 scrolling
  const infiniteBrands = [...shuffledBrands, ...shuffledBrands, ...shuffledBrands];

  // Align to center set of cards on mount/shuffle
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || shuffledBrands.length === 0) return;
    
    // Jump scroll position to the start of the middle set
    const singleSetWidth = el.scrollWidth / 3;
    el.scrollLeft = singleSetWidth;
  }, [shuffledBrands]);

  // Throttled scroll handler using requestAnimationFrame for 60fps/120fps jank-free rendering
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || shuffledBrands.length === 0) return;
    
    const { scrollLeft, clientWidth, scrollWidth } = el;
    const singleSetWidth = scrollWidth / 3;
    const cardWidth = singleSetWidth / shuffledBrands.length;
    
    // Silent jump: only jump when close to the absolute left edge (within 1 card width)
    if (scrollLeft < cardWidth) {
      el.scrollLeft = scrollLeft + singleSetWidth;
      return;
    }
    
    // Silent jump: only jump when close to the absolute right edge (within 1 card width + view width)
    if (scrollLeft > scrollWidth - clientWidth - cardWidth) {
      el.scrollLeft = scrollLeft - singleSetWidth;
      return;
    }

    // Determine active index based on normalized scroll position within a single set
    const normalizedScrollLeft = scrollLeft - singleSetWidth;
    const index = Math.round(normalizedScrollLeft / cardWidth) % shuffledBrands.length;
    
    // Safety check index bounds
    const safeIndex = (index + shuffledBrands.length) % shuffledBrands.length;
    
    // Only update state if index has actually changed to prevent redundant React renders
    setActiveIndex((prev) => (prev !== safeIndex ? safeIndex : prev));
  }, [shuffledBrands.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();
    
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [handleScroll]);

  // Automatic slide animation
  useEffect(() => {
    if (isPaused || shuffledBrands.length === 0) return;

    const interval = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;

      const { scrollWidth } = el;
      const singleSetWidth = scrollWidth / 3;
      const cardWidth = singleSetWidth / shuffledBrands.length;

      // Scroll smoothly to next card
      el.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, shuffledBrands.length]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el || shuffledBrands.length === 0) return;
    
    const { clientWidth } = el;
    const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
    
    el.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const goToSlide = (i: number) => {
    const el = scrollRef.current;
    if (!el || shuffledBrands.length === 0) return;
    
    const { scrollWidth } = el;
    const singleSetWidth = scrollWidth / 3;
    const cardWidth = singleSetWidth / shuffledBrands.length;
    
    el.scrollTo({
      left: singleSetWidth + i * cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="select-none bg-white section-padding pb-12 sm:pb-20 md:pb-24" id="brands">
      <Container>
        <div ref={headingRef}>
          <SectionHeading
            title="Our Partners"
            subtitle="We work with India's most trusted digital surveillance brands."
          />
        </div>

        <div 
          ref={carouselRevealRef} 
          className="relative mt-8 sm:mt-12 lg:mt-16 max-w-7xl mx-auto px-4 md:px-0"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 lg:-left-6 top-[calc(50%-24px)] -translate-y-1/2 z-10 w-12 h-12 rounded-full border-red-600 bg-white/95 dark:bg-gray-900/95 shadow-xl border hover:bg-red-600 hover:text-white flex items-center justify-center transition-all duration-300 pointer-events-auto cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 lg:-right-6 top-[calc(50%-24px)] -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/95 dark:bg-gray-900/95 shadow-xl border border-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all duration-300 pointer-events-auto cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Scroll Container */}
          <div
            ref={scrollRef}
            className="flex flex-row flex-nowrap overflow-x-auto gap-4 md:gap-6 pb-6 md:pb-16 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              overflowX: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {infiniteBrands.map((brand, i) => (
              <BrandCard 
                key={`${brand.name}-${i}`} 
                brand={brand} 
                priority={i >= shuffledBrands.length && i < shuffledBrands.length + 5}
              />
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {shuffledBrands.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIndex ? "w-8 bg-red-600" : "w-2 bg-gray-300 dark:bg-gray-700"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}