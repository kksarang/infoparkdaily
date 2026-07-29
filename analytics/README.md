# InfoparkDaily Analytics Module

Modular, reusable client analytics for the static GitHub Pages site.

## Phase 16 — Code quality (current)

ES modules under `analytics/src/`. Single entry, single send path, lazy-loaded heavy helpers.

| Principle | How |
|-----------|-----|
| ES Modules | `import` / `export` — no `IPD_ANALYTICS_*` globals |
| Reusable functions | Shared helpers in focused modules |
| Single responsibility | `track.js` sends; `client.js` wires DOM; `consent.js` gates; `loader.js` loads tags |
| Lazy loading | Dynamic `import()` for performance, SEO, Clarity bridge |
| Tree-shake friendly | Named exports; side-effect-light modules |
| No duplicate code | One catalog (`EVENTS` / `CATALOG`); one `track()` |
| No globals (internals) | Sole public facade: `IPDAnalytics` (+ `trackEvent` alias) |
| Event constants | `EVENTS` in `src/events.js` |
| Central tracking | All events go through `track(name, params)` |

### Load (every HTML shell)

```html
<script type="module" src="/analytics/main.js?v=…"></script>
```

**Must include on `404.html`** — all `/job/<id>` pages use it.

### Layout

```
analytics/
  main.js              # ESM entry → init + IPDAnalytics facade
  src/
    config.js          # IDs + feature flags
    events.js          # EVENTS, CATALOG, STORAGE, aliases
    track.js           # central track()
    consent.js         # banner + Consent Mode v2
    loader.js          # GTM / GA4 / Clarity
    client.js          # DOM instrumentation + public helpers
    acquisition.js     # channel / UTM
    user-context.js    # device / OS / network snapshot
    content.js         # content KPIs + helpers
    business.js        # leads / ROI helpers
    clarity-bridge.js  # Clarity tags / mirror / upgrade (lazy)
    performance.js     # CWV + resources (lazy)
    seo.js             # on-page audit (lazy)
  looker-dashboards.js # Phase 15 blueprints (not runtime)
```

## Stack (all free tiers)

| Layer | Role |
|--------|------|
| **GTM** | Tag router — loads GA4 + Clarity; maps `dataLayer` events |
| **GA4** | Visitors, sources, events, conversions, UTMs |
| **Clarity** | Heatmaps + session recordings |
| **Search Console** | SEO queries / CWV (no site code) |
| **Looker Studio** | Dashboards from GA4 (no site code) |
| **This module** | Custom event layer + CWV / errors / performance |

## Setup

1. Create GA4 property → copy `G-XXXXXXXX`
2. Create GTM web container → copy `GTM-XXXXXXX`
3. Create Clarity project → copy project ID
4. Paste IDs into `analytics/src/config.js`
5. In GTM: GA4 Configuration tag + Clarity tag; triggers on Custom Event = `.*` or specific names
6. Mark conversions in GA4: `job_apply`, `social_click`, `contact_submit`, …
7. Link Search Console + optional Clarity↔GA4
8. Build Looker Studio report from GA4

Localhost: remote tags are **skipped** by default (`disableRemoteOnLocalhost`); `dataLayer` still receives events when `debug: true`.

## Public API

```js
IPDAnalytics.trackEvent("job_apply", { job_id: "aceware", company: "Aceware" });
IPDAnalytics.trackJobView(job);
IPDAnalytics.trackJobApply(job, "url");
IPDAnalytics.trackJobSearch("react");
IPDAnalytics.trackJobFilter({ company: "eurolink-technologies", status: "open" });
IPDAnalytics.trackContactSubmit("Post a Job", true);
IPDAnalytics.trackNewsletterSubmit();

// Alias
trackEvent("instagram_click", { account: "jobs" });
```

## Auto-tracked

- `page_view`
- `session_attrib` (+ `ipd_session_attrib` / `ipd_utm_capture`) — first-touch channel + UTMs
- `user_context` (+ `ipd_user_properties` dataLayer) — language, device, OS, browser, screen, network
- `page_exit` — pagehide with engaged_sec + content_type
- Outbound / social / tel / mailto clicks
- Header nav clicks
- Scroll depth 25 / 50 / 75 / 100
- JS errors + unhandled rejections
- Navigation timing + slow pages
- LCP / CLS / INP (when remote allowed)

## Phase 7 — User analytics

| Metric | Source |
|--------|--------|
| Users, Sessions, New/Returning, Engaged Sessions, Bounce Rate, Avg Session Time | **GA4 built-in** (after GTM live) |
| Country, State/Region, City | **GA4 geo** (IP; enable Google signals / ads features as needed) |
| Language, Browser, Device, OS, Screen Resolution | **GA4 tech** + client `user_context` |
| Network Speed | **Client only** — `navigator.connection` → `network_type` / `network_speed` |

Do **not** invent custom counters for Users/Sessions — trust GA4.

## Phase 8 — Acquisition / traffic

| Channel | How detected |
|---------|----------------|
| Google Search | `utm_medium=organic` + google, or google.* referrer |
| Instagram / WhatsApp / Facebook / LinkedIn / Telegram / Threads | `utm_source=…` or social referrer |
| Email | `utm_medium=email` or source newsletter/email |
| Campaign | paid medium (`cpc`, `ppc`, `paid`, …) |
| Organic | other search engines / `utm_medium=organic` |
| Referral | non-social external referrer |
| Direct | no UTM, no referrer |

UTM params (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`) are stored first-touch in `sessionStorage` and merged onto every later event. `channel` + `channel_group` ride along too.

## UTM convention

```
?utm_source=instagram&utm_medium=social&utm_campaign=jobs_daily&utm_content=post_slug
?utm_source=whatsapp&utm_medium=social&utm_campaign=jobs_alert
?utm_source=newsletter&utm_medium=email&utm_campaign=weekly&utm_content=issue_12
?utm_source=google&utm_medium=cpc&utm_campaign=brand&utm_term=infopark+jobs
```

Captured into `sessionStorage` and merged onto later events. Use `buildShareUrl` from `src/acquisition.js` when building share links.

## Phase 9 — Content analytics

| KPI | Primary event(s) | Dimension |
|-----|------------------|-----------|
| Top News | `news_view` | article_id |
| Top Companies | `job_view` / `company_click` | company |
| Top Categories | `news_view` / `job_view` | category |
| Top Pages | `page_view` | page_path |
| Most Shared | `news_share` / `job_share` / `content_share` | content_id |
| Most Saved | `content_save` | content_id |
| Top Search Queries | `job_search` (+ `news_search`) | search_term |
| Top Authors | `news_view` | author |
| Most Returning Pages | `page_view` where returning | page_path |
| Top Landing Pages | `session_attrib` / `page_view.is_landing` | landing_path |
| Top Exit Pages | `page_exit` | page_path |

Call `IPDAnalytics.trackNewsView(article)` from news-article.js. Optional `author` field on NEWS items (falls back to `source`). Save UI: `trackContentSave("news", id)`.

## Phase 10 — Business analytics

| KPI | Event / formula | Notes |
|-----|-----------------|-------|
| Employer Leads | `contact_submit` where `lead_type=employer` | Post a Job / Partner / company filled |
| Contact Form CVR | `contact_submit ÷ contact_start` | Wire start on first field focus |
| Ad Clicks | `ad_click` | `[data-ipd-ad]` auto |
| Sponsored Performance | `sponsor_click ÷ sponsor_view` | `[data-ipd-sponsor]` + IO |
| Company Profile Visits | `company_view` | `?company=` filter / profile pages |
| Company Website Clicks | `company_click` | Apply / careers outbound |
| Revenue Attribution | `revenue_record` | Ops fires on paid invoice |
| Campaign ROI | `(revenue − cost) / cost` | Cost from offline sheet in Looker |
| IG / WA / Broadcast growth | `share_instagram` / `share_whatsapp` | Proxy; join Meta/WA admin by date |

```html
<a data-ipd-ad="home_banner" data-advertiser="Acme" data-placement="home_hero" href="…">Ad</a>
<aside data-ipd-sponsor="sp_july" data-campaign="jobs_promo" data-company="Acme">Sponsored</aside>
```

```js
IPDAnalytics.trackContactStart(reason);
IPDAnalytics.trackContactSubmit(reason, true, { company: "Acme" });
IPDAnalytics.trackCompanyView("eurolink-technologies");
IPDAnalytics.trackRevenue(25000, { currency: "INR", campaign_id: "jobs_promo", company: "Acme" });
```

## Phase 11 — Microsoft Clarity (heatmaps)

Paste the Clarity project ID into `src/config.js` → `clarityId`. One snippet enables:

| Feature | Where in Clarity |
|---------|------------------|
| Session Recording | Recordings |
| Heatmaps | Heatmaps → Click |
| Scroll Maps | Heatmaps → Scroll |
| Dead Clicks | Smart events |
| Rage Clicks | Smart events |
| Quick Backs | Smart events |
| JavaScript Errors | Smart events + our `error` / `js_error` bridge |

We also: mask contact form fields, set tags (`channel`, `job_id`, `page_path`, …), mirror key events, and **upgrade** recordings on conversions (`job_apply`, `contact_submit`, …).

Verify in Clarity: Settings → Masking, and link GA4 under Settings → Setup.

## Phase 12 — Performance

| Metric | Event | Notes |
|--------|-------|-------|
| LCP / CLS / INP / FCP / TTFB | `performance` (`metric_name`) | CWV ratings good / needs-improvement / poor |
| Resource Loading | `performance` `resource_summary` | count + transfer_bytes on load |
| Slow Images | `performance` `slow_image` | duration ≥ 2.5s |
| Large JavaScript | `performance` `large_script` | transfer ≥ 300KB |
| API Failures | `api_fail` | fetch wrapper |
| 404 Errors | `404_page` + `resource_fail` | router + asset status |
| Broken Images | `image_error` | img error capture |
| Console Errors | `error` `error_kind=console` | console.error bridge (max 5/page) |
| Unhandled Exceptions | `error` `exception` / `rejection` | window + promise |

Also complements Search Console CWV and Clarity recordings for field debugging.

## Phase 13 — SEO analytics

| KPI | Source |
|-----|--------|
| Indexed Pages, Top Keywords / Queries, CTR, Avg Position | **Google Search Console** |
| Top Landing Pages | GSC Pages + `session_attrib` / `page_view.is_landing` |
| Schema / Missing Meta / Canonical / Broken Links | Client `seo_audit` + `seo_issue` |

Setup: Search Console → Add property `https://infoparkdaily.online` → verify DNS or HTML file → link GA4. On-page audit runs ~1.2s after load.

## Phase 14 — Privacy & consent

- Cookie banner: Accept / Reject
- Google Consent Mode v2 defaults (`analytics_storage` denied until Accept)
- Clarity loads only after Accept
- GA4 events to gtag only when analytics consented
- Privacy Policy §6 documents cookies + consent; Cookie settings via `[data-ipd-consent-open]`

Choice stored in `localStorage` key `ipd_consent_v1`.

## Phase 15 — Looker Studio dashboards

Blueprint: `looker-dashboards.js` (no site runtime required).

| Dashboard | Focus |
|-----------|--------|
| Executive | Users, applies, leads, channel |
| Growth | New/returning, UTMs |
| SEO | GSC queries/CTR + seo_issue |
| Jobs | job_view/apply/search/company |
| Marketing | Campaigns, ads, sponsors |
| Social | IG/WA/Broadcast |
| Performance | CWV, errors, slow assets |
| Revenue | Leads + revenue_record + cost sheet |
| Employer | company_view/click → enquiry |

Create at [lookerstudio.google.com](https://lookerstudio.google.com) → connect GA4 + Search Console → one page per dashboard. Register custom dimensions in GA4 first.

## Phase 16 — done

Runtime is ESM-only via `main.js`.

## Phase wiring (next)

Call helpers from `js/jobs.js` / `js/job.js` / `js/contact.js` / `js/site.js` / `js/news-article.js` when product events fire (many auto-track already).
