"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import { IconMenu2, IconX } from "@tabler/icons-react";

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 50);
  });

  return (
    <div className="fixed top-0 inset-x-0 z-50 w-full px-4 pt-4">
      {/* Desktop Navbar */}
      <motion.div
        animate={{
          backdropFilter: visible ? "blur(10px)" : "none",
          width: visible ? "60%" : "100%",
          y: visible ? 10 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 40,
        }}
        className={cn(
          "hidden lg:flex mx-auto max-w-7xl items-center justify-between rounded-full px-6 py-3",
          visible
            ? "bg-black/80 border border-white/10 shadow-2xl"
            : "bg-transparent"
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 shrink-0"
        >
          <Image
            src="/images/logo/dss_logo.png"
            alt="Digital Security Solutions"
            width={40}
            height={40}
            className="w-10 h-10"
            priority
          />

          <div className="leading-tight">
            <div className="text-sm font-bold text-white tracking-tight">
              DIGITAL SECURITY
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-400">
              SOLUTIONS
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="flex items-center gap-2">
          {NAV_LINKS.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="relative px-4 py-2 text-sm text-white! hover:text-white! transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <button className="px-5 py-2 rounded-full bg-white text-black text-sm font-semibold hover:scale-105 transition-transform">
          Contact Us
        </button>
      </motion.div>

      {/* Mobile Navbar */}
      <motion.div
        animate={{
          backdropFilter: visible ? "blur(10px)" : "none",
          width: visible ? "95%" : "100%",
          y: visible ? 10 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 40,
        }}
        className={cn(
          "lg:hidden mx-auto rounded-2xl px-4 py-3",
          visible
            ? "bg-black/80 border border-white/10"
            : "bg-black/60"
        )}
      >
        <div className="flex items-center justify-between">
          {/* Mobile Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <Image
              src="/images/logo/dss_logo.png"
              alt="DSS"
              width={36}
              height={36}
              className="w-9 h-9"
            />

            <span className="text-sm font-bold text-white">
              DSS
            </span>
          </Link>

          {/* Toggle */}
          <button
            onClick={() =>
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }
            className="text-white"
          >
            {isMobileMenuOpen ? (
              <IconX size={26} />
            ) : (
              <IconMenu2 size={26} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4"
            >
              {NAV_LINKS.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  onClick={() =>
                    setIsMobileMenuOpen(false)
                  }
                  className="rounded-xl px-4 py-3 text-white! hover:bg-white/5 hover:text-white! transition"
                >
                  {link.label}
                </Link>
              ))}

              <button className="mt-2 rounded-xl bg-white py-3 text-black font-semibold">
                Contact Us
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}