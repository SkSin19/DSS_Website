/* ─────────────────────────────────────────────
   Type Definitions — Digital Security Solutions
   ───────────────────────────────────────────── */

/** Hero slider slide configuration */
export interface HeroSlide {
  id: number;
  badge?: string;
  headingLine1: string;
  headingLine2: string;
  headingAccentColor?: string;
  description: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  imageSrc: string;
  imageAlt: string;
  theme: "blue" | "light";
}

/** Navigation link */
export interface NavLink {
  label: string;
  href: string;
}

/** Marquee brand entry */
export interface MarqueeBrand {
  name: string;
  logoSrc: string;
}

/** Brand entry */
export interface Brand {
  name: string;
  tagline: string;
  color: string;
  logoSrc?: string;
  productImageSrc?: string;
  productImageAlt?: string;
}

/** Product category card */
export interface ProductCategory {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

/** Trust badge item */
export interface TrustBadge {
  label: string;
}

/** Feature highlight (used in Smarter Security section) */
export interface Feature {
  icon: "shield" | "lock" | "bell" | "eye";
  label: string;
}

/** Footer link group */
export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

/** Contact info item */
export interface ContactInfo {
  icon: "phone" | "email" | "location";
  label: string;
  value: string;
  href?: string;
}

/** Bestseller product */
export interface ProductCard {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  hasOffer?: boolean;
  href: string;
}

/** Featured Product */
export interface FeaturedProduct {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon?: string;
  hasOffer?: boolean;
  href: string;
}

/** Why Choose Us Feature */
export interface WhyChooseUsFeature {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
}
