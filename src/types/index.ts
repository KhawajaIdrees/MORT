export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  collection: string;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  details: string[];
  care: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviewsCount: number;
  stock: number;
  totalStock: number;
  releaseDate?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: string;
  image: string;
}

export interface Collection {
  id: string;
  name: string;
  number: string;
  description: string;
  releaseDate?: string;
  coverImage: string;
  title: string;
  slug: string;
  tagline: string;
  image: string;
  itemCount: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  selectedSize: string;
  selectedColor?: ProductColor;
  image?: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  phone?: string;
  address: string;
  apartment?: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface Order {
  id: string;
  user_id: string | null;
  email: string;
  items: OrderItem[];
  total: number;
  status: string;
  shipping_address: ShippingAddress | null;
  payment_intent_id: string | null;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  fullName?: string;
}

export interface ProductRow {
  id: string;
  name: string;
  slug: string;
  collection: string;
  category: string;
  price: number;
  original_price: number | null;
  description: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[] | null;
  details: string[] | null;
  care: string[] | null;
  stock: number;
  total_stock: number;
  featured: boolean;
  is_new: boolean | null;
  rating: number | null;
  reviews_count: number | null;
  release_date: string | null;
  created_at: string;
}

export interface CollectionRow {
  id: string;
  name: string;
  number: string;
  description: string;
  release_date: string | null;
  cover_image: string;
  slug: string;
  tagline: string | null;
  item_count: number | null;
}
