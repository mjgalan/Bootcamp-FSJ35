"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body className="bg-zinc-950 text-white">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-red-500">Error global</h2>
          <p className="mt-2 text-zinc-400">{error.message}</p>
          <button
            onClick={() => reset()}
            className="mt-6 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white"
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  );
}
