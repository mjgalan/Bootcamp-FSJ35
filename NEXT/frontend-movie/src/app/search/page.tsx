"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { mockMovies, mockSeries } from "@/lib/mock-data";
import type { Movie, Series } from "@/lib/types";

export default function SearchPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const supabase = createClient();
        const [{ data: mData }, { data: sData }] = await Promise.all([
          supabase.from("movies").select("*"),
          supabase.from("series").select("*"),
        ]);
        if (cancelled) return;
        setMovies((mData && mData.length ? mData : mockMovies) as Movie[]);
        setSeries((sData && sData.length ? sData : mockSeries) as Series[]);
      } catch {
        if (cancelled) return;
        setMovies(mockMovies);
        setSeries(mockSeries);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const q = query.toLowerCase();
  const filteredMovies = movies.filter((m) => m.title.toLowerCase().includes(q));
  const filteredSeries = series.filter((s) => s.title.toLowerCase().includes(q));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold">Buscar</h1>
      <input
        type="text"
        placeholder="Buscar películas y series..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mt-4 w-full rounded-md border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none sm:max-w-md"
      />

      {loading ? (
        <p className="mt-8 text-zinc-400">Cargando...</p>
      ) : (
        <>
          <section className="mt-8">
            <h2 className="mb-3 text-xl font-bold">Películas</h2>
            {filteredMovies.length === 0 ? (
              <p className="text-zinc-400">Sin resultados.</p>
            ) : (
              <ul className="space-y-2">
                {filteredMovies.map((m) => (
                  <li key={m.id}>
                    <Link
                      href={`/movies/${m.id}`}
                      className="text-red-400 hover:underline"
                    >
                      {m.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className="mt-8">
            <h2 className="mb-3 text-xl font-bold">Series</h2>
            {filteredSeries.length === 0 ? (
              <p className="text-zinc-400">Sin resultados.</p>
            ) : (
              <ul className="space-y-2">
                {filteredSeries.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/series/${s.id}`}
                      className="text-red-400 hover:underline"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
}
