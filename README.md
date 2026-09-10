# -
# infoparkdaily
# infoparkdaily

## Local website and Resume Builder

```sh
npm ci
npm run dev
```

Open http://localhost:8000/resume-builder/. Member accounts default to **Firebase**.
Add `?local=1` once if you need the older SQLite demo, payments simulator and template admin
on this computer.

Node 24+ is required. Chrome/Playwright Chromium is required only for local server PDF
exports. On Firebase, download uses the browser Print → Save as PDF dialog.

The existing website is served on the same local port, including job/company routes.
See [local setup](docs/resume-builder-local.md) and the
[Firebase setup guide](docs/career-tools-firebase-setup-guide.md).
Do not serve this repository's entire root as static files: it contains backend
source and a private local database.

## Public release

GitHub Pages publishes the static site from `main`. Career Tools uses Firebase
Authentication and Cloud Firestore for member login and saved resumes, plus free
templates and browser PDF export. Pro checkout and server-generated PDFs stay local
until a trusted paid backend is available.

`_config.yml` excludes local backend source, tests, documentation and development
files from the website. Keep `.nojekyll` absent so those exclusions apply. Never
commit service-account keys, local databases or member data.
