"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { api } from "@/src/lib/api-client";
import { showToast } from "@/src/utils/showToast";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await api.contact(form);
      if (res.mailto) window.location.href = res.mailto;
      setSent(true);
    } catch (err) {
      showToast.error("Message not sent", err instanceof Error ? err.message : undefined);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="panel flex flex-col items-center justify-center p-10 text-center">
        <CheckCircle2 size={36} className="mb-3 text-emerald-600" />
        <h2 className="mb-1 text-lg font-black text-navy">Thanks, {form.name.split(" ")[0] || "there"}!</h2>
        <p className="text-sm text-navy-500">We&apos;ll reply to {form.email} as soon as possible.</p>
      </div>
    );
  }

  const input = (key: keyof typeof form, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div>
      <label htmlFor={`contact-${key}`} className="label">
        {label}
      </label>
      <input
        id={`contact-${key}`}
        className="input"
        required
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        {...props}
      />
    </div>
  );

  return (
    <form onSubmit={submit} className="panel grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
      {input("name", "Your name", { autoComplete: "name" })}
      {input("email", "Email", { type: "email", autoComplete: "email" })}
      <div className="sm:col-span-2">{input("subject", "Subject")}</div>
      <div className="sm:col-span-2">
        <label htmlFor="contact-message" className="label">
          Message
        </label>
        <textarea
          id="contact-message"
          className="input resize-none"
          rows={6}
          required
          minLength={10}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>
      <div className="sm:col-span-2">
        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={sending}>
          {sending ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />} Send message
        </button>
      </div>
    </form>
  );
}
