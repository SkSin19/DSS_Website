"use client";

import React from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Link from "next/link";

const SecureToday: React.FC = () => {
  const shieldRef    = useScrollReveal<HTMLDivElement>({ animation: "up", delay: 150 });
  const headlineRef  = useScrollReveal<HTMLHeadingElement>({ animation: "up", delay: 300 });
  const subtitleRef  = useScrollReveal<HTMLParagraphElement>({ animation: "up", delay: 450 });
  const ctaRef       = useScrollReveal<HTMLAnchorElement>({ animation: "up", delay: 600 });

  return (
    <section className="select-none relative w-full overflow-hidden flex flex-col bg-white pb-16 md:pb-24">

      {/* ── BACKGROUND: subtle radial blue glow in center ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 70%, rgba(220,38,38,0.08) 0%, rgba(255,255,255,1) 80%)",
        }}
      />

      {/* ── HERO CONTENT ── */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 pt-12 md:pt-16 pb-0">

        {/* Shield icon */}
        <div ref={shieldRef} className="mb-6">
          <svg width="52" height="58" viewBox="0 0 56 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M28 2L4 12V30C4 44.4 14.8 57.8 28 61C41.2 57.8 52 44.4 52 30V12L28 2Z"
              fill="none"
              stroke="#dc2626"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M18 31L24 37L38 23"
              stroke="#dc2626"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Headline */}
        <h2 ref={headlineRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center leading-tight mb-5">
          Secure Today.{" "}
          <span style={{ color: "#dc2626" }}>Safer Tomorrow.</span>
        </h2>

        {/* Subheadline */}
        <p ref={subtitleRef} className="text-center text-sm sm:text-base md:text-lg max-w-md mb-6 md:mb-8 leading-relaxed text-gray-600">
          Advanced digital security solutions to protect your
          <br />
          people, property and peace of mind.
        </p>

        {/* CTA link */}
        <Link
          href="/products"
          ref={ctaRef}
          className="group inline-flex items-center gap-1 text-sm font-medium transition-colors duration-200 text-red-600!"
        >
          <span>Explore our security solutions</span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
            <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

      </div>

    </section>
  );
};

export default SecureToday;