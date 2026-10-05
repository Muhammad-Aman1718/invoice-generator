"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, KeyRound, Loader2, Save, ShieldAlert, Trash2 } from "lucide-react";
import { LogoUpload } from "@/src/components/invoice/logo-upload";
import { Modal } from "@/src/components/ui/modal";
import { CURRENCIES } from "@/src/constant/data";
import { api } from "@/src/lib/api-client";
import { useInvoiceStore } from "@/src/lib/invoice-store";
import { createClient } from "@/src/lib/supabase/client";
import { showToast } from "@/src/utils/showToast";
import type { Profile } from "@/src/types/invoice-types";

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="panel scroll-mt-20 p-5 sm:p-6" aria-labelledby={`${id}-title`}>
      <div className="mb-5">
        <h2 id={`${id}-title`} className="text-base font-black text-navy">
          {title}
        </h2>
        <p className="text-sm text-navy-500">{description}</p>
      </div>
      {children}
    </section>
  );
}

export function SettingsForms({ profile, email }: { profile: Profile; email: string }) {
  const router = useRouter();
  const resetInvoice = useInvoiceStore((s) => s.resetInvoice);
  const [form, setForm] = useState({
    fullName: profile.fullName ?? "",
    companyName: profile.companyName ?? "",
    businessInfo: profile.businessInfo ?? "",
    logoDataUrl: profile.logoDataUrl,
    defaultCurrency: profile.defaultCurrency,
    defaultTaxRate: profile.defaultTaxRate,
    paymentTermsDays: profile.paymentTermsDays,
    defaultNotes: profile.defaultNotes ?? "",
    defaultTerms: profile.defaultTerms ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [password, setPassword] = useState({ next: "", confirm: "" });
  const [pwSaving, setPwSaving] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.profile.update({
        ...form,
        defaultTaxRate: Number(form.defaultTaxRate) || 0,
        paymentTermsDays: Number(form.paymentTermsDays) || 0,
      });
      showToast.success("Settings saved", "New invoices will use these defaults.");
      router.refresh();
    } catch (err) {
      showToast.error("Could not save", err instanceof Error ? err.message : undefined);
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.next.length < 8) return showToast.warning("Password too short", "Use at least 8 characters.");
    if (password.next !== password.confirm) return showToast.warning("Passwords don't match");
    setPwSaving(true);
    const { error } = await createClient().auth.updateUser({ password: password.next });
    setPwSaving(false);
    if (error) return showToast.error("Could not update password", error.message);
    setPassword({ next: "", confirm: "" });
    showToast.success("Password updated");
  };

  const deleteAccount = async () => {
    setDeleting(true);
    try {
      await api.account.remove();
      resetInvoice();
      await createClient().auth.signOut();
      window.location.href = "/?deleted=1";
    } catch (err) {
      showToast.error("Could not delete account", err instanceof Error ? err.message : undefined);
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={saveProfile} className="space-y-6">
        <Section id="profile" title="Profile" description="How you appear in InvoiceGen.">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="fullName" className="label">
                Full name
              </label>
              <input id="fullName" className="input" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} />
            </div>
            <div>
              <label htmlFor="email" className="label">
                Email
              </label>
              <input id="email" className="input" value={email} disabled />
            </div>
          </div>
        </Section>

        <Section
          id="business"
          title="Business details"
          description="Pre-filled into the “From” section of every new invoice."
        >
          <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
            <div>
              <span className="label">Logo</span>
              <LogoUpload id="settings-logo" value={form.logoDataUrl} onChange={(v) => set("logoDataUrl", v)} />
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="companyName" className="label">
                  Business name
                </label>
                <input
                  id="companyName"
                  className="input"
                  value={form.companyName}
                  onChange={(e) => set("companyName", e.target.value)}
                  placeholder="Acme Studio LLC"
                />
              </div>
              <div>
                <label htmlFor="businessInfo" className="label">
                  Address & contact
                </label>
                <textarea
                  id="businessInfo"
                  className="input resize-none"
                  rows={3}
                  value={form.businessInfo}
                  onChange={(e) => set("businessInfo", e.target.value)}
                  placeholder={"Street, City\nhello@acme.com · +1 555 0100\nVAT: GB123456789"}
                />
              </div>
            </div>
          </div>
        </Section>

        <Section id="defaults" title="Invoice defaults" description="Applied to new invoices — you can still change them per invoice.">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="defaultCurrency" className="label">
                Currency
              </label>
              <select
                id="defaultCurrency"
                className="input cursor-pointer"
                value={form.defaultCurrency}
                onChange={(e) => set("defaultCurrency", e.target.value)}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} — {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="defaultTaxRate" className="label">
                Tax rate (%)
              </label>
              <input
                id="defaultTaxRate"
                type="number"
                min={0}
                max={100}
                step={0.01}
                className="input"
                value={form.defaultTaxRate}
                onChange={(e) => set("defaultTaxRate", e.target.value as unknown as number)}
              />
            </div>
            <div>
              <label htmlFor="paymentTermsDays" className="label">
                Payment terms (days)
              </label>
              <input
                id="paymentTermsDays"
                type="number"
                min={0}
                max={365}
                className="input"
                value={form.paymentTermsDays}
                onChange={(e) => set("paymentTermsDays", e.target.value as unknown as number)}
              />
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="defaultNotes" className="label">
                Default notes
              </label>
              <textarea
                id="defaultNotes"
                className="input resize-none"
                rows={2}
                value={form.defaultNotes}
                onChange={(e) => set("defaultNotes", e.target.value)}
                placeholder="Bank details, thank-you note…"
              />
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="defaultTerms" className="label">
                Default terms
              </label>
              <textarea
                id="defaultTerms"
                className="input resize-none"
                rows={2}
                value={form.defaultTerms}
                onChange={(e) => set("defaultTerms", e.target.value)}
                placeholder="Payment due within 14 days. Late payments incur 1.5% monthly interest."
              />
            </div>
          </div>
        </Section>

        <div className="flex justify-end">
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />} Save settings
          </button>
        </div>
      </form>

      <Section id="security" title="Password" description="Choose a strong password you don't use elsewhere.">
        <form onSubmit={changePassword} className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <div>
            <label htmlFor="newPassword" className="label">
              New password
            </label>
            <input
              id="newPassword"
              type="password"
              autoComplete="new-password"
              className="input"
              value={password.next}
              onChange={(e) => setPassword({ ...password, next: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="label">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              className="input"
              value={password.confirm}
              onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
            />
          </div>
          <button type="submit" className="btn-navy" disabled={pwSaving || !password.next}>
            {pwSaving ? <Loader2 size={15} className="animate-spin" /> : <KeyRound size={15} />} Update
          </button>
        </form>
      </Section>

      <Section id="privacy" title="Your data" description="Download a copy of everything we store, or close your account.">
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="/api/account/export" className="btn-outline" download>
            <Download size={15} /> Export my data (JSON)
          </a>
          <button className="btn border border-red-200 bg-red-50 text-red-700 hover:bg-red-100" onClick={() => setDeleteOpen(true)}>
            <Trash2 size={15} /> Delete account
          </button>
        </div>
      </Section>

      <Modal
        open={deleteOpen}
        onClose={() => !deleting && setDeleteOpen(false)}
        title="Delete your account?"
        description="This permanently deletes your account, invoices, clients and subscription record. It cannot be undone."
        footer={
          <>
            <button className="btn-outline" onClick={() => setDeleteOpen(false)} disabled={deleting}>
              Cancel
            </button>
            <button className="btn-danger" onClick={deleteAccount} disabled={deleteText !== "DELETE" || deleting}>
              {deleting && <Loader2 size={14} className="animate-spin" />} Delete forever
            </button>
          </>
        }
      >
        <div className="space-y-3 pb-2">
          <p className="flex gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
            <ShieldAlert size={16} className="mt-0.5 flex-shrink-0" />
            Have an active paid plan? Cancel it from Billing first so you aren&apos;t charged again.
          </p>
          <label htmlFor="confirmDelete" className="label">
            Type DELETE to confirm
          </label>
          <input id="confirmDelete" className="input" value={deleteText} onChange={(e) => setDeleteText(e.target.value)} />
        </div>
      </Modal>
    </div>
  );
}
