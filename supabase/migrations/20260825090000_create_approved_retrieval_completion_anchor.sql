alter table public.approved_authority_packages add constraint approved_authority_packages_owner_package_key unique (owner_id, package_identity);
create table public.approved_retrieval_completion_anchors (
 owner_id uuid not null, package_identity text not null,
 approved_learning_design_identity text not null, approved_learning_design_snapshot text not null,
 response_evaluation_contract_identity text not null, response_evaluation_contract_snapshot text not null,
 retrieval_interaction_identity text not null,
 terminal_interaction_digest text not null constraint completion_terminal_digest_sha256 check (terminal_interaction_digest ~ '^[0-9a-f]{64}$'),
 completed_at timestamptz not null default statement_timestamp(),
 primary key (owner_id, package_identity),
 foreign key (owner_id, package_identity) references public.approved_authority_packages(owner_id, package_identity) on delete cascade
);
alter table public.approved_retrieval_completion_anchors enable row level security;
create policy "Owners can read their exact completed anchor" on public.approved_retrieval_completion_anchors for select to authenticated using ((select auth.uid()) = owner_id);
revoke all on public.approved_retrieval_completion_anchors from anon, authenticated;
grant select (owner_id, package_identity, approved_learning_design_identity, approved_learning_design_snapshot, response_evaluation_contract_identity, response_evaluation_contract_snapshot, retrieval_interaction_identity, completed_at) on public.approved_retrieval_completion_anchors to authenticated;

create function public.create_retrieval_completion_anchor_once(
 p_owner_id uuid, p_package_identity text,
 p_approved_learning_design_identity text, p_approved_learning_design_snapshot text,
 p_response_evaluation_contract_identity text, p_response_evaluation_contract_snapshot text,
 p_retrieval_interaction_identity text, p_terminal_interaction_digest text
) returns setof public.approved_retrieval_completion_anchors language plpgsql security definer set search_path = '' as $$
declare existing public.approved_retrieval_completion_anchors%rowtype;
begin
 insert into public.approved_retrieval_completion_anchors (owner_id, package_identity, approved_learning_design_identity, approved_learning_design_snapshot, response_evaluation_contract_identity, response_evaluation_contract_snapshot, retrieval_interaction_identity, terminal_interaction_digest)
 values (p_owner_id, p_package_identity, p_approved_learning_design_identity, p_approved_learning_design_snapshot, p_response_evaluation_contract_identity, p_response_evaluation_contract_snapshot, p_retrieval_interaction_identity, p_terminal_interaction_digest)
 on conflict (owner_id, package_identity) do nothing returning * into existing;
 if found then return next existing; return; end if;
 select * into existing from public.approved_retrieval_completion_anchors where owner_id=p_owner_id and package_identity=p_package_identity for update;
 if existing.approved_learning_design_identity is distinct from p_approved_learning_design_identity
  or existing.approved_learning_design_snapshot is distinct from p_approved_learning_design_snapshot
  or existing.response_evaluation_contract_identity is distinct from p_response_evaluation_contract_identity
  or existing.response_evaluation_contract_snapshot is distinct from p_response_evaluation_contract_snapshot
  or existing.retrieval_interaction_identity is distinct from p_retrieval_interaction_identity
  or existing.terminal_interaction_digest is distinct from p_terminal_interaction_digest
 then raise exception 'conflicting completion anchor replay' using errcode='23505'; end if;
 return next existing;
end; $$;
revoke all on function public.create_retrieval_completion_anchor_once(uuid,text,text,text,text,text,text,text) from public, anon, authenticated;
grant execute on function public.create_retrieval_completion_anchor_once(uuid,text,text,text,text,text,text,text) to service_role;
