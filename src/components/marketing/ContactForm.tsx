"use client";

import { Loader2, Send } from "lucide-react";
import ContactSuccess from "./ContactSuccess";
import TextField from "@/src/components/ui/TextField";
import TextAreaField from "@/src/components/ui/TextAreaField";
import useContactForm from "@/src/hooks/useContactForm";
import { CONTACT_MESSAGE_MIN_LENGTH } from "@/src/constant/limits";

export default function ContactForm() {
  const { values, setValue, isSending, isSent, handleSubmit } = useContactForm();
  if (isSent) return <ContactSuccess name={values.name} email={values.email} />;

  return (
    <form onSubmit={handleSubmit} className="panel grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
      <TextField
        id="contactName"
        label="Your name"
        autoComplete="name"
        required
        value={values.name}
        onChange={(event) => setValue("name", event.target.value)}
      />
      <TextField
        id="contactEmail"
        label="Email"
        type="email"
        autoComplete="email"
        required
        value={values.email}
        onChange={(event) => setValue("email", event.target.value)}
      />
      <TextField
        id="contactSubject"
        label="Subject"
        className="sm:col-span-2"
        required
        value={values.subject}
        onChange={(event) => setValue("subject", event.target.value)}
      />
      <TextAreaField
        id="contactMessage"
        label="Message"
        className="sm:col-span-2"
        rows={6}
        required
        minLength={CONTACT_MESSAGE_MIN_LENGTH}
        value={values.message}
        onChange={(event) => setValue("message", event.target.value)}
      />
      <div className="sm:col-span-2">
        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={isSending}>
          {isSending ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />} Send message
        </button>
      </div>
    </form>
  );
}
