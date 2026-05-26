import type {
  HeroSlide,
  NavLink,
  Brand,
  ProductCategory,
  TrustBadge,
  Feature,
  FooterLinkGroup,
  ContactInfo,
} from "./types";

/* ─────────────────────────────────────────────
   Site-wide Constants
   ───────────────────────────────────────────── */

export const SITE_NAME = "Digital Security Solutions";
export const SITE_TAGLINE = "Advanced Digital Security Solutions";
export const SITE_DESCRIPTION =
  "Reliable CCTV cameras and surveillance systems for homes, shops, offices, and industrial spaces. Trusted by businesses across India.";
export const SITE_URL = "https://digitalsecuritysolutions.in";

/* ─────────────────────────────────────────────
   Navigation
   ───────────────────────────────────────────── */

export const NAV_LINKS: NavLink[] = [
  { label: "Products", href: "/products" },
  { label: "Brands", href: "/brands" },
  { label: "Solutions", href: "/solutions" },
  { label: "Support", href: "/support" },
  { label: "About Us", href: "/about" },
];

/* ─────────────────────────────────────────────
   Hero Slides
   ───────────────────────────────────────────── */

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    badge: "NEXT-GEN SURVEILLANCE",
    headingLine1: "Advanced Digital",
    headingLine2: "Security Solution",
    headingAccentColor: "var(--color-primary)",
    description:
      "Reliable CCTV cameras and surveillance systems for homes, shops, offices, and industrial spaces. Trusted by businesses across India.",
    ctaPrimaryLabel: "Get a Quote",
    ctaPrimaryHref: "/enquiry",
    ctaSecondaryLabel: "Request Enquiry",
    ctaSecondaryHref: "/enquiry",
    imageSrc: "/images/hero/cctv-cameras-surveillance-systems-slide-1.png",
    imageAlt:
      "CCTV cameras and NVR surveillance system by Digital Security Solutions",
    theme: "blue",
  },
  {
    id: 2,
    headingLine1: "Advanced Digital",
    headingLine2: "Security Solutions",
    description:
      "Reliable CCTV cameras and surveillance systems for homes, shops, offices, and industrial spaces.",
    ctaPrimaryLabel: "Get a Quote",
    ctaPrimaryHref: "/enquiry",
    ctaSecondaryLabel: "Request Enquiry",
    ctaSecondaryHref: "/enquiry",
    imageSrc: "/images/hero/advanced-digital-security-cameras-slide-2.png",
    imageAlt:
      "Advanced digital security cameras and NVR recorder for complete surveillance",
    theme: "light",
  },
];

/* ─────────────────────────────────────────────
   Trust Badges
   ───────────────────────────────────────────── */

export const TRUST_BADGES: TrustBadge[] = [
  { label: "Local Installation Support" },
  { label: "Warranty on Products" },
  { label: "Trusted by Businesses" },
];

/* ─────────────────────────────────────────────
   Brands
   ───────────────────────────────────────────── */

export const BRANDS: Brand[] = [
  {
    name: "Hikvision",
    tagline: "First Choice for Security",
    color: "var(--brand-hikvision)",
  },
  {
    name: "Dahua",
    tagline: "Enabling a Safer Society",
    color: "var(--brand-dahua)",
  },
  {
    name: "CP Plus",
    tagline: "Uparwala Sab Dekh Raha Hai",
    color: "var(--brand-cpplus)",
  },
  {
    name: "Godrej",
    tagline: "Smart Security Solutions",
    color: "var(--brand-godrej)",
  },
  {
    name: "Bosch",
    tagline: "Invented for Life",
    color: "var(--brand-bosch)",
  },
];

/** Brand names used in the scrolling marquee */
export const MARQUEE_BRANDS: string[] = [
  "Godrej",
  "Bosch",
  "Honeywell",
  "Panasonic",
  "Hikvision",
  "CP Plus",
  "Dahua",
  "Matrix",
  "Zicom",
  "Seagate",
];

/* ─────────────────────────────────────────────
   Product Categories
   ───────────────────────────────────────────── */

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    title: "Video Security",
    description:
      "Advanced CCTV Systems for Complete Surveillance and Peace of Mind",
    href: "/products/video-security",
    imageSrc: "/images/categories/video-security-cctv-systems.png",
    imageAlt: "Video security CCTV cameras and surveillance systems",
  },
  {
    title: "Access Control",
    description:
      "Smart Access Solutions for Seamless and Secure Entry",
    href: "/products/access-control",
    imageSrc: "/images/categories/access-control-smart-entry.png",
    imageAlt: "Access control smart lock and biometric entry systems",
  },
  {
    title: "Intrusion Alarm",
    description:
      "Reliable Alarm Systems that Detect, Deter and Protect",
    href: "/products/intrusion-alarm",
    imageSrc: "/images/categories/intrusion-alarm-detection.png",
    imageAlt: "Intrusion alarm detection and motion sensor systems",
  },
  {
    title: "Intercom Solutions",
    description:
      "Smart Intercoms for Clear Communication and Enhanced Security",
    href: "/products/intercom-solutions",
    imageSrc: "/images/categories/intercom-communication-solutions.png",
    imageAlt: "Video intercom communication and door phone solutions",
  },
];

/* ─────────────────────────────────────────────
   Features (Smarter Security Section)
   ───────────────────────────────────────────── */

export const FEATURES: Feature[] = [
  { icon: "shield", label: "Reliable Protection" },
  { icon: "lock", label: "Smart Access" },
  { icon: "bell", label: "Real-time Alerts" },
  { icon: "eye", label: "24/7 Surveillance" },
];

/* ─────────────────────────────────────────────
   Footer
   ───────────────────────────────────────────── */

export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    title: "MENU",
    links: [
      { label: "Home", href: "/" },
      { label: "Store", href: "/store" },
      { label: "About", href: "/about" },
      { label: "Brands", href: "/brands" },
    ],
  },
  {
    title: "UTILITY PAGES",
    links: [
      { label: "Shipping", href: "/shipping" },
      { label: "Contact", href: "/contact" },
      { label: "404 Not Found", href: "/404" },
      { label: "Support", href: "/support" },
    ],
  },
];

export const CONTACT_INFO: ContactInfo[] = [
  {
    icon: "email",
    label: "Email",
    value: "contact@dss.com",
    href: "mailto:contact@dss.com",
  },
  {
    icon: "phone",
    label: "Phone",
    value: "+91 98334238",
    href: "tel:+9198334238",
  },
  {
    icon: "location",
    label: "Address",
    value: "",
  },
];
