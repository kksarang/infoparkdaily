-- Proposed Supabase production schema. The local preview uses SQLite instead.
-- Apply only to an isolated Supabase project, then validate policies with two real
-- auth users before connecting the app. This file does not configure production.
begin;
create table public.resume_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 100),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.resume_templates (
  id uuid primary key default gen_random_uuid(), slug text unique not null,
  name text not null, category text not null, tags text[] not null default '{}',
  access text not null check(access in ('free','premium')),
  status text not null default 'draft' check(status in ('draft','published','archived','withdrawn')),
  public_preview_key text, current_version integer not null default 1,
  created_at timestamptz not null default now()
);
create table public.resume_template_versions (
  template_id uuid not null references public.resume_templates(id), version integer not null check(version>0),
  renderer_family text not null, private_config_key text not null, checksum text not null,
  minimum_schema integer not null default 1, maximum_schema integer not null default 1,
  created_at timestamptz not null default now(), primary key(template_id,version)
);
create table public.resumes (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check(char_length(title) between 1 and 120), data jsonb not null,
  schema_version integer not null default 1, template_id uuid not null,
  template_version integer not null, revision integer not null default 1,
  job_id text, created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  foreign key(template_id,template_version) references public.resume_template_versions(template_id,version),
  check(jsonb_typeof(data)='object' and octet_length(data::text)<=262144)
);
create index resumes_owner_updated on public.resumes(user_id,updated_at desc);
create table public.resume_plans (
  code text primary key, price_paise integer not null check(price_paise>=0),
  currency text not null default 'INR' check(currency='INR'),
  duration_seconds integer not null check(duration_seconds>0), features text[] not null,
  active boolean not null default false, catalog_version integer not null default 1
);
insert into public.resume_plans values ('pro',9900,'INR',604800,array['template.premium','export.premium_pdf','customize.advanced'],false,1);
create table public.resume_orders (
  id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id) on delete set null,
  plan_code text not null references public.resume_plans(code), price_paise integer not null check(price_paise>=0),
  currency text not null check(currency='INR'), duration_seconds integer not null check(duration_seconds>0),
  features text[] not null, catalog_version integer not null, gateway_order_id text unique,
  idempotency_key text not null, status text not null default 'creating',
  mode text not null check(mode in ('test','live')), created_at timestamptz not null default now(),
  unique(user_id,idempotency_key)
);
create index resume_orders_owner_created on public.resume_orders(user_id,created_at desc);
create table public.resume_payments (
  gateway_payment_id text primary key, order_id uuid not null references public.resume_orders(id),
  amount integer not null check(amount>=0), currency text not null,
  status text not null, refunded_amount integer not null default 0 check(refunded_amount>=0),
  captured_at timestamptz, created_at timestamptz not null default now()
);
create table public.resume_entitlements (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  feature text not null, source_payment_id text not null references public.resume_payments(gateway_payment_id),
  starts_at timestamptz not null, expires_at timestamptz not null,
  revoked_at timestamptz, revoked_reason text,
  unique(source_payment_id,feature), check(expires_at>starts_at)
);
create index resume_entitlements_owner_feature on public.resume_entitlements(user_id,feature,expires_at);
create table public.resume_webhook_events (
  provider_event_id text primary key, event_type text not null, payload_digest text not null,
  private_payload_key text, state text not null default 'received', attempts integer not null default 0,
  error_code text, received_at timestamptz not null default now(), processed_at timestamptz
);
create table public.resume_exports (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  resume_id uuid not null references public.resumes(id) on delete cascade, revision integer not null,
  snapshot jsonb not null, template_id uuid not null, template_version integer not null,
  format text not null check(format in ('pdf','docx')), status text not null default 'queued',
  private_artifact_key text, checksum text, expires_at timestamptz not null,
  idempotency_key text not null, error_code text, created_at timestamptz not null default now(),
  unique(user_id,idempotency_key), foreign key(template_id,template_version) references public.resume_template_versions(template_id,version)
);
create index resume_exports_owner on public.resume_exports(user_id,created_at desc);
create table public.resume_admin_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check(role in ('template_admin','payment_support','owner')),
  granted_by uuid references auth.users(id) on delete set null, granted_at timestamptz not null default now()
);
create table public.resume_audit_log (
  id uuid primary key default gen_random_uuid(), actor_id uuid references auth.users(id) on delete set null,
  operation text not null, resource_id text not null, metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);
create table public.resume_outbox (
  id uuid primary key default gen_random_uuid(), event_name text not null, resource_id text not null,
  mode text not null check(mode in ('test','live')), consented_attribution jsonb not null default '{}',
  delivered_at timestamptz, attempts integer not null default 0, created_at timestamptz not null default now(),
  unique(event_name,resource_id)
);
-- All application writes are mediated by the API. RLS is defense in depth:
-- browser users can read only their own records and cannot mint entitlements.
alter table public.resume_profiles enable row level security;
alter table public.resume_templates enable row level security;
alter table public.resume_template_versions enable row level security;
alter table public.resumes enable row level security;
alter table public.resume_plans enable row level security;
alter table public.resume_orders enable row level security;
alter table public.resume_payments enable row level security;
alter table public.resume_entitlements enable row level security;
alter table public.resume_webhook_events enable row level security;
alter table public.resume_exports enable row level security;
alter table public.resume_admin_roles enable row level security;
alter table public.resume_audit_log enable row level security;
alter table public.resume_outbox enable row level security;
create policy own_profile on public.resume_profiles for select to authenticated using(id=(select auth.uid()));
create policy public_templates on public.resume_templates for select to anon,authenticated using(status='published');
create policy own_resumes on public.resumes for select to authenticated using(user_id=(select auth.uid()));
create policy public_active_plans on public.resume_plans for select to anon,authenticated using(active);
create policy own_orders on public.resume_orders for select to authenticated using(user_id=(select auth.uid()));
create policy own_payments on public.resume_payments for select to authenticated using(exists(select 1 from public.resume_orders o where o.id=order_id and o.user_id=(select auth.uid())));
create policy own_entitlements on public.resume_entitlements for select to authenticated using(user_id=(select auth.uid()));
-- Export snapshots, private template configs, webhook bodies, roles, audit and
-- outbox records deliberately have no browser-access policies. API responses
-- expose only the public metadata needed by the caller.
revoke all on public.resume_template_versions, public.resume_webhook_events, public.resume_exports, public.resume_admin_roles, public.resume_audit_log, public.resume_outbox from anon,authenticated;
revoke insert,update,delete on public.resume_profiles,public.resumes,public.resume_templates,public.resume_plans,public.resume_orders,public.resume_payments,public.resume_entitlements from anon,authenticated;
-- Private buckets: no client storage policies. The authenticated API/worker
-- authorizes requests and uses its server-only service role to access objects.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('resume-templates','resume-templates',false,1048576,array['application/json']),
       ('resume-artifacts','resume-artifacts',false,10485760,array['application/pdf','image/png'])
on conflict(id) do nothing;
commit;
