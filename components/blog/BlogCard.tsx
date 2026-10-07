import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { type BlogPost, formatPostDate, getReadingTime } from "@/lib/blog";

type BlogCardProps = {
  post: BlogPost;
  /** Heading level for the card title, so cards nest correctly under page headings. */
  headingLevel?: "h2" | "h3";
  priority?: boolean;
};

export default function BlogCard({ post, headingLevel = "h2", priority = false }: BlogCardProps) {
  const Heading = headingLevel;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(17,24,39,0.10)]">
      <Link href={`/blogs/${post.slug}`} className="relative block aspect-16/9 overflow-hidden bg-gray-100" tabIndex={-1} aria-hidden="true">
        <Image
          src={post.coverImage}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          priority={priority}
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-red-600!">{post.category}</p>
        <Heading className="mt-2 text-lg font-bold leading-snug text-gray-900!">
          <Link href={`/blogs/${post.slug}`} className="transition-colors hover:text-red-600!">
            {post.title}
          </Link>
        </Heading>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600!">{post.description}</p>
        <div className="mt-auto flex items-center gap-3 pt-4 text-xs text-gray-500!">
          <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {getReadingTime(post)} min read
          </span>
        </div>
      </div>
    </article>
  );
}
