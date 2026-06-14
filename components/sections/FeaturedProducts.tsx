import { getProductsFromApi, type BackendProduct } from "@/lib/products-api";
import FeaturedProductsGrid from "./FeaturedProductsGrid";

export default async function FeaturedProducts() {
  let products: BackendProduct[] = [];

  try {
    products = await getProductsFromApi({ isFeatured: true, limit: 12 });
  } catch {
    products = [];
  }

  return <FeaturedProductsGrid products={products} />;
}