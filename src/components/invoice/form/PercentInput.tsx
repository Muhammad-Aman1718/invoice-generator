import { clampPercent } from "@/src/lib/numberUtils";
import { MAX_PERCENT } from "@/src/constant/limits";
import type { PercentInputProps } from "@/src/types/types";

export default function PercentInput({ id, label, value, onChange }: PercentInputProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <label htmlFor={id} className="text-sm text-navy-500">
        {label}
      </label>
      <div className="relative w-24">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          max={MAX_PERCENT}
          step={0.01}
          className="input h-10 py-1.5 pr-7 text-right tabular-nums"
          value={value || ""}
          placeholder="0"
          onChange={(event) => onChange(clampPercent(parseFloat(event.target.value)))}
        />
        <span
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-navy-400"
          aria-hidden="true"
        >
          %
        </span>
      </div>
    </div>
  );
}
