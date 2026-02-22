-- Invoice SaaS Schema
-- Run in Supabase SQL Editor

-- Enable UUID extension if not exists
create extension if not exists "uuid-ossp";

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Invoices
create table if not exists public.invoices (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  -- JSONB for flexibility
  data jsonb not null default '{}',
  status text default 'draft' check (status in ('draft', 'sent', 'paid', 'overdue')),
  grand_total decimal(12,2) default 0,
  currency text default 'USD',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Admin config (AdSense placements)
create table if not exists public.admin_config (
  key text primary key,
  value jsonb not null default '{}',
  updated_at timestamptz default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.invoices enable row level security;
alter table public.admin_config enable row level security;

-- Profiles: users can read/update own
create policy "Profiles: own read" on public.profiles
  for select using (auth.uid() = id);
create policy "Profiles: own update" on public.profiles
  for update using (auth.uid() = id);

-- Invoices: users can CRUD own
create policy "Invoices: own select" on public.invoices
  for select using (auth.uid() = user_id);
create policy "Invoices: own insert" on public.invoices
  for insert with check (auth.uid() = user_id);
create policy "Invoices: own update" on public.invoices
  for update using (auth.uid() = user_id);
create policy "Invoices: own delete" on public.invoices
  for delete using (auth.uid() = user_id);

-- Admin: restrict to service role (admin panel uses RPC or service key)
-- For simplicity, add admin check via app logic; RLS allows no direct access
create policy "Admin config: no direct access" on public.admin_config
  for all using (false);

-- Trigger: update profiles on auth user insert
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
