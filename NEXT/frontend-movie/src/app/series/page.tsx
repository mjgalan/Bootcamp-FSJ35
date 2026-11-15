"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { mockSeries } from "@/lib/mock-data";
import type { Series } from "@/lib/types";
import SeriesCard from "@/components/SeriesCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function SeriesPage() {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const supabase = createClient();
        const { data, error: err } = await supabase
          .from("series")
          .select("*")
          .order("created_at", { ascending: false })
          ;

        if (cancelled) return;
        if (err || !data || data.length === 0) {
          setSeries(mockSeries);
        } else {
          setSeries(data as Series[]);
        }
      } catch (e) {
        if (cancelled) return;
        setSeries(mockSeries);
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

  const filtered = series.filter((s) =>
    s.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold">Series</h1>
      <p className="mt-1 text-zinc-400">Explora nuestro catálogo de series.</p>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:border-red-500 focus:outline-none sm:max-w-md"
        />
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
          <p className="text-zinc-400">No se encontraron series.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filtered.map((s) => (
              <SeriesCard key={s.id} series={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
