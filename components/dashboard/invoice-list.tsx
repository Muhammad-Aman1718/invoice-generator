// // @/components/dashboard/invoice-list.tsx

// "use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { formatCurrency } from "@/lib/invoice-utils";
// import type { InvoiceData } from "@/types/invoice-types";
// import {
//   Download,
//   Pencil,
//   Trash2,
//   MoreHorizontal,
//   FileText,
//   Calendar,
//   User,
//   CheckCircle,
//   Clock,
// } from "lucide-react";
// import { deleteInvoiceFromDb } from "@/lib/supabase/invoices-client";
// import { useRouter } from "next/navigation";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { supabase } from "@/lib/supabase/client";

// interface InvoiceListProps {
//   invoices: InvoiceData[];
// }

// export function InvoiceList({ invoices }: InvoiceListProps) {
//   const router = useRouter();

//   const handleStatusChange = async (id: string, newStatus: string) => {
//     const { error } = await supabase
//       .from("invoices")
//       .update({ status: newStatus })
//       .eq("id", id);

//     if (error) {
//       alert("Error updating status");
//     } else {
//       router.refresh();
//       // window.location.reload(); // Fauri refresh taake stats update ho jayein
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (
//       !confirm(
//         "Are you sure you want to delete this invoice? This action cannot be undone.",
//       )
//     )
//       return;
//     const result = await deleteInvoiceFromDb(id);
//     console.log("Delete Result:", result);
//     router.refresh();
//   };

//   if (invoices.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white p-20 text-center shadow-sm">
//         <div className="bg-slate-50 p-4 rounded-full mb-4">
//           <FileText className="h-10 w-10 text-slate-400" />
//         </div>
//         <h3 className="text-lg font-bold text-slate-900">
//           No invoices created
//         </h3>
//         <p className="text-slate-500 max-w-[250px] mx-auto mt-1">
//           Get started by creating your first professional invoice.
//         </p>
//         <Link href="/dashboard/invoices/new" className="mt-6">
//           <Button className="bg-[#3A7BD5] hover:bg-[#2C62B0] shadow-lg shadow-blue-500/20 px-8 py-6 rounded-xl">
//             Create First Invoice
//           </Button>
//         </Link>
//       </div>
//     );
//   }
//   // console.log("Rendering InvoiceList with invoices:", invoices); // Debug log to check data
//   return (
//     <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="border-b border-slate-100 bg-slate-50/50">
//               <th className="text-left p-5 font-bold text-slate-500 uppercase tracking-wider text-[10px]">
//                 Invoice Details
//               </th>
//               <th className="text-left p-5 font-bold text-slate-500 uppercase tracking-wider text-[10px]">
//                 Client
//               </th>
//               <th className="text-left p-5 font-bold text-slate-500 uppercase tracking-wider text-[10px]">
//                 Issue Date
//               </th>
//               <th className="text-right p-5 font-bold text-slate-500 uppercase tracking-wider text-[10px]">
//                 Amount
//               </th>
//               <th className="text-center p-5 font-bold text-slate-500 uppercase tracking-wider text-[10px]">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-50">
//             {invoices.map((inv) => (
//               <tr
//                 key={inv.id}
//                 className="group hover:bg-slate-50/80 transition-all duration-200"
//               >
//                 {/* Invoice Number & Icon */}
//                 <td className="p-5">
//                   <div className="flex items-center gap-3">
//                     {/* ... icon code ... */}
//                     <div>
//                       <p className="font-bold text-slate-900 mb-1">
//                         #{inv.invoiceNumber}
//                       </p>
//                       <span
//                         className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
//                           inv.status === "paid"
//                             ? "bg-emerald-100 text-emerald-700"
//                             : "bg-amber-100 text-amber-700"
//                         }`}
//                       >
//                         {inv.status || "pending"}
//                       </span>
//                     </div>
//                   </div>
//                 </td>

//                 {/* Client Info */}
//                 <td className="p-5 text-slate-600">
//                   <div className="flex items-center gap-2">
//                     <User size={14} className="text-slate-400" />
//                     <span className="font-medium">
//                       {inv.clientName || "Unnamed Client"}
//                     </span>
//                   </div>
//                 </td>

//                 {/* Date */}
//                 <td className="p-5 text-slate-500">
//                   <div className="flex items-center gap-2">
//                     <Calendar size={14} />
//                     <span>
//                       {inv.issueDate
//                         ? new Date(inv.issueDate).toLocaleDateString()
//                         : "—"}
//                     </span>
//                   </div>
//                 </td>

//                 {/* Amount */}
//                 <td className="p-5 text-right font-black text-[#1B2A4A] text-base tracking-tight">
//                   {formatCurrency(inv.totalAmount, inv.currency)}
//                 </td>

//                 {/* Action Dropdown Menu */}
//                 <td className="p-5 text-center">
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button
//                         variant="ghost"
//                         className="h-8 w-8 p-0 rounded-full hover:bg-slate-200"
//                       >
//                         <MoreHorizontal className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent
//                       align="end"
//                       className="w-48 rounded-xl p-2 shadow-xl border-slate-100"
//                     >
//                       <DropdownMenuLabel className="text-xs text-slate-400">
//                         Manage Invoice
//                       </DropdownMenuLabel>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem
//                         asChild
//                         className="rounded-lg focus:bg-indigo-50 focus:text-indigo-600 cursor-pointer"
//                       >
//                         <Link
//                           href={`/dashboard/invoices/${inv.id}`}
//                           className="flex items-center w-full"
//                         >
//                           <Pencil size={14} className="mr-2" /> Edit Invoice
//                         </Link>
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         asChild
//                         className="rounded-lg focus:bg-indigo-50 focus:text-indigo-600 cursor-pointer"
//                       >
//                         <Link
//                           href={`/dashboard/invoices/${inv.id}?download=1`}
//                           target="_blank"
//                           className="flex items-center w-full"
//                         >
//                           <Download size={14} className="mr-2" /> Download PDF
//                         </Link>
//                       </DropdownMenuItem>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuLabel>Status Actions</DropdownMenuLabel>
//                       <DropdownMenuItem
//                         onClick={() => handleStatusChange(inv.id!, "paid")}
//                       >
//                         <CheckCircle
//                           size={14}
//                           className="mr-2 text-emerald-600"
//                         />{" "}
//                         Mark as Paid
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         onClick={() => handleStatusChange(inv.id!, "pending")}
//                       >
//                         <Clock size={14} className="mr-2 text-amber-600" /> Mark
//                         as Pending
//                       </DropdownMenuItem>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem
//                         onClick={() => handleDelete(inv.id!)}
//                         className="rounded-lg focus:bg-red-50 focus:text-red-600 text-red-500 cursor-pointer"
//                       >
//                         <Trash2 size={14} className="mr-2" /> Delete Invoice
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }







// "use client";

// import Link from "next/link";
// import { formatCurrency } from "@/lib/invoice-utils";
// import type { InvoiceData } from "@/types/invoice-types";
// import {
//   Download,
//   Pencil,
//   Trash2,
//   MoreHorizontal,
//   FileText,
//   Calendar,
//   User,
//   CheckCircle2,
//   Clock,
//   Plus,
// } from "lucide-react";
// import { deleteInvoiceFromDb } from "@/lib/supabase/invoices-client";
// import { useRouter } from "next/navigation";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { supabase } from "@/lib/supabase/client";

// // ─────────────────────────────────────────────
// //  COLOR THEME  (60 · 30 · 10)
// //  60% → #ECEFF1  background
// //  30% → #191970  midnight blue
// //  10% → #FFC107  amber accent
// // ─────────────────────────────────────────────

// interface InvoiceListProps {
//   invoices: InvoiceData[];
// }

// export function InvoiceList({ invoices }: InvoiceListProps) {
//   const router = useRouter();

//   const handleStatusChange = async (id: string, newStatus: string) => {
//     const { error } = await supabase
//       .from("invoices")
//       .update({ status: newStatus })
//       .eq("id", id);
//     if (error) {
//       alert("Error updating status");
//     } else {
//       router.refresh();
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Delete this invoice? This cannot be undone.")) return;
//     await deleteInvoiceFromDb(id);
//     router.refresh();
//   };

//   // ── Empty state ──────────────────────────────────────────────────────────
//   if (invoices.length === 0) {
//     return (
//       <div
//         className="flex flex-col items-center justify-center rounded-2xl p-12 sm:p-20 text-center"
//         style={{
//           background: "#fff",
//           border: "2px dashed rgba(25,25,112,0.1)",
//         }}
//       >
//         <div
//           className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
//           style={{ background: "#ECEFF1" }}
//         >
//           <FileText size={24} style={{ color: "rgba(25,25,112,0.3)" }} />
//         </div>
//         <h3 className="text-base font-black mb-1" style={{ color: "#191970" }}>
//           No invoices yet
//         </h3>
//         <p
//           className="text-xs max-w-[220px] mb-6 leading-relaxed"
//           style={{ color: "rgba(25,25,112,0.45)" }}
//         >
//           Create your first professional invoice and track payments easily.
//         </p>
//         <Link
//           href="/dashboard/invoices/new"
//           className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black transition-all"
//           style={{
//             background: "#FFC107",
//             color: "#191970",
//             boxShadow: "0 4px 14px rgba(255,193,7,0.3)",
//           }}
//         >
//           <Plus size={15} />
//           Create Invoice
//         </Link>
//       </div>
//     );
//   }

//   // ── Desktop table ────────────────────────────────────────────────────────
//   return (
//     <>
//       {/* Desktop: table view */}
//       <div
//         className="hidden sm:block rounded-2xl overflow-hidden"
//         style={{
//           background: "#fff",
//           border: "1px solid rgba(25,25,112,0.07)",
//           boxShadow: "0 4px 20px rgba(25,25,112,0.06)",
//         }}
//       >
//         {/* Table header stripe */}
//         <div className="h-[2px] w-full" style={{ background: "#191970" }} />

//         <div className="overflow-x-auto">
//           <table className="w-full text-sm" style={{ minWidth: "580px" }}>
//             <thead>
//               <tr style={{ background: "rgba(25,25,112,0.03)", borderBottom: "1px solid rgba(25,25,112,0.06)" }}>
//                 {["Invoice", "Client", "Date", "Amount", "Status", ""].map((h, i) => (
//                   <th
//                     key={i}
//                     className={`py-3.5 px-4 text-[10px] font-black uppercase tracking-widest ${
//                       i === 3 ? "text-right" : i === 4 || i === 5 ? "text-center" : "text-left"
//                     }`}
//                     style={{ color: "rgba(25,25,112,0.4)" }}
//                   >
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {invoices.map((inv, idx) => (
//                 <tr
//                   key={inv.id}
//                   className="group transition-colors"
//                   style={{
//                     borderBottom: "1px solid rgba(25,25,112,0.04)",
//                     background: idx % 2 !== 0 ? "#ECEFF1" : "#fff",
//                   }}
//                   onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,193,7,0.04)"; }}
//                   onMouseLeave={(e) => { e.currentTarget.style.background = idx % 2 !== 0 ? "#ECEFF1" : "#fff"; }}
//                 >
//                   {/* Invoice # */}
//                   <td className="px-4 py-3.5">
//                     <p className="font-black text-sm" style={{ color: "#191970" }}>
//                       #{inv.invoiceNumber}
//                     </p>
//                   </td>

//                   {/* Client */}
//                   <td className="px-4 py-3.5">
//                     <div className="flex items-center gap-2">
//                       <div
//                         className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
//                         style={{ background: "rgba(25,25,112,0.06)" }}
//                       >
//                         <User size={11} style={{ color: "rgba(25,25,112,0.4)" }} />
//                       </div>
//                       <span className="text-sm font-semibold" style={{ color: "#191970" }}>
//                         {inv.clientName || "Unnamed Client"}
//                       </span>
//                     </div>
//                   </td>

//                   {/* Date */}
//                   <td className="px-4 py-3.5">
//                     <div className="flex items-center gap-1.5">
//                       <Calendar size={12} style={{ color: "rgba(25,25,112,0.3)" }} />
//                       <span className="text-xs" style={{ color: "rgba(25,25,112,0.55)" }}>
//                         {inv.issueDate
//                           ? new Date(inv.issueDate).toLocaleDateString("en-US", {
//                               month: "short",
//                               day: "numeric",
//                               year: "numeric",
//                             })
//                           : "—"}
//                       </span>
//                     </div>
//                   </td>

//                   {/* Amount */}
//                   <td className="px-4 py-3.5 text-right">
//                     <span className="font-black tabular-nums" style={{ color: "#191970" }}>
//                       {formatCurrency(inv.totalAmount, inv.currency)}
//                     </span>
//                   </td>

//                   {/* Status */}
//                   <td className="px-4 py-3.5 text-center">
//                     <span
//                       className="inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full"
//                       style={
//                         inv.status === "paid"
//                           ? { background: "rgba(16,185,129,0.1)", color: "#059669" }
//                           : { background: "rgba(245,158,11,0.12)", color: "#D97706" }
//                       }
//                     >
//                       {inv.status === "paid" ? (
//                         <CheckCircle2 size={10} />
//                       ) : (
//                         <Clock size={10} />
//                       )}
//                       {inv.status || "pending"}
//                     </span>
//                   </td>

//                   {/* Actions */}
//                   <td className="px-4 py-3.5 text-center">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <button
//                           className="w-7 h-7 rounded-lg flex items-center justify-center transition-all mx-auto"
//                           style={{ color: "rgba(25,25,112,0.4)" }}
//                           onMouseEnter={(e) => {
//                             e.currentTarget.style.background = "#ECEFF1";
//                             e.currentTarget.style.color = "#191970";
//                           }}
//                           onMouseLeave={(e) => {
//                             e.currentTarget.style.background = "transparent";
//                             e.currentTarget.style.color = "rgba(25,25,112,0.4)";
//                           }}
//                         >
//                           <MoreHorizontal size={15} />
//                         </button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent
//                         align="end"
//                         className="w-48 rounded-xl p-1.5 shadow-xl"
//                         style={{ border: "1px solid rgba(25,25,112,0.08)" }}
//                       >
//                         <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest px-2 py-1.5" style={{ color: "rgba(25,25,112,0.4)" }}>
//                           Actions
//                         </DropdownMenuLabel>
//                         <DropdownMenuSeparator style={{ background: "rgba(25,25,112,0.06)" }} />
//                         <DropdownMenuItem asChild className="rounded-lg cursor-pointer text-xs font-semibold">
//                           <Link href={`/dashboard/invoices/${inv.id}`} className="flex items-center w-full">
//                             <Pencil size={13} className="mr-2" /> Edit Invoice
//                           </Link>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem asChild className="rounded-lg cursor-pointer text-xs font-semibold">
//                           <Link href={`/dashboard/invoices/${inv.id}?download=1`} target="_blank" className="flex items-center w-full">
//                             <Download size={13} className="mr-2" /> Download PDF
//                           </Link>
//                         </DropdownMenuItem>
//                         <DropdownMenuSeparator style={{ background: "rgba(25,25,112,0.06)" }} />
//                         <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest px-2 py-1.5" style={{ color: "rgba(25,25,112,0.4)" }}>
//                           Status
//                         </DropdownMenuLabel>
//                         <DropdownMenuItem
//                           onClick={() => handleStatusChange(inv.id!, "paid")}
//                           className="rounded-lg cursor-pointer text-xs font-semibold"
//                         >
//                           <CheckCircle2 size={13} className="mr-2 text-emerald-500" /> Mark as Paid
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           onClick={() => handleStatusChange(inv.id!, "pending")}
//                           className="rounded-lg cursor-pointer text-xs font-semibold"
//                         >
//                           <Clock size={13} className="mr-2 text-amber-500" /> Mark as Pending
//                         </DropdownMenuItem>
//                         <DropdownMenuSeparator style={{ background: "rgba(25,25,112,0.06)" }} />
//                         <DropdownMenuItem
//                           onClick={() => handleDelete(inv.id!)}
//                           className="rounded-lg cursor-pointer text-xs font-semibold text-red-500 focus:bg-red-50 focus:text-red-600"
//                         >
//                           <Trash2 size={13} className="mr-2" /> Delete
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Mobile: card list ─────────────────────────────────────────────── */}
//       <div className="sm:hidden space-y-3">
//         {invoices.map((inv) => (
//           <div
//             key={inv.id}
//             className="rounded-2xl p-4"
//             style={{
//               background: "#fff",
//               border: "1px solid rgba(25,25,112,0.07)",
//               boxShadow: "0 2px 8px rgba(25,25,112,0.05)",
//             }}
//           >
//             {/* Top row */}
//             <div className="flex items-start justify-between mb-3">
//               <div>
//                 <p className="font-black" style={{ color: "#191970" }}>
//                   #{inv.invoiceNumber}
//                 </p>
//                 <div className="flex items-center gap-1.5 mt-1">
//                   <User size={11} style={{ color: "rgba(25,25,112,0.35)" }} />
//                   <span className="text-xs font-medium" style={{ color: "rgba(25,25,112,0.6)" }}>
//                     {inv.clientName || "Unnamed Client"}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <span
//                   className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full"
//                   style={
//                     inv.status === "paid"
//                       ? { background: "rgba(16,185,129,0.1)", color: "#059669" }
//                       : { background: "rgba(245,158,11,0.12)", color: "#D97706" }
//                   }
//                 >
//                   {inv.status === "paid" ? <CheckCircle2 size={9} /> : <Clock size={9} />}
//                   {inv.status || "pending"}
//                 </span>

//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <button
//                       className="w-7 h-7 rounded-lg flex items-center justify-center"
//                       style={{ background: "#ECEFF1", color: "#191970" }}
//                     >
//                       <MoreHorizontal size={14} />
//                     </button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end" className="w-44 rounded-xl p-1.5 shadow-xl">
//                     <DropdownMenuItem asChild className="rounded-lg cursor-pointer text-xs font-semibold">
//                       <Link href={`/dashboard/invoices/${inv.id}`} className="flex items-center w-full">
//                         <Pencil size={13} className="mr-2" /> Edit
//                       </Link>
//                     </DropdownMenuItem>
//                     <DropdownMenuItem asChild className="rounded-lg cursor-pointer text-xs font-semibold">
//                       <Link href={`/dashboard/invoices/${inv.id}?download=1`} target="_blank" className="flex items-center w-full">
//                         <Download size={13} className="mr-2" /> Download PDF
//                       </Link>
//                     </DropdownMenuItem>
//                     <DropdownMenuSeparator />
//                     <DropdownMenuItem onClick={() => handleStatusChange(inv.id!, "paid")} className="rounded-lg cursor-pointer text-xs font-semibold">
//                       <CheckCircle2 size={13} className="mr-2 text-emerald-500" /> Mark Paid
//                     </DropdownMenuItem>
//                     <DropdownMenuItem onClick={() => handleStatusChange(inv.id!, "pending")} className="rounded-lg cursor-pointer text-xs font-semibold">
//                       <Clock size={13} className="mr-2 text-amber-500" /> Mark Pending
//                     </DropdownMenuItem>
//                     <DropdownMenuSeparator />
//                     <DropdownMenuItem onClick={() => handleDelete(inv.id!)} className="rounded-lg cursor-pointer text-xs font-semibold text-red-500 focus:bg-red-50 focus:text-red-600">
//                       <Trash2 size={13} className="mr-2" /> Delete
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             </div>

//             {/* Bottom row */}
//             <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(25,25,112,0.06)" }}>
//               <div className="flex items-center gap-1.5">
//                 <Calendar size={11} style={{ color: "rgba(25,25,112,0.3)" }} />
//                 <span className="text-[11px]" style={{ color: "rgba(25,25,112,0.45)" }}>
//                   {inv.issueDate
//                     ? new Date(inv.issueDate).toLocaleDateString("en-US", {
//                         month: "short",
//                         day: "numeric",
//                         year: "numeric",
//                       })
//                     : "—"}
//                 </span>
//               </div>
//               <span
//                 className="text-sm font-black tabular-nums px-2.5 py-1 rounded-xl"
//                 style={{ background: "rgba(255,193,7,0.12)", color: "#191970" }}
//               >
//                 {formatCurrency(inv.totalAmount, inv.currency)}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }































"use client";

import Link from "next/link";
import { formatCurrency } from "@/lib/invoice-utils";
import type { InvoiceData } from "@/types/invoice-types";
import {
  Download, Pencil, Trash2, MoreHorizontal, FileText,
  Calendar, User, CheckCircle2, Clock, Plus,
} from "lucide-react";
import { deleteInvoiceFromDb } from "@/lib/supabase/invoices-client";
import { useRouter } from "next/navigation";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabase/client";

interface InvoiceListProps {
  invoices: InvoiceData[];
}

export function InvoiceList({ invoices }: InvoiceListProps) {
  const router = useRouter();

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase.from("invoices").update({ status: newStatus }).eq("id", id);
    if (error) alert("Error updating status");
    else router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this invoice? This cannot be undone.")) return;
    await deleteInvoiceFromDb(id);
    router.refresh();
  };

  // ── Shared action dropdown ─────────────────────────────────────────────
  const ActionMenu = ({ inv }: { inv: InvoiceData }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
          style={{ color: "rgba(25,25,112,0.35)", background: "transparent" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(25,25,112,0.07)";
            e.currentTarget.style.color = "#191970";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "rgba(25,25,112,0.35)";
          }}
          aria-label="Invoice actions"
        >
          <MoreHorizontal size={15} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="w-52 rounded-2xl p-2 shadow-2xl"
        style={{
          background: "#fff",
          border: "1px solid rgba(25,25,112,0.08)",
          boxShadow: "0 16px 40px rgba(25,25,112,0.12), 0 4px 12px rgba(25,25,112,0.06)",
        }}
      >
        {/* Header */}
        <div className="px-2 py-1.5 mb-1">
          <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: "rgba(25,25,112,0.35)" }}>
            Invoice #{inv.invoiceNumber}
          </p>
        </div>

        {/* Edit */}
        <DropdownMenuItem asChild className="rounded-xl cursor-pointer p-0 focus:bg-transparent">
          <Link
            href={`/dashboard/invoices/${inv.id}`}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ color: "#191970" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#ECEFF1"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(25,25,112,0.07)" }}>
              <Pencil size={11} style={{ color: "#191970" }} />
            </div>
            Edit Invoice
          </Link>
        </DropdownMenuItem>

        {/* Download */}
        <DropdownMenuItem asChild className="rounded-xl cursor-pointer p-0 focus:bg-transparent">
          <Link
            href={`/dashboard/invoices/${inv.id}?download=1`}
            target="_blank"
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ color: "#191970" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#ECEFF1"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(25,25,112,0.07)" }}>
              <Download size={11} style={{ color: "#191970" }} />
            </div>
            Download PDF
          </Link>
        </DropdownMenuItem>

        {/* Status divider */}
        <div className="my-1.5 mx-2 border-t" style={{ borderColor: "rgba(25,25,112,0.07)" }} />
        <p className="px-3 pb-1 text-[9px] font-black uppercase tracking-widest" style={{ color: "rgba(25,25,112,0.3)" }}>
          Change Status
        </p>

        {/* Mark as Paid */}
        <DropdownMenuItem
          onClick={() => handleStatusChange(inv.id!, "paid")}
          className="rounded-xl cursor-pointer p-0 focus:bg-transparent"
        >
          <div
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ color: inv.status === "paid" ? "#059669" : "#191970" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: inv.status === "paid" ? "rgba(16,185,129,0.12)" : "rgba(16,185,129,0.06)" }}
            >
              <CheckCircle2 size={11} style={{ color: "#10B981" }} />
            </div>
            Mark as Paid
            {inv.status === "paid" && (
              <span className="ml-auto text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.12)", color: "#059669" }}>
                Current
              </span>
            )}
          </div>
        </DropdownMenuItem>

        {/* Mark as Pending */}
        <DropdownMenuItem
          onClick={() => handleStatusChange(inv.id!, "pending")}
          className="rounded-xl cursor-pointer p-0 focus:bg-transparent"
        >
          <div
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ color: inv.status === "pending" ? "#D97706" : "#191970" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(245,158,11,0.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: inv.status === "pending" ? "rgba(245,158,11,0.12)" : "rgba(245,158,11,0.06)" }}
            >
              <Clock size={11} style={{ color: "#F59E0B" }} />
            </div>
            Mark as Pending
            {inv.status === "pending" && (
              <span className="ml-auto text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{ background: "rgba(245,158,11,0.12)", color: "#D97706" }}>
                Current
              </span>
            )}
          </div>
        </DropdownMenuItem>

        {/* Delete divider */}
        <div className="my-1.5 mx-2 border-t" style={{ borderColor: "rgba(239,68,68,0.1)" }} />

        {/* Delete */}
        <DropdownMenuItem
          onClick={() => handleDelete(inv.id!)}
          className="rounded-xl cursor-pointer p-0 focus:bg-transparent"
        >
          <div
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ color: "#EF4444" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.05)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(239,68,68,0.08)" }}>
              <Trash2 size={11} style={{ color: "#EF4444" }} />
            </div>
            Delete Invoice
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // ── Empty state ─────────────────────────────────────────────────────────
  if (invoices.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center rounded-2xl p-12 sm:p-20 text-center"
        style={{ background: "#fff", border: "2px dashed rgba(25,25,112,0.1)" }}
      >
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "#ECEFF1" }}>
          <FileText size={24} style={{ color: "rgba(25,25,112,0.3)" }} />
        </div>
        <h3 className="text-base font-black mb-1" style={{ color: "#191970" }}>No invoices yet</h3>
        <p className="text-xs max-w-[220px] mb-6 leading-relaxed" style={{ color: "rgba(25,25,112,0.45)" }}>
          Create your first invoice and track payments easily.
        </p>
        <Link
          href="/dashboard/invoices/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black transition-all"
          style={{ background: "#FFC107", color: "#191970", boxShadow: "0 4px 14px rgba(255,193,7,0.3)" }}
        >
          <Plus size={15} /> Create Invoice
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* ── Desktop table ────────────────────────────────────────────────── */}
      <div
        className="hidden sm:block rounded-2xl overflow-hidden"
        style={{ background: "#fff", border: "1px solid rgba(25,25,112,0.07)", boxShadow: "0 4px 20px rgba(25,25,112,0.06)" }}
      >
        <div className="h-[2px] w-full" style={{ background: "#191970" }} />

        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ minWidth: "580px" }}>
            <thead>
              <tr style={{ background: "rgba(25,25,112,0.02)", borderBottom: "1px solid rgba(25,25,112,0.06)" }}>
                {[
                  { label: "Invoice", align: "left" },
                  { label: "Client", align: "left" },
                  { label: "Date", align: "left" },
                  { label: "Amount", align: "right" },
                  { label: "Status", align: "center" },
                  { label: "", align: "center" },
                ].map((h, i) => (
                  <th
                    key={i}
                    className={`py-3 px-4 text-[10px] font-black uppercase tracking-widest`}
                    style={{ textAlign: h.align as any, color: "rgba(25,25,112,0.4)" }}
                  >
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, idx) => (
                <tr
                  key={inv.id}
                  style={{
                    borderBottom: "1px solid rgba(25,25,112,0.04)",
                    background: idx % 2 !== 0 ? "#ECEFF1" : "#fff",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,193,7,0.04)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = idx % 2 !== 0 ? "#ECEFF1" : "#fff"; }}
                >
                  {/* Invoice # */}
                  <td className="px-4 py-3.5">
                    <p className="font-black text-sm" style={{ color: "#191970" }}>#{inv.invoiceNumber}</p>
                  </td>

                  {/* Client */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(25,25,112,0.06)" }}>
                        <User size={11} style={{ color: "rgba(25,25,112,0.4)" }} />
                      </div>
                      <span className="text-sm font-semibold" style={{ color: "#191970" }}>
                        {inv.clientName || "Unnamed Client"}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={11} style={{ color: "rgba(25,25,112,0.3)" }} />
                      <span className="text-xs" style={{ color: "rgba(25,25,112,0.55)" }}>
                        {inv.issueDate ? new Date(inv.issueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                      </span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="px-4 py-3.5 text-right">
                    <span className="font-black tabular-nums" style={{ color: "#191970" }}>
                      {formatCurrency(inv.totalAmount, inv.currency)}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5 text-center">
                    <span
                      className="inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full"
                      style={inv.status === "paid"
                        ? { background: "rgba(16,185,129,0.1)", color: "#059669" }
                        : { background: "rgba(245,158,11,0.12)", color: "#D97706" }
                      }
                    >
                      {inv.status === "paid" ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                      {inv.status || "pending"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5 text-center">
                    <ActionMenu inv={inv} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Mobile: card list ─────────────────────────────────────────────── */}
      <div className="sm:hidden space-y-3">
        {invoices.map((inv) => (
          <div
            key={inv.id}
            className="rounded-2xl p-4"
            style={{ background: "#fff", border: "1px solid rgba(25,25,112,0.07)", boxShadow: "0 2px 8px rgba(25,25,112,0.05)" }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-black" style={{ color: "#191970" }}>#{inv.invoiceNumber}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <User size={11} style={{ color: "rgba(25,25,112,0.35)" }} />
                  <span className="text-xs font-medium" style={{ color: "rgba(25,25,112,0.6)" }}>
                    {inv.clientName || "Unnamed Client"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full"
                  style={inv.status === "paid"
                    ? { background: "rgba(16,185,129,0.1)", color: "#059669" }
                    : { background: "rgba(245,158,11,0.12)", color: "#D97706" }
                  }
                >
                  {inv.status === "paid" ? <CheckCircle2 size={9} /> : <Clock size={9} />}
                  {inv.status || "pending"}
                </span>
                <ActionMenu inv={inv} />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(25,25,112,0.06)" }}>
              <div className="flex items-center gap-1.5">
                <Calendar size={11} style={{ color: "rgba(25,25,112,0.3)" }} />
                <span className="text-[11px]" style={{ color: "rgba(25,25,112,0.45)" }}>
                  {inv.issueDate ? new Date(inv.issueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                </span>
              </div>
              <span
                className="text-sm font-black tabular-nums px-2.5 py-1 rounded-xl"
                style={{ background: "rgba(255,193,7,0.12)", color: "#191970" }}
              >
                {formatCurrency(inv.totalAmount, inv.currency)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}