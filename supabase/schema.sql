
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Clients Table
create table if not exists clients (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  email text,
  address text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Invoices Table
create table if not exists invoices (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  client_id uuid references clients not null,
  amount numeric(10, 2) not null,
  status text check (status in ('paid', 'pending', 'draft')) default 'pending',
  description text,
  due_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ensure columns exist (in case table already existed without them)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'client_id') THEN
        ALTER TABLE invoices ADD COLUMN client_id uuid REFERENCES clients(id) NOT NULL;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'invoices' AND column_name = 'description') THEN
        ALTER TABLE invoices ADD COLUMN description text;
    END IF;
END $$;

-- RLS
alter table clients enable row level security;
alter table invoices enable row level security;

-- Drop existing policies to avoid "already exists" errors
drop policy if exists "Users can view their own clients" on clients;
drop policy if exists "Users can insert their own clients" on clients;
drop policy if exists "Users can update their own clients" on clients;
drop policy if exists "Users can delete their own clients" on clients;

drop policy if exists "Users can view their own invoices" on invoices;
drop policy if exists "Users can insert their own invoices" on invoices;
drop policy if exists "Users can update their own invoices" on invoices;
drop policy if exists "Users can delete their own invoices" on invoices;

-- Policies for Clients
create policy "Users can view their own clients" on clients for select using (auth.uid() = user_id);
create policy "Users can insert their own clients" on clients for insert with check (auth.uid() = user_id);
create policy "Users can update their own clients" on clients for update using (auth.uid() = user_id);
create policy "Users can delete their own clients" on clients for delete using (auth.uid() = user_id);

-- Policies for Invoices
create policy "Users can view their own invoices" on invoices for select using (auth.uid() = user_id);
create policy "Users can insert their own invoices" on invoices for insert with check (auth.uid() = user_id);
create policy "Users can update their own invoices" on invoices for update using (auth.uid() = user_id);
create policy "Users can delete their own invoices" on invoices for delete using (auth.uid() = user_id);
