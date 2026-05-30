"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import { WHY_CHOOSE_US } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function WhyChooseUs() {
  // Header
  const headerRef = useScrollReveal<HTMLDivElement>({ animation: "up", delay: 0 });

  // Top row: first card from left, second from right
  const card0Ref = useScrollReveal<HTMLDivElement>({ animation: "left", delay: 0 });
  const card1Ref = useScrollReveal<HTMLDivElement>({ animation: "right", delay: 200 });

  // Bottom row: alternating directions
  const card2Ref = useScrollReveal<HTMLDivElement>({ animation: "left", delay: 0 });
  const card3Ref = useScrollReveal<HTMLDivElement>({ animation: "up", delay: 200 });
  const card4Ref = useScrollReveal<HTMLDivElement>({ animation: "right", delay: 0 });
  const card5Ref = useScrollReveal<HTMLDivElement>({ animation: "right", delay: 200 });

  return (
    <section className="select-none bg-gray-950 section-padding" id="why-us">
      <Container>
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-16 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Why Choose Us?
          </h2>
          <p className="text-blue-500/70 text-sm md:text-base leading-relaxed px-2 sm:px-0">
            We deliver enterprise-grade security infrastructure with unmatched service and reliability.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">

          {/* Top Row: 2 wide cards */}
          <div ref={card0Ref} className="md:col-span-6 bg-white rounded-4xl p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:shadow-xl transition-shadow group overflow-hidden relative min-h-80 sm:min-h-62.5">
            <div className="flex-1 relative z-10 w-full">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#031b4e] mb-3 leading-tight w-full sm:w-3/4">
                {WHY_CHOOSE_US[0].title}
              </h3>
              <div className="w-8 h-1 bg-sky-400 rounded-full mb-4"></div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-none sm:max-w-50">
                {WHY_CHOOSE_US[0].description}
              </p>
            </div>
            <div className="relative w-full h-40 sm:w-1/2 sm:h-full sm:absolute sm:right-0 sm:bottom-0 sm:top-0">
              <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700 origin-bottom-right">
                <Image
                  src={WHY_CHOOSE_US[0].imageSrc!}
                  alt={WHY_CHOOSE_US[0].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain sm:object-contain object-bottom-right sm:object-right"
                />
              </div>
            </div>
          </div>

          <div ref={card1Ref} className="md:col-span-6 bg-white rounded-4xl p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:shadow-xl transition-shadow group overflow-hidden relative min-h-80 sm:min-h-62.5">
            <div className="flex-1 relative z-10 w-full">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#031b4e] mb-3 leading-tight w-full sm:w-3/4">
                {WHY_CHOOSE_US[1].title}
              </h3>
              <div className="w-8 h-1 bg-sky-400 rounded-full mb-4"></div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-none sm:max-w-50">
                {WHY_CHOOSE_US[1].description}
              </p>
            </div>
            <div className="relative w-full h-40 sm:w-1/2 sm:h-full sm:absolute sm:right-0 sm:bottom-0 sm:top-0">
              <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700 origin-right">
                <Image
                  src={WHY_CHOOSE_US[1].imageSrc!}
                  alt={WHY_CHOOSE_US[1].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Bottom Row: 3 columns */}

          {/* Col 1: Innovation */}
          <div ref={card2Ref} className="md:col-span-4 bg-white rounded-4xl p-6 sm:p-8 flex flex-col gap-6 hover:shadow-xl transition-shadow group overflow-hidden relative min-h-72 sm:min-h-75">
            <div className="relative z-10 w-full">
              <h3 className="text-lg sm:text-xl font-bold text-[#031b4e] mb-3 leading-tight w-full sm:w-3/4">
                {WHY_CHOOSE_US[2].title}
              </h3>
              <div className="w-8 h-1 bg-sky-400 rounded-full mb-4"></div>
              <p className="text-gray-500 text-sm leading-relaxed">
                {WHY_CHOOSE_US[2].description}
              </p>
            </div>
            <div className="relative sm:absolute sm:bottom-0 sm:left-0 sm:right-0 sm:h-1/2 h-40 w-full">
              <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700 origin-bottom">
                <Image
                  src={WHY_CHOOSE_US[2].imageSrc!}
                  alt={WHY_CHOOSE_US[2].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-bottom"
                />
              </div>
            </div>
          </div>

          {/* Col 2: Comprehensive Features */}
          <div ref={card3Ref} className="md:col-span-4 bg-white rounded-4xl p-6 sm:p-8 flex flex-col gap-6 hover:shadow-xl transition-shadow group overflow-hidden relative min-h-72 sm:min-h-75">
            <div className="relative z-10 w-full">
              <h3 className="text-lg sm:text-xl font-bold text-[#031b4e] mb-3 leading-tight w-full sm:w-3/4">
                {WHY_CHOOSE_US[3].title}
              </h3>
              <div className="w-8 h-1 bg-sky-400 rounded-full mb-4"></div>
              <p className="text-gray-500 text-sm leading-relaxed">
                {WHY_CHOOSE_US[3].description}
              </p>
            </div>
            <div className="relative sm:absolute sm:bottom-0 sm:right-0 sm:h-2/3 h-40 w-full sm:w-3/4">
              <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700 origin-bottom-right">
                <Image
                  src={WHY_CHOOSE_US[3].imageSrc!}
                  alt={WHY_CHOOSE_US[3].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain object-bottom-right drop-shadow-2xl translate-x-4 translate-y-4"
                />
              </div>
            </div>
          </div>

          {/* Col 3: Stacked Cards */}
          <div className="md:col-span-4 grid grid-cols-1 gap-4 lg:gap-6 sm:grid-rows-2 min-h-0 sm:min-h-75">

            {/* Support */}
            <div ref={card4Ref} className="bg-white rounded-4xl p-5 sm:p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-xl transition-shadow group overflow-hidden relative h-full min-h-56 sm:min-h-0">
              <div className="flex-1 relative z-10">
                <h3 className="text-base sm:text-lg font-bold text-[#031b4e] mb-2 leading-tight">
                  {WHY_CHOOSE_US[4].title}
                </h3>
                <div className="w-8 h-1 bg-sky-400 rounded-full mb-2"></div>
                <p className="text-gray-500 text-xs leading-relaxed max-w-37.5">
                  {WHY_CHOOSE_US[4].description}
                </p>
              </div>
              <div className="relative w-full h-32 sm:w-1/3 sm:h-full sm:absolute sm:right-0 sm:top-0">
                <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-700">
                  <Image
                    src={WHY_CHOOSE_US[4].imageSrc!}
                    alt={WHY_CHOOSE_US[4].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Trusted */}
            <div ref={card5Ref} className="bg-white rounded-4xl p-5 sm:p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-xl transition-shadow group overflow-hidden relative h-full min-h-56 sm:min-h-0">
              <div className="flex-1 relative z-10">
                <h3 className="text-base sm:text-lg font-bold text-[#031b4e] mb-2 leading-tight">
                  {WHY_CHOOSE_US[5].title}
                </h3>
                <div className="w-8 h-1 bg-sky-400 rounded-full mb-2"></div>
                <p className="text-gray-500 text-xs leading-relaxed max-w-37.5">
                  {WHY_CHOOSE_US[5].description}
                </p>
              </div>
              <div className="relative w-full h-32 sm:w-1/3 sm:h-full sm:absolute sm:right-0 sm:top-0">
                <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-700">
                  <Image
                    src={WHY_CHOOSE_US[5].imageSrc!}
                    alt={WHY_CHOOSE_US[5].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
