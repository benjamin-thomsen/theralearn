-- TheraLearn MVP database schema
-- Migration: create_mvp_database_schema

create extension if not exists pgcrypto;

-- =========================================================
-- Shared updated_at trigger
-- =========================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =========================================================
-- Profiles
-- =========================================================

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is
  'Public application profile connected one-to-one with Supabase Auth.';

comment on column public.profiles.id is
  'Matches the corresponding user ID in auth.users.';

create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

-- Automatically create a profile when a Supabase Auth user is created.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (
    id,
    full_name
  )
  values (
    new.id,
    nullif(trim(new.raw_user_meta_data ->> 'full_name'), '')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

-- Create profiles for users that already exist before this migration.

insert into public.profiles (
  id,
  full_name
)
select
  users.id,
  nullif(trim(users.raw_user_meta_data ->> 'full_name'), '')
from auth.users as users
on conflict (id) do nothing;

-- =========================================================
-- Courses
-- =========================================================

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint courses_slug_not_empty
    check (length(trim(slug)) > 0),

  constraint courses_title_not_empty
    check (length(trim(title)) > 0),

  constraint courses_sort_order_non_negative
    check (sort_order >= 0)
);

comment on table public.courses is
  'Top-level learning courses in TheraLearn.';

create trigger set_courses_updated_at
before update on public.courses
for each row
execute function public.set_updated_at();

-- =========================================================
-- Chapters
-- =========================================================

create table public.chapters (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  slug text not null,
  title text not null,
  description text,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint chapters_course_slug_unique
    unique (course_id, slug),

  constraint chapters_slug_not_empty
    check (length(trim(slug)) > 0),

  constraint chapters_title_not_empty
    check (length(trim(title)) > 0),

  constraint chapters_sort_order_non_negative
    check (sort_order >= 0)
);

comment on table public.chapters is
  'Ordered chapters belonging to a course.';

create index chapters_course_id_sort_order_idx
  on public.chapters (course_id, sort_order);

create trigger set_chapters_updated_at
before update on public.chapters
for each row
execute function public.set_updated_at();

-- =========================================================
-- Lessons
-- =========================================================

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references public.chapters(id) on delete cascade,
  slug text not null,
  title text not null,
  summary text,
  content text not null default '',
  learning_objectives text[] not null default array[]::text[],
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint lessons_chapter_slug_unique
    unique (chapter_id, slug),

  constraint lessons_slug_not_empty
    check (length(trim(slug)) > 0),

  constraint lessons_title_not_empty
    check (length(trim(title)) > 0),

  constraint lessons_sort_order_non_negative
    check (sort_order >= 0)
);

comment on table public.lessons is
  'Individual learning lessons belonging to a chapter.';

comment on column public.lessons.learning_objectives is
  'Ordered learning objectives displayed for the lesson.';

create index lessons_chapter_id_sort_order_idx
  on public.lessons (chapter_id, sort_order);

create trigger set_lessons_updated_at
before update on public.lessons
for each row
execute function public.set_updated_at();

-- =========================================================
-- Flashcards
-- =========================================================

create table public.flashcards (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  front_text text not null,
  back_text text not null,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint flashcards_front_text_not_empty
    check (length(trim(front_text)) > 0),

  constraint flashcards_back_text_not_empty
    check (length(trim(back_text)) > 0),

  constraint flashcards_sort_order_non_negative
    check (sort_order >= 0)
);

comment on table public.flashcards is
  'Flashcards connected directly to an individual lesson.';

create index flashcards_lesson_id_sort_order_idx
  on public.flashcards (lesson_id, sort_order);

create trigger set_flashcards_updated_at
before update on public.flashcards
for each row
execute function public.set_updated_at();

-- =========================================================
-- Quiz questions
-- =========================================================

create table public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  question text not null,
  options text[] not null,
  correct_answer integer not null,
  explanation text,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint quiz_questions_question_not_empty
    check (length(trim(question)) > 0),

  constraint quiz_questions_minimum_two_options
    check (cardinality(options) >= 2),

  constraint quiz_questions_correct_answer_valid
    check (
      correct_answer >= 0
      and correct_answer < cardinality(options)
    ),

  constraint quiz_questions_sort_order_non_negative
    check (sort_order >= 0)
);

comment on table public.quiz_questions is
  'Multiple-choice quiz questions connected directly to a lesson.';

comment on column public.quiz_questions.correct_answer is
  'Zero-based index pointing to the correct value in options.';

create index quiz_questions_lesson_id_sort_order_idx
  on public.quiz_questions (lesson_id, sort_order);

create trigger set_quiz_questions_updated_at
before update on public.quiz_questions
for each row
execute function public.set_updated_at();

-- =========================================================
-- Lesson progress
-- =========================================================

create table public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  is_completed boolean not null default false,
  completed_at timestamptz,
  last_viewed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint lesson_progress_user_lesson_unique
    unique (user_id, lesson_id),

  constraint lesson_progress_completion_consistent
    check (
      (is_completed = true and completed_at is not null)
      or
      (is_completed = false and completed_at is null)
    )
);

comment on table public.lesson_progress is
  'Per-user lesson completion state. Overall percentages are calculated dynamically.';

create index lesson_progress_user_id_idx
  on public.lesson_progress (user_id);

create index lesson_progress_lesson_id_idx
  on public.lesson_progress (lesson_id);

create trigger set_lesson_progress_updated_at
before update on public.lesson_progress
for each row
execute function public.set_updated_at();

-- =========================================================
-- Row Level Security
-- =========================================================

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.chapters enable row level security;
alter table public.lessons enable row level security;
alter table public.flashcards enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.lesson_progress enable row level security;

-- Profiles: users can only read and update their own profile.

create policy "Users can read their own profile"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

-- Courses: published courses are publicly readable.

create policy "Published courses are publicly readable"
on public.courses
for select
to anon, authenticated
using (is_published = true);

-- Chapters: only published chapters in published courses are readable.

create policy "Published chapters are publicly readable"
on public.chapters
for select
to anon, authenticated
using (
  is_published = true
  and exists (
    select 1
    from public.courses
    where courses.id = chapters.course_id
      and courses.is_published = true
  )
);

-- Lessons: only published lessons in published chapter trees are readable.

create policy "Published lessons are publicly readable"
on public.lessons
for select
to anon, authenticated
using (
  is_published = true
  and exists (
    select 1
    from public.chapters
    join public.courses
      on courses.id = chapters.course_id
    where chapters.id = lessons.chapter_id
      and chapters.is_published = true
      and courses.is_published = true
  )
);

-- Flashcards: readable only through a fully published learning tree.

create policy "Published flashcards are publicly readable"
on public.flashcards
for select
to anon, authenticated
using (
  is_published = true
  and exists (
    select 1
    from public.lessons
    join public.chapters
      on chapters.id = lessons.chapter_id
    join public.courses
      on courses.id = chapters.course_id
    where lessons.id = flashcards.lesson_id
      and lessons.is_published = true
      and chapters.is_published = true
      and courses.is_published = true
  )
);

-- Quiz questions: readable only through a fully published learning tree.

create policy "Published quiz questions are publicly readable"
on public.quiz_questions
for select
to anon, authenticated
using (
  is_published = true
  and exists (
    select 1
    from public.lessons
    join public.chapters
      on chapters.id = lessons.chapter_id
    join public.courses
      on courses.id = chapters.course_id
    where lessons.id = quiz_questions.lesson_id
      and lessons.is_published = true
      and chapters.is_published = true
      and courses.is_published = true
  )
);

-- Lesson progress: users control only their own rows.

create policy "Users can read their own lesson progress"
on public.lesson_progress
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can create their own lesson progress"
on public.lesson_progress
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update their own lesson progress"
on public.lesson_progress
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete their own lesson progress"
on public.lesson_progress
for delete
to authenticated
using ((select auth.uid()) = user_id);