export default function LoadingSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col overflow-hidden rounded-xl bg-zinc-900 shadow-lg"
        >
          <div className="aspect-[2/3] w-full animate-pulse bg-zinc-800" />
          <div className="flex flex-col gap-2 p-3">
            <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-800" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-zinc-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
