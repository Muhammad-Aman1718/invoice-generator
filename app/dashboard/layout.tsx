import { AppSidebar } from "@/components/dashboard/app-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen" style={{ background: "#ECEFF1" }}>
      <AppSidebar />
      <main className="flex-1 overflow-auto min-w-0 pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
