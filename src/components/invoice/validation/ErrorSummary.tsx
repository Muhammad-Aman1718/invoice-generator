"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle } from "lucide-react";
import useInvoiceValidation from "@/src/hooks/useInvoiceValidation";

/** Focusable list of problems after a failed save/download; each item jumps to its field. */
export default function ErrorSummary() {
  const { errors, showSummary } = useInvoiceValidation();
  const ref = useRef<HTMLDivElement>(null);
  const entries = Object.entries(errors);

  useEffect(() => {
    if (showSummary) ref.current?.focus();
  }, [showSummary]);

  if (!showSummary || entries.length === 0) return null;
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="alert"
      aria-labelledby="errorSummaryTitle"
      className="rounded-2xl border border-red-200 bg-red-50 p-5 outline-none focus-visible:ring-2 focus-visible:ring-red-400"
    >
      <h2 id="errorSummaryTitle" className="mb-2 flex items-center gap-2 text-sm font-bold text-red-800">
        <AlertTriangle size={16} aria-hidden="true" />
        Please fix {entries.length === 1 ? "this problem" : `these ${entries.length} problems`}
      </h2>
      <ul className="list-disc space-y-1 pl-6 text-sm text-red-800">
        {entries.map(([id, message]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="underline underline-offset-2 hover:no-underline"
              onClick={(event) => {
                event.preventDefault();
                document.getElementById(id)?.focus();
              }}
            >
              {message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
