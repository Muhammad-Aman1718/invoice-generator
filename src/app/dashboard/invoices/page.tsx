import Link from "next/link";
import { Plus, Receipt } from "lucide-react";
import { PageHeader } from "@/src/components/ui/page-header";
import { InvoiceList } from "@/src/components/dashboard/invoice-list";
import { getViewer, listInvoiceSummaries } from "@/src/lib/server/data";

export const metadata = { title: "Invoices" };

export default async function InvoicesPage() {
  const viewer = await getViewer();
  const invoices = await listInvoiceSummaries(viewer);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        icon={Receipt}
        title="Invoices"
        description="Search, filter and manage every invoice you've created."
        actions={
          <Link href="/dashboard/invoices/new" className="btn-primary">
            <Plus size={16} /> New invoice
          </Link>
        }
      />
      <InvoiceList
        invoices={invoices}
        canExportCsv={viewer.plan.perks.csvExport}
        pdfBranding={!viewer.plan.perks.removeBranding}
      />
    </div>
  );
}
