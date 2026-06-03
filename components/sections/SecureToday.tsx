"use client";

import React from "react";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Link from "next/link";

const SecureToday: React.FC = () => {
  const logoRef      = useScrollReveal<HTMLDivElement>({ animation: "up", delay: 0 });
  const shieldRef    = useScrollReveal<HTMLDivElement>({ animation: "up", delay: 150 });
  const headlineRef  = useScrollReveal<HTMLHeadingElement>({ animation: "up", delay: 300 });
  const subtitleRef  = useScrollReveal<HTMLParagraphElement>({ animation: "up", delay: 450 });
  const ctaRef       = useScrollReveal<HTMLAnchorElement>({ animation: "up", delay: 600 });
  const productsRef  = useScrollReveal<HTMLDivElement>({ animation: "up", delay: 750 });

  return (
    <section className="select-none relative w-full min-h-screen overflow-hidden flex flex-col bg-white">

      {/* ── BACKGROUND: subtle radial blue glow in center ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 70%, rgba(220,38,38,0.08) 0%, rgba(255,255,255,1) 80%)",
        }}
      />

      {/* ── TOP NAV — Logo ── */}
      <div ref={logoRef} className="relative z-20 flex items-center justify-center py-10">
        <Image
          src="/images/logo/dss_logo.png"
          alt="Digital Security Solutions"
          width={70}
          height={70}
          className="object-contain"
          unoptimized
        />
      </div>

      {/* ── HERO CONTENT ── */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 pt-10 pb-0">

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
        <h1 ref={headlineRef} className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center leading-tight mb-5">
          Secure Today.{" "}
          <span style={{ color: "#dc2626" }}>Safer Tomorrow.</span>
        </h1>

        {/* Subheadline */}
        <p ref={subtitleRef} className="text-center text-base md:text-lg max-w-md mb-8 leading-relaxed text-gray-600">
          Advanced digital security solutions to protect your
          <br />
          people, property and peace of mind.
        </p>

        {/* CTA link */}
        <Link
          href="/products"
          ref={ctaRef}
          className="group inline-flex items-center gap-1 text-sm font-medium mb-12 transition-colors duration-200 text-red-600"
        >
          <span>Explore our security solutions</span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
            <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        {/* ── PRODUCTS ROW ── */}
        <div
          ref={productsRef}
          className="relative flex items-end justify-center bg-gray-50 h-55 md:h-75 lg:h-90 border-t border-gray-200"
          style={{ width: "130vw", left: 0, transform: "translateX(-46%)" }}
        >
          <Image
            src="/images/general/PUBLIC_NEXT_PRODUCTS_ROW.png"
            alt="Products row"
            fill
            className="object-cover w-full h-full"
            unoptimized
          />
          {/* Top image fade to match hero background */}
          <div
            className="absolute left-0 right-0 top-0 pointer-events-none"
            style={{
              height: "6rem",
              background: "linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0) 100%)",
              zIndex: 30,
            }}
          />
        </div>
      </div>

      {/* Global bottom light gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-30 pointer-events-none z-20"
        style={{ background: "linear-gradient(to top, rgba(255,255,255,0.95) 30%, rgba(255,255,255,0.6) 70%, transparent)" }}
      />

      {/* Ambient glow behind products */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "700px",
          height: "300px",
          background: "radial-gradient(ellipse at center bottom, rgba(220,38,38,0.12) 0%, transparent 65%)",
          zIndex: 5,
        }}
      />
    </section>
  );
};

export default SecureToday;