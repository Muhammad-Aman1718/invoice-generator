"use client";

import Field from "@/src/components/ui/Field";
import LogoUpload from "@/src/components/invoice/LogoUpload";
import { useInvoiceStore } from "@/src/lib/invoiceStore";

export default function BusinessSection() {
  const { logoDataUrl, businessName, bussinessInfo, setLogo, setField } = useInvoiceStore();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:gap-6">
      <div className="sm:col-span-4">
        <Field label="Logo" htmlFor="logo">
          <LogoUpload id="logo" value={logoDataUrl} onChange={setLogo} />
        </Field>
      </div>
      <div className="space-y-3 sm:col-span-8">
        <Field label="From" htmlFor="businessName">
          <input
            id="businessName"
            className="input"
            placeholder="Your business name"
            value={businessName}
            onChange={(event) => setField("businessName", event.target.value)}
          />
        </Field>
        <label htmlFor="businessInfo" className="sr-only">
          Business address and contact info
        </label>
        <textarea
          id="businessInfo"
          className="input resize-none"
          placeholder="Address, phone, email..."
          rows={3}
          value={bussinessInfo}
          onChange={(event) => setField("bussinessInfo", event.target.value)}
        />
      </div>
    </div>
  );
}
