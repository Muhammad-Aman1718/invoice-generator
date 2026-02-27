export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-slate-100 rounded-xl" />
        ))}
      </div>
      <div className="space-y-4">
        <div className="h-8 w-48 bg-slate-100 rounded" />
        <div className="h-64 bg-slate-100 rounded-xl" />
      </div>
    </div>
  );
}