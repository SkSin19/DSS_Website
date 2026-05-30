import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { BRANDS } from "@/lib/constants";

export default async function DiscoverBrands() {
  return (
    <section className="select-none bg-gray-950 section-padding pb-16 sm:pb-20 md:pb-24" id="brands">
      <Container>
        <SectionHeading
          title="Discover Our Brands"
          subtitle="We work with India's most trusted digital surveillance brands."
          light
        />

        <div className="mt-10 sm:mt-12 lg:mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {BRANDS.map((brand, index) => (
            <Link
              key={brand.name}
              href={`/products?company=${encodeURIComponent(brand.name)}`}
              className="group relative aspect-2/3 w-full rounded-2xl overflow-hidden block animate-fade-in-up"
              style={{ animationDelay: `${index * 80}ms` }}
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
                  <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-black/5" />
                  <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/8 transition-colors duration-500" />
                </>
              ) : (
                <>
                  <div
                    className="absolute inset-0"
                    style={{ backgroundColor: brand.color }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/10" />
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
                <span className="mt-2 inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-sky-300 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  Browse products <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}