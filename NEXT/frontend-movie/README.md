# Frontend Movie

Catálogo de películas y series construido con **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS** y **Supabase** como backend.

## Requisitos

- Node.js 18+
- Cuenta de Supabase (opcional para datos reales)

## Instalación

```bash
npm install
```

## Variables de entorno

Copia `.env.example` a `.env.local` y completa los valores:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Base de datos (Supabase)

Ejecuta los scripts en el SQL Editor de Supabase:

1. `supabase/schema.sql` — crea las tablas `movies`, `series` y `favorites`.
2. `supabase/seed.sql` — inserta datos de ejemplo.

Si no se configura Supabase, la app usa datos de demostración (mock) para que la UI siga funcionando.

## Estructura de la base de datos

- `movies`: id, title, description, poster_url, backdrop_url, release_year, duration_minutes, rating, genre[], created_at
- `series`: id, title, description, poster_url, backdrop_url, release_year, seasons, episodes, rating, genre[], created_at
- `favorites`: id, user_id, movie_id, series_id, created_at

## Rutas

- `/` — Inicio
- `/movies` — Listado de películas (búsqueda y filtro por género)
- `/movies/[id]` — Detalle de película
- `/series` — Listado de series
- `/series/[id]` — Detalle de serie
- `/favorites` — Favoritos (localStorage)
- `/search` — Búsqueda global

## Scripts

```bash
npm run dev    # desarrollo
npm run build  # build de producción
npm run start  # servidor de producción
npm run lint   # lint
```
