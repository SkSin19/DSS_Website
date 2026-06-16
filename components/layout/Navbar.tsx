/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { BRANDS, NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { apiGet } from "@/utils/api";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import dynamic from "next/dynamic";

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────────────── */
interface CategoriesResponse {
  success: boolean;
  message: string;
  categories: string[];
}

export async function getProductCategoriesFromApi() {
  const response = await apiGet<CategoriesResponse>("/categories");
  return response.data.categories ?? [];
}

/* ─────────────────────────────────────────────────────────────────────────────
   CCTV HANGING MODEL
───────────────────────────────────────────────────────────────────────────── */
function CCTVHangingModel({
  mousePosRef,
  isMobile = false,
}: {
  mousePosRef: React.RefObject<{ x: number; y: number }>;
  isMobile?: boolean;
}) {
  const pivotRef = useRef<THREE.Group>(null);
  const gltf = useGLTF("/models/cctv.glb");

  const idleTimeRef = useRef(0);
  const idleTargetY = useRef(0);
  const idleIntervalRef = useRef(0);

  useFrame((_state: any, delta: number) => {
    if (!pivotRef.current) return;

    if (isMobile) {
      idleTimeRef.current += delta;
      idleIntervalRef.current += delta;

      if (idleIntervalRef.current >= 2) {
        idleIntervalRef.current = 0;
        idleTargetY.current = (Math.random() - 0.5) * 0.3;
      }

      pivotRef.current.rotation.y = THREE.MathUtils.lerp(
        pivotRef.current.rotation.y,
        idleTargetY.current,
        0.02,
      );
      pivotRef.current.rotation.x = THREE.MathUtils.lerp(
        pivotRef.current.rotation.x,
        0,
        0.05,
      );
    } else {
      if (!mousePosRef.current) return;

      const modelX =
        window.innerWidth - 100 - (window.innerWidth >= 1024 ? 40 : 24);
      const modelY = 80 + 65;

      const dx = mousePosRef.current.x - modelX;
      const dy = mousePosRef.current.y - modelY;

      const FALLOFF = 400;
      const MAX_Y = 0.6;
      const MAX_X = 0.35;

      const targetY = THREE.MathUtils.clamp(
        (-dx / FALLOFF) * MAX_Y,
        -MAX_Y,
        MAX_Y,
      );
      const targetX = THREE.MathUtils.clamp(
        (-dy / FALLOFF) * MAX_X,
        -MAX_X,
        MAX_X,
      );

      pivotRef.current.rotation.y = THREE.MathUtils.lerp(
        pivotRef.current.rotation.y,
        targetY,
        0.05,
      );
      pivotRef.current.rotation.x = THREE.MathUtils.lerp(
        pivotRef.current.rotation.x,
        targetX,
        0.05,
      );
    }
  });

  return (
    <group rotation={[Math.PI, Math.PI, 0]}>
      <group ref={pivotRef}>
        <primitive
          object={gltf.scene}
          scale={0.18}
          rotation={[0, -Math.PI / 2, 0]}
          position={[-0.4, -2, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/cctv.glb");

/* ─────────────────────────────────────────────────────────────────────────────
   CCTV CANVAS WRAPPER
───────────────────────────────────────────────────────────────────────────── */
function CCTVCanvasInner({
  mousePosRef,
  isMobile = false,
}: {
  mousePosRef: React.RefObject<{ x: number; y: number }>;
  isMobile?: boolean;
}) {
  const { Canvas } = require("@react-three/fiber");
  const { Environment, Float } = require("@react-three/drei");

  return (
    <Canvas
      camera={{ position: [0, 0.5, 4.2], fov: 44, near: 0.1, far: 100 }}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={2.8} />
      <directionalLight position={[5, 5, 5]} intensity={3.5} />
      <pointLight position={[-4, 2, 4]} intensity={2.2} />
      <Suspense fallback={null}>
        <Float speed={1.4} rotationIntensity={0} floatIntensity={0.08}>
          <CCTVHangingModel mousePosRef={mousePosRef} isMobile={isMobile} />
        </Float>
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}

const CCTVCanvasWrapper = dynamic(() => Promise.resolve(CCTVCanvasInner), {
  ssr: false,
});

/* ─────────────────────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileBrandsOpen, setIsMobileBrandsOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [modelReady, setModelReady] = useState(false);

  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let id: number;
    if (typeof requestIdleCallback !== "undefined") {
      id = requestIdleCallback(() => setModelReady(true), { timeout: 2000 });
    } else {
      id = setTimeout(() => setModelReady(true), 1000) as unknown as number;
    }
    return () => {
      if (typeof cancelIdleCallback !== "undefined") cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getProductCategoriesFromApi();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadCategories();
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
    setIsMobileBrandsOpen(false);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsMobileBrandsOpen(false);
  }, []);

  const toggleMobileBrands = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsMobileBrandsOpen((prev) => !prev);
    },
    [],
  );

  return (
    <header
      id="site-header"
      className={`sticky top-0 z-50 w-full bg-gray-200/95 text-gray-900 backdrop-blur-md transition-all select-none duration-300 border-b border-gray-300 overflow-visible ${
        isScrolled ? "navbar-scrolled" : ""
      }`}
      suppressHydrationWarning
      role="banner"
    >
      <style>{`
       @keyframes enq-ring-pulse {
        0%, 100% { opacity: 0; transform: scale(1); }
        40%       { opacity: 1; transform: scale(1); }
        80%       { opacity: 0; transform: scale(1.1); }
      }
      @keyframes enq-dot-breathe {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50%       { opacity: 1;   transform: scale(1.4); }
      }
      @keyframes enq-shimmer {
        0%   { transform: translateX(-100%) skewX(-15deg); }
        100% { transform: translateX(250%) skewX(-15deg); }
      }
      @keyframes enq-wave-1 {
        0%   { transform: translateX(0%)   scaleY(1);    border-radius: 42% 58% 45% 55% / 30% 30% 70% 70%; }
        25%  { transform: translateX(-8%)  scaleY(1.15); border-radius: 55% 45% 60% 40% / 40% 25% 75% 60%; }
        50%  { transform: translateX(-18%) scaleY(0.9);  border-radius: 38% 62% 52% 48% / 25% 40% 60% 75%; }
        75%  { transform: translateX(-8%)  scaleY(1.1);  border-radius: 60% 40% 42% 58% / 35% 60% 40% 65%; }
        100% { transform: translateX(0%)   scaleY(1);    border-radius: 42% 58% 45% 55% / 30% 30% 70% 70%; }
      }
      @keyframes enq-wave-2 {
        0%   { transform: translateX(0%)   scaleY(1);    border-radius: 55% 45% 38% 62% / 40% 55% 45% 60%; }
        33%  { transform: translateX(-12%) scaleY(1.2);  border-radius: 40% 60% 55% 45% / 55% 35% 65% 45%; }
        66%  { transform: translateX(-22%) scaleY(0.85); border-radius: 62% 38% 48% 52% / 30% 65% 35% 70%; }
        100% { transform: translateX(0%)   scaleY(1);    border-radius: 55% 45% 38% 62% / 40% 55% 45% 60%; }
      }

      .enq-btn {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border: 1.5px solid rgba(220, 38, 38, 0.4);
        cursor: pointer;
        font-weight: 700;
        letter-spacing: 0.03em;
        color: #fff;
        background: #dc2626;
        overflow: hidden;
        transition:
          transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1),
          box-shadow 0.25s ease,
          color 0.5s ease,
          border-color 0.3s ease;
        box-shadow:
          0 2px 10px rgba(220, 38, 38, 0.4),
          inset 0 1px 0 rgba(255,255,255,0.2);
      }

      .enq-btn--lg {
        padding: 12px 26px;
        border-radius: 100px;
        font-size: 14px;
      }

      .enq-btn--sm {
        padding: 9px 18px;
        border-radius: 100px;
        font-size: 13px;
      }

      .enq-btn:hover {
        color: #dc2626;
        border-color: rgba(220, 38, 38, 0.8);
        transform: scale(1.06) translateY(-1px);
        box-shadow:
          0 0 0 5px rgba(220, 38, 38, 0.15),
          0 10px 28px rgba(220, 38, 38, 0.3),
          inset 0 0 30px rgba(220, 38, 38, 0.06);
      }

      .enq-btn:active {
        transform: scale(0.96) translateY(0);
        box-shadow:
          0 0 0 3px rgba(220, 38, 38, 0.15),
          0 2px 8px rgba(220, 38, 38, 0.3);
        transition: transform 0.08s ease, box-shadow 0.08s ease;
      }

      .enq-gloss {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: linear-gradient(160deg, rgba(255,255,255,0.22) 0%, transparent 55%);
        pointer-events: none;
        transition: opacity 0.45s ease;
      }
      .enq-btn:hover .enq-gloss { opacity: 0; }

      .enq-ring {
        position: absolute;
        inset: -3px;
        border-radius: 100px;
        border: 2px solid rgba(239, 68, 68, 0.55);
        animation: enq-ring-pulse 2.6s ease-in-out infinite;
        pointer-events: none;
      }

      .enq-liquid {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        overflow: hidden;
        transform: translateY(101%);
        transition: transform 0s;
        background: white;
        pointer-events: none;
      }

      .enq-liquid::before,
      .enq-liquid::after {
        content: '';
        position: absolute;
        left: -60%;
        width: 220%;
        background: white;
        border-radius: 42% 58% 45% 55% / 30% 30% 70% 70%;
        animation: none;
      }

      .enq-liquid::before { height: 40px; top: -22px; opacity: 1; }
      .enq-liquid::after  { height: 36px; top: -18px; opacity: 0.6; }

      .enq-btn:hover .enq-liquid {
        transform: translateY(0%);
        transition: transform 1.1s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .enq-btn:hover .enq-liquid::before { animation: enq-wave-1 1.4s ease-in-out infinite; }
      .enq-btn:hover .enq-liquid::after  { animation: enq-wave-2 1.9s ease-in-out infinite 0.3s; }

      .enq-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(255,255,255,0.85);
        animation: enq-dot-breathe 2s ease-in-out infinite;
        flex-shrink: 0;
        position: relative;
        z-index: 2;
        transition: background 0.45s ease;
      }
      .enq-btn:hover .enq-dot { background: #dc2626; }
      .enq-btn--sm .enq-dot   { width: 5px; height: 5px; }

      .enq-shimmer {
        position: absolute;
        top: 0; left: 0;
        width: 40%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.12), transparent);
        transform: translateX(-100%) skewX(-15deg);
        pointer-events: none;
        z-index: 3;
      }
      .enq-btn:hover .enq-shimmer { animation: enq-shimmer 0.65s ease forwards; }

      .enq-btn > span[style] { position: relative; z-index: 2; }

      .enq-arrow {
        display: inline-flex;
        align-items: center;
        position: relative;
        transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .enq-btn:hover .enq-arrow { transform: translateX(3px); }

      .cctv-mount-line {
        position: absolute;
        top: 0; left: 50%;
        transform: translateX(-50%);
        width: 2px; height: 14px;
        background: linear-gradient(to bottom, #9ca3af, #6b7280);
        border-radius: 1px;
        z-index: 51;
      }

      .cctv-mount-bracket {
        position: absolute;
        top: -3px; left: 50%;
        transform: translateX(-50%);
        width: 10px; height: 6px;
        border-top: 2px solid #9ca3af;
        border-left: 2px solid #9ca3af;
        border-right: 2px solid #9ca3af;
        border-radius: 3px 3px 0 0;
        z-index: 51;
      }

      /* ── Mobile brands panel ── */
      .mobile-brands-panel {
        overflow: hidden;
        transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                    opacity 0.25s ease;
      }
      .mobile-brands-panel.closed {
        max-height: 0;
        opacity: 0;
        pointer-events: none;
      }
      .mobile-brands-panel.open {
        max-height: 600px;
        opacity: 1;
        pointer-events: auto;
      }

      .mobile-brand-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 16px;
        border-radius: 12px;
        text-decoration: none;
        transition: background-color 0.15s ease;
      }
      .mobile-brand-item:active {
        background-color: rgba(220, 38, 38, 0.1);
      }

      .mobile-brands-chevron {
        transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .mobile-brands-chevron.rotated {
        transform: rotate(180deg);
      }
      `}</style>

      <nav
        className="container-main flex items-center justify-between h-16 md:h-20"
        aria-label="Main navigation"
      >
        {/* ── Logo ── */}
        <Link
          href="/"
          id="nav-logo"
          className="flex items-center gap-2.5 shrink-0 focus-ring rounded-lg"
          aria-label={`${SITE_NAME} — Home`}
          onClick={closeMobileMenu}
        >
          <Image
            src="/images/logo/dss_logo.png"
            alt="Digital Security Solutions logo"
            width={40}
            height={40}
            className="w-9 h-9 md:w-10 md:h-10"
            priority
          />
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm md:text-base font-bold text-gray-900 tracking-tight">
              DIGITAL SECURITY
            </span>
            <span className="text-[10px] md:text-xs font-semibold text-gray-500 tracking-widest uppercase">
              SOLUTIONS
            </span>
          </span>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <ul className="hidden lg:flex items-center gap-1" role="list">
          {NAV_LINKS.map((link) => {
            if (link.label === "Products") {
              return (
                <li key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className="px-4 py-2 text-sm font-medium text-gray-900 hover:text-red-600! rounded-lg transition-colors duration-200 focus-ring inline-flex items-center gap-1"
                  >
                    {link.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                  <div className="absolute left-1/2 top-full z-50 w-150 -translate-x-1/2 pt-3 opacity-0 invisible translate-y-2 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
                    <div className="rounded-2xl border border-gray-300 bg-gray-50 backdrop-blur-xl shadow-2xl p-4">
                      <p className="px-2 pb-3 text-xs tracking-[0.2em] uppercase text-gray-500">
                        Product Categories
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category) => (
                          <Link
                            key={category}
                            href={`/products?category=${encodeURIComponent(category)}`}
                            className="rounded-xl p-3 transition-colors duration-200 hover:bg-red-200/50 focus-ring"
                          >
                            <p className="text-sm font-semibold text-gray-900">
                              {category}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              );
            }

            if (link.label === "Brands") {
              return (
                <li key={link.href} className="relative group">
                  <Link
                    href=""
                    id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className="px-4 py-2 text-sm font-medium text-gray-900 hover:text-red-600! rounded-lg transition-colors duration-200 focus-ring inline-flex items-center gap-1"
                  >
                    {link.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                  <div className="absolute left-1/2 top-full z-50 w-150 -translate-x-1/2 pt-3 opacity-0 invisible translate-y-2 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
                    <div className="rounded-2xl border border-gray-300 bg-gray-50 backdrop-blur-xl shadow-2xl p-4">
                      <p className="px-2 pb-3 text-xs tracking-[0.2em] uppercase text-gray-500">
                        Our Brands
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {BRANDS.map((brand) => (
                          <Link
                            key={brand.name}
                            href={`/products?company=${encodeURIComponent(brand.name)}`}
                            className="rounded-xl p-3 transition-colors duration-200 hover:bg-red-200/50 focus-ring flex items-center gap-3"
                          >
                            {brand.logoSrc && (
                              <Image
                                src={brand.logoSrc}
                                alt={brand.name}
                                width={32}
                                height={32}
                                className="w-8 h-8 object-contain shrink-0"
                              />
                            )}
                            <p className="text-sm font-semibold text-gray-900">
                              {brand.name}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              );
            }

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="px-4 py-2 text-sm font-medium text-gray-900 hover:text-red-600! rounded-lg transition-colors duration-200 focus-ring"
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Desktop Enquire Button ── */}
        <Link href="/enquiry" className="hidden md:block">
          <button className="enq-btn enq-btn--lg">
            <span className="enq-gloss" />
            <span className="enq-ring" />
            <span className="enq-shimmer" />
            <span className="enq-liquid" />
            <span className="enq-dot" />
            <span style={{ position: "relative" }}>Enquire Now</span>
          </button>
        </Link>

        {/* ── Mobile Menu Toggle ── */}
        <button
          type="button"
          id="mobile-menu-toggle"
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-red-600 transition-colors focus-ring"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-6 h-6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-6 h-6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* ── Mobile Menu Drawer ── */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-150 border-t border-gray-300 bg-gray-50"
            : "max-h-0"
        }`}
        role="region"
        aria-label="Mobile navigation"
      >
        <div className="container-main py-4 space-y-1">
          {NAV_LINKS.map((link) => {
            // ── Brands: accordion with logo grid ──
            if (link.label === "Brands") {
              return (
                <div key={link.href}>
                  {/* Accordion trigger */}
                  <button
                    type="button"
                    onClick={toggleMobileBrands}
                    aria-expanded={isMobileBrandsOpen}
                    className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-200 hover:text-red-600 rounded-xl transition-colors text-left"
                  >
                    <span>Brands</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={`w-5 h-5 text-gray-400 mobile-brands-chevron ${
                        isMobileBrandsOpen ? "rotated" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {/* Slide-down brands panel */}
                  <div
                    className={`mobile-brands-panel ${isMobileBrandsOpen ? "open" : "closed"}`}
                    aria-hidden={!isMobileBrandsOpen}
                  >
                    <div className="mx-2 mt-1 mb-2 rounded-xl border border-gray-200 bg-white overflow-hidden">
                      <p className="px-4 pt-3 pb-2 text-[10px] tracking-[0.2em] uppercase text-gray-400 font-semibold">
                        Our Brands
                      </p>
                      <div className="grid grid-cols-2 gap-px bg-gray-100">
                        {BRANDS.map((brand) => (
                          <Link
                            key={brand.name}
                            href={`/products?company=${encodeURIComponent(brand.name)}`}
                            className="mobile-brand-item bg-white"
                            onClick={closeMobileMenu}
                          >
                            {brand.logoSrc ? (
                              <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 p-1">
                                <Image
                                  src={brand.logoSrc}
                                  alt={brand.name}
                                  width={28}
                                  height={28}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            ) : (
                              <div className="w-9 h-9 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0">
                                <span className="text-xs font-bold text-red-600">
                                  {brand.name.charAt(0)}
                                </span>
                              </div>
                            )}
                            <span className="text-sm font-medium text-gray-800 leading-tight">
                              {brand.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // ── All other nav links ──
            return (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-200 hover:text-red-600 rounded-xl transition-colors"
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-2 pb-1 px-1">
            <Link href="/enquiry" onClick={closeMobileMenu}>
              <button className="enq-btn enq-btn--sm w-full justify-center">
                <span className="enq-gloss" />
                <span className="enq-ring" />
                <span className="enq-shimmer" />
                <span className="enq-liquid" />
                <span className="enq-dot" />
                <span style={{ position: "relative" }}>Enquire Now</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Desktop hanging CCTV model ── */}
      {modelReady && !isMobile && (
        <div
          aria-hidden="true"
          className="pointer-events-none hidden md:block absolute right-6 lg:right-10 top-full z-40"
          style={{ width: 200, height: 214 }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 200,
              height: 200,
            }}
          >
            <CCTVCanvasWrapper mousePosRef={mousePosRef} isMobile={false} />
          </div>
        </div>
      )}

      {/* ── Mobile hanging CCTV model ── */}
      {modelReady && isMobile && (
        <div
          aria-hidden="true"
          className={`pointer-events-none md:hidden absolute top-full z-40 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{ width: 100, height: 100, right: 16, bottom: 10 }}
        >
          <CCTVCanvasWrapper mousePosRef={mousePosRef} isMobile={true} />
        </div>
      )}
    </header>
  );
}