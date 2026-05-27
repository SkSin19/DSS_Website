import Image from "next/image";
import { MARQUEE_BRANDS } from "@/lib/constants";

export default function BrandMarquee() {
  // Duplicate array to ensure seamless infinite scrolling
  const marqueeItems = [...MARQUEE_BRANDS, ...MARQUEE_BRANDS, ...MARQUEE_BRANDS];

  return (
    <div className="w-full bg-white border-y border-gray-100 py-4 sm:py-6 overflow-hidden flex" aria-hidden="true">
      <div className="flex animate-marquee w-max">
        {marqueeItems.map((brand, index) => (
          <div 
            key={index} 
            className="flex items-center justify-center px-4 sm:px-8 md:px-12 w-28 sm:w-37.5 md:w-50"
          >
            <div className="flex items-center justify-center h-10 sm:h-12 w-full opacity-75 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
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
  );
}
