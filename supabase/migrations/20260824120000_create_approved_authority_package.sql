-- Exactly one immutable approved Creator-to-Learner authority package per owner.

create table public.approved_authority_packages (
  owner_id uuid primary key references auth.users(id) on delete cascade,
  package_identity text not null,
  serialized_package text not null,
  package_digest text not null,
  created_at timestamptz not null default now(),

  constraint approved_authority_package_identity_not_empty
    check (length(package_identity) > 0),
  constraint approved_authority_package_payload_not_empty
    check (length(serialized_package) > 0),
  constraint approved_authority_package_digest_sha256
    check (package_digest ~ '^[0-9a-f]{64}$')
);

comment on table public.approved_authority_packages is
  'Exactly one immutable approved authority package for the authenticated MVP user-test owner.';

alter table public.approved_authority_packages enable row level security;

create policy "Owners can read their approved authority package"
on public.approved_authority_packages
for select
to authenticated
using ((select auth.uid()) = owner_id);

-- There are intentionally no INSERT, UPDATE, or DELETE policies. Authenticated
-- clients can only read their own package; creation is confined to the
-- authenticated server persistence boundary.
