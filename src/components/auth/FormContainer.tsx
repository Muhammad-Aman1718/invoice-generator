import type { FormContainerProps } from "@/src/types/types";

export default function FormContainer({ children }: FormContainerProps) {
  return (
    <section className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border bg-white shadow-xl">
      <div className="h-1.5 w-full bg-gold" />
      <div className="flex flex-col gap-6 p-7 sm:p-8">{children}</div>
    </section>
  );
}
