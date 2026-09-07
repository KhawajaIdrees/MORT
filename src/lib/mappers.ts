import type { Collection, CollectionRow, Product, ProductRow } from "@/types";

function normalizeImagePath(image: string): string {
  const knownExtensions: Record<string, string> = {
    "/images/tshirts/White-Polo-shirt": "/images/tshirts/White-Polo-shirt.jpg",
    "/images/tshirts/Black-Polo-shirt": "/images/tshirts/Black-Polo-shirt.jpg",
    "/images/tshirts/mort-tshirt-white": "/images/tshirts/mort-tshirt-white.jpg",
    "/images/tshirts/mort-tshirt-black-flat": "/images/tshirts/mort-tshirt-black-flat.png",
    "/images/tshirts/minimal-t-shirt": "/images/tshirts/minimal-t-shirt.png",
  };

  return knownExtensions[image] ?? image;
}

export function mapProduct(row: ProductRow): Product {
  const images = row.slug === "minimal-t-shirt"
    ? [
        "/images/tshirts/mort-tshirt-black-flat.png",
        "/images/tshirts/mort-tshirt-white.jpg",
      ]
    : (row.images ?? []).map(normalizeImagePath);

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    price: row.price,
    originalPrice: row.original_price ?? undefined,
    description: row.description,
    category: row.category,
    collection: row.collection,
    images,
    sizes: row.sizes ?? [],
    colors: (row.colors ?? []).map((color) =>
      typeof color === "string" ? { name: color, hex: color } : color
    ),
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
