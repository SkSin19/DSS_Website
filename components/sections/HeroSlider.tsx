"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Cctv,
  KeyRound,
  Fingerprint,
  Volume2,
  House,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  DoorClosedLocked,
  type LucideIcon,
} from "lucide-react";
import { THEME_COLORS } from "@/themes/colors";

/* ────────────────────────────────────────────────────────────────────────
   HERO MEDIA
   ------------------------------------------------------------------------
   The hero background cycles through this list IN ORDER:
   videos first, then still images. Each item gets one pagination indicator.

   ▸ TO ADD / REORDER MEDIA LATER, just edit this array:
       • A video item:
           { id: "my-video", type: "video", src: "/videos/my-clip.mp4",
             srcWebm: "/videos/my-clip.webm", // optional, smaller + preferred
             poster: "/images/hero/xyz.webp", durationMs: 12000 }
       • An image item:
           { id: "my-image", type: "image", src: "/images/hero/xyz.webp",
             alt: "…", durationMs: 6000 }
   Videos autoplay muted and advance to the next item when they finish
   (or after durationMs). Images advance after durationMs.

   PERF NOTES:
   - Always set `poster` on video items. Without it the video area is
     black/blank until the first frame decodes, which hurts LCP and looks
     broken on slow connections.
   - If you can, export a `.webm` (VP9/AV1) alongside the `.mp4` — it's
     typically 30-50% smaller for the same visual quality and browsers
     that support it will prefer it automatically via the <source> tags
     below.
   - Keep hero videos short, muted, and re-encoded at a sane bitrate
     (e.g. 1080p, ~2-4 Mbps, no audio track) — the biggest perf win here
     is almost always the source file itself, this component can only do
     so much.
   ──────────────────────────────────────────────────────────────────────── */

type MediaItem = {
  id: string;
  type: "video" | "image";
  src: string;
  srcWebm?: string;
  poster?: string;
  alt?: string;
  opacity?: number;
  durationMs?: number;
};

const DEFAULT_IMAGE_MS = 6000;
const DEFAULT_VIDEO_CAP_MS = 30000; // safety cap in case a video's "ended" never fires

const MEDIA: MediaItem[] = [
  // ── VIDEOS (play in order) ──
  {
    id: "video-landing",
    type: "video",
    src: "/videos/dssLanding.mp4",
    // srcWebm: "/videos/dssLanding.webm", // add this once you have a webm export
    poster: "/images/hero/dssLanding-poster.webp", // TODO: add a real poster frame here
  },
  // ▸ THIRD VIDEO - drop the file into /public/videos, then uncomment this
  //   block (it will get its own pagination indicator automatically).
  // {
  //   id: "video-three",
  //   type: "video",
  //   src: "/videos/hero-video-3.mp4",
  //   poster: "/images/hero/hero-video-3-poster.webp",
  // },

  // ── STILL IMAGES ──
  {
    id: "residential",
    type: "image",
    src: "/images/hero/hero-security-showcase.webp",
    alt: "Residential Security Showcase",
  },
  {
    id: "commercial",
    type: "image",
    src: "/images/hero/hero-security-showcase-business.webp",
    alt: "Commercial Security Showcase",
  },
  {
    id: "workspace",
    type: "image",
    src: "/images/hero/hero-security-showcase-collaboration.webp",
    alt: "Smart Collaboration Workspace",
  },
];

/* ── RIGHT-CARD SERVICES (icon + label grid, like the reference) ──
   Edit freely - add/remove items and the grid reflows. */
type ServiceItem = {
  id: string;
  icon: LucideIcon;
  label: string;
  href: string;
};

const SERVICES: ServiceItem[] = [
  {
    id: "surveillance",
    icon: Cctv,
    label: "Surveillance systems",
    href: "/products?category=Surveillance",
  },
  {
    id: "access",
    icon: KeyRound,
    label: "Access control",
    href: "/products?category=Access%20Control",
  },
  {
    id: "biometric",
    icon: Fingerprint,
    label: "Biometric & identity",
    href: "/products?category=Biometric%20%26%20Identity",
  },
  {
    id: "pa-av",
    icon: Volume2,
    label: "PA system & AV",
    href: "/products?category=PA%20SYSTEM%20%26%20AV",
  },
  {
    id: "automation",
    icon: House,
    label: "Smart home automation",
    href: "/solutions",
  },
  {
    id: "gateautomation",
    icon: DoorClosedLocked,
    label: "Gate Automation",
    href: "/products?category=Gate%20Automation",
  },
];

export default function HeroSlider() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const goTo = useCallback((idx: number) => {
    setCurrentIndex(((idx % MEDIA.length) + MEDIA.length) % MEDIA.length);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % MEDIA.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + MEDIA.length) % MEDIA.length);
  }, []);

  const current = MEDIA[currentIndex];

  // ── PAUSE WHEN OFFSCREEN ──
  // Stop decoding/playing the video (and stop burning CPU/battery/data)
  // once the hero has been scrolled past.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── PAUSE WHEN TAB IS HIDDEN ──
  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const shouldPlay = inView && tabVisible;

  // ── AUTO-ADVANCE + PLAY/PAUSE ──
  // Images advance after their duration. Videos advance when they finish
  // playing (onEnded) but also carry a safety timeout so a stalled/looping
  // clip can never freeze the carousel. Playback itself is gated on
  // shouldPlay so an offscreen/backgrounded tab doesn't keep decoding video.
  useEffect(() => {
    if (!mounted) return;

    const activeVideo = videoRefs.current[currentIndex];
    if (current.type === "video" && activeVideo) {
      if (shouldPlay) {
        try {
          const p = activeVideo.play();
          if (p && typeof p.catch === "function") p.catch(() => {});
        } catch {
          /* autoplay may be blocked; safety timer below still advances */
        }
      } else {
        activeVideo.pause();
      }
    }

    if (!shouldPlay) return; // don't advance the carousel while paused offscreen/hidden

    const duration =
      current.durationMs ??
      (current.type === "video" ? DEFAULT_VIDEO_CAP_MS : DEFAULT_IMAGE_MS);

    const timer = setTimeout(goNext, duration);
    return () => clearTimeout(timer);
  }, [mounted, currentIndex, current, goNext, shouldPlay]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[90vh] md:h-[90vh] overflow-hidden bg-neutral-900 select-none font-poppins"
    >
      {/* ── BACKGROUND MEDIA (full-bleed) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {MEDIA.map((item, idx) => {
          const isActive = currentIndex === idx;
          const isNext = (currentIndex + 1) % MEDIA.length === idx;
          const shouldLoadVideo = item.type === "video" && (isActive || isNext);

          return (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                isActive
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {item.type === "video" ? (
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  style={{ opacity: item.opacity ?? 1 }}
                  poster={item.poster}
                  muted
                  playsInline
                  disablePictureInPicture
                  disableRemotePlayback
                  controlsList="nodownload noplaybackrate"
                  preload={
                    !shouldLoadVideo ? "none" : isActive ? "auto" : "metadata"
                  }
                  onEnded={() => {
                    if (isActive) goNext();
                  }}
                >
                  {shouldLoadVideo && item.srcWebm && (
                    <source src={item.srcWebm} type="video/webm" />
                  )}
                  {shouldLoadVideo && <source src={item.src} type="video/mp4" />}
                </video>
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt ?? ""}
                  fill
                  className="object-cover object-center"
                  style={{ opacity: item.opacity ?? 1 }}
                  priority={idx === 0}
                  sizes="100vw"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ── LEGIBILITY SCRIM (subtle dark wash on the left for white text) ── */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.30) 30%, rgba(0,0,0,0.08) 52%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* ── OVERLAY CONTENT ── */}
      <div className="relative z-30 h-full">
        <div className="mx-auto flex h-full min-h-[90vh] w-full max-w-360 flex-col items-stretch justify-center gap-8 px-5 py-10 sm:px-8 md:min-h-0 md:flex-row md:items-center md:justify-between md:gap-6 md:py-0 lg:px-14">
          {/* LEFT - headline + stat + CTA */}
          <div className="hero-fade-up w-full max-w-xl self-center md:self-center">
            <h1 className="font-poppins font-extrabold leading-[1.05] tracking-tight text-white text-[clamp(2.3rem,5.4vw,4.4rem)]">
              Digital Security
              <br />
              <span style={{ color: THEME_COLORS.red }}>Solutions</span>
            </h1>

            {/* boxed stat + supporting phrase (mirrors reference) */}
            <div className="mt-7 flex items-center gap-4">
              <div className="flex flex-col items-center justify-center rounded-md border border-white/70 px-4 py-2 text-center leading-none">
                <span className="font-poppins text-2xl font-bold text-white">
                  18+ Years
                </span>
                <span className="mt-1 font-poppins text-[11px] font-medium uppercase tracking-wide text-white/80">
                  experience
                </span>
              </div>
              <p className="font-poppins text-[clamp(1.1rem,2vw,1.5rem)] font-semibold leading-tight text-white">
                Surety of
                <br />
                Security
              </p>
            </div>

            {/* outlined pill CTA (desktop / tablet) */}
            <div className="mt-8 hidden md:block">
              <Link
                href="/enquiry"
                className="group inline-flex text-white! items-center gap-3 rounded-full border border-white/80 bg-transparent px-7 py-3.5 font-poppins text-[15px] font-semibolds transition-all duration-300 hover:border-white hover:bg-white hover:text-black!"
              >
                Request an Enquiry
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* RIGHT - white service card (hidden on mobile) */}
          <div className="hero-fade-up-delayed hidden w-full self-center rounded-2xl backdrop-blur-md md:block md:w-[clamp(280px,24vw,380px)]">
            <div className="h-107.5 rounded-2xl bg-white/40 p-6 shadow-2xl sm:p-8 md:p-9">
              <h2
                className="font-poppins leading-[1.05] tracking-tight text-[clamp(1.9rem,3vw,3rem)]"
                style={{ color: THEME_COLORS.red }}
              >
                Secure
                <br />
                <span className="font-medium">your space</span>
              </h2>

              <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3">
                {SERVICES.map(({ id, icon: Icon, label, href }) => (
                  <Link
                    key={id}
                    href={href}
                    className="group flex flex-col items-center text-center focus:outline-none"
                  >
                    <Icon
                      className="h-9 w-9 text-neutral-700 transition-colors duration-300 group-hover:text-red-600"
                      strokeWidth={1.4}
                    />

                    <span className="mt-3 font-poppins text-[13px] font-medium leading-snug text-neutral-800 transition-colors duration-300 group-hover:text-red-600">
                      {label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE-ONLY CTA (bottom center, above pagination) ── */}
      <div className="absolute inset-x-0 bottom-20 z-40 flex justify-center px-6 md:hidden">
        <Link
          href="/enquiry"
          className="group inline-flex items-center gap-3 rounded-full border border-white/80 bg-black/30 px-7 py-3.5 font-poppins text-[15px] font-semibold text-white! backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
        >
          Request an Enquiry
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* ── PAGINATION (reference-style pill: ← indicators → ) ── */}
      <div className="absolute inset-x-0 bottom-6 md:bottom-7 z-40 flex justify-center">
        <div className="flex items-center gap-4 rounded-full bg-white/90 px-4 py-2.5 shadow-lg backdrop-blur-md">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={goPrev}
            className="flex h-6 w-6 items-center justify-center text-neutral-800 transition-colors hover:text-red-600 focus:outline-none"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.2} />
          </button>

          <div className="flex items-center gap-2">
            {MEDIA.map((item, idx) => {
              const isActive = currentIndex === idx;
              return (
                <button
                  key={`dot-${item.id}`}
                  type="button"
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-current={isActive}
                  onClick={() => goTo(idx)}
                  className="group flex items-center focus:outline-none"
                >
                  <span
                    className="block h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width: isActive ? "28px" : "8px",
                      backgroundColor: isActive
                        ? THEME_COLORS.red
                        : "rgba(23,23,23,0.28)",
                    }}
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Next slide"
            onClick={goNext}
            className="flex h-6 w-6 items-center justify-center text-neutral-800 transition-colors hover:text-red-600 focus:outline-none"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.2} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes hero-fade-up {
          0%   { opacity: 0; transform: translateY(26px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .hero-fade-up {
          animation: hero-fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .hero-fade-up-delayed {
          animation: hero-fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
        }
      `}</style>
    </section>
  );
}