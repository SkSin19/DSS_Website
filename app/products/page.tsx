import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { getProductsFromApi, type BackendProduct, type ProductQueryParams } from "@/lib/products-api";
import ProductFilters from "@/components/sections/ProductFilters";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse the available digital security product catalog.",
};

const getProductImage = (product: BackendProduct) =>
  product.featuredImage || product.images?.[0]?.url || "https://picsum.photos/seed/product-fallback/1200/900";

const getProductAlt = (product: BackendProduct) =>
  product.images?.[0]?.alt || `${product.name} image`;

type ProductsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const toArray = (value: string | string[] | undefined) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = (await searchParams) || {};
  const initialName = typeof resolvedSearchParams.name === "string" ? resolvedSearchParams.name : "";
  const initialModel = typeof resolvedSearchParams.model === "string" ? resolvedSearchParams.model : "";
  const selectedCompanies = toArray(resolvedSearchParams.company);
  const selectedCategories = toArray(resolvedSearchParams.category);
  const selectedSubCategories = toArray(resolvedSearchParams.subCategory || resolvedSearchParams.subCategories);

  const queryParams: ProductQueryParams = {
    limit: 100,
  };

  if (initialName) queryParams.name = initialName;
  if (initialModel) queryParams.model = initialModel;
  if (selectedCompanies.length) queryParams.company = selectedCompanies;
  if (selectedCategories.length) queryParams.category = selectedCategories;
  if (selectedSubCategories.length) queryParams.subCategory = selectedSubCategories;

  const [products, catalog] = await Promise.all([
    getProductsFromApi(queryParams).catch(() => []),
    getProductsFromApi({ limit: 100 }).catch(() => []),
  ]);

  const companies = Array.from(new Set(catalog.map((product) => product.company).filter(Boolean))).sort();
  const categories = Array.from(new Set(catalog.map((product) => product.category).filter(Boolean))).sort();
  const subCategories = Array.from(
    new Set(
      catalog.flatMap((product) => product.subCategories || []).filter(Boolean),
    ),
  ).sort();

  return (
    <section className="bg-gray-950 py-16 lg:py-20">
        <Container>
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[380px_minmax(0,1fr)]">
          <ProductFilters
            companies={companies}
            categories={categories}
            subCategories={subCategories}
            initialName={initialName}
            initialModel={initialModel}
            selectedCompanies={selectedCompanies}
            selectedCategories={selectedCategories}
            selectedSubCategories={selectedSubCategories}
          />

          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-gray-400">
                Showing <span className="font-semibold text-white">{products.length}</span> products
              </p>
              {(initialName || initialModel || selectedCompanies.length || selectedCategories.length || selectedSubCategories.length) ? (
                <Link href="/products" className="text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors">
                  Clear filters
                </Link>
              ) : null}
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2 xl:gap-5">
                {products.map((product) => (
                  <Link
                    key={product._id}
                    href={`/products/${product.slug}`}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-sky-400/40 hover:bg-white/[0.07]"
                  >
                    <div className="relative aspect-[4/3] bg-gradient-to-b from-white to-slate-100 p-3">
                      <div className="relative h-full w-full group-hover:scale-[1.03] transition-transform duration-500">
                        <Image
                          src={getProductImage(product)}
                          alt={getProductAlt(product)}
                          fill
                          className="object-contain drop-shadow-xl"
                        />
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="mb-2 flex flex-wrap gap-1.5">
                        <span className="inline-flex items-center rounded-full bg-sky-500/10 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-sky-300">
                          {product.company}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-gray-200">
                          {product.category}
                        </span>
                      </div>
                      <h2 className="text-lg font-bold leading-snug text-white">
                        {product.name}
                      </h2>
                      <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-sky-400">
                        Model {product.model}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-gray-400 line-clamp-2">
                        {product.shortDescription || product.description}
                      </p>

                      {product.subCategories?.length ? (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {product.subCategories.map((subCategory) => (
                            <span
                              key={subCategory}
                              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] text-gray-200"
                            >
                              {subCategory}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-sky-300">
                        Open details <span className="transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-gray-300">
                No products matched the current filters. Adjust the selections or clear them to browse the full catalog.
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
