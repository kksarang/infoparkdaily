# Resume Builder — local review and release status

The local V1 implementation runs at **http://localhost:8000/resume-builder/**.
Nothing in this change deploys or pushes the website. Live mode is deliberately
unavailable in the local server.

## Start locally

Use Node 24+ (the development machine has Node 25):

```sh
npm ci
npm run dev
```

PDF rendering uses installed Google Chrome on this Mac, or a Playwright Chromium
installation (`npx playwright install chromium`) on another machine. Set
`RESUME_CHROME_PATH` to choose a browser executable. The server binds only to
127.0.0.1 and validates the Host header. Do not replace it with a root-directory
static server: the repository now contains backend source and private local data.

Open Resume Builder → Templates → choose a free design → **Preview tools for the site owner → Open shared demo workspace**. The demo account also has local template-admin access. Alternatively,
create separate local accounts to review owner isolation. These are local
accounts, not Supabase identities. Passwords use salted scrypt hashes and
sessions use random, server-stored tokens in HttpOnly, SameSite cookies.

The demo is intentionally labeled as a shared local preview account; anyone using
this computer's preview can enter it. Do not put private information in the demo
account. Personal local accounts have distinct passwords and sessions.

## What is implemented

- Branded landing page and 60-template catalog with 20 free designs, categories,
  text search, access filters and actual sample previews.
- Redesigned sign-in/create-account screens with password visibility and remembered
  sessions, a Continue editing dashboard that restores the last section, and a
  read-only local administrator member directory.
- Account signup/sign-in, owner-bound resume CRUD, duplicate, rename, delete,
  account data download and local account deletion.
- Personal details, summary, experience, education, skills, projects,
  certifications, achievements, languages, interests and custom sections.
- Autosave with server acknowledgement and revision conflicts; recover conflicting
  edits as a separate copy. Mobile Edit/Preview views and keyboard controls.
- Template switching without replacing content, accent colors, Pro font/spacing
  options, section visibility and ordering.
- Text-based A4 PDF generation, immutable export snapshots, export status, worker
  retry after restart, owner-authorized downloads, 24-hour export cleanup and
  server-side Pro checks. The worker blocks external network requests.
- Server-priced ₹99 / 7-day orders, transactional grants, payment replay
  protection, expiry, simulated success/pending/failure/refund and repeated
  purchases that extend access. Real Razorpay **test-mode** integration is coded
  behind credentials; it has not been exercised against a merchant account.
- Local admin catalog, version creation, generated fictional previews, draft/
  publish/archive, validation of declarative layouts, and audit records.
- Existing website navigation and job-page entry point. Existing free ATS checker
  is unchanged; the builder records a job reference without inventing job-specific
  content.
- Analytics event catalog and server-side outbox records for creation, checkout,
  fulfillment and export. External analytics delivery is intentionally disabled
  in this local review. No ad scripts or session recordings run in builder pages.

## Local purchase review

Pricing → **Try Pro in local test mode** opens an order owned by the account.
Use “Test successful payment”, “Test pending” or “Test failed payment”. A completed
order offers “Test full refund”. These are simulations, not Razorpay transactions.
Reloading or repeating success does not extend the same payment twice. Editing a
saved premium resume remains possible after expiry/refund; switch to a free
layout to export again.

To exercise Razorpay's actual test checkout, set `RESUME_PAYMENT_MODE=razorpay_test`
and `RAZORPAY_KEY_ID` (must start with `rzp_test_`), `RAZORPAY_KEY_SECRET`, and
`RAZORPAY_WEBHOOK_SECRET` in the server environment. Local `.env` files are not
automatically loaded; use Node's `--env-file` option if desired. Callback signatures
use the stored order ID; fulfillment fetches provider payment state. The webhook
endpoint is `/v1/webhooks/razorpay`, checks raw-body signatures, persists events,
retries verification and deduplicates delivery. Reconciliation runs every five
minutes. A gateway timeout leaves the order pending, without blindly issuing a
second order. A tunnel will need a separately reviewed Host allowlist adjustment;
this local server intentionally rejects external hostnames.

## Checks

```sh
npm run check
npm test
npm run resume:fixtures
```

The integration suite checks account isolation, invalid origins/hosts, static
private-file denial, schema validation, stale saves, duplicate drafts, server
pricing, idempotency, signature verification, capture-only fulfillment, Pro
export authorization, refunds, expiry, repeated purchases and account deletion.
PDF fixtures cover every template with fresher, experienced, Unicode/long-link/
custom-section, and minimal content. Fixture files are under
`artifacts/resume-builder/` (ignored by Git). The production SQL is preparatory;
it is not executed or validated against a Supabase project by these tests.

## Still required before a live update

The local product is reviewable. It is **not yet a production payment service**.
The latest free-budget direction is documented in [the Firebase plan](career-tools-firebase-plan.md).
That plan defers the paid/cloud-worker items below until a trusted backend is budgeted.

1. Follow the updated [Firebase member and saved-work plan](career-tools-firebase-plan.md).
   The preferred first cloud release now uses Firebase Authentication and Firestore
   Spark for the free core. The earlier Supabase SQL remains an unexecuted alternative,
   not the selected production path. The running local adapter still uses SQLite.
2. Configure verified email delivery, password recovery, session rotation,
   administrator MFA and real role provisioning. Remove local demo/simulation
   routes from the production entrypoint, rather than merely hiding their UI.
3. Exercise actual Razorpay test checkout, signed webhook delivery, provider
   timeouts, out-of-order capture/refund/dispute events and reconciliation using
   merchant test credentials. Confirm manual review/support procedures for
   duplicate captures and partial refunds before enabling live keys.
4. Deploy the API and isolated Chromium worker to the chosen backend host, wire
   the static frontend to that API origin, configure private storage downloads,
   monitoring, backups, alerts, resource limits and deletion/retention jobs.
5. Complete consent-aware analytics delivery from the durable outbox and public
   interaction tracking. Do not enable recordings on resume or checkout screens.
6. Verify the complete mobile/desktop journey in a browser, including real payment
   UI and each account flow; review the template designs with actual user content.
   The current automated suite validates API and PDF paths.
7. Finalize customer-facing price/tax, refund/support, privacy and retention terms.
   Clarify the existing free-resume-help wording without removing that free help.
8. Build a static deployment artifact from an explicit allowlist. Never upload
   `.local`, `.env`, `node_modules`, `services/resume-api`, database files or
   private template configs to GitHub Pages. Update deployment configuration
   before pushing this backend-containing repository to a publishing branch.
9. Review the local result with the site owner, then perform the separately
   authorized live update only after the remaining checks above pass.

V2/V3 features remain outside this V1 implementation: saved integrated ATS reports,
job-description scoring in the builder, Word export, cover letters, AI rewriting,
and application tracking. The existing standalone ATS tool remains available.
