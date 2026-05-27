"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Props {
  images: string[];
  alt?: string;
  intervalMs?: number;
}

export default function ProductImageGallery({ images, alt = "product image", intervalMs = 5000 }: Props) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showAll, setShowAll] = useState(false);
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

  const goTo = (i: number) => setIndex(((i % images.length) + images.length) % images.length);

  const mainImage = images[index] || images[0] || "/images/placeholder.png";

  const thumbnailItems = images.map((src, i) => ({ src, i })).filter((it) => it.i !== index);
  const visibleThumbnails = thumbnailItems.slice(0, 3);

  return (
    <div onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="relative mt-6 aspect-square rounded-3xl bg-linear-to-br from-slate-50 to-slate-100 p-8 overflow-hidden">
        <Image
          src={mainImage}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          quality={70}
          className="object-contain drop-shadow-2xl"
          priority
        />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {visibleThumbnails.map(({ src, i }) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-2xl overflow-hidden focus:outline-none transition-transform ${i === index ? "scale-[1.02] ring-2 ring-sky-300" : ""}`}
            aria-label={`Show image ${i + 1}`}
          >
            <div className="rounded-2xl bg-linear-to-b from-white to-slate-100 p-3">
              <div className="relative aspect-square">
                <Image
                  src={src}
                  alt={`${alt} ${i + 1}`}
                  fill
                  sizes="(max-width: 1024px) 33vw, 12vw"
                  quality={55}
                  className="object-contain"
                />
              </div>
            </div>
          </button>
        ))}
      </div>

      {images.length > 4 ? (
        <div className="mt-3">
          <button
            onClick={() => setShowAll(true)}
            className="text-sm text-sky-300 hover:text-sky-200"
          >
            Show more
          </button>
        </div>
      ) : null}

      {showAll ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
          <div className="max-w-3xl w-full bg-gray-900 rounded-lg p-4">
            <div className="mb-3 flex justify-end">
              <button onClick={() => setShowAll(false)} className="text-sm text-gray-300">Close</button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {images.map((src, i) => (
                <button key={i} onClick={() => { goTo(i); setShowAll(false); }} className="rounded-md overflow-hidden">
                  <div className="relative aspect-square">
                    <Image
                      src={src}
                      alt={`${alt} ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 33vw, 25vw"
                      quality={60}
                      className="object-contain"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
