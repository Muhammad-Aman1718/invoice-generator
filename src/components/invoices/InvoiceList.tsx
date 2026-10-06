"use client";

import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import InvoiceToolbar from "./InvoiceToolbar";
import InvoiceTable from "./InvoiceTable";
import InvoiceCardList from "./InvoiceCardList";
import EmptyState from "@/src/components/ui/EmptyState";
import Pagination from "@/src/components/ui/Pagination";
import ConfirmDialog from "@/src/components/ui/ConfirmDialog";
import useInvoiceList from "@/src/hooks/useInvoiceList";
import useInvoiceActions from "@/src/hooks/useInvoiceActions";
import { INVOICE_PAGE_SIZE } from "@/src/constant/app";
import { ROUTES } from "@/src/constant/routes";
import type { InvoiceListProps } from "@/src/types/types";

export default function InvoiceList({
  invoices,
  canExportCsv,
  hideCsvExport,
  pdfBranding,
  earlyAccess,
  senderName,
}: InvoiceListProps) {
  const list = useInvoiceList(invoices);
  const { actions, pendingDelete, isDeleting, confirmDelete, cancelDelete } = useInvoiceActions({
    pdfBranding,
    earlyAccess,
    senderName,
  });

  if (invoices.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No invoices yet"
        description="Create your first invoice and track payments in one place."
        action={
          <Link href={ROUTES.newInvoice} className="btn-primary">
            <Plus size={15} /> Create invoice
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      <InvoiceToolbar
        listQuery={list.listQuery}
        counts={list.counts}
        canExportCsv={canExportCsv}
        hideCsvExport={hideCsvExport}
        onChange={list.updateQuery}
      />
      {list.filtered.length === 0 ? (
        <div className="panel p-10 text-center text-sm text-navy-500">No invoices match your filters.</div>
      ) : (
        <>
          <InvoiceTable invoices={list.pageItems} actions={actions} />
          <InvoiceCardList invoices={list.pageItems} actions={actions} />
          <Pagination
            page={list.currentPage}
            pageCount={list.pageCount}
            total={list.filtered.length}
            pageSize={INVOICE_PAGE_SIZE}
            onPageChange={list.setPage}
          />
        </>
      )}
      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        loading={isDeleting}
        title={`Delete invoice #${pendingDelete?.invoiceNumber ?? ""}?`}
        description="This permanently removes the invoice. This action cannot be undone."
        confirmLabel="Delete invoice"
      />
    </div>
  );
}
