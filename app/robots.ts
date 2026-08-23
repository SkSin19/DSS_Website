import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * robots.txt served at /robots.txt.
 * Allows all crawlers, points them at the sitemap, and keeps them out
 * of internal API routes.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
