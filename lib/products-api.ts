import { apiGet } from "@/utils/api";

export interface ProductImage {
  url: string;
  alt?: string;
}

export interface ProductFeature {
  title: string;
  description?: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductDownloads {
  manual?: string;
  brochure?: string;
  datasheet?: string;
}

export interface BackendProduct {
  _id: string;
  productName?: string;
  name: string;
  modelName?: string;
  model: string;
  slug: string;
  url?: string;
  company: string;
  brand?: string;
  description: string;
  shortDescription?: string;
  category: string;
  subCategory?: string;
  subCategories?: string[];
  subCategory_1?: string;
  subCategory_2?: string;
  images?: ProductImage[];
  featuredImage?: string;
  galleryImages?: string[];
  highlights?: string[];
  features?: ProductFeature[];
  specs?: ProductSpec[];
  specifications?: Record<string, string[]>;
  applications?: string[];
  benefits?: string[];
  downloads?: ProductDownloads;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isActive?: boolean;
  tags?: string[];
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ProductsResponse {
  message: string;
  products: BackendProduct[];
  pagination?: {
    totalProducts: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  };
}

interface ProductResponse {
  message: string;
  product: BackendProduct;
}

export type ProductQueryParams = {
  limit?: number;
  page?: number;
  search?: string;
  name?: string;
  model?: string;
  company?: string | string[];
  category?: string | string[];
  subCategory?: string | string[];
};

export async function getProductsFromApi(params: ProductQueryParams = {}) {
  const query = new URLSearchParams();

  if (params.limit) query.set("limit", String(params.limit));
  if (params.page) query.set("page", String(params.page));
  if (params.search) query.set("search", params.search);
  if (params.name) query.set("name", params.name);
  if (params.model) query.set("model", params.model);

  const appendMultiValue = (key: string, value?: string | string[]) => {
    if (!value) return;

    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item));
      return;
    }

    query.set(key, value);
  };

  appendMultiValue("company", params?.company);
  appendMultiValue("category", params?.category);
  appendMultiValue("subCategory", params?.subCategory);

  const response = await apiGet<ProductsResponse>(
    `/fetch-products${query.toString() ? `?${query.toString()}` : ""}`,
  );

  return response.data.products ?? [];
}

export async function getProductsPageFromApi(params: ProductQueryParams = {}) {
  const query = new URLSearchParams();

  if (params.limit) query.set("limit", String(params.limit));
  if (params.page) query.set("page", String(params.page));
  if (params.search) query.set("search", params.search);
  if (params.name) query.set("name", params.name);
  if (params.model) query.set("model", params.model);

  const appendMultiValue = (key: string, value?: string | string[]) => {
    if (!value) return;

    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item));
      return;
    }

    query.set(key, value);
  };

  appendMultiValue("company", params?.company);
  appendMultiValue("category", params?.category);
  appendMultiValue("subCategory", params?.subCategory);

  const response = await apiGet<ProductsResponse>(
    `/fetch-products${query.toString() ? `?${query.toString()}` : ""}`,
  );

  return {
    products: response.data.products ?? [],
    pagination: response.data.pagination,
  };
}

export async function getProductBySlugFromApi(slug: string) {
  const response = await apiGet<ProductResponse>(
    `/fetch-products/slug/${encodeURIComponent(slug)}`,
  );

  return response.data.product;
}
