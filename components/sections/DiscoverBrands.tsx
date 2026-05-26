import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { BRANDS } from "@/lib/constants";

export default function DiscoverBrands() {
  return (
    <section className="bg-gray-950 section-padding pb-24" id="brands">
      <Container>
        <SectionHeading
          badge="TRUSTED SECURITY PARTNERS"
          badgeVariant="dark"
          title="Discover Our Brands"
          subtitle="We work with India's most trusted digital surveillance brands."
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 mt-16">
          {BRANDS.map((brand, index) => (
            <Link
              key={brand.name}
              href={`/brands/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="brand-card group relative h-[360px] md:h-[400px] lg:h-[450px] w-full rounded-3xl overflow-hidden flex flex-col p-6 text-white animate-fade-in-up"
              style={{ 
                backgroundColor: brand.color,
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Subtle gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10 z-0"></div>
              
              <div className="relative z-10 flex-1">
                <h3 className="text-2xl font-black italic tracking-tighter mb-4 opacity-90 drop-shadow-sm">
                  {brand.name.toUpperCase()}
                </h3>
                
                <div className="w-8 h-0.5 bg-white/50 mb-4 rounded-full"></div>
                
                <p className="text-sm font-medium leading-tight max-w-[150px] opacity-90 drop-shadow-sm">
                  {brand.tagline}
                </p>
              </div>

              {/* Decorative element for brands without real images for now */}
              <div className="relative z-10 h-1/2 w-full flex items-end justify-center transform group-hover:scale-110 transition-transform duration-500">
                <div className="w-full h-full bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 flex flex-col items-center justify-center shadow-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 opacity-80 mb-2">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-semibold tracking-wider text-center">PREMIUM<br/>PRODUCTS</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
