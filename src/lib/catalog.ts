import { supabaseAdmin } from "@/lib/supabase/server";
import { PRODUCTS } from "@/data/products";
import { mapCollection, mapProduct } from "@/lib/mappers";
import type { Collection, CollectionRow, Product, ProductRow } from "@/types";

const HIDDEN_PRODUCT_SLUGS = new Set([
  "essential-hoodie",
  "mort-001-origin-zip-hoodie",
  "mort-001-origin-hoodie",
  "premium-white-polo-shirt",
]);

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  const databaseProducts = ((data ?? []) as ProductRow[])
    .map(mapProduct)
    .filter((product) => !HIDDEN_PRODUCT_SLUGS.has(product.slug));
  const databaseSlugs = new Set(databaseProducts.map((product) => product.slug));
  return [
    ...databaseProducts,
    ...PRODUCTS.filter(
      (product) =>
        !HIDDEN_PRODUCT_SLUGS.has(product.slug) && !databaseSlugs.has(product.slug)
    ),
  ];
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  if (HIDDEN_PRODUCT_SLUGS.has(slug)) return null;

  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data ? mapProduct(data as ProductRow) : PRODUCTS.find((product) => product.slug === slug) ?? null;
}

export async function fetchCollections(): Promise<Collection[]> {
  const { data, error } = await supabaseAdmin
    .from("collections")
    .select("*")
    .order("number", { ascending: true });

  if (error) throw error;
  return ((data ?? []) as CollectionRow[]).map(mapCollection);
}
