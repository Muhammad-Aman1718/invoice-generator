import { DashboardSkeleton } from "@/src/components/dashboard/dashboardSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <DashboardSkeleton />
    </div>
  );
}
