# InfoparkDaily Resume Builder — product and technical specification

Status: original implementation specification. A local prototype now exists. The updated no-billing cloud direction is in [the Firebase member plan](career-tools-firebase-plan.md); its login/storage choices supersede the Supabase proposal below. No live service has been enabled.
Prepared: 10 September 2026.

## Scope and repository findings

Build a resume product within InfoparkDaily with the positioning: **Create. Customize. Apply.** Add “Optimize” when the integrated analysis experience ships. Advertise only published templates and available features.

The current repository is a static HTML/CSS/JavaScript website. `CNAME`, `.nojekyll`, the analytics documentation, and local routing scripts indicate a GitHub Pages deployment. There is no root package manifest or account/payment service in the inspected code. `scripts/serve-local.py` supports job and company deep links locally.

Existing integration points:

- `js/site.js` controls shared navigation behavior; navigation markup lives in individual HTML pages.
- `js/job.js` already links job descriptions to `/ats-checker/`.
- `ats-checker/index.html` and `js/ats-checker.js` provide local resume analysis and optional job-description matching. Preserve the existing free tool and its promise that uploaded files remain on the device.
- `analytics/main.js` exposes the existing analytics facade, backed by the event catalog and consent handling under `analytics/src/`.
- `admin/` contains application/job tools; these are not evidence of a reusable authenticated administrator system.
- `js/disclaimer.js` currently describes resume help as free. Review this wording, privacy, and terms before offering optional paid tools; retain free candidate help where promised.

Architecture decision: keep the public website static. Add a modular builder frontend, a TypeScript API and PDF worker on a container host, and managed Postgres/Auth/private storage through Supabase. Use Razorpay for payments. These are proposed choices, not services already configured. The PDF worker requires a runtime that supports Chromium; do not assume it fits an edge function.

## 1. Menu and UI structure

Add **Resume Builder** to desktop and mobile navigation beside Jobs and Recruit. Audit each public HTML shell and `scripts/generate-guides.py` so regeneration does not remove it.

| Route | Purpose | Access |
|---|---|---|
| `/resume-builder/` | Landing: Create Resume, Browse Templates, benefits, current pricing | Public |
| `/resume-builder/templates/` | Search, category and Free/Premium filters, previews | Public |
| `/resume-builder/editor/?id=<uuid>` | Section editor, template switcher, live preview, export | Signed in |
| `/resume-builder/my-resumes/` | Create, edit, duplicate, rename, delete, download | Signed in |
| `/resume-builder/pricing/` | Free and Pro Pass, duration, expiry behavior | Public |
| `/resume-builder/account/` | Pass expiry, purchases, data export and account deletion | Signed in |
| `/resume-builder/payment-status/?order=<uuid>` | Verified pending, successful or failed payment | Owner |
| `/resume-builder/sign-in/` | Email sign-in/signup and recovery | Public |
| `/admin/resume-templates/` | Template catalog and publication | Verified administrator |

Link ATS Checker to the existing `/ats-checker/` and Resume Tips to `/guides/resume-guide-kerala-it-jobs/`. Cover Letter and AI features have no active navigation entry until implemented. Prefer directory `index.html` routes to preserve static hosting compatibility.

Landing copy: “Create your professional resume. Choose a template, add your experience, and download a text-based PDF.” Show the actual published count. Do not show “100+” before that inventory exists.

Journey: browse → choose template → sign in with return destination preserved → create draft → edit → preview → export. Premium selection displays the price before purchase and retains the user's draft through checkout. Optional Student/Fresher/Experienced/Career Switcher selection only sets section defaults.

Desktop editor: section list on the left, editable fields in the middle, page preview on the right. Mobile: accessible Edit/Preview tabs with a persistent save-status indicator. Support keyboard navigation, labeled controls, visible focus, inline validation, section reorder buttons, and readable preview zoom.

Save states: Saving, Saved, Offline/unsaved, Conflict, Error with retry. Debounce autosave by 800 ms and flush on section changes where possible. Never claim a successful save until the server confirms it. Warn on navigation with unsaved edits. A stale tab receives a conflict response and can keep a separate copy instead of overwriting newer work.

## 2. Database schema and API boundary

Use UUID primary keys, UTC `timestamptz` timestamps, explicit foreign keys, check constraints, and migrations. Managed auth owns credentials; application tables never store passwords.

| Table | Important fields and constraints |
|---|---|
| `profiles` | `id` references auth user; `display_name`, `created_at`, `updated_at` |
| `resumes` | `id`, `user_id`, `title`, `data jsonb`, `schema_version`, `template_version_id`, `revision integer`, timestamps; index `(user_id, updated_at)` |
| `templates` | `id`, unique `slug`, `name`, `category`, `tags`, `access` free/premium, `status` draft/published/archived, `current_version_id`, public sample preview key |
| `template_versions` | `id`, `template_id`, `version`, renderer family, private config key, checksum, supported schema range, created time; unique `(template_id, version)` |
| `plans` | stable code, `price_paise`, currency INR, `duration_seconds`, feature list, active flag, catalog version |
| `orders` | `id`, `user_id`, `plan_code`, immutable price/duration/features snapshot, unique gateway order ID, client idempotency key, status, timestamps; unique `(user_id, idempotency_key)` |
| `payments` | `id`, `order_id`, unique gateway payment ID, amount, currency, captured time, status, refunded amount |
| `entitlements` | `id`, `user_id`, `feature`, `source_payment_id`, start/end timestamps, revoked time and reason; unique `(source_payment_id, feature)` |
| `webhook_events` | unique provider event ID, event type, payload digest, processing state, attempts, error code, timestamps |
| `exports` | `id`, `user_id`, resume ID, immutable resume revision/data snapshot, template version, format, status, private artifact key, checksum, expiry, idempotency key |
| `admin_roles` | `user_id`, role, granted by/time; inaccessible for user modification |
| `audit_log` | actor, operation, resource ID, redacted change metadata, timestamp |

All owner tables enforce row-level security. Derive the owner from verified authentication, never a request-supplied user ID. Users cannot directly insert or update entitlements, payment state, roles, plans or publication records. Administrative credentials stay in the backend. Server operations must still explicitly check ownership when using privileged database access. Supabase documents storage policies based on Postgres RLS: [storage access control](https://supabase.com/docs/guides/storage/security/access-control).

API routes use `/v1` on the proposed API origin:

- `GET /templates` returns published public metadata; `GET /me/entitlements` returns current feature access and expiry.
- `GET/POST /resumes`, `GET/PATCH/DELETE /resumes/:id`, `POST /resumes/:id/duplicate` enforce ownership. PATCH supplies the expected revision; mismatch returns 409.
- `POST /previews` accepts an owned draft revision and authorized template version; returns a short-lived private preview reference for premium designs.
- `POST /orders` accepts only plan code and an idempotency key. `POST /orders/:id/verify` receives checkout fields. `GET /orders/:id` returns the owner's normalized payment state.
- `POST /webhooks/razorpay` uses gateway signature authentication rather than browser authentication.
- `POST /exports`, `GET /exports/:id`, `GET /exports/:id/download` enforce ownership and feature access.
- `/admin/templates` and version/publication endpoints require a backend-verified admin role.

Use validated Supabase bearer tokens for browser API calls, explicit allowed origins, HTTPS in production, and no tokens in URLs. Limit payload sizes and request rates. Escape all resume text on output and reject unapproved URL protocols. Signed-out users get 401, insufficient feature access 403, and unknown/non-owned object IDs the same 404 response.

## 3. Resume JSON/data architecture

One versioned document is independent of its template. Example with intentionally empty user content:

```json
{
  "schemaVersion": 1,
  "personal": {
    "name": "", "headline": "", "email": "", "phone": "",
    "location": "", "linkedin": "", "github": "", "portfolio": ""
  },
  "summary": "",
  "experience": [],
  "education": [],
  "skills": [],
  "projects": [],
  "certifications": [],
  "achievements": [],
  "languages": [],
  "interests": [],
  "customSections": [],
  "sectionOrder": ["summary", "experience", "education", "skills", "projects", "certifications", "achievements", "languages", "interests"],
  "hiddenSections": [],
  "appearance": {"accent": "navy", "font": "sans", "density": "standard"}
}
```

Repeated entries have stable IDs. Experience: employer, role, location, start/end month, current flag, bullet array. Education: institution, qualification, field, start/end month, optional grade and details. Projects: name, role, URL, technologies, bullets. Certifications: name, issuer, issued/expiry month, credential URL. Skills: labeled groups of text items. Achievements: title and details. Languages: name and optional proficiency. Interests: text items. Custom sections: ID, heading, entries with title and bullets; section order can reference these IDs.

Dates use `YYYY-MM` or null; display localized text during rendering. Store plain strings and arrays, not arbitrary HTML. Validate schema on client and server. Initial bounds: 256 KB serialized document, 20 entries per repeated section, 10 custom sections, 2,000 characters per bullet and 5,000 for summary. Exceeding limits produces a field-specific error, not truncation. Incomplete drafts are allowed; export requires a name and at least one populated content section.

Changing template updates presentation only. Unsupported appearance options fall back visibly to that template's defaults; content is never dropped. Duplicate creates a new owner-bound record. Maintain backward-compatible migrations and pin template versions for reproducible rendering. Persistent local draft recovery is opt-in, clearly labeled as device storage, and cleared on sign-out; default unsaved state stays in memory.

## 4. Template architecture

V1 paid-launch target: **36 reviewed designs, 12 free and 24 premium**. Begin implementation with six representative designs before expanding. Do not count color changes as new layouts.

| Primary category | Free | Premium |
|---|---:|---:|
| ATS-Friendly | 3 | 5 |
| Professional | 3 | 5 |
| Freshers | 3 | 4 |
| Technology | 1 | 4 |
| Creative | 2 | 3 |
| Executive | 0 | 3 |
| Total | 12 | 24 |

Use reusable renderer families: single-column classic, compact chronological, centered heading, editorial, sidebar, and executive. Each published design must have an intentional hierarchy, spacing and section treatment. Technology variants use tags such as Flutter, Full Stack and Data Analyst; these never insert unverified skills into user content.

A template version is a validated declarative configuration: renderer family, typography tokens, column rules, section placement, spacing, approved colors, and print rules. Administrators can publish new configurations for supported families without code changes. A new renderer family requires development. Do not allow executable template uploads or arbitrary CSS/HTML.

Public catalog assets contain fictional sample data. Premium configurations and personalized previews are private. Free rendering assets may be shipped publicly; premium assets must be excluded from the static deployment artifact, bundles and source maps. Keep service-worker caching away from authenticated content.

Free previews render locally on every change. Premium previews use the server renderer after entitlement verification, with debounced requests, cancellation and a visible updating state. They may use page images for editor display; final PDF output always preserves text. Non-paying visitors see sample previews only. This protection controls access to original assets and exports; it cannot stop an authorized customer copying a downloaded document or taking a screenshot.

## 5. Free and premium rules

| Capability | Free | Pro Pass — proposed ₹99 / 7 days | Career — V2 proposal ₹299 / 30 days |
|---|---|---|---|
| Templates | 12 | All published V1 designs | All published designs |
| Save, edit, duplicate | Yes | Yes | Yes |
| Text-based PDF | Free templates | Free and premium | Free and premium |
| Customization | Approved basic options | Additional typography/spacing options | Same plus later additions |
| Existing local ATS checker and JD match | Yes | Yes | Yes |
| Integrated saved analysis, history, DOCX, cover letter | No | No in V1 | Only once implemented |
| AI suggestions | No | No | Later with explicit quotas |

Do not sell Career in V1. Multiple resumes are available in V1 to all accounts, with an initial operational cap of 20 active documents per account. Export rate limits prevent abuse and are disclosed; avoid promising unlimited processing. Free exports have no watermark. No subscription auto-renewal or lifetime plan in V1.

Feature keys initially: `template.premium`, `export.premium_pdf`, `customize.advanced`. Ownership and free access are baseline rules. A paid feature is allowed only when its grant is not revoked and `starts_at <= server_now < expires_at`.

Expiry never deletes a resume. The user can edit their data and switch to a free template to preview/export. New premium previews and exports require renewal. Existing downloaded files remain theirs. Paid export access is checked at enqueue, execution and download; an expired user can create a free export without losing content. UI shows the exact expiry in the user's timezone.

## 6. Razorpay/payment architecture

Prices are product experiments from the brief, not verified market benchmarks. Store INR amounts as integers: Pro 9900 paise. Show the complete charged amount and seven-day access terms before checkout; settle tax/invoice handling with the business before enabling live orders.

1. An authenticated user chooses Pro. The server selects the active plan and stores an immutable price, currency, duration and feature snapshot.
2. The server creates the gateway order and binds its ID to the internal order and user. Client retries reuse the same idempotency key and order. A timeout after provider creation enters reconciliation, not blind order recreation.
3. The frontend opens checkout using the public key and server order details. No secret or client-supplied price is trusted.
4. Checkout callback data goes to the backend. Signature validation is necessary; the backend also fetches authoritative payment state and checks the stored order association, currency, amount and captured status.
5. A webhook or verified callback invokes the same transactional fulfillment function. Only a captured payment for the expected order grants access.
6. In one transaction, persist the payment and grant each feature once. Mark the order fulfilled and enqueue a durable analytics/receipt event.
7. The browser refreshes access from the backend. A closed tab does not prevent fulfillment.

First purchase starts at verified fulfillment time for the full seven days. A genuine repeat purchase extends from the later of now and the current end of that feature's grants. Serialize fulfillment per user so concurrent purchases cannot overlap accidentally. A replay never extends access. Show active users their current expiry before offering an extension.

Razorpay distinguishes asynchronous webhooks from immediate checkout confirmation: [webhooks overview](https://razorpay.com/docs/webhooks/). Its security checklist calls for trusted backend amounts and order IDs: [payment integration checklist](https://security.razorpay.com/security/checklist/).

## 7. Webhook verification, recovery and security

Validate the webhook signature against the **raw request bytes**, using a separate webhook secret and constant-time comparison. Deduplicate provider event IDs; also enforce unique payment IDs and grant keys because different events can describe the same payment. Razorpay documents raw-body verification and event IDs in [payment events](https://razorpay.com/docs/webhooks/payments/) and [webhook FAQs](https://razorpay.com/docs/webhooks/faqs/).

Persist authenticated events durably before returning success. Return a retriable error if persistence fails. Process asynchronously with bounded retries, alerts and a failed-event queue. Never downgrade captured/fulfilled state because an older authorized or failed event arrives later. Redact payloads and secrets from logs.

Run reconciliation every five minutes for unresolved orders, backed by provider status lookup. After a prolonged delay, keep “Payment confirmation pending” visible with a support reference and discourage immediate repayment. Detect multiple captured payments for one order and route extras for refund review without issuing duplicate grants.

Refund handling: a verified full refund revokes that payment's grants; other valid grants remain. A dispute suspends only the affected grants pending resolution. Partial refunds enter manual review with an explicit access decision recorded in the audit log. Out-of-order refunds/disputes must be checked before fulfillment so a later capture event cannot restore revoked access. Do not create an automatic refund endpoint without role enforcement and audit records.

Test and live keys, databases/storage namespaces and webhook secrets are separate. Store secrets only in deployment secret storage. Apply admin MFA, token validation, rate limits and HTML escaping. Sensitive API/preview/export responses use `Cache-Control: no-store`; ensure `sw.js` does not cache their URLs. Disable session recordings and ad scripts in authenticated builder and checkout screens so resume content cannot enter third-party recordings.

Data policy proposal: no resume content in operational logs or analytics. Delete temporary preview/export artifacts after 24 hours; download links expire within five minutes and are issued after authorization. Account deletion removes drafts and artifacts and revokes sessions, with separately documented minimal payment-record retention. Confirm actual backup deletion periods with the selected host before making promises. Authenticated screens are noindex.

## 8. PDF generation

Use one rendering contract for preview and export: validated document + pinned template version + approved fonts → escaped HTML/CSS → Chromium PDF via Playwright. Configure A4, explicit margins, print styles and embedded/local fonts. Playwright provides PDF output with print CSS: [Page PDF API](https://playwright.dev/docs/api/class-page#page-pdf).

Queue export jobs with an immutable document snapshot so editing during export does not change the result. Display preparing/ready/failed status with retry. Limit worker concurrency, document size, execution time and page count; split long sections naturally, never shrink everything to unreadable text. Treat an oversized individual entry separately so `break-inside: avoid` cannot clip it.

The renderer loads only bundled fonts and approved assets. Block arbitrary network requests, local file access and user JavaScript. External user links are text/hyperlinks, not resources to fetch. Private artifacts are downloaded through authorization or short-lived signed references.

Acceptance per template: one-page fresher, two-page experienced, long names/URLs, empty sections, many bullets, custom sections, Unicode names and supported script fonts. Verify extracted text, reading order, searchable contact details, links, clipping and page breaks. ATS-Friendly designs use single-column semantic reading order and no important content in decorative graphics. A successful PDF generation call alone is insufficient.

DOCX is V2 and uses a separate structured document renderer with the same data model; do not relabel HTML as a Word file or promise pixel-identical PDF/DOCX output.

## 9. ATS engine

Keep the existing local checker free. V1 links to it; do not silently upload its files or migrate it behind a paywall. Its current heuristics require validation before reuse as a premium product.

V2 extracts a pure, versioned scoring module and adds structured-document input, saved reports and job-linked comparisons. Separate document readability/completeness from JD keyword coverage. Show detected evidence, matched terms, missing terms and limitations. If the JD is absent or too short, omit match percentage instead of inventing one.

Proposed keyword coverage is matched normalized terms divided by extracted relevant terms, with the denominator and scoring version retained. Test punctuation-sensitive skills such as C++, C#, .NET and Node.js, synonyms, duplicated terms, negations, empty text and irrelevant pasted content. This is a transparent heuristic, not an employer ATS score or a hiring probability. Never label a template “ATS guaranteed.”

Job integration: add “Create resume for this job” beside the current ATS link in `js/job.js`. Pass the job ID, resolve its description from the job data source, and preserve it across sign-in. Do not put resume content or full descriptions in query strings. Store job context separately from the resume; never auto-add missing skills. If a job disappears, the user can continue without job context.

V3 AI can propose rewrites with explicit user acceptance, usage limits and a defined provider data policy. Suggestions may rephrase supplied facts but never fabricate qualifications, achievements or numbers.

## 10. Admin panel

Authenticated administrators create metadata, choose a supported renderer family, configure allowed design tokens, upload a fictional sample preview, set Free/Premium, categorize, tag, preview fixtures, and publish a version. Preview uploads are validated/re-encoded raster files with size limits; no arbitrary active content.

Publication is blocked if schema validation or required render checks fail. Keep immutable published versions and an audit trail. Updates create a new version; existing resumes remain pinned unless users choose to migrate. Archive removes a template from discovery while keeping safe existing versions usable under normal entitlement rules. A security withdrawal explicitly disables the version and offers a free replacement while retaining all content.

Provide an order lookup and payment-reconciliation view with redacted metadata. Support staff have no default access to resume contents. Manual entitlement adjustments require a separate audited privilege, expiry and reason; users cannot self-assign roles through profile fields.

## 11. Analytics

Extend `analytics/src/events.js` and the existing tracking path for consented public/product events. Add a server outbox and delivery worker for authoritative purchase/export completion; do not infer revenue from checkout callbacks.

| Event | Trigger |
|---|---|
| `resume_builder_view` | Landing opened |
| `resume_template_view` | Template details opened |
| `resume_create_click` | Create clicked |
| `resume_created` | First draft persisted |
| `resume_premium_selected` | Premium sample selected |
| `resume_checkout_started` | Server order ready and checkout opened |
| `resume_payment_successful` | Transactional fulfillment committed |
| `resume_export_ready` | Worker artifact ready |
| `resume_download_served` | Authorized download response served |

Allow only template ID, category, plan, feature, anonymous event ID, error code and consented attribution. No names, email, phone, resume text, JD text, signed URLs or auth identifiers in marketing analytics. Operational payment records exist independently of analytics consent. Deduplicate purchase events using an internal transaction event key and pass only consent-appropriate attribution to external destinations.

Measure visit-to-create, create-to-premium-selection, checkout-to-paid and export success, plus pending-payment age, processing latency and error rate. A served download is not proof that the user saved a file. Exclude test mode, admin traffic and retries from commercial conversion totals.

## 12. Implementation phases and acceptance gates

Each phase should produce a reviewable change, migrations where applicable, setup instructions and relevant checks. Do not add mocked payment success to production code.

| Phase | Deliverables | Exit gate |
|---|---|---|
| 0 — Foundation | Schema contracts, API skeleton, environment example without secrets, migration setup, fixture data, auth adapter | Local setup reproducible; no secrets/static private assets |
| 1 — Free vertical slice | Landing/gallery, sign-in, owner-only CRUD, autosave/conflicts, duplicate, section editor, six initial templates | Two-user isolation; edit/reload/duplicate/template switch preserve data; mobile/keyboard checks |
| 2 — Export | Shared renderer, worker queue, private storage, downloads, expiry cleanup | Text extraction and visual fixtures pass; unauthorized downloads blocked; job failures recover |
| 3 — Paid access in test mode | Server orders, signatures, durable webhooks, grants, pending UI, reconciliation, refunds | Tampered prices/IDs rejected; callback/webhook races and replay grant once; expiry and refund enforced |
| 4 — Catalog and admin | 36 reviewed designs, 12 free, versioned publication, protected premium previews | Counts are accurate; every design passes render fixtures; no private template payload in public build |
| 5 — Site integration and release | Navigation, job CTA, analytics, account deletion, copy updates, monitoring/runbook | Existing Jobs/ATS work; service worker leaks no private data; complete payment-to-export test |
| V2 | Integrated saved analysis/JD reports, DOCX, cover letters, gradual 100+ catalog | Validate each advertised feature before selling Career |
| V3 | AI assistance, accepted rewrites, versions, interview/application tools | Factuality controls, cost/usage limits and data handling tested |

Required integration tests cover: non-owner reads/writes/exports; admin role tampering; stale saves; blank/long/Unicode content; duplicate and out-of-order webhook delivery; invalid signatures; wrong amount/currency/order association; authorized-but-not-captured payments; provider/API/database timeouts; two concurrent purchases; expired access; refunds before capture-event processing; account deletion; private storage access; and export text fidelity. Use representative fixtures rather than tests that merely repeat implementation constants.

Local development: retain the existing Python static server for public pages; run the new API and worker separately with test-mode configuration. Local paid-flow tests use signed webhook fixtures or a secure development callback tunnel. Never place backend source secrets or premium configurations within the deployed public tree. The static deployment should use an explicit artifact allowlist once backend files are introduced.

Suggested new code layout:

```text
resume-builder/                 static route shells
js/resume-builder/              frontend modules
css/resume-builder.css          product styles
services/resume-api/            authenticated API and payment orchestration
services/resume-worker/         rendering and background processing
packages/resume-schema/         data contract and migrations
packages/resume-renderer/       shared rendering interfaces and free renderers
database/migrations/           tables, constraints and RLS
tests/resume-builder/           security, payment and render fixtures
```

Production prerequisites, to resolve during implementation: Supabase project/region and auth email delivery, container hosting and API origin, Razorpay merchant onboarding/live credentials, approved font licenses, actual payment/refund/customer-support terms, retention/backups, and gateway charges/tax treatment for the proposed price. Development and test-mode implementation can proceed before those production values exist.

Release sequence: internal free slice → private end-to-end test with test payments → reviewed 36-template catalog → production configuration and verification → public paid launch. This document specifies the work; completion of the specification does not imply that login, payments, exports or the builder have shipped.
