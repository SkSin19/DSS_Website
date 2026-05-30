"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ImageCarouselProps {
  images: string[];
  alt?: string;
  intervalMs?: number;
  className?: string;
}

export default function ImageCarousel({ images, alt = "product image", intervalMs = 5000, className = "" }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused || images.length <= 1) return;

    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [images.length, intervalMs, isPaused]);

  const goTo = (i: number) => {
    setIndex(((i % images.length) + images.length) % images.length);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex w-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={i} className="min-w-full relative">
            <div className="relative w-full aspect-5/4 overflow-hidden bg-linear-to-br from-sky-950 via-slate-900 to-slate-800 p-0 ring-1 ring-white/10">
              <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain drop-shadow-2xl" />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute left-1/2 bottom-3 z-20 flex -translate-x-1/2 gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to image ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2 w-8 rounded-full transition-all duration-300 ${i === index ? "bg-white" : "bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
}
