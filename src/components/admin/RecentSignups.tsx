import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatShortDate } from "@/src/lib/format";
import { PLANS } from "@/src/constant/plans";
import { ROUTES } from "@/src/constant/routes";
import type { RecentSignupsProps } from "@/src/types/types";

export default function RecentSignups({ users }: RecentSignupsProps) {
  return (
    <section className="panel overflow-hidden lg:col-span-2" aria-labelledby="signupsTitle">
      <div className="flex items-center justify-between px-5 py-4 sm:px-6">
        <h2 id="signupsTitle" className="text-base font-bold text-navy">
          Latest sign-ups
        </h2>
        <Link
          href={ROUTES.adminUsers}
          className="flex items-center gap-1 text-xs font-bold text-navy hover:underline"
        >
          All users <ArrowRight size={13} />
        </Link>
      </div>
      <ul className="divide-y divide-navy/5 border-t border-navy/5">
        {users.map((user) => (
          <li key={user.id} className="flex items-center gap-3 px-5 py-3 sm:px-6">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-mist text-xs font-bold uppercase text-navy">
              {(user.fullName || user.email || "?").slice(0, 1)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-navy">{user.fullName || user.email}</p>
              <p className="truncate text-xs text-navy-500">
                {user.email} · {formatShortDate(user.createdAt)}
              </p>
            </div>
            <span className="rounded-full bg-mist px-2.5 py-1 text-[11px] font-bold text-navy">
              {PLANS[user.subscription.plan].name}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
