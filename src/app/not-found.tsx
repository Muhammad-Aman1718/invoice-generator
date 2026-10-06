import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-mist p-6 text-center">
      <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-navy">
        <FileQuestion size={28} className="text-gold" />
      </span>
      <p className="eyebrow mb-2">Error 404</p>
      <h1 className="mb-2 text-2xl font-bold text-navy sm:text-3xl">Page not found</h1>
      <p className="mb-6 max-w-sm text-sm text-navy-500">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <div className="flex gap-3">
        <Link href="/" className="btn-primary">
          Go home
        </Link>
        <Link href="/help-center" className="btn-outline">
          Help Center
        </Link>
      </div>
    </main>
  );
}
