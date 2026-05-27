"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { HERO_SLIDES, TRUST_BADGES } from "@/lib/constants";

export default function HeroSlider() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  }, []);

  const setSlide = useCallback((index: number) => {
    setCurrentSlideIndex(index);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-130 sm:h-150 md:h-175 lg:h-187.5 overflow-hidden bg-white">
      {/* ── Slider Container ── */}
      <div 
        className="hero-slider flex w-full h-full"
        style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
      >
        {HERO_SLIDES.map((slide) => (
          <div 
            key={slide.id} 
            className={`w-full h-full shrink-0 flex items-center ${
              slide.theme === "blue" 
                ? "bg-linear-to-br from-sky-50 via-blue-100 to-sky-200" 
                : "bg-linear-to-br from-gray-50 via-white to-red-50/30"
            }`}
          >
            <Container className="h-full flex items-center">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-8 w-full">
                
                {/* Text Content */}
                <div className={`flex flex-col justify-center space-y-4 sm:space-y-6 md:space-y-8 ${slide.id === currentSlideIndex + 1 ? 'animate-slide-in-left' : 'opacity-0'}`}>
                  {slide.badge && (
                    <div className="flex">
                      <Badge variant="default" className="shadow-sm">{slide.badge}</Badge>
                    </div>
                  )}
                  
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
                    {slide.headingLine1} <br className="hidden sm:block" />
                    <span 
                      style={{ color: slide.headingAccentColor || "inherit" }}
                      className={!slide.headingAccentColor ? "text-gray-900" : ""}
                    >
                      {slide.headingLine2}
                    </span>
                  </h1>
                  
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-xl leading-relaxed">
                    {slide.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                    <Button 
                      variant={slide.theme === "blue" ? "primary" : "danger"} 
                      size="lg"
                      href={slide.ctaPrimaryHref}
                      className="w-full sm:w-auto"
                    >
                      {slide.ctaPrimaryLabel} <span className="ml-1">→</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      href={slide.ctaSecondaryHref}
                      className="w-full sm:w-auto bg-white/50 backdrop-blur-sm hover:bg-white"
                    >
                      {slide.ctaSecondaryLabel}
                    </Button>
                  </div>
                  
                  {/* Trust Badges - Desktop only inside slide */}
                  <div className="hidden lg:flex flex-wrap gap-x-6 gap-y-3 pt-6">
                    {TRUST_BADGES.map((badge, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 20 20" 
                          fill="currentColor" 
                          className={`w-5 h-5 ${slide.theme === "blue" ? "text-sky-500" : "text-red-500"}`}
                        >
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                        {badge.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Content */}
                <div className={`relative h-52 sm:h-80 md:h-100 lg:h-auto flex items-center justify-center ${slide.id === currentSlideIndex + 1 ? 'animate-slide-in-right' : 'opacity-0'}`}>
                  {/* Decorative blur blob */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 rounded-full blur-[80px] opacity-40 mix-blend-multiply ${slide.theme === "blue" ? "bg-sky-300" : "bg-red-200"}`}></div>
                  
                  <Image
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    width={800}
                    height={600}
                    priority={slide.id === 1}
                    className="relative z-10 w-full max-w-[420px] sm:max-w-125 lg:max-w-none h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </Container>
          </div>
        ))}
      </div>

      {/* ── Slider Controls ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus-ring ${
              index === currentSlideIndex 
                ? "bg-gray-800 scale-125" 
                : "bg-gray-400/50 hover:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
