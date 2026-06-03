"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { BESTSELLERS } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function BestsellerCard({
  product,
  index,
}: {
  product: (typeof BESTSELLERS)[number];
  index: number;
}) {
  // Even → left-to-right, Odd → right-to-left
  const direction = index % 2 === 0 ? "left" : "right";
  const ref = useScrollReveal<HTMLDivElement>({
    animation: direction,
    delay: (index % 4) * 150,
  });

  return (
    <div
      ref={ref}
      className="bg-gray-200 rounded-3xl p-6 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-gray-200"
    >
      {/* Top: Offer Badge */}
      <div className="mb-4">
        {product.hasOffer && (
          <span className="inline-block px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider rounded-full border border-red-100">
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
            sizes="(max-width: 768px) 100vw, 50vw"
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
          className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors flex items-center gap-1 group/link"
        >
          Click to Learn more
        </Link>
      </div>
    </div>
  );
}

export default function Bestsellers() {
  const headingRef = useScrollReveal<HTMLDivElement>({ animation: "up", delay: 0 });

  return (
    <section className="select-none bg-gray-50 section-padding" id="bestsellers">
      <Container>
        <div ref={headingRef} className="mb-10">
          <h2 className="w-full text-center text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Bestselling Products
          </h2>
          <h3 className=" pt-3 w-full text-center text-1xl md:text-2xl text-red-600/80">
            Others love them, so will you
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BESTSELLERS.map((product, index) => (
            <BestsellerCard key={product.title} product={product} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}