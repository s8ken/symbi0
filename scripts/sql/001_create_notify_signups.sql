-- Create a table for email capture signups
-- Run this in your Supabase (Neon/Postgres) database.

create table if not exists public.notify_signups (
  id bigint generated always as identity primary key,
  email text not null,
  source text,
  ua text,
  ip text,
  created_at timestamptz not null default now()
);

-- Useful index for dedupe/search
create index if not exists idx_notify_signups_email on public.notify_signups (email);
