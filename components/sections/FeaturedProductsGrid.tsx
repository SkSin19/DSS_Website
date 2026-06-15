/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Container from "@/components/ui/Container";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { THEME_COLORS } from "@/themes/colors";
import type { BackendProduct } from "@/lib/products-api";

const isValidImage = (value?: string | null) => {
  if (!value) return false;
  const n = value.trim().toLowerCase();
  return n !== "null" && n !== "undefined" && n !== "";
};

const getProductImage = (product: BackendProduct) => {
  if (isValidImage(product.featuredImage)) return product.featuredImage!;
  const first = product.images?.find((img) => isValidImage(img?.url));
  if (first?.url) return first.url;
  return "/images/hero/cctv-cameras-surveillance-systems-slide-1.png";
};

function ProductCard({
  product,
  index,
}: {
  product: BackendProduct;
  index: number;
}) {
  const ref = useScrollReveal<HTMLAnchorElement>({
    animation: index % 2 === 0 ? "left" : "right",
    delay: (index % 3) * 150,
  });

  const href = product.url || `/products/${product.slug}`;
  const categoryHref = product.category
    ? `/products?category=${encodeURIComponent(product.category)}`
    : "/products";

  return (
    <Link
      ref={ref}
      href={href}
      className="group flex flex-col rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative h-full border border-gray-200"
      style={{ backgroundColor: THEME_COLORS.shadowGrey200 }}
    >
      {/* Image */}
      <div
        className="p-3 sm:p-4 flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: THEME_COLORS.shadowGrey100 }}
      >
        <div
          className="relative w-full transition-transform duration-500"
          style={{ aspectRatio: "4 / 3" }}
        >
          <Image
            src={getProductImage(product)}
            alt={product.images?.[0]?.alt || product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-contain mix-blend-multiply"
            priority={index < 3}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* Category + Company badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.company && (
            <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-red-700">
              {product.company}
            </span>
          )}
          {product.category && (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-gray-700">
              {product.category}
            </span>
          )}
        </div>

        <div className="flex items-start gap-3 flex-1">
          <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-red-600 shrink-0 border border-red-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-base font-bold text-gray-900 mb-1 line-clamp-1">
              {product.name}
            </h4>
            {product.model && (
              <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-red-600 mb-1">
                Model {product.model}
              </p>
            )}
            <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
              {product.shortDescription || product.description}
            </p>
          </div>
        </div>

        <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-red-600">
          View details{" "}
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

function InfoBarItem({
  icon,
  title,
  subtitle,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  delay: number;
}) {
  const ref = useScrollReveal<HTMLDivElement>({ animation: "up", delay });
  return (
    <div
      ref={ref}
      className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-3 sm:gap-4"
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-gray-800 shrink-0 shadow-md border border-gray-200"
        style={{ backgroundColor: THEME_COLORS.shadowGrey100 }}
      >
        {icon}
      </div>
      <div>
        <h4 className="text-gray-900 font-semibold text-sm">{title}</h4>
        <p className="text-red-500 text-xs">{subtitle}</p>
      </div>
    </div>
  );
}

export default function FeaturedProductsGrid({
  products,
}: {
  products: BackendProduct[];
}) {
  const [showAll, setShowAll] = useState(false);
  const visibleProducts = showAll ? products : products.slice(0, 6);
  const headingRef = useScrollReveal<HTMLDivElement>({
    animation: "up",
    delay: 0,
  });

  return (
    <section
      className="select-none bg-gray-50 pt-8 sm:pt-10 pb-16 sm:pb-20"
      id="featured"
    >
      <Container>
        <div
          ref={headingRef}
          className="flex flex-col items-center justify-center mb-8 sm:mb-10"
        >
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-2">
              Featured Security Products
            </h2>
            <p className="text-red-600 text-sm max-w-xl mx-auto">
              Smart solutions for a safer, smarter tomorrow.
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-sm">
            No featured products at the moment.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {visibleProducts.map((product, index) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  index={index}
                />
              ))}
            </div>

            {products.length > 6 && (
              <div className="mt-8 sm:mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAll((c) => !c)}
                  className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-red-600 text-white! hover:bg-white! hover:text-black! border-red-600 border-2 px-7 py-3 text-sm font-semibold shadow-xl shadow-gray-900/10 transition-colors duration-200"
                >
                  {showAll ? "Show less" : "Show more"}
                </button>
              </div>
            )}
          </>
        )}

        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8 justify-items-center border-t border-b border-gray-300 pt-8 sm:pt-10 pb-8 sm:pb-10">
          <InfoBarItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            }
            title="Free site inspections"
            subtitle="On-site assessment at your convenience"
            delay={0}
          />
          <InfoBarItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            }
            title="Get a quote"
            subtitle="Custom pricing tailored to your needs"
            delay={200}
          />
          <InfoBarItem
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
            }
            title="24/7 Customer Service"
            subtitle="Round-the-clock support whenever you need"
            delay={400}
          />
        </div>
      </Container>
    </section>
  );
}
