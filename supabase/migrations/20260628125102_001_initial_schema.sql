
/*
# SRS Digital Library — Initial Schema

## Overview
Creates all tables required for the SRS Digital Library website:
inquiry management, admin authentication, site settings, and login
rate-limiting. This is a custom-auth admin app (no Supabase Auth for
the admin user). Public form submissions use the anon key; all admin
reads and writes use the service role key server-side.

## Tables Created

### 1. inquiries
Stores all lead form submissions from public pages.
- id: UUID primary key
- type: "library" | "enrollment" | "general"
- name, phone, email, address: contact info
- programme: selected degree programme (for enrollment type)
- plan: selected library plan (for library type)
- preferred_timing: seat timing preference
- highest_qualification: for enrollment inquiries
- preferred_callback: preferred callback time
- specialization: MBA specialization etc.
- message: free text query
- status: "new" | "contacted" | "resolved"
- notes: admin internal notes
- created_at, updated_at: timestamps

### 2. admin_users
Single-row table for the one admin account (custom JWT, no Supabase Auth).
- id: UUID primary key
- email: admin login email
- password_hash: bcrypt hash — NEVER plaintext
- created_at, last_login_at: timestamps

### 3. site_settings
Key-value store for editable content: library timings and plan pricing.
- id: UUID primary key
- key: setting identifier (e.g. "library_timings", "library_plans")
- value: JSONB value
- updated_at: timestamp

### 4. login_attempts
Used for rate-limiting admin login attempts. Stored in DB so it
persists across serverless function instances.
- id: UUID primary key
- identifier: IP address or email used for rate-limiting
- success: whether the attempt succeeded
- created_at: timestamp

## Security
- RLS enabled on all tables.
- inquiries: anon may INSERT only (public form submissions). No SELECT/UPDATE/DELETE for anon.
- admin_users: no public access; service role only.
- site_settings: anon may SELECT (public timings/pricing shown on site). No public writes.
- login_attempts: no public access; service role only.
- Admin operations bypass RLS via the service role key in API routes.
*/

-- ============================================================
-- Table: inquiries
-- ============================================================
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('library', 'enrollment', 'general')),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  address text,
  programme text,
  plan text,
  preferred_timing text,
  highest_qualification text,
  preferred_callback text,
  specialization text,
  message text,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved')),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_inquiries" ON inquiries;
CREATE POLICY "anon_insert_inquiries" ON inquiries
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_inquiries" ON inquiries;
-- No SELECT for anon/authenticated — admin uses service role

-- Index for common admin queries
CREATE INDEX IF NOT EXISTS inquiries_type_idx ON inquiries(type);
CREATE INDEX IF NOT EXISTS inquiries_status_idx ON inquiries(status);
CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_phone_idx ON inquiries(phone);
CREATE INDEX IF NOT EXISTS inquiries_name_idx ON inquiries(name);

-- ============================================================
-- Table: admin_users
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_login_at timestamptz
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
-- No public policies — only service role can access

-- ============================================================
-- Table: site_settings
-- ============================================================
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_settings" ON site_settings;
CREATE POLICY "anon_select_settings" ON site_settings
  FOR SELECT TO anon, authenticated
  USING (true);

-- No public write access; admin updates via service role

-- ============================================================
-- Table: login_attempts
-- ============================================================
CREATE TABLE IF NOT EXISTS login_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier text NOT NULL,
  success boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;
-- No public policies — only service role can access

CREATE INDEX IF NOT EXISTS login_attempts_identifier_idx ON login_attempts(identifier);
CREATE INDEX IF NOT EXISTS login_attempts_created_at_idx ON login_attempts(created_at DESC);

-- ============================================================
-- Seed: default site_settings
-- ============================================================
INSERT INTO site_settings (key, value) VALUES
(
  'library_timings',
  '{"weekdays": {"open": "6:00 AM", "close": "10:00 PM", "label": "Monday – Saturday"}, "sunday": {"open": "8:00 AM", "close": "8:00 PM", "label": "Sunday"}, "note": "Open all days including public holidays. Timings may vary — call to confirm."}'::jsonb
)
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value) VALUES
(
  'library_plans',
  '[{"id": "daily", "name": "Daily Pass", "price": "Contact for pricing", "description": "Single day access to the reading hall", "features": ["Full day AC reading hall access", "Free WiFi", "Power backup"]}, {"id": "monthly", "name": "Monthly Plan", "price": "Contact for pricing", "description": "Best for regular students", "features": ["Unlimited daily access", "Reserved seat option", "Free WiFi", "Power backup", "CCTV secured premises"]}, {"id": "quarterly", "name": "3-Month Plan", "price": "Contact for pricing", "description": "Save more with quarterly subscription", "features": ["All Monthly Plan features", "Discounted rate", "Priority seat allocation"]}, {"id": "yearly", "name": "Annual Plan", "price": "Contact for pricing", "description": "Maximum savings for serious students", "features": ["All 3-Month Plan features", "Maximum discount", "Special member benefits"]}]'::jsonb
)
ON CONFLICT (key) DO NOTHING;
