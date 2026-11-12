-- Allow proposals submitted from the AI intake chat.
alter table public.inquiries drop constraint if exists inquiries_kind_check;
alter table public.inquiries add constraint inquiries_kind_check check (kind in ('project', 'contact', 'proposal'));
