import { Percent } from "lucide-react";
import { clampPercent } from "@/src/lib/numberUtils";
import { MAX_PERCENT } from "@/src/constant/limits";
import type { PercentInputProps } from "@/src/types/types";

export default function PercentInput({ id, label, value, onChange }: PercentInputProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <label htmlFor={id} className="text-sm text-navy-500">
        {label}
      </label>
      <div className="flex items-center gap-1.5 rounded-xl border border-navy/10 bg-white px-2.5 py-1">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          max={MAX_PERCENT}
          step={0.01}
          className="w-14 bg-transparent text-right font-mono text-sm font-bold text-navy outline-none"
          value={value || ""}
          placeholder="0"
          onChange={(event) => onChange(clampPercent(parseFloat(event.target.value)))}
        />
        <Percent size={11} className="text-[#555]" aria-hidden="true" />
      </div>
    </div>
  );
}
