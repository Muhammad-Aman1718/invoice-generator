import { UserCog } from "lucide-react";
import PageHeader from "@/src/components/ui/PageHeader";
import AdminUsersTable from "@/src/components/admin/AdminUsersTable";
import { listUsersForAdmin, requireAdminViewer } from "@/src/lib/server/adminData";

export const metadata = { title: "Users & plans" };

export default async function AdminUsersPage() {
  const viewer = await requireAdminViewer();
  const users = await listUsersForAdmin(viewer);
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        icon={UserCog}
        title="Users & plans"
        description="Change plans and roles, or suspend access."
      />
      <AdminUsersTable users={users} currentUserId={viewer.user.id} />
    </div>
  );
}
