import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * XML sitemap served at /sitemap.xml.
 * Lists the site's primary, indexable routes so search engines can
 * discover and prioritise them. Query-parameter filter views of
 * /products are intentionally excluded (they are non-canonical).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/products", changeFrequency: "weekly", priority: 0.9 },
    { path: "/solutions", changeFrequency: "monthly", priority: 0.8 },
    { path: "/solutions/services", changeFrequency: "monthly", priority: 0.8 },
    { path: "/about", changeFrequency: "yearly", priority: 0.6 },
    { path: "/enquiry", changeFrequency: "yearly", priority: 0.7 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
