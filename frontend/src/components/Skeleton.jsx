export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse" aria-hidden="true">
      <div className="aspect-[4/5] bg-line/80" />
      <div className="mt-5 h-7 w-3/5 bg-line/80" />
      <div className="mt-3 h-4 w-full bg-line/70" />
      <div className="mt-2 h-4 w-4/5 bg-line/70" />
      <div className="mt-6 h-4 w-24 bg-line/80" />
    </div>
  );
}

export function ProductPageSkeleton() {
  return (
    <div className="mx-auto grid max-w-6xl animate-pulse gap-12 px-6 py-12 md:grid-cols-2" aria-hidden="true">
      <div className="aspect-square bg-line/80" />
      <div>
        <div className="h-4 w-32 bg-line/80" />
        <div className="mt-6 h-12 w-4/5 bg-line/80" />
        <div className="mt-4 h-4 w-full bg-line/70" />
        <div className="mt-2 h-4 w-3/4 bg-line/70" />
        <div className="mt-8 h-8 w-28 bg-line/80" />
        <div className="mt-8 h-12 w-48 bg-line/80" />
      </div>
    </div>
  );
}
