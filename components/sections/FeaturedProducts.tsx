"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Container from "@/components/ui/Container";
import { FEATURED_PRODUCTS } from "@/lib/constants";

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

function ShieldCheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7 text-sky-500">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>
  );
}

export default function FeaturedProducts() {
  const [showAll, setShowAll] = useState(false);
  const visibleProducts = showAll ? FEATURED_PRODUCTS : FEATURED_PRODUCTS.slice(0, 6);

  return (
    <section className="select-none bg-gray-950 pt-8 sm:pt-10 pb-16 sm:pb-20" id="featured">
      <Container>
        <div className="flex flex-col items-center justify-center mb-8 sm:mb-10 gap-4">
          <div className="text-center">
            <div className="flex items-center gap-3 mb-2 justify-center">
              <ShieldCheckIcon />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                Featured Security Products
              </h2>
            </div>
            <p className="text-[#0b6ded] text-sm max-w-xl mx-auto text-center">
              Smart solutions for a safer, smarter tomorrow.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {visibleProducts.map((product) => (
            <Link
              key={product.id}
              href={product.href}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative h-full"
            >
              {product.hasOffer && (
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                  <span className="inline-block px-3 py-1 bg-sky-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                    Offer
                  </span>
                </div>
              )}

              <div className="bg-[#f4f7fb] p-3 sm:p-4 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500" style={{ aspectRatio: "4 / 3" }}>
                  <Image
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    fill
                    className="object-contain mix-blend-multiply"
                  />
                </div>
              </div>

              <div className="p-4 sm:p-5 relative flex-1">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 mb-1 line-clamp-1">{product.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{product.description}</p>
                  </div>
                </div>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-sky-600">
                  Learn more <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-black shadow-xl shadow-black/10 transition-colors hover:bg-black hover:text-white"
          >
            {showAll ? "Show less" : "Show more"}
          </button>
        </div>

        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8 border-t border-b border-gray-800 pt-8 sm:pt-10 pb-8 sm:pb-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-gray-800 shrink-0 shadow-md">
              <ShippingIcon />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Free Shipping</h4>
              <p className="text-gray-400 text-xs">Hassle free home delivery</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-gray-800 shrink-0 shadow-md">
              <PaymentIcon />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Secure Payments</h4>
              <p className="text-gray-400 text-xs">Request enquiry for your orders</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-gray-800 shrink-0 shadow-md">
              <ReturnIcon />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">15 days free return</h4>
              <p className="text-gray-400 text-xs">No questions asked</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
