"use client";

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

const chipStyles =
  "flex items-center gap-2 rounded-lg px-2 py-1 text-left transition-colors hover:bg-white/[0.04]";

function parseCheckedValues(formData: FormData, key: string) {
  return formData.getAll(key).map((value) => String(value)).filter(Boolean);
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
      router.push(pathname);
      return;
    }

    const name = String(formData.get("name") || "").trim();
    const model = String(formData.get("model") || "").trim();

    if (name) params.set("name", name);
    if (model) params.set("model", model);

    parseCheckedValues(formData, "company").forEach((value) => params.append("company", value));
    parseCheckedValues(formData, "category").forEach((value) => params.append("category", value));
    parseCheckedValues(formData, "subCategory").forEach((value) => params.append("subCategory", value));

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <aside className="lg:sticky lg:top-6 text-white">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">Filter Products</p>
        <h2 className="mt-2 text-xl font-bold">Find exactly what you need</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-400 max-w-sm">
          Filter by name, model, company, category and sub-category.
        </p>
      </div>

      <form action={updateQuery} className="mt-5 space-y-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
              Name
            </span>
            <input
              type="text"
              name="name"
              defaultValue={initialName}
              placeholder="Product Name"
              className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none transition-colors focus:border-sky-400/60"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.22em] text-gray-500">
              Model
            </span>
            <input
              type="text"
              name="model"
              defaultValue={initialModel}
              placeholder="Product Model"
              className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none transition-colors focus:border-sky-400/60"
            />
          </label>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">Company</h3>
          </div>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {companies.map((company) => (
              <label key={company} className={chipStyles}>
                <input
                  type="checkbox"
                  name="company"
                  value={company}
                  defaultChecked={selectedCompanies.includes(company)}
                  className="peer sr-only"
                />
                <span className="flex h-4.5 w-4.5 items-center justify-center rounded border border-white/20 bg-transparent text-transparent text-[10px] transition-colors peer-checked:border-sky-400 peer-checked:bg-sky-400 peer-checked:text-black">
                  ✓
                </span>
                <span className="text-xs font-medium text-gray-200">{company}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">Category</h3>
          </div>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {categories.map((category) => (
              <label key={category} className={chipStyles}>
                <input
                  type="checkbox"
                  name="category"
                  value={category}
                  defaultChecked={selectedCategories.includes(category)}
                  className="peer sr-only"
                />
                <span className="flex h-4.5 w-4.5 items-center justify-center rounded border border-white/20 bg-transparent text-transparent text-[10px] transition-colors peer-checked:border-sky-400 peer-checked:bg-sky-400 peer-checked:text-black">
                  ✓
                </span>
                <span className="text-xs font-medium text-gray-200">{category}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">Sub-category</h3>
          </div>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {subCategories.map((subCategory) => (
              <label key={subCategory} className={chipStyles}>
                <input
                  type="checkbox"
                  name="subCategory"
                  value={subCategory}
                  defaultChecked={selectedSubCategories.includes(subCategory)}
                  className="peer sr-only"
                />
                <span className="flex h-4.5 w-4.5 items-center justify-center rounded border border-white/20 bg-transparent text-transparent text-[10px] transition-colors peer-checked:border-sky-400 peer-checked:bg-sky-400 peer-checked:text-black">
                  ✓
                </span>
                <span className="text-xs font-medium text-gray-200">{subCategory}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-1 sm:flex-row">
          <button
            type="submit"
            className="inline-flex flex-1 items-center justify-center rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-400"
          >
            Apply filters
          </button>
          <button
            type="button"
            onClick={() => updateQuery(new FormData(), true)}
            aria-label="Reset filters"
            className="inline-flex flex-1 items-center justify-center rounded-full bg-red-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500 sm:flex-none"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
            >
              <path d="M3 12a9 9 0 1 0 3-6.7" />
              <path d="M3 4v5h5" />
            </svg>
          </button>
        </div>
      </form>
    </aside>
  );
}
