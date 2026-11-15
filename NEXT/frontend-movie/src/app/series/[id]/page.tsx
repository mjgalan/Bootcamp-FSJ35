import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSeriesById } from "@/lib/data";
import FavoriteButton from "@/components/FavoriteButton";

export const dynamic = "force-dynamic";

export default async function SeriesDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const series = await getSeriesById(id);

  if (!series) notFound();

  return (
    <div>
      <div className="relative h-64 w-full overflow-hidden sm:h-80">
        {series.backdrop_url ? (
          <Image
            src={series.backdrop_url}
            alt={series.title}
            fill
            priority
            className="object-cover opacity-40"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl rounded-2xl bg-white px-4 py-8 text-black sm:px-6">
        <Link href="/series" className="text-sm text-red-600 hover:underline">
          ← Volver a series
        </Link>

        <div className="mt-6 flex flex-col gap-6 md:flex-row">
          <div className="relative mx-auto h-72 w-48 flex-shrink-0 overflow-hidden rounded-xl md:mx-0 md:h-96 md:w-64">
            {series.poster_url ? (
              <Image src={series.poster_url} alt={series.title} fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-zinc-200 text-zinc-500">
                Sin imagen
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold sm:text-4xl">{series.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-700">
              {series.rating !== null && (
                <span className="rounded bg-yellow-100 px-2 py-1 text-yellow-700">
                  ★ {series.rating}
                </span>
              )}
              {series.release_year && <span>{series.release_year}</span>}
              {series.seasons && <span>{series.seasons} temporadas</span>}
              {series.episodes && <span>{series.episodes} episodios</span>}
            </div>
            {series.genre && series.genre.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {series.genre.map((g) => (
                  <span
                    key={g}
                    className="rounded-full bg-zinc-200 px-3 py-1 text-xs text-zinc-700"
                  >
                    {g}
                  </span>
                ))}
              </div>
            )}
            <p className="mt-6 leading-relaxed text-black">
              {series.description ?? "Sin descripción disponible."}
            </p>
            <div className="mt-6">
              <FavoriteButton id={series.id} kind="series" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
