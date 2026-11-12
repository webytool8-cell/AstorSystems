-- Inquiries submitted through the website (project + contact forms).
-- Inserted server-side by /api/inquiry using the service role key.
create table if not exists public.inquiries (
  id          uuid primary key default gen_random_uuid(),
  reference   text not null unique,
  received_at timestamptz not null default now(),
  kind        text not null check (kind in ('project', 'contact')),
  name        text not null,
  email       text not null,
  company     text,
  priority    text not null default 'standard' check (priority in ('high', 'standard')),
  signals     text[] not null default '{}',
  payload     jsonb not null,
  user_agent  text,
  status      text not null default 'new' check (status in ('new', 'reviewing', 'qualified', 'declined', 'converted'))
);

create index if not exists inquiries_received_at_idx on public.inquiries (received_at desc);
create index if not exists inquiries_status_idx on public.inquiries (status);

-- Row level security on with no policies: only the service role (server) can read/write.
-- Add authenticated-admin policies when the Phase 3 admin dashboard is built.
alter table public.inquiries enable row level security;
