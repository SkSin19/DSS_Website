import { FEATURED_PRODUCTS, BESTSELLERS } from "@/lib/constants";

export interface ProductSpecItem {
  label: string;
  value: string;
}

export interface ProductPageData {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  heroImageSrc: string;
  heroImageAlt: string;
  highlights: string[];
  specs: ProductSpecItem[];
}

const sharedSpecSet: ProductSpecItem[] = [
  { label: "Resolution", value: "Placeholder spec" },
  { label: "Storage", value: "Placeholder spec" },
  { label: "Connectivity", value: "Placeholder spec" },
  { label: "Warranty", value: "Placeholder spec" },
];

const sharedHighlights = [
  "Fast setup with guided installation",
  "Reliable daily performance for business use",
  "Designed for future backend integration",
  "Placeholder content ready for product data",
];

const productDefinitions: Record<string, Omit<ProductPageData, "slug">> = {
  "ptz-camera": {
    title: "Smart PTZ Camera",
    category: "Video Security",
    summary: "360° surveillance with smart tracking, night vision and real-time alerts.",
    description:
      "A placeholder product detail page for a high-mobility PTZ camera. Replace the copy, specs, and media later with backend data.",
    heroImageSrc: "/images/hero/cctv-cameras-surveillance-systems-slide-1.png",
    heroImageAlt: "Smart PTZ Camera placeholder",
    highlights: sharedHighlights,
    specs: sharedSpecSet,
  },
  "video-door-phone": {
    title: "Video Door Phone",
    category: "Intercom",
    summary: "See, speak and unlock from anywhere with a connected door phone system.",
    description:
      "Placeholder details for a modern video door phone. This layout is ready to receive live product data later.",
    heroImageSrc: "/images/categories/intercom-communication-solutions.png",
    heroImageAlt: "Video Door Phone placeholder",
    highlights: sharedHighlights,
    specs: sharedSpecSet,
  },
  "access-control": {
    title: "Access Control System",
    category: "Access Control",
    summary: "Advanced access solutions with PIN, card and biometric options.",
    description:
      "Placeholder content for an access control product. Use this route as the template for backend-driven product detail pages.",
    heroImageSrc: "/images/categories/access-control-smart-entry.png",
    heroImageAlt: "Access Control System placeholder",
    highlights: sharedHighlights,
    specs: sharedSpecSet,
  },
  "wireless-alarm": {
    title: "Wireless Alarm Kit",
    category: "Alarm Systems",
    summary: "Easy to install, always connected and built to protect what matters most.",
    description:
      "Placeholder alarm kit detail content. This page structure matches the final backend-fed product layout.",
    heroImageSrc: "/images/categories/intrusion-alarm-detection.png",
    heroImageAlt: "Wireless Alarm Kit placeholder",
    highlights: sharedHighlights,
    specs: sharedSpecSet,
  },
  "home-automation": {
    title: "Home Automation",
    category: "Smart Living",
    summary: "Control lights, appliances, security and more from anywhere.",
    description:
      "Placeholder home automation page with a product-first layout, ready to connect to the backend later.",
    heroImageSrc: "/images/hero/advanced-digital-security-cameras-slide-2.png",
    heroImageAlt: "Home Automation placeholder",
    highlights: sharedHighlights,
    specs: sharedSpecSet,
  },
  "biometric": {
    title: "Biometric Attendance",
    category: "Attendance Control",
    summary: "Accurate identification for secure access and attendance.",
    description:
      "Placeholder biometric attendance detail screen. Replace the section content with live fields later.",
    heroImageSrc: "/images/categories/access-control-smart-entry.png",
    heroImageAlt: "Biometric Attendance placeholder",
    highlights: sharedHighlights,
    specs: sharedSpecSet,
  },
  "fire-alarm": {
    title: "Fire Alarm",
    category: "Safety",
    summary: "Early detection and instant alerts for maximum safety.",
    description:
      "Placeholder fire alarm page. The same layout can be populated from backend product records later.",
    heroImageSrc: "/images/categories/intrusion-alarm-detection.png",
    heroImageAlt: "Fire Alarm placeholder",
    highlights: sharedHighlights,
    specs: sharedSpecSet,
  },
  "gate-automation": {
    title: "Gate Automation",
    category: "Access Control",
    summary: "Automate your gates for seamless and secure entry.",
    description:
      "Placeholder gate automation detail page with the same product flow and section order you requested.",
    heroImageSrc: "/images/banners/godrej_banner.png",
    heroImageAlt: "Gate Automation placeholder",
    highlights: sharedHighlights,
    specs: sharedSpecSet,
  },
  "smart-lock": {
    title: "Smart Lock System",
    category: "Access Control",
    summary: "Modern access control with secure, convenient smart locking.",
    description:
      "Placeholder smart lock page with a clean structure that can later be fed directly from the backend.",
    heroImageSrc: "/images/categories/access-control-smart-entry.png",
    heroImageAlt: "Smart Lock System placeholder",
    highlights: sharedHighlights,
    specs: sharedSpecSet,
  },
  "intrusion-alarm": {
    title: "Intrusion Alarm",
    category: "Alarm Systems",
    summary: "Smart detection, instant alerts and reliable protection.",
    description:
      "Placeholder intrusion alarm page. Replace the text, specs and images later from the backend.",
    heroImageSrc: "/images/categories/intrusion-alarm-detection.png",
    heroImageAlt: "Intrusion Alarm placeholder",
    highlights: sharedHighlights,
    specs: sharedSpecSet,
  },
  "video-security": {
    title: "Video Security",
    category: "Security Solutions",
    summary: "Advanced CCTV systems for complete surveillance and peace of mind.",
    description:
      "Placeholder category page for video security products, built to support backend product data later.",
    heroImageSrc: "/images/categories/video-security-cctv-systems.png",
    heroImageAlt: "Video Security placeholder",
    highlights: sharedHighlights,
    specs: sharedSpecSet,
  },
  "intercom-solutions": {
    title: "Intercom Solutions",
    category: "Communication",
    summary: "Smart intercoms for clear communication and enhanced security.",
    description:
      "Placeholder intercom solutions page. This content will be swapped with live data from the backend later.",
    heroImageSrc: "/images/categories/intercom-communication-solutions.png",
    heroImageAlt: "Intercom Solutions placeholder",
    highlights: sharedHighlights,
    specs: sharedSpecSet,
  },
};

export const PRODUCT_SLUGS = Object.keys(productDefinitions);

export function getProductPageData(slug: string): ProductPageData {
  const foundProduct = productDefinitions[slug];

  if (foundProduct) {
    return {
      slug,
      ...foundProduct,
    };
  }

  const friendlyTitle = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return {
    slug,
    title: friendlyTitle,
    category: "Security Product",
    summary: "Placeholder product summary awaiting backend content.",
    description:
      "This dynamic route is ready for future backend-driven product details and specifications.",
    heroImageSrc: "/images/hero/cctv-cameras-surveillance-systems-slide-1.png",
    heroImageAlt: `${friendlyTitle} placeholder`,
    highlights: sharedHighlights,
    specs: sharedSpecSet,
  };
}

export function getAllProducts() {
  const combinedProducts = [...FEATURED_PRODUCTS, ...BESTSELLERS];

  return PRODUCT_SLUGS.map((slug, index) => {
    const product = getProductPageData(slug);
    const baseCard = combinedProducts[index % combinedProducts.length];

    return {
      ...product,
      href: `/products/${slug}`,
      imageSrc: baseCard.imageSrc,
      imageAlt: baseCard.imageAlt,
      teaser: product.summary,
    };
  });
}

export function getRelatedProducts(currentSlug: string, limit = 4) {
  return PRODUCT_SLUGS.filter((slug) => slug !== currentSlug)
    .slice(0, limit)
    .map((slug, index) => {
      const product = getProductPageData(slug);
      const baseCard = [...FEATURED_PRODUCTS, ...BESTSELLERS][index % ([...FEATURED_PRODUCTS, ...BESTSELLERS].length)];

      return {
        ...product,
        href: `/products/${slug}`,
        imageSrc: baseCard.imageSrc,
        imageAlt: baseCard.imageAlt,
      };
    });
}
