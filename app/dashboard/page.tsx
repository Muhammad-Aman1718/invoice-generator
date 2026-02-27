// import { createClient } from "@/lib/supabase/server";
// import { fetchUserInvoicesServer } from "@/lib/supabase/invoices-server";
// import { InvoiceList } from "@/components/dashboard/invoice-list";
// import { StatsCards } from "@/components/dashboard/stats-cards";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";

// export default async function DashboardPage() {
//   const invoices = await fetchUserInvoicesServer();
//   const stats = invoices.reduce(
//     (acc, inv) => {
//       const subtotal = calculateSubtotal(inv.lineItems);
//       const grand = calculateGrandTotal(subtotal, inv.tax, inv.discount);
//       acc.totalInvoiced += grand;
//       if (inv.status === "paid") acc.totalPaid += grand;
//       else acc.totalPending += grand;
//       return acc;
//     },
//     { totalInvoiced: 0, totalPaid: 0, totalPending: 0 }
//   );

//   return (
//     <div className="p-6 md:p-8 space-y-8">
//       <div>
//         <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
//         <p className="text-slate-500 mt-1">Overview of your invoices</p>
//       </div>



//       <div>
//         <h2 className="text-lg font-medium text-slate-900 mb-4">Recent Invoices</h2>
//         <InvoiceList invoices={invoices} />
//       </div>
//     </div>
//   );
// }







import { Suspense } from "react";
// import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { InvoiceContent } from "@/components/dashboard/invoice-content";
import { DashboardSkeleton } from "@/components/dashboard/dashboardSkeleton";

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of your invoices</p>
      </div>

      {/* Suspense error ko khatam karega aur loading state dikhayega */}
      <Suspense fallback={<DashboardSkeleton />}>
        <InvoiceContent />
      </Suspense>
    </div>
  );
}