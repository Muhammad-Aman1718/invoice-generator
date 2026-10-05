"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FilePlus2, Loader2, Mail, MapPin, Pencil, Phone, Plus, Search, Trash2, Users } from "lucide-react";
import { ConfirmDialog, Modal } from "@/src/components/ui/modal";
import { EmptyState } from "@/src/components/ui/page-header";
import { api } from "@/src/lib/api-client";
import { formatCurrency } from "@/src/lib/invoice-utils";
import { showToast } from "@/src/utils/showToast";
import type { Client } from "@/src/types/invoice-types";

type ClientWithStats = Client & { invoiceCount: number; total: number; currency: string };

const EMPTY = { name: "", email: "", phone: "", address: "", taxId: "", notes: "" };

export function ClientsManager({
  clients,
  limit,
}: {
  clients: ClientWithStats[];
  limit: number | null;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<ClientWithStats | "new" | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<ClientWithStats | null>(null);

  const atLimit = limit !== null && clients.length >= limit;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? clients.filter((c) =>
          [c.name, c.email, c.phone, c.address].some((v) => v?.toLowerCase().includes(q)),
        )
      : clients;
  }, [clients, query]);

  const openForm = (client: ClientWithStats | "new") => {
    setEditing(client);
    setForm(
      client === "new"
        ? EMPTY
        : {
            name: client.name,
            email: client.email ?? "",
            phone: client.phone ?? "",
            address: client.address ?? "",
            taxId: client.taxId ?? "",
            notes: client.notes ?? "",
          },
    );
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing === "new") await api.clients.create(form);
      else if (editing) await api.clients.update(editing.id, form);
      showToast.success(editing === "new" ? "Client added" : "Client updated");
      setEditing(null);
      router.refresh();
    } catch (err) {
      showToast.error("Could not save client", err instanceof Error ? err.message : undefined);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    setSaving(true);
    try {
      await api.clients.remove(deleting.id);
      showToast.success("Client deleted");
      setDeleting(null);
      router.refresh();
    } catch (err) {
      showToast.error("Delete failed", err instanceof Error ? err.message : undefined);
    } finally {
      setSaving(false);
    }
  };

  const field = (key: keyof typeof EMPTY, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div>
      <label htmlFor={`client-${key}`} className="label">
        {label}
      </label>
      <input
        id={`client-${key}`}
        className="input"
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        {...props}
      />
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative sm:w-72">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
          <label htmlFor="client-search" className="sr-only">
            Search clients
          </label>
          <input
            id="client-search"
            className="input pl-9"
            placeholder="Search clients"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          {limit !== null && (
            <span className="text-xs font-semibold text-navy-500">
              {clients.length} / {limit} on Free plan
            </span>
          )}
          {atLimit ? (
            <Link href="/dashboard/billing" className="btn-primary">
              Upgrade for more
            </Link>
          ) : (
            <button className="btn-primary" onClick={() => openForm("new")}>
              <Plus size={16} /> Add client
            </button>
          )}
        </div>
      </div>

      {clients.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No clients yet"
          description="Save the people and companies you bill so you can fill invoices in one click."
          action={
            <button className="btn-primary" onClick={() => openForm("new")}>
              <Plus size={15} /> Add your first client
            </button>
          }
        />
      ) : filtered.length === 0 ? (
        <div className="panel p-10 text-center text-sm text-navy-500">No clients match “{query}”.</div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((c) => (
            <li key={c.id} className="panel flex flex-col p-5">
              <div className="mb-3 flex items-start gap-3">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-navy text-sm font-black uppercase text-gold">
                  {c.name.slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-black text-navy">{c.name}</h3>
                  <p className="text-xs text-navy-500">
                    {c.invoiceCount} invoice{c.invoiceCount === 1 ? "" : "s"}
                    {c.invoiceCount > 0 && ` · ${formatCurrency(c.total, c.currency)}`}
                  </p>
                </div>
              </div>
              <ul className="mb-4 flex-1 space-y-1.5 text-xs text-navy-500">
                {c.email && (
                  <li className="flex items-center gap-2 truncate">
                    <Mail size={12} className="flex-shrink-0" /> {c.email}
                  </li>
                )}
                {c.phone && (
                  <li className="flex items-center gap-2">
                    <Phone size={12} className="flex-shrink-0" /> {c.phone}
                  </li>
                )}
                {c.address && (
                  <li className="flex items-start gap-2">
                    <MapPin size={12} className="mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2 whitespace-pre-line">{c.address}</span>
                  </li>
                )}
              </ul>
              <div className="flex items-center gap-2 border-t border-navy/5 pt-3">
                <Link href={`/dashboard/invoices/new?client=${c.id}`} className="btn-outline btn-sm flex-1">
                  <FilePlus2 size={13} /> Invoice
                </Link>
                <button className="btn-ghost btn-sm" onClick={() => openForm(c)} aria-label={`Edit ${c.name}`}>
                  <Pencil size={13} />
                </button>
                <button
                  className="btn-ghost btn-sm text-red-600 hover:bg-red-50"
                  onClick={() => setDeleting(c)}
                  aria-label={`Delete ${c.name}`}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal
        open={editing !== null}
        onClose={() => !saving && setEditing(null)}
        title={editing === "new" ? "Add client" : "Edit client"}
        description="These details are copied onto invoices you create for this client."
      >
        <form id="client-form" onSubmit={save} className="grid gap-4 pb-2 sm:grid-cols-2">
          <div className="sm:col-span-2">{field("name", "Name / company *", { required: true, maxLength: 200 })}</div>
          {field("email", "Email", { type: "email" })}
          {field("phone", "Phone", { type: "tel" })}
          <div className="sm:col-span-2">
            <label htmlFor="client-address" className="label">
              Address
            </label>
            <textarea
              id="client-address"
              className="input resize-none"
              rows={3}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
          {field("taxId", "Tax / VAT ID")}
          {field("notes", "Internal note")}
          <div className="flex flex-col-reverse gap-2 sm:col-span-2 sm:flex-row sm:justify-end">
            <button type="button" className="btn-outline" onClick={() => setEditing(null)} disabled={saving}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving && <Loader2 size={14} className="animate-spin" />}
              {editing === "new" ? "Add client" : "Save changes"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        loading={saving}
        title={`Delete ${deleting?.name ?? "client"}?`}
        description="The client is removed from your list. Existing invoices keep the client details they were created with."
        confirmLabel="Delete client"
      />
    </div>
  );
}
