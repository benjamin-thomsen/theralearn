begin;
create extension if not exists dblink with schema extensions;
select plan(34);

select has_table('public'::name, 'later_retrieval_single_consumptions'::name);
select columns_are('public', 'later_retrieval_single_consumptions', array[
  'authenticated_owner_identity', 'persisted_approved_package_identity',
  'approved_learning_design_identity', 'approved_learning_design_snapshot',
  'later_retrieval_prerequisite_identity', 'later_retrieval_prerequisite_snapshot',
  'completion_anchor_identity', 'completion_anchor_snapshot',
  'consumption_identity', 'created_at'
]);
select col_not_null('public', 'later_retrieval_single_consumptions', 'authenticated_owner_identity'::name);
select col_not_null('public', 'later_retrieval_single_consumptions', 'persisted_approved_package_identity'::name);
select col_not_null('public', 'later_retrieval_single_consumptions', 'approved_learning_design_identity'::name);
select col_not_null('public', 'later_retrieval_single_consumptions', 'approved_learning_design_snapshot'::name);
select col_not_null('public', 'later_retrieval_single_consumptions', 'later_retrieval_prerequisite_identity'::name);
select col_not_null('public', 'later_retrieval_single_consumptions', 'later_retrieval_prerequisite_snapshot'::name);
select col_not_null('public', 'later_retrieval_single_consumptions', 'completion_anchor_identity'::name);
select col_not_null('public', 'later_retrieval_single_consumptions', 'completion_anchor_snapshot'::name);
select col_not_null('public', 'later_retrieval_single_consumptions', 'consumption_identity'::name);
select col_not_null('public', 'later_retrieval_single_consumptions', 'created_at'::name);

select col_is_unique('public', 'later_retrieval_single_consumptions', array[
  'authenticated_owner_identity', 'persisted_approved_package_identity',
  'approved_learning_design_identity', 'approved_learning_design_snapshot',
  'later_retrieval_prerequisite_identity', 'later_retrieval_prerequisite_snapshot',
  'completion_anchor_identity', 'completion_anchor_snapshot'
]);
select function_privs_are('public', 'create_later_retrieval_single_consumption_once', array['uuid','text','text','text','text','text','uuid','text'], 'service_role', array['EXECUTE']);
select function_privs_are('public', 'create_later_retrieval_single_consumption_once', array['uuid','text','text','text','text','text','uuid','text'], 'anon', array[]::text[]);
select function_privs_are('public', 'create_later_retrieval_single_consumption_once', array['uuid','text','text','text','text','text','uuid','text'], 'authenticated', array[]::text[]);
select table_privs_are('public', 'later_retrieval_single_consumptions', 'public', array[]::text[]);
select table_privs_are('public', 'later_retrieval_single_consumptions', 'anon', array[]::text[]);
select table_privs_are('public', 'later_retrieval_single_consumptions', 'authenticated', array[]::text[]);

set local role service_role;
select results_eq(
  $$select count(*)::bigint from public.create_later_retrieval_single_consumption_once(
    '11111111-1111-4111-8111-111111111111', 'package', 'design', 'design-snapshot',
    'prerequisite', 'prerequisite-snapshot', '22222222-2222-4222-8222-222222222222', 'anchor-snapshot')$$,
  array[1::bigint],
  'the first exact tuple creates and returns one fact'
);
select results_eq(
  $$select count(*)::bigint from public.create_later_retrieval_single_consumption_once(
    '11111111-1111-4111-8111-111111111111', 'package', 'design', 'design-snapshot',
    'prerequisite', 'prerequisite-snapshot', '22222222-2222-4222-8222-222222222222', 'anchor-snapshot')$$,
  array[0::bigint],
  'identical replay returns no fact or identity'
);
select results_eq(
  $$select count(*)::bigint from public.create_later_retrieval_single_consumption_once(
    '11111111-1111-4111-8111-111111111111', 'package-other', 'design', 'design-snapshot',
    'prerequisite', 'prerequisite-snapshot', '22222222-2222-4222-8222-222222222222', 'anchor-snapshot')$$,
  array[1::bigint],
  'one changed tuple component is independent'
);
select throws_ok(
  $$select * from public.create_later_retrieval_single_consumption_once(
    null, 'package-null', 'design', 'design-snapshot', 'prerequisite',
    'prerequisite-snapshot', '22222222-2222-4222-8222-222222222222', 'anchor-snapshot')$$,
  '23502', null,
  'a partial or null tuple is rejected'
);
reset role;

select throws_ok(
  $$update public.later_retrieval_single_consumptions set approved_learning_design_snapshot = 'changed'$$,
  '23514', 'later retrieval single consumption facts are terminal and immutable'
);
select throws_ok(
  $$delete from public.later_retrieval_single_consumptions$$,
  '23514', 'later retrieval single consumption facts are terminal and immutable'
);

select is(extensions.dblink_connect('winner', 'host=host.docker.internal port=54322 dbname=postgres user=postgres password=postgres'), 'OK');
select is(extensions.dblink_connect('loser', 'host=host.docker.internal port=54322 dbname=postgres user=postgres password=postgres'), 'OK');
select ok(extensions.dblink_send_query('winner', $$
  with barrier as (select pg_advisory_xact_lock(608251100))
  select count(*)::text from barrier cross join lateral public.create_later_retrieval_single_consumption_once(
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'concurrent-package', 'design', 'design-snapshot',
    'prerequisite', 'prerequisite-snapshot', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'anchor-snapshot')
$$) = 1);
select ok(extensions.dblink_send_query('loser', $$
  with barrier as (select pg_advisory_xact_lock(608251100))
  select count(*)::text from barrier cross join lateral public.create_later_retrieval_single_consumption_once(
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'concurrent-package', 'design', 'design-snapshot',
    'prerequisite', 'prerequisite-snapshot', 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', 'anchor-snapshot')
$$) = 1);
select results_eq(
  $$select result::bigint from extensions.dblink_get_result('winner') as result(result text)$$,
  array[1::bigint],
  'one controlled concurrent invocation wins'
);
select results_eq(
  $$select result::bigint from extensions.dblink_get_result('loser') as result(result text)$$,
  array[0::bigint],
  'the controlled concurrent loser receives no fact or identity'
);
select extensions.dblink_disconnect('winner');
select extensions.dblink_disconnect('loser');
select is(
  (select count(*) from public.later_retrieval_single_consumptions where authenticated_owner_identity = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
  1::bigint,
  'controlled concurrency commits exactly one immutable fact'
);
select is(
  (select count(distinct consumption_identity) from public.later_retrieval_single_consumptions where authenticated_owner_identity = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
  1::bigint,
  'controlled concurrency creates exactly one database-owned identity'
);

truncate table public.later_retrieval_single_consumptions;
select is((select count(*) from public.later_retrieval_single_consumptions), 0::bigint, 'the proof retains no test data');

select * from finish();
drop extension dblink;
commit;
