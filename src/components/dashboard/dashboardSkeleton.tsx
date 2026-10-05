export function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-6" aria-busy="true" aria-label="Loading">
      <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="panel p-5">
            <div className="mb-3 h-2.5 w-20 rounded bg-navy/[0.08]" />
            <div className="h-7 w-28 rounded-lg bg-navy/[0.08]" />
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="panel h-72 lg:col-span-2" />
        <div className="panel h-72" />
      </div>
      <div className="panel h-64" />
    </div>
  );
}
