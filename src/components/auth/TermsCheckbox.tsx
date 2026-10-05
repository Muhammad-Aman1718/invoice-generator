import Link from "next/link";
import type { TermsCheckboxProps } from "@/src/types/types";

export default function TermsCheckbox({ checked, onChange }: TermsCheckboxProps) {
  return (
    <label className="flex items-start gap-2.5 text-xs leading-relaxed text-navy-500">
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 flex-shrink-0 accent-navy"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        required
      />
      <span>
        I agree to the{" "}
        <Link href="/terms-of-service" target="_blank" className="font-bold text-navy underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" target="_blank" className="font-bold text-navy underline">
          Privacy Policy
        </Link>
        .
      </span>
    </label>
  );
}
