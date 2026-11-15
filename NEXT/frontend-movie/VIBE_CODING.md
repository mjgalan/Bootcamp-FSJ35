# VIBE CODING — frontend-movie

Documento que registra el proceso de creación del proyecto **frontend-movie** mediante asistencia de IA (vibe coding), incluyendo los prompts principales, las decisiones técnicas tomadas y los desafíos encontrados con su resolución.

## 1. Descripción del proyecto

- **Nombre**: `frontend-movie`
- **Temática**: catálogo de películas y series.
- **Stack**: Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4, Supabase (backend).
- **Rutas**: `/`, `/movies`, `/movies/[id]`, `/series`, `/series/[id]`, `/favorites`, `/search`.
- **Repositorios**:
  - `mjgalan/Bootcamp-FSJ35` → `NEXT/frontend-movie/`
  - `mjgalan/bootcamp-fsj35-frontend-movie` (repositorio dedicado)

## 2. Prompts principales utilizados

1. **Creación del proyecto**
   > "Crear un proyecto en Next con nombre frontend-movie tematica películas/series, utilizar Next.js 16 o superior con App Router, utilizar TypeScript, estilos utilizar Tailwind CSS, mínimo 4 páginas o rutas distintas utilizando App Router, como backend usar Supabase con el detalle de estructuras de base de datos, uso combinado de Server Components y Client Components, manejo de estados con hooks de React: useState, useEffect, diseño responsive adaptable a dispositivos móviles y escritorio, manejo básico de: Estados de carga (loading UI), Errores de ejecución (error UI)"

2. **Archivo de reglas (system prompt)**
   > "Generemos un archivo de reglas, que sea nuestro systempront" → se creó `AGENTS.md`.

3. **Publicación en GitHub**
   > "Agregar en github https://github.com/mjgalan/Bootcamp-FSJ35/tree/main/NEXT el proyecto creado"

4. **Publicación en Vercel**
   > "Publicar en Vercel el proyecto frontend-movie"

5. **Corrección de visibilidad del texto**
   > "En la ficha del detalle de la pelicula o serie, el color de letra debe ser color negro porque no se visualiza."

6. **Actualización de rama dedicada**
   > "Actualizar con los últimos cambios del color de letra la rama https://github.com/mjgalan/bootcamp-fsj35-frontend-movie.git"

7. **Documentación del proceso**
   > "Agregar un archivo VIBE_CODING.md con las interacciones en este chat para crear proyecto frontend-movie, prompts principales utilizados, decisiones técnicas tomadas y desafíos identificados y resolución"

## 3. Decisiones técnicas tomadas

- **App Router de Next.js 16** con Server Components por defecto y `"use client"` solo donde se necesitan hooks/eventos.
- **TypeScript estricto** con tipos centralizados en `src/lib/types.ts` (`Movie`, `Series`, `Favorite`).
- **Tailwind CSS 4** con la regla de Turbopack para CSS y diseño responsive (mobile-first).
- **Supabase** como backend:
  - Cliente browser: `src/lib/supabase/client.ts`
  - Cliente server: `src/lib/supabase/server.ts`
  - Estructura de BD documentada en `supabase/schema.sql` (tablas `movies`, `series`, `favorites` con RLS).
  - Seed de ejemplo en `supabase/seed.sql`.
- **Fallback a datos mock** (`src/lib/mock-data.ts`) cuando Supabase no está disponible o no devuelve datos, para que la UI funcione en demo.
- **Hooks**: `useState`/`useEffect` en páginas cliente (listados, búsqueda, favoritos) con cleanup para evitar race conditions.
- **Loading/Error UI**: `loading.tsx` y `error.tsx` en root y en segmentos de películas/series; `not-found.tsx` y `global-error.tsx`.
- **Favoritos** persistidos en `localStorage` bajo la clave `"favorites"`.
- **Imágenes** con `next/image` y `remotePatterns` (picsum.photos, image.tmdb.org).
- **Alias de imports** `@/*` → `src/*`.

## 4. Desafíos identificados y resolución

### 4.1 Supabase no alcanzable desde el entorno de desarrollo
- **Problema**: DNS no resolvía `pupozoplotgkuqvfykrg.supabase.co`; las consultas colgaban ~10–15 s.
- **Resolución**: se implementó fallback a datos mock en `src/lib/data.ts` y en las páginas cliente; se intentó `abortSignal` (no soportado por Postgrest) y se descartó; se aceptó el timeout natural.

### 4.2 Estado inicial desde `localStorage` (regla `react-hooks/set-state-in-effect`)
- **Problema**: ESLint (React 19) marcaba `setState` síncrono dentro de `useEffect`.
- **Resolución**: se deshabilitó la regla específica en `eslint.config.mjs` para los casos de carga desde `localStorage`.

### 4.3 Import no usado (`Image` en home)
- **Problema**: warning de `@typescript-eslint/no-unused-vars`.
- **Resolución**: se eliminó el import de `Image` de `src/app/page.tsx`.

### 4.4 Texto no visible en la ficha de detalle
- **Problema**: texto claro sobre fondo oscuro/imagen no se leía bien.
- **Resolución**: se cambió la ficha de detalle a tarjeta blanca (`bg-white`) con texto negro (`text-black`/`text-zinc-700`), y se ajustó el botón de favoritos.

### 4.5 Publicación en GitHub
- **Problema**: el proyecto local era un repo independiente sin remote.
- **Resolución**: se clonó `Bootcamp-FSJ35`, se copió `frontend-movie` (excluyendo `node_modules`, `.next`, `.git`) con `robocopy`, se hizo commit y push a `main`. Se repitió el proceso para el repositorio dedicado `bootcamp-fsj35-frontend-movie`.

### 4.6 Publicación en Vercel (CLI)
- **Problema 1**: EPERM al crear symlinks en la caché del builder de Vercel (Windows sin Modo desarrollador).
- **Problema 2**: tras elevar permisos, error `ENOENT ... _global-error.segments/__PAGE__.segment.rsc.func` (incompatibilidad del builder con Next.js 16).
- **Resolución**: se eliminó `global-error.tsx` (el `error.tsx` raíz cubre el manejo de errores); se documentó el deploy vía dashboard de Vercel (importar desde GitHub con Root Directory `NEXT/frontend-movie`).

### 4.7 PowerShell y rutas con corchetes `[id]`
- **Problema**: `Copy-Item` interpretaba `[id]` como wildcard y no copiaba archivos.
- **Resolución**: uso de `-LiteralPath` en los comandos de copia.

### 4.8 Lint escaneando `.vercel/output`
- **Problema**: tras el intento de deploy, ESLint reportaba miles de errores en archivos generados.
- **Resolución**: se añadió `.vercel/**` a `globalIgnores` en `eslint.config.mjs`.

## 5. Estructura final del proyecto

```
frontend-movie/
├── src/
│   ├── app/ (rutas, loading.tsx, error.tsx, not-found.tsx)
│   ├── components/
│   └── lib/ (supabase, data, mock-data, types)
├── supabase/ (schema.sql, seed.sql)
├── AGENTS.md
├── VIBE_CODING.md
└── README.md
```

## 6. Comandos de verificación

```bash
npm run build   # debe pasar sin errores
npm run lint    # debe pasar sin errores
npm run dev     # servidor en http://localhost:3000
```
