import Link from "next/link";
import { Shield, Users } from "lucide-react";
import PageHeader from "@/src/components/ui/PageHeader";
import StatsCards from "@/src/components/dashboard/StatsCards";
import PlanDistribution from "@/src/components/admin/PlanDistribution";
import RecentSignups from "@/src/components/admin/RecentSignups";
import { getAdminStats, requireAdminViewer } from "@/src/lib/server/adminData";
import { RECENT_SIGNUPS_LIMIT } from "@/src/constant/app";
import { ROUTES } from "@/src/constant/routes";
import { buildAdminStatItems } from "@/src/lib/dashboardView";

export const metadata = { title: "Admin" };

export default async function AdminPage() {
  const viewer = await requireAdminViewer();
  const stats = await getAdminStats(viewer);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        refreshable
        icon={Shield}
        title="Admin overview"
        description="Platform health, subscriptions and growth."
        actions={
          <Link href={ROUTES.adminUsers} className="btn-navy">
            <Users size={15} /> Manage users
          </Link>
        }
      />
      <StatsCards items={buildAdminStatItems(stats)} />
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="panel p-5 sm:p-6" aria-labelledby="plansTitle">
          <h2 id="plansTitle" className="mb-4 text-base font-bold text-navy">
            Users by plan
          </h2>
          <PlanDistribution byPlan={stats.byPlan} totalUsers={stats.totalUsers} />
          <p className="mt-5 text-xs text-navy-500">
            {stats.admins} admin{stats.admins === 1 ? "" : "s"} · {stats.suspended} suspended
          </p>
        </section>
        <RecentSignups users={stats.users.slice(0, RECENT_SIGNUPS_LIMIT)} />
      </div>
    </div>
  );
}
