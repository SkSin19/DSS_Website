import { MARQUEE_BRANDS } from "@/lib/constants";

export default function BrandMarquee() {
  // Duplicate array to ensure seamless infinite scrolling
  const marqueeItems = [...MARQUEE_BRANDS, ...MARQUEE_BRANDS, ...MARQUEE_BRANDS];

  return (
    <div className="w-full bg-white border-y border-gray-100 py-6 overflow-hidden flex" aria-hidden="true">
      <div className="flex animate-marquee w-max">
        {marqueeItems.map((brand, index) => (
          <div 
            key={index} 
            className="flex items-center justify-center px-8 md:px-12 w-[150px] md:w-[200px]"
          >
            <span className="text-xl md:text-2xl font-black text-gray-300 uppercase tracking-widest hover:text-gray-400 transition-colors duration-300">
              {brand}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
