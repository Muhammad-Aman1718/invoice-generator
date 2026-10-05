"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/src/lib/apiClient";
import { filterClients, toClientFormValues } from "@/src/lib/clientStats";
import { getErrorMessage } from "@/src/lib/utils";
import { showToast } from "@/src/utils/showToast";
import type { ClientFormValues, ClientWithStats } from "@/src/types/types";

/** State for the clients page: search, add/edit modal and delete confirmation. */
export default function useClientsManager(clients: ClientWithStats[]) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<ClientWithStats | "new" | null>(null);
  const [formValues, setFormValues] = useState<ClientFormValues>(toClientFormValues(null));
  const [deleting, setDeleting] = useState<ClientWithStats | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const filtered = useMemo(() => filterClients(clients, query), [clients, query]);

  const openForm = (client: ClientWithStats | "new") => {
    setEditing(client);
    setFormValues(toClientFormValues(client === "new" ? null : client));
  };

  const saveClient = async () => {
    setIsSaving(true);
    try {
      if (editing === "new") await api.clients.create(formValues);
      else if (editing) await api.clients.update(editing.id, formValues);
      showToast.success(editing === "new" ? "Client added" : "Client updated");
      setEditing(null);
      router.refresh();
    } catch (error) {
      showToast.error("Could not save client", getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  const deleteClient = async () => {
    if (!deleting) return;
    setIsSaving(true);
    try {
      await api.clients.remove(deleting.id);
      showToast.success("Client deleted");
      setDeleting(null);
      router.refresh();
    } catch (error) {
      showToast.error("Delete failed", getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  return {
    query,
    setQuery,
    filtered,
    editing,
    openForm,
    closeForm: () => setEditing(null),
    formValues,
    setFormValues,
    saveClient,
    deleting,
    setDeleting,
    deleteClient,
    isSaving,
  };
}
