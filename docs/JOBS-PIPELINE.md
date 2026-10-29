# InfoparkDaily jobs pipeline

Status as of 30 Oct 2026. This describes what exists, what was decided, and what is still to build.

## Current architecture (audited)

- Static site on GitHub Pages (`CNAME` → infoparkdaily.online). No application server for jobs.
- All jobs live in `data/jobs-data.js` (~4,900 records, ~15 MB), loaded in the browser by `/jobs/`, `/job/<id>` (via `404.html` + `js/job.js`) and `/company/<slug>/` (`js/company.js`).
- Park mirrors: `data/infopark-jobs-data.js`, `data/technopark-jobs-data.js`, `data/cyberpark-jobs-data.js`.
- Ingestion: Python scripts in `scripts/` (one per source / batch), run by hand, sharing helpers from `scripts/import-park-jobs-latest.py` (`render_job`, `insert_jobs`, park builders).
- Firebase (Auth + Firestore) is used for the community marketplace (`marketJobs`, `marketApplications`), resume builder and admin pages under `admin/` — not for the main jobs feed.
- GitHub Actions: `instagram-feed.yml`, `jobs-quality.yml`.

Decision: keep the static data file as the published output for now. Moving the feed to Firestore or a server is only worth it once the review queue (Phase B) exists, because the published file is what search engines and the 15 MB client both read today.

## What exists now (Phase 1–2 foundation)

| Piece | File | What it does |
|---|---|---|
| Source registry | `pipeline/registry.json` | Every source with category, official/employer/secondary type, integration state (`automated`, `manual`, `blocked`, `planned`), adapter, and check cadence. |
| Rules | `pipeline/rules.py` | Strict ISO dates, Asia/Kolkata "today", status (`active` / `expired` / `rolling` / `undated`), URL / email / tel checks, deadline ordering, placeholder-text detection, unsupported "N vacancies" / "freshers can apply" claims, duplicate keys (canonical apply URL + title, or company + reference id). |
| Source check | `pipeline/check_sources.py` | One GET per source; records `reachable` / `blocked` / `http-error` / `unreachable` and the last success in `reports/source-runs.json`. Never bypasses bot protection. A failed probe is never read as "no jobs". |
| Reports | `pipeline/quality.py` | `reports/data-quality.{json,md}` (status counts, issues by code, duplicates) and `reports/source-coverage.md`. `--strict` exits non-zero on error-level issues. |
| Tests | `tests/pipeline/test_rules.py` | 20 unit tests for dates, IST rollover, status, URLs, apply routes, claims and duplicates. |
| Schedule | `.github/workflows/jobs-quality.yml` | Daily 07:00 IST: tests → source probes → reports → commit. |
| SEO fix | `js/job.js` `injectJobPostingSchema` | No JobPosting data on expired jobs; locality taken from the job's own location (no default "Kochi"); no default FULL_TIME; `directApply` only for real web apply links. |

Run locally:

```sh
python3 -m unittest discover -s tests/pipeline -t .
python3 -m pipeline.check_sources
python3 -m pipeline.quality
```

## Remaining phases

**A. Canonical record + provenance (next).** Add optional fields to job records: `verificationStatus` (`verified` / `needs-review` / `unverified` / `expired` / `closed` / `withdrawn` / `result-update`), `lastVerified`, `sourceKey` (registry key), `sourceUrl`, `sourceType`, `notificationRef`, `vacancies`, `ageLimit`, `applicationFee`, `selectionProcess`, `notificationPdf`. Backfill `sourceKey` / `sourceUrl` from existing `officialLinks`. Show "Last verified" and source on job pages.

**B. Review queue.** Importers write candidates to `data/pending/*.json` instead of straight into `jobs-data.js`; `pipeline/publish.py` merges only records marked approved. Admin review UI under `admin/` behind the existing Firebase admin check, writing approvals to Firestore and a scheduled action exporting approved records.

**C. Adapters as modules.** Move each `scripts/add-*-oct*.py` source into `pipeline/adapters/<key>.py` with a common `fetch() -> list[raw]` / `normalise(raw) -> job` interface, driven by the registry and cadence, idempotent on `sourceKey + sourceId`.

**D. Government / PSU / apprenticeship adapters.** Cochin Shipyard, NATS, NAPS, SSC, India Post, SBI and IBPS were reachable on 30 Oct 2026; Kerala PSC, Kerala Employment and UPSC returned 403 to the automated probe and stay manual unless an official feed or permission is available. Notifications are PDFs: extract text, keep the PDF link, and require human review before publishing.

**E. Expiry + change monitoring.** Daily job: mark passed-deadline records `expired` (not `closed`), re-fetch sources for records within 3 days of deadline to catch extensions, alert on changed deadline / vacancy count / apply link.

**F. Search UI.** Default `/jobs/` view hides expired jobs (archive filter keeps them), filters for education level and government / PSU / apprenticeship category, district filter, "accepting applications" toggle.

**G. Split the data file.** Generate per-status / per-park JSON shards so `/jobs/` does not download 15 MB, and generate sitemap entries only for active, verified jobs.

## Known limitations today

- Coverage is limited to the sources in the registry; this is not all Kerala vacancies.
- 3,125 of 4,936 records have a passed deadline; they are still in the data file (sunk to the bottom of `/jobs/`).
- `placeholder_text` warnings (4,335) come from older imports that used generic filler; new importers no longer add it, old records still need cleanup.
- 294 HPE records have a deadline set before their posted date (filled roles were given a past deadline instead of a closed status).
- TCS and Cognizant block automated access; they are added manually from shared links.
