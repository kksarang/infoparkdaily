# Production readiness — Auth, security, analytics

**Date:** 2026-09-15  
**Site:** https://infoparkdaily.online/  
**Scope:** Authentication reliability, authorization review, Firebase/GA4 journey tracking  
**Deploy status:** Shipped to GitHub Pages via `main` (2026-09-15). Storage rules still need `firebase deploy --only storage` if not already live. GA4 DebugView + dual-user smoke remain operator checks.

---

## Architecture (inspected)

| Layer | Finding |
|-------|---------|
| Site | Static multi-page HTML on **GitHub Pages** (`main` → `infoparkdaily.online`) |
| Career Tools | Firebase Auth + Firestore (`infoparkdailyweb`), client SDK in `js/resume-builder/cloud.js` |
| Hiring hub | Same Firebase project via `js/infoparkdaily/cloud.js` |
| Resume HTTP API | Local-only SQLite (`services/resume-api`) — refuses production |
| Analytics | Existing module `analytics/` → GA4 **`G-PWD80WZ7Q2`** (site). Firebase `measurementId` `G-747MYSVW6K` unused by design (single site GA4) |
| Persistence | Email/Google auth uses `browserLocalPersistence` when “Remember me” is checked, else `browserSessionPersistence` |

Auth source of truth is **Firebase Auth** (`auth.currentUser` / `onAuthStateChanged`), not a localStorage login flag.

---

## Prioritized issues

### Confirmed (fixed in this change set)

1. Career Tools Firebase `initializeApp` unguarded → now `getApps()`-safe  
2. Resume / market / portfolio `next=` open-redirect sanitizers strengthened  
3. Analytics not loaded on resume, portfolio, ATS, hiring hub → bootstrapped  
4. `job_view` / `job_apply` helpers unused → wired in `js/job.js`  
5. Portfolio `portfolio:analytics` never reached GA → bridged to `IPDAnalytics`  
6. ATS `#account-nav` never reflected signed-in state → fixed via `career-nav.js`  
7. Header logout missing on resume/portfolio/ATS when signed in → added  
8. Logout did not clear analytics User-ID → clears via `identity.js`  
9. No Storage rules while bucket configured → default-deny `firebase/storage.rules`  
10. Event catalog missing auth/resume/portfolio journey events → added  

### Needs verification (console / live)

- Firebase Auth authorized domains include `infoparkdaily.online`  
- GA4 DebugView delivery for new events after consent Accept  
- Deploy Storage rules: `firebase deploy --only storage`  
- Cross-browser Google popup/redirect on iOS Safari  
- Emulator isolation suite for User A → logout → User B (script exists; not in default CI)

---

## Auth behaviour (documented)

### Remember me / persistence

| UI | Persistence |
|----|-------------|
| Remember me checked | `browserLocalPersistence` — survives refresh & new tabs |
| Remember me unchecked | `browserSessionPersistence` — ends when the browser session ends |
| Google sign-in (portfolio) | Currently remembers (`remember:true`) |

Ordinary **Log out** ends the **current browser** Firebase session only. It does not claim to sign out every device.

### Logout (current browser)

1. Await Firebase `signOut`  
2. Clear session keys used for auth touch / local API / market signup draft  
3. Clear GA4 User-ID + `auth_state` user property  
4. Update nav immediately; redirect to public page  
5. On failure, show error — do not pretend success  

Does **not** delete cloud resumes or favourites shortlist preferences unrelated to session.

### Redirect after login

Internal paths only under product prefix; rejects `//`, `://`, `\`, `..`.

---

## Authorization

Firestore rules (`firebase/firestore.rules`) already enforce:

- Owner-only read/write on `users/{uid}` and resumes  
- Email verification required for writes  
- Marketplace admin via trusted `marketAdmins` docs  

Storage is default-deny. Premium cannot be granted from browser state for Career Tools (templates are free; Pro Pass is local-dev only).

**Tested in repo:** `npm run test:community` (rules). Live dual-user isolation via emulator: `tests/infoparkdaily/auth-flow.mjs` (manual).

---

## Analytics

### Module

- Entry: `/analytics/main.js`  
- Single `track()` path with consent, sanitization, 800ms dedupe  
- Consent Mode v2 + banner (`ipd_consent_v1`)  
- Localhost: remote tags skipped; `dataLayer` still receives events when `debug: true`

### User-ID

Opaque Firebase `uid` only (never email). Cleared on logout.

### Key events (triggers)

| Event | Trigger |
|-------|---------|
| `login_start` | Auth form / Google / redirect-to-sign-in |
| `login` / `sign_up` | Confirmed success |
| `login_error` | Sanitized category only |
| `logout` | After confirmed signOut |
| `password_reset_request` | Reset accepted (no email param) |
| `resume_gallery_view` | Templates gallery render |
| `resume_template_preview` / `_select` / `_start` | Preview / choose / create draft |
| `resume_save_success` | PATCH succeeded |
| `resume_export_start` / `_success` / `_error` | Print/PDF flow |
| `portfolio_gallery_view` | Portfolio store load |
| `package_select` / `portfolio_start` | Order dialog |
| `whatsapp_click` | Outbound wa.me open (not message sent) |
| `job_view` / `job_apply` | Job detail + apply CTA |
| `job_search` / `job_filter` | Jobs board (≥2 chars / filter chip) |
| `pricing_view` | When mapped from portfolio pricing |

### Privacy

Never send names, emails, passwords, tokens, resume body, or full WhatsApp prefilled URLs. Query params like `email`, `token`, `next` stripped from `page_location`.

Analytics **undercounts** vs reality (consent decline, blockers, ITP). Not a customer ledger.

### GA4 console steps (pending operator)

1. Open GA4 property linked to `G-PWD80WZ7Q2`  
2. Admin → Data display → Custom dimensions: `template_id`, `package_id`, `feature`, `method`, `error_category`, `auth_state` (event-scoped as needed)  
3. Mark key events: `login`, `sign_up`, `job_apply`, `whatsapp_click`, `resume_export_success`, `package_select`  
4. Explore → Funnels:  
   - Resume: gallery → preview → start → save → export  
   - Portfolio: gallery → preview → package_select → whatsapp_click  
   - Auth: login_start → login  
5. DebugView: enable debug mode / Chrome GA Debugger; Accept consent; exercise journeys  

---

## Test evidence

| Check | Result |
|-------|--------|
| `node --check` on changed JS | Pass |
| `npm run build:cloud` | Pass |
| `npm run build:community` | Pass |
| `node --test tests/analytics/auth-privacy.test.mjs` | Run in this session |
| `npm test` (resume local API) | Existing suite |
| `npm run test:community` | Firestore rules |
| Live GA4 DebugView | **Pending** (needs production/staging consent + network) |
| Dual-user browser isolation on production | **Pending** |

---

## Performance / growth notes

~1,000 weekly users ≈ low concurrent load for static Pages + Firebase free/Blaze. Watch Firestore reads on resume list (bounded `MAX_RESUMES=20`). Portfolio previews are lazy images. PDF export is client print (no server PDF in production). Do not load-test live Auth.

---

## Release recommendation

**Not ready to declare production-complete** until:

1. Storage rules deployed  
2. GA4 DebugView confirms new events with consent Accept  
3. Smoke: User A logout → User B isolation on desktop + one mobile browser  

Code changes in this PR/commit are **ready for review**. Do not treat WhatsApp clicks as purchases. Rollback: revert commit; Firebase rules/storage rollback via previous rules file.
