"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const services = [
  {
    title: "Get a quote",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80",
  },
  {
    title: "Discussion",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  },
  {
    title: "Planning",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",
  },
  {
    title: "Installation",
    image:
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=80",
  },
];

export default function Solutions() {
  const router = useRouter();
  return (
    <section className="bg-white min-h-screen px-6 py-16 md:px-12 lg:px-20 font-sans select-none">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-12">
        {/* Left: Label + Heading */}
        <div className="flex-1">
          <span className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1 text-xs text-gray-500 font-medium tracking-wide mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block" />
            Our services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            What we can do
            <br />
            <span className="italic font-light text-red-600">for you</span>
          </h2>
        </div>

        {/* Right: Description + CTA */}
        <div className="flex-1 flex flex-col justify-center items-start md:pt-10 gap-5">
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
            From purchase to installation, we provide quality security solutions
            tailored to your needs.
          </p>
          <button
            className="group inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-red-600 transition-colors duration-200"
            onClick={() => router.push("/products")}
          >
            Our Products
          </button>
        </div>
      </div>

      {/* Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            image={service.image}
          />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ title, image }: { title: string; image: string }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden aspect-3/4 cursor-pointer">
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-gray-900/80 via-gray-900/10 to-transparent" />

      {/* Top-right arrow button */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <ArrowUpRight size={14} className="text-white" />
      </div>

      {/* Red accent line on hover */}
      <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-red-600 transition-all duration-300" />

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white text-sm font-semibold leading-snug">{title}</p>
      </div>
    </div>
  );
}
