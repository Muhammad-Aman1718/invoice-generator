import { readStorage, removeStorage, writeStorage } from "@/src/lib/browserStorage";
import { STORAGE_KEYS } from "@/src/constant/app";
import type { InvoiceData } from "@/src/types/types";

// While an existing invoice is open, the shared store holds that invoice, so an
// unsaved "new invoice" draft is parked in sessionStorage and restored afterwards.

export function backupDraft(draft: InvoiceData): void {
  writeStorage(sessionStorage, STORAGE_KEYS.draftBackup, JSON.stringify(draft));
}

export function takeDraftBackup(): Partial<InvoiceData> | null {
  const raw = readStorage(sessionStorage, STORAGE_KEYS.draftBackup);
  if (!raw) return null;
  removeStorage(sessionStorage, STORAGE_KEYS.draftBackup);
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...draft } = JSON.parse(raw) as InvoiceData;
    return draft;
  } catch (error) {
    console.warn("[draft] ignoring corrupt backup:", error);
    return null;
  }
}
