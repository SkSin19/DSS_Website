"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, Plus, Search, Sparkles, X } from "lucide-react";
import { apiGet } from "@/utils/api";
import {
  getProductBySlugFromApi,
  getProductsPageFromApi,
  type BackendProduct,
} from "@/lib/products-api";
import { trackEvent } from "@/lib/analytics";
import { openChat } from "@/lib/chat-api";
import { whatsappUrl } from "@/lib/constants";

const MAX_PRODUCTS = 4;
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1643123182527-3bd30840e7ed?auto=format&fit=crop&w=600&q=60";

const imageOf = (p: BackendProduct) => p.featuredImage || p.images?.[0]?.url || FALLBACK_IMAGE;
const splitSpec = (value: string) => value.split("|").map((s) => s.trim()).filter(Boolean);
const normalise = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

/** Keeps ?products=slug-a,slug-b in the address bar so comparisons can be shared. */
const readSlugsFromUrl = () =>
  (new URLSearchParams(window.location.search).get("products") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, MAX_PRODUCTS);

const writeSlugsToUrl = (slugs: string[]) => {
  // Built by hand so the commas stay readable in shared links.
  const query = slugs.length ? `?products=${slugs.map(encodeURIComponent).join(",")}` : "";
  window.history.replaceState(null, "", `${window.location.pathname}${query}`);
};

type Row = { label: string; values: (string[] | null)[] };

export default function ProductCompare() {
  const [products, setProducts] = useState<BackendProduct[]>([]);
  const [loadingSlugs, setLoadingSlugs] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BackendProduct[]>([]);
  const [searching, setSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<BackendProduct[]>([]);
  const [onlyDifferences, setOnlyDifferences] = useState(false);
  const initialised = useRef(false);

  const addProduct = useCallback(async (slug: string) => {
    setLoadingSlugs((prev) => [...prev, slug]);
    try {
      const product = await getProductBySlugFromApi(slug);
      if (product) {
        setProducts((prev) =>
          prev.some((p) => p.slug === product.slug) || prev.length >= MAX_PRODUCTS ? prev : [...prev, product],
        );
      }
    } catch {
      /* product removed or API down: skip it */
    } finally {
      setLoadingSlugs((prev) => prev.filter((s) => s !== slug));
    }
  }, []);

  // Load products from the URL once, then keep the URL in sync.
  useEffect(() => {
    if (initialised.current) return;
    initialised.current = true;
    readSlugsFromUrl().forEach((slug) => void addProduct(slug));
  }, [addProduct]);

  useEffect(() => {
    if (!initialised.current || loadingSlugs.length) return;
    writeSlugsToUrl(products.map((p) => p.slug));
    if (products.length >= 2) trackEvent("compare_products", { count: products.length });
  }, [products, loadingSlugs.length]);

  // Debounced search (`searching` is switched on by the input's onChange).
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) return;
    const timer = setTimeout(async () => {
      try {
        const { products: found } = await getProductsPageFromApi({ search: q, limit: 8 });
        setResults(found);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Suggest similar products (same category as the first pick), or bestsellers to start.
  const firstCategory = products[0]?.category;
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const qs = firstCategory
          ? `category=${encodeURIComponent(firstCategory)}&limit=12`
          : "isBestSeller=true&limit=8";
        const { data } = await apiGet<{ products?: BackendProduct[] }>(`/fetch-products?${qs}`);
        if (!cancelled) setSuggestions(data.products ?? []);
      } catch {
        if (!cancelled) setSuggestions([]);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [firstCategory]);

  const selectedSlugs = useMemo(() => new Set(products.map((p) => p.slug)), [products]);
  const visibleSuggestions = suggestions.filter((p) => !selectedSlugs.has(p.slug)).slice(0, 6);
  const full = products.length + loadingSlugs.length >= MAX_PRODUCTS;

  const pick = (slug: string) => {
    if (full || selectedSlugs.has(slug)) return;
    setQuery("");
    setResults([]);
    void addProduct(slug);
  };

  const remove = (slug: string) => setProducts((prev) => prev.filter((p) => p.slug !== slug));

  // Build comparison rows: fixed facts first, then every spec label any product has.
  const rows = useMemo<Row[]>(() => {
    const fixed: Row[] = [
      { label: "Brand", values: products.map((p) => [p.company]) },
      { label: "Category", values: products.map((p) => [[p.category, ...(p.subCategories ?? [])].filter(Boolean).join(" / ")]) },
      { label: "Overview", values: products.map((p) => [p.shortDescription || p.description].filter(Boolean)) },
      { label: "Highlights", values: products.map((p) => (p.highlights?.length ? p.highlights : null)) },
    ];
    const labels: string[] = [];
    const seen = new Set<string>();
    for (const p of products) {
      for (const spec of p.specs ?? []) {
        const key = normalise(spec.label);
        if (!seen.has(key)) {
          seen.add(key);
          labels.push(spec.label);
        }
      }
    }
    const specRows: Row[] = labels.map((label) => ({
      label,
      values: products.map((p) => {
        const spec = p.specs?.find((s) => normalise(s.label) === normalise(label));
        return spec ? splitSpec(spec.value) : null;
      }),
    }));
    const tail: Row[] = [{ label: "Best for", values: products.map((p) => (p.applications?.length ? p.applications : null)) }];
    return [...fixed, ...specRows, ...tail];
  }, [products]);

  const isDifferent = (row: Row) =>
    new Set(row.values.map((v) => (v ? v.map(normalise).join("|") : "—"))).size > 1;
  const shownRows = onlyDifferences && products.length > 1 ? rows.filter(isDifferent) : rows;

  const comparisonText = products.map((p) => `${p.name} (${p.model})`).join(" vs ");

  return (
    <div className="space-y-8">
      {/* ── Picker ── */}
      <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5 sm:p-7">
        <label htmlFor="compare-search" className="text-sm font-semibold text-gray-900">
          Add products to compare <span className="font-normal text-gray-500">({products.length}/{MAX_PRODUCTS})</span>
        </label>
        <div className="relative mt-2">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <input
            id="compare-search"
            type="search"
            value={query}
            disabled={full}
            onChange={(e) => {
              const value = e.target.value.slice(0, 80);
              setQuery(value);
              setSearching(value.trim().length >= 2);
            }}
            placeholder={full ? "Remove a product to add another" : "Search by name, model or brand, e.g. 4MP dome, Hikvision, NVR"}
            autoComplete="off"
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pr-10 pl-10 text-sm text-gray-900 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100 disabled:bg-gray-100"
          />
          {searching && <Loader2 className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-gray-400" aria-hidden="true" />}

          {query.trim().length >= 2 && !searching && (
            <ul className="absolute z-20 mt-2 max-h-80 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white p-1 shadow-xl" role="listbox" aria-label="Search results">
              {results.length === 0 ? (
                <li className="px-3 py-3 text-sm text-gray-500">No products found. Try a model number or brand.</li>
              ) : (
                results.map((p) => (
                  <li key={p.slug}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={selectedSlugs.has(p.slug)}
                      disabled={selectedSlugs.has(p.slug)}
                      onClick={() => pick(p.slug)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-red-50 disabled:opacity-50"
                    >
                      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-gray-50">
                        <Image src={imageOf(p)} alt="" fill sizes="40px" className="object-contain" unoptimized />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-gray-900">{p.name}</span>
                        <span className="block truncate text-xs text-gray-500">{p.company} · {p.model}</span>
                      </span>
                      {selectedSlugs.has(p.slug) ? (
                        <span className="text-xs text-gray-400">Added</span>
                      ) : (
                        <Plus className="h-4 w-4 text-red-600" aria-hidden="true" />
                      )}
                    </button>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        {!full && visibleSuggestions.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              {firstCategory ? `More in ${firstCategory}` : "Popular products"}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {visibleSuggestions.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => pick(p.slug)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-left text-[13px] text-gray-700 transition-colors hover:border-red-300 hover:bg-red-50"
                >
                  <Plus className="h-3.5 w-3.5 text-red-600" aria-hidden="true" />
                  {p.name} <span className="hidden text-gray-400 sm:inline">{p.model}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Comparison ── */}
      {products.length === 0 && loadingSlugs.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
          Search above or tap a suggestion to start. Add 2 to {MAX_PRODUCTS} products to see them side by side.
        </div>
      ) : (
        <div>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={onlyDifferences}
                onChange={(e) => setOnlyDifferences(e.target.checked)}
                className="h-4 w-4 accent-red-600"
              />
              Show only differences
            </label>
            {products.length >= 2 && (
              <button
                type="button"
                onClick={() => openChat({ prompt: `Compare ${comparisonText}. Which one should I choose, and for what use?`, send: true })}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Ask AI which one to choose
              </button>
            )}
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full min-w-[640px] table-fixed border-collapse text-sm">
              <caption className="sr-only">Product comparison</caption>
              <colgroup>
                <col className="w-36 sm:w-44" />
                {products.map((p) => <col key={p.slug} />)}
                {loadingSlugs.map((s) => <col key={s} />)}
              </colgroup>
              <thead>
                <tr className="bg-white align-top">
                  <th scope="row" className="sticky left-0 z-10 bg-white p-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Product
                  </th>
                  {products.map((p) => (
                    <th key={p.slug} scope="col" className="border-l border-gray-100 p-3 text-left font-normal">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => remove(p.slug)}
                          aria-label={`Remove ${p.name}`}
                          className="absolute -top-1 -right-1 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-500 shadow ring-1 ring-gray-200 hover:text-red-600"
                        >
                          <X className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <div className="relative mx-auto aspect-square w-full max-w-36 bg-white">
                          <Image src={imageOf(p)} alt={`${p.name} ${p.model}`} fill sizes="160px" className="object-contain" unoptimized />
                        </div>
                        <Link href={`/products/${p.slug}`} className="mt-2 block font-semibold leading-snug text-gray-900! hover:text-red-600!">
                          {p.name}
                        </Link>
                        <p className="mt-0.5 text-xs font-medium text-red-600">Model {p.model}</p>
                      </div>
                    </th>
                  ))}
                  {loadingSlugs.map((s) => (
                    <th key={s} className="border-l border-gray-100 p-3">
                      <Loader2 className="mx-auto h-6 w-6 animate-spin text-gray-300" aria-label="Loading product" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shownRows.map((row, i) => (
                  <tr key={row.label} className={`align-top ${i % 2 ? "bg-white" : "bg-gray-50"}`}>
                    <th scope="row" className={`sticky left-0 z-10 p-3 text-left text-xs font-semibold text-gray-700 ${i % 2 ? "bg-white" : "bg-gray-50"}`}>
                      {row.label}
                    </th>
                    {row.values.map((value, j) => (
                      <td key={products[j].slug} className="border-l border-gray-100 p-3 text-gray-800">
                        {!value || value.length === 0 ? (
                          <span className="text-gray-400">—</span>
                        ) : value.length === 1 ? (
                          value[0]
                        ) : (
                          <ul className="list-disc space-y-0.5 pl-4">
                            {value.map((v) => <li key={v}>{v}</li>)}
                          </ul>
                        )}
                      </td>
                    ))}
                    {loadingSlugs.map((s) => <td key={s} className="border-l border-gray-100" />)}
                  </tr>
                ))}
                <tr className="bg-white align-top">
                  <th scope="row" className="sticky left-0 z-10 bg-white p-3 text-left text-xs font-semibold text-gray-700">
                    Get it installed
                  </th>
                  {products.map((p) => (
                    <td key={p.slug} className="border-l border-gray-100 p-3">
                      <div className="flex flex-col gap-2">
                        <Link
                          href={`/products/${p.slug}`}
                          className="inline-flex items-center justify-center rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white! hover:bg-red-700"
                        >
                          View &amp; get price
                        </Link>
                        <a
                          href={whatsappUrl(`Hi, I'd like the price and installation details for ${p.name} ${p.model}`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-lg bg-[#25D366] px-3 py-2 text-xs font-semibold text-white! hover:bg-[#1da851]"
                        >
                          WhatsApp Expert
                        </a>
                      </div>
                    </td>
                  ))}
                  {loadingSlugs.map((s) => <td key={s} className="border-l border-gray-100" />)}
                </tr>
              </tbody>
            </table>
          </div>
          {products.length === 1 && (
            <p className="mt-3 text-sm text-gray-500">Add at least one more product to compare.</p>
          )}
        </div>
      )}
    </div>
  );
}
