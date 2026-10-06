import Link from "next/link";

export default function TryBuilderCta() {
  return (
    <section className="mx-auto max-w-4xl px-4 pb-20 text-center sm:px-6">
      <div className="rounded-3xl bg-navy p-8 sm:p-12">
        <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">Try it now — no sign-up needed</h2>
        <p className="mb-6 text-navy-200">
          Build an invoice in the browser and download the PDF in under a minute.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/#builder" className="btn-primary">
            Open the free builder
          </Link>
          <Link href="/pricing" className="btn border border-white/20 text-white hover:bg-white/10">
            See pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
