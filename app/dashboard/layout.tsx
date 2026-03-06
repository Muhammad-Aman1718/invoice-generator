import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen" style={{ background: "#ECEFF1" }}>
      {/* Sidebar handles its own Suspense internally now */}
      <AppSidebar />

      <main className="flex-1 overflow-auto min-w-0 pt-14 lg:pt-0">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full">
              <Loader2 className="animate-spin text-[#191970]" />
            </div>
          }
        >
          {children}
        </Suspense>
      </main>
    </div>
  );
}
