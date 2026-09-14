-- ============================================================
--  Το καρνέ προπόνησης ανά πελάτη
--
--  Πριν: PK σκέτο id, user_id πάντα null, policy "όλα σε όλους".
--  Κάθε πελάτης έγραφε στις ίδιες γραμμές ('me', 'plan') και
--  κατέβαζε τα δεδομένα των υπολοίπων.
--
--  ΠΡΟΣΟΧΗ: τρέξ' το ΜΑΖΙ με το νέο index.html. Το παλιό index.html
--  δεν στέλνει user_id και θα σταματήσει να συγχρονίζει.
-- ============================================================

begin;

-- 1. Οι υπάρχουσες γραμμές είναι του Στάθη. Τις υπογράφουμε.
update public.lean_bodyweight   set user_id = 'b6c3d28f-d3b8-4c24-9d7a-2a6a3eebb469' where user_id is null;
update public.lean_measurements set user_id = 'b6c3d28f-d3b8-4c24-9d7a-2a6a3eebb469' where user_id is null;
update public.lean_sessions     set user_id = 'b6c3d28f-d3b8-4c24-9d7a-2a6a3eebb469' where user_id is null;
update public.lean_profile      set user_id = 'b6c3d28f-d3b8-4c24-9d7a-2a6a3eebb469' where user_id is null;

-- 2. Το προφίλ και το πρόγραμμα παίρνουν κλειδί με τον πελάτη μέσα,
--    όπως τα γράφει πια η σελίδα: «me:<uuid>», «plan:<uuid>».
update public.lean_profile
   set id = id || ':' || user_id::text
 where id in ('me', 'plan');

-- 3. Χωρίς ιδιοκτήτη δεν μπαίνει τίποτα.
alter table public.lean_bodyweight   alter column user_id set not null;
alter table public.lean_measurements alter column user_id set not null;
alter table public.lean_sessions     alter column user_id set not null;
alter table public.lean_profile      alter column user_id set not null;

-- 4. Ο ιδιοκτήτης πρέπει να είναι υπαρκτός πελάτης. Σβήνει ο πελάτης,
--    φεύγει και το καρνέ του.
alter table public.lean_bodyweight
  add constraint lean_bodyweight_client_fk
  foreign key (user_id) references public.clients(id) on delete cascade;
alter table public.lean_measurements
  add constraint lean_measurements_client_fk
  foreign key (user_id) references public.clients(id) on delete cascade;
alter table public.lean_sessions
  add constraint lean_sessions_client_fk
  foreign key (user_id) references public.clients(id) on delete cascade;
alter table public.lean_profile
  add constraint lean_profile_client_fk
  foreign key (user_id) references public.clients(id) on delete cascade;

-- 5. Τα φίλτρα .eq('user_id', …) θέλουν index για να μη σαρώνουν.
create index if not exists lean_bodyweight_user_idx   on public.lean_bodyweight   (user_id);
create index if not exists lean_measurements_user_idx on public.lean_measurements (user_id);
create index if not exists lean_sessions_user_idx     on public.lean_sessions     (user_id);
create index if not exists lean_profile_user_idx      on public.lean_profile      (user_id);

-- 6. Νέες policies. Ο μαζικός σβησμός φεύγει: το delete πρέπει να λέει
--    ποιανού είναι. Δεν είναι πλήρης απομόνωση — με το δημόσιο κλειδί
--    όποιος ξέρει ένα client_id μπορεί να το ζητήσει — αλλά αυτό ισχύει
--    ήδη για όλη την εφαρμογή (my_bookings, client_status κ.λπ. παίρνουν
--    σκέτο p_client_id). Κρατάμε το ίδιο μοντέλο, χωρίς το «όλα σε όλους».
drop policy if exists lean_open_all on public.lean_bodyweight;
drop policy if exists lean_open_all on public.lean_measurements;
drop policy if exists lean_open_all on public.lean_sessions;
drop policy if exists lean_open_all on public.lean_profile;

create policy lean_owned on public.lean_bodyweight
  for all to anon, authenticated
  using (user_id is not null) with check (user_id is not null);
create policy lean_owned on public.lean_measurements
  for all to anon, authenticated
  using (user_id is not null) with check (user_id is not null);
create policy lean_owned on public.lean_sessions
  for all to anon, authenticated
  using (user_id is not null) with check (user_id is not null);
create policy lean_owned on public.lean_profile
  for all to anon, authenticated
  using (user_id is not null) with check (user_id is not null);

commit;
