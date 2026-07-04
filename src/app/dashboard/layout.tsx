import { AppSidebar } from "@/src/components/dashboard/app-sidebar";
import Footer from "@/src/components/footer";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: "#ECEFF1" }}>
      <div className="flex flex-1">
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

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
}
