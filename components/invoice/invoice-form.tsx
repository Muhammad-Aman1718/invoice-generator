// "use client";

// import { useInvoiceStore } from "@/lib/invoice-store";
// import { LogoUpload } from "./logo-upload";
// import { LineItemsTable } from "./line-items-table";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { CURRENCIES, addDays } from "@/lib/invoice-utils";
// import type { CurrencyCode } from "@/lib/invoice-types";
// import { cn } from "@/lib/utils";

// const TAX_LABELS = ["Tax", "VAT", "GST", "Sales Tax"];

// export function InvoiceForm() {
//   const store = useInvoiceStore();

//   const setDueNet = (days: number) => {
//     store.setField("dueDate", addDays(store.issueDate, days));
//   };

//   return (
//     <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
//       <section>
//         <Card className="border-slate-200 shadow-sm">
//           <CardHeader>
//             <CardTitle className="text-base text-indigo-600">Branding & Business</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div>
//               <Label>Company Logo</Label>
//               <div className="mt-2"><LogoUpload value={store.logoDataUrl} onChange={store.setLogo} /></div>
//             </div>
//             <div className="grid gap-4 sm:grid-cols-2">
//               <div className="sm:col-span-2">
//                 <Label htmlFor="businessName">Business Name</Label>
//                 <Input id="businessName" value={store.businessName} onChange={(e) => store.setField("businessName", e.target.value)} placeholder="Your Company Inc." />
//               </div>
//               <div className="sm:col-span-2">
//                 <Label htmlFor="businessAddress">Address</Label>
//                 <Input id="businessAddress" value={store.businessAddress} onChange={(e) => store.setField("businessAddress", e.target.value)} placeholder="123 Main St, City, Country" />
//               </div>
//               <div>
//                 <Label htmlFor="businessEmail">Email</Label>
//                 <Input id="businessEmail" type="email" value={store.businessEmail} onChange={(e) => store.setField("businessEmail", e.target.value)} placeholder="billing@company.com" />
//               </div>
//               <div>
//                 <Label htmlFor="businessPhone">Phone</Label>
//                 <Input id="businessPhone" type="tel" value={store.businessPhone} onChange={(e) => store.setField("businessPhone", e.target.value)} placeholder="+1 234 567 8900" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </section>

//       <section>
//         <Card className="border-slate-200 shadow-sm">
//           <CardHeader>
//             <CardTitle className="text-base text-indigo-600">Client Details</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div>
//               <Label htmlFor="clientName">Client Name</Label>
//               <Input id="clientName" value={store.clientName} onChange={(e) => store.setField("clientName", e.target.value)} placeholder="Client Company" />
//             </div>
//             <div>
//               <Label htmlFor="clientAddress">Client Address</Label>
//               <Input id="clientAddress" value={store.clientAddress} onChange={(e) => store.setField("clientAddress", e.target.value)} placeholder="Client address" />
//             </div>
//             <div>
//               <Label htmlFor="clientEmail">Client Email</Label>
//               <Input id="clientEmail" type="email" value={store.clientEmail} onChange={(e) => store.setField("clientEmail", e.target.value)} placeholder="client@example.com" />
//             </div>
//           </CardContent>
//         </Card>
//       </section>

//       <section>
//         <Card className="border-slate-200 shadow-sm">
//           <CardHeader>
//             <CardTitle className="text-base text-indigo-600">Invoice Details</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid gap-4 sm:grid-cols-3">
//               <div>
//                 <Label htmlFor="invoiceNumber">Invoice #</Label>
//                 <Input id="invoiceNumber" type="number" min={1} value={store.invoiceNumber} onChange={(e) => store.setField("invoiceNumber", parseInt(e.target.value, 10) || 1)} />
//               </div>
//               <div>
//                 <Label htmlFor="issueDate">Issue Date</Label>
//                 <Input id="issueDate" type="date" value={store.issueDate} onChange={(e) => store.setField("issueDate", e.target.value)} />
//               </div>
//               <div>
//                 <Label htmlFor="dueDate">Due Date</Label>
//                 <div className="flex gap-2">
//                   <Input id="dueDate" type="date" value={store.dueDate} onChange={(e) => store.setField("dueDate", e.target.value)} />
//                   <div className="flex gap-1">
//                     <Button type="button" variant="outline" size="sm" onClick={() => setDueNet(30)}>Net 30</Button>
//                     <Button type="button" variant="outline" size="sm" onClick={() => setDueNet(60)}>Net 60</Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div>
//               <Label htmlFor="currency">Currency</Label>
//               <select id="currency" value={store.currency} onChange={(e) => store.setField("currency", e.target.value as CurrencyCode)} className={cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring")}>
//                 {Object.entries(CURRENCIES).map(([code, { symbol, name }]) => (
//                   <option key={code} value={code}>{symbol} - {name}</option>
//                 ))}
//               </select>
//             </div>
//           </CardContent>
//         </Card>
//       </section>

//       <section>
//         <Card className="border-slate-200 shadow-sm">
//           <CardHeader>
//             <CardTitle className="text-base text-indigo-600">Line Items</CardTitle>
//           </CardHeader>
//           <CardContent><LineItemsTable currency={store.currency} /></CardContent>
//         </Card>
//       </section>

//       <section>
//         <Card className="border-slate-200 shadow-sm">
//           <CardHeader>
//             <CardTitle className="text-base text-indigo-600">Tax & Discount</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid gap-4 sm:grid-cols-3">
//               <div>
//                 <Label>Tax Label</Label>
//                 <select value={store.tax.label} onChange={(e) => store.setField("tax", { ...store.tax, label: e.target.value })} className={cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring")}>
//                   {TAX_LABELS.map((l) => <option key={l} value={l}>{l}</option>)}
//                 </select>
//               </div>
//               <div>
//                 <Label>Tax Type</Label>
//                 <select value={store.tax.type} onChange={(e) => store.setField("tax", { ...store.tax, type: e.target.value as "percentage" | "fixed" })} className={cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring")}>
//                   <option value="percentage">Percentage (%)</option>
//                   <option value="fixed">Fixed Amount</option>
//                 </select>
//               </div>
//               <div>
//                 <Label>Tax Value</Label>
//                 <Input type="number" min={0} step={0.1} value={store.tax.value || ""} onChange={(e) => store.setField("tax", { ...store.tax, value: parseFloat(e.target.value) || 0 })} />
//               </div>
//             </div>
//             <div className="grid gap-4 sm:grid-cols-3">
//               <div>
//                 <Label>Discount Label</Label>
//                 <Input value={store.discount.label} onChange={(e) => store.setField("discount", { ...store.discount, label: e.target.value })} placeholder="Discount" />
//               </div>
//               <div>
//                 <Label>Discount Type</Label>
//                 <select value={store.discount.type} onChange={(e) => store.setField("discount", { ...store.discount, type: e.target.value as "percentage" | "fixed" })} className={cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring")}>
//                   <option value="percentage">Percentage (%)</option>
//                   <option value="fixed">Fixed Amount</option>
//                 </select>
//               </div>
//               <div>
//                 <Label>Discount Value</Label>
//                 <Input type="number" min={0} step={0.1} value={store.discount.value || ""} onChange={(e) => store.setField("discount", { ...store.discount, value: parseFloat(e.target.value) || 0 })} />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </section>

//       <section>
//         <Card className="border-slate-200 shadow-sm">
//           <CardHeader>
//             <CardTitle className="text-base text-indigo-600">Payment & Notes</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div>
//               <Label htmlFor="paymentInstructions">Payment Instructions</Label>
//               <textarea id="paymentInstructions" value={store.paymentInstructions} onChange={(e) => store.setField("paymentInstructions", e.target.value)} placeholder="Bank details, PayPal..." rows={3} className={cn("flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[80px]")} />
//             </div>
//             <div>
//               <Label htmlFor="notes">Notes</Label>
//               <textarea id="notes" value={store.notes} onChange={(e) => store.setField("notes", e.target.value)} placeholder="Thank you for your business" rows={2} className={cn("flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[60px]")} />
//             </div>
//           </CardContent>
//         </Card>
//       </section>
//     </form>
//   );
// }






"use client";

import { useInvoiceStore } from "@/lib/invoice-store";
import { LogoUpload } from "./logo-upload";
import { LineItemsTable } from "./line-items-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CURRENCIES } from "@/lib/invoice-utils";
import type { CurrencyCode } from "@/lib/invoice-types";
import { cn } from "@/lib/utils";

export function InvoiceForm() {
  const store = useInvoiceStore();

  return (
    <form className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 space-y-8" onSubmit={(e) => e.preventDefault()}>
      
      {/* Header Section: Logo & Invoice Title */}
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="w-full md:w-1/3">
          <LogoUpload value={store.logoDataUrl} onChange={store.setLogo} />
        </div>
        <div className="text-right space-y-2">
          <h1 className="text-4xl font-light text-[#111827] uppercase tracking-tight">Invoice</h1>
          <div className="flex items-center justify-end gap-2">
            <span className="text-slate-400">#</span>
            <Input 
              className="w-32 text-right border-slate-200 focus:border-[#007AFF]" 
              value={store.invoiceNumber} 
              onChange={(e) => store.setField("invoiceNumber", parseInt(e.target.value) || 1)} 
            />
          </div>
        </div>
      </div>

      {/* Addresses Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-3">
          <Input 
            placeholder="Who is this from?" 
            className="border-none px-0 text-lg focus-visible:ring-0 placeholder:text-slate-400"
            value={store.businessName}
            onChange={(e) => store.setField("businessName", e.target.value)}
          />
          <textarea 
            placeholder="Address, Phone, etc."
            className="w-full border-none px-0 focus:ring-0 resize-none text-slate-600"
            rows={3}
            value={store.businessAddress}
            onChange={(e) => store.setField("businessAddress", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex flex-col">
              <Label className="text-slate-500 text-xs text-right mb-1">Date</Label>
              <Input type="date" className="text-right border-slate-200" value={store.issueDate} onChange={(e) => store.setField("issueDate", e.target.value)} />
            </div>
            <div className="flex flex-col">
              <Label className="text-slate-500 text-xs text-right mb-1">Due Date</Label>
              <Input type="date" className="text-right border-slate-200" value={store.dueDate} onChange={(e) => store.setField("dueDate", e.target.value)} />
            </div>
          </div>
          <div className="space-y-4">
             <div className="flex flex-col">
              <Label className="text-slate-500 text-xs text-right mb-1">Currency</Label>
              <select 
                value={store.currency} 
                onChange={(e) => store.setField("currency", e.target.value as CurrencyCode)}
                className="h-10 rounded-md border border-slate-200 px-3 text-sm bg-white"
              >
                {Object.entries(CURRENCIES).map(([code, { symbol }]) => (
                  <option key={code} value={code}>{code} ({symbol})</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bill To / Ship To Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <Label className="text-slate-400 font-medium">Bill To</Label>
          <Input 
            placeholder="Who is this to?" 
            className="border-slate-200 focus:border-[#007AFF]"
            value={store.clientName}
            onChange={(e) => store.setField("clientName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-400 font-medium">Ship To</Label>
          <Input 
            placeholder="(optional)" 
            className="border-slate-200 focus:border-[#007AFF]"
            value={store.clientAddress}
            onChange={(e) => store.setField("clientAddress", e.target.value)}
          />
        </div>
      </div>

      {/* Table Section - Custom Styled */}
      <div className="overflow-hidden rounded-md border border-slate-200">
        <div className="bg-[#111827] text-white px-4 py-2 grid grid-cols-12 text-sm font-medium">
          <div className="col-span-6 uppercase tracking-wider text-xs">Item</div>
          <div className="col-span-2 text-center uppercase tracking-wider text-xs">Quantity</div>
          <div className="col-span-2 text-center uppercase tracking-wider text-xs">Rate</div>
          <div className="col-span-2 text-right uppercase tracking-wider text-xs">Amount</div>
        </div>
        <div className="p-0">
          <LineItemsTable currency={store.currency} />
        </div>
      </div>

      {/* Notes and Totals Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-slate-500">Notes</Label>
            <textarea 
              className="w-full rounded-md border border-slate-200 p-3 focus:border-[#007AFF] outline-none min-h-[100px]"
              placeholder="Notes - any relevant information not already covered"
              value={store.notes}
              onChange={(e) => store.setField("notes", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-500">Terms</Label>
            <textarea 
              className="w-full rounded-md border border-slate-200 p-3 focus:border-[#007AFF] outline-none min-h-[80px]"
              placeholder="Terms and conditions - late fees, payment methods..."
              value={store.paymentInstructions}
              onChange={(e) => store.setField("paymentInstructions", e.target.value)}
            />
          </div>
        </div>

        {/* Financial Summary */}
        <div className="space-y-3 text-right">
          <div className="flex justify-between items-center text-slate-600">
            <span>Subtotal</span>
            <span>{store.currency} 0</span>
          </div>
          <div className="flex justify-between items-center gap-4">
             <span className="text-slate-600">Tax ({store.tax.label})</span>
             <div className="flex items-center gap-2">
                <Input type="number" className="w-20 text-right h-8" value={store.tax.value} onChange={(e) => store.setField("tax", {...store.tax, value: e.target.value})} />
                <span className="text-slate-400">%</span>
             </div>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-slate-100 font-semibold text-lg text-[#111827]">
            <span>Total</span>
            <span>{store.currency} 0</span>
          </div>
          <div className="flex justify-between items-center text-[#007AFF] font-medium">
            <span>Balance Due</span>
            <span>{store.currency} 0</span>
          </div>
        </div>
      </div>
    </form>
  );
}