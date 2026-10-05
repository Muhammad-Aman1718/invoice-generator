import type { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { DashboardShell } from "@/src/components/dashboard/app-sidebar";
import { countInvoicesThisMonth, getViewer } from "@/src/lib/server/data";
import { siteConfig } from "@/src/config/site";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: `%s | ${siteConfig.name}` },
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const viewer = await getViewer();

  if (viewer.profile.isSuspended) {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center bg-mist p-4">
        <div className="panel max-w-md p-8 text-center">
          <ShieldAlert className="mx-auto mb-4 text-red-500" size={36} />
          <h1 className="mb-2 text-xl font-black text-navy">Account suspended</h1>
          <p className="mb-6 text-sm text-navy-500">
            Your account has been suspended. If you think this is a mistake, contact{" "}
            <a className="font-bold underline" href={`mailto:${siteConfig.supportEmail}`}>
              {siteConfig.supportEmail}
            </a>
            .
          </p>
          <Link href="/" className="btn-outline">
            Back to home
          </Link>
        </div>
      </main>
    );
  }

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
