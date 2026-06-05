"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, RotateCcw, CheckCircle2, ChevronRight, ChevronLeft, X } from "lucide-react";
import { MARQUEE_BRANDS } from "@/lib/constants";

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  backDescription: string;
  highlights: string[];
  imageSrc: string;
  imageAlt: string;
  icon: React.ReactNode;
  hasOffer: boolean;
  href: string;
}

interface SlideInfo {
  title: string;
  body: string;
}

const FEATURED_SLIDES: SlideInfo[] = [
  {
    title: "Boom Barrier",
    body: "Control vehicle entry and exit points with high-speed automated boom barriers, integrated with RFID readers, loop detectors, and access controllers.",
  },
  {
    title: "Turnstiles",
    body: "Manage pedestrian traffic and prevent tailgating with automated tripod, speed gate, or full-height turnstile barriers integrated with readers.",
  },
  {
    title: "Smart Locks",
    body: "Install enterprise-grade electromagnetic, solenoid, or smart digital locks for doors and gates, controllable remotely or via credentials.",
  },
  {
    title: "Activity Audit Logs",
    body: "Access detailed historical reports of who entered which area and when. Get instant security alerts for forced doors or unauthorized access attempts.",
  },
];

const SERVICES: ServiceItem[] = [
  {
    id: "access-control",
    title: "Access Control",
    description: "Secure door controllers, locks and credentials for access management.",
    backDescription: "Regulate and monitor entry to your premises. From single doors to complex multi-site business facilities using advanced digital credentials.",
    highlights: ["Keycard & PIN entry", "Electromagnetic locks", "Time-based access rules", "Detailed entry logs"],
    imageSrc: "/images/categories/access-control-smart-entry.png",
    imageAlt: "Access Control entry systems",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    hasOffer: false,
    href: "/products?category=Access%20Control",
  },
  {
    id: "biometric-attendance",
    title: "Biometric Attendance",
    description: "Accurate identification for secure access and attendance logs.",
    backDescription: "Streamline workforce management with cutting-edge biometric systems. Ensure accurate attendance tracking and access control.",
    highlights: ["Fingerprint & face recognition", "Cloud-based attendance logs", "Multi-location support", "Payroll integration ready"],
    imageSrc: "/images/services/biometric-attendance.png",
    imageAlt: "Biometric attendance machine",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a48.667 48.667 0 0 0-1.418 8.773 M11.25 3.966a11.955 11.955 0 0 1 2.25-.216c.963 0 1.903.076 2.814.22M12.75 21.034a11.955 11.955 0 0 1-2.25.216c-.963 0-1.903-.076-2.814-.22M15.75 10.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
    hasOffer: true,
    href: "/products?category=Biometric%20%26%20Identity",
  },
  {
    id: "video-security",
    title: "Video Security",
    description: "Advanced CCTV systems for complete surveillance and peace of mind.",
    backDescription: "Keep a watchful eye on your home or business with high-definition CCTV systems. Enjoy remote viewing, motion notifications, and secure local or cloud storage.",
    highlights: ["High-definition cameras (4K)", "Night vision & infrared", "Remote mobile view 24/7", "Smart search & playback"],
    imageSrc: "/images/categories/video-security-cctv-systems.png",
    imageAlt: "Video Security Systems setup",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-3.538a.75.75 0 0 1 1.28.56v7.958a.75.75 0 0 1-1.28.56l-4.72-3.538v-1.44ZM1.5 6.75A2.25 2.25 0 0 1 3.75 4.5h8.25a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-8.25A2.25 2.25 0 0 1 1.5 17.25V6.75Z" />
      </svg>
    ),
    hasOffer: false,
    href: "/products?category=Surveillance%20Systems",
  },
  {
    id: "gate-automation",
    title: "Gate Automation",
    description: "Automate your gates for secure and convenient access.",
    backDescription: "Upgrade your entry with motorized gate systems. Sliding, swing, or boom barriers with remote and sensor controls.",
    highlights: ["Sliding & swing motors", "Remote & sensor operation", "Vehicle detection systems", "Emergency manual override"],
    imageSrc: "/images/services/gate-automation.png",
    imageAlt: "Gate automation system with remote",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5M10.5 21V3.545M7.5 21h3M4.5 3.545h15M4.5 3.545V21M4.5 3.545L2.25 6m17.25-2.455L21.75 6" />
      </svg>
    ),
    hasOffer: true,
    href: "/products?category=Gate%20Automation",
  },
  {
    id: "intrusion-alarm",
    title: "Intrusion Alarm",
    description: "Smart detection, instant alerts and reliable protection.",
    backDescription: "Intelligent intrusion detection with motion sensors, door contacts, and smart hubs for 24/7 real-time monitoring.",
    highlights: ["Motion & door sensors", "24/7 real-time monitoring", "Wireless smart alarm hubs", "Instant push notifications"],
    imageSrc: "/images/services/intrusion-alarm.png",
    imageAlt: "Intrusion alarm security system",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.249-8.25-3.286Z" />
      </svg>
    ),
    hasOffer: true,
    href: "/products?category=Intrusion%20Alarm",
  },
];

const OTHER_SERVICES: ServiceItem[] = [
  {
    id: "networking-power",
    title: "Networking & Power",
    description: "EPABX, IPABX & FTTH solutions, Cat6 cabling, UPS backups and solar power.",
    backDescription: "Build a resilient data backbone, telecom system, and backup power system. We integrate EPABX/IPABX, FTTH fiber networks, structured cabling, UPS backups, and solar power.",
    highlights: ["EPABX, IPABX & FTTH systems", "UPS battery backup systems", "Solar power integration", "Fiber optic ring networks"],
    imageSrc: "/images/services/networking-and-power.png",
    imageAlt: "Server wires and solar power inverter setup",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-13.5-3a3 3 0 1 1 0-6h13.5a3 3 0 1 1 0 6m-13.5 3h13.5m-13.5 0a3 3 0 0 0-3 3m3-3a3 3 0 0 1-3-3" />
      </svg>
    ),
    hasOffer: false,
    href: "/products?category=Networking%20%26%20Power",
  },
  {
    id: "home-automation",
    title: "Home Automation",
    description: "Control your lights, appliances, security and more from anywhere.",
    backDescription: "Transform your living space with intelligent automation. Control lighting, climate, entertainment systems, and security.",
    highlights: ["Voice & app-controlled lighting", "Smart climate management", "Automated curtains & blinds", "Energy usage monitoring"],
    imageSrc: "/images/services/home-automation.png",
    imageAlt: "Home automation smart living room setup",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955a1.126 1.126 0 0 1 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    hasOffer: false,
    href: "/products?category=Home%20Automation",
  },
  {
    id: "video-door-phone",
    title: "Video Door Phone",
    description: "See, speak and unlock from anywhere with a connected intercom.",
    backDescription: "Identify visitors before opening the door. Engage in high-clarity two-way audio and view live video, all managed from a sleek indoor monitor or your phone.",
    highlights: ["Two-way audio & HD video", "Remote door unlock", "Missed call logs & photos", "Mobile app integration"],
    imageSrc: "/images/categories/intercom-communication-solutions.png",
    imageAlt: "Video door phone indoor station",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a9.041 9.041 0 0 1-9.713 0M2.25 12V4.5A2.25 2.25 0 0 1 4.5 2.25h15A2.25 2.25 0 0 1 21.75 4.5V12M2.25 12c0 1.623.77 3.065 1.972 4.024A2.247 2.247 0 0 0 6.25 18h11.5c.928 0 1.766-.464 2.028-1.976A9.06 9.06 0 0 0 21.75 12" />
      </svg>
    ),
    hasOffer: false,
    href: "/products?category=Surveillance%20Systems",
  },
  {
    id: "pa-systems-av",
    title: "PA System & AV",
    description: "Professional audio-visual and public address setups for clear communication.",
    backDescription: "High-fidelity public address systems, mixers, wall speakers, amplifiers, and AV controls tailored for corporate workspaces, venues, and classrooms.",
    highlights: ["PA speakers & audio mixers", "Clear voice amplification", "Integrated AV controls", "Wireless microphones"],
    imageSrc: "/images/services/pa-systems-and-av.png",
    imageAlt: "PA System and AV equipment setup",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
      </svg>
    ),
    hasOffer: false,
    href: "/products?category=PA%20Systems%20and%20AV",
  },
  {
    id: "fire-alarm",
    title: "Fire Alarm",
    description: "Early detection and instant alerts for maximum safety.",
    backDescription: "Protect lives and property with advanced fire detection. From smoke sensors to alarm panels for homes and businesses.",
    highlights: ["Smoke & heat detection", "Instant mobile alerts", "Centralized alarm panels", "Compliance-ready systems"],
    imageSrc: "/images/services/fire-alarm.png",
    imageAlt: "Fire alarm system components",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
      </svg>
    ),
    hasOffer: true,
    href: "/products?category=Fire%20Alarm",
  },
];

const NETWORKING_POWER_SLIDES: SlideInfo[] = [
  {
    title: "EPABX, IPABX & FTTH",
    body: "Provide seamless telecommunications and high-speed fiber-to-the-home connectivity with advanced EPABX, IP-based PBX telephone systems, and FTTH networks.",
  },
  {
    title: "UPS Battery Backup",
    body: "Ensure uninterrupted security operations during power cuts with double-conversion online UPS systems and long-backup battery banks.",
  },
  {
    title: "Structured Cabling",
    body: "Organize your data networks with high-quality copper Cat6 patch panels, racks, and structured cabling for certified gigabit performance.",
  },
  {
    title: "Solar Power Integration",
    body: "Power remote camera locations, wireless links, or main hubs using off-grid or hybrid solar panel installations with smart power management.",
  },
];

/* ──────────────────────────────────────────────
   Page Component
   ────────────────────────────────────────────── */

export default function ServicesPage() {
  const featured = SERVICES[0];
  const gridItems = SERVICES.slice(1);
  const [open, setOpen] = useState(false);
  const [slide, setSlide] = useState(0);

  const featuredOther = OTHER_SERVICES[0];
  const gridItemsOther = OTHER_SERVICES.slice(1);
  const [openOther, setOpenOther] = useState(false);
  const [slideOther, setSlideOther] = useState(0);

  const next = useCallback(() => setSlide((s) => (s + 1) % FEATURED_SLIDES.length), []);
  const prev = useCallback(() => setSlide((s) => (s - 1 + FEATURED_SLIDES.length) % FEATURED_SLIDES.length), []);
  const nextOther = useCallback(() => setSlideOther((s) => (s + 1) % NETWORKING_POWER_SLIDES.length), []);
  const prevOther = useCallback(() => setSlideOther((s) => (s - 1 + NETWORKING_POWER_SLIDES.length) % NETWORKING_POWER_SLIDES.length), []);

  return (
    <>
      {/* ── SECTION 1: HOME AUTOMATION (Biggest Card Left) ── */}
      <section id="services-section" className="bg-white min-h-screen lg:min-h-[calc(100vh-80px)] select-none flex flex-col justify-center py-12 lg:py-8">
        <div className="container-main w-full flex flex-col justify-center">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 lg:mb-5">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Services</h1>
              <p className="mt-2 text-gray-500 text-base">Smart solutions for a safer, smarter tomorrow.</p>
            </div>
            <Link href="/products" className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 hover:text-red-600 transition-colors whitespace-nowrap group">
              Browse all products
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

            {/* ── Featured card (Left) ── */}
            <div className="lg:col-span-2">
              <div
                id="service-card-home-automation"
                className={`relative rounded-3xl bg-gray-50 border transition-all duration-500 overflow-hidden h-full cursor-pointer flex flex-col group/card ${
                  open ? "border-red-300 shadow-[0_0_30px_rgba(239,68,68,0.15)] ring-2 ring-red-50" : "border-gray-100 hover:shadow-2xl hover:border-gray-200"
                }`}
                onClick={() => {
                  if (!open) {
                    setOpen(true);
                    setSlide(0);
                  } else {
                    setOpen(false);
                  }
                }}
              >
                {/* Tap hint */}
                <div className="absolute top-5 right-5 z-10">
                  <span className={`inline-flex items-center gap-1.5 backdrop-blur-sm text-[11px] font-bold px-3.5 py-1.5 rounded-full border transition-colors shadow-sm ${
                    open ? "bg-red-50 text-red-600 border-red-200" : "bg-white/90 text-gray-500 border-gray-200/60"
                  }`}>
                    {open ? <X size={12} strokeWidth={2.5} /> : <ChevronRight size={12} strokeWidth={2.5} />}
                    {open ? "Close Panel" : "Tap to Explore"}
                  </span>
                </div>

                {/* Image */}
                <div className="relative flex-1 p-8 flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full min-h-[250px]">
                    <Image
                      src={featured.imageSrc}
                      alt={featured.imageAlt}
                      fill
                      className="object-contain transition-transform duration-700 ease-out"
                      style={{ transform: open ? "scale(1.05)" : "scale(1)" }}
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      priority
                    />
                  </div>
                </div>

                {/* Info bar at bottom */}
                <div className="p-6 flex items-center gap-4 bg-white border-t border-gray-100 mt-auto">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
                    {featured.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold text-gray-900 leading-snug">{featured.title}</h2>
                    <p className="mt-1 text-sm text-gray-500 leading-relaxed line-clamp-2">{featured.description}</p>
                  </div>
                  <div className={`flex-shrink-0 transition-transform duration-500 ${open ? "rotate-180 text-red-500" : ""}`}>
                    <ArrowRight size={22} className="text-gray-400" strokeWidth={2} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right Column: Small Cards OR Slider Panel ── */}
            <div className="lg:col-span-3 relative">

              {/* Small Cards Grid */}
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "opacity-0 translate-x-8 pointer-events-none" : "opacity-100 translate-x-0"
                }`}
              >
                {gridItems.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>

              {/* Slider Panel */}
              <div
                className={`absolute inset-0 bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden flex flex-col transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12 pointer-events-none hidden"
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-5 lg:p-4 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
                      {featured.icon}
                    </div>
                    <div>
                      <h2 className="text-lg lg:text-xl font-bold text-gray-900 leading-tight">{featured.title} Capabilities</h2>
                      <p className="text-xs text-gray-500 mt-0.5">Explore our intelligent features</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm"
                    aria-label="Close panel"
                  >
                    <X size={14} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Slider tabs */}
                <div className="px-5 lg:px-6 pt-4 lg:pt-3">
                  <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-hide">
                    {FEATURED_SLIDES.map((s, i) => (
                      <button
                        key={s.title}
                        onClick={() => setSlide(i)}
                        className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                          slide === i
                            ? "bg-red-600 text-white border-red-500 shadow-md shadow-red-600/20"
                            : "bg-white text-gray-600 border-gray-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        }`}
                      >
                        {s.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slides */}
                <div className="flex-1 relative overflow-hidden mx-5 lg:mx-6 my-4 lg:my-3">
                  {FEATURED_SLIDES.map((s, i) => (
                    <div
                      key={s.title}
                      className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        slide === i
                          ? "opacity-100 translate-x-0"
                          : i < slide
                            ? "opacity-0 -translate-x-12"
                            : "opacity-0 translate-x-12"
                      }`}
                    >
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">{s.title}</h3>
                      <p className="text-xs text-sm lg:text-base text-gray-600 leading-relaxed max-w-2xl mb-4">
                        {s.body}
                      </p>

                      <div className="grid grid-cols-3 gap-3 max-w-xl">
                        {[
                          { label: "Setup Time", value: "2–4 hrs" },
                          { label: "Warranty", value: "2 Years" },
                          { label: "Support", value: "24/7" },
                        ].map((stat) => (
                          <div key={stat.label} className="bg-red-50/50 border border-red-100/50 rounded-xl p-3 text-center">
                            <p className="text-base sm:text-lg lg:text-xl font-bold text-red-600">{stat.value}</p>
                            <p className="text-[9px] lg:text-[10px] text-gray-500 uppercase tracking-wider mt-0.5 font-semibold">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-5 lg:p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prev}
                      className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <div className="flex gap-1.5 px-1.5">
                      {FEATURED_SLIDES.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setSlide(i)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            slide === i ? "w-6 bg-red-600" : "w-1.5 bg-gray-300 hover:bg-red-300"
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={next}
                      className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                  
                  <Link
                    href={featured.href}
                    className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold px-4.5 py-2.5 rounded-xl transition-colors shadow-md shadow-red-600/20"
                  >
                    Explore Products
                    <ArrowRight size={14} />
                  </Link>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: SURVEILLANCE & ACCESS (Biggest Card Right) ── */}
      <section id="other-services-section" className="bg-white min-h-screen lg:min-h-[calc(100vh-80px)] border-t border-gray-100 select-none flex flex-col justify-center py-12 lg:py-8">
        <div className="container-main w-full flex flex-col justify-center">

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

            {/* ── Left Column: Small Cards OR Slider Panel (lg:col-span-3, lg:order-1) ── */}
            <div className="lg:col-span-3 relative lg:order-1 order-2">

              {/* Small Cards Grid */}
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  openOther ? "opacity-0 translate-x-8 pointer-events-none" : "opacity-100 translate-x-0"
                }`}
              >
                {gridItemsOther.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>

              {/* Slider Panel */}
              <div
                className={`absolute inset-0 bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden flex flex-col transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  openOther ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12 pointer-events-none hidden"
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-5 lg:p-4 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
                      {featuredOther.icon}
                    </div>
                    <div>
                      <h2 className="text-lg lg:text-xl font-bold text-gray-900 leading-tight">{featuredOther.title} Capabilities</h2>
                      <p className="text-xs text-gray-500 mt-0.5">Explore our intelligent features</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenOther(false)}
                    className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm"
                    aria-label="Close panel"
                  >
                    <X size={14} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Slider tabs */}
                <div className="px-5 lg:px-6 pt-4 lg:pt-3">
                  <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-hide">
                    {NETWORKING_POWER_SLIDES.map((s, i) => (
                      <button
                        key={s.title}
                        onClick={() => setSlideOther(i)}
                        className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                          slideOther === i
                            ? "bg-red-600 text-white border-red-500 shadow-md shadow-red-600/20"
                            : "bg-white text-gray-600 border-gray-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        }`}
                      >
                        {s.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slides */}
                <div className="flex-1 relative overflow-hidden mx-5 lg:mx-6 my-4 lg:my-3">
                  {NETWORKING_POWER_SLIDES.map((s, i) => (
                    <div
                      key={s.title}
                      className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        slideOther === i
                          ? "opacity-100 translate-x-0"
                          : i < slideOther
                            ? "opacity-0 -translate-x-12"
                            : "opacity-0 translate-x-12"
                      }`}
                    >
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">{s.title}</h3>
                      <p className="text-xs text-sm lg:text-base text-gray-600 leading-relaxed max-w-2xl mb-4">
                        {s.body}
                      </p>

                      <div className="grid grid-cols-3 gap-3 max-w-xl">
                        {[
                          { label: "Setup Time", value: "1–2 hrs" },
                          { label: "Warranty", value: "2 Years" },
                          { label: "Support", value: "24/7" },
                        ].map((stat) => (
                          <div key={stat.label} className="bg-red-50/50 border border-red-100/50 rounded-xl p-3 text-center">
                            <p className="text-base sm:text-lg lg:text-xl font-bold text-red-600">{stat.value}</p>
                            <p className="text-[9px] lg:text-[10px] text-gray-500 uppercase tracking-wider mt-0.5 font-semibold">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-5 lg:p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevOther}
                      className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <div className="flex gap-1.5 px-1.5">
                      {NETWORKING_POWER_SLIDES.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setSlideOther(i)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            slideOther === i ? "w-6 bg-red-600" : "w-1.5 bg-gray-300 hover:bg-red-300"
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={nextOther}
                      className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                  
                  <Link
                    href={featuredOther.href}
                    className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold px-4.5 py-2.5 rounded-xl transition-colors shadow-md shadow-red-600/20"
                  >
                    Explore Products
                    <ArrowRight size={14} />
                  </Link>
                </div>

              </div>

            </div>

            {/* ── Featured card (Right) (lg:col-span-2, lg:order-2) ── */}
            <div className="lg:col-span-2 lg:order-2 order-1">
              <div
                id="service-card-networking-power"
                className={`relative rounded-3xl bg-gray-50 border transition-all duration-500 overflow-hidden h-full cursor-pointer flex flex-col group/card ${
                  openOther ? "border-red-300 shadow-[0_0_30px_rgba(239,68,68,0.15)] ring-2 ring-red-50" : "border-gray-100 hover:shadow-2xl hover:border-gray-200"
                }`}
                onClick={() => {
                  if (!openOther) {
                    setOpenOther(true);
                    setSlideOther(0);
                  } else {
                    setOpenOther(false);
                  }
                }}
              >
                {/* Tap hint */}
                <div className="absolute top-5 right-5 z-10">
                  <span className={`inline-flex items-center gap-1.5 backdrop-blur-sm text-[11px] font-bold px-3.5 py-1.5 rounded-full border transition-colors shadow-sm ${
                    openOther ? "bg-red-50 text-red-600 border-red-200" : "bg-white/90 text-gray-500 border-gray-200/60"
                  }`}>
                    {openOther ? <X size={12} strokeWidth={2.5} /> : <ChevronRight size={12} strokeWidth={2.5} />}
                    {openOther ? "Close Panel" : "Tap to Explore"}
                  </span>
                </div>

                {/* Image */}
                <div className="relative flex-1 p-8 flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full min-h-[250px]">
                    <Image
                      src={featuredOther.imageSrc}
                      alt={featuredOther.imageAlt}
                      fill
                      className="object-contain transition-transform duration-700 ease-out"
                      style={{ transform: openOther ? "scale(1.05)" : "scale(1)" }}
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      priority
                    />
                  </div>
                </div>

                {/* Info bar at bottom */}
                <div className="p-6 flex items-center gap-4 bg-white border-t border-gray-100 mt-auto">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
                    {featuredOther.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold text-gray-900 leading-snug">{featuredOther.title}</h2>
                    <p className="mt-1 text-sm text-gray-500 leading-relaxed line-clamp-2">{featuredOther.description}</p>
                  </div>
                  <div className={`flex-shrink-0 transition-transform duration-500 ${openOther ? "rotate-180 text-red-500" : ""}`}>
                    <ArrowRight size={22} className="text-gray-400" strokeWidth={2} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3: ADVANCED SECURITY SOLUTIONS & PARTNERS ── */}
      <section id="advanced-security-solutions-section" className="bg-white border-t border-gray-100 py-16 lg:py-20 select-none">
        <div className="container-main max-w-6xl">
          {/* Main Card */}
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow duration-300 mb-12">
            {/* Left side text */}
            <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <span className="text-red-600 text-xs font-bold uppercase tracking-widest mb-3">Our Services</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Delivering the Most Advanced <span className="text-red-600">Security Solutions</span>
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                End-to-end security services designed to protect what matters most with cutting-edge technology and expert support.
              </p>
            </div>
            
            {/* Right side image */}
            <div className="flex-1 relative min-h-[300px] md:min-h-[400px]">
              <Image
                src="/images/general/technicians_installing_camera.png"
                alt="Professional technicians installing dome security camera"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Partners Card */}
          <div className="bg-blue-50/50 rounded-3xl border border-blue-100/30 py-8 text-center overflow-hidden">
            <h3 className="text-gray-400 text-sm md:text-base font-semibold tracking-wide mb-6">Our partners</h3>
            <div className="w-full overflow-hidden flex" aria-hidden="true">
              <div className="flex animate-marquee w-max">
                {[...MARQUEE_BRANDS, ...MARQUEE_BRANDS, ...MARQUEE_BRANDS].map((brand, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-center px-4 sm:px-8 md:px-12 w-28 sm:w-37.5 md:w-50 flex-shrink-0"
                  >
                    <div className="flex items-center justify-center h-10 sm:h-12 w-full opacity-75 hover:opacity-100 transition-all duration-300">
                      <Image
                        src={brand.logoSrc}
                        alt={`${brand.name} logo`}
                        width={80}
                        height={26}
                        className="h-4 sm:h-5 w-auto object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ──────────────────────────────────────────────
   Small Card with Flip
   ────────────────────────────────────────────── */

function ServiceCard({ service }: { service: ServiceItem }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      id={`service-card-${service.id}`}
      className="h-[290px] sm:h-[310px] lg:h-[270px] cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped((f) => !f)}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* FRONT */}
        <div
          className={`absolute inset-0 rounded-3xl bg-gray-50 border overflow-hidden flex flex-col transition-all duration-300 ${
            isFlipped
              ? "border-gray-100"
              : "border-gray-100 hover:border-red-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]"
          }`}
          style={{ backfaceVisibility: "hidden" }}
        >

          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm text-[10px] font-bold text-gray-500 px-3 py-1 rounded-full border border-gray-200/60 shadow-sm">
              <RotateCcw size={10} strokeWidth={2.5} /> Tap
            </span>
          </div>
          <div className="relative flex-1 overflow-hidden">
            <div className="absolute inset-0 p-5 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image src={service.imageSrc} alt={service.imageAlt} fill className="object-contain" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </div>
            </div>
          </div>
          
          {/* Bottom Bar styled precisely like the reference picture */}
          <div className="p-4.5 flex items-center gap-3 border-t border-gray-100 bg-white mt-auto">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
              {service.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-gray-900 leading-tight truncate">{service.title}</h3>
              <p className="mt-0.5 text-xs text-gray-500 leading-snug line-clamp-2">{service.description}</p>
            </div>
            <ArrowRight size={16} className="text-gray-400 flex-shrink-0" strokeWidth={2.5} />
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden flex flex-col shadow-lg border border-gray-100 bg-white" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <div className="relative z-10 flex flex-col h-full p-4.5 lg:p-4">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600">{service.icon}</div>
                <h3 className="text-sm lg:text-base font-bold text-gray-900">{service.title}</h3>
              </div>
              <span className="text-gray-400"><RotateCcw size={12} /></span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-2.5 line-clamp-2 lg:line-clamp-3">{service.backDescription}</p>
            <ul className="space-y-1.5 flex-1 overflow-hidden">
              {service.highlights.slice(0, 3).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 size={12} className="text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] font-medium text-gray-700 truncate">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href={service.href}
              onClick={(e) => e.stopPropagation()}
              className="mt-2 inline-flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-500 text-white text-xs font-semibold px-3 py-2.5 rounded-xl transition-colors shadow-md shadow-red-600/20"
            >
              Explore Products <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
