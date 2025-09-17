-- Supabase schema for the restaurant app

-- 1) Reservations table
create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  date date not null,
  time text not null,
  guests int not null check (guests > 0),
  message text,
  created_at timestamptz not null default now()
);

comment on table public.reservations is 'Customer reservation requests from the website contact form.';

-- 2) Enable Row Level Security
alter table public.reservations enable row level security;

-- 3) Policies
-- Allow anonymous inserts from the public website (using anon key)
drop policy if exists "Allow anonymous inserts" on public.reservations;
create policy "Allow anonymous inserts"
on public.reservations
for insert
to anon
with check (true);

-- Optional: Allow authenticated users (e.g., staff) to read all reservations
drop policy if exists "Allow authenticated select" on public.reservations;
create policy "Allow authenticated select"
on public.reservations
for select
to authenticated
using (true);

-- Optional: Create an index to query by date
create index if not exists reservations_date_idx on public.reservations(date);

-- 4) Foods table
create table if not exists public.foods (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10,2) not null check (price >= 0),
  category text not null check (char_length(category) > 0),
  image_path text, -- storage path like food-images/uuid.ext
  image_url text,  -- public URL cached for convenience
  created_at timestamptz not null default now()
);

alter table public.foods enable row level security;

-- Allow anonymous read of foods
drop policy if exists "Foods: public read" on public.foods;
create policy "Foods: public read"
on public.foods for select
to anon
using (true);

-- Allow anonymous inserts (for admin uploads)
drop policy if exists "Foods: anonymous insert" on public.foods;
create policy "Foods: anonymous insert"
on public.foods for insert
to anon
with check (true);

-- Allow authenticated inserts/updates (for admin use)
drop policy if exists "Foods: authenticated write" on public.foods;
create policy "Foods: authenticated write"
on public.foods for all
to authenticated
using (true)
with check (true);

-- 5) Storage bucket for food images (run once)
-- Note: Requires 'service_role' or storage admin privileges. You can also create via Dashboard.
-- Create bucket if missing (private by default)
select
  case
    when not exists (select 1 from storage.buckets where id = 'food-images')
    then storage.create_bucket('food-images')
    else null
  end;

-- Ensure bucket is public
update storage.buckets set public = true where id = 'food-images';

-- Storage RLS policies for the bucket
-- Allow public read of objects in 'food-images'
drop policy if exists "Public read food-images" on storage.objects;
create policy "Public read food-images"
on storage.objects for select
to anon
using ( bucket_id = 'food-images' );

-- Allow anonymous upload to 'food-images' (for admin uploads)



-- Allow authenticated upload to 'food-images'
drop policy if exists "Authenticated upload food-images" on storage.objects;
create policy "Authenticated upload food-images"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'food-images' );


