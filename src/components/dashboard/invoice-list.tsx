"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDownUp,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Download,
  FileDown,
  FileText,
  Lock,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/src/components/ui/modal";
import { EmptyState } from "@/src/components/ui/page-header";
import { STATUS_LABELS, StatusBadge } from "@/src/components/ui/status-badge";
import { api, ApiRequestError } from "@/src/lib/api-client";
import { formatCurrency } from "@/src/lib/invoice-utils";
import { displayStatus } from "@/src/lib/mappers";
import { cn } from "@/src/lib/utils";
import { showToast } from "@/src/utils/showToast";
import type { InvoiceStatus, InvoiceSummary } from "@/src/types/invoice-types";

const PAGE_SIZE = 10;
const FILTERS: ("all" | InvoiceStatus)[] = ["all", "pending", "overdue", "paid", "draft", "cancelled"];
type SortKey = "newest" | "oldest" | "amount-desc" | "amount-asc" | "due";

function shortDate(value?: string) {
  if (!value) return "—";
  const d = new Date(`${value.slice(0, 10)}T00:00:00`);
  return Number.isNaN(d.getTime())
    ? value
    : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

interface Props {
  invoices: InvoiceSummary[];
  canExportCsv: boolean;
  pdfBranding: boolean;
}

export function InvoiceList({ invoices, canExportCsv, pdfBranding }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState<InvoiceSummary | null>(null);
  const [busy, setBusy] = useState(false);

  const rows = useMemo(
    () => invoices.map((inv) => ({ ...inv, shown: displayStatus(inv.status, inv.dueDate) })),
    [invoices],
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: rows.length };
    rows.forEach((r) => (c[r.shown] = (c[r.shown] ?? 0) + 1));
    return c;
  }, [rows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = rows.filter(
      (r) =>
        (filter === "all" || r.shown === filter) &&
        (!q || r.clientName.toLowerCase().includes(q) || String(r.invoiceNumber).includes(q)),
    );
    const sorters: Record<SortKey, (a: (typeof list)[0], b: (typeof list)[0]) => number> = {
      newest: (a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""),
      oldest: (a, b) => (a.createdAt ?? "").localeCompare(b.createdAt ?? ""),
      "amount-desc": (a, b) => b.totalAmount - a.totalAmount,
      "amount-asc": (a, b) => a.totalAmount - b.totalAmount,
      due: (a, b) => (a.dueDate || "9999").localeCompare(b.dueDate || "9999"),
    };
    return [...list].sort(sorters[sort]);
  }, [rows, query, filter, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const changeStatus = async (inv: InvoiceSummary, status: InvoiceStatus) => {
    const toastId = showToast.loading(`Updating #${inv.invoiceNumber}…`);
    try {
      await api.invoices.update(inv.id!, { status });
      showToast.dismiss(toastId);
      showToast.success("Status updated", `Invoice #${inv.invoiceNumber} is now ${STATUS_LABELS[status].toLowerCase()}.`);
      router.refresh();
    } catch (err) {
      showToast.dismiss(toastId);
      showToast.error("Update failed", err instanceof Error ? err.message : undefined);
    }
  };

  const duplicate = async (inv: InvoiceSummary) => {
    const toastId = showToast.loading(`Duplicating #${inv.invoiceNumber}…`);
    try {
      const { invoice } = await api.invoices.duplicate(inv.id!);
      showToast.dismiss(toastId);
      showToast.success("Invoice duplicated");
      router.push(`/dashboard/invoices/${invoice.id}`);
    } catch (err) {
      showToast.dismiss(toastId);
      const msg = err instanceof Error ? err.message : undefined;
      showToast.error("Could not duplicate", msg);
    }
  };

  const download = async (inv: InvoiceSummary) => {
    const toastId = showToast.loading(`Preparing PDF for #${inv.invoiceNumber}…`);
    try {
      const [{ invoice }, pdf] = await Promise.all([
        api.invoices.get(inv.id!),
        import("@/src/lib/pdf-generator"),
      ]);
      await pdf.generateInvoicePDF(pdf.buildInvoiceData(invoice), { branding: pdfBranding });
      showToast.dismiss(toastId);
    } catch (err) {
      showToast.dismiss(toastId);
      showToast.error("Download failed", err instanceof Error ? err.message : undefined);
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setBusy(true);
    try {
      await api.invoices.remove(pendingDelete.id!);
      showToast.success("Deleted", `Invoice #${pendingDelete.invoiceNumber} was removed.`);
      setPendingDelete(null);
      router.refresh();
    } catch (err) {
      showToast.error("Delete failed", err instanceof ApiRequestError ? err.message : undefined);
    } finally {
      setBusy(false);
    }
  };

  const ActionMenu = ({ inv }: { inv: (typeof rows)[0] }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg text-navy-400 transition hover:bg-navy/5 hover:text-navy"
          aria-label={`Actions for invoice ${inv.invoiceNumber}`}
        >
          <MoreHorizontal size={16} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={6} className="w-52 rounded-2xl border-navy/10 p-1.5 shadow-lift">
        <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-navy-500">
          Invoice #{inv.invoiceNumber}
        </DropdownMenuLabel>
        <DropdownMenuItem asChild className="cursor-pointer rounded-xl text-xs font-semibold text-navy">
          <Link href={`/dashboard/invoices/${inv.id}`}>
            <Pencil size={13} /> Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => download(inv)} className="cursor-pointer rounded-xl text-xs font-semibold text-navy">
          <Download size={13} /> Download PDF
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => duplicate(inv)} className="cursor-pointer rounded-xl text-xs font-semibold text-navy">
          <Copy size={13} /> Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-navy-500">
          Set status
        </DropdownMenuLabel>
        {(
          [
            ["paid", CheckCircle2, "text-emerald-600"],
            ["pending", Clock, "text-amber-600"],
            ["cancelled", XCircle, "text-slate-500"],
          ] as const
        ).map(([status, Icon, tone]) => (
          <DropdownMenuItem
            key={status}
            disabled={inv.status === status}
            onSelect={() => changeStatus(inv, status)}
            className="cursor-pointer rounded-xl text-xs font-semibold text-navy"
          >
            <Icon size={13} className={tone} /> Mark as {STATUS_LABELS[status].toLowerCase()}
            {inv.status === status && <span className="ml-auto text-[10px] text-navy-400">Current</span>}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => setPendingDelete(inv)}
          className="cursor-pointer rounded-xl text-xs font-semibold text-red-600 focus:bg-red-50 focus:text-red-700"
        >
          <Trash2 size={13} /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  if (invoices.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No invoices yet"
        description="Create your first invoice and track payments in one place."
        action={
          <Link href="/dashboard/invoices/new" className="btn-primary">
            <Plus size={15} /> Create invoice
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="custom-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1" role="tablist" aria-label="Filter by status">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => {
                setFilter(f);
                setPage(1);
              }}
              className={cn(
                "flex flex-shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold capitalize transition",
                filter === f ? "bg-navy text-white" : "bg-white text-navy-500 hover:text-navy",
              )}
            >
              {f === "all" ? "All" : STATUS_LABELS[f]}
              <span className={cn("rounded-full px-1.5 text-[10px]", filter === f ? "bg-gold text-navy" : "bg-mist")}>
                {counts[f] ?? 0}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2 xs:flex-row">
          <div className="relative flex-1 lg:w-64">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" aria-hidden="true" />
            <label htmlFor="invoice-search" className="sr-only">
              Search invoices
            </label>
            <input
              id="invoice-search"
              className="input pl-9"
              placeholder="Search client or #"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <div className="relative">
            <ArrowDownUp size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
            <label htmlFor="invoice-sort" className="sr-only">
              Sort invoices
            </label>
            <select
              id="invoice-sort"
              className="input cursor-pointer pl-8 pr-8"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="due">Due date</option>
              <option value="amount-desc">Amount: high → low</option>
              <option value="amount-asc">Amount: low → high</option>
            </select>
          </div>
          {canExportCsv ? (
            <a href="/api/invoices/export" className="btn-outline" download>
              <FileDown size={15} /> CSV
            </a>
          ) : (
            <Link href="/dashboard/billing" className="btn-outline" title="CSV export is a Pro feature">
              <Lock size={14} /> CSV
            </Link>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="panel p-10 text-center text-sm text-navy-500">No invoices match your filters.</div>
      ) : (
        <>
          {/* Desktop table */}
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
                  {visible.map((inv) => (
                    <tr key={inv.id} className="transition hover:bg-gold/[0.04]">
                      <td className="px-5 py-3.5">
                        <Link href={`/dashboard/invoices/${inv.id}`} className="font-black text-navy hover:underline">
                          #{inv.invoiceNumber}
                        </Link>
                      </td>
                      <td className="max-w-[220px] truncate px-4 py-3.5 font-semibold text-navy">
                        {inv.clientName || "Unnamed client"}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-navy-500">{shortDate(inv.issueDate)}</td>
                      <td className={cn("px-4 py-3.5 text-xs", inv.shown === "overdue" ? "font-bold text-red-600" : "text-navy-500")}>
                        {shortDate(inv.dueDate)}
                      </td>
                      <td className="px-4 py-3.5 text-right font-black tabular-nums text-navy">
                        {formatCurrency(inv.totalAmount, inv.currency)}
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <StatusBadge status={inv.shown} />
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <ActionMenu inv={inv} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <ul className="space-y-3 md:hidden">
            {visible.map((inv) => (
              <li key={inv.id} className="panel p-4">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <Link href={`/dashboard/invoices/${inv.id}`} className="min-w-0">
                    <p className="font-black text-navy">#{inv.invoiceNumber}</p>
                    <p className="truncate text-xs font-medium text-navy-500">{inv.clientName || "Unnamed client"}</p>
                  </Link>
                  <div className="flex items-center gap-1">
                    <StatusBadge status={inv.shown} />
                    <ActionMenu inv={inv} />
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-navy/[0.06] pt-3">
                  <span className={cn("text-xs", inv.shown === "overdue" ? "font-bold text-red-600" : "text-navy-500")}>
                    Due {shortDate(inv.dueDate)}
                  </span>
                  <span className="rounded-xl bg-gold/[0.12] px-2.5 py-1 text-sm font-black tabular-nums text-navy">
                    {formatCurrency(inv.totalAmount, inv.currency)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="flex items-center justify-between text-xs font-semibold text-navy-500">
            <span>
              Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of{" "}
              {filtered.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                className="btn-outline btn-sm"
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="px-2">
                {currentPage} / {pageCount}
              </span>
              <button
                className="btn-outline btn-sm"
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage === pageCount}
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        onClose={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
        loading={busy}
        title={`Delete invoice #${pendingDelete?.invoiceNumber ?? ""}?`}
        description="This permanently removes the invoice. This action cannot be undone."
        confirmLabel="Delete invoice"
      />
    </div>
  );
}
