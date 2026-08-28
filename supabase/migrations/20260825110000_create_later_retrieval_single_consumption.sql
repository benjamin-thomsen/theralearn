create table public.later_retrieval_single_consumptions (
  authenticated_owner_identity uuid not null,
  persisted_approved_package_identity text not null,
  approved_learning_design_identity text not null,
  approved_learning_design_snapshot text not null,
  later_retrieval_prerequisite_identity text not null,
  later_retrieval_prerequisite_snapshot text not null,
  completion_anchor_identity uuid not null,
  completion_anchor_snapshot text not null,
  consumption_identity uuid not null default gen_random_uuid(),
  created_at timestamptz not null default statement_timestamp(),
  constraint later_retrieval_single_consumptions_consumption_identity_key
    unique (consumption_identity),
  constraint later_retrieval_single_consumptions_exact_tuple_key unique (
    authenticated_owner_identity,
    persisted_approved_package_identity,
    approved_learning_design_identity,
    approved_learning_design_snapshot,
    later_retrieval_prerequisite_identity,
    later_retrieval_prerequisite_snapshot,
    completion_anchor_identity,
    completion_anchor_snapshot
  )
);

alter table public.later_retrieval_single_consumptions enable row level security;
revoke all on table public.later_retrieval_single_consumptions from public, anon, authenticated;

create function public.reject_later_retrieval_single_consumption_mutation()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  raise exception 'later retrieval single consumption facts are terminal and immutable'
    using errcode = '23514';
end;
$$;

create trigger later_retrieval_single_consumptions_reject_update
before update on public.later_retrieval_single_consumptions
for each row execute function public.reject_later_retrieval_single_consumption_mutation();

create trigger later_retrieval_single_consumptions_reject_delete
before delete on public.later_retrieval_single_consumptions
for each row execute function public.reject_later_retrieval_single_consumption_mutation();

revoke all on function public.reject_later_retrieval_single_consumption_mutation()
from public, anon, authenticated;

create function public.create_later_retrieval_single_consumption_once(
  p_authenticated_owner_identity uuid,
  p_persisted_approved_package_identity text,
  p_approved_learning_design_identity text,
  p_approved_learning_design_snapshot text,
  p_later_retrieval_prerequisite_identity text,
  p_later_retrieval_prerequisite_snapshot text,
  p_completion_anchor_identity uuid,
  p_completion_anchor_snapshot text
)
returns setof public.later_retrieval_single_consumptions
language sql
security definer
set search_path = ''
as $$
  insert into public.later_retrieval_single_consumptions (
    authenticated_owner_identity,
    persisted_approved_package_identity,
    approved_learning_design_identity,
    approved_learning_design_snapshot,
    later_retrieval_prerequisite_identity,
    later_retrieval_prerequisite_snapshot,
    completion_anchor_identity,
    completion_anchor_snapshot
  ) values (
    p_authenticated_owner_identity,
    p_persisted_approved_package_identity,
    p_approved_learning_design_identity,
    p_approved_learning_design_snapshot,
    p_later_retrieval_prerequisite_identity,
    p_later_retrieval_prerequisite_snapshot,
    p_completion_anchor_identity,
    p_completion_anchor_snapshot
  )
  on conflict on constraint later_retrieval_single_consumptions_exact_tuple_key do nothing
  returning *;
$$;

revoke all on function public.create_later_retrieval_single_consumption_once(uuid,text,text,text,text,text,uuid,text)
from public, anon, authenticated;
grant execute on function public.create_later_retrieval_single_consumption_once(uuid,text,text,text,text,text,uuid,text)
to service_role;
