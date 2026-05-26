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
    productImageSrc: "/images/banners/hikvision_banner.png",
  },
  {
    name: "Dahua",
    tagline: "Enabling a Safer Society",
    color: "var(--brand-dahua)",
    productImageSrc: "/images/banners/alhua_banner.png",
  },
  {
    name: "CP Plus",
    tagline: "Uparwala Sab Dekh Raha Hai",
    color: "var(--brand-cpplus)",
    productImageSrc: "/images/banners/cpplus_banner.png",
  },
  {
    name: "Godrej",
    tagline: "Smart Security Solutions",
    color: "var(--brand-godrej)",
    productImageSrc: "/images/banners/godrej_banner.png",
  },
  {
    name: "Bosch",
    tagline: "Invented for Life",
    color: "var(--brand-bosch)",
    productImageSrc: "/images/banners/bosch_banner.png",
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

/* ─────────────────────────────────────────────
   New Sections Data
   ───────────────────────────────────────────── */

export const BESTSELLERS = [
  {
    title: "Smart PTZ Camera",
    description: "360° surveillance with smart tracking, night vision and real-time alerts for total peace of mind.",
    imageSrc: "/images/products/ptz-camera.png",
    imageAlt: "Smart PTZ Camera",
    hasOffer: true,
    href: "/products/ptz-camera",
  },
  {
    title: "Video Door Phone",
    description: "See, speak and unlock from anywhere. Secure your entrance with smart connectivity.",
    imageSrc: "/images/products/video-door-phone.png",
    imageAlt: "Video Door Phone",
    hasOffer: true,
    href: "/products/video-door-phone",
  },
  {
    title: "Access Control System",
    description: "Advanced access solutions with PIN, card and biometric options for every need.",
    imageSrc: "/images/products/access-control.png",
    imageAlt: "Access Control System",
    hasOffer: true,
    href: "/products/access-control",
  },
  {
    title: "Wireless Alarm Kit",
    description: "Easy to install, always connected and built to protect what matters most—24/7.",
    imageSrc: "/images/products/wireless-alarm.png",
    imageAlt: "Wireless Alarm Kit",
    hasOffer: true,
    href: "/products/wireless-alarm",
  },
];

export const FEATURED_PRODUCTS = [
  {
    id: "home-automation",
    title: "Home Automation",
    description: "Control your lights, appliances, security and more from anywhere.",
    imageSrc: "/images/products/home-automation.png",
    imageAlt: "Home Automation",
    icon: "home",
    hasOffer: true,
    href: "/products/home-automation",
  },
  {
    id: "biometric",
    title: "Biometric Attendance",
    description: "Accurate identification for secure access and attendance.",
    imageSrc: "/images/products/biometric.png",
    imageAlt: "Biometric Attendance",
    icon: "fingerprint",
    hasOffer: true,
    href: "/products/biometric",
  },
  {
    id: "fire-alarm",
    title: "Fire Alarm",
    description: "Early detection and instant alerts for maximum safety.",
    imageSrc: "/images/products/fire-alarm.png",
    imageAlt: "Fire Alarm",
    icon: "fire",
    hasOffer: true,
    href: "/products/fire-alarm",
  },
  {
    id: "gate-automation",
    title: "Gate Automation",
    description: "Automate your gates for seamless, secure and convenient access.",
    imageSrc: "/images/products/gate-automation.png",
    imageAlt: "Gate Automation",
    icon: "gate",
    hasOffer: true,
    href: "/products/gate-automation",
  },
  {
    id: "intrusion-alarm",
    title: "Intrusion Alarm",
    description: "Smart detection, instant alerts and reliable protection.",
    imageSrc: "/images/products/intrusion.png",
    imageAlt: "Intrusion Alarm",
    icon: "shield",
    hasOffer: true,
    href: "/products/intrusion-alarm",
  },
];

export const WHY_CHOOSE_US = [
  {
    id: "advanced-tech",
    title: "Advanced Technology",
    description: "Cutting-edge security solutions with state-of-the-art technology.",
    imageSrc: "/images/features/tech.png",
  },
  {
    id: "reliable",
    title: "Reliable Performance",
    description: "High-quality products tested for consistent and dependable performance.",
    imageSrc: "/images/features/performance.png",
  },
  {
    id: "innovation",
    title: "Innovation & Expertise",
    description: "Pioneering security solutions designed by industry experts.",
    imageSrc: "/images/features/innovation.png",
  },
  {
    id: "comprehensive",
    title: "Comprehensive Features",
    description: "Full range of features for complete, customizable security coverage.",
    imageSrc: "/images/features/features.png",
  },
  {
    id: "support",
    title: "24/7 Support",
    description: "Dedicated 24/7 customer support for all your security needs.",
    imageSrc: "/images/features/support.png",
  },
  {
    id: "trusted",
    title: "Trusted & Proven",
    description: "A proven track record and trusted name in the security industry.",
    imageSrc: "/images/features/trusted.png",
  },
];
