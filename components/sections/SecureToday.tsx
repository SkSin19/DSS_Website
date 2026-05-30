"use client";

import React from "react";
import Image from "next/image";

const SecureToday: React.FC = () => {
  return (
    <section className="select-none relative w-full min-h-screen overflow-hidden flex flex-col" style={{ background: "#030617" }}>

      {/* ── BACKGROUND: subtle radial blue glow in center ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 70%, rgba(20,50,120,0.18) 0%, rgba(3,6,12,1) 80%)",
        }}
      />

      {/* Decorative dashed box removed to eliminate dotted outline around logo */}

      {/* ── TOP NAV — Logo ── */}
      <div className="relative z-20 flex items-center justify-center py-10">
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
        <div className="mb-6">
          <svg width="52" height="58" viewBox="0 0 56 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M28 2L4 12V30C4 44.4 14.8 57.8 28 61C41.2 57.8 52 44.4 52 30V12L28 2Z"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M18 31L24 37L38 23"
              stroke="#2563eb"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center leading-tight mb-5">
          Secure Today.{" "}
          <span style={{ color: "#3b82f6" }}>Safer Tomorrow.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-center text-base md:text-lg max-w-md mb-8 leading-relaxed" style={{ color: "#8fa3c0" }}>
          Advanced digital security solutions to protect your
          <br />
          people, property and peace of mind.
        </p>

        {/* CTA link */}
        <a
          href="#"
          className="group inline-flex items-center gap-1 text-sm font-medium mb-12 transition-colors duration-200"
          style={{ color: "#3b82f6" }}
        >
          <span>Explore our security solutions</span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
            <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        {/* ── PRODUCTS ROW — replaced by image (full-width, blending) ── */}
        <div className="relative flex items-end justify-center bg-black h-[220px] md:h-[300px] lg:h-[360px]" style={{ backgroundColor: "#000", width: '130vw', left: '50%', transform: 'translateX(-46%)' }}>
          <Image
            src="/images/general/products-row.png"
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
              background: "linear-gradient(to bottom, #030617 0%, rgba(3,6,23,0) 100%)",
              zIndex: 30,
            }}
          />
        </div>
      </div>

      {/* Global bottom dark gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none z-20"
        style={{ background: "linear-gradient(to top, #070d1c 30%, rgba(7,13,28,0.7) 70%, transparent)" }}
      />

      {/* Ambient glow behind products */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "700px",
          height: "300px",
          background: "radial-gradient(ellipse at center bottom, rgba(37,99,235,0.18) 0%, transparent 65%)",
          zIndex: 5,
        }}
      />
    </section>
  );
};

export default SecureToday;