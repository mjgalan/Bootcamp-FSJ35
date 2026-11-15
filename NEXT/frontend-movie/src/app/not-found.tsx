import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h2 className="text-4xl font-bold">404</h2>
      <p className="mt-2 text-zinc-400">La página que buscas no existe.</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
