"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h2 className="text-2xl font-bold text-red-500">Algo salió mal</h2>
      <p className="mt-2 text-zinc-400">{error.message || "Error inesperado"}</p>
      <button
        onClick={() => reset()}
        className="mt-6 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Reintentar
      </button>
    </div>
  );
}
