"use client";

import { useEffect, useRef } from "react";

type AnimationType = "up" | "left" | "right";

interface ScrollRevealOptions {
  /** Animation direction: 'up' (bottom→up), 'left' (left→right), 'right' (right→left) */
  animation?: AnimationType;
  /** Delay in ms before the animation starts after visibility */
  delay?: number;
  /** How much of the element must be visible before triggering (0–1) */
  threshold?: number;
  /** Extra class names to apply permanently */
  className?: string;
}

/**
 * Attaches scroll-reveal behaviour to a DOM element.
 * The element starts hidden and animates into view once it enters the viewport.
 *
 * Usage:
 *   const ref = useScrollReveal({ animation: "up", delay: 100 });
 *   <div ref={ref} …>…</div>
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>({
  animation = "up",
  delay = 0,
  threshold = 0.2,
}: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set the initial hidden state via inline style so SSR doesn't flash
    const animClass =
      animation === "up"
        ? "scroll-reveal-up"
        : animation === "left"
        ? "scroll-reveal-left"
        : "scroll-reveal-right";

    el.classList.add("scroll-reveal-hidden", animClass);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.classList.remove("scroll-reveal-hidden");
              el.classList.add("scroll-reveal-visible");
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [animation, delay, threshold]);

  return ref;
}
