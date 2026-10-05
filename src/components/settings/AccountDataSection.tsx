"use client";

import { useState } from "react";
import { Download, Trash2 } from "lucide-react";
import SettingsSection from "./SettingsSection";
import DeleteAccountModal from "./DeleteAccountModal";

export default function AccountDataSection() {
  const [deleteOpen, setDeleteOpen] = useState(false);
  return (
    <SettingsSection
      id="privacy"
      title="Your data"
      description="Download a copy of everything we store, or close your account."
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <a href="/api/account/export" className="btn-outline" download>
          <Download size={15} /> Export my data (JSON)
        </a>
        <button
          className="btn border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
          onClick={() => setDeleteOpen(true)}
        >
          <Trash2 size={15} /> Delete account
        </button>
      </div>
      <DeleteAccountModal open={deleteOpen} onClose={() => setDeleteOpen(false)} />
    </SettingsSection>
  );
}
