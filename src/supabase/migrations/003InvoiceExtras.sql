-- ============================================================================
--  InvoiceGen — invoice extras (document title, tax name, payment details)
--
--  Safe to run more than once. Run it in Supabase → SQL Editor after 002.
--  Until it runs, the app keeps working and simply doesn't store these fields.
-- ============================================================================

alter table public.invoices add column if not exists payment_details text;
alter table public.invoices add column if not exists document_title text not null default 'invoice';
alter table public.invoices add column if not exists tax_label text;

alter table public.invoices drop constraint if exists invoices_document_title_check;
alter table public.invoices add constraint invoices_document_title_check
  check (document_title in ('invoice', 'tax_invoice', 'proforma'));

alter table public.profiles add column if not exists default_payment_details text;

-- Fast lookup for the "invoice number already used" check.
create index if not exists invoices_user_number_idx on public.invoices(user_id, invoice_number);

notify pgrst, 'reload schema';
