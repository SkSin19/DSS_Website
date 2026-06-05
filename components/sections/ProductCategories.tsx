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
  // Even → from left, Odd → from right
  const direction = index % 2 === 0 ? "left" : "right";
  const ref = useScrollReveal<HTMLAnchorElement>({
    animation: direction,
    delay: index * 200,
  });

  return (
    <Link
      ref={ref}
      href={category.href}
      className="category-card relative flex min-h-76 w-full flex-col justify-between overflow-hidden rounded-4xl p-6 sm:min-h-112.5 sm:p-8 md:p-10 border border-gray-200 bg-gray-200"
    >
      <div className="relative z-10 max-w-sm">
        <h3 className="text-2xl sm:text-3xl font-bold text-black mb-3">
          {category.title}
        </h3>
        <p className="text-gray-800 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
          {category.description}
        </p>
        <span className="inline-flex items-center text-sm font-semibold text-red-600">
          Explore category
        </span>

        {category.subCategories?.length ? (
          <div className="mt-4 sm:mt-6 flex flex-wrap gap-2">
            {category.subCategories.map((subCategory) => (
              <span
                key={subCategory}
                className="rounded-full border border-red-500 bg-gray-200 px-2.5 py-1 text-[10px] sm:text-[11px] font-medium text-gray-700"
              >
                {subCategory}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="absolute inset-0">
        <Image
          src={category.imageSrc}
          alt={category.imageAlt}
          fill
          className="object-cover opacity-20 drop-shadow-xl"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
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
