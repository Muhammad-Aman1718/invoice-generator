import { Settings } from "lucide-react";
import { PageHeader } from "@/src/components/ui/page-header";
import { SettingsForms } from "@/src/components/dashboard/settings-forms";
import { getViewer } from "@/src/lib/server/data";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const viewer = await getViewer();
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader icon={Settings} title="Settings" description="Profile, business details, invoice defaults and security." />
      <SettingsForms profile={viewer.profile} email={viewer.user.email ?? ""} />
    </div>
  );
}
