-- Custom SQL migration file, put your code below! --
alter table public.users enable row level security;
alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.resumes enable row level security;
alter table public.resume_documents enable row level security;
alter table public.jobs enable row level security;
alter table public.applications enable row level security;
alter table public.generated_documents enable row level security;
alter table public.ai_generations enable row level security;

drop policy if exists "users_select_own" on public.users;
create policy "users_select_own"
on public.users
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "users_insert_own" on public.users;
create policy "users_insert_own"
on public.users
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "users_update_own" on public.users;
create policy "users_update_own"
on public.users
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "profiles_delete_own" on public.profiles;
create policy "profiles_delete_own"
on public.profiles
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "subscriptions_select_own" on public.subscriptions;
create policy "subscriptions_select_own"
on public.subscriptions
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "resumes_select_own" on public.resumes;
create policy "resumes_select_own"
on public.resumes
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "resumes_insert_own" on public.resumes;
create policy "resumes_insert_own"
on public.resumes
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "resumes_update_own" on public.resumes;
create policy "resumes_update_own"
on public.resumes
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "resumes_delete_own" on public.resumes;
create policy "resumes_delete_own"
on public.resumes
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "resume_documents_select_own" on public.resume_documents;
create policy "resume_documents_select_own"
on public.resume_documents
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "resume_documents_insert_own" on public.resume_documents;
create policy "resume_documents_insert_own"
on public.resume_documents
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "resume_documents_update_own" on public.resume_documents;
create policy "resume_documents_update_own"
on public.resume_documents
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "resume_documents_delete_own" on public.resume_documents;
create policy "resume_documents_delete_own"
on public.resume_documents
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "jobs_select_global_or_own" on public.jobs;
create policy "jobs_select_global_or_own"
on public.jobs
for select
to authenticated
using (user_id is null or auth.uid() = user_id);

drop policy if exists "jobs_insert_own" on public.jobs;
create policy "jobs_insert_own"
on public.jobs
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "jobs_update_own" on public.jobs;
create policy "jobs_update_own"
on public.jobs
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "jobs_delete_own" on public.jobs;
create policy "jobs_delete_own"
on public.jobs
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "applications_select_own" on public.applications;
create policy "applications_select_own"
on public.applications
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "applications_insert_own" on public.applications;
create policy "applications_insert_own"
on public.applications
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "applications_update_own" on public.applications;
create policy "applications_update_own"
on public.applications
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "applications_delete_own" on public.applications;
create policy "applications_delete_own"
on public.applications
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "generated_documents_select_own" on public.generated_documents;
create policy "generated_documents_select_own"
on public.generated_documents
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "generated_documents_insert_own" on public.generated_documents;
create policy "generated_documents_insert_own"
on public.generated_documents
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "generated_documents_update_own" on public.generated_documents;
create policy "generated_documents_update_own"
on public.generated_documents
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "generated_documents_delete_own" on public.generated_documents;
create policy "generated_documents_delete_own"
on public.generated_documents
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "ai_generations_select_own" on public.ai_generations;
create policy "ai_generations_select_own"
on public.ai_generations
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "ai_generations_insert_own" on public.ai_generations;
create policy "ai_generations_insert_own"
on public.ai_generations
for insert
to authenticated
with check (auth.uid() = user_id);
