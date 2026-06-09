/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { HERO_SLIDES, TRUST_BADGES } from "@/lib/constants";
import Image from "next/image";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Environment, Float, useGLTF } from "@react-three/drei";
// import * as THREE from "three";
import { THEME_COLORS } from "@/themes/colors";

/* ─────────────────────────────────────────────────────────────────────────────
   CCTV MODEL — DESKTOP
   Follows mouse. Dead zone on left extreme AND rightmost ~30% of screen
   (horizontal only).
───────────────────────────────────────────────────────────────────────────── */
/*
function CCTVModel({
  mousePosRef,
}: {
  mousePosRef: React.RefObject<{ x: number; y: number }>;
}) {
  const pivotRef = useRef<THREE.Group>(null);
  const gltf = useGLTF("/models/cctv.glb");

  useFrame(({ camera }) => {
    if (!pivotRef.current || !mousePosRef.current) return;

    // Pin model flush to the right edge using exact frustum math
    const rightEdgeWorld = new THREE.Vector3(1, 0, 0).unproject(camera);
    pivotRef.current.position.set(rightEdgeWorld.x + 1.9, -1, 0);

    const rawDx = mousePosRef.current.x - 1.0;
    const rawDy = mousePosRef.current.y;

    // Left dead zone — only stops at the extreme left edge
    const H_RANGE = 1.85;
    const inLeftRange = rawDx > -H_RANGE;

    // Right dead zone: freeze horizontal tracking when mouse is in the
    // rightmost ~30% of screen. NDC x runs -1 (left) → +1 (right),
    // so 30% from the right edge ≈ x > 0.4
    const RIGHT_DEAD_ZONE = 0.4;
    const inRightDeadZone = mousePosRef.current.x > RIGHT_DEAD_ZONE;

    const inRange = inLeftRange && !inRightDeadZone;

    const MAX_Y = 0.9;
    const MAX_X = 0.5;

    const targetY = inRange
      ? THREE.MathUtils.clamp((rawDx / H_RANGE) * MAX_Y, -MAX_Y, MAX_Y)
      : pivotRef.current.rotation.y;

    const targetX = THREE.MathUtils.clamp(-rawDy * MAX_X, -MAX_X, MAX_X);

    pivotRef.current.rotation.y = THREE.MathUtils.lerp(
      pivotRef.current.rotation.y,
      targetY,
      0.04,
    );
    pivotRef.current.rotation.x = THREE.MathUtils.lerp(
      pivotRef.current.rotation.x,
      targetX,
      0.04,
    );
  });

  return (
    <group ref={pivotRef}>
      <primitive
        object={gltf.scene}
        scale={0.26}
        rotation={[0, -Math.PI / 2, 0]}
        position={[0, 0, 0]}
      />
    </group>
  );
}
*/

/* ─────────────────────────────────────────────────────────────────────────────
   CCTV MODEL — MOBILE
   No mouse. Autonomous spring animation: slow pan left/right + up/down bob,
   always biased toward the left side of screen (negative Y rotation).
───────────────────────────────────────────────────────────────────────────── */
/*
function CCTVModelMobile() {
  const pivotRef = useRef<THREE.Group>(null);
  const gltf = useGLTF("/models/cctv.glb");

  // Spring state — current value + velocity for each axis
  const spring = useRef({
    rotY: -0.5,
    velY: 0,
    rotX: 0.0,
    velX: 0,
  });

  // Patrol targets — change every few seconds
  const target = useRef({ y: -0.01, x: 0.01 });
  const nextChange = useRef(0);

  useFrame(({ clock, camera }) => {
    if (!pivotRef.current) return;

    // Pin to right edge
    const rightEdgeWorld = new THREE.Vector3(1, 0, 0).unproject(camera);
    pivotRef.current.position.set(rightEdgeWorld.x + 1.2, -1, 0);

    const t = clock.getElapsedTime();

    // Pick a new patrol target every 2.2–3.8 seconds
    if (t > nextChange.current) {
      // Y stays negative (left-facing), varies between -0.7 and -0.15
      target.current.y = -0.55 + (Math.random() - 0.5) * 0.08;
      target.current.x = (Math.random() - 0.5) * 0.08;
      nextChange.current = t + 4 + Math.random() * 2;
    }

    // Spring constants — stiffness & damping for a lazy, weighty feel
    const STIFFNESS = 0.22;
    const DAMPING = 0.9;
    const DT = 0.016; // approximate frame delta

    const s = spring.current;

    // Spring force = stiffness * (target - current) - damping * velocity
    s.velY += (STIFFNESS * (target.current.y - s.rotY) - DAMPING * s.velY) * DT;
    s.velX += (STIFFNESS * (target.current.x - s.rotX) - DAMPING * s.velX) * DT;

    s.rotY += s.velY;
    s.rotX += s.velX;

    pivotRef.current.rotation.y = s.rotY;
    pivotRef.current.rotation.x = s.rotX;
  });

  return (
    <group ref={pivotRef}>
      <primitive
        object={gltf.scene}
        scale={0.22} // smaller on mobile
        rotation={[0, -Math.PI / 2, 0]}
        position={[0, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/models/cctv.glb");
*/

const SLIDES = [
  {
    id: "residential",
    image: "/images/hero/hero-security-showcase.jpg",
    alt: "Residential Security Showcase",
    title: "Residential Security Showcase",
    opacity: 0.85,
    gradientWidth: "240px",
    hotspots: [
      {
        id: "r-cctv",
        title: "CCTV SURVEILLANCE",
        desc: "24/7 monitoring for complete safety.",
        top: "22%",
        left: "91%",
      },
      {
        id: "r-alarm",
        title: "FIRE ALARM SOUNDER",
        desc: "Loud audible alerts in case of emergency.",
        top: "26%",
        left: "73%",
      },
      {
        id: "r-panel",
        title: "FIRE ALARM PANEL",
        desc: "Intelligent detection and quick response.",
        top: "50%",
        left: "38%",
      },
      {
        id: "r-mcp",
        title: "MANUAL CALL POINT",
        desc: "Quick activation during emergencies.",
        top: "66%",
        left: "83%",
      },
      {
        id: "r-extinguisher",
        title: "FIRE EXTINGUISHERS",
        desc: "Always ready, always safe.",
        top: "60%",
        left: "31%",
      },
      {
        id: "r-access",
        title: "ACCESS CONTROL",
        desc: "Secure entry for residents & visitors.",
        top: "64%",
        left: "23%",
      },
      {
        id: "r-visitor",
        title: "VISITOR MANAGEMENT",
        desc: "Digital check-in for a safer community.",
        top: "62%",
        left: "35%",
      },
      {
        id: "r-barrier",
        title: "AUTOMATED GATE MOTOR",
        desc: "Reliable motorized automatic gate controls.",
        top: "79%",
        left: "76%",
      },
      {
        id: "r-intercom",
        title: "VIDEO INTERCOM",
        desc: "See, verify and communicate before granting access.",
        top: "60%",
        left: "12%",
      },
      {
        id: "r-pa",
        title: "PUBLIC ADDRESS SYSTEM",
        desc: "Instant announcements when needed.",
        top: "16%",
        left: "40%",
      },
      {
        id: "r-go-inside",
        title: "ENTER SMART HOME",
        desc: "Interactive Showcase. Click to step inside and view home automation systems.",
        top: "50%",
        left: "41%",
        action: "go-to-interior",
        targetSlideId: "residential-interior",
      },
    ],
  },
  {
    id: "residential-interior",
    image: "/images/hero/hero-security-showcase-interior.jpg",
    alt: "Smart Home Interior",
    title: "Smart Home Interior",
    opacity: 0.85,
    gradientWidth: "240px",
    hotspots: [
      {
        id: "w-interior-automation",
        title: "SMART HOME PANEL",
        desc: "Centrally manage lights, security, climate, and audio systems.",
        top: "25%",
        left: "14%",
      },
      {
        id: "w-interior-intercom",
        title: "VIDEO INTERCOM",
        desc: "Interior communication monitor to view and talk with visitors at the gate.",
        top: "53%",
        left: "11%",
      },
      {
        id: "w-interior-pinpad",
        title: "PIN KEYPAD ACCESS",
        desc: "Secure PIN code entry to arm/disarm the security system.",
        top: "53%",
        left: "22%",
      },
      {
        id: "w-interior-alarm",
        title: "SECURITY ALARM PANEL",
        desc: "Quick-arm keypad displaying current system status.",
        top: "77%",
        left: "10%",
      },
      {
        id: "w-interior-motion",
        title: "MOTION SENSOR",
        desc: "PIR motion detector protecting the main living area.",
        top: "73%",
        left: "22%",
      },
      {
        id: "w-interior-tv",
        title: "SURVEILLANCE VIDEO WALL",
        desc: "Real-time camera feed grid monitoring gates, driveways, and garden areas.",
        top: "43%",
        left: "79%",
      },
      {
        id: "w-interior-projector",
        title: "HOME THEATER PROJECTOR",
        desc: "High-definition smart projector for entertainment integration.",
        top: "14%",
        left: "49%",
      },
      {
        id: "w-interior-audio",
        title: "INTEGRATED AUDIO SYSTEM",
        desc: "Premium sound system integrated with home automation controls.",
        top: "55%",
        left: "62%",
      },
      {
        id: "w-interior-receiver",
        title: "CENTRAL AV RECEIVER & NVR",
        desc: "Centralized server hosting security video feeds and smart media.",
        top: "66%",
        left: "73%",
      },
    ],
  },
  {
    id: "commercial",
    image: "/images/hero/hero-security-showcase-business.jpg",
    alt: "Commercial Security Showcase",
    title: "Commercial Security Showcase",
    opacity: 0.85,
    gradientWidth: "384px",
    hotspots: [
      {
        id: "c-cctv-dome",
        title: "CCTV DOME CAMERA",
        desc: "High-definition 360-degree overhead surveillance.",
        top: "12%",
        left: "47%",
      },
      {
        id: "c-cctv-bullet-l",
        title: "WALL SURVEILLANCE",
        desc: "HD bullet cameras guarding entry pathways.",
        top: "25%",
        left: "35%",
      },
      {
        id: "c-cctv-bullet-r",
        title: "PERIMETER CCTV",
        desc: "Angled surveillance monitoring front facade points.",
        top: "25%",
        left: "61%",
      },
      {
        id: "c-alarm-bell",
        title: "FIRE ALARM BELL",
        desc: "Loud physical alarm system for occupant warnings.",
        top: "63%",
        left: "34%",
      },
      {
        id: "c-alarm-panel",
        title: "FIRE ALARM INTERFACE",
        desc: "Emergency trigger points and control modules.",
        top: "54%",
        left: "35%",
      },
      {
        id: "c-access",
        title: "SPEED GATE TURNSTILES",
        desc: "Stainless steel security turnstiles for badge validation.",
        top: "83%",
        left: "62%",
      },
      {
        id: "c-visitor",
        title: "BIOMETRIC KIOSK",
        desc: "Facial recognition terminal for automated check-in.",
        top: "80%",
        left: "78%",
      },
      {
        id: "c-barrier",
        title: "BOOM BARRIER GATE",
        desc: "Heavy-duty vehicle barrier controlling driveway entry.",
        top: "79%",
        left: "17%",
      },
      {
        id: "c-go-inside",
        title: "CONFERENCE ROOM",
        desc: "Interactive Showcase. Click to step inside and view meeting systems.",
        top: "48%",
        left: "51%",
        action: "go-to-workspace",
        targetSlideId: "workspace",
      },
    ],
  },
  {
    id: "workspace",
    image: "/images/hero/hero-security-showcase-collaboration.jpg",
    alt: "Smart Collaboration Workspace",
    title: "Smart Collaboration Workspace",
    opacity: 0.85,
    gradientWidth: "384px",
    hotspots: [
      {
        id: "w-ceiling-mic",
        title: "CEILING MICROPHONE",
        desc: "360° voice pickup for clear communication.",
        top: "4.5%",
        left: "51.5%",
      },
      {
        id: "w-ptz-camera",
        title: "PTZ CAMERA",
        desc: "High quality video with auto framing.",
        top: "21%",
        left: "60.5%",
      },
      {
        id: "w-ceiling-speakers",
        title: "IN-CEILING SPEAKERS",
        desc: "Premium audio throughout the room.",
        top: "9.5%",
        left: "67%",
      },
      {
        id: "w-vc-camera",
        title: "CONFERENCE CAMERA",
        desc: "High-definition camera for clear presenter tracking.",
        top: "34%",
        left: "32.5%",
      },
      {
        id: "w-soundbar",
        title: "SOUNDBAR",
        desc: "Crystal clear audio for every participant.",
        top: "59%",
        left: "32.5%",
      },
      {
        id: "w-control-panel",
        title: "AV CONTROL PANEL",
        desc: "Intuitive touch control for effortless management.",
        top: "84%",
        left: "54.5%",
      },
      {
        id: "w-dsp",
        title: "DSP PROCESSOR",
        desc: "Optimized digital sound processing for clear voice.",
        top: "63%",
        left: "83.5%",
      },
      {
        id: "w-wireless-pres",
        title: "WIRELESS PRESENTATION",
        desc: "Share content wirelessly from any device.",
        top: "68%",
        left: "34.5%",
      },
      {
        id: "w-table-mic",
        title: "TABLE MICROPHONE",
        desc: "Additional mic for better boundary voice coverage.",
        top: "87%",
        left: "35.5%",
      },
      {
        id: "w-smoke-detector",
        title: "SMOKE DETECTOR",
        desc: "Addressable ceiling sensor for early fire detection.",
        top: "6%",
        left: "41.5%",
      },
      {
        id: "w-fire-alarm",
        title: "FIRE ALARM SOUNDER",
        desc: "Wall-mounted alert speaker strobe for emergency warnings.",
        top: "16%",
        left: "80%",
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────────────────────────────────────── */
export default function HeroSlider() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Auto-play interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
    }, 9000); // 9 seconds
    return () => clearInterval(interval);
  }, [currentSlideIndex]);

  const sectionRef = useRef<HTMLElement>(null);
  const bgGridRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const isMobileRef = useRef<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [aspectBoxStyle, setAspectBoxStyle] = useState<React.CSSProperties>({
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  });

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerWidth = rect.width;
      const containerHeight = rect.height;
      const imageAspectRatio = 1024 / 682; // 1.5

      let boxWidth = containerWidth;
      let boxHeight = containerHeight;

      if (containerWidth && containerHeight) {
        const containerAspectRatio = containerWidth / containerHeight;
        if (containerAspectRatio > imageAspectRatio) {
          boxWidth = containerWidth;
          boxHeight = containerWidth / imageAspectRatio;
        } else {
          boxWidth = containerHeight * imageAspectRatio;
          boxHeight = containerHeight;
        }
      }

      setAspectBoxStyle({
        width: `${boxWidth}px`,
        height: `${boxHeight}px`,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted]);

  // const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const slide = {
    badge: currentSlideIndex === 0 
      ? "NEXT-GEN SURVEILLANCE" 
      : currentSlideIndex === 1 
      ? "SMART HOME INTERIOR" 
      : currentSlideIndex === 2
      ? "COMMERCIAL SAFETY" 
      : "SMART COLLABORATION",
    headingLine1: "Digital",
    headingLine2: "Security Solutions",
    headingAccentColor: THEME_COLORS.red,
    description: "Surety of Security",
    ctaPrimaryHref: "/enquiry",
  };

  /* detect mobile once on mount */
  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;
  }, []);

  /* ── GLOBAL MOUSE (desktop only) ───────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePosRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  ─────────────────────────────────────────────────────────────────────── */

  /* ── GSAP ─────────────────────────────────────────────────────────────── */
  useEffect(() => {
    let ctx: any;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const entry = gsap.timeline({ defaults: { ease: "power3.out" } });

        entry.fromTo(
          bgGridRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.4 },
          0,
        );

        [ring1Ref, ring2Ref, ring3Ref].forEach((r, i) => {
          entry.fromTo(
            r.current,
            { scale: 0.4, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.6, ease: "expo.out" },
            0.2 + i * 0.12,
          );
        });

        const words = headlineRef.current?.querySelectorAll(".word");
        if (words?.length) {
          entry.fromTo(
            words,
            { y: 60, opacity: 0, rotateX: -40 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              duration: 0.9,
              stagger: 0.07,
              ease: "back.out(1.4)",
            },
            0.55,
          );
        }

        entry.fromTo(
          subRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.85,
        );
        entry.fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          1.0,
        );
        entry.fromTo(
          badgesRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          1.15,
        );

        /*
        gsap.fromTo(
          scanLineRef.current,
          { y: "-100%" },
          {
            y: "100vh",
            duration: 3.2,
            ease: "none",
            repeat: -1,
            repeatDelay: 2.5,
          },
        );
        */

        const section = sectionRef.current;

        gsap.to(bgGridRef.current, {
          yPercent: -22,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1.6,
          },
        });

        [ring1Ref, ring2Ref, ring3Ref].forEach((r, i) => {
          gsap.to(r.current, {
            yPercent: -30 - i * 8,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 1.2 + i * 0.2,
            },
          });
        });
      }, sectionRef);
    };

    init();
    return () => {
      ctx?.revert();
    };
  }, []);

  const headline = `${slide.headingLine1} ${slide.headingLine2}`;
  const accentStart = slide.headingLine1.split(" ").length;

  return (
    <section
      ref={sectionRef}
      className="select-none relative w-full overflow-hidden bg-white flex flex-col md:block"
      style={{ minHeight: "100svh" }}
    >
      {/* scan line (Commented out)
      <div
        ref={scanLineRef}
        className="pointer-events-none absolute inset-x-0 z-10 h-0.5 opacity-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(220,38,38,0.9), transparent)",
        }}
      />
      */}

      {/* grid */}
      <div
        ref={bgGridRef}
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(107,114,128,0.14) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* HUD RINGS */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div
          ref={ring1Ref}
          className="absolute rounded-full border border-dashed border-red-500/20"
          style={{ width: "min(780px, 110vw)", height: "min(780px, 110vw)" }}
        />
        <div
          ref={ring2Ref}
          className="absolute rounded-full border border-gray-400/10"
          style={{
            width: "min(560px, 85vw)",
            height: "min(560px, 85vw)",
            borderStyle: "dashed",
          }}
        />
        <div
          ref={ring3Ref}
          className="absolute rounded-full border border-red-500/20"
          style={{ width: "min(340px, 60vw)", height: "min(340px, 60vw)" }}
        />
      </div>

      {/* Responsive Wrapper for Mobile Split Layout */}
      <div className="relative w-full aspect-[3/2] md:static md:w-auto md:aspect-auto">
        {/* ── BACKGROUND IMAGE SHOWCASE ── */}
        <div 
          ref={containerRef}
          className="absolute inset-0 md:absolute md:right-0 md:top-0 md:bottom-0 md:left-auto md:w-[85%] z-0 overflow-hidden select-none"
        >
          {/* Aspect Ratio Box that scales exactly like object-cover object-center */}
          <div style={aspectBoxStyle}>
            {/* Images */}
            {SLIDES.map((slide, idx) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  currentSlideIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  className="object-cover object-center"
                  style={{ opacity: slide.opacity }}
                  priority={idx === 0}
                  unoptimized
                />
              </div>
            ))}
          </div>

          {/* Mobile-only background watermark overlay (hidden on mobile, text is below) */}
          <div className="absolute inset-0 bg-white/90 md:bg-transparent pointer-events-none z-15 hidden md:block" />
          
          {/* Left edge fade gradient (desktop only) */}
          <div 
            className="absolute inset-y-0 left-0 hidden md:block bg-gradient-to-r from-white via-white/90 via-white/50 to-transparent pointer-events-none z-15 transition-[width] duration-1000"
            style={{ width: SLIDES[currentSlideIndex]?.gradientWidth ?? "384px" }}
          />
          
          {/* Bottom edge fade gradient */}
          <div className="absolute inset-x-0 bottom-0 h-8 md:h-24 bg-gradient-to-t from-white to-transparent pointer-events-none z-15" />
        </div>

        {/* ── INTERACTIVE HOTSPOTS OVERLAY ── */}
        <div className="absolute inset-0 md:absolute md:right-0 md:top-0 md:bottom-0 md:left-auto md:w-[85%] z-30 pointer-events-none overflow-visible select-none">
          {/* Aspect Ratio Box centered and scaled exactly matching the showcase image */}
          <div style={aspectBoxStyle}>
            {SLIDES.map((slide, slideIdx) => (
              <div
                key={`hotspots-${slide.id}`}
                className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
                  currentSlideIndex === slideIdx ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                {slide.hotspots.map((spot) => {
                  const isSpecial = !!spot.action;
                  const showBelow = parseFloat(spot.top) < 35;
                  return (
                    <div
                      key={spot.id}
                      className="absolute group z-30 pointer-events-auto cursor-pointer"
                      style={{ top: spot.top, left: spot.left, transform: "translate(-50%, -50%)" }}
                      onClick={() => {
                        if (isSpecial && spot.targetSlideId) {
                          const targetIdx = SLIDES.findIndex(s => s.id === spot.targetSlideId);
                          if (targetIdx !== -1) {
                            setCurrentSlideIndex(targetIdx);
                          }
                        }
                      }}
                    >
                      {/* Pulse Ring */}
                      <div
                        className={`absolute inset-0 rounded-full animate-ping opacity-75 h-4 w-4 -m-1 ${
                          isSpecial ? "bg-cyan-400" : "bg-red-500"
                        }`}
                        style={{ width: '16px', height: '16px' }}
                      />
                      
                      {/* Active/Hover Dot */}
                      <button
                        aria-label={spot.title}
                        className={`relative h-2 w-2 rounded-full border border-white focus:outline-none transition-transform duration-300 group-hover:scale-150 ${
                          isSpecial
                            ? "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                            : "bg-red-600"
                        }`}
                        style={{ width: '8px', height: '8px' }}
                      />

                      {/* Tooltip Card */}
                      <div className={`absolute left-1/2 -translate-x-1/2 w-56 p-3 rounded-2xl bg-black/85 backdrop-blur-md border border-white/10 text-white opacity-0 pointer-events-none transition-all duration-300 transform group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto shadow-xl ${
                        showBelow
                          ? "top-full mt-3 -translate-y-2"
                          : "bottom-full mb-3 translate-y-2"
                      }`}>
                        <div
                          className={`absolute left-1/2 -translate-x-1/2 border-4 border-transparent ${
                            showBelow ? "bottom-full -mb-1" : "top-full -mt-1"
                          }`}
                          style={
                            showBelow
                              ? { borderBottomColor: "rgba(0,0,0,0.85)" }
                              : { borderTopColor: "rgba(0,0,0,0.85)" }
                          }
                        />
                        <p className={`text-[10px] font-bold tracking-wider uppercase mb-1 font-sans ${
                          isSpecial ? "text-cyan-400" : "text-red-400"
                        }`}>
                          {spot.title}
                        </p>
                        <p className="text-[11px] text-gray-200 leading-normal font-medium font-sans">
                          {spot.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CCTV CANVAS — DESKTOP (hidden on mobile) ────────────────────────
      <div
        ref={productRef}
        className="pointer-events-none hidden md:block"
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: "420px",
          height: "450px",
          zIndex: 20,
          clipPath: "inset(0 0 0 15%)",
        }}
      >
        <Canvas
          camera={{ position: [0.2, 1, 5], fov: 38 }}
          style={{ width: "100%", height: "100%" }}
          gl={{ alpha: true }}
        >
          <ambientLight intensity={2.4} />
          <directionalLight position={[5, 5, 5]} intensity={3.2} />
          <pointLight position={[-4, 2, 4]} intensity={2} />
          <Suspense fallback={null}>
            <Float speed={1.2} rotationIntensity={0} floatIntensity={0.1}>
              <CCTVModel mousePosRef={mousePosRef} />
            </Float>
            <Environment preset="studio" />
          </Suspense>
        </Canvas>
      </div>
      ────────────────────────────────────────────────────────────────────── */}

      {/* ── CCTV CANVAS — MOBILE (hidden on desktop) ────────────────────────
      <div
        className="pointer-events-none block md:hidden"
        style={{
          position: "absolute",
          right: "-40px",
          top: "14%",
          width: "220px",
          height: "220px",
          zIndex: 20,
          clipPath: "inset(0 0 0 10%)",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 42 }}
          style={{ width: "100%", height: "100%" }}
          gl={{ alpha: true }}
        >
          <ambientLight intensity={2.6} />
          <directionalLight position={[5, 5, 5]} intensity={3.5} />
          <pointLight position={[-4, 2, 4]} intensity={2} />
          <Suspense fallback={null}>
            <CCTVModelMobile />
            <Environment preset="studio" />
          </Suspense>
        </Canvas>
      </div>
      ────────────────────────────────────────────────────────────────────── */}

      {/* MAIN CONTENT */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-10 sm:px-6 md:min-h-svh md:py-0 lg:grid lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-0 lg:px-8">
        {/* LEFT */}
        <div
          className="hero-left-content flex flex-col items-center text-center lg:items-start lg:text-left lg:pr-8 lg:gap-5 lg:justify-normal justify-between"
        >
          {/* ── TOP CLUSTER: badge + headline + subtitle ── */}
          <div className="flex flex-col items-center gap-5 lg:items-start mt-8 lg:mt-0">
            <div className="flex mb-5 items-center gap-2.5 rounded-full border border-red-500/20 bg-red-50 px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-red-700">
                {slide.badge ?? "Next-Gen Surveillance"}
              </span>
            </div>

            <div
              ref={headlineRef}
              className="overflow-hidden -mt-5 md:mt-0"
              style={{ perspective: "600px" }}
            >
              <h1 className="text-[clamp(2.4rem,5.5vw,4rem)] font-black leading-[1.04] tracking-tight text-gray-900">
                {headline.split(" ").map((word, i) => (
                  <span
                    key={i}
                    className="word mr-[0.25em] inline-block last:mr-0"
                    style={{
                      color:
                        i >= accentStart
                          ? (slide.headingAccentColor ?? THEME_COLORS.red)
                          : THEME_COLORS.shadowGrey900,
                      textShadow: "0 2px 10px rgba(255, 255, 255, 0.95), 0 1px 3px rgba(255, 255, 255, 0.90)",
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h1>
            </div>

            <p
              ref={subRef}
              className="mt-5 md:pl-2 md:mt-0 max-w-md text-[25px] leading-relaxed text-gray-600"
              style={{
                textShadow: "0 2px 8px rgba(255, 255, 255, 0.95), 0 1px 3px rgba(255, 255, 255, 0.85)",
              }}
            >
              {slide.description}
            </p>
          </div>

          {/* ── BOTTOM CLUSTER: CTA button + trust badges ── */}
          <div className="flex flex-col items-center gap-0 lg:items-start mb-10 lg:mb-0">
            <div
              ref={ctaRef}
              className="mt-3 md:mt-0 flex flex-wrap items-center gap-3 relative"
            >
              <div className="relative inline-flex group-cta">
                {/* Fog Border Element */}
                <div className="fog-animated-border pointer-events-none" />

                <Link
                  href={slide.ctaPrimaryHref}
                  className="enquiry-btn relative z-10 inline-flex items-center justify-center overflow-hidden rounded-full border border-red-200 bg-red-600 px-7 py-3.5 text-[13px] font-semibold tracking-[0.08em] text-white transition-all duration-500 hover:-translate-y-0.5"
                >
                  {/* liquid fill */}
                  <span className="liquid-fill absolute inset-0 z-0" />
                  {/* glow */}
                  <span className="absolute inset-0 rounded-full opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100 group-hover:bg-red-400/30" />
                  {/* shine sweep */}
                  <span className="shine absolute inset-0 z-1" />
                  {/* particles */}
                  {mounted && (
                    <span className="particles">
                      {[...Array(40)].map((_, i) => {
                        const angle = Math.random() * Math.PI * 2;
                        const distance = 60 + Math.random() * 90;

                        return (
                          <span
                            key={i}
                            className="particle"
                            style={
                              {
                                "--x": `${20 + Math.random() * 60}%`,
                                "--y": `${20 + Math.random() * 60}%`,
                                "--dx": `${Math.cos(angle) * distance}px`,
                                "--dy": `${Math.sin(angle) * distance}px`,
                                "--delay": `${Math.random() * 1.2}s`,
                                "--duration": `${0.8 + Math.random() * 1.4}s`,
                                "--size": `${2 + Math.random() * 4}px`,
                              } as React.CSSProperties
                            }
                          />
                        );
                      })}
                    </span>
                  )}
                  {/* text */}
                  <span className="relative z-5 text-white">
                    Request an Enquiry
                  </span>{" "}
                </Link>
              </div>
            </div>

            <div
              ref={badgesRef}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 md:pt-10 lg:pt-12 justify-center lg:justify-start"
            >
              {TRUST_BADGES.map((badge, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span 
                    className="text-[11px] font-medium text-gray-500"
                    style={{
                      textShadow: "0 1px 4px rgba(255, 255, 255, 0.90)",
                    }}
                  >
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Spacer for background image on desktop */}
        <div className="hidden lg:block w-full h-[500px]" />
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.75); }
        }

        @keyframes fog {
          0% { background-position: 0% 50%; opacity: 0.7; transform: scale(1); }
          50% { background-position: 100% 50%; opacity: 1; transform: scale(1.02); }
          100% { background-position: 0% 50%; opacity: 0.7; transform: scale(1); }
        }

        .fog-animated-border {
          position: absolute;
          inset: -3px;
          border-radius: 9999px;
          background: linear-gradient(90deg, #dc2626, #b91c1c, #6b7280, #dc2626);
          background-size: 300% 300%;
          filter: blur(8px);
          animation: fog 4s ease infinite;
          z-index: 0;
          transition: all 0.5s ease;
        }

        .group-cta:hover .fog-animated-border {
          filter: blur(12px);
          inset: -5px;
          opacity: 1;
        }
          
        .enquiry-btn {
          box-shadow:
            0 0 0 rgba(56, 189, 248, 0),
            inset 0 0 0 rgba(255,255,255,0);
          backdrop-filter: blur(10px);
        }

        .enquiry-btn:hover {
          border-color: rgba(220, 38, 38, 0.6);
          box-shadow:
            0 0 25px rgba(220, 38, 38, 0.25),
            0 0 60px rgba(107, 114, 128, 0.12),
            inset 0 0 30px rgba(220, 38, 38, 0.10);
        }

        .liquid-fill {
          background:
            radial-gradient(circle at 50% 120%, rgba(220,38,38,0.55), transparent 65%);
          transform: translateY(100%);
          transition:
            transform 0.75s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.6s ease;
          opacity: 0.9;
        }

        .enquiry-btn:hover .liquid-fill {
          transform: translateY(0%);
        }

        .shine {
          background: linear-gradient(
            115deg,
            transparent 20%,
            rgba(255,255,255,0.18) 48%,
            transparent 75%
          );
          transform: translateX(-160%);
        }

        .enquiry-btn:hover .shine {
          transition: transform 1s ease;
          transform: translateX(160%);
        }

        .particles {
          position: absolute;
          inset: -40px;
          overflow: visible;
          pointer-events: none;
          z-index: 2;
        }

        .particle {
          position: absolute;
          width: var(--size);
          height: var(--size);
          left: var(--x);
          top: var(--y);
          border-radius: 999px;
          background:
            radial-gradient(circle,
              rgba(254,202,202,1) 0%,
              rgba(220,38,38,1) 45%,
              rgba(220,38,38,0.2) 72%,
              transparent 100%);
          opacity: 0;
          filter:
            blur(0.4px)
            drop-shadow(0 0 10px rgba(220,38,38,0.95))
            drop-shadow(0 0 20px rgba(107,114,128,0.35));
          transform:
            translate(-50%, -50%)
            scale(0.2);
        }

        .enquiry-btn:hover .particle {
          animation: particle-burst var(--duration) linear infinite;
          animation-delay: var(--delay);
        }

        @keyframes particle-burst {
          0% {
            opacity: 0;
            transform:
              translate(-50%, -50%)
              translate(0px, 0px)
              scale(0.2);
          }
          10% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform:
              translate(-50%, -50%)
              translate(var(--dx), var(--dy))
              scale(1);
          }
        }

        @media (min-width: 768px) {
          .hero-left-content {
            min-height: clamp(400px, 72svh, 600px);
          }
        }
        @media (max-width: 767px) {
          .hero-left-content {
            min-height: 380px;
          }
        }
      `}</style>
    </section>
  );
}