import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/blog";

/** Home-page strip linking to the newest guides (internal links help SEO). */
export default function LatestBlogs() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="latest-blogs-heading" className="w-full bg-gray-50 py-16 font-poppins">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-red-600!">Security Guides</p>
            <h2 id="latest-blogs-heading" className="mt-2 text-3xl font-bold text-gray-900!">
              Latest from our blog
            </h2>
            <p className="mt-2 max-w-2xl text-gray-600!">
              Practical advice on CCTV, access control and alarm systems from our installation team.
            </p>
          </div>
          <Link
            href="/blogs"
            className="group inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900! transition-colors hover:border-red-600 hover:text-red-600!"
          >
            View all articles
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} headingLevel="h3" />
          ))}
        </div>
      </div>
    </section>
  );
}
