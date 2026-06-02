"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { THEME_COLORS } from "@/themes/colors";

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
      className="category-card group relative flex min-h-76 flex-col justify-between overflow-hidden rounded-4xl p-6 sm:min-h-112.5 sm:p-8 md:p-10 border border-gray-200"
      style={{ backgroundColor: THEME_COLORS.shadowGrey50 }}
    >
      <div className="relative z-10 max-w-sm">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
          {category.title}
        </h3>
        <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
          {category.description}
        </p>
        <span className="inline-flex items-center text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
          Explore category
          <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>

        {category.subCategories?.length ? (
          <div className="mt-4 sm:mt-6 flex flex-wrap gap-2">
            {category.subCategories.map((subCategory) => (
              <span
                key={subCategory}
                className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[10px] sm:text-[11px] font-medium text-gray-700"
              >
                {subCategory}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="absolute right-0 bottom-0 w-2/3 sm:w-2/3 max-w-87.5 transform translate-x-4 translate-y-4 sm:translate-x-10 sm:translate-y-10 group-hover:scale-105 group-hover:-translate-y-2 group-hover:-translate-x-2 transition-all duration-500">
        <Image
          src={category.imageSrc}
          alt={category.imageAlt}
          width={400}
          height={300}
          className="w-full h-auto object-contain drop-shadow-xl"
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
