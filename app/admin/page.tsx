import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");
  if (!ADMIN_EMAIL || user.email !== ADMIN_EMAIL) redirect("/dashboard");

  const { count: userCount } = await supabase.from("profiles").select("*", { count: "exact", head: true });
  const { count: invoiceCount } = await supabase.from("invoices").select("*", { count: "exact", head: true });

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <h1 className="text-xl font-semibold text-slate-900">Admin Panel</h1>
        <p className="text-sm text-slate-500">Manage users, invoices, and AdSense</p>
      </header>
      <AdminDashboard totalUsers={userCount ?? 0} totalInvoices={invoiceCount ?? 0} />
    </div>
  );
}
