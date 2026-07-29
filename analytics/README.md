# InfoparkDaily Analytics Module

Modular, reusable client analytics for the static GitHub Pages site.

## Stack (all free tiers)

| Layer | Role |
|--------|------|
| **GTM** | Tag router — loads GA4 + Clarity; maps `dataLayer` events |
| **GA4** | Visitors, sources, events, conversions, UTMs |
| **Clarity** | Heatmaps + session recordings |
| **Search Console** | SEO queries / CWV (no site code) |
| **Looker Studio** | Dashboards from GA4 (no site code) |
| **This module** | Custom event layer + CWV / errors / performance |

## Files

```
analytics/
  config.js      # IDs + feature flags
  constants.js   # Event names, goals, social matchers, UTMs
  events.js      # Payload builders (no side effects)
  tracker.js     # dataLayer, GTM, Clarity, GA fallback
  analytics.js   # Public API + auto instrumentation
  journeys.js     # Funnel step defs + drop-off calculator (Phase 4)
  taxonomy.js     # Naming rules + catalog (Phase 5)
  jobs-metrics.js # Job KPI registry + rollup helpers (Phase 6)
  user-metrics.js # User/session/geo/tech registry + client snapshot (Phase 7)
  acquisition.js  # Channel classifier + UTM templates (Phase 8)
  content-metrics.js # Content KPIs + page/news helpers (Phase 9)
  business-metrics.js # Leads, ads, ROI, community attribution (Phase 10)
  clarity-metrics.js  # Clarity heatmap / recording bridge (Phase 11)
  performance-metrics.js # CWV + resource / error thresholds (Phase 12)
  seo-metrics.js      # GSC KPI map + on-page SEO audit (Phase 13)
```

## Load order (every HTML shell)

```html
<script src="/analytics/config.js" defer></script>
<script src="/analytics/taxonomy.js" defer></script>
<script src="/analytics/constants.js" defer></script>
<script src="/analytics/events.js" defer></script>
<script src="/analytics/tracker.js" defer></script>
<script src="/analytics/user-metrics.js" defer></script>
<script src="/analytics/acquisition.js" defer></script>
<script src="/analytics/content-metrics.js" defer></script>
<script src="/analytics/business-metrics.js" defer></script>
<script src="/analytics/clarity-metrics.js" defer></script>
<script src="/analytics/performance-metrics.js" defer></script>
<script src="/analytics/seo-metrics.js" defer></script>
<script src="/analytics/analytics.js" defer></script>
<!-- optional: journeys.js / jobs-metrics.js -->
```

Event names follow **`{object}_{action}`** — see `taxonomy.js` and Phase 5 catalog.

**Must include on `404.html`** — all `/job/<id>` pages use it.

## Setup

1. Create GA4 property → copy `G-XXXXXXXX`
2. Create GTM web container → copy `GTM-XXXXXXX`
3. Create Clarity project → copy project ID
4. Paste IDs into `config.js`
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

Captured into `sessionStorage` and merged onto later events. Use `IPD_ANALYTICS_ACQUISITION.buildShareUrl(url, "instagram", { campaign, content })` when building share links.

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

Paste the Clarity project ID into `config.js` → `clarityId`. One snippet enables:

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

## Phase wiring (next)

Call helpers from `jobs.js` / `job.js` / `contact.js` / `script.js` / `news-article.js` when product events fire (many auto-track already).
