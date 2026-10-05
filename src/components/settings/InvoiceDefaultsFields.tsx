import TextField from "@/src/components/ui/TextField";
import TextAreaField from "@/src/components/ui/TextAreaField";
import { CURRENCIES } from "@/src/constant/currencies";
import { MAX_PAYMENT_TERMS_DAYS } from "@/src/constant/app";
import { MAX_PERCENT } from "@/src/constant/limits";
import type { SettingsFieldsProps } from "@/src/types/types";

export default function InvoiceDefaultsFields({ values, onChange }: SettingsFieldsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div>
        <label htmlFor="defaultCurrency" className="label">
          Currency
        </label>
        <select
          id="defaultCurrency"
          className="input cursor-pointer"
          value={values.defaultCurrency}
          onChange={(event) => onChange("defaultCurrency", event.target.value)}
        >
          {CURRENCIES.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} — {currency.label}
            </option>
          ))}
        </select>
      </div>
      <TextField
        id="defaultTaxRate"
        label="Tax rate (%)"
        type="number"
        min={0}
        max={MAX_PERCENT}
        step={0.01}
        value={values.defaultTaxRate}
        onChange={(event) => onChange("defaultTaxRate", Number(event.target.value))}
      />
      <TextField
        id="paymentTermsDays"
        label="Payment terms (days)"
        type="number"
        min={0}
        max={MAX_PAYMENT_TERMS_DAYS}
        value={values.paymentTermsDays}
        onChange={(event) => onChange("paymentTermsDays", Number(event.target.value))}
      />
      <TextAreaField
        id="defaultNotes"
        label="Default notes"
        className="sm:col-span-3"
        rows={2}
        placeholder="Bank details, thank-you note…"
        value={values.defaultNotes}
        onChange={(event) => onChange("defaultNotes", event.target.value)}
      />
      <TextAreaField
        id="defaultTerms"
        label="Default terms"
        className="sm:col-span-3"
        rows={2}
        placeholder="Payment due within 14 days. Late payments incur 1.5% monthly interest."
        value={values.defaultTerms}
        onChange={(event) => onChange("defaultTerms", event.target.value)}
      />
    </div>
  );
}
