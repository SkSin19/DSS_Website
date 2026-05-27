import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { BRANDS } from "@/lib/constants";

export default async function DiscoverBrands() {
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
              href={`/products?company=${encodeURIComponent(brand.name)}`}
              className="group relative h-90 md:h-100 lg:h-112.5 w-full rounded-3xl overflow-hidden block animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* If we have the image banner, render it */}
              {brand.productImageSrc ? (
                <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-700">
                  <Image 
                    src={brand.productImageSrc}
                    alt={`${brand.name} Banner`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
                </div>
              ) : (
                /* Fallback colored card just in case image is missing */
                <div 
                  className="w-full h-full flex flex-col p-6 text-white group-hover:scale-105 transition-transform duration-700 relative"
                  style={{ backgroundColor: brand.color }}
                >
                  <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/10 z-0"></div>
                  <div className="relative z-10 flex-1">
                    <h3 className="text-2xl font-black italic tracking-tighter mb-4 opacity-90 drop-shadow-sm">
                      {brand.name.toUpperCase()}
                    </h3>
                    <div className="w-8 h-0.5 bg-white/50 mb-4 rounded-full"></div>
                    <p className="text-sm font-medium leading-tight max-w-37.5 opacity-90 drop-shadow-sm">
                      {brand.tagline}
                    </p>
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
