"use client";

import { createContext } from "react";
import type { InvoiceValidationContextValue } from "@/src/types/types";

/** Shared by the invoice form fields, the summary rail and the error summary. */
export const InvoiceValidationContext = createContext<InvoiceValidationContextValue | null>(null);
