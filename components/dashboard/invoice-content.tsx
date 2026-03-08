// @/components/dashboard/invoice-content.tsx
import { fetchUserInvoicesServer } from "@/lib/supabase/invoices-server";
import { InvoiceList } from "@/components/dashboard/invoice-list";
import { StatsCards } from "@/components/dashboard/stats-cards";

export async function InvoiceContent() {
  const invoices = await fetchUserInvoicesServer();

  const stats = invoices.reduce(
    (acc, inv) => {
      const amount = Number(inv.totalAmount) || 0;
      acc.totalInvoiced += amount;
      if (inv.status === "paid") {
        acc.totalPaid += amount;
      } else {
        acc.totalPending += amount;
      }
      return acc;
    },
    { totalInvoiced: 0, totalPaid: 0, totalPending: 0 },
  );

  return (
    <div className="space-y-6">
      <StatsCards stats={stats} />

      <div>
        {/* Section header */}
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-sm font-black uppercase tracking-widest"
            style={{ color: "rgba(25,25,112,0.8)" }}
          >
            Recent Invoices
          </h2>
          <span
            className="text-[10px] font-black px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(255,193,7,0.12)",
              color: "#191970",
              border: "1px solid rgba(255,193,7,0.25)",
            }}
          >
            {invoices.length} total
          </span>
        </div>

        <InvoiceList invoices={invoices} />
      </div>
    </div>
  );
}
