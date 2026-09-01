-- MORT storefront schema
-- Run this in the Supabase SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  collection text not null,
  category text not null,
  price integer not null,
  original_price integer,
  description text not null default '',
  images jsonb not null default '[]'::jsonb,
  colors jsonb not null default '[]'::jsonb,
  sizes jsonb not null default '[]'::jsonb,
  details jsonb not null default '[]'::jsonb,
  care jsonb not null default '[]'::jsonb,
  stock integer not null default 0,
  total_stock integer not null default 100,
  featured boolean not null default false,
  is_new boolean not null default false,
  rating numeric(3,1) not null default 0,
  reviews_count integer not null default 0,
  release_date timestamp with time zone,
  created_at timestamp with time zone not null default now()
);

create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  number text not null,
  description text not null default '',
  release_date timestamp with time zone,
  cover_image text not null default '',
  slug text not null unique,
  tagline text,
  item_count integer not null default 0
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  email text not null,
  items jsonb not null default '[]'::jsonb,
  total integer not null,
  status text not null default 'pending',
  shipping_address jsonb,
  payment_intent_id text,
  created_at timestamp with time zone not null default now()
);

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamp with time zone not null default now()
);

alter table public.products enable row level security;
alter table public.collections enable row level security;
alter table public.orders enable row level security;
alter table public.waitlist enable row level security;

drop policy if exists "products_select_public" on public.products;
create policy "products_select_public"
  on public.products for select
  using (true);

drop policy if exists "collections_select_public" on public.collections;
create policy "collections_select_public"
  on public.collections for select
  using (true);

drop policy if exists "orders_select_own" on public.orders;
create policy "orders_select_own"
  on public.orders for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "orders_insert_own" on public.orders;
create policy "orders_insert_own"
  on public.orders for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "waitlist_insert_public" on public.waitlist;
create policy "waitlist_insert_public"
  on public.waitlist for insert
  with check (true);
