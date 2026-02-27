import { fetchUserInvoicesServer } from "@/lib/supabase/invoices-server";
import { InvoiceList } from "@/components/dashboard/invoice-list";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { InvoiceData } from "@/types/invoice-types"; // Type import karein

export async function InvoiceContent() {
  // 1. Data fetch karein (Ab ye naya InvoiceData interface return karega)
  const invoices = await fetchUserInvoicesServer();

  // 2. Stats Calculation
  const stats = invoices.reduce(
    (acc, inv) => {
      const amount = inv.totalAmount || 0;
      acc.totalInvoiced += amount;
      const status = (inv as any).status || "pending";
      if (status === "paid") {
        acc.totalPaid += amount;
      } else {
        acc.totalPending += amount;
      }
      return acc;
    },
    { totalInvoiced: 0, totalPaid: 0, totalPending: 0 },
  );

  return (
    <div className="space-y-8">
      {/* 3. Stats Cards Render karein */}
      <StatsCards stats={stats} />

      {/* 4. Invoices Table/List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-slate-900">
            Recent Invoices
          </h2>
          <span className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-1 rounded">
            Total: {invoices.length}
          </span>
        </div>

        {/* InvoiceList ko array pass karein */}
        <InvoiceList invoices={invoices} />
      </div>
    </div>
  );
}
