import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAllPosts } from "@/lib/blog";
import { getProductsFromApi } from "@/lib/products-api";

// Regenerate hourly so new products appear without a redeploy.
export const revalidate = 3600;

/**
 * XML sitemap served at /sitemap.xml.
 * Lists the site's primary, indexable routes so search engines can
 * discover and prioritise them. Query-parameter filter views of
 * /products are intentionally excluded (they are non-canonical), as is
 * /solutions/services (it canonicalises to /solutions).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const posts = getAllPosts();

  const routes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
    lastModified?: Date;
  }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/products", changeFrequency: "weekly", priority: 0.9 },
    { path: "/solutions", changeFrequency: "monthly", priority: 0.8 },
    { path: "/enquiry", changeFrequency: "yearly", priority: 0.8 },
    { path: "/blogs", changeFrequency: "weekly", priority: 0.8 },
    { path: "/about", changeFrequency: "yearly", priority: 0.6 },
    ...posts.map((post) => ({
      path: `/blogs/${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
    })),
  ];

  // Product detail pages come from the backend; skip them if it's unreachable
  // rather than failing the whole sitemap.
  const products = await getProductsFromApi({ limit: 1000 }).catch(() => []);
  for (const product of products) {
    if (!product.slug) continue;
    routes.push({
      path: `/products/${product.slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return routes.map(({ path, changeFrequency, priority, lastModified: lm }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: lm ?? lastModified,
    changeFrequency,
    priority,
  }));
}
