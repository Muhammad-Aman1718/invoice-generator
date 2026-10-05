"use client";

import Link from "next/link";
import { Plus, Users } from "lucide-react";
import ClientCard from "./ClientCard";
import ClientFormModal from "./ClientFormModal";
import EmptyState from "@/src/components/ui/EmptyState";
import SearchInput from "@/src/components/ui/SearchInput";
import ConfirmDialog from "@/src/components/ui/ConfirmDialog";
import useClientsManager from "@/src/hooks/useClientsManager";
import { ROUTES } from "@/src/constant/routes";
import type { ClientsManagerProps } from "@/src/types/types";

export default function ClientsManager({ clients, limit }: ClientsManagerProps) {
  const manager = useClientsManager(clients);
  const atLimit = limit !== null && clients.length >= limit;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="sm:w-72">
          <SearchInput
            id="clientSearch"
            label="Search clients"
            placeholder="Search clients"
            value={manager.query}
            onChange={manager.setQuery}
          />
        </div>
        <div className="flex items-center gap-3">
          {limit !== null && (
            <span className="text-xs font-semibold text-navy-500">
              {clients.length} / {limit} on Free plan
            </span>
          )}
          {atLimit ? (
            <Link href={ROUTES.billing} className="btn-primary">
              Upgrade for more
            </Link>
          ) : (
            <button className="btn-primary" onClick={() => manager.openForm("new")}>
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
            <button className="btn-primary" onClick={() => manager.openForm("new")}>
              <Plus size={15} /> Add your first client
            </button>
          }
        />
      ) : manager.filtered.length === 0 ? (
        <div className="panel p-10 text-center text-sm text-navy-500">
          No clients match “{manager.query}”.
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {manager.filtered.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              onEdit={manager.openForm}
              onDelete={manager.setDeleting}
            />
          ))}
        </ul>
      )}

      <ClientFormModal
        open={manager.editing !== null}
        isNew={manager.editing === "new"}
        values={manager.formValues}
        saving={manager.isSaving}
        onChange={manager.setFormValues}
        onSubmit={manager.saveClient}
        onClose={manager.closeForm}
      />
      <ConfirmDialog
        open={Boolean(manager.deleting)}
        onClose={() => manager.setDeleting(null)}
        onConfirm={manager.deleteClient}
        loading={manager.isSaving}
        title={`Delete ${manager.deleting?.name ?? "client"}?`}
        description="The client is removed from your list. Existing invoices keep the client details they were created with."
        confirmLabel="Delete client"
      />
    </div>
  );
}
