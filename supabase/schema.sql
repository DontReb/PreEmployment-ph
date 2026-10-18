-- PreEmployment.ph database setup.
-- Paste this into Supabase: SQL Editor > New query > Run.

-- One row per user: the ids of the documents they've marked ready.
create table if not exists public.progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  done_ids text[] not null default '{}',
  updated_at timestamptz not null default now()
);

-- Row-level security: nobody can read or change someone else's progress.
alter table public.progress enable row level security;

drop policy if exists "Read own progress" on public.progress;
create policy "Read own progress" on public.progress
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "Insert own progress" on public.progress;
create policy "Insert own progress" on public.progress
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "Update own progress" on public.progress;
create policy "Update own progress" on public.progress
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Delete own progress" on public.progress;
create policy "Delete own progress" on public.progress
  for delete to authenticated using ((select auth.uid()) = user_id);

-- Lets a signed-in user delete their own account. Their progress row is
-- removed too, because of "on delete cascade" above.
create or replace function public.delete_own_account()
returns void
language sql
security definer
set search_path = ''
as $$
  delete from auth.users where id = auth.uid();
$$;

revoke all on function public.delete_own_account() from public, anon;
grant execute on function public.delete_own_account() to authenticated;
