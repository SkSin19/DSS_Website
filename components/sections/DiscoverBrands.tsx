"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { BRANDS } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// Each brand card alternates: even → left-to-right, odd → right-to-left
function BrandCard({ brand, index }: { brand: (typeof BRANDS)[number]; index: number }) {
  const direction = index % 2 === 0 ? "left" : "right";
  const ref = useScrollReveal<HTMLAnchorElement>({
    animation: direction,
    delay: (index % 5) * 150,
  });

  return (
    <Link
      ref={ref}
      href={`/products?company=${encodeURIComponent(brand.name)}`}
      className="group relative aspect-2/3 w-full rounded-2xl overflow-hidden block"
    >
      {brand.productImageSrc ? (
        <>
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
            <Image
              src={brand.productImageSrc}
              alt={`${brand.name} Banner`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-gray-900/75 via-gray-900/15 to-gray-900/5" />
          <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/8 transition-colors duration-500" />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0"
            style={{ backgroundColor: brand.color }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-gray-900/50 via-transparent to-gray-900/10" />
        </>
      )}

      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
        <p className="text-white font-bold text-sm sm:text-[15px] leading-tight drop-shadow-sm">
          {brand.name}
        </p>
        {brand.tagline && (
          <p className="text-white/60 text-[10px] sm:text-[11px] mt-0.5 leading-snug line-clamp-2 font-medium">
            {brand.tagline}
          </p>
        )}
        <span className="mt-2 inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-red-200 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          Browse products <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
        </span>
      </div>
    </Link>
  );
}

export default function DiscoverBrands() {
  const headingRef = useScrollReveal<HTMLDivElement>({ animation: "up", delay: 0 });

  return (
    <section className="select-none bg-white section-padding pb-12 sm:pb-20 md:pb-24" id="brands">
      <Container>
        <div ref={headingRef}>
          <SectionHeading
            title="Our Partners"
            subtitle="We work with India's most trusted digital surveillance brands."
          />
        </div>

        <div className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {BRANDS.map((brand, index) => (
            <BrandCard key={brand.name} brand={brand} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}