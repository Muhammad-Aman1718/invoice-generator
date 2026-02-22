"use client";

import { useInvoiceStore } from "@/lib/invoice-store";
import { LogoUpload } from "./logo-upload";
import { LineItemsTable } from "./line-items-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CURRENCIES, addDays } from "@/lib/invoice-utils";
import type { CurrencyCode } from "@/lib/invoice-types";
import { cn } from "@/lib/utils";

const TAX_LABELS = ["Tax", "VAT", "GST", "Sales Tax"];

export function InvoiceForm() {
  const store = useInvoiceStore();

  const setDueNet = (days: number) => {
    store.setField("dueDate", addDays(store.issueDate, days));
  };

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <section>
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base text-indigo-600">Branding & Business</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Company Logo</Label>
              <div className="mt-2"><LogoUpload value={store.logoDataUrl} onChange={store.setLogo} /></div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" value={store.businessName} onChange={(e) => store.setField("businessName", e.target.value)} placeholder="Your Company Inc." />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="businessAddress">Address</Label>
                <Input id="businessAddress" value={store.businessAddress} onChange={(e) => store.setField("businessAddress", e.target.value)} placeholder="123 Main St, City, Country" />
              </div>
              <div>
                <Label htmlFor="businessEmail">Email</Label>
                <Input id="businessEmail" type="email" value={store.businessEmail} onChange={(e) => store.setField("businessEmail", e.target.value)} placeholder="billing@company.com" />
              </div>
              <div>
                <Label htmlFor="businessPhone">Phone</Label>
                <Input id="businessPhone" type="tel" value={store.businessPhone} onChange={(e) => store.setField("businessPhone", e.target.value)} placeholder="+1 234 567 8900" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base text-indigo-600">Client Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="clientName">Client Name</Label>
              <Input id="clientName" value={store.clientName} onChange={(e) => store.setField("clientName", e.target.value)} placeholder="Client Company" />
            </div>
            <div>
              <Label htmlFor="clientAddress">Client Address</Label>
              <Input id="clientAddress" value={store.clientAddress} onChange={(e) => store.setField("clientAddress", e.target.value)} placeholder="Client address" />
            </div>
            <div>
              <Label htmlFor="clientEmail">Client Email</Label>
              <Input id="clientEmail" type="email" value={store.clientEmail} onChange={(e) => store.setField("clientEmail", e.target.value)} placeholder="client@example.com" />
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base text-indigo-600">Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="invoiceNumber">Invoice #</Label>
                <Input id="invoiceNumber" type="number" min={1} value={store.invoiceNumber} onChange={(e) => store.setField("invoiceNumber", parseInt(e.target.value, 10) || 1)} />
              </div>
              <div>
                <Label htmlFor="issueDate">Issue Date</Label>
                <Input id="issueDate" type="date" value={store.issueDate} onChange={(e) => store.setField("issueDate", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <div className="flex gap-2">
                  <Input id="dueDate" type="date" value={store.dueDate} onChange={(e) => store.setField("dueDate", e.target.value)} />
                  <div className="flex gap-1">
                    <Button type="button" variant="outline" size="sm" onClick={() => setDueNet(30)}>Net 30</Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => setDueNet(60)}>Net 60</Button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <select id="currency" value={store.currency} onChange={(e) => store.setField("currency", e.target.value as CurrencyCode)} className={cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring")}>
                {Object.entries(CURRENCIES).map(([code, { symbol, name }]) => (
                  <option key={code} value={code}>{symbol} - {name}</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base text-indigo-600">Line Items</CardTitle>
          </CardHeader>
          <CardContent><LineItemsTable currency={store.currency} /></CardContent>
        </Card>
      </section>

      <section>
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base text-indigo-600">Tax & Discount</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label>Tax Label</Label>
                <select value={store.tax.label} onChange={(e) => store.setField("tax", { ...store.tax, label: e.target.value })} className={cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring")}>
                  {TAX_LABELS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <Label>Tax Type</Label>
                <select value={store.tax.type} onChange={(e) => store.setField("tax", { ...store.tax, type: e.target.value as "percentage" | "fixed" })} className={cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring")}>
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
              <div>
                <Label>Tax Value</Label>
                <Input type="number" min={0} step={0.1} value={store.tax.value || ""} onChange={(e) => store.setField("tax", { ...store.tax, value: parseFloat(e.target.value) || 0 })} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label>Discount Label</Label>
                <Input value={store.discount.label} onChange={(e) => store.setField("discount", { ...store.discount, label: e.target.value })} placeholder="Discount" />
              </div>
              <div>
                <Label>Discount Type</Label>
                <select value={store.discount.type} onChange={(e) => store.setField("discount", { ...store.discount, type: e.target.value as "percentage" | "fixed" })} className={cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring")}>
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
              <div>
                <Label>Discount Value</Label>
                <Input type="number" min={0} step={0.1} value={store.discount.value || ""} onChange={(e) => store.setField("discount", { ...store.discount, value: parseFloat(e.target.value) || 0 })} />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base text-indigo-600">Payment & Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="paymentInstructions">Payment Instructions</Label>
              <textarea id="paymentInstructions" value={store.paymentInstructions} onChange={(e) => store.setField("paymentInstructions", e.target.value)} placeholder="Bank details, PayPal..." rows={3} className={cn("flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[80px]")} />
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <textarea id="notes" value={store.notes} onChange={(e) => store.setField("notes", e.target.value)} placeholder="Thank you for your business" rows={2} className={cn("flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[60px]")} />
            </div>
          </CardContent>
        </Card>
      </section>
    </form>
  );
}
