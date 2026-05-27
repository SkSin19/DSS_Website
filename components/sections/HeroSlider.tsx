/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Suspense, useEffect, useRef } from "react";
import Link from "next/link";
import { HERO_SLIDES, TRUST_BADGES } from "@/lib/constants";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────────────────────────
   CCTV MODEL — DESKTOP
   Follows mouse. Dead zone only on horizontal axis (very small).
───────────────────────────────────────────────────────────────────────────── */
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

    // Very small horizontal dead zone — only stops at the extreme left edge
    const H_RANGE = 1.85; // nearly the full screen width before stopping
    const inRange = rawDx > -H_RANGE;

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

/* ─────────────────────────────────────────────────────────────────────────────
   CCTV MODEL — MOBILE
   No mouse. Autonomous spring animation: slow pan left/right + up/down bob,
   always biased toward the left side of screen (negative Y rotation).
───────────────────────────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────────────────────────────────────── */
export default function HeroSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgGridRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isMobileRef = useRef<boolean>(false);

  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const slide = HERO_SLIDES[0];

  /* detect mobile once on mount */
  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;
  }, []);

  /* ── GLOBAL MOUSE (desktop only) ─────────────────────────────────────── */
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
        entry.fromTo(
          statsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          1.1,
        );

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

  /* ── SPOTLIGHT ─────────────────────────────────────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(async () => {
        const { gsap } = await import("gsap");
        const { left, top } = section.getBoundingClientRect();
        gsap.to(spotlightRef.current, {
          x: e.clientX - left,
          y: e.clientY - top,
          duration: 0.6,
          ease: "power2.out",
        });
      });
    };

    section.addEventListener("mousemove", onMove);
    return () => {
      section.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const headline = `${slide.headingLine1} ${slide.headingLine2}`;
  const accentStart = slide.headingLine1.split(" ").length;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#020912]"
      style={{ minHeight: "100svh" }}
    >
      {/* spotlight */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute z-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(14,165,233,0.10) 0%, transparent 70%)",
          top: 0,
          left: 0,
        }}
      />

      {/* scan line */}
      <div
        ref={scanLineRef}
        className="pointer-events-none absolute inset-x-0 z-10 h-[2px] opacity-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(14,165,233,0.9), transparent)",
        }}
      />

      {/* grid */}
      <div
        ref={bgGridRef}
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148,163,184,0.13) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* ambient lights */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-32 left-1/2 h-[480px] w-[700px] -translate-x-1/2 rounded-full bg-sky-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[320px] w-[420px] rounded-full bg-sky-900/20 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[240px] w-[300px] rounded-full bg-indigo-900/15 blur-[90px]" />
      </div>

      {/* HUD RINGS */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div
          ref={ring1Ref}
          className="absolute rounded-full border border-dashed border-sky-500/10"
          style={{ width: "min(780px, 110vw)", height: "min(780px, 110vw)" }}
        />
        <div
          ref={ring2Ref}
          className="absolute rounded-full border border-sky-400/[0.07]"
          style={{
            width: "min(560px, 85vw)",
            height: "min(560px, 85vw)",
            borderStyle: "dashed",
          }}
        />
        <div
          ref={ring3Ref}
          className="absolute rounded-full border border-sky-500/[0.12]"
          style={{ width: "min(340px, 60vw)", height: "min(340px, 60vw)" }}
        />
      </div>

      {/* ── CCTV CANVAS — DESKTOP (hidden on mobile) ──────────────────────── */}
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
          camera={{ position: [0, 0, 5], fov: 38 }}
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

      {/* ── CCTV CANVAS — MOBILE (hidden on desktop) ──────────────────────── */}
      {/*
          Fixed to top-right corner, smaller, autonomous spring patrol.
          Half the canvas hangs off the right edge so the mount/body is
          flush with the screen edge — only the lens peeks into view.
      */}
      <div
        className="pointer-events-none block md:hidden"
        style={{
          position: "absolute",
          right: "-40px" /* shift right so body is off-screen */,
          top: "14%" /* top-right corner feel */,
          width: "220px",
          height: "220px",
          zIndex: 20,
          clipPath: "inset(0 0 0 10%)" /* clip only a sliver on left */,
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

      {/* MAIN CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col items-center justify-center px-4 py-24 sm:px-6 lg:grid lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-0 lg:px-8 lg:py-0">
        {/* LEFT */}
        <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left lg:pr-8">
          <div className="flex items-center gap-2.5 rounded-full border border-sky-500/20 bg-sky-500/[0.07] px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-sky-300">
              {slide.badge ?? "Next-Gen Surveillance"}
            </span>
          </div>

          <div
            ref={headlineRef}
            className="overflow-hidden"
            style={{ perspective: "600px" }}
          >
            <h1 className="text-[clamp(2.4rem,5.5vw,4rem)] font-black leading-[1.04] tracking-tight text-white">
              {headline.split(" ").map((word, i) => (
                <span
                  key={i}
                  className="word mr-[0.25em] inline-block last:mr-0"
                  style={{
                    color:
                      i >= accentStart
                        ? (slide.headingAccentColor ?? "#38bdf8")
                        : "white",
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>
          </div>

          <p
            ref={subRef}
            className="max-w-md text-[15px] leading-relaxed text-slate-400"
          >
            {slide.description}
          </p>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-3">
            <Link
              href={slide.ctaPrimaryHref}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-sky-500 px-6 py-3 text-[13px] font-bold text-white shadow-lg shadow-sky-500/25 transition-all duration-300 hover:bg-sky-400 hover:shadow-sky-400/35 hover:-translate-y-px"
            >
              {slide.ctaPrimaryLabel}
            </Link>
            <Link
              href={slide.ctaSecondaryHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-[13px] font-semibold text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white hover:-translate-y-px"
            >
              {slide.ctaSecondaryLabel}
            </Link>
          </div>

          <div
            ref={badgesRef}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1"
          >
            {TRUST_BADGES.map((badge, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="text-[11px] font-medium text-slate-400">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — empty, model is fixed overlay */}
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.75); }
        }
      `}</style>
    </section>
  );
}
