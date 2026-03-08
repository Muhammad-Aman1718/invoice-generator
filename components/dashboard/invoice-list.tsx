"use client";

import Link from "next/link";
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
  CheckCircle2,
  Clock,
  Plus,
} from "lucide-react";
import { deleteInvoiceFromDb } from "@/lib/supabase/invoices-client";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabase/client";
import { showToast } from "@/utils/showToast";

interface InvoiceListProps {
  invoices: InvoiceData[];
}

export function InvoiceList({ invoices }: InvoiceListProps) {
  const router = useRouter();

  const handleStatusChange = async (
    id: string,
    newStatus: string,
    invoiceNumber: number,
  ) => {
    const toastId = showToast.loading(
      `Updating status for #${invoiceNumber}...`,
    );
    try {
      const { error } = await supabase
        .from("invoices")
        .update({ status: newStatus })
        .eq("id", id);

      showToast.dismiss(toastId);

      if (error) {
        showToast.error(
          "Update Failed",
          "Could not change the invoice status.",
        );
      } else {
        showToast.success(
          "Status Updated",
          `Invoice #${invoiceNumber} is now ${newStatus}.`,
        );
        router.refresh();
      }
    } catch (err) {
      showToast.dismiss(toastId);
      showToast.error("System Error", "Something went wrong while updating.");
    }
  };

  const handleDelete = async (id: string, invoiceNumber: number) => {
    // Standard confirm ki jagah hum toast bhi use kar sakte thay but for safety confirm thek hai
    if (!confirm(`Delete invoice #${invoiceNumber}? This cannot be undone.`))
      return;

    const toastId = showToast.loading(`Deleting #${invoiceNumber}...`);

    try {
      await deleteInvoiceFromDb(id);
      showToast.dismiss(toastId);
      showToast.success(
        "Deleted",
        `Invoice #${invoiceNumber} has been removed.`,
      );
      router.refresh();
    } catch (err) {
      showToast.dismiss(toastId);
      showToast.error("Delete Failed", "Invoice could not be deleted.");
    }
  };

  const handleDownloadFeedback = (invoiceNumber: number) => {
    showToast.info(
      "Preparing PDF",
      `Generating download for #${invoiceNumber}...`,
    );
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
          boxShadow:
            "0 16px 40px rgba(25,25,112,0.12), 0 4px 12px rgba(25,25,112,0.06)",
        }}
      >
        {/* Header */}
        <div className="px-2 py-1.5 mb-1">
          <p
            className="text-[9px] font-black uppercase tracking-widest"
            style={{ color: "rgba(25,25,112,0.7)" }}
          >
            Invoice #{inv.invoiceNumber}
          </p>
        </div>

        {/* Edit */}
        <DropdownMenuItem
          asChild
          className="rounded-xl cursor-pointer p-0 focus:bg-transparent"
        >
          <Link
            href={`/dashboard/invoices/${inv.id}`}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ color: "#191970" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ECEFF1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(25,25,112,0.07)" }}
            >
              <Pencil size={11} style={{ color: "#191970" }} />
            </div>
            Edit Invoice
          </Link>
        </DropdownMenuItem>

        {/* Download */}
        <DropdownMenuItem
          asChild
          className="rounded-xl cursor-pointer p-0 focus:bg-transparent"
        >
          <Link
            href={`/dashboard/invoices/${inv.id}?download=1`}
            target="_blank"
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ color: "#191970" }}
            onClick={() => handleDownloadFeedback(inv.invoiceNumber)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ECEFF1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(25,25,112,0.07)" }}
            >
              <Download size={11} style={{ color: "#191970" }} />
            </div>
            Download PDF
          </Link>
        </DropdownMenuItem>

        {/* Status divider */}
        <div
          className="my-1.5 mx-2 border-t"
          style={{ borderColor: "rgba(25,25,112,0.07)" }}
        />
        <p
          className="px-3 pb-1 text-[9px] font-black uppercase tracking-widest"
          style={{ color: "rgba(25,25,112,0.7)" }}
        >
          Change Status
        </p>

        {/* Mark as Paid */}
        <DropdownMenuItem
          onClick={() => handleStatusChange(inv.id!, "paid", inv.invoiceNumber)}
          className="rounded-xl cursor-pointer p-0 focus:bg-transparent"
        >
          <div
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ color: inv.status === "paid" ? "#059669" : "#191970" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(16,185,129,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background:
                  inv.status === "paid"
                    ? "rgba(16,185,129,0.12)"
                    : "rgba(16,185,129,0.06)",
              }}
            >
              <CheckCircle2 size={11} style={{ color: "#10B981" }} />
            </div>
            Mark as Paid
            {inv.status === "paid" && (
              <span
                className="ml-auto text-[9px] font-black px-1.5 py-0.5 rounded-full"
                style={{
                  background: "rgba(16,185,129,0.12)",
                  color: "#059669",
                }}
              >
                Current
              </span>
            )}
          </div>
        </DropdownMenuItem>

        {/* Mark as Pending */}
        <DropdownMenuItem
          onClick={() =>
            handleStatusChange(inv.id!, "pending", inv.invoiceNumber)
          }
          className="rounded-xl cursor-pointer p-0 focus:bg-transparent"
        >
          <div
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ color: inv.status === "pending" ? "#D97706" : "#191970" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(245,158,11,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background:
                  inv.status === "pending"
                    ? "rgba(245,158,11,0.12)"
                    : "rgba(245,158,11,0.06)",
              }}
            >
              <Clock size={11} style={{ color: "#F59E0B" }} />
            </div>
            Mark as Pending
            {inv.status === "pending" && (
              <span
                className="ml-auto text-[9px] font-black px-1.5 py-0.5 rounded-full"
                style={{
                  background: "rgba(245,158,11,0.12)",
                  color: "#D97706",
                }}
              >
                Current
              </span>
            )}
          </div>
        </DropdownMenuItem>

        {/* Delete divider */}
        <div
          className="my-1.5 mx-2 border-t"
          style={{ borderColor: "rgba(239,68,68,0.1)" }}
        />

        {/* Delete */}
        <DropdownMenuItem
          onClick={() => handleDelete(inv.id!, inv.invoiceNumber)}
          className="rounded-xl cursor-pointer p-0 focus:bg-transparent"
        >
          <div
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ color: "#EF4444" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239,68,68,0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(239,68,68,0.08)" }}
            >
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
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: "#ECEFF1" }}
        >
          <FileText size={24} style={{ color: "rgba(25,25,112,0.7)" }} />
        </div>
        <h3 className="text-base font-black mb-1" style={{ color: "#191970" }}>
          No invoices yet
        </h3>
        <p
          className="text-xs max-w-[220px] mb-6 leading-relaxed"
          style={{ color: "rgba(25,25,112,0.7)" }}
        >
          Create your first invoice and track payments easily.
        </p>
        <Link
          href="/dashboard/invoices/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black transition-all"
          style={{
            background: "#FFC107",
            color: "#191970",
            boxShadow: "0 4px 14px rgba(255,193,7,0.3)",
          }}
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
        style={{
          background: "#fff",
          border: "1px solid rgba(25,25,112,0.07)",
          boxShadow: "0 4px 20px rgba(25,25,112,0.06)",
        }}
      >
        <div className="h-[2px] w-full" style={{ background: "#191970" }} />

        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ minWidth: "580px" }}>
            <thead>
              <tr
                style={{
                  background: "rgba(25,25,112,0.02)",
                  borderBottom: "1px solid rgba(25,25,112,0.06)",
                }}
              >
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
                    style={{
                      textAlign: h.align as any,
                      color: "rgba(25,25,112,0.8)",
                    }}
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
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,193,7,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      idx % 2 !== 0 ? "#ECEFF1" : "#fff";
                  }}
                >
                  <td className="px-4 py-3.5">
                    <p
                      className="font-black text-sm"
                      style={{ color: "#191970" }}
                    >
                      #{inv.invoiceNumber}
                    </p>
                  </td>

                  {/* Client */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(25,25,112,0.06)" }}
                      >
                        <User
                          size={11}
                          style={{ color: "rgba(25,25,112,0.4)" }}
                        />
                      </div>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "#191970" }}
                      >
                        {inv.clientName || "Unnamed Client"}
                      </span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <Calendar
                        size={11}
                        style={{ color: "rgba(25,25,112,0.8)" }}
                      />
                      <span
                        className="text-xs"
                        style={{ color: "rgba(25,25,112,0.8)" }}
                      >
                        {inv.issueDate
                          ? new Date(inv.issueDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )
                          : "—"}
                      </span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="px-4 py-3.5 text-right">
                    <span
                      className="font-black tabular-nums"
                      style={{ color: "#191970" }}
                    >
                      {formatCurrency(inv.totalAmount, inv.currency)}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5 text-center">
                    <span
                      className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full"
                      style={
                        inv.status === "paid"
                          ? {
                              background: "rgba(6, 95, 70, 0.1)", // Light emerald background
                              color: "#065F46", // Darker emerald for better contrast
                            }
                          : {
                              background: "rgba(146, 64, 14, 0.1)", // Light amber background
                              color: "#92400E", // Darker amber for better contrast
                            }
                      }
                    >
                      {inv.status === "paid" ? (
                        <CheckCircle2 size={10} />
                      ) : (
                        <Clock size={10} />
                      )}
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
            style={{
              background: "#fff",
              border: "1px solid rgba(25,25,112,0.07)",
              boxShadow: "0 2px 8px rgba(25,25,112,0.05)",
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-black" style={{ color: "#191970" }}>
                  #{inv.invoiceNumber}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <User size={11} style={{ color: "rgba(25,25,112,0.35)" }} />
                  <span
                    className="text-xs font-medium"
                    style={{ color: "rgba(25,25,112,0.6)" }}
                  >
                    {inv.clientName || "Unnamed Client"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full"
                  style={
                    inv.status === "paid"
                      ? { background: "rgba(16,185,129,0.1)", color: "#059669" }
                      : {
                          background: "rgba(245,158,11,0.12)",
                          color: "#D97706",
                        }
                  }
                >
                  {inv.status === "paid" ? (
                    <CheckCircle2 size={9} />
                  ) : (
                    <Clock size={9} />
                  )}
                  {inv.status || "pending"}
                </span>
                <ActionMenu inv={inv} />
              </div>
            </div>

            <div
              className="flex items-center justify-between pt-3"
              style={{ borderTop: "1px solid rgba(25,25,112,0.06)" }}
            >
              <div className="flex items-center gap-1.5">
                <Calendar size={11} style={{ color: "rgba(25,25,112,0.3)" }} />
                <span
                  className="text-[11px]"
                  style={{ color: "rgba(25,25,112,0.45)" }}
                >
                  {inv.issueDate
                    ? new Date(inv.issueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—"}
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
