import Link from "next/link";
import { getFeaturedMovies, getFeaturedSeries } from "@/lib/data";
import MovieCard from "@/components/MovieCard";
import SeriesCard from "@/components/SeriesCard";

export const dynamic = "force-dynamic";

export default async function Home() {
  const movies = await getFeaturedMovies(4);
  const series = await getFeaturedSeries(4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/40 to-zinc-950" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Descubre películas y series
          </h1>
          <p className="mt-4 max-w-xl text-lg text-zinc-300">
            Explora el catálogo, guarda tus favoritos y encuentra tu próxima historia.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/movies"
              className="rounded-md bg-red-600 px-5 py-3 text-sm font-medium text-white hover:bg-red-700"
            >
              Ver películas
            </Link>
            <Link
              href="/series"
              className="rounded-md border border-white/20 px-5 py-3 text-sm font-medium text-white hover:bg-white/10"
            >
              Ver series
            </Link>
          </div>
        </div>
      </section>

      {/* Featured movies */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Películas destacadas</h2>
          <Link href="/movies" className="text-sm text-red-400 hover:underline">
            Ver todas
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {movies.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </section>

      {/* Featured series */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Series destacadas</h2>
          <Link href="/series" className="text-sm text-red-400 hover:underline">
            Ver todas
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {series.map((s) => (
            <SeriesCard key={s.id} series={s} />
          ))}
        </div>
      </section>
    </div>
  );
}
