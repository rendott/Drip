-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Extends auth.users)
create table profiles (
  id uuid references auth.users(id) on delete cascade not null primary key,
  username text,
  avatar_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS: Profiles
alter table profiles enable row level security;
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- 2. BEANS (Inventory)
create type roast_level_enum as enum ('Light', 'Medium', 'Dark');
create type bean_status_enum as enum ('active', 'archived');

create table beans (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  roaster text,
  roast_level roast_level_enum not null default 'Medium',
  roast_date date not null,
  status bean_status_enum not null default 'active',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS: Beans
alter table beans enable row level security;
create policy "Users can view own beans" on beans for select using (auth.uid() = user_id);
create policy "Users can create beans" on beans for insert with check (auth.uid() = user_id);
create policy "Users can update own beans" on beans for update using (auth.uid() = user_id);
create policy "Users can delete own beans" on beans for delete using (auth.uid() = user_id);

-- 3. RECIPES
create type brew_method_enum as enum ('V60', 'Kalita', 'Origami', 'AeroPress');

create table recipes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  method brew_method_enum not null,
  base_coffee_weight numeric not null, -- stored as numeric for precision
  base_water_weight numeric not null,
  steps jsonb not null default '[]'::jsonb, -- [{ time: 0, action: "pour", amount: 40, temp: 93 }]
  is_public boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS: Recipes
alter table recipes enable row level security;
create policy "Users can view own recipes" on recipes for select using (auth.uid() = user_id);
create policy "Users can view public recipes" on recipes for select using (is_public = true);
create policy "Users can create recipes" on recipes for insert with check (auth.uid() = user_id);
create policy "Users can update own recipes" on recipes for update using (auth.uid() = user_id);
create policy "Users can delete own recipes" on recipes for delete using (auth.uid() = user_id);

-- 4. BREW LOGS
create table brew_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  recipe_id uuid references recipes(id) on delete set null,
  bean_id uuid references beans(id) on delete set null,
  date timestamp with time zone default timezone('utc'::text, now()),
  rating integer check (rating >= 1 and rating <= 5),
  notes text
);

-- RLS: Brew Logs
alter table brew_logs enable row level security;
create policy "Users can view own logs" on brew_logs for select using (auth.uid() = user_id);
create policy "Users can create logs" on brew_logs for insert with check (auth.uid() = user_id);
create policy "Users can update own logs" on brew_logs for update using (auth.uid() = user_id);
create policy "Users can delete own logs" on brew_logs for delete using (auth.uid() = user_id);

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, avatar_url)
  values (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
