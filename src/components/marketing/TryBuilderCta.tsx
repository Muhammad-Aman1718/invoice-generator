import Link from "next/link";

export default function TryBuilderCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid items-center gap-6 rounded-2xl border border-navy/[0.08] bg-white p-8 shadow-card sm:p-12 md:grid-cols-[1fr_auto]">
        <div>
          <h2 className="mb-2 text-2xl font-bold text-navy sm:text-3xl">Try it now, no sign-up needed</h2>
          <p className="text-navy-500">
            Build an invoice in the browser and download the PDF in under a minute.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/#builder" className="btn-primary px-5 py-3">
            Start invoicing
          </Link>
          <Link href="/pricing" className="btn-outline px-5 py-3">
            See pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
