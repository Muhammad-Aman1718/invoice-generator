import StatusFilterTabs from "./StatusFilterTabs";
import SortSelect from "./SortSelect";
import CsvExportButton from "./CsvExportButton";
import SearchInput from "@/src/components/ui/SearchInput";
import type { InvoiceToolbarProps } from "@/src/types/types";

export default function InvoiceToolbar({
  listQuery,
  counts,
  canExportCsv,
  hideCsvExport,
  onChange,
}: InvoiceToolbarProps) {
  return (
    <div className="flex flex-col gap-3 2xl:flex-row 2xl:items-center 2xl:justify-between">
      <StatusFilterTabs
        value={listQuery.filter}
        counts={counts}
        onChange={(filter) => onChange({ filter })}
      />
      <div className="flex flex-col gap-2 xs:flex-row">
        <div className="flex-1 2xl:w-64">
          <SearchInput
            id="invoiceSearch"
            label="Search invoices"
            placeholder="Search client or #"
            value={listQuery.query}
            onChange={(query) => onChange({ query })}
          />
        </div>
        <SortSelect value={listQuery.sort} onChange={(sort) => onChange({ sort })} />
        {!hideCsvExport && <CsvExportButton enabled={canExportCsv} />}
      </div>
    </div>
  );
}
