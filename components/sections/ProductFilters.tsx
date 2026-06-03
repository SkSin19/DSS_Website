/* eslint-disable react-hooks/static-components */
"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { THEME_COLORS } from "@/themes/colors";

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
        <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-red-600">
          {label}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {items.map((item) => (
            <label key={item} className="shrink-0">
              <input type="checkbox" name={name} value={item} defaultChecked={selectedValues.includes(item)} className="peer sr-only" />
              <span className="cursor-pointer whitespace-nowrap rounded-full border border-gray-300 bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-700 transition-all peer-checked:border-red-400 peer-checked:bg-red-50 peer-checked:text-red-700">
                {item}
              </span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  /* Desktop inline rail — wraps freely, height grows with content */
  return (
    <div className="flex min-w-0 flex-1 items-start gap-2">
      <span className="shrink-0 pt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-red-600/80">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <label key={item} className="shrink-0">
            <input type="checkbox" name={name} value={item} defaultChecked={selectedValues.includes(item)} className="peer sr-only" />
            <span className="cursor-pointer whitespace-nowrap rounded-full border border-gray-300 bg-gray-100 px-2.5 py-1 text-[11px] text-gray-700 transition-all hover:border-red-400/30 hover:text-gray-900 peer-checked:border-red-400/50 peer-checked:bg-red-50 peer-checked:text-red-700">
              {item}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

function parseCheckedValues(formData: FormData, key: string) {
  return formData.getAll(key).map((v) => String(v)).filter(Boolean);
}

function activeFilterCount(
  selectedCompanies: string[],
  selectedCategories: string[],
  selectedSubCategories: string[],
  name: string,
  model: string,
) {
  return (
    selectedCompanies.length +
    selectedCategories.length +
    selectedSubCategories.length +
    (name ? 1 : 0) +
    (model ? 1 : 0)
  );
}

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

  const ResetIcon = () => (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" />
    </svg>
  );

  return (
    <section className="select-none border-b border-gray-200 bg-white text-gray-900">

      {/* ── MOBILE (hidden sm+) ── */}
      <div className="sm:hidden px-3 py-2">
        <form id="product-filter-form-mobile" action={updateQuery}>
          <div className="flex items-center gap-2">
            <label className="relative flex flex-1 items-center">
              <svg className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text" name="name" defaultValue={initialName} placeholder="Search products…"
                className="h-8 w-full rounded-full border border-gray-300 bg-gray-100 pl-8 pr-3 text-[12px] text-gray-900 placeholder:text-gray-500 outline-none transition-colors focus:border-red-400/60"
              />
            </label>
            <button
              type="button" onClick={() => setDrawerOpen((o) => !o)}
              className="flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-gray-300 bg-gray-100 px-3 text-[11px] font-semibold text-gray-700 transition-colors"
            >
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M4 6h16M7 12h10M10 18h4" />
              </svg>
              Filters
              {filterCount > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white">
                  {filterCount}
                </span>
              )}
            </button>
            <button
              type="button" onClick={() => updateQuery(new FormData(), true)} aria-label="Reset filters"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-red-500/25 bg-red-600/10 text-red-400 transition-colors"
            >
              <ResetIcon />
            </button>
          </div>

          {drawerOpen && (
            <div className="mt-2 space-y-3 rounded-2xl border border-gray-200 bg-gray-50 p-3">
              <div>
                <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-600">Model</p>
                <input
                  type="text" name="model" defaultValue={initialModel} placeholder="Product model…"
                  className="h-8 w-full rounded-full border border-gray-300 bg-white px-3 text-[12px] text-gray-900 placeholder:text-gray-500 outline-none transition-colors focus:border-red-400/60"
                />
              </div>
              {companies.length > 0 && <FilterRail label="Company" items={companies} name="company" selectedValues={selectedCompanies} compact />}
              {categories.length > 0 && <FilterRail label="Category" items={categories} name="category" selectedValues={selectedCategories} compact />}
              {subCategories.length > 0 && <FilterRail label="Sub-category" items={subCategories} name="subCategory" selectedValues={selectedSubCategories} compact />}
              <div className="flex gap-2 pt-1">
                <button type="submit" form="product-filter-form-mobile" className="flex h-8 flex-1 items-center justify-center rounded-full bg-sky-500 text-[12px] font-semibold text-white transition-colors hover:bg-sky-400">
                  Apply filters
                </button>
                <button type="button" onClick={() => updateQuery(new FormData(), true)} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-red-500/25 bg-red-600/10 text-red-400">
                  <ResetIcon />
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* ── DESKTOP (hidden on mobile) ── */}
      <div className="hidden sm:block">
        <div className="mx-auto w-full max-w-7xl px-4 py-3 lg:px-8">
          <form id="product-filter-form" action={updateQuery}>
            <div className="flex flex-col rounded-2xl border border-gray-200 bg-gray-50">

              {/* Row 1: searches + company rail + actions */}
              <div className="flex items-start gap-3 px-4 py-3">
                <div className="flex shrink-0 flex-col gap-2 pt-0.5">
                  <label className="relative flex items-center">
                    <svg className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                      type="text" name="name" defaultValue={initialName} placeholder="Search by name…"
                      className="h-8 w-44 rounded-full border border-gray-300 bg-white pl-8 pr-3 text-[12px] text-gray-900 placeholder:text-gray-500 outline-none transition-colors focus:border-red-400/60 focus:bg-white"
                    />
                  </label>
                  <label className="relative flex items-center">
                    <svg className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                      type="text" name="model" defaultValue={initialModel} placeholder="Search by model…"
                      className="h-8 w-44 rounded-full border border-gray-300 bg-white pl-8 pr-3 text-[12px] text-gray-900 placeholder:text-gray-500 outline-none transition-colors focus:border-red-400/60 focus:bg-white"
                    />
                  </label>
                </div>

                <div className="mt-1.5 h-auto self-stretch w-px shrink-0 bg-gray-300" />

                {companies.length > 0 && (
                  <div className="flex-1 min-w-0">
                    <FilterRail label="Company" items={companies} name="company" selectedValues={selectedCompanies} />
                  </div>
                )}

                <div className="ml-auto flex shrink-0 flex-col gap-2 pt-0.5">
                  <button
                    type="submit"
                    className="h-8 rounded-full bg-sky-500 px-4 text-[12px] font-semibold text-white transition-colors hover:bg-sky-400"
                  >
                    Apply
                  </button>
                  <button
                    type="button"
                    onClick={() => updateQuery(new FormData(), true)}
                    aria-label="Reset filters"
                    className="flex h-8 w-8 items-center justify-center self-center rounded-full border border-red-500/20 bg-red-600/10 text-red-400 transition-colors hover:bg-red-600/20"
                  >
                    <ResetIcon />
                  </button>
                </div>
              </div>

              {/* Divider */}
              {(categories.length > 0 || subCategories.length > 0) && (
                <div className="mx-4 h-px bg-gray-200" />
              )}

              {/* Row 2: category + subcategory — each wraps freely */}
              {(categories.length > 0 || subCategories.length > 0) && (
                <div className="flex items-start gap-3 px-4 py-3">
                  {categories.length > 0 && (
                    <FilterRail label="Category" items={categories} name="category" selectedValues={selectedCategories} />
                  )}
                  {categories.length > 0 && subCategories.length > 0 && (
                    <div className="mt-1 h-auto self-stretch w-px shrink-0 bg-gray-300" />
                  )}
                  {subCategories.length > 0 && (
                    <FilterRail label="Type" items={subCategories} name="subCategory" selectedValues={selectedSubCategories} />
                  )}
                </div>
              )}

            </div>
          </form>
        </div>
      </div>

    </section>
  );
}