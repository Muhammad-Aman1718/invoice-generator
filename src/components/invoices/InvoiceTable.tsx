import InvoiceTableRow from "./InvoiceTableRow";
import type { InvoiceTableProps } from "@/src/types/types";

export default function InvoiceTable({ invoices, actions }: InvoiceTableProps) {
  return (
    <div className="panel hidden overflow-hidden md:block">
      <div className="custom-scrollbar relative overflow-x-auto">
        <table className="w-full min-w-[680px] text-sm">
          <thead>
            <tr className="border-b border-navy/[0.06] bg-navy/[0.02] text-[10px] font-black uppercase tracking-widest text-navy-500">
              <th className="px-5 py-3 text-left">Invoice</th>
              <th className="px-4 py-3 text-left">Client</th>
              <th className="px-4 py-3 text-left">Issued</th>
              <th className="px-4 py-3 text-left">Due</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy/[0.04]">
            {invoices.map((invoice) => (
              <InvoiceTableRow key={invoice.id} invoice={invoice} actions={actions} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
