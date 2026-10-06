import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { SITE_CONFIG } from "@/src/constant/site";

export default function SuspendedNotice() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-mist p-4">
      <div className="panel max-w-md p-8 text-center">
        <ShieldAlert className="mx-auto mb-4 text-red-500" size={36} />
        <h1 className="mb-2 text-xl font-bold text-navy">Account suspended</h1>
        <p className="mb-6 text-sm text-navy-500">
          Your account has been suspended. If you think this is a mistake, contact{" "}
          <a className="font-bold underline" href={`mailto:${SITE_CONFIG.supportEmail}`}>
            {SITE_CONFIG.supportEmail}
          </a>
          .
        </p>
        <Link href="/" className="btn-outline">
          Back to home
        </Link>
      </div>
    </main>
  );
}
