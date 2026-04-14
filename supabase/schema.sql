create extension if not exists "pgcrypto";

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  amount numeric(12, 2) not null check (amount > 0),
  category text not null check (category in ('Food', 'Travel', 'Bills', 'Other')),
  note text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists expenses_user_id_created_at_idx
  on public.expenses (user_id, created_at desc);

alter table public.expenses enable row level security;

create policy "Users can view own expenses"
on public.expenses
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert own expenses"
on public.expenses
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update own expenses"
on public.expenses
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own expenses"
on public.expenses
for delete
to authenticated
using (auth.uid() = user_id);
