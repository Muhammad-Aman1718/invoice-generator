"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/src/lib/apiClient";
import { getErrorMessage } from "@/src/lib/utils";
import { showToast } from "@/src/utils/showToast";
import { STATUS_META } from "@/src/constant/invoice";
import { ROUTES } from "@/src/constant/routes";
import { buildPaymentReminder } from "@/src/lib/paymentReminder";
import type { InvoiceActions, InvoiceActionsOptions, InvoiceStatus, InvoiceSummary } from "@/src/types/types";

/** Run an async action with a loading toast and an error toast on failure. */
async function runWithToast(loadingMessage: string, action: () => Promise<void>, errorTitle: string) {
  const toastId = showToast.loading(loadingMessage);
  try {
    await action();
  } catch (error) {
    showToast.error(errorTitle, getErrorMessage(error));
  } finally {
    showToast.dismiss(toastId);
  }
}

/** Row actions for the invoice list (status, duplicate, PDF, reminder, delete with confirmation). */
export default function useInvoiceActions({ pdfBranding, earlyAccess, senderName }: InvoiceActionsOptions) {
  const router = useRouter();
  const [pendingDelete, setPendingDelete] = useState<InvoiceSummary | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const changeStatus = (invoice: InvoiceSummary, status: InvoiceStatus) =>
    runWithToast(
      `Updating #${invoice.invoiceNumber}…`,
      async () => {
        await api.invoices.update(invoice.id!, { status });
        showToast.success(
          "Status updated",
          `Invoice #${invoice.invoiceNumber} is now ${STATUS_META[status].label.toLowerCase()}.`,
        );
        router.refresh();
      },
      "Update failed",
    );

  const duplicate = (invoice: InvoiceSummary) =>
    runWithToast(
      `Duplicating #${invoice.invoiceNumber}…`,
      async () => {
        const { invoice: copy } = await api.invoices.duplicate(invoice.id!);
        showToast.success("Invoice duplicated");
        router.push(`${ROUTES.invoices}/${copy.id}`);
      },
      "Could not duplicate",
    );

  const download = (invoice: InvoiceSummary) =>
    runWithToast(
      `Preparing PDF for #${invoice.invoiceNumber}…`,
      async () => {
        const [{ invoice: full }, { downloadInvoicePdf }] = await Promise.all([
          api.invoices.get(invoice.id!),
          import("@/src/lib/pdfGenerator"),
        ]);
        await downloadInvoicePdf({ invoice: full, branding: pdfBranding });
      },
      "Download failed",
    );

  const copyReminder = async (invoice: InvoiceSummary) => {
    if (!earlyAccess) {
      showToast.info("Business early access", "Payment reminders are available on the Business plan.");
      return router.push(ROUTES.billing);
    }
    try {
      await navigator.clipboard.writeText(buildPaymentReminder({ invoice, senderName }));
      showToast.success("Reminder copied", "Paste it into an email to your client.");
    } catch (error) {
      showToast.error("Could not copy", getErrorMessage(error, "Clipboard access was blocked."));
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setIsDeleting(true);
    try {
      await api.invoices.remove(pendingDelete.id!);
      showToast.success("Deleted", `Invoice #${pendingDelete.invoiceNumber} was removed.`);
      setPendingDelete(null);
      router.refresh();
    } catch (error) {
      showToast.error("Delete failed", getErrorMessage(error));
    } finally {
      setIsDeleting(false);
    }
  };

  const actions: InvoiceActions = {
    onDownload: download,
    onDuplicate: duplicate,
    onStatusChange: changeStatus,
    onDelete: setPendingDelete,
    onCopyReminder: copyReminder,
    canCopyReminder: earlyAccess,
  };
  return { actions, pendingDelete, isDeleting, confirmDelete, cancelDelete: () => setPendingDelete(null) };
}
