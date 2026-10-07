import Link from "next/link";
import Image from "next/image";
import { ChevronRight, MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import {
  SITE_NAME,
  SITE_ADDRESS,
  SITE_EMAIL,
  SITE_PHONE,
  SITE_MAP_QUERY,
  SITE_MAP_URL,
  SITE_LINKEDIN_URL,
  SITE_JUSTDIAL_URL,
  SITE_WHATSAPP_URL,
  CONTACT_INFO,
  OFFICE_LOCATIONS,
  FOUNDING_YEAR,
} from "@/lib/constants";

/* Footer brand colour — change here to retheme the whole footer. */
const FOOTER_BG = "#b91c1c";

const SERVICE_LINKS = [
  { label: "CCTV Camera Installation", href: "/products?category=Surveillance" },
  { label: "CCTV Repair & AMC", href: "/enquiry" },
  { label: "Access Control Systems", href: "/products?category=Access%20Control" },
  { label: "Biometric Attendance", href: "/products?category=Biometric%20%26%20Identity" },
  { label: "Video Door Phones", href: "/solutions" },
  { label: "Intrusion & Fire Alarms", href: "/solutions" },
  { label: "Gate & Home Automation", href: "/solutions" },
  { label: "PA System & AV", href: "/products?category=PA%20SYSTEM%20%26%20AV" },
  { label: "Products Catalog", href: "/products" },
];

const BOTTOM_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/enquiry" },
  { label: "XML Sitemap", href: "/sitemap.xml" },
];

const phoneDisplay = CONTACT_INFO.find((c) => c.icon === "phone")?.value ?? SITE_PHONE;
// Query by business name so the map (and a click through to Google Maps)
// shows the named listing, not a bare coordinate pin.
const MAP_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(SITE_MAP_QUERY)}&z=16&output=embed`;

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 border-l-4 border-white/80 pl-3 text-lg font-bold leading-tight text-white">
      {children}
    </h2>
  );
}

function IconChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-red-700">
      {children}
    </span>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="site-footer"
      role="contentinfo"
      className="relative text-white font-poppins"
      style={{ backgroundColor: FOOTER_BG }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 pt-14 pb-6 sm:px-6 lg:px-8">
        {/* ── Main columns ── */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1.15fr_1fr] lg:gap-8">
          {/* About */}
          <div>
            <Link
              href="/"
              aria-label={`${SITE_NAME} - Home`}
              className="inline-flex rounded-xl bg-white px-3 py-2 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Image
                src="/images/logo/dss_logo.png"
                alt={`${SITE_NAME} logo`}
                width={240}
                height={96}
                style={{ height: 80, width: "auto" }}
              />
            </Link>
            <p className="mt-5 text-[14px] leading-relaxed text-white/90">
              {SITE_NAME}{" "}provides CCTV camera installation, repair &amp; AMC, access control,
              biometric attendance and alarm systems across Delhi NCR. Serving homes and businesses
              since {FOUNDING_YEAR} with genuine, warranty-backed brands.
            </p>

            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-white">
              Need a security system?
            </p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              <Link
                href="/enquiry"
                className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-red-700! transition-colors hover:bg-red-50"
              >
                Get Free Quote
              </Link>
              <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/60 px-4 py-2.5 text-sm font-semibold text-white! transition-colors hover:bg-white/10"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <FooterHeading>Our Services</FooterHeading>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-start gap-1.5 text-[14px] font-medium text-white! transition-opacity hover:opacity-80"
                  >
                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <FooterHeading>Contact Details</FooterHeading>
            <address className="not-italic">
              <ul className="space-y-4 text-[14px]">
                <li className="flex items-start gap-3">
                  <IconChip><MapPin className="h-4 w-4" aria-hidden="true" /></IconChip>
                  <span className="leading-relaxed text-white/95">{SITE_ADDRESS}</span>
                </li>
                <li className="flex items-center gap-3">
                  <IconChip><Phone className="h-4 w-4" aria-hidden="true" /></IconChip>
                  <a href={`tel:${SITE_PHONE}`} className="font-semibold text-white! hover:underline">
                    {phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <IconChip><Mail className="h-4 w-4" aria-hidden="true" /></IconChip>
                  <a href={`mailto:${SITE_EMAIL}`} className="break-all text-white! hover:underline">
                    {SITE_EMAIL}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <IconChip><Clock className="h-4 w-4" aria-hidden="true" /></IconChip>
                  <span className="text-white/95">Monday – Sunday: 10:30 AM – 07:30 PM</span>
                </li>
              </ul>
            </address>
          </div>

          {/* Map + social */}
          <div>
            <FooterHeading>Office Location</FooterHeading>
            <div className="overflow-hidden rounded-xl border border-white/20 bg-white/10">
              <iframe
                src={MAP_EMBED_URL}
                title={`${SITE_NAME} location on Google Maps`}
                className="block h-40 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={SITE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-white! hover:underline"
            >
              Get directions <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>

            <div className="mt-4 flex items-center gap-2.5">
              <a
                href={SITE_LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${SITE_NAME} on LinkedIn`}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-red-700! transition-transform hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={SITE_JUSTDIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${SITE_NAME} on JustDial`}
                className="flex h-10 items-center justify-center rounded-lg bg-white px-3 text-sm font-bold text-red-700! transition-transform hover:-translate-y-0.5"
              >
                JD
              </a>
              <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Chat with ${SITE_NAME} on WhatsApp`}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-red-700! transition-transform hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5" aria-hidden="true">
                  <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.24-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.07c0 2 .52 3.95 1.52 5.67L.6 23.28l5.68-1.49a11.3 11.3 0 0 0 5.43 1.38h.01c6.25 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.03" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ── Offices (pill row) ── */}
        <div className="mt-12 border-t border-white/20 pt-8">
          <FooterHeading>Our Offices</FooterHeading>
          <ul className="flex flex-wrap gap-2.5">
            {OFFICE_LOCATIONS.map((office) => (
              <li
                key={office.id}
                className="inline-flex max-w-full items-start gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[13px] text-white/95"
              >
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>
                  <strong className="font-semibold text-white">{office.region}:</strong> {office.address}
                  <span className="text-white/70"> · GSTIN {office.gstin}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-6 md:flex-row">
          <p className="text-center text-sm text-white/90 md:text-left">
            &copy; {currentYear} {SITE_NAME}. All Rights Reserved.
          </p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px]">
              {BOTTOM_LINKS.map((link, i) => (
                <li key={link.href} className="flex items-center gap-2">
                  {i > 0 && <span className="text-white/50" aria-hidden="true">•</span>}
                  <Link href={link.href} className="text-white! hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
