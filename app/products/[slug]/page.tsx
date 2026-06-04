import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import PremiumDesign from "@/components/sections/PremiumDesign";
import { getProductBySlugFromApi, getProductsFromApi, type BackendProduct } from "@/lib/products-api";
import ProductImageGallery from "@/components/ui/ProductImageGallery";
import ProductEnquiryDialog from "@/components/sections/ProductEnquiryDialog";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

const getProductImage = (product: BackendProduct) =>
  product.featuredImage || product.images?.[0]?.url || "https://picsum.photos/seed/product-detail-fallback/1200/900";

const getProductHref = (product: BackendProduct) => product.url || `/products/${product.slug}`;

const getGalleryImages = (product: BackendProduct) => {
  const imageUrls = [
    product.featuredImage,
    ...(product.images?.map((image) => image.url) || []),
    ...(product.galleryImages || []),
  ].filter((url): url is string => Boolean(url));

  return Array.from(new Set(imageUrls));
};

const formatSpecItems = (value: string) =>
  value
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlugFromApi(slug).catch(() => null);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be loaded.",
    };
  }

  return {
    title: `${product.name} ${product.model}`,
    description: product.shortDescription || product.description,
  };
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    getProductBySlugFromApi(slug).catch(() => null),
    getProductsFromApi({ limit: 15 }).catch(() => []),
  ]);

  if (!product) {
    notFound();
  }

  const similarProducts = allProducts
    .filter((item) => item._id !== product._id)
    .filter((item) => item.category === product.category || item.company === product.company)
    .slice(0, 4);

  const relatedProducts =
    similarProducts.length > 0
      ? similarProducts
      : allProducts.filter((item) => item._id !== product._id).slice(0, 4);

  const galleryImages = getGalleryImages(product);

  return (
    <>
      <section className="bg-white py-10 lg:py-14">
        <Container className="md:py-10">
          <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <span>/</span>
            <span className="text-red-400">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-6 items-start">
            <div className="rounded-xl bg-white/5 p-4 sm:p-6">
              <div className="flex flex-wrap gap-2">
                {product.isBestSeller ? (
                  <div className="inline-flex rounded-full bg-sky-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
                    Best Seller
                  </div>
                ) : null}
                {product.isFeatured ? (
                  <div className="inline-flex rounded-full bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    Featured
                  </div>
                ) : null}
              </div>
              <ProductImageGallery
                images={galleryImages.length ? galleryImages : [getProductImage(product)]}
                alt={product.images?.[0]?.alt || `${product.name} ${product.model}`}
              />
            </div>

            <div className="text-white">
              <p className="inline-flex items-center rounded-full border border-black/20 bg-transparent px-3 py-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-600">
                Product Highlights
              </p>
              <h1 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight">
                {product.name}
              </h1>
              <p className="mt-2 text-sm font-medium text-red-600">
                Model {product.model}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-red-500">
                {product.shortDescription || product.description}
              </p>

              <div className="mt-6 text-sm text-black">
                <span className="font-semibold text-black">Category:</span>{" "}
                <span className="text-red-400">{product.category}</span>
                <span className="mx-2 text-red-500">•</span>
                <span className="font-semibold text-black">Company:</span>{" "}
                <span className="text-red-400">{product.company}</span>
              </div>

              {product.subCategories?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.subCategories.map((subCategory) => (
                    <span key={subCategory} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-black">
                      {subCategory}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(product.highlights || []).map((highlight) => (
                  <div key={highlight} className="flex items-start gap-3 rounded-md bg-gray-100 p-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-600 text-xs font-bold">✓</span>
                    <span className="text-sm font-medium leading-tight text-black">{highlight}</span>
                  </div>
                ))}
              </div>

              {product.features?.length ? (
                <div className="mt-6 rounded-lg border border-white/10 bg-gray-100 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600">Features</p>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.features.map((feature) => (
                      <div key={feature.title} className="rounded-md border border-white/10 bg-transparent p-3">
                        <h3 className="text-sm font-semibold text-black">{feature.title}</h3>
                        {feature.description ? (
                          <p className="mt-2 text-sm leading-tight text-black">{feature.description}</p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <ProductEnquiryDialog
                  product={{
                    id: product._id,
                    name: product.name,
                    slug: product.slug,
                    model: product.model,
                    company: product.company,
                  }}
                />
                <Link
                  href="#specs"
                  className="inline-flex items-center justify-center rounded-full border border-red-600 bg-transparent px-4 py-2 text-sm font-semibold text-black! hover:bg-red-600 hover:text-white! transition-colors"
                >
                  View specs
                </Link>
                <Link
                  href="#browse-more"
                  className="inline-flex items-center justify-center rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white! hover:bg-red-800 transition-colors"
                >
                  Similar products
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="specs" className="bg-white pb-20">
        <Container>
          <div className="mb-8 max-w-2xl">
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-red-600 select-none">Product specifications</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-400 select-none">
              These specifications are accurate for the respective products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {(product.specs || []).map((spec, index) => (
              <div key={`${spec.label}-${index}`} className="rounded-3xl border border-white/10 bg-gray-200 p-6 shadow-xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-red-600 select-none">{spec.label}</p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-300 select-none">
                  {formatSpecItems(spec.value).map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                        •
                      </span>
                      <span className="text-[13px] md:text-[15px] leading-relaxed text-black">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {(product.applications || product.benefits)?.length ? (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
              {product.applications?.length ? (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">Applications</p>
                  <ul className="mt-4 space-y-3 text-sm text-gray-300">
                    {product.applications.map((application) => (
                      <li key={application} className="flex items-center gap-3">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-500/15 text-red-300 text-xs">✓</span>
                        <span>{application}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {product.benefits?.length ? (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">Benefits</p>
                  <ul className="mt-4 space-y-3 text-sm text-gray-300">
                    {product.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-3">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300 text-xs">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}
        </Container>
      </section>

      <section id="browse-more" className="bg-white pb-20">
        <Container>
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 select-none">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-600 select-none">Browse More</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white select-none">Similar products</h2>
            </div>
            <Link href="/products" className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors border-2 py-3 px-5 border-red-600 rounded-3xl hover:bg-red-200 select-none">
              Browse all products →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 select-none">
            {relatedProducts.map((item) => (
              <Link key={item._id} href={getProductHref(item)} className="group rounded-4xl overflow-hidden bg-gray-200 hover:shadow-2xl transition-all duration-300 select-none">
                <div className="relative aspect-4/3 p-6 bg-linear-to-b from-white to-slate-100 select-none">
                  <div className="relative h-full w-full group-hover:scale-[1.03] transition-transform duration-500 select-none">
                    <Image
                      src={item.featuredImage || item.images?.[0]?.url || "https://picsum.photos/seed/related-fallback/1200/900"}
                      alt={item.images?.[0]?.alt || item.name}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 25vw"
                      quality={60}
                      unoptimized={product.brand === 'PRAMA' || product.brand === 'Impact by Honeywell'}
                      className="object-contain drop-shadow-xl"
                    />  
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">Similar</p>
                  <h3 className="mt-2 text-lg font-bold text-gray-900">{item.name}</h3>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-red-600">Model {item.model}</p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 line-clamp-3">{item.shortDescription || item.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-red-600">
                    Learn more <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <PremiumDesign />
    </>
  );
}
