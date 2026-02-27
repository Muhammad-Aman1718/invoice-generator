// "use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { formatCurrency } from "@/lib/invoice-utils";
// import { calculateSubtotal, calculateGrandTotal } from "@/lib/invoice-utils";
// import type { InvoiceData } from "@/types/invoice-types";
// import { Download, Pencil, Trash2 } from "lucide-react";
// import { deleteInvoiceFromDb } from "@/lib/supabase/invoices-client";
// import { useRouter } from "next/navigation";

// interface InvoiceListProps {
//   invoices: (InvoiceData & { id: string })[];
// }

// export function InvoiceList({ invoices }: InvoiceListProps) {
//   const router = useRouter();

//   const handleDelete = async (id: string) => {
//     if (!confirm("Delete this invoice?")) return;
//     await deleteInvoiceFromDb(id);
//     router.refresh();
//   };

//   const handleDownload = (id: string) => {
//     // Trigger PDF download via client; for now link to edit page with download param
//     window.open(`/dashboard/invoices/${id}?download=1`, "_blank");
//   };

//   if (invoices.length === 0) {
//     return (
//       <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
//         <p className="text-slate-500">No invoices yet.</p>
//         <Link href="/dashboard/invoices/new">
//           <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700">
//             Create your first invoice
//           </Button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
//       <table className="w-full text-sm">
//         <thead>
//           <tr className="border-b border-slate-200 bg-slate-50">
//             <th className="text-left p-4 font-medium text-slate-600">
//               Invoice #
//             </th>
//             <th className="text-left p-4 font-medium text-slate-600">Client</th>
//             <th className="text-right p-4 font-medium text-slate-600">
//               Amount
//             </th>
//             <th className="text-center p-4 font-medium text-slate-600">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {invoices.map((inv) => {
//             const subtotal = calculateSubtotal(inv.lineItems);
//             // const grand = calculateGrandTotal(subtotal, inv.tax, inv.discount);
//             return (
//               <tr
//                 key={inv.id}
//                 className="border-b border-slate-100 hover:bg-slate-50"
//               >
//                 <td className="p-4 font-medium">{inv.invoiceNumber}</td>
//                 <td className="p-4 text-slate-600">{inv.clientName || "—"}</td>
//                 <td className="p-4 text-right font-medium">{formatCurrency(inv.totalAmount, inv.currency)}</td>
//                 <td className="p-4">
//                   <div className="flex items-center justify-center gap-2">
//                     <Button variant="ghost" size="icon" asChild>
//                       <Link
//                         href={`/dashboard/invoices/${inv.id}`}
//                         aria-label="Edit"
//                       >
//                         <Pencil className="h-4 w-4" />
//                       </Link>
//                     </Button>
//                     <Button variant="ghost" size="icon" asChild>
//                       <Link
//                         href={`/dashboard/invoices/${inv.id}?download=1`}
//                         target="_blank"
//                         aria-label="Download"
//                       >
//                         <Download className="h-4 w-4" />
//                       </Link>
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => handleDelete(inv.id!)}
//                       aria-label="Delete"
//                     >
//                       <Trash2 className="h-4 w-4 text-red-500" />
//                     </Button>
//                   </div>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/invoice-utils";
import type { InvoiceData } from "@/types/invoice-types";
import {
  Download,
  Pencil,
  Trash2,
  MoreHorizontal,
  FileText,
  Calendar,
  User,
} from "lucide-react";
import { deleteInvoiceFromDb } from "@/lib/supabase/invoices-client";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface InvoiceListProps {
  // invoices: (InvoiceData & { id: string })[];
  invoices: InvoiceData[];
}

export function InvoiceList({ invoices }: InvoiceListProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this invoice? This action cannot be undone.",
      )
    )
      return;
    await deleteInvoiceFromDb(id);
    router.refresh();
  };

  if (invoices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white p-20 text-center shadow-sm">
        <div className="bg-slate-50 p-4 rounded-full mb-4">
          <FileText className="h-10 w-10 text-slate-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">
          No invoices created
        </h3>
        <p className="text-slate-500 max-w-[250px] mx-auto mt-1">
          Get started by creating your first professional invoice.
        </p>
        <Link href="/dashboard/invoices/new" className="mt-6">
          <Button className="bg-[#3A7BD5] hover:bg-[#2C62B0] shadow-lg shadow-blue-500/20 px-8 py-6 rounded-xl">
            Create First Invoice
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="text-left p-5 font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                Invoice Details
              </th>
              <th className="text-left p-5 font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                Client
              </th>
              <th className="text-left p-5 font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                Issue Date
              </th>
              <th className="text-right p-5 font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                Amount
              </th>
              <th className="text-center p-5 font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {invoices.map((inv) => (
              <tr
                key={inv.id}
                className="group hover:bg-slate-50/80 transition-all duration-200"
              >
                {/* Invoice Number & Icon */}
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                      <FileText size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 leading-none mb-1">
                        #{inv.invoiceNumber}
                      </p>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                        Paid
                      </span>
                    </div>
                  </div>
                </td>

                {/* Client Info */}
                <td className="p-5 text-slate-600">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-slate-400" />
                    <span className="font-medium">
                      {inv.clientName || "Unnamed Client"}
                    </span>
                  </div>
                </td>

                {/* Date */}
                <td className="p-5 text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>
                      {inv.issueDate
                        ? new Date(inv.issueDate).toLocaleDateString()
                        : "—"}
                    </span>
                  </div>
                </td>

                {/* Amount */}
                <td className="p-5 text-right font-black text-[#1B2A4A] text-base tracking-tight">
                  {formatCurrency(inv.totalAmount, inv.currency)}
                </td>

                {/* Action Dropdown Menu */}
                <td className="p-5 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 rounded-full hover:bg-slate-200"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 rounded-xl p-2 shadow-xl border-slate-100"
                    >
                      <DropdownMenuLabel className="text-xs text-slate-400">
                        Manage Invoice
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        asChild
                        className="rounded-lg focus:bg-indigo-50 focus:text-indigo-600 cursor-pointer"
                      >
                        <Link
                          href={`/dashboard/invoices/${inv.id}`}
                          className="flex items-center w-full"
                        >
                          <Pencil size={14} className="mr-2" /> Edit Invoice
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        asChild
                        className="rounded-lg focus:bg-indigo-50 focus:text-indigo-600 cursor-pointer"
                      >
                        <Link
                          href={`/dashboard/invoices/${inv.id}?download=1`}
                          target="_blank"
                          className="flex items-center w-full"
                        >
                          <Download size={14} className="mr-2" /> Download PDF
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(inv.id!)}
                        className="rounded-lg focus:bg-red-50 focus:text-red-600 text-red-500 cursor-pointer"
                      >
                        <Trash2 size={14} className="mr-2" /> Delete Invoice
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
