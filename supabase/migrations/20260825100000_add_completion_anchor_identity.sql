alter table public.approved_retrieval_completion_anchors
  add column completion_anchor_identity uuid not null default gen_random_uuid(),
  add constraint approved_retrieval_completion_anchors_identity_key unique (completion_anchor_identity);

create function public.reject_completion_anchor_identity_update()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.completion_anchor_identity is distinct from old.completion_anchor_identity then
    raise exception 'completion anchor identity is immutable' using errcode = '23514';
  end if;
  return new;
end;
$$;

create trigger completion_anchor_identity_immutable
before update of completion_anchor_identity on public.approved_retrieval_completion_anchors
for each row execute function public.reject_completion_anchor_identity_update();

revoke all on function public.reject_completion_anchor_identity_update() from public, anon, authenticated;

grant select (completion_anchor_identity)
on public.approved_retrieval_completion_anchors
to authenticated;
