"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BRANDS,
  NAV_LINKS,
  PRODUCT_CATEGORIES,
  SITE_NAME,
} from "@/lib/constants";
import { apiGet } from "@/utils/api";
import Button from "../ui/Button";

interface CategoriesResponse {
  success: boolean;
  message: string;
  categories: string[];
}

export async function getProductCategoriesFromApi() {
  const response = await apiGet<CategoriesResponse>("/categories");

  return response.data.categories ?? [];
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getProductCategoriesFromApi();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadCategories();
  }, []);

  return (
    <header
      id="site-header"
      className={`sticky top-0 z-50 w-full bg-gray-200/95 text-gray-900 backdrop-blur-md transition-all duration-300 border-b border-gray-300 ${
        isScrolled ? "navbar-scrolled" : ""
      }`}
      suppressHydrationWarning
      role="banner"
    >
      <nav
        className="container-main flex items-center justify-between h-16 md:h-20"
        aria-label="Main navigation"
      >
        {/* ── Logo ── */}
        <Link
          href="/"
          id="nav-logo"
          className="flex items-center gap-2.5 shrink-0 focus-ring rounded-lg"
          aria-label={`${SITE_NAME} — Home`}
          onClick={closeMobileMenu}
        >
          <Image
            src="/images/logo/dss_logo.png"
            alt="Digital Security Solutions logo"
            width={40}
            height={40}
            className="w-9 h-9 md:w-10 md:h-10"
            priority
          />
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm md:text-base font-bold text-gray-900 tracking-tight">
              DIGITAL SECURITY
            </span>
            <span className="text-[10px] md:text-xs font-semibold text-gray-500 tracking-widest uppercase">
              SOLUTIONS
            </span>
          </span>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <ul className="hidden lg:flex items-center gap-1" role="list">
          {NAV_LINKS.map((link) => {
            if (link.label === "Products") {
              return (
                <li key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 rounded-lg transition-colors duration-200 focus-ring inline-flex items-center gap-1"
                  >
                    {link.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>

                  <div className="absolute left-1/2 top-full z-50 w-150 -translate-x-1/2 pt-3 opacity-0 invisible translate-y-2 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
                    <div className="rounded-2xl border border-gray-300 bg-gray-50 backdrop-blur-xl shadow-2xl p-4">
                      <p className="px-2 pb-3 text-xs tracking-[0.2em] uppercase text-gray-500">
                        Product Categories
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category) => (
                          <Link
                            key={category}
                            href={`/products?category=${encodeURIComponent(category)}`}
                            className="rounded-xl p-3 transition-colors duration-200 hover:bg-gray-100 focus-ring"
                          >
                            <p className="text-sm font-semibold text-gray-900">
                              {category}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              );
            }

            if (link.label === "Brands") {
              return (
                <li key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 rounded-lg transition-colors duration-200 focus-ring inline-flex items-center gap-1"
                  >
                    {link.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>

                  <div className="absolute left-1/2 top-full z-50 w-150 -translate-x-1/2 pt-3 opacity-0 invisible translate-y-2 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
                    <div className="rounded-2xl border border-gray-300 bg-gray-50 backdrop-blur-xl shadow-2xl p-4">
                      <p className="px-2 pb-3 text-xs tracking-[0.2em] uppercase text-gray-500">
                        Our Brands
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {BRANDS.map((brand) => (
                          <Link
                            key={brand.name}
                            href={`/brands?name=${encodeURIComponent(brand.name)}`}
                            className="rounded-xl p-3 transition-colors duration-200 hover:bg-gray-100 focus-ring"
                          >
                            <p className="text-sm font-semibold text-gray-900">
                              {brand.name}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-gray-500">
                              {brand.tagline}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              );
            }


            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 rounded-lg transition-colors duration-200 focus-ring"
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link href="/enquiry">
  <Button
    className="hidden lg:flex bg-red-600 text-white hover:bg-red-700 ml-4"
  >
    Enquire Now
  </Button>
</Link>

        {/* ── Mobile Menu Button ── */}
        <button
          type="button"
          id="mobile-menu-toggle"
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-red-600 transition-colors focus-ring"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-6 h-6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-6 h-6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* ── Mobile Menu Drawer ── */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-96 border-t border-gray-300 bg-gray-50"
            : "max-h-0"
        }`}
        role="region"
        aria-label="Mobile navigation"
      >
        <div className="container-main py-4 space-y-1">
          {NAV_LINKS.map(
            (link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-200 hover:text-red-600 rounded-xl transition-colors"
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ),
          )}
        </div>
      </div>
    </header>
  );
}
