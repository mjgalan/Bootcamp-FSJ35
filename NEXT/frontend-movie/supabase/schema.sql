-- ============================================================
-- Frontend Movie - Estructura de base de datos (Supabase)
-- Ejecutar en el SQL Editor de Supabase.
-- ============================================================

-- Extensiones
create extension if not exists "uuid-ossp";

-- Tabla: movies (películas)
create table if not exists public.movies (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  poster_url text,
  backdrop_url text,
  release_year integer,
  duration_minutes integer,
  rating numeric(3,1),
  genre text[] default '{}',
  created_at timestamptz not null default now()
);

-- Tabla: series
create table if not exists public.series (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  poster_url text,
  backdrop_url text,
  release_year integer,
  seasons integer,
  episodes integer,
  rating numeric(3,1),
  genre text[] default '{}',
  created_at timestamptz not null default now()
);

-- Tabla: favorites (favoritos por usuario)
create table if not exists public.favorites (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  movie_id uuid references public.movies(id) on delete cascade,
  series_id uuid references public.series(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint favorites_one_target check (
    (movie_id is not null and series_id is null) or
    (movie_id is null and series_id is not null)
  )
);

-- Índices
create index if not exists idx_movies_title on public.movies (title);
create index if not exists idx_series_title on public.series (title);
create index if not exists idx_favorites_user on public.favorites (user_id);

-- Row Level Security
alter table public.movies enable row level security;
alter table public.series enable row level security;
alter table public.favorites enable row level security;

-- Políticas: lectura pública para movies y series
create policy "Movies are viewable by everyone"
  on public.movies for select
  using (true);

create policy "Series are viewable by everyone"
  on public.series for select
  using (true);

-- Favoritos: cada usuario gestiona los suyos
create policy "Users can view their favorites"
  on public.favorites for select
  using (auth.uid() = user_id);

create policy "Users can insert their favorites"
  on public.favorites for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their favorites"
  on public.favorites for delete
  using (auth.uid() = user_id);
