export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="h-8 w-48 animate-pulse rounded bg-zinc-800" />
      <div className="mt-6 flex flex-col gap-6 md:flex-row">
        <div className="h-96 w-64 animate-pulse rounded-xl bg-zinc-800" />
        <div className="flex-1 space-y-4">
          <div className="h-8 w-2/3 animate-pulse rounded bg-zinc-800" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-zinc-800" />
          <div className="h-24 w-full animate-pulse rounded bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}
