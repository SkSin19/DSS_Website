import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import { formatPostDate, getAllPosts, getReadingTime } from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Security Blog – CCTV, Access Control & Alarm Guides",
  description:
    "Expert guides on CCTV camera installation, IP vs HD cameras, storage, biometric attendance, access control and alarm systems from Digital Security Solutions, Delhi.",
  path: "/blogs",
  keywords: [
    "CCTV blog",
    "security system guide",
    "CCTV buying guide India",
    "access control guide",
    "biometric attendance guide",
  ],
});

export default function BlogsPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${SITE_URL}/blogs#blog`,
      name: `${SITE_NAME} Blog`,
      url: `${SITE_URL}/blogs`,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#organization` },
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        url: `${SITE_URL}/blogs/${post.slug}`,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        image: `${SITE_URL}${post.coverImage}`,
      })),
    },
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blogs", path: "/blogs" },
    ]),
  ];

  return (
    <div className="w-full bg-white font-poppins">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <header className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-500!">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-red-600!">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-gray-900!">Blogs</li>
            </ol>
          </nav>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900! md:text-5xl">
            Security <span className="text-red-600!">Guides &amp; Insights</span>
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600! md:text-lg">
            Straightforward advice on CCTV cameras, access control, biometric attendance and alarm
            systems — written by the team that has been installing them across Delhi NCR since 2008.
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {/* Featured post */}
        {featured && (
          <article className="group grid grid-cols-1 overflow-hidden rounded-2xl border border-gray-200 bg-white md:grid-cols-2">
            <Link href={`/blogs/${featured.slug}`} className="relative block aspect-16/9 bg-gray-100 md:aspect-auto md:min-h-80" tabIndex={-1} aria-hidden="true">
              <Image
                src={featured.coverImage}
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </Link>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-wide text-red-600!">
                Latest · {featured.category}
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-snug text-gray-900! md:text-3xl">
                <Link href={`/blogs/${featured.slug}`} className="transition-colors hover:text-red-600!">
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-3 leading-relaxed text-gray-600!">{featured.description}</p>
              <div className="mt-5 flex items-center gap-3 text-sm text-gray-500!">
                <time dateTime={featured.publishedAt}>{formatPostDate(featured.publishedAt)}</time>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {getReadingTime(featured)} min read
                </span>
              </div>
              <Link
                href={`/blogs/${featured.slug}`}
                className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-red-600! hover:text-red-700!"
              >
                Read article
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </article>
        )}

        {/* All posts */}
        {rest.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        {/* CTA */}
        <aside className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl bg-gray-900 p-8 md:flex-row md:items-center md:p-10">
          <div>
            <h2 className="text-2xl font-bold text-white">Need help planning your security system?</h2>
            <p className="mt-2 max-w-xl text-gray-300!">
              Get a free site survey and a clear, itemised quotation from our team.
            </p>
          </div>
          <Link
            href="/enquiry"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white! transition-colors hover:bg-red-700"
          >
            Get a Free Quote
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </aside>
      </div>
    </div>
  );
}
