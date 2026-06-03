"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Container from "@/components/ui/Container";
import { FEATURED_PRODUCTS } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { THEME_COLORS } from "@/themes/colors";

function ShippingIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
    </svg>
  );
}

function ReturnIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
    </svg>
  );
}

// Product card with alternating left/right scroll-reveal
function ProductCard({
  product,
  index,
}: {
  product: (typeof FEATURED_PRODUCTS)[number];
  index: number;
}) {
  const direction = index % 2 === 0 ? "left" : "right";
  const ref = useScrollReveal<HTMLAnchorElement>({
    animation: direction,
    delay: (index % 3) * 150,
  });

  return (
    <Link
      ref={ref}
      href={product.href}
      className="group flex flex-col rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative h-full border border-gray-200"
      style={{ backgroundColor: THEME_COLORS.shadowGrey200 }}
    >
      {product.hasOffer && (
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
          <span className="inline-block px-3 py-1 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
            Offer
          </span>
        </div>
      )}

      <div className="bg-gray-200 p-3 sm:p-4 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500" style={{ aspectRatio: "4 / 3" }}>
          <Image
            src={product.imageSrc}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain mix-blend-multiply"
          />
        </div>
      </div>

      <div className="p-4 sm:p-5 relative flex-1">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-red-600 shrink-0 border border-red-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
          </div>
          <div>
            <h4 className="text-base font-bold text-gray-900 mb-1 line-clamp-1">{product.title}</h4>
            <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{product.description}</p>
          </div>
        </div>
        <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-red-600">
          Click to learn more
        </div>
      </div>
    </Link>
  );
}

// Info bar item slides up individually
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
    <div ref={ref} className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-3 sm:gap-4">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-gray-800 shrink-0 shadow-md border border-gray-200" style={{ backgroundColor: THEME_COLORS.shadowGrey100 }}>
        {icon}
      </div>
      <div>
        <h4 className="text-gray-900 font-semibold text-sm">{title}</h4>
        <p className="text-gray-500 text-xs">{subtitle}</p>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const [showAll, setShowAll] = useState(false);
  const visibleProducts = showAll ? FEATURED_PRODUCTS : FEATURED_PRODUCTS.slice(0, 6);

  const headingRef = useScrollReveal<HTMLDivElement>({ animation: "up", delay: 0 });

  return (
    <section className="select-none bg-gray-50 pt-8 sm:pt-10 pb-16 sm:pb-20" id="featured">
      <Container>
        <div ref={headingRef} className="flex flex-col items-center justify-center mb-8 sm:mb-10 gap-4">
          <div className="text-center">
            <div className="flex items-center gap-3 mb-2 justify-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Featured Security Products
              </h2>
            </div>
            <p className="text-red-600 text-sm max-w-xl mx-auto text-center">
              Smart solutions for a safer, smarter tomorrow.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {visibleProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-red-600 px-7 py-3 text-sm font-semibold text-white shadow-xl shadow-gray-900/10 transition-colors hover:bg-red-700 hover:text-white"
          >
            {showAll ? "Show less" : "Show more"}
          </button>
        </div>

        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8 justify-items-center border-t border-b border-gray-300 pt-8 sm:pt-10 pb-8 sm:pb-10">
          <InfoBarItem
            icon={<ShippingIcon />}
            title="Free Shipping"
            subtitle="Hassle free home delivery"
            delay={0}
          />
          <InfoBarItem
            icon={<PaymentIcon />}
            title="Secure Payments"
            subtitle="Request enquiry for your orders"
            delay={200}
          />
          <InfoBarItem
            icon={<ReturnIcon />}
            title="15 days free return"
            subtitle="No questions asked"
            delay={400}
          />
        </div>
      </Container>
    </section>
  );
}
