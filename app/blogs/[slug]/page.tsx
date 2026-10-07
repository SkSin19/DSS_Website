import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Phone, CalendarDays } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import BlogContent from "@/components/blog/BlogContent";
import EnquiryForm from "@/components/sections/EnquiryForm";
import {
  BLOG_POSTS,
  formatPostDate,
  getHeadings,
  getPostBySlug,
  getReadingTime,
  getRelatedPosts,
  getWordCount,
} from "@/lib/blog";
import { CONTACT_INFO, SITE_NAME, SITE_PHONE, SITE_URL, SITE_WHATSAPP_URL } from "@/lib/constants";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

// Posts live in code, so every page is prerendered and unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };

  return {
    ...buildPageMetadata({
      title: post.metaTitle ?? post.title,
      description: post.description,
      path: `/blogs/${post.slug}`,
      keywords: post.keywords,
      image: { url: post.coverImage, alt: post.coverAlt },
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
    }),
    authors: [{ name: post.author }],
    category: post.category,
  };
}

const phoneDisplay = CONTACT_INFO.find((c) => c.icon === "phone")?.value ?? SITE_PHONE;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const headings = getHeadings(post);
  const related = getRelatedPosts(post);
  const url = `${SITE_URL}/blogs/${post.slug}`;

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      headline: post.title,
      description: post.description,
      image: [`${SITE_URL}${post.coverImage}`],
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
      wordCount: getWordCount(post),
      articleSection: post.category,
      keywords: post.keywords.join(", "),
      inLanguage: "en-IN",
      author: { "@type": "Organization", name: post.author, url: SITE_URL },
      publisher: { "@id": `${SITE_URL}/#organization` },
      isPartOf: { "@id": `${SITE_URL}/blogs#blog` },
    },
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blogs", path: "/blogs" },
      { name: post.title, path: `/blogs/${post.slug}` },
    ]),
  ];
  if (post.faqs?.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    });
  }

  return (
    <div className="w-full bg-white font-poppins">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <header className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto w-full max-w-4xl px-4 pt-10 pb-10 sm:px-6 md:pt-14">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-500!">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-red-600!">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blogs" className="hover:text-red-600!">Blogs</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="line-clamp-1 text-gray-900!">{post.category}</li>
            </ol>
          </nav>
          <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-red-600!">{post.category}</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-gray-900! md:text-[2.6rem]">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-600!">{post.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500!">
            <span className="font-medium text-gray-700!">By {post.author}</span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
            </span>
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <span>
                Updated <time dateTime={post.updatedAt}>{formatPostDate(post.updatedAt)}</time>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {getReadingTime(post)} min read
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
        {/* Article */}
        <article className="min-w-0">
          <div className="relative aspect-16/9 overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src={post.coverImage}
              alt={post.coverAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 760px"
              className="object-cover"
            />
          </div>

          <BlogContent blocks={post.content} />

          {post.faqs && post.faqs.length > 0 && (
            <section aria-labelledby="faq-heading" className="mt-12">
              <h2 id="faq-heading" className="text-2xl font-bold text-gray-900!">
                Frequently Asked Questions
              </h2>
              <div className="mt-5 divide-y divide-gray-200 rounded-xl border border-gray-200">
                {post.faqs.map((faq) => (
                  <details key={faq.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-gray-900!">
                      <h3 className="text-base">{faq.q}</h3>
                      <span className="mt-0.5 text-xl leading-none text-red-600! transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                    </summary>
                    <p className="mt-3 leading-relaxed text-gray-700!">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Inline enquiry */}
          <section aria-labelledby="post-enquiry-heading" className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
            <h2 id="post-enquiry-heading" className="text-2xl font-bold text-gray-900!">
              Get expert advice for your site
            </h2>
            <p className="mt-2 mb-6 text-gray-600!">
              Tell us what you need and our technician will call you back with recommendations and a
              free quote.
            </p>
            <EnquiryForm idPrefix="post-enquiry" submitLabel="Request Call Back" />
          </section>
        </article>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-36 lg:self-start">
          {headings.length > 0 && (
            <nav aria-label="Table of contents" className="rounded-2xl border border-gray-200 p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-900!">In this article</p>
              <ol className="mt-3 space-y-2 text-sm">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="text-gray-600! transition-colors hover:text-red-600!">{h.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="mt-6 rounded-2xl bg-gray-900 p-6 text-white">
            <p className="text-lg font-bold">Talk to a security expert</p>
            <p className="mt-1.5 text-sm text-gray-300!">
              Free site survey and quotation across Delhi NCR.
            </p>
            <a
              href={`tel:${SITE_PHONE}`}
              className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white! transition-colors hover:bg-red-700"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {phoneDisplay}
            </a>
            <a
              href={SITE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center rounded-lg border border-white/30 px-4 py-3 text-sm font-semibold text-white! transition-colors hover:bg-white/10"
            >
              Chat on WhatsApp
            </a>
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="border-t border-gray-200 bg-gray-50 py-14">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 id="related-heading" className="text-2xl font-bold text-gray-900!">Related articles</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} headingLevel="h3" />
              ))}
            </div>
            <p className="mt-10 text-center text-sm text-gray-600!">
              More from {SITE_NAME}:{" "}
              <Link href="/blogs" className="font-semibold text-red-600! hover:text-red-700!">all guides</Link>
              {" · "}
              <Link href="/products" className="font-semibold text-red-600! hover:text-red-700!">products</Link>
              {" · "}
              <Link href="/solutions" className="font-semibold text-red-600! hover:text-red-700!">solutions</Link>
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
