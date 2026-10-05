"use client";

import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Copy, Download, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { QUICK_STATUS_ACTIONS, STATUS_META } from "@/src/constant/invoice";
import { ROUTES } from "@/src/constant/routes";
import { MENU_ITEM_CLASS, MENU_LABEL_CLASS } from "@/src/constant/theme";
import type { InvoiceActionMenuProps } from "@/src/types/types";

export default function InvoiceActionMenu({ invoice, actions }: InvoiceActionMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-lg text-navy-400 transition hover:bg-navy/5 hover:text-navy"
          aria-label={`Actions for invoice ${invoice.invoiceNumber}`}
        >
          <MoreHorizontal size={16} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={6}
          className="z-50 w-52 rounded-2xl border border-navy/10 bg-white p-1.5 shadow-lift"
        >
          <DropdownMenu.Label className={MENU_LABEL_CLASS}>
            Invoice #{invoice.invoiceNumber}
          </DropdownMenu.Label>
          <DropdownMenu.Item asChild className={MENU_ITEM_CLASS}>
            <Link href={`${ROUTES.invoices}/${invoice.id}`}>
              <Pencil size={13} /> Edit
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item className={MENU_ITEM_CLASS} onSelect={() => actions.onDownload(invoice)}>
            <Download size={13} /> Download PDF
          </DropdownMenu.Item>
          <DropdownMenu.Item className={MENU_ITEM_CLASS} onSelect={() => actions.onDuplicate(invoice)}>
            <Copy size={13} /> Duplicate
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="my-1 h-px bg-navy/5" />
          <DropdownMenu.Label className={MENU_LABEL_CLASS}>Set status</DropdownMenu.Label>
          {QUICK_STATUS_ACTIONS.map(({ status, icon: Icon, tone }) => (
            <DropdownMenu.Item
              key={status}
              className={MENU_ITEM_CLASS}
              disabled={invoice.status === status}
              onSelect={() => actions.onStatusChange(invoice, status)}
            >
              <Icon size={13} className={tone} /> Mark as {STATUS_META[status].label.toLowerCase()}
            </DropdownMenu.Item>
          ))}
          <DropdownMenu.Separator className="my-1 h-px bg-navy/5" />
          <DropdownMenu.Item
            className={`${MENU_ITEM_CLASS} text-red-600 data-[highlighted]:bg-red-50`}
            onSelect={() => actions.onDelete(invoice)}
          >
            <Trash2 size={13} /> Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
