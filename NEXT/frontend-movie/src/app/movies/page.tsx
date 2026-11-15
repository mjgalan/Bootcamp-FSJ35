"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { mockMovies } from "@/lib/mock-data";
import type { Movie } from "@/lib/types";
import MovieCard from "@/components/MovieCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("all");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const supabase = createClient();
        const { data, error: err } = await supabase
          .from("movies")
          .select("*")
          .order("created_at", { ascending: false })
          ;

        if (cancelled) return;
        if (err || !data || data.length === 0) {
          setMovies(mockMovies);
        } else {
          setMovies(data as Movie[]);
        }
      } catch (e) {
        if (cancelled) return;
        setMovies(mockMovies);
        setError(e instanceof Error ? e.message : "Error al cargar");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const genres = ["all", ...new Set(movies.flatMap((m) => m.genre ?? []))];

  const filtered = movies.filter((m) => {
    const matchesQuery = m.title.toLowerCase().includes(query.toLowerCase());
    const matchesGenre = genre === "all" || (m.genre ?? []).includes(genre);
    return matchesQuery && matchesGenre;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold">Películas</h1>
      <p className="mt-1 text-zinc-400">Explora nuestro catálogo de películas.</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-md border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none"
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="rounded-md border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white focus:border-red-500 focus:outline-none"
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g === "all" ? "Todos los géneros" : g}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="mt-4 text-sm text-yellow-400">
          Usando datos de demostración: {error}
        </p>
      )}

      <div className="mt-8">
        {loading ? (
          <LoadingSkeleton />
        ) : filtered.length === 0 ? (
          <p className="text-zinc-400">No se encontraron películas.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filtered.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
