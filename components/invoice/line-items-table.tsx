"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInvoiceStore } from "@/lib/invoice-store";
import { calculateLineItemAmount, formatCurrency } from "@/lib/invoice-utils";
import type { CurrencyCode } from "@/types/invoice-types";

interface LineItemsTableProps {
  currency?: CurrencyCode;
}

export function LineItemsTable({ currency }: LineItemsTableProps) {
  const { lineItems, addLineItem, removeLineItem, updateLineItem } = useInvoiceStore();

  const handleQtyChange = (id: string, v: string) => {
    const q = parseFloat(v) || 0;
    updateLineItem(id, "quantity", q);
    const item = lineItems.find((i) => i.id === id);
    if (item) updateLineItem(id, "amount", calculateLineItemAmount(q, item.rate));
  };

  const handleRateChange = (id: string, v: string) => {
    const r = parseFloat(v) || 0;
    updateLineItem(id, "rate", r);
    const item = lineItems.find((i) => i.id === id);
    if (item) updateLineItem(id, "amount", calculateLineItemAmount(item.quantity, r));
  };

  const canRemove = lineItems.length > 1;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold">Line Items</h3>
        <Button type="button" variant="outline" size="sm" onClick={addLineItem} className="border-indigo-200 text-indigo-600">
          <Plus className="h-4 w-4 mr-1" /> Add Item
        </Button>
      </div>
      <div className="rounded-lg border border-slate-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left p-2 font-medium">Description</th>
              <th className="text-right p-2 w-20 font-medium">Qty</th>
              <th className="text-right p-2 w-24 font-medium">Rate</th>
              <th className="text-right p-2 w-28 font-medium">Amount</th>
              <th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {lineItems.map((item) => (
              <tr key={item.id} className="border-b border-slate-100 last:border-0">
                <td className="p-2">
                  <Input value={item.description} onChange={(e) => updateLineItem(item.id, "description", e.target.value)} placeholder="Item description" className="border-0 bg-transparent h-8 min-w-[140px] focus-visible:ring-0" />
                </td>
                <td className="p-2 text-right">
                  <Input type="number" min={0} value={item.quantity || ""} onChange={(e) => handleQtyChange(item.id, e.target.value)} className="h-8 w-full text-right border-0 bg-transparent focus-visible:ring-0" />
                </td>
                <td className="p-2 text-right">
                  <Input type="number" min={0} step={0.01} value={item.rate || ""} onChange={(e) => handleRateChange(item.id, e.target.value)} className="h-8 w-full text-right border-0 bg-transparent focus-visible:ring-0" />
                </td>
                <td className="p-2 text-right font-medium tabular-nums">{formatCurrency(item.amount, currency!)}</td>
                <td className="p-2">
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeLineItem(item.id)} disabled={!canRemove} aria-label="Remove">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
