<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Frontend Movie

Este archivo es el **system prompt / reglas del proyecto** para cualquier agente de IA que trabaje en este repositorio. Léelo antes de modificar código.

## 1. Contexto del proyecto

- Proyecto: **frontend-movie** — catálogo de películas y series.
- Stack: **Next.js 16 (App Router)**, **React 19**, **TypeScript 5**, **Tailwind CSS 4**, **Supabase** (backend).
- Idioma de la UI: **español**. Código y comentarios en español o inglés según convención existente (preferir español en UI, inglés en identificadores técnicos).
- Plataforma de desarrollo: Windows (PowerShell). No usar `&&`, `||`, `;` en comandos shell encadenados; usar el parámetro `workdir`.

## 2. Reglas generales de código

- **TypeScript estricto**: no usar `any` salvo justificación. Tipar props, estados y respuestas de Supabase.
- **App Router**: usar Server Components por defecto; añadir `"use client"` solo cuando se necesiten hooks, eventos o APIs del navegador.
- **Combinación Server/Client**: mantener las páginas de detalle y home como Server Components; los listados con búsqueda/filtros como Client Components.
- **Estilos**: solo Tailwind CSS. No crear CSS custom salvo `globals.css`. Mantener diseño responsive (mobile-first).
- **Imports**: usar alias `@/*` apuntando a `src/*`.
- **Nombres**: componentes en PascalCase, archivos en PascalCase para componentes, camelCase para utilidades.

## 3. Supabase

- Cliente browser: `src/lib/supabase/client.ts` (`createClient`).
- Cliente server: `src/lib/supabase/server.ts` (`createServerSupabaseClient`).
- Variables de entorno: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (públicas) y `SUPABASE_SERVICE_ROLE_KEY` (solo servidor, nunca exponer).
- Toda consulta a Supabase debe tener manejo de error y fallback a datos mock (`src/lib/mock-data.ts`) cuando no haya conexión/datos.
- La estructura de BD vive en `supabase/schema.sql`. Si cambias el modelo, actualiza también `src/lib/types.ts` y el seed.

## 4. Estado y hooks

- Usar `useState` y `useEffect` en Client Components para carga de datos y estado local.
- En `useEffect`, limpiar suscripciones con función de cleanup y evitar race conditions (flag `cancelled`).
- Favoritos se persisten en `localStorage` bajo la clave `"favorites"`.

## 5. Loading y Error UI

- Toda ruta debe tener `loading.tsx` y `error.tsx` (y `not-found.tsx` cuando aplique).
- Los `error.tsx` deben ser Client Components (`"use client"`) y usar `useEffect` para loguear el error.
- Mostrar siempre un botón de "Reintentar" que llame a `reset()`.

## 6. Imágenes

- Usar `next/image` con `remotePatterns` configurados en `next.config.ts` (picsum.photos, image.tmdb.org).
- Proveer `alt`, `sizes` y `fill`/dimensiones adecuadas.

## 7. Convenciones de commits y cambios

- No eliminar archivos existentes sin confirmación.
- No modificar `node_modules`, `.next`, ni archivos generados.
- Mantener `AGENTS.md` actualizado si cambian convenciones.
- Antes de entregar cambios, ejecutar `npm run build` y `npm run lint` y asegurar que pasan.

## 8. Rutas del proyecto

- `/` — Inicio (Server Component)
- `/movies` — Listado (Client Component)
- `/movies/[id]` — Detalle (Server Component)
- `/series` — Listado (Client Component)
- `/series/[id]` — Detalle (Server Component)
- `/favorites` — Favoritos (Client Component)
- `/search` — Búsqueda (Client Component)

## 9. Prohibiciones

- No exponer `SUPABASE_SERVICE_ROLE_KEY` al cliente.
- No usar `fetch` directo a Supabase cuando exista el cliente oficial.
- No añadir dependencias sin justificación.
- No deshabilitar TypeScript ni ESLint globalmente para "hacer pasar" el build.
