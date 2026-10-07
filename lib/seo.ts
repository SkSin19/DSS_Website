import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

const DEFAULT_OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} - CCTV, Access Control & Security Systems in Delhi`,
};

type PageMetadataInput = {
  /** Page title (the layout template appends " | Digital Security Solutions"). */
  title: string;
  description: string;
  /** Route path, e.g. "/blogs". Used for the canonical and og:url. */
  path: string;
  keywords?: string[];
  /** Set true to bypass the layout title template. */
  absoluteTitle?: boolean;
  image?: { url: string; alt?: string };
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

/**
 * Builds per-page metadata. Page-level `openGraph`/`twitter` objects replace
 * (not merge with) the layout's, so this re-applies the shared defaults —
 * most importantly the share image — on every page.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  absoluteTitle = false,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetadataInput): Metadata {
  const ogImage = image
    ? { url: image.url, alt: image.alt ?? title }
    : DEFAULT_OG_IMAGE;
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_IN",
      type,
      images: [ogImage],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [ogImage.url],
    },
  };
}

/** schema.org BreadcrumbList for the given trail (first item should be Home). */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
