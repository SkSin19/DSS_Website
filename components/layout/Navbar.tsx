"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";

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

  return (
    <header
      id="site-header"
      className={`sticky top-0 z-50 w-full bg-black/95 text-white backdrop-blur-md transition-all duration-300 border-b border-white/10 ${
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
            <span className="text-sm md:text-base font-bold text-white tracking-tight">
              DIGITAL SECURITY
            </span>
            <span className="text-[10px] md:text-xs font-semibold text-zinc-400 tracking-widest uppercase">
              SOLUTIONS
            </span>
          </span>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <ul className="hidden lg:flex items-center gap-1" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white rounded-lg transition-colors duration-200 focus-ring"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Mobile Menu Button ── */}
        <button
          type="button"
          id="mobile-menu-toggle"
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-zinc-300 hover:bg-white/10 hover:text-white transition-colors focus-ring"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </nav>

      {/* ── Mobile Menu Drawer ── */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-96 border-t border-white/10 bg-black" : "max-h-0"
        }`}
        role="region"
        aria-label="Mobile navigation"
      >
        <div className="container-main py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-3 text-base font-medium text-zinc-300 hover:bg-white/5 hover:text-white rounded-xl transition-colors"
              onClick={closeMobileMenu}
            >
              {link.label}
            </Link>
          ))}
          {/* Mobile search */}
          <div className="pt-3 px-4">
            <input
              type="search"
              placeholder="Search products..."
              aria-label="Search products"
              className="w-full h-11 px-4 text-sm bg-white/5 border border-white/10 rounded-full text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
