import LogoUpload from "@/src/components/invoice/LogoUpload";
import TextField from "@/src/components/ui/TextField";
import TextAreaField from "@/src/components/ui/TextAreaField";
import type { SettingsFieldsProps } from "@/src/types/types";

export default function BusinessDetailsFields({ values, onChange }: SettingsFieldsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
      <div>
        <span className="label">Logo</span>
        <LogoUpload
          id="settingsLogo"
          value={values.logoDataUrl}
          onChange={(url) => onChange("logoDataUrl", url)}
        />
      </div>
      <div className="space-y-4">
        <TextField
          id="companyName"
          label="Business name"
          placeholder="Acme Studio LLC"
          value={values.companyName}
          onChange={(event) => onChange("companyName", event.target.value)}
        />
        <TextAreaField
          id="businessInfo"
          label="Address & contact"
          placeholder={"Street, City\nhello@acme.com · +1 555 0100\nVAT: GB123456789"}
          value={values.businessInfo}
          onChange={(event) => onChange("businessInfo", event.target.value)}
        />
      </div>
    </div>
  );
}
