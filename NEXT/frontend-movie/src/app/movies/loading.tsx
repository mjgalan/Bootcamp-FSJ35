import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6 h-8 w-40 animate-pulse rounded bg-zinc-800" />
      <LoadingSkeleton />
    </div>
  );
}
