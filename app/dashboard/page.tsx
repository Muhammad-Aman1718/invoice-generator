import { Suspense } from "react";
import { InvoiceContent } from "@/components/dashboard/invoice-content";
import { DashboardSkeleton } from "@/components/dashboard/dashboardSkeleton";
import { LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <div
      className="p-4 sm:p-6 md:p-8 space-y-6"
      style={{ background: "#ECEFF1", minHeight: "100vh" }}
    >
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "#191970" }}
        >
          <LayoutDashboard size={16} style={{ color: "#FFC107" }} />
        </div>
        <div>
          <h1 className="text-xl font-black" style={{ color: "#191970" }}>
            Dashboard
          </h1>
          <p
            className="text-xs font-medium"
            style={{ color: "rgba(25,25,112,0.45)" }}
          >
            Overview of your invoices
          </p>
        </div>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <InvoiceContent />
      </Suspense>
    </div>
  );
}
