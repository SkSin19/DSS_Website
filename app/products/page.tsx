import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import {
  getProductsFromApi,
  getProductsPageFromApi,
  type BackendProduct,
  type ProductQueryParams,
} from "@/lib/products-api";
import ProductFilters from "@/components/sections/ProductFilters";
import { THEME_COLORS } from "@/themes/colors";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse the available digital security product catalog.",
};

const getProductImage = (product: BackendProduct) =>
  product.featuredImage || product.images?.[0]?.url || "https://picsum.photos/seed/product-fallback/1200/900";

const getProductAlt = (product: BackendProduct) =>
  product.images?.[0]?.alt || `${product.name} image`;

const getProductHref = (product: BackendProduct) => product.url || `/products/${product.slug}`;

const getProductImagePriority = (index: number) => index < 4;
const FULL_CATALOG_LIMIT = 1000;
const PRODUCTS_PER_PAGE = 15;

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
  const requestedPage = Math.max(Number(resolvedSearchParams.page) || 1, 1);

  const queryParams: ProductQueryParams = {
    limit: PRODUCTS_PER_PAGE,
    page: requestedPage,
  };

  if (initialName) queryParams.name = initialName;
  if (initialModel) queryParams.model = initialModel;
  if (selectedCompanies.length) queryParams.company = selectedCompanies;
  if (selectedCategories.length) queryParams.category = selectedCategories;
  if (selectedSubCategories.length) queryParams.subCategory = selectedSubCategories;

  const [pageResponse, catalog] = await Promise.all([
    getProductsPageFromApi(queryParams).catch(() => ({ products: [], pagination: undefined })),
    getProductsFromApi({ limit: FULL_CATALOG_LIMIT }).catch(() => []),
  ]);

  let products = pageResponse.products;
  let pagination = pageResponse.pagination;

  if (pagination?.totalPages && requestedPage > pagination.totalPages) {
    const fallbackResponse = await getProductsPageFromApi({ ...queryParams, page: pagination.totalPages }).catch(() => ({
      products: [],
      pagination,
    }));

    products = fallbackResponse.products;
    pagination = fallbackResponse.pagination;
  }

  const companies = Array.from(new Set(catalog.map((product) => product.company).filter(Boolean))).sort();
  const categories = Array.from(new Set(catalog.map((product) => product.category).filter(Boolean))).sort();
  const subCategories = Array.from(
    new Set(
      catalog.flatMap((product) => product.subCategories || []).filter(Boolean),
    ),
  ).sort();

  return (
    <section className="bg-white py-0 lg:py-0">
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

      <Container>
        <div className="py-6 sm:py-8 lg:py-10">
          <div className="mb-4 flex flex-col gap-2 sm:mb-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-red-600">{products.length}</span> products
            </p>
            {(initialName || initialModel || selectedCompanies.length || selectedCategories.length || selectedSubCategories.length) ? (
              <Link href="/products" className="text-sm font-semibold text-red-600 transition-colors hover:text-red-700">
                Clear filters
              </Link>
            ) : null}
          </div>

          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product, index) => (
                  <Link
                    key={product._id}
                    href={getProductHref(product)}
                    className="group overflow-hidden rounded-3xl border border-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-300 hover:bg-gray-100"
                    style={{ backgroundColor: THEME_COLORS.shadowGrey50 }}
                  >
                    {/* Mobile: horizontal layout — image left, details right */}
                    <div className="flex sm:hidden items-stretch min-h-24">
                      <div className="relative w-28 shrink-0 overflow-hidden p-2 ring-1 ring-gray-200" style={{ backgroundColor: THEME_COLORS.shadowGrey100 }}>
                        <Image
                          src={getProductImage(product)}
                          alt={getProductAlt(product)}
                          fill
                          sizes="112px"
                          quality={58}
                          unoptimized={product.brand === 'PRAMA' || product.brand === 'Impact by Honeywell'}
                          priority={getProductImagePriority(index)}
                          className="object-contain drop-shadow-lg"
                        />
                      </div>
                      <div className="flex flex-col justify-center p-3">
                        <div className="mb-1.5 flex flex-wrap gap-1">
                          <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-red-700">
                            {product.company}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-gray-700">
                            {product.category}
                          </span>
                        </div>
                        <h2 className="text-[13px] font-semibold leading-snug text-gray-900">
                          {product.name}
                        </h2>
                        <p className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.18em] text-red-600">
                          Model {product.model}
                        </p>
                        <p className="mt-1.5 text-[11px] leading-relaxed text-gray-600 line-clamp-2">
                          {product.shortDescription || product.description}
                        </p>
                        <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-red-600">
                          Open details <span className="transition-transform group-hover:translate-x-1">→</span>
                        </span>
                      </div>
                    </div>

                    {/* Desktop: vertical card */}
                    <div className="hidden sm:block">
                      <div className="relative aspect-4/3 overflow-hidden p-2 sm:p-2.5 ring-1 ring-gray-200" style={{ backgroundColor: THEME_COLORS.shadowGrey100 }}>
                        <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-[1.02]">
                          <Image
                            src={getProductImage(product)}
                            alt={getProductAlt(product)}
                            fill
                            sizes="(max-width: 1279px) 50vw, 33vw"
                            quality={58}
                            priority={getProductImagePriority(index)}
                            className="object-contain drop-shadow-lg"
                          />
                        </div>
                      </div>
                      <div className="p-3 sm:p-3.5">
                        <div className="mb-2 flex flex-wrap gap-1.5">
                          <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-red-700">
                            {product.company}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-gray-700">
                            {product.category}
                          </span>
                        </div>
                        <h2 className="text-[14px] font-semibold leading-snug text-gray-900 sm:text-[15px]">
                          {product.name}
                        </h2>
                        <p className="mt-1 text-[8px] font-medium uppercase tracking-[0.18em] text-red-600 sm:text-[9px]">
                          Model {product.model}
                        </p>
                        <p className="mt-2 text-[11px] leading-relaxed text-gray-600 line-clamp-2 sm:text-[12px]">
                          {product.shortDescription || product.description}
                        </p>
                        <span className="mt-3 inline-flex items-center gap-2 text-[11px] font-semibold text-red-600">
                          Open details <span className="transition-transform group-hover:translate-x-1">→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {pagination?.totalPages && pagination.totalPages > 1 ? (
                <div className="mt-7 flex flex-wrap justify-center gap-1.5 sm:gap-2">
                  {Array.from({ length: pagination.totalPages }, (_, index) => {
                    const pageNumber = index + 1;
                    const isActive = pageNumber === (pagination.currentPage || requestedPage);
                    const query = new URLSearchParams();

                    if (initialName) query.set("name", initialName);
                    if (initialModel) query.set("model", initialModel);
                    selectedCompanies.forEach((company) => query.append("company", company));
                    selectedCategories.forEach((category) => query.append("category", category));
                    selectedSubCategories.forEach((subCategory) => query.append("subCategory", subCategory));
                    query.set("page", String(pageNumber));

                    return (
                      <Link
                        key={pageNumber}
                        href={`/products?${query.toString()}`}
                        aria-label={`Page ${pageNumber}`}
                        style={{ color: 'black' }}
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-sm border text-[11px] font-semibold transition-colors sm:h-8 sm:w-8 sm:text-xs ${isActive ? "border-red-600 bg-red-600 text-white" : "border-gray-300 bg-gray-100 text-gray-700 hover:border-red-300 hover:bg-gray-200"}`}
                      >
                        {pageNumber}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </>
          ) : (
            <div className="rounded-4xl border border-gray-200 p-8 text-gray-600" style={{ backgroundColor: THEME_COLORS.shadowGrey50 }}>
              No products matched the current filters. Adjust the selections or clear them to browse the full catalog.
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}