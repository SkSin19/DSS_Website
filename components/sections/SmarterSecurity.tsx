"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { FEATURES } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function ShieldIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A23.132 23.132 0 0112 5.25c2.89 0 5.61.5 8.122 1.42m-1.528 2.37A20.44 20.44 0 0012 8.25c-2.43 0-4.75.3-6.914.85m-1.528 2.37A17.94 17.94 0 0012 11.25c-1.92 0-3.75.24-5.485.68m-1.528 2.37a15.44 15.44 0 00-4.321 4.322" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 100-12 6 6 0 000 12z" />
    </svg>
  );
}

const icons = {
  shield: ShieldIcon,
  lock: LockIcon,
  bell: BellIcon,
  eye: EyeIcon,
};

function FeatureCard({ feature, index }: { feature: (typeof FEATURES)[number]; index: number }) {
  const ref = useScrollReveal<HTMLDivElement>({ animation: "up", delay: index * 150 });
  const IconComponent = icons[feature.icon as keyof typeof icons];

  return (
    <div ref={ref} className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2 sm:gap-3">
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl border border-red-200 bg-red-50 flex items-center justify-center text-red-600 backdrop-blur-sm">
        <IconComponent />
      </div>
      <span className="text-[11px] sm:text-sm font-medium text-gray-600 leading-tight">
        {feature.label.split(" ").map((word, i) => (
          <span key={i} className="block">{word}</span>
        ))}
      </span>
    </div>
  );
}

export default function SmarterSecurity() {
  // Left text content slides in from left
  const leftRef  = useScrollReveal<HTMLDivElement>({ animation: "left",  delay: 0 });
  // Right image panel slides in from right
  const rightRef = useScrollReveal<HTMLDivElement>({ animation: "right", delay: 250 });

  return (
    <section className="select-none bg-white pb-14 sm:pb-20 pt-8 sm:pt-10" id="solutions">
      <Container>
        <div className="rounded-[2rem] sm:rounded-[2.5rem] bg-linear-to-br from-white to-gray-50 overflow-hidden flex flex-col lg:flex-row relative border border-gray-200 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
          <div className="absolute top-0 right-0 w-200 h-200 bg-red-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-125 h-125 bg-gray-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>

          <div ref={leftRef} className="flex-1 p-6 sm:p-10 md:p-16 lg:p-20 relative z-10 flex flex-col justify-center text-gray-900">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-6">
              Smarter Security.<br />
              <span className="text-red-600">Stronger Protection.</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mb-8 sm:mb-12 max-w-md leading-relaxed">
              Advanced digital security solutions designed to safeguard what matters most.
            </p>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 mb-8 sm:mb-12">
              {FEATURES.map((feature, index) => (
                <FeatureCard key={feature.label} feature={feature} index={index} />
              ))}
            </div>

            <div>
              <Button
                variant="outline"
                href="/products"
                className="w-full sm:w-auto bg-white! text-gray-900! border-gray-200 hover:bg-red-600! hover:text-white! shadow-xl shadow-gray-900/10"
              >
                Browse products <span>→</span>
              </Button>
            </div>
          </div>

          <div ref={rightRef} className="flex-1 relative min-h-88 sm:min-h-100 lg:min-h-150 flex items-center justify-center p-4 sm:p-8 lg:p-0">
            <div className="absolute inset-0 z-0 hidden lg:block">
              <svg viewBox="0 0 100 100" className="w-full h-full text-sky-500/20 absolute -right-20 top-1/2 -translate-y-1/2">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.2" />
              </svg>
            </div>

            <div className="relative z-10 w-full max-w-lg h-full min-h-72 sm:min-h-100 flex items-center justify-center">
              <div className="relative w-full h-88 sm:h-125 rounded-2xl bg-linear-to-t from-white to-transparent flex items-end justify-center pb-6 sm:pb-8 border border-gray-200 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-red-100 via-gray-50 to-gray-100 -z-10"></div>

                <Image
                  src="/images/hero/cctv-cameras-surveillance-systems-slide-1.png"
                  alt="Security showcase"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-4 sm:p-8 drop-shadow-2xl opacity-90 scale-110 sm:scale-125"
                />

                <div className="absolute bottom-4 sm:bottom-6 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 text-[11px] sm:text-sm font-semibold tracking-wider text-center text-gray-700">
                  COMPLETE SURVEILLANCE
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
