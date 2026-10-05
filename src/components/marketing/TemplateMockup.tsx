import { TEMPLATE_MOCKUP_LINES, TEMPLATE_MOCKUP_TOTAL } from "@/src/constant/marketing";

/** Static miniature of the invoice layout (decorative). */
export default function TemplateMockup() {
  return (
    <div className="panel mx-auto w-full max-w-md p-6 font-serif text-navy" aria-hidden="true">
      <div className="mb-4 flex items-start justify-between border-b-2 border-navy pb-3">
        <div>
          <div className="mb-1 h-6 w-16 rounded bg-navy/10" />
          <p className="text-sm font-bold">Acme Studio</p>
          <p className="text-[10px] text-navy-500">12 Market St · London</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold tracking-widest">INVOICE</p>
          <div className="my-1 ml-auto h-0.5 w-12 bg-gold" />
          <p className="font-mono text-xs font-bold">#1042</p>
        </div>
      </div>
      {TEMPLATE_MOCKUP_LINES.map((line) => (
        <div key={line.description} className="flex justify-between border-b border-navy/5 py-1.5 text-xs">
          <span>{line.description}</span>
          <span className="font-mono">{line.amount}</span>
        </div>
      ))}
      <div className="mt-3 flex justify-end">
        <div className="w-40 border-t-2 border-navy pt-1.5 text-xs">
          <div className="flex justify-between font-bold">
            <span>TOTAL DUE</span>
            <span className="font-mono">{TEMPLATE_MOCKUP_TOTAL}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
