interface SkeletonProps {
  className?: string;
}

/** Base skeleton block with shimmer animation */
export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`skeleton-shimmer rounded-lg bg-slate-700/30 ${className}`}
      aria-hidden="true"
    />
  );
}

/** Skeleton for the hero section */
export function SkeletonHero() {
  return (
    <section className="w-full min-h-[600px] bg-slate-900 flex items-center" aria-hidden="true">
      <div className="container-main flex flex-col lg:flex-row items-center gap-12 py-20">
        <div className="flex-1 space-y-6">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-14 w-full max-w-md" />
          <Skeleton className="h-14 w-80" />
          <Skeleton className="h-5 w-full max-w-sm" />
          <Skeleton className="h-5 w-64" />
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-12 w-40 rounded-full" />
            <Skeleton className="h-12 w-40 rounded-full" />
          </div>
          <div className="flex gap-6 pt-4">
            <Skeleton className="h-5 w-44" />
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-36" />
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <Skeleton className="h-80 w-full max-w-lg rounded-2xl" />
        </div>
      </div>
    </section>
  );
}

/** Skeleton for a product category card */
export function SkeletonCategoryCard() {
  return (
    <div className="bg-slate-800 rounded-2xl p-8 space-y-4" aria-hidden="true">
      <Skeleton className="h-7 w-40" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-5 w-36 mt-4" />
      <Skeleton className="h-48 w-full rounded-xl mt-4" />
    </div>
  );
}

/** Skeleton for a brand card */
export function SkeletonBrandCard() {
  return (
    <div className="rounded-2xl overflow-hidden" aria-hidden="true">
      <Skeleton className="h-80 w-full" />
    </div>
  );
}

/** Skeleton for the full page */
export function SkeletonPage() {
  return (
    <div className="min-h-screen bg-slate-950" aria-label="Loading page content" role="status">
      <span className="sr-only">Loading...</span>
      {/* Navbar skeleton */}
      <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center px-6 gap-8">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-5 w-48" />
        <div className="flex-1" />
        <div className="hidden md:flex gap-6">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-9 w-48 rounded-full" />
      </div>

      {/* Hero skeleton */}
      <SkeletonHero />

      {/* Marquee skeleton */}
      <div className="h-20 bg-slate-800 flex items-center justify-center gap-12 px-8 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-28 flex-shrink-0" />
        ))}
      </div>

      {/* Categories skeleton */}
      <div className="bg-slate-950 section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCategoryCard key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
