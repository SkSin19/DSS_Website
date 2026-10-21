import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd } from "@/lib/seo";

/* ─────────────────────────────────────────────
   Free tools (navbar "Tools" menu, /tools hub, sitemap)
   ───────────────────────────────────────────── */

export type Tool = {
  title: string;
  /** One line for menus and cards. */
  summary: string;
  href: string;
  icon: "calculator" | "compare";
};

export const TOOLS: Tool[] = [
  {
    title: "CCTV Cost Calculator",
    summary: "Estimate the cameras, storage and cost for your property",
    href: "/tools/cctv-cost-calculator",
    icon: "calculator",
  },
  {
    title: "Compare Products",
    summary: "Compare cameras, NVRs and devices side by side",
    href: "/tools/compare-products",
    icon: "compare",
  },
];

export type ToolFaq = { q: string; a: string };

/** WebApplication + breadcrumb + FAQ structured data for a tool page. */
export function toolJsonLd({
  name,
  description,
  path,
  faqs,
}: {
  name: string;
  description: string;
  path: string;
  faqs: ToolFaq[];
}) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name,
      description,
      url: `${SITE_URL}${path}`,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any (web browser)",
      inLanguage: "en-IN",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      provider: { "@id": `${SITE_URL}/#organization`, name: SITE_NAME },
    },
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Tools", path: "/tools" },
      { name, path },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ];
}
