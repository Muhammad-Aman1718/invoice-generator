-- ============================================================================
--  InvoiceGen — complete schema (roles, clients, subscriptions, RLS)
--
--  Safe to run more than once, and safe to run on a database that already has
--  the tables from 001: every statement is "if not exists" / "or replace".
--  Run the whole file in Supabase → SQL Editor.
--
--  After running it, make yourself an admin:
--    update public.profiles set role = 'admin' where email = 'you@example.com';
-- ============================================================================

create extension if not exists "pgcrypto";

-- ─── Profiles ───────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists role text not null default 'user';
alter table public.profiles add column if not exists company_name text;
alter table public.profiles add column if not exists business_info text;
alter table public.profiles add column if not exists logo_data_url text;
alter table public.profiles add column if not exists default_currency text not null default 'USD';
alter table public.profiles add column if not exists default_tax_rate numeric(6,3) not null default 0;
alter table public.profiles add column if not exists default_notes text;
alter table public.profiles add column if not exists default_terms text;
alter table public.profiles add column if not exists payment_terms_days integer not null default 14;
alter table public.profiles add column if not exists is_suspended boolean not null default false;

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check check (role in ('user', 'admin'));

-- ─── Clients ────────────────────────────────────────────────────────────────
create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  address text,
  tax_id text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists clients_user_id_idx on public.clients(user_id);

-- ─── Invoices ───────────────────────────────────────────────────────────────
create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.invoices add column if not exists client_id uuid references public.clients(id) on delete set null;
alter table public.invoices add column if not exists invoice_number integer not null default 1;
alter table public.invoices add column if not exists logo_data_url text;
alter table public.invoices add column if not exists stamp_url text;
alter table public.invoices add column if not exists currency text not null default 'USD';
alter table public.invoices add column if not exists business_name text;
alter table public.invoices add column if not exists bussiness_info text;
alter table public.invoices add column if not exists issue_date date;
alter table public.invoices add column if not exists due_date date;
alter table public.invoices add column if not exists po_number text;
alter table public.invoices add column if not exists client_name text;
alter table public.invoices add column if not exists client_address text;
alter table public.invoices add column if not exists ship_to text;
alter table public.invoices add column if not exists line_items jsonb not null default '[]'::jsonb;
alter table public.invoices add column if not exists notes text;
alter table public.invoices add column if not exists terms text;
alter table public.invoices add column if not exists subtotal numeric(14,2) not null default 0;
alter table public.invoices add column if not exists overall_discount numeric(6,3) not null default 0;
alter table public.invoices add column if not exists tax_rate numeric(6,3) not null default 0;
alter table public.invoices add column if not exists total_amount numeric(14,2) not null default 0;
alter table public.invoices add column if not exists status text not null default 'pending';
alter table public.invoices add column if not exists paid_at timestamptz;

-- Legacy rows from 001 used 'sent'; keep it valid so nothing breaks.
alter table public.invoices drop constraint if exists invoices_status_check;
alter table public.invoices add constraint invoices_status_check
  check (status in ('draft', 'pending', 'sent', 'paid', 'overdue', 'cancelled'));

create index if not exists invoices_user_id_idx on public.invoices(user_id);
create index if not exists invoices_user_created_idx on public.invoices(user_id, created_at desc);

-- ─── Subscriptions ──────────────────────────────────────────────────────────
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  plan text not null default 'free',
  status text not null default 'active',
  billing_interval text not null default 'month',
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  provider text not null default 'manual',
  provider_customer_id text,
  provider_subscription_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.subscriptions drop constraint if exists subscriptions_plan_check;
alter table public.subscriptions add constraint subscriptions_plan_check
  check (plan in ('free', 'pro', 'business'));
alter table public.subscriptions drop constraint if exists subscriptions_status_check;
alter table public.subscriptions add constraint subscriptions_status_check
  check (status in ('active', 'trialing', 'past_due', 'canceled'));
alter table public.subscriptions drop constraint if exists subscriptions_interval_check;
alter table public.subscriptions add constraint subscriptions_interval_check
  check (billing_interval in ('month', 'year'));

create index if not exists subscriptions_provider_sub_idx on public.subscriptions(provider_subscription_id);

-- ─── Admin config (kept from 001) ───────────────────────────────────────────
create table if not exists public.admin_config (
  key text primary key,
  value jsonb not null default '{}',
  updated_at timestamptz default now()
);

-- ─── Helper functions ───────────────────────────────────────────────────────
create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- Effective plan: a paid plan only counts while it is active/trialing and not expired.
create or replace function public.effective_plan(target_user uuid)
returns text
language sql stable security definer set search_path = public
as $$
  select coalesce((
    select s.plan from public.subscriptions s
    where s.user_id = target_user
      and s.status in ('active', 'trialing')
      and (s.current_period_end is null or s.current_period_end > now())
  ), 'free');
$$;

create or replace function public.get_next_invoice_number(target_user_id uuid default auth.uid())
returns integer
language sql stable security definer set search_path = public
as $$
  select coalesce(max(invoice_number), 0) + 1
  from public.invoices
  where user_id = target_user_id and target_user_id = auth.uid();
$$;

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch before update on public.profiles
  for each row execute procedure public.touch_updated_at();
drop trigger if exists invoices_touch on public.invoices;
create trigger invoices_touch before update on public.invoices
  for each row execute procedure public.touch_updated_at();
drop trigger if exists clients_touch on public.clients;
create trigger clients_touch before update on public.clients
  for each row execute procedure public.touch_updated_at();
drop trigger if exists subscriptions_touch on public.subscriptions;
create trigger subscriptions_touch before update on public.subscriptions
  for each row execute procedure public.touch_updated_at();

-- Users may edit their own profile but never their own role / suspension.
create or replace function public.protect_profile_columns()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if public.is_admin() or coalesce(auth.role(), '') in ('service_role', '') then
    return new;
  end if;
  if tg_op = 'INSERT' then
    new.role := 'user';
    new.is_suspended := false;
  elsif new.role is distinct from old.role or new.is_suspended is distinct from old.is_suspended then
    raise exception 'Only admins can change role or suspension status';
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_protect on public.profiles;
create trigger profiles_protect before insert or update on public.profiles
  for each row execute procedure public.protect_profile_columns();

-- Plan limits (keep in sync with src/constant/plans.ts).
create or replace function public.enforce_plan_limits()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  plan text := public.effective_plan(new.user_id);
  used integer;
begin
  if plan <> 'free' then
    return new;
  end if;

  if tg_table_name = 'invoices' then
    select count(*) into used from public.invoices
      where user_id = new.user_id
        and created_at >= date_trunc('month', now());
    if used >= 10 then
      raise exception 'PLAN_LIMIT: The Free plan allows 10 invoices per month. Upgrade to create more.';
    end if;
  elsif tg_table_name = 'clients' then
    select count(*) into used from public.clients where user_id = new.user_id;
    if used >= 5 then
      raise exception 'PLAN_LIMIT: The Free plan allows 5 saved clients. Upgrade to add more.';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists invoices_plan_limit on public.invoices;
create trigger invoices_plan_limit before insert on public.invoices
  for each row execute procedure public.enforce_plan_limits();
drop trigger if exists clients_plan_limit on public.clients;
create trigger clients_plan_limit before insert on public.clients
  for each row execute procedure public.enforce_plan_limits();

-- New auth user → profile + free subscription.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;

  insert into public.subscriptions (user_id, plan, status)
  values (new.id, 'free', 'active')
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Backfill users that signed up before this migration.
insert into public.profiles (id, email)
  select u.id, u.email from auth.users u
  on conflict (id) do nothing;
insert into public.subscriptions (user_id, plan, status)
  select u.id, 'free', 'active' from auth.users u
  on conflict (user_id) do nothing;

-- GDPR: let a user delete their own account (cascades to all their data).
create or replace function public.delete_my_account()
returns void language plpgsql security definer set search_path = public, auth as $$
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;
  delete from auth.users where id = auth.uid();
end;
$$;

revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;

-- ─── Row Level Security ─────────────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.invoices enable row level security;
alter table public.clients enable row level security;
alter table public.subscriptions enable row level security;
alter table public.admin_config enable row level security;

-- Drop old policy names from 001 so this file can be re-run cleanly.
drop policy if exists "Profiles: own read" on public.profiles;
drop policy if exists "Profiles: own update" on public.profiles;
drop policy if exists "Invoices: own select" on public.invoices;
drop policy if exists "Invoices: own insert" on public.invoices;
drop policy if exists "Invoices: own update" on public.invoices;
drop policy if exists "Invoices: own delete" on public.invoices;
drop policy if exists "Admin config: no direct access" on public.admin_config;

drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles
  for select using (auth.uid() = id or public.is_admin());
drop policy if exists profiles_insert on public.profiles;
create policy profiles_insert on public.profiles
  for insert with check (auth.uid() = id);
drop policy if exists profiles_update on public.profiles;
create policy profiles_update on public.profiles
  for update using (auth.uid() = id or public.is_admin());

drop policy if exists invoices_select on public.invoices;
create policy invoices_select on public.invoices
  for select using (auth.uid() = user_id or public.is_admin());
drop policy if exists invoices_insert on public.invoices;
create policy invoices_insert on public.invoices
  for insert with check (auth.uid() = user_id);
drop policy if exists invoices_update on public.invoices;
create policy invoices_update on public.invoices
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists invoices_delete on public.invoices;
create policy invoices_delete on public.invoices
  for delete using (auth.uid() = user_id or public.is_admin());

drop policy if exists clients_all on public.clients;
create policy clients_all on public.clients
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists subscriptions_select on public.subscriptions;
create policy subscriptions_select on public.subscriptions
  for select using (auth.uid() = user_id or public.is_admin());
drop policy if exists subscriptions_admin_write on public.subscriptions;
create policy subscriptions_admin_write on public.subscriptions
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists admin_config_admin on public.admin_config;
create policy admin_config_admin on public.admin_config
  for all using (public.is_admin()) with check (public.is_admin());
