import type { Collection, CollectionRow, Product, ProductRow } from "@/types";

export function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    price: row.price,
    originalPrice: row.original_price ?? undefined,
    description: row.description,
    category: row.category,
    collection: row.collection,
    images: row.images ?? [],
    sizes: row.sizes ?? [],
    colors: row.colors ?? [],
    details: row.details ?? [],
    care: row.care ?? [],
    isNew: row.is_new ?? false,
    isFeatured: row.featured,
    rating: row.rating ?? 0,
    reviewsCount: row.reviews_count ?? 0,
    stock: row.stock,
    totalStock: row.total_stock,
    releaseDate: row.release_date ?? undefined,
  };
}

export function mapCollection(row: CollectionRow): Collection {
  return {
    id: row.id,
    name: row.name,
    number: row.number,
    description: row.description,
    releaseDate: row.release_date ?? undefined,
    coverImage: row.cover_image,
    title: row.name,
    slug: row.slug,
    tagline: row.tagline ?? "",
    image: row.cover_image,
    itemCount: row.item_count ?? 0,
  };
}

export function padStock(value: number): string {
  return String(Math.max(0, value)).padStart(3, "0");
}
