export function Loading() {
  return (
    <div aria-label="Carregando veículos" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="status">
      {Array.from({ length: 6 }, (_, index) => (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white" key={index}>
          <div className="aspect-[16/10] animate-pulse bg-slate-200" />
          <div className="space-y-4 p-5">
            <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
            <div className="h-7 w-3/4 animate-pulse rounded bg-slate-200" />
            <div className="h-10 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      ))}
      <span className="sr-only">Carregando...</span>
    </div>
  );
}
