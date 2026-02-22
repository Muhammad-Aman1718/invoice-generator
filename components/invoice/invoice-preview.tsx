"use client";

import { useMemo } from "react";
import { useInvoiceStore } from "@/lib/invoice-store";
import { formatCurrency, calculateSubtotal, calculateTaxAmount, calculateDiscountAmount, calculateGrandTotal } from "@/lib/invoice-utils";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface InvoicePreviewProps {
  className?: string;
  id?: string;
}

export function InvoicePreview({ className, id = "invoice-preview" }: InvoicePreviewProps) {
  const store = useInvoiceStore();
  const subtotal = useMemo(() => calculateSubtotal(store.lineItems), [store.lineItems]);
  const taxAmount = useMemo(() => calculateTaxAmount(subtotal, store.tax), [subtotal, store.tax]);
  const discountAmount = useMemo(() => calculateDiscountAmount(subtotal, store.discount), [subtotal, store.discount]);
  const grandTotal = useMemo(() => calculateGrandTotal(subtotal, store.tax, store.discount), [subtotal, store.tax, store.discount]);
  const currency = store.currency;

  return (
    <article id={id} className={cn("bg-white rounded-lg shadow-md border border-slate-200 p-6 md:p-8 max-w-[210mm]", className)}>
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 mb-8 pb-6 border-b border-slate-200">
        <div className="flex items-start gap-4">
          {store.logoDataUrl && <img src={store.logoDataUrl} alt="Logo" className="h-14 object-contain max-w-[120px]" />}
          <div>
            {store.businessName && <h2 className="text-lg font-semibold">{store.businessName}</h2>}
            {store.businessAddress && <p className="text-sm text-slate-500 mt-1 whitespace-pre-line">{store.businessAddress}</p>}
            {store.businessEmail && <p className="text-sm text-slate-500">{store.businessEmail}</p>}
            {store.businessPhone && <p className="text-sm text-slate-500">{store.businessPhone}</p>}
          </div>
        </div>
        <div className="text-right">
          <h1 className="text-2xl font-bold text-indigo-600">INVOICE</h1>
          <p className="text-sm mt-2 font-medium">#{store.invoiceNumber}</p>
          {store.issueDate && <p className="text-sm text-slate-500">Issue: {format(new Date(store.issueDate), "MMM d, yyyy")}</p>}
          {store.dueDate && <p className="text-sm text-slate-500">Due: {format(new Date(store.dueDate), "MMM d, yyyy")}</p>}
        </div>
      </header>
      <section className="mb-8">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Bill To</h3>
        {store.clientName && <p className="font-medium">{store.clientName}</p>}
        {store.clientAddress && <p className="text-sm text-slate-500 whitespace-pre-line">{store.clientAddress}</p>}
        {store.clientEmail && <p className="text-sm text-slate-500">{store.clientEmail}</p>}
      </section>
      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-indigo-200">
              <th className="text-left py-3 px-2 font-semibold">Description</th>
              <th className="text-right py-3 px-2 font-semibold w-20">Qty</th>
              <th className="text-right py-3 px-2 font-semibold w-24">Rate</th>
              <th className="text-right py-3 px-2 font-semibold w-28">Amount</th>
            </tr>
          </thead>
          <tbody>
            {store.lineItems.map((item) => (
              <tr key={item.id} className="border-b border-slate-100">
                <td className="py-3 px-2">{item.description || "—"}</td>
                <td className="py-3 px-2 text-right tabular-nums">{item.quantity}</td>
                <td className="py-3 px-2 text-right tabular-nums">{formatCurrency(item.rate, currency)}</td>
                <td className="py-3 px-2 text-right tabular-nums font-medium">{formatCurrency(item.amount, currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-end">
        <div className="w-full max-w-[280px] space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Subtotal</span>
            <span className="tabular-nums font-medium">{formatCurrency(subtotal, currency)}</span>
          </div>
          {taxAmount > 0 && (
            <div className="flex justify-between">
              <span className="text-slate-500">{store.tax.label}{store.tax.type === "percentage" ? ` (${store.tax.value}%)` : ""}</span>
              <span className="tabular-nums font-medium">{formatCurrency(taxAmount, currency)}</span>
            </div>
          )}
          {discountAmount > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>{store.discount.label}{store.discount.type === "percentage" ? ` (${store.discount.value}%)` : ""}</span>
              <span className="tabular-nums font-medium">-{formatCurrency(discountAmount, currency)}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t-2 border-indigo-200 font-semibold text-base">
            <span>Grand Total</span>
            <span className="tabular-nums text-indigo-600">{formatCurrency(grandTotal, currency)}</span>
          </div>
        </div>
      </div>
      {(store.paymentInstructions || store.notes) && (
        <footer className="mt-8 pt-6 border-t border-slate-200 space-y-3 text-sm text-slate-500">
          {store.paymentInstructions && <div><h4 className="font-medium text-slate-700 mb-1">Payment Instructions</h4><p className="whitespace-pre-line">{store.paymentInstructions}</p></div>}
          {store.notes && <div><h4 className="font-medium text-slate-700 mb-1">Notes</h4><p className="whitespace-pre-line">{store.notes}</p></div>}
        </footer>
      )}
    </article>
  );
}
