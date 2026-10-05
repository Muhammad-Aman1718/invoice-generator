import StatusFilterTabs from "./StatusFilterTabs";
import SortSelect from "./SortSelect";
import CsvExportButton from "./CsvExportButton";
import SearchInput from "@/src/components/ui/SearchInput";
import type { InvoiceToolbarProps } from "@/src/types/types";

export default function InvoiceToolbar({ listQuery, counts, canExportCsv, onChange }: InvoiceToolbarProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <StatusFilterTabs
        value={listQuery.filter}
        counts={counts}
        onChange={(filter) => onChange({ filter })}
      />
      <div className="flex flex-col gap-2 xs:flex-row">
        <div className="flex-1 lg:w-64">
          <SearchInput
            id="invoiceSearch"
            label="Search invoices"
            placeholder="Search client or #"
            value={listQuery.query}
            onChange={(query) => onChange({ query })}
          />
        </div>
        <SortSelect value={listQuery.sort} onChange={(sort) => onChange({ sort })} />
        <CsvExportButton enabled={canExportCsv} />
      </div>
    </div>
  );
}
