"use client";

import { Loader2, ShieldAlert } from "lucide-react";
import Modal from "@/src/components/ui/Modal";
import TextField from "@/src/components/ui/TextField";
import useDeleteAccount from "@/src/hooks/useDeleteAccount";
import { DELETE_CONFIRMATION_TEXT } from "@/src/constant/app";
import type { DeleteAccountModalProps } from "@/src/types/types";

export default function DeleteAccountModal({ open, onClose }: DeleteAccountModalProps) {
  const { confirmation, setConfirmation, isDeleting, canDelete, deleteAccount } = useDeleteAccount();

  return (
    <Modal
      open={open}
      onClose={() => !isDeleting && onClose()}
      title="Delete your account?"
      description="This permanently deletes your account, invoices, clients and subscription record. It cannot be undone."
      footer={
        <>
          <button className="btn-outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </button>
          <button className="btn-danger" onClick={deleteAccount} disabled={!canDelete || isDeleting}>
            {isDeleting && <Loader2 size={14} className="animate-spin" />} Delete forever
          </button>
        </>
      }
    >
      <div className="space-y-3 pb-2">
        <p className="flex gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
          <ShieldAlert size={16} className="mt-0.5 flex-shrink-0" />
          Have an active paid plan? Cancel it from Billing first so you aren&apos;t charged again.
        </p>
        <TextField
          id="confirmDelete"
          label={`Type ${DELETE_CONFIRMATION_TEXT} to confirm`}
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
        />
      </div>
    </Modal>
  );
}
