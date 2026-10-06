import { HOW_IT_WORKS_STEPS } from "@/src/constant/marketing";

export default function HowItWorks() {
  return (
    <section className="bg-white py-16" aria-labelledby="howTitle">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="howTitle" className="mb-10 text-center text-2xl font-bold text-navy sm:text-3xl">
          Invoicing in three steps
        </h2>
        <ol className="grid gap-6 md:grid-cols-3">
          {HOW_IT_WORKS_STEPS.map(({ icon: Icon, title, body }, index) => (
            <li key={title} className="rounded-2xl border border-navy/[0.07] bg-mist/60 p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy">
                  <Icon size={18} className="text-gold" />
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-navy-400">
                  Step {index + 1}
                </span>
              </div>
              <h3 className="mb-1 text-lg font-bold text-navy">{title}</h3>
              <p className="text-sm text-navy-500">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
