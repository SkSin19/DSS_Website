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

  // Layout responds to the card's own width (container queries), so it adapts
  // both to small phones and to the narrow 2-column grid on tablets:
  // narrow card → image on top, text below; wide card → text left, image right.
  return (
    <Link
      ref={ref}
      href={category.href}
      className="category-card @container group block h-full w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      <div className="flex h-full flex-col @md:min-h-72 @md:flex-row">
        {/* Image */}
        <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden bg-gray-100 @2xs:aspect-16/10 @md:order-last @md:aspect-auto @md:w-[45%]">
          <Image
            src={category.imageSrc}
            alt={category.imageAlt}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          />
        </div>

        {/* Text */}
        <div className="flex flex-1 flex-col p-3 @2xs:p-5 @sm:p-6 @lg:p-8">
          <h3 className="mb-1 text-[15px] font-bold leading-tight text-black! transition-colors group-hover:text-red-600! @2xs:mb-2 @2xs:text-xl @sm:text-2xl @xl:text-3xl">
            {category.title}
          </h3>
          <p className="line-clamp-2 text-xs leading-relaxed text-gray-500! @2xs:line-clamp-none @2xs:text-sm @xl:text-base">
            {category.description}
          </p>
          <span className="mt-auto inline-flex items-center pt-3 text-xs font-semibold text-black! transition-colors group-hover:text-red-600! @2xs:pt-5 @2xs:text-sm">
            Explore<span className="hidden @2xs:inline">&nbsp;category</span>
            <span className="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ProductCategories() {
  return (
    <section className="select-none bg-white section-padding" id="categories">
      <Container>
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
          {PRODUCT_CATEGORIES.map((category, index) => (
            <CategoryCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
