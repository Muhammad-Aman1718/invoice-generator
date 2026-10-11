import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationProps } from "@/src/types/types";

export default function Pagination({ page, pageCount, total, pageSize, onPageChange }: PaginationProps) {
  const firstItem = (page - 1) * pageSize + 1;
  const lastItem = Math.min(page * pageSize, total);
  return (
    <div className="flex items-center justify-between text-xs font-semibold text-navy-500">
      <span>
        Showing {firstItem}-{lastItem} of {total}
      </span>
      <div className="flex items-center gap-1">
        <button
          className="btn-outline btn-sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={14} />
        </button>
        <span className="px-2">
          {page} / {pageCount}
        </span>
        <button
          className="btn-outline btn-sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page === pageCount}
          aria-label="Next page"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
