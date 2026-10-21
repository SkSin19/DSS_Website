"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Google Maps embed that is only added when it scrolls near the viewport.
 * `loading="lazy"` alone isn't honoured by every browser, and the embed pulls
 * in ~1 MB of Maps scripts, so the footer shouldn't load it up front.
 */
export default function LazyMap({ src, title, className }: { src: string; title: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {show && (
        <iframe
          src={src}
          title={title}
          className="block h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}
    </div>
  );
}
