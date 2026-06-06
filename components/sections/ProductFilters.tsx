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

function parseCheckedValues(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .map((v) => String(v))
    .filter(Boolean);
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

type AccordionSectionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

function AccordionSection({ title, children, defaultOpen = true }: AccordionSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-200 py-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-[13px] font-bold text-gray-900">{title}</span>
        <svg
          className={`h-3.5 w-3.5 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && <div className="mt-2.5">{children}</div>}
    </div>
  );
}

type CheckboxListProps = {
  items: string[];
  name: "company" | "category" | "subCategory";
  selectedValues: string[];
};

function CheckboxList({ items, name, selectedValues }: CheckboxListProps) {
  const [showAll, setShowAll] = useState(false);
  const LIMIT = 5;
  const visible = showAll ? items : items.slice(0, LIMIT);

  return (
    <div className="space-y-2">
      {visible.map((item) => (
        <label key={item} className="flex cursor-pointer items-center gap-2 group">
          <input
            type="checkbox"
            name={name}
            value={item}
            defaultChecked={selectedValues.includes(item)}
            className="h-3.5 w-3.5 rounded-sm border-gray-400 accent-red-600 cursor-pointer"
          />
          <span className="text-[13px] text-gray-700 group-hover:text-gray-900 leading-snug">
            {item}
          </span>
        </label>
      ))}
      {items.length > LIMIT && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="mt-1 text-[12px] text-blue-600 hover:text-blue-800 hover:underline"
        >
          {showAll ? "See less" : `See more (${items.length - LIMIT} more)`}
        </button>
      )}
    </div>
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const filterCount = activeFilterCount(
    selectedCompanies,
    selectedCategories,
    selectedSubCategories,
    initialName,
    initialModel,
  );

  const updateQuery = (formData: FormData, shouldClear = false) => {
    const params = new URLSearchParams(
      shouldClear ? "" : searchParams.toString(),
    );
    params.delete("page");
    params.delete("limit");
    params.delete("company");
    params.delete("category");
    params.delete("subCategory");
    params.delete("name");
    params.delete("model");

    if (shouldClear) {
      setMobileOpen(false);
      router.push(pathname);
      return;
    }

    const name = String(formData.get("name") || "").trim();
    const model = String(formData.get("model") || "").trim();
    if (name) params.set("name", name);
    if (model) params.set("model", model);
    parseCheckedValues(formData, "company").forEach((v) =>
      params.append("company", v),
    );
    parseCheckedValues(formData, "category").forEach((v) =>
      params.append("category", v),
    );
    parseCheckedValues(formData, "subCategory").forEach((v) =>
      params.append("subCategory", v),
    );

    const query = params.toString();
    setMobileOpen(false);
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const sidebarContent = (formId: string) => (
    <div className="w-full">
      {/* Active filters summary */}
      {filterCount > 0 && (
        <div className="mb-3 flex items-center justify-between border-b border-gray-200 pb-3">
          <span className="text-[13px] font-bold text-gray-900">
            {filterCount} filter{filterCount > 1 ? "s" : ""} active
          </span>
          <button
            type="button"
            onClick={() => updateQuery(new FormData(), true)}
            className="text-[12px] text-blue-600 hover:text-blue-800 hover:underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Search by Name */}
      <div className="border-b border-gray-200 py-3">
        <p className="mb-2 text-[13px] font-bold text-gray-900">Search</p>
        <label className="relative flex items-center">
          <svg
            className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            name="name"
            form={formId}
            defaultValue={initialName}
            placeholder="Product name…"
            className="h-8 w-full rounded border border-gray-300 bg-white pl-8 pr-3 text-[12px] text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30"
          />
        </label>
      </div>

      {/* Search by Model */}
      <div className="border-b border-gray-200 py-3">
        <p className="mb-2 text-[13px] font-bold text-gray-900">Model</p>
        <label className="relative flex items-center">
          <svg
            className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            name="model"
            form={formId}
            defaultValue={initialModel}
            placeholder="Model number…"
            className="h-8 w-full rounded border border-gray-300 bg-white pl-8 pr-3 text-[12px] text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30"
          />
        </label>
      </div>

      {/* Companies */}
      {companies.length > 0 && (
        <AccordionSection title="Brand">
          <CheckboxList
            items={companies}
            name="company"
            selectedValues={selectedCompanies}
          />
        </AccordionSection>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <AccordionSection title="Category">
          <CheckboxList
            items={categories}
            name="category"
            selectedValues={selectedCategories}
          />
        </AccordionSection>
      )}

      {/* Sub-categories */}
      {subCategories.length > 0 && (
        <AccordionSection title="Type" defaultOpen={false}>
          <CheckboxList
            items={subCategories}
            name="subCategory"
            selectedValues={selectedSubCategories}
          />
        </AccordionSection>
      )}

      {/* Apply button */}
      <div className="pt-4">
        <button
          type="submit"
          form={formId}
          className="w-full rounded-3xl border border-red-700 bg-linear-to-b from-red-500 to-red-600 py-1.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:from-red-600 hover:to-red-700 active:from-red-700 active:to-red-700"
        >
          Apply filters
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Hidden form that holds all filter values — desktop sidebar submits via this */}
      <form
        id="product-filter-form-sidebar"
        action={(fd) => updateQuery(fd)}
        style={{ display: "none" }}
      />

      {/* ── MOBILE FILTER BUTTON BAR ── */}
      <div className="sticky top-0 z-20 border-b border-gray-200 bg-white sm:hidden">
        <div className="flex items-center gap-2 px-3 py-2">
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="flex items-center gap-1.5 rounded border border-gray-300 bg-white px-3 py-1.5 text-[12px] font-semibold text-gray-700 shadow-sm"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
            Filters
            {filterCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[9px] font-bold text-white">
                {filterCount}
              </span>
            )}
          </button>
          {filterCount > 0 && (
            <button
              type="button"
              onClick={() => updateQuery(new FormData(), true)}
              className="text-[12px] text-blue-600 hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* ── MOBILE DRAWER ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 sm:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[15px] font-bold text-gray-900">Filters</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="text-gray-500"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form
              id="product-filter-form-mobile"
              action={(fd) => updateQuery(fd)}
            >
              {sidebarContent("product-filter-form-mobile")}
            </form>
          </div>
        </div>
      )}

      {/* ── DESKTOP SIDEBAR (exported as a data attribute for the page to pick up) ── */}
      {/* This component renders nothing visible on desktop — the sidebar is rendered
          inside the page layout via the ProductSidebar export below */}
    </>
  );
}

/**
 * Standalone sidebar panel — render this inside the left column on desktop.
 * Pass the same props as ProductFilters.
 */
export function ProductSidebar({
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

  const filterCount = activeFilterCount(
    selectedCompanies,
    selectedCategories,
    selectedSubCategories,
    initialName,
    initialModel,
  );

  const updateQuery = (formData: FormData, shouldClear = false) => {
    const params = new URLSearchParams(
      shouldClear ? "" : searchParams.toString(),
    );
    params.delete("page");
    params.delete("limit");
    params.delete("company");
    params.delete("category");
    params.delete("subCategory");
    params.delete("name");
    params.delete("model");

    if (shouldClear) {
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
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <aside className="hidden sm:block w-56 shrink-0">
      <form id="product-filter-form-desktop" action={(fd) => updateQuery(fd)}>
        <div className="sticky top-4">
          <p className="mb-1 text-[16px] font-bold text-gray-900 border-b border-gray-300 pb-2">
            Filters
          </p>

          {filterCount > 0 && (
            <div className="mb-2 flex items-center justify-between py-2 border-b border-gray-200">
              <span className="text-[12px] text-gray-600">
                {filterCount} active
              </span>
              <button
                type="button"
                onClick={() => updateQuery(new FormData(), true)}
                className="text-[12px] text-blue-600 hover:text-blue-800 hover:underline"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Search */}
          <div className="border-b border-gray-200 py-3">
            <p className="mb-2 text-[13px] font-bold text-gray-900">Search</p>
            <label className="relative flex items-center">
              <svg className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                name="name"
                defaultValue={initialName}
                placeholder="Product name…"
                className="h-8 w-full rounded border border-gray-300 bg-white pl-8 pr-3 text-[12px] text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30"
              />
            </label>
          </div>

          {/* Model */}
          <div className="border-b border-gray-200 py-3">
            <p className="mb-2 text-[13px] font-bold text-gray-900">Model</p>
            <label className="relative flex items-center">
              <svg className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                name="model"
                defaultValue={initialModel}
                placeholder="Model number…"
                className="h-8 w-full rounded border border-gray-300 bg-white pl-8 pr-3 text-[12px] text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30"
              />
            </label>
          </div>

          {/* Companies */}
          {companies.length > 0 && (
            <AccordionSection title="Brand">
              <CheckboxList items={companies} name="company" selectedValues={selectedCompanies} />
            </AccordionSection>
          )}

          {/* Categories */}
          {categories.length > 0 && (
            <AccordionSection title="Category">
              <CheckboxList items={categories} name="category" selectedValues={selectedCategories} />
            </AccordionSection>
          )}

          {/* Sub-categories */}
          {subCategories.length > 0 && (
            <AccordionSection title="Type" defaultOpen={false}>
              <CheckboxList items={subCategories} name="subCategory" selectedValues={selectedSubCategories} />
            </AccordionSection>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full rounded-3xl border border-red-700 bg-linear-to-b from-red-500 to-red-600 py-1.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:from-red-600 hover:to-red-700 active:from-red-700 active:to-red-700"
            >
              Apply filters
            </button>
          </div>
        </div>
      </form>
    </aside>
  );
}