"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { BRANDS, NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { apiGet } from "@/utils/api";

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
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen((prev) => !prev), []);
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  return (
    <header
      id="site-header"
      className={`sticky top-0 z-50 w-full bg-gray-200/95 text-gray-900 backdrop-blur-md transition-all select-none duration-300 border-b border-gray-300 ${
        isScrolled ? "navbar-scrolled" : ""
      }`}
      suppressHydrationWarning
      role="banner"
    >
      {/* ── Keyframes injected once, scoped by class names ── */}
      <style>{`
        @keyframes enq-ring-pulse {
          0%, 100% { opacity: 0; transform: scale(1); }
          40%       { opacity: 1; transform: scale(1); }
          80%       { opacity: 0; transform: scale(1.1); }
        }
        @keyframes enq-dot-breathe {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.4); }
        }
        @keyframes enq-shimmer {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(250%) skewX(-15deg); }
        }

        .enq-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: none;
          cursor: pointer;
          font-weight: 700;
          letter-spacing: 0.03em;
          color: #fff;
          background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
          overflow: hidden;
          transition:
            transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.25s ease;
          box-shadow:
            0 2px 10px rgba(220, 38, 38, 0.4),
            inset 0 1px 0 rgba(255,255,255,0.2);
        }

        /* Desktop size */
        .enq-btn--lg {
          padding: 12px 26px;
          border-radius: 100px;
          font-size: 14px;
        }

        /* Mobile size */
        .enq-btn--sm {
          padding: 9px 18px;
          border-radius: 100px;
          font-size: 13px;
        }

        .enq-btn:hover {
          transform: scale(1.06) translateY(-1px);
          box-shadow:
            0 0 0 5px rgba(220, 38, 38, 0.18),
            0 10px 28px rgba(220, 38, 38, 0.5),
            inset 0 1px 0 rgba(255,255,255,0.22);
        }

        .enq-btn:active {
          transform: scale(0.96) translateY(0);
          box-shadow:
            0 0 0 3px rgba(220, 38, 38, 0.15),
            0 2px 8px rgba(220, 38, 38, 0.3);
          transition: transform 0.08s ease, box-shadow 0.08s ease;
        }

        /* Gloss top sheen */
        .enq-gloss {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(160deg, rgba(255,255,255,0.22) 0%, transparent 55%);
          pointer-events: none;
        }

        /* Pulsing outer ring */
        .enq-ring {
          position: absolute;
          inset: -3px;
          border-radius: 100px;
          border: 2px solid rgba(239, 68, 68, 0.55);
          animation: enq-ring-pulse 2.6s ease-in-out infinite;
          pointer-events: none;
        }

        /* Live dot */
        .enq-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.8);
          animation: enq-dot-breathe 2s ease-in-out infinite;
          flex-shrink: 0;
          position: relative;
        }
        .enq-btn--sm .enq-dot {
          width: 5px;
          height: 5px;
        }

        /* Shimmer sweep on hover */
        .enq-shimmer {
          position: absolute;
          top: 0;
          left: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.28),
            transparent
          );
          transform: translateX(-100%) skewX(-15deg);
          pointer-events: none;
        }
        .enq-btn:hover .enq-shimmer {
          animation: enq-shimmer 0.65s ease forwards;
        }

        /* Arrow nudge */
        .enq-arrow {
          display: inline-flex;
          align-items: center;
          position: relative;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .enq-btn:hover .enq-arrow {
          transform: translateX(3px);
        }
      `}</style>

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
                    className="px-4 py-2 text-sm font-medium text-gray-900 hover:text-red-600! rounded-lg transition-colors duration-200 focus-ring inline-flex items-center gap-1"
                  >
                    {link.label}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                      className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                      aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  <div className="absolute left-1/2 top-full z-50 w-150 -translate-x-1/2 pt-3 opacity-0 invisible translate-y-2 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
                    <div className="rounded-2xl border border-gray-300 bg-gray-50 backdrop-blur-xl shadow-2xl p-4">
                      <p className="px-2 pb-3 text-xs tracking-[0.2em] uppercase text-gray-500">Product Categories</p>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category) => (
                          <Link key={category} href={`/products?category=${encodeURIComponent(category)}`}
                            className="rounded-xl p-3 transition-colors duration-200 hover:bg-gray-100 focus-ring">
                            <p className="text-sm font-semibold text-gray-900">{category}</p>
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
                    className="px-4 py-2 text-sm font-medium text-gray-900 hover:text-red-600! rounded-lg transition-colors duration-200 focus-ring inline-flex items-center gap-1"
                  >
                    {link.label}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                      className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                      aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
                    </svg>
                  </Link>
                  <div className="absolute left-1/2 top-full z-50 w-150 -translate-x-1/2 pt-3 opacity-0 invisible translate-y-2 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
                    <div className="rounded-2xl border border-gray-300 bg-gray-50 backdrop-blur-xl shadow-2xl p-4">
                      <p className="px-2 pb-3 text-xs tracking-[0.2em] uppercase text-gray-500">Our Brands</p>
                      <div className="grid grid-cols-2 gap-2">
                        {BRANDS.map((brand) => (
                          <Link key={brand.name} href={`/brands?name=${encodeURIComponent(brand.name)}`}
                            className="rounded-xl p-3 transition-colors duration-200 hover:bg-red-300 focus-ring">
                            <p className="text-sm font-semibold text-gray-900">{brand.name}</p>
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
                  className="px-4 py-2 text-sm font-medium text-gray-900 hover:text-red-600! rounded-lg transition-colors duration-200 focus-ring"
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Desktop Enquire Button ── */}
        <Link href="/enquiry" className="hidden md:block">
          <button className="enq-btn enq-btn--lg">
            <span className="enq-gloss" />
            <span className="enq-ring" />
            <span className="enq-shimmer" />
            <span className="enq-dot" />
            <span style={{ position: "relative" }}>Enquire Now</span>
            <span className="enq-arrow">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </Link>

        {/* ── Mobile Menu Toggle ── */}
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2} className="w-6 h-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth={2} className="w-6 h-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </nav>

      {/* ── Mobile Menu Drawer ── */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-120 border-t border-gray-300 bg-gray-50"
            : "max-h-0"
        }`}
        role="region"
        aria-label="Mobile navigation"
      >
        <div className="container-main py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-200 hover:text-red-600 rounded-xl transition-colors"
              onClick={closeMobileMenu}
            >
              {link.label}
            </Link>
          ))}

          {/* ── Mobile Enquire Button ── */}
          <div className="pt-2 pb-1 px-1">
            <Link href="/enquiry" onClick={closeMobileMenu}>
              <button className="enq-btn enq-btn--sm w-full justify-center">
                <span className="enq-gloss" />
                <span className="enq-ring" />
                <span className="enq-shimmer" />
                <span className="enq-dot" />
                <span style={{ position: "relative" }}>Enquire Now</span>
                <span className="enq-arrow">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}