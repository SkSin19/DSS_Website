"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ProductFiltersProps {
  companies: string[];
  categories: string[];
  subCategories: string[];
  initialName?: string;
  initialModel?: string;
  selectedCompanies: string[];
  selectedCategories: string[];
  selectedSubCategories: string[];
}

const railStyles =
  "mt-2 flex gap-1.5 overflow-x-auto scroll-smooth pb-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-2";

const chipBaseStyles =
  "snap-start whitespace-nowrap rounded-full border px-2.5 py-1 text-[12px] font-medium transition-all duration-200 sm:px-3.5 sm:py-1.5 sm:text-sm";

type FilterRailProps = {
  label: string;
  items: string[];
  name: "company" | "category" | "subCategory";
  selectedValues: string[];
  compact?: boolean;
};

function FilterRail({ label, items, name, selectedValues, compact }: FilterRailProps) {
  if (compact) {
    return (
      <div>
        <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-sky-400">
          {label}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {items.map((item) => (
            <label key={item} className="shrink-0">
              <input
                type="checkbox"
                name={name}
                value={item}
                defaultChecked={selectedValues.includes(item)}
                className="peer sr-only"
              />
              <span className="cursor-pointer whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-gray-300 transition-all peer-checked:border-sky-400 peer-checked:bg-sky-500 peer-checked:text-white">
                {item}
              </span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 px-3 py-3 sm:px-3.5 sm:py-3.5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-300 sm:text-[11px]">
          {label}
        </h3>
        <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 sm:text-[10px]">Swipe</span>
      </div>
      <div className={railStyles}>
        {items.map((item) => (
          <label key={item} className="shrink-0">
            <input
              type="checkbox"
              name={name}
              value={item}
              defaultChecked={selectedValues.includes(item)}
              className="peer sr-only"
            />
            <span
              className={`${chipBaseStyles} border-white/10 bg-white/5 text-gray-200 hover:border-sky-400/40 hover:bg-white/10 peer-checked:border-sky-400 peer-checked:bg-sky-500 peer-checked:text-white peer-checked:shadow-lg peer-checked:shadow-sky-500/20`}
            >
              {item}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

function parseCheckedValues(formData: FormData, key: string) {
  return formData.getAll(key).map((value) => String(value)).filter(Boolean);
}

const activeFilterCount = (
  selectedCompanies: string[],
  selectedCategories: string[],
  selectedSubCategories: string[],
  name: string,
  model: string,
) =>
  selectedCompanies.length +
  selectedCategories.length +
  selectedSubCategories.length +
  (name ? 1 : 0) +
  (model ? 1 : 0);

export default function ProductFilters({
  companies,
  categories,
  subCategories,
  initialName = "",
  initialModel = "",
  selectedCompanies,
  selectedCategories,
  selectedSubCategories,
}: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filterCount = activeFilterCount(
    selectedCompanies,
    selectedCategories,
    selectedSubCategories,
    initialName,
    initialModel,
  );

  const updateQuery = (formData: FormData, shouldClear = false) => {
    const params = new URLSearchParams(shouldClear ? "" : searchParams.toString());

    params.delete("page");
    params.delete("limit");
    params.delete("company");
    params.delete("category");
    params.delete("subCategory");
    params.delete("name");
    params.delete("model");

    if (shouldClear) {
      setDrawerOpen(false);
      router.push(pathname);
      return;
    }

    const name = String(formData.get("name") || "").trim();
    const model = String(formData.get("model") || "").trim();

    if (name) params.set("name", name);
    if (model) params.set("model", model);

    parseCheckedValues(formData, "company").forEach((v) => params.append("company", v));
    parseCheckedValues(formData, "category").forEach((v) => params.append("category", v));
    parseCheckedValues(formData, "subCategory").forEach((v) => params.append("subCategory", v));

    const query = params.toString();
    setDrawerOpen(false);
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <section className="border-b border-white/10 bg-gray-950 text-white">

      {/* ── MOBILE LAYOUT (hidden on sm+) ── */}
      <div className="sm:hidden px-3 py-2">
        <form id="product-filter-form-mobile" action={updateQuery}>
          {/* Top bar: search + filter toggle */}
          <div className="flex items-center gap-2">
            <label className="relative flex flex-1 items-center">
              <svg
                className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-gray-500"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                name="name"
                defaultValue={initialName}
                placeholder="Search products…"
                className="h-8 w-full rounded-full border border-white/10 bg-white/5 pl-8 pr-3 text-[12px] text-white placeholder:text-gray-500 outline-none transition-colors focus:border-sky-400/60"
              />
            </label>

            {/* Filters pill */}
            <button
              type="button"
              onClick={() => setDrawerOpen((o) => !o)}
              className="flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 text-[11px] font-semibold text-sky-300 transition-colors"
            >
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M4 6h16M7 12h10M10 18h4" />
              </svg>
              Filters
              {filterCount > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-[9px] font-bold text-white">
                  {filterCount}
                </span>
              )}
            </button>

            {/* Reset */}
            <button
              type="button"
              onClick={() => updateQuery(new FormData(), true)}
              aria-label="Reset filters"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-red-500/25 bg-red-600/10 text-red-400 transition-colors"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" />
              </svg>
            </button>
          </div>

          {/* Expandable drawer */}
          {drawerOpen && (
            <div className="mt-2 space-y-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
              {/* Model search */}
              <div>
                <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500">Model</p>
                <input
                  type="text"
                  name="model"
                  defaultValue={initialModel}
                  placeholder="Product model…"
                  className="h-8 w-full rounded-full border border-white/10 bg-white/5 px-3 text-[12px] text-white placeholder:text-gray-500 outline-none transition-colors focus:border-sky-400/60"
                />
              </div>

              {companies.length > 0 && (
                <FilterRail label="Company" items={companies} name="company" selectedValues={selectedCompanies} compact />
              )}
              {categories.length > 0 && (
                <FilterRail label="Category" items={categories} name="category" selectedValues={selectedCategories} compact />
              )}
              {subCategories.length > 0 && (
                <FilterRail label="Sub-category" items={subCategories} name="subCategory" selectedValues={selectedSubCategories} compact />
              )}

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  form="product-filter-form-mobile"
                  className="flex h-8 flex-1 items-center justify-center rounded-full bg-sky-500 text-[12px] font-semibold text-white transition-colors hover:bg-sky-400"
                >
                  Apply filters
                </button>
                <button
                  type="button"
                  onClick={() => updateQuery(new FormData(), true)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-red-500/25 bg-red-600/10 text-red-400"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* ── DESKTOP LAYOUT (hidden on mobile) — completely unchanged ── */}
      <div className="hidden sm:block">
        <div className="mx-auto w-full max-w-7xl px-4 py-3 lg:px-8">
          <div className="flex flex-col gap-2.5 rounded-3xl border border-white/10 bg-white/5 p-3 shadow-lg shadow-black/10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-sky-400 sm:text-[10px]">
                  Filter Products
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  form="product-filter-form"
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-sky-500 px-3 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-sky-400 sm:flex-none sm:py-1.5"
                >
                  Apply filters
                </button>
                <button
                  type="button"
                  onClick={() => updateQuery(new FormData(), true)}
                  aria-label="Reset filters"
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-white transition-colors hover:bg-red-500"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                    <path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" />
                  </svg>
                </button>
              </div>
            </div>

            <form id="product-filter-form" action={updateQuery} className="space-y-3">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
                <label className="block rounded-3xl border border-white/10 bg-white/5 px-3 py-2.5 sm:py-3">
                  <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.22em] text-gray-500 sm:text-[10px]">Name</span>
                  <input
                    type="text"
                    name="name"
                    defaultValue={initialName}
                    placeholder="Product Name"
                    className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none transition-colors focus:border-sky-400/60"
                  />
                </label>
                <label className="block rounded-3xl border border-white/10 bg-white/5 px-3 py-2.5 sm:py-3">
                  <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.22em] text-gray-500 sm:text-[10px]">Model</span>
                  <input
                    type="text"
                    name="model"
                    defaultValue={initialModel}
                    placeholder="Product Model"
                    className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none transition-colors focus:border-sky-400/60"
                  />
                </label>
              </div>

              <FilterRail label="Company" items={companies} name="company" selectedValues={selectedCompanies} />
              <FilterRail label="Category" items={categories} name="category" selectedValues={selectedCategories} />
              <FilterRail label="Sub-category" items={subCategories} name="subCategory" selectedValues={selectedSubCategories} />
            </form>
          </div>
        </div>
      </div>

    </section>
  );
}