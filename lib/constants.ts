import type {
  HeroSlide,
  NavLink,
  MarqueeBrand,
  Brand,
  ProductCategory,
  TrustBadge,
  Feature,
  FooterLinkGroup,
  ContactInfo,
} from "./types";
import { THEME_COLORS } from "@/themes/colors";

/* ─────────────────────────────────────────────
   Site-wide Constants
   ───────────────────────────────────────────── */

export const SITE_NAME = "Digital Security Solutions";
export const SITE_TAGLINE = "Advanced Digital Security Solutions";
export const SITE_DESCRIPTION =
  "Surety of Security";
export const SITE_URL = "https://digitalsecuritysolutions.in";

/* ─────────────────────────────────────────────
   Navigation
   ───────────────────────────────────────────── */

export const NAV_LINKS: NavLink[] = [
  { label: "Products", href: "/products" },
  { label: "Brands", href: "/brands" },
  { label: "Solutions", href: "/solutions" },
  { label: "About Us", href: "/about" },
];

/* ─────────────────────────────────────────────
   Hero Slides
   ───────────────────────────────────────────── */

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    badge: "NEXT-GEN SURVEILLANCE",
    headingLine1: "Digital",
    headingLine2: "Security Solutions",
    headingAccentColor: THEME_COLORS.red,
    description:
      "Surety of Security",
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
    headingLine1: "Digital",
    headingLine2: "Security Solutions",
    description:
      "Surety of Security",
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
    name: "eSSL",
    tagline: "Security at fingertips",
    color: THEME_COLORS.red,
    productImageSrc: "/images/banners/hikvision_banner.png",
  },
  {
    name: "Bose",
    tagline: "Better Sound Through Research",
    color: THEME_COLORS.shadowGrey700,
    productImageSrc: "/images/banners/alhua_banner.png",
  },
  {
    name: "CP Plus",
    tagline: "18 Years of Reforming a Secure India",
    color: THEME_COLORS.redDark,
    productImageSrc: "/images/banners/cpplus_banner.png",
  },
  {
    name: "Prama",
    tagline: "Secure your home",
    color: THEME_COLORS.shadowGrey500,
    productImageSrc: "/images/banners/godrej_banner.png",
  },
  {
    name: "Bosch",
    tagline: "Invented for Life",
    color: THEME_COLORS.redSoft,
    productImageSrc: "/images/banners/bosch_banner.png",
  },
];

/** Brand logos used in the scrolling marquee */
export const MARQUEE_BRANDS: MarqueeBrand[] = [
  {
    name: "Godrej",
    logoSrc: "https://www.godrej.com/resources/logo.png",
  },
  {
    name: "Bosch",
    logoSrc: "https://cdn.simpleicons.org/bosch",
  },
  {
    name: "Honeywell",
    logoSrc: "https://commons.wikimedia.org/wiki/Special:FilePath/Honeywell_logo.svg",
  },
  {
    name: "Panasonic",
    logoSrc: "https://cdn.simpleicons.org/panasonic",
  },
  {
    name: "Hikvision",
    logoSrc: "https://commons.wikimedia.org/wiki/Special:FilePath/Hikvision_logo.svg",
  },
  {
    name: "CP Plus",
    logoSrc: "https://cpplusworld.com/assets/img/logo-footer.png",
  },
  {
    name: "Dahua",
    logoSrc: "https://www.dahuasecurity.com/assets/img/logo.png",
  },
  {
    name: "Matrix",
    logoSrc: "https://cdn.simpleicons.org/matrix",
  },
  {
    name: "Zicom",
    logoSrc: "https://cdn.simpleicons.org/bosch",
  },
  {
    name: "Seagate",
    logoSrc: "https://cdn.simpleicons.org/seagate",
  },
];

/* ─────────────────────────────────────────────
   Product Categories
   ───────────────────────────────────────────── */

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    title: "Surveillance System",
    description: "Advanced CCTV Systems for Complete Surveillance and Peace of Mind",
    href: "/products?category=Surveillance%20Systems",
    imageSrc: "/images/categories/video-security-cctv-systems.png",
    imageAlt: "Surveillance System CCTV camera setup",
  },
  {
    title: "Biometric",
    description: "Smart Access Solutions for Seamless and Secure Entry",
    href: "/products?category=Biometric%20%26%20Identity",
    imageSrc: "/images/categories/access-control-smart-entry.png",
    imageAlt: "Biometric Access Control systems",
  },
  {
    title: "PA System",
    description: "Reliable Alarm Systems that Detect, Deter and Protect",
    href: "/products?category=PA%20Systems%20and%20AV",
    imageSrc: "/images/categories/intrusion-alarm-detection.png",
    imageAlt: "AX PRO wireless alarm system components",
  },
  {
    title: "Access Control",
    description: "Smart Intercoms for Clear Communication and Enhanced Security",
    href: "/products?category=Access%20Control",
    imageSrc: "/images/categories/intercom-communication-solutions.png",
    imageAlt: "Intercom terminal and indoor display station",
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
      { label: "Products", href: "/products" },
      { label: "Enquiry", href: "/enquiry" },
      { label: "Brands", href: "/#brands" },
    ],
  },
  {
    title: "UTILITY PAGES",
    links: [
      { label: "Products", href: "/products" },
      { label: "Contact", href: "/enquiry" },
    ],
  },
];

export const CONTACT_INFO: ContactInfo[] = [
  {
    icon: "email",
    label: "Email",
    value: "info@digitalsecurityindia.com",
    href: "mailto:info@digitalsecurityindia.com",
  },
  {
    icon: "phone",
    label: "Phone",
    value: "+91 9999605550",
    href: "tel:+919999605550",
  },
  {
    icon: "location",
    label: "Address",
    value: "Delhi, India",
  },
];

/* ─────────────────────────────────────────────
   New Sections Data
   ───────────────────────────────────────────── */

export const BESTSELLERS = [
  {
    title: "Smart PTZ Camera",
    description: "360° surveillance with smart tracking, night vision and real-time alerts for total peace of mind.",
    imageSrc: "/images/hero/cctv-cameras-surveillance-systems-slide-1.png",
    imageAlt: "Smart PTZ Camera",
    hasOffer: true,
    href: "/products/ptz-camera",
  },
  {
    title: "Video Door Phone",
    description: "See, speak and unlock from anywhere. Secure your entrance with smart connectivity.",
    imageSrc: "/images/categories/intercom-communication-solutions.png",
    imageAlt: "Video Door Phone",
    hasOffer: true,
    href: "/products/video-door-phone",
  },
  {
    title: "Access Control System",
    description: "Advanced access solutions with PIN, card and biometric options for every need.",
    imageSrc: "/images/categories/access-control-smart-entry.png",
    imageAlt: "Access Control System",
    hasOffer: true,
    href: "/products/access-control",
  },
  {
    title: "Wireless Alarm Kit",
    description: "Easy to install, always connected and built to protect what matters most—24/7.",
    imageSrc: "/images/categories/PUBLIC_NEXT_ALARM_KIT.jpg",
    imageAlt: "Wireless Alarm Kit",
    hasOffer: true,
    href: "/products/wireless-alarm",
  },
];

export const FEATURED_PRODUCTS = [
  {
    id: "home-automation",
    slug: "home-automation",
    title: "Home Automation",
    description: "Control your lights, appliances, security and more from anywhere.",
    imageSrc: "/images/services/PUBLIC_NEXT_HOME_AUTOMATION_CARD_BG.avif",
    imageAlt: "Home Automation",
    icon: "home",
    hasOffer: true,
    href: "/products/home-automation",
  },
  {
    id: "biometric",
    slug: "biometric",
    title: "Biometric Attendance",
    description: "Accurate identification for secure access and attendance.",
    imageSrc: "/images/categories/access-control-smart-entry.png",
    imageAlt: "Biometric Attendance",
    icon: "fingerprint",
    hasOffer: true,
    href: "/products/biometric",
  },
  {
    id: "fire-alarm",
    slug: "fire-alarm",
    title: "Fire Alarm",
    description: "Early detection and instant alerts for maximum safety.",
    imageSrc: "/images/services/PUBLIC_NEXT_FIRE_ALARM_BG.jpg",
    imageAlt: "Fire Alarm",
    icon: "fire",
    hasOffer: true,
    href: "/products/fire-alarm",
  },
  {
    id: "gate-automation",
    slug: "gate-automation",
    title: "Gate Automation",
    description: "Automate your gates for seamless, secure and convenient access.",
    imageSrc: "/images/banners/godrej_banner.png",
    imageAlt: "Gate Automation",
    icon: "gate",
    hasOffer: true,
    href: "/products/gate-automation",
  },
  {
    id: "intrusion-alarm",
    slug: "intrusion-alarm",
    title: "Intrusion Alarm",
    description: "Smart detection, instant alerts and reliable protection.",
    imageSrc: "/images/services/PUBLIC_NEXT_INTRUSION_ALARM_BG.jpg",
    imageAlt: "Intrusion Alarm",
    icon: "shield",
    hasOffer: true,
    href: "/products/intrusion-alarm",
  },
  {
    id: "video-security",
    slug: "video-security",
    title: "Video Security",
    description: "Advanced CCTV systems for complete surveillance and peace of mind.",
    imageSrc: "/images/categories/video-security-cctv-systems.png",
    imageAlt: "Video Security",
    icon: "shield",
    hasOffer: true,
    href: "/products/video-security",
  },
  {
    id: "access-control",
    slug: "access-control",
    title: "Access Control System",
    description: "Advanced access solutions with PIN, card and biometric options.",
    imageSrc: "/images/categories/access-control-smart-entry.png",
    imageAlt: "Access Control System",
    icon: "lock",
    hasOffer: true,
    href: "/products/access-control",
  },
  {
    id: "video-door-phone",
    slug: "video-door-phone",
    title: "Video Door Phone",
    description: "See, speak and unlock from anywhere with a connected door phone.",
    imageSrc: "/images/categories/intercom-communication-solutions.png",
    imageAlt: "Video Door Phone",
    icon: "bell",
    hasOffer: true,
    href: "/products/video-door-phone",
  },
  {
    id: "ptz-camera",
    slug: "ptz-camera",
    title: "Smart PTZ Camera",
    description: "360° surveillance with smart tracking and real-time alerts.",
    imageSrc: "/images/hero/cctv-cameras-surveillance-systems-slide-1.png",
    imageAlt: "Smart PTZ Camera",
    icon: "eye",
    hasOffer: true,
    href: "/products/ptz-camera",
  },
  {
    id: "wireless-alarm",
    slug: "wireless-alarm",
    title: "Wireless Alarm Kit",
    description: "Easy to install, always connected and built to protect what matters most.",
    imageSrc: "/images/categories/intrusion-alarm-detection.png",
    imageAlt: "Wireless Alarm Kit",
    icon: "shield",
    hasOffer: true,
    href: "/products/wireless-alarm",
  },
  {
    id: "smart-lock",
    slug: "smart-lock",
    title: "Smart Lock System",
    description: "Modern access control with secure, convenient smart locking.",
    imageSrc: "/images/categories/access-control-smart-entry.png",
    imageAlt: "Smart Lock System",
    icon: "lock",
    hasOffer: true,
    href: "/products/smart-lock",
  },
  {
    id: "intercom-solutions",
    slug: "intercom-solutions",
    title: "Intercom Solutions",
    description: "Smart intercoms for clear communication and enhanced security.",
    imageSrc: "/images/categories/intercom-communication-solutions.png",
    imageAlt: "Intercom Solutions",
    icon: "bell",
    hasOffer: true,
    href: "/products/intercom-solutions",
  },
];

export const WHY_CHOOSE_US = [
  {
    id: "advanced-tech",
    title: "Advanced Technology",
    description: "Cutting-edge security solutions with state-of-the-art technology.",
    imageSrc: "/images/hero/advanced-digital-security-cameras-slide-2.png",
  },
  {
    id: "reliable",
    title: "Reliable Performance",
    description: "High-quality products tested for consistent and dependable performance.",
    imageSrc: "/images/hero/cctv-cameras-surveillance-systems-slide-1.png",
  },
  {
    id: "innovation",
    title: "Innovation & Expertise",
    description: "Pioneering security solutions designed by industry experts.",
    imageSrc: "/images/categories/video-security-cctv-systems.png",
  },
  {
    id: "comprehensive",
    title: "Comprehensive Features",
    description: "Full range of features for complete, customizable security coverage.",
    imageSrc: "/images/categories/access-control-smart-entry.png",
  },
  {
    id: "support",
    title: "24/7 Support",
    description: "Dedicated 24/7 customer support for all your security needs.",
    imageSrc: "/images/banners/cpplus_banner.png",
  },
  {
    id: "trusted",
    title: "Trusted & Proven",
    description: "A proven track record and trusted name in the security industry.",
    imageSrc: "/images/banners/hikvision_banner.png",
  },
];
