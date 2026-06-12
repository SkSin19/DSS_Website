"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function CategoryCard({
  category,
  index,
}: {
  category: (typeof PRODUCT_CATEGORIES)[number];
  index: number;
}) {
  const direction = index % 2 === 0 ? "left" : "right";
  const ref = useScrollReveal<HTMLAnchorElement>({
    animation: direction,
    delay: index * 200,
  });

  return (
    <Link
      ref={ref}
      href={category.href}
      className="category-card group relative flex min-h-55 sm:min-h-70 md:min-h-75 w-full flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-8 border border-gray-200 bg-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Text content */}
      <div className="relative z-10 max-w-[55%] flex flex-col justify-between min-h-40 sm:min-h-55 h-full">
        <div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-2 sm:mb-3 group-hover:text-red-600 transition-colors">
            {category.title}
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed mb-4">
            {category.description}
          </p>
        </div>
        <span className="inline-flex items-center text-xs sm:text-sm font-semibold text-black group-hover:text-red-600 transition-colors mt-auto">
          Explore category{" "}
          <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>

      {/* Image — full card height, pinned to right edge */}
      <div className="absolute inset-y-0 right-0 w-[50%] md:w-[50%]">
        <Image
          src={category.imageSrc}
          alt={category.imageAlt}
          fill
          className="object-contain object-right transition-transform duration-500 group-hover:scale-100"
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {/* Gradient: white → gray-200 (matches card bg), left-to-right */}
        <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-200/60 to-transparent pointer-events-none" />
      </div>
    </Link>
  );
}

export default function ProductCategories() {
  return (
    <section className="select-none bg-white section-padding" id="categories">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {PRODUCT_CATEGORIES.map((category, index) => (
            <CategoryCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
