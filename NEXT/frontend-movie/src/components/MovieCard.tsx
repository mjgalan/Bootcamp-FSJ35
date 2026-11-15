import Image from "next/image";
import Link from "next/link";
import type { Movie } from "@/lib/types";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/movies/${movie.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-zinc-900 shadow-lg transition hover:scale-[1.02]"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        {movie.poster_url ? (
          <Image
            src={movie.poster_url}
            alt={movie.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition group-hover:opacity-80"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-zinc-500">
            Sin imagen
          </div>
        )}
        {movie.rating !== null && (
          <span className="absolute right-2 top-2 rounded-md bg-black/70 px-2 py-1 text-xs font-bold text-yellow-400">
            ★ {movie.rating}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-1 text-sm font-semibold text-white">{movie.title}</h3>
        <p className="text-xs text-zinc-400">
          {movie.release_year ?? "—"} · {movie.duration_minutes ? `${movie.duration_minutes} min` : "—"}
        </p>
        {movie.genre && movie.genre.length > 0 && (
          <p className="line-clamp-1 text-xs text-zinc-500">{movie.genre.join(", ")}</p>
        )}
      </div>
    </Link>
  );
}
