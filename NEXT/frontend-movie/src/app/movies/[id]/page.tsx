import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMovieById } from "@/lib/data";
import FavoriteButton from "@/components/FavoriteButton";

export const dynamic = "force-dynamic";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovieById(id);

  if (!movie) notFound();

  return (
    <div>
      {/* Backdrop */}
      <div className="relative h-64 w-full overflow-hidden sm:h-80">
        {movie.backdrop_url ? (
          <Image
            src={movie.backdrop_url}
            alt={movie.title}
            fill
            priority
            className="object-cover opacity-40"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Link href="/movies" className="text-sm text-red-400 hover:underline">
          ← Volver a películas
        </Link>

        <div className="mt-6 flex flex-col gap-6 md:flex-row">
          <div className="relative mx-auto h-72 w-48 flex-shrink-0 overflow-hidden rounded-xl md:mx-0 md:h-96 md:w-64">
            {movie.poster_url ? (
              <Image
                src={movie.poster_url}
                alt={movie.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-zinc-800">
                Sin imagen
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold sm:text-4xl">{movie.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-300">
              {movie.rating !== null && (
                <span className="rounded bg-yellow-500/20 px-2 py-1 text-yellow-400">
                  ★ {movie.rating}
                </span>
              )}
              {movie.release_year && <span>{movie.release_year}</span>}
              {movie.duration_minutes && <span>{movie.duration_minutes} min</span>}
            </div>
            {movie.genre && movie.genre.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {movie.genre.map((g) => (
                  <span
                    key={g}
                    className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300"
                  >
                    {g}
                  </span>
                ))}
              </div>
            )}
            <p className="mt-6 leading-relaxed text-zinc-200">
              {movie.description ?? "Sin descripción disponible."}
            </p>
            <div className="mt-6">
              <FavoriteButton id={movie.id} kind="movie" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
