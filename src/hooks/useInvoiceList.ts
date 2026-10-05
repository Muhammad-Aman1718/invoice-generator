"use client";

import { useMemo, useState } from "react";
import { countByStatus, filterAndSortInvoices, paginate, withDisplayStatus } from "@/src/lib/invoiceFilters";
import { INVOICE_PAGE_SIZE } from "@/src/constant/app";
import { DEFAULT_INVOICE_LIST_QUERY } from "@/src/constant/invoice";
import type { InvoiceListQuery, InvoiceSummary } from "@/src/types/types";

/** Client-side filtering, sorting and pagination for the invoices page. */
export default function useInvoiceList(invoices: InvoiceSummary[]) {
  const [listQuery, setListQuery] = useState<InvoiceListQuery>(DEFAULT_INVOICE_LIST_QUERY);
  const [page, setPage] = useState(1);

  const rows = useMemo(() => withDisplayStatus(invoices), [invoices]);
  const counts = useMemo(() => countByStatus(rows), [rows]);
  const filtered = useMemo(() => filterAndSortInvoices(rows, listQuery), [rows, listQuery]);
  const { pageItems, currentPage, pageCount } = paginate(filtered, page, INVOICE_PAGE_SIZE);

  const updateQuery = (changes: Partial<InvoiceListQuery>) => {
    setListQuery((current) => ({ ...current, ...changes }));
    if (changes.filter !== undefined || changes.query !== undefined) setPage(1);
  };

  return { listQuery, updateQuery, counts, filtered, pageItems, currentPage, pageCount, setPage };
}
