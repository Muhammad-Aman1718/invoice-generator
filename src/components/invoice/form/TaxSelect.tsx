"use client";

import { TAX_TYPES } from "@/src/constant/taxTypes";
import type { TaxSelectProps } from "@/src/types/types";

export default function TaxSelect({ taxLabel, onSelect }: TaxSelectProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <label htmlFor="taxType" className="text-sm text-navy-500">
        Tax
      </label>
      <select
        id="taxType"
        className="input h-10 w-44 cursor-pointer py-1.5"
        value={taxLabel}
        onChange={(event) => {
          const tax = TAX_TYPES.find((item) => item.label === event.target.value);
          if (tax) onSelect(tax);
        }}
      >
        {TAX_TYPES.map((tax) => (
          <option key={tax.label} value={tax.label}>
            {tax.rate ? `${tax.label} (${tax.rate}%)` : tax.label}
          </option>
        ))}
      </select>
    </div>
  );
}
