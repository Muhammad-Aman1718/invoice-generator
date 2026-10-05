import InvoiceNumberInput from "./InvoiceNumberInput";
import CurrencySelect from "./CurrencySelect";

export default function InvoiceFormHeader() {
  return (
    <div className="flex items-center justify-between gap-2 bg-navy px-3 py-3.5 sm:gap-3 sm:px-8">
      <InvoiceNumberInput />
      <span className="flex-1 text-center text-sm font-black uppercase tracking-[0.1em] text-white sm:flex-none sm:text-2xl sm:tracking-[0.2em]">
        <span className="hidden min-[340px]:inline">Invoice</span>
      </span>
      <CurrencySelect />
    </div>
  );
}
