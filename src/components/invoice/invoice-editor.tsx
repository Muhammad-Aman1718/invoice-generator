"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Download,
  Edit3,
  Eye,
  Loader2,
  Save,
  SplitSquareHorizontal,
  Sparkles,
} from "lucide-react";
import { InvoiceForm } from "@/src/components/invoice/invoice-form";
import { InvoicePreview } from "@/src/components/invoice/invoice-preview";
import { Modal } from "@/src/components/ui/modal";
import { STATUS_LABELS } from "@/src/components/ui/status-badge";
import { api, ApiRequestError } from "@/src/lib/api-client";
import { isPristine, localISODate, useInvoiceStore } from "@/src/lib/invoice-store";
import { formatCurrency } from "@/src/lib/invoice-utils";
import { saveInvoiceToDb } from "@/src/lib/supabase/invoices-client";
import { cn } from "@/src/lib/utils";
import { showToast } from "@/src/utils/showToast";
import {
  INVOICE_STATUSES,
  type Client,
  type InvoiceStatus,
  type Profile,
  type Tab,
} from "@/src/types/invoice-types";

const DRAFT_BACKUP_KEY = "invoice-generator-draft-backup";

interface Props {
  mode: "new" | "edit";
  invoiceId?: string;
  clients: Client[];
  profile: Profile;
  pdfBranding: boolean;
}

export function InvoiceEditor({ mode, invoiceId, clients, profile, pdfBranding }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const store = useInvoiceStore();
  const [tab, setTab] = useState<Tab>("edit");
  const [showPreviewPanel, setShowPreviewPanel] = useState(true);
  const [ready, setReady] = useState(mode === "new");
  const [notFound, setNotFound] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [limitMessage, setLimitMessage] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const initialised = useRef(false);

  // ── Initialise the store ────────────────────────────────────────────────
  useEffect(() => {
    if (initialised.current) return;
    initialised.current = true;
    const state = useInvoiceStore.getState();

    if (mode === "new") {
      // Leftover from editing an existing invoice → start fresh.
      if (state.id) state.resetInvoice();
      const fresh = useInvoiceStore.getState();
      if (isPristine(fresh)) {
        fresh.loadInvoice({
          businessName: profile.companyName ?? fresh.businessName,
          bussinessInfo: profile.businessInfo ?? fresh.bussinessInfo,
          logoDataUrl: profile.logoDataUrl ?? fresh.logoDataUrl,
          currency: profile.defaultCurrency || fresh.currency,
          taxRate: profile.defaultTaxRate,
          notes: profile.defaultNotes ?? "",
          terms: profile.defaultTerms ?? "",
          issueDate: localISODate(),
          dueDate: localISODate(profile.paymentTermsDays),
          status: "pending",
        });
      }
      const preset = clients.find((c) => c.id === searchParams.get("client"));
      if (preset) {
        const s = useInvoiceStore.getState();
        s.setField("clientId", preset.id);
        s.setField("clientName", preset.name);
        s.setField(
          "clientAddress",
          [preset.address, preset.email, preset.phone, preset.taxId && `Tax ID: ${preset.taxId}`]
            .filter(Boolean)
            .join("\n"),
        );
      }
      api.invoices
        .nextNumber()
        .then(({ next }) => useInvoiceStore.getState().setField("invoiceNumber", next))
        .catch(() => {});
      if (searchParams.get("action") === "save_pending") {
        showToast.info("Welcome!", "Your invoice draft is ready — click Save to store it.");
      }
      return;
    }

    // Edit: keep any unsaved "new invoice" draft so it survives this visit.
    if (!state.id && !isPristine(state)) {
      try {
        sessionStorage.setItem(DRAFT_BACKUP_KEY, JSON.stringify(state));
      } catch {}
    }
    api.invoices
      .get(invoiceId!)
      .then(({ invoice }) => {
        useInvoiceStore.getState().loadInvoice(invoice);
        setReady(true);
        if (searchParams.get("download") === "1") void download();
      })
      .catch(() => setNotFound(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Restore the backed-up draft when leaving the edit screen.
  useEffect(() => {
    if (mode !== "edit") return;
    return () => {
      const s = useInvoiceStore.getState();
      s.resetInvoice();
      try {
        const backup = sessionStorage.getItem(DRAFT_BACKUP_KEY);
        if (backup) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id, ...data } = JSON.parse(backup);
          s.loadInvoice(data);
          sessionStorage.removeItem(DRAFT_BACKUP_KEY);
        }
      } catch {}
    };
  }, [mode]);

  // Track unsaved changes once the invoice is ready.
  useEffect(() => {
    if (!ready) return;
    const unsub = useInvoiceStore.subscribe((state) =>
      setDirty(mode === "edit" || !isPristine(state)),
    );
    return unsub;
  }, [ready, mode]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const download = useCallback(async () => {
    setIsDownloading(true);
    try {
      const { buildInvoiceData, generateInvoicePDF } = await import("@/src/lib/pdf-generator");
      await generateInvoicePDF(buildInvoiceData(useInvoiceStore.getState()), { branding: pdfBranding });
    } catch (err) {
      console.error(err);
      showToast.error("Download failed", "Could not generate the PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }, [pdfBranding]);

  const handleSave = async () => {
    const state = useInvoiceStore.getState();
    if (!state.clientName.trim()) {
      showToast.warning("Client required", "Add who this invoice is for under “Bill To”.");
      setTab("edit");
      document.getElementById("clientName")?.focus();
      return;
    }
    setIsSaving(true);
    try {
      const result = await saveInvoiceToDb(mode === "edit" ? { ...state, id: invoiceId } : { ...state, id: undefined });
      setDirty(false);
      if (mode === "new") {
        showToast.success("Invoice saved", `Invoice #${state.invoiceNumber} was created.`);
        state.resetInvoice();
        router.push(`/dashboard/invoices/${result.id}`);
      } else {
        showToast.success("Changes saved");
        router.refresh();
      }
    } catch (err) {
      if (err instanceof ApiRequestError && err.code === "PLAN_LIMIT") {
        setLimitMessage(err.message);
      } else {
        showToast.error("Save failed", err instanceof Error ? err.message : undefined);
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (notFound) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 p-6 text-center">
        <h1 className="text-xl font-black text-navy">Invoice not found</h1>
        <p className="text-sm text-navy-500">It may have been deleted, or it belongs to another account.</p>
        <Link href="/dashboard/invoices" className="btn-primary">
          Back to invoices
        </Link>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="flex h-[calc(100dvh-3.5rem)] flex-col items-center justify-center gap-3 lg:h-[100dvh]">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy">
          <Loader2 size={20} className="animate-spin text-gold" />
        </div>
        <p className="text-sm font-bold text-navy-500">Loading invoice…</p>
      </div>
    );
  }

  const title = mode === "new" ? "New invoice" : `Invoice #${store.invoiceNumber}`;

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] w-full flex-col overflow-hidden lg:h-[100dvh]">
      {/* Toolbar */}
      <div className="z-30 flex-shrink-0 border-b border-navy/10 bg-white">
        <div className="flex items-center justify-between gap-2 px-3 py-2.5 sm:px-5">
          <div className="flex min-w-0 items-center gap-2">
            <Link
              href="/dashboard/invoices"
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-mist text-navy transition hover:bg-mist-dark"
              aria-label="Back to invoices"
            >
              <ArrowLeft size={16} />
            </Link>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-black text-navy sm:text-base">{title}</h1>
              <p className="hidden text-[11px] font-medium text-navy-500 xs:block">
                {dirty ? "Unsaved changes" : mode === "new" ? "Draft" : "All changes saved"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <label htmlFor="invoice-status" className="sr-only">
              Status
            </label>
            <select
              id="invoice-status"
              value={store.status}
              onChange={(e) => store.setField("status", e.target.value as InvoiceStatus)}
              className="hidden h-9 cursor-pointer rounded-xl border border-navy/10 bg-white px-2.5 text-xs font-bold text-navy outline-none focus:border-gold sm:block"
            >
              {INVOICE_STATUSES.filter((s) => s !== "overdue").map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowPreviewPanel((p) => !p)}
              aria-pressed={showPreviewPanel}
              className={cn(
                "btn-outline btn-sm hidden h-9 lg:inline-flex",
                showPreviewPanel && "border-gold bg-gold/10",
              )}
            >
              <SplitSquareHorizontal size={14} /> Preview
            </button>
            <button
              onClick={download}
              disabled={isDownloading}
              className="btn-outline btn-sm h-9"
              aria-label="Download PDF"
            >
              {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
              <span className="hidden sm:inline">PDF</span>
            </button>
            <button onClick={handleSave} disabled={isSaving} className="btn-primary btn-sm h-9" aria-label="Save invoice">
              {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              <span className="hidden xs:inline">Save</span>
            </button>
          </div>
        </div>

        {/* Mobile: status + edit/preview tabs */}
        <div className="flex items-center gap-2 px-3 pb-2.5 lg:hidden">
          <select
            aria-label="Status"
            value={store.status}
            onChange={(e) => store.setField("status", e.target.value as InvoiceStatus)}
            className="h-9 cursor-pointer rounded-xl border border-navy/10 bg-white px-2 text-xs font-bold text-navy outline-none sm:hidden"
          >
            {INVOICE_STATUSES.filter((s) => s !== "overdue").map((s) => (
              <option key={s} value={s}>
                {STATUS_LABELS[s]}
              </option>
            ))}
          </select>
          <div className="flex flex-1 rounded-xl bg-mist p-0.5" role="tablist">
            {(["edit", "preview"] as Tab[]).map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-black capitalize transition",
                  tab === t ? "bg-navy text-white" : "text-navy-500",
                )}
              >
                {t === "edit" ? <Edit3 size={12} /> : <Eye size={12} />} {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Workspace */}
      <div className="relative flex min-h-0 flex-1">
        <div
          className={cn(
            "custom-scrollbar h-full flex-1 overflow-y-auto",
            tab === "edit" ? "block" : "hidden lg:block",
          )}
        >
          <div className="mx-auto max-w-3xl p-3 pb-24 sm:p-6 lg:p-8">
            <InvoiceForm clients={clients} />
          </div>
        </div>

        <div
          className={cn(
            "custom-scrollbar h-full flex-1 overflow-y-auto border-l border-navy/5 bg-mist-dark",
            tab === "preview" ? "block" : showPreviewPanel ? "hidden lg:block" : "hidden",
          )}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-navy/5 bg-mist-dark/90 px-5 py-3 backdrop-blur">
            <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-navy-500">
              <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_8px_rgba(255,193,7,0.8)]" />
              Live preview
            </span>
            <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[11px] font-black text-navy">
              {formatCurrency(store.totalAmount, store.currency)}
            </span>
          </div>
          <div className="p-3 sm:p-6 xl:p-10">
            <div className="relative mx-auto max-w-[800px] overflow-x-auto rounded-xl bg-white shadow-2xl shadow-navy/10">
              <InvoicePreview id={`invoice-preview-${mode}`} />
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={!!limitMessage}
        onClose={() => setLimitMessage(null)}
        title="You've reached your plan limit"
        description={limitMessage ?? ""}
        footer={
          <>
            <button className="btn-outline" onClick={() => setLimitMessage(null)}>
              Not now
            </button>
            <Link href="/dashboard/billing" className="btn-primary">
              <Sparkles size={15} /> See plans
            </Link>
          </>
        }
      >
        <p className="pb-2 text-sm text-navy-500">
          Your draft is kept on this device, so nothing is lost. Upgrade to save it now, or download it as a PDF.
        </p>
      </Modal>
    </div>
  );
}
