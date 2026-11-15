"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { mockMovies, mockSeries } from "@/lib/mock-data";
import type { Movie, Series } from "@/lib/types";
import MovieCard from "@/components/MovieCard";
import SeriesCard from "@/components/SeriesCard";

type FavItem = { kind: "movie" | "series"; id: string };

export default function FavoritesPage() {
  const [favIds, setFavIds] = useState<FavItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("favorites");
      if (raw) setFavIds(JSON.parse(raw));
    } catch {
      setFavIds([]);
    }
    setLoaded(true);
  }, []);

  const remove = (item: FavItem) => {
    setFavIds((prev) => {
      const next = prev.filter(
        (f) => !(f.kind === item.kind && f.id === item.id)
      );
      localStorage.setItem("favorites", JSON.stringify(next));
      return next;
    });
  };

  const favMovies = favIds
    .filter((f) => f.kind === "movie")
    .map((f) => mockMovies.find((m) => m.id === f.id))
    .filter(Boolean) as Movie[];

  const favSeries = favIds
    .filter((f) => f.kind === "series")
    .map((f) => mockSeries.find((s) => s.id === f.id))
    .filter(Boolean) as Series[];

  if (!loaded) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="h-8 w-40 animate-pulse rounded bg-zinc-800" />
      </div>
    );
  }

  const empty = favMovies.length === 0 && favSeries.length === 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold">Favoritos</h1>
      <p className="mt-1 text-zinc-400">Tus películas y series guardadas.</p>

      {empty ? (
        <div className="mt-12 text-center">
          <p className="text-zinc-400">No tienes favoritos aún.</p>
          <Link
            href="/movies"
            className="mt-4 inline-block rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Explorar películas
          </Link>
        </div>
      ) : (
        <>
          {favMovies.length > 0 && (
            <section className="mt-8">
              <h2 className="mb-4 text-xl font-bold">Películas</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {favMovies.map((m) => (
                  <div key={m.id} className="relative">
                    <MovieCard movie={m} />
                    <button
                      onClick={() => remove({ kind: "movie", id: m.id })}
                      className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs text-red-400 hover:text-red-300"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
          {favSeries.length > 0 && (
            <section className="mt-8">
              <h2 className="mb-4 text-xl font-bold">Series</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {favSeries.map((s) => (
                  <div key={s.id} className="relative">
                    <SeriesCard series={s} />
                    <button
                      onClick={() => remove({ kind: "series", id: s.id })}
                      className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs text-red-400 hover:text-red-300"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
