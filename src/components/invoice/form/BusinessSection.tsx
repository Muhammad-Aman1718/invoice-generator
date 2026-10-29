"use client";

import Field from "@/src/components/ui/Field";
import FormField from "@/src/components/ui/FormField";
import LogoUpload from "@/src/components/invoice/LogoUpload";
import useFieldValidation from "@/src/hooks/useFieldValidation";
import { useInvoiceStore } from "@/src/lib/invoiceStore";
import { FIELD_LIMITS } from "@/src/constant/limits";

export default function BusinessSection() {
  const { logoDataUrl, businessName, bussinessInfo, setLogo, setField } = useInvoiceStore();
  const name = useFieldValidation("businessName");
  const info = useFieldValidation("businessInfo");

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-[200px_minmax(0,1fr)]">
      <Field label="Logo" htmlFor="logo">
        <LogoUpload id="logo" value={logoDataUrl} onChange={setLogo} />
      </Field>
      <div className="space-y-4">
        <FormField
          id="businessName"
          label="Business name"
          required
          error={name.error}
          count={{ length: businessName.length, max: FIELD_LIMITS.businessName }}
        >
          <input
            id="businessName"
            className="input"
            autoComplete="organization"
            maxLength={FIELD_LIMITS.businessName}
            value={businessName}
            onChange={(event) => setField("businessName", event.target.value)}
            {...name.inputProps}
          />
        </FormField>
        <FormField
          id="businessInfo"
          label="Address & contact details"
          hint="Address, email, phone and tax number (VAT, GST, NTN…)."
          error={info.error}
          count={{ length: bussinessInfo.length, max: FIELD_LIMITS.address }}
        >
          <textarea
            id="businessInfo"
            className="input resize-y"
            rows={3}
            maxLength={FIELD_LIMITS.address}
            value={bussinessInfo}
            onChange={(event) => setField("bussinessInfo", event.target.value)}
            {...info.inputProps}
          />
        </FormField>
      </div>
    </div>
  );
}
