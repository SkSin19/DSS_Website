"use client";

import Image from "next/image";
import Container from "@/components/ui/Container";
import { WHY_CHOOSE_US } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function WhyChooseUs() {
  const headerRef = useScrollReveal<HTMLDivElement>({ animation: "up", delay: 0 });
  const card0Ref = useScrollReveal<HTMLDivElement>({ animation: "left", delay: 0 });
  const card1Ref = useScrollReveal<HTMLDivElement>({ animation: "right", delay: 200 });
  const card2Ref = useScrollReveal<HTMLDivElement>({ animation: "left", delay: 0 });
  const card3Ref = useScrollReveal<HTMLDivElement>({ animation: "up", delay: 200 });
  const card4Ref = useScrollReveal<HTMLDivElement>({ animation: "right", delay: 0 });
  const card5Ref = useScrollReveal<HTMLDivElement>({ animation: "right", delay: 200 });

  return (
    <section className="select-none bg-white section-padding" id="why-us">
      <Container>
        <div ref={headerRef} className="text-center mb-10 sm:mb-16 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-red-600 text-sm md:text-base leading-relaxed px-2 sm:px-0">
            We deliver enterprise-grade security infrastructure with unmatched service and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">

          {/* Top row */}
          <div ref={card0Ref} className="md:col-span-6 rounded-4xl p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 will-change-transform group overflow-hidden relative min-h-80 sm:min-h-62.5 border border-gray-200 bg-gray-200">
            <div className="flex-1 relative z-10 w-full">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight w-full sm:w-3/4">
                {WHY_CHOOSE_US[0].title}
              </h3>
              <div className="w-8 h-1 bg-red-500 rounded-full mb-4"></div>
              <p className="text-gray-600 text-sm leading-relaxed max-w-none sm:max-w-50">
                {WHY_CHOOSE_US[0].description}
              </p>
            </div>
            <div className="relative w-full h-40 sm:w-1/2 sm:h-full sm:absolute sm:right-0 sm:bottom-0 sm:top-0">
              <Image
                src={WHY_CHOOSE_US[0].imageSrc!}
                alt={WHY_CHOOSE_US[0].title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain sm:object-contain object-bottom-right sm:object-right"
              />
              <div className="absolute inset-0 bg-linear-to-r from-gray-200/80 via-gray-200/40 to-transparent pointer-events-none" />
            </div>
          </div>

          <div ref={card1Ref} className="md:col-span-6 rounded-4xl p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 will-change-transform group overflow-hidden relative min-h-80 sm:min-h-62.5 border border-gray-200 bg-gray-200">
            <div className="flex-1 relative z-10 w-full">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight w-full sm:w-3/4">
                {WHY_CHOOSE_US[1].title}
              </h3>
              <div className="w-8 h-1 bg-red-500 rounded-full mb-4"></div>
              <p className="text-gray-600 text-sm leading-relaxed max-w-none sm:max-w-50">
                {WHY_CHOOSE_US[1].description}
              </p>
            </div>
            <div className="relative w-full h-40 sm:w-1/2 sm:h-full sm:absolute sm:right-0 sm:bottom-0 sm:top-0">
              <Image
                src={WHY_CHOOSE_US[1].imageSrc!}
                alt={WHY_CHOOSE_US[1].title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-gray-200/80 via-gray-200/40 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Col 1 — image bottom */}
          <div ref={card2Ref} className="md:col-span-4 rounded-4xl p-6 sm:p-8 flex flex-col gap-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 will-change-transform group overflow-hidden relative min-h-72 sm:min-h-75 border border-gray-200 bg-gray-200">
            <div className="relative z-10 w-full">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-tight w-full sm:w-3/4">
                {WHY_CHOOSE_US[2].title}
              </h3>
              <div className="w-8 h-1 bg-red-500 rounded-full mb-4"></div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {WHY_CHOOSE_US[2].description}
              </p>
            </div>
            <div className="relative sm:absolute sm:bottom-0 sm:left-0 sm:right-0 sm:h-1/2 h-40 w-full">
              <Image
                src={WHY_CHOOSE_US[2].imageSrc!}
                alt={WHY_CHOOSE_US[2].title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-bottom"
              />
              <div className="absolute inset-0 bg-linear-to-b from-gray-200/50 via-gray-200/20 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Col 2 — image bottom-right */}
          <div ref={card3Ref} className="md:col-span-4 rounded-4xl p-6 sm:p-8 flex flex-col gap-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 will-change-transform group overflow-hidden relative min-h-72 sm:min-h-75 border border-gray-200 bg-gray-200">
            <div className="relative z-10 w-full">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-tight w-full sm:w-3/4">
                {WHY_CHOOSE_US[3].title}
              </h3>
              <div className="w-8 h-1 bg-red-500 rounded-full mb-4"></div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {WHY_CHOOSE_US[3].description}
              </p>
            </div>
            <div className="relative sm:absolute sm:bottom-0 sm:right-0 sm:h-2/3 h-40 w-full sm:w-3/4">
              <Image
                src={WHY_CHOOSE_US[3].imageSrc!}
                alt={WHY_CHOOSE_US[3].title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-bottom-right drop-shadow-2xl translate-x-4 translate-y-4"
              />
              <div className="absolute inset-0 bg-linear-to-br from-gray-200/80 via-gray-200/40 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Col 3 stacked */}
          <div className="md:col-span-4 grid grid-cols-1 gap-4 lg:gap-6 sm:grid-rows-2 min-h-0 sm:min-h-75">

            <div ref={card4Ref} className="rounded-4xl p-5 sm:p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 will-change-transform group overflow-hidden relative h-full min-h-56 sm:min-h-0 border border-gray-200 bg-gray-200">
              <div className="flex-1 relative z-10">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 leading-tight">
                  {WHY_CHOOSE_US[4].title}
                </h3>
                <div className="w-8 h-1 bg-red-500 rounded-full mb-2"></div>
                <p className="text-gray-600 text-xs leading-relaxed max-w-37.5">
                  {WHY_CHOOSE_US[4].description}
                </p>
              </div>
              <div className="relative w-full h-32 sm:w-1/3 sm:h-full sm:absolute sm:right-0 sm:top-0">
                <Image
                  src={WHY_CHOOSE_US[4].imageSrc!}
                  alt={WHY_CHOOSE_US[4].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-bottom"
                />
                <div className="absolute inset-0 bg-linear-to-r from-gray-200/60 via-gray-200/10 to-transparent pointer-events-none" />
              </div>
            </div>

            <div ref={card5Ref} className="rounded-4xl p-5 sm:p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 will-change-transform group overflow-hidden relative h-full min-h-56 sm:min-h-0 border border-gray-200 bg-gray-200">
              <div className="flex-1 relative z-10">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 leading-tight">
                  {WHY_CHOOSE_US[5].title}
                </h3>
                <div className="w-8 h-1 bg-red-500 rounded-full mb-2"></div>
                <p className="text-gray-600 text-xs leading-relaxed max-w-37.5">
                  {WHY_CHOOSE_US[5].description}
                </p>
              </div>
              <div className="relative w-full h-32 sm:w-1/3 sm:h-full sm:absolute sm:right-0 sm:top-0">
                <Image
                  src={WHY_CHOOSE_US[5].imageSrc!}
                  alt={WHY_CHOOSE_US[5].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-gray-200/80 via-gray-200/0 to-transparent pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}