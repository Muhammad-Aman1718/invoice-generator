import Link from "next/link";
import { Sparkles } from "lucide-react";
import Modal from "@/src/components/ui/Modal";
import { ROUTES } from "@/src/constant/routes";
import type { PlanLimitModalProps } from "@/src/types/types";

export default function PlanLimitModal({ message, onClose }: PlanLimitModalProps) {
  return (
    <Modal
      open={Boolean(message)}
      onClose={onClose}
      title="You've reached your plan limit"
      description={message ?? ""}
      footer={
        <>
          <button className="btn-outline" onClick={onClose}>
            Not now
          </button>
          <Link href={ROUTES.billing} className="btn-primary">
            <Sparkles size={15} /> See plans
          </Link>
        </>
      }
    >
      <p className="pb-2 text-sm text-navy-500">
        Your draft is kept on this device, so nothing is lost. Upgrade to save it now, or download it as a
        PDF.
      </p>
    </Modal>
  );
}
