import DashboardSkeleton from "@/src/components/dashboard/DashboardSkeleton";

export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <DashboardSkeleton />
    </div>
  );
}
