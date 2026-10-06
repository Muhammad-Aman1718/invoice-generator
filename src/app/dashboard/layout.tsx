import type { Metadata } from "next";
import DashboardShell from "@/src/components/dashboard/DashboardShell";
import SuspendedNotice from "@/src/components/dashboard/SuspendedNotice";
import DatabaseSetupNotice from "@/src/components/dashboard/DatabaseSetupNotice";
import { getMissingTables } from "@/src/lib/server/healthCheck";
import { countInvoicesThisMonth, getViewer } from "@/src/lib/server/data";
import { SITE_CONFIG } from "@/src/constant/site";
import type { LayoutProps } from "@/src/types/types";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: `%s | ${SITE_CONFIG.name}` },
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }: LayoutProps) {
  const viewer = await getViewer();
  const missingTables = await getMissingTables(viewer.supabase);
  if (missingTables.length) return <DatabaseSetupNotice missingTables={missingTables} />;
  if (viewer.profile.isSuspended) return <SuspendedNotice />;

  const used = await countInvoicesThisMonth(viewer);
  return (
    <DashboardShell
      viewer={{
        email: viewer.user.email ?? "",
        name: viewer.profile.fullName ?? "",
        role: viewer.profile.role,
        planName: viewer.plan.name,
        isPaid: viewer.plan.id !== "free",
        usage: { used, limit: viewer.plan.limits.invoicesPerMonth },
      }}
    >
      {children}
    </DashboardShell>
  );
}
