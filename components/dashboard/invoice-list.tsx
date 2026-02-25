"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/invoice-utils";
import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
import type { InvoiceData } from "@/types/invoice-types";
import { Download, Pencil, Trash2 } from "lucide-react";
import { deleteInvoiceFromDb } from "@/lib/supabase/invoices-client";
import { useRouter } from "next/navigation";

interface InvoiceListProps {
  invoices: (InvoiceData & { id: string })[];
}

export function InvoiceList({ invoices }: InvoiceListProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this invoice?")) return;
    await deleteInvoiceFromDb(id);
    router.refresh();
  };

  const handleDownload = (id: string) => {
    // Trigger PDF download via client; for now link to edit page with download param
    window.open(`/dashboard/invoices/${id}?download=1`, "_blank");
  };

  if (invoices.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
        <p className="text-slate-500">No invoices yet.</p>
        <Link href="/dashboard/invoices/new">
          <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700">Create your first invoice</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="text-left p-4 font-medium text-slate-600">Invoice #</th>
            <th className="text-left p-4 font-medium text-slate-600">Client</th>
            <th className="text-right p-4 font-medium text-slate-600">Amount</th>
            <th className="text-center p-4 font-medium text-slate-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => {
            const subtotal = calculateSubtotal(inv.lineItems);
            const grand = calculateGrandTotal(subtotal, inv.tax, inv.discount);
            return (
              <tr key={inv.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="p-4 font-medium">{inv.invoiceNumber}</td>
                <td className="p-4 text-slate-600">{inv.clientName || "—"}</td>
                <td className="p-4 text-right font-medium">{formatCurrency(grand, inv.currency)}</td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/invoices/${inv.id}`} aria-label="Edit">
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/invoices/${inv.id}?download=1`} target="_blank" aria-label="Download">
                        <Download className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(inv.id!)} aria-label="Delete">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
