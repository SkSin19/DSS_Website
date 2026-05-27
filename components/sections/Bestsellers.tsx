import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { BESTSELLERS } from "@/lib/constants";

export default function Bestsellers() {
  return (
    <section className="bg-gray-950 section-padding" id="bestsellers">
      <Container>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Bestsellers
          </h2>
          <Link
            href="/products"
            className="text-sm font-medium text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-2 group"
          >
            Browse all products
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BESTSELLERS.map((product, index) => (
            <div
              key={product.title}
              className="bg-[#f0f4f8] rounded-3xl p-6 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Top: Offer Badge */}
              <div className="mb-4">
                {product.hasOffer && (
                  <span className="inline-block px-3 py-1 bg-sky-100 text-sky-600 text-[10px] font-bold uppercase tracking-wider rounded-full">
                    Offer
                  </span>
                )}
              </div>

              {/* Middle: Image */}
              <div className="flex-1 flex items-center justify-center py-6">
                <div className="w-40 h-40 relative group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    fill
                    className="object-contain drop-shadow-lg"
                  />
                </div>
              </div>

              {/* Bottom: Text Content */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-600 mb-5 leading-relaxed line-clamp-3">
                  {product.description}
                </p>
                <Link
                  href={product.href}
                  className="text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors flex items-center gap-1 group/link"
                >
                  Learn more
                  <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}