import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");
  if (!ADMIN_EMAIL || user.email !== ADMIN_EMAIL) redirect("/dashboard");

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-56 border-r border-slate-200 bg-white">
        <div className="p-6">
          <Link href="/admin" className="font-semibold text-indigo-600">Admin Panel</Link>
        </div>
        <nav className="p-4 space-y-1">
          <Link href="/admin" className="block px-3 py-2 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-50">Dashboard</Link>
          <Link href="/dashboard" className="block px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50">Back to App</Link>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
