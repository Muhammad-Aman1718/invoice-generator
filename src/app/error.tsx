"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import type { ErrorPageProps } from "@/src/types/types";

export default function GlobalError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70dvh] flex-col items-center justify-center p-6 text-center">
      <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
        <AlertTriangle size={28} className="text-red-500" />
      </span>
      <h1 className="mb-2 text-2xl font-bold text-navy">Something went wrong</h1>
      <p className="mb-6 max-w-sm text-sm text-navy-500">
        An unexpected error occurred. Try again — if it keeps happening, contact support.
        {error.digest && <span className="mt-1 block tabular-nums text-xs">Ref: {error.digest}</span>}
      </p>
      <button onClick={reset} className="btn-primary">
        Try again
      </button>
    </main>
  );
}
