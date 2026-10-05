"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import Modal from "./Modal";
import type { ConfirmDialogProps } from "@/src/types/types";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  danger = true,
  loading = false,
}: ConfirmDialogProps) {
  const footer = (
    <>
      <button type="button" className="btn-outline" onClick={onClose} disabled={loading}>
        Cancel
      </button>
      <button
        type="button"
        className={danger ? "btn-danger" : "btn-primary"}
        onClick={onConfirm}
        disabled={loading}
      >
        {loading && <Loader2 size={14} className="animate-spin" />}
        {confirmLabel}
      </button>
    </>
  );

  return (
    <Modal open={open} onClose={loading ? () => undefined : onClose} title={title} footer={footer}>
      <div className="flex gap-3 pb-2">
        {danger && (
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-50">
            <AlertTriangle size={18} className="text-red-500" />
          </div>
        )}
        <p className="text-sm leading-relaxed text-navy-500">{description}</p>
      </div>
    </Modal>
  );
}
