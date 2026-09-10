# -
# infoparkdaily
# infoparkdaily

## Local website and Resume Builder

```sh
npm ci
npm run dev
```

Open http://localhost:8000/resume-builder/ and open **Preview tools for the site owner → Open shared demo workspace** on the sign-in page
to review the builder, member directory and template administration. Node 24+ and Chrome/Playwright
Chromium are required for PDF exports. The existing website is served on the
same local port, including job/company routes.

Running locally makes no live changes. Payments default to a clearly labeled local simulation.
See [local setup and production prerequisites](docs/resume-builder-local.md).
Do not serve or publish this repository's entire root as static files: it now
contains backend source and a private local database.

The menu is now **Career Tools**. See the [Firebase member login and saved-work plan](docs/career-tools-firebase-plan.md) for the proposed free cloud setup.

## Public release

GitHub Pages publishes the static site from `main`. `_config.yml` excludes local
backend source, tests, documentation and development files from the website.
Keep `.nojekyll` absent so those exclusions apply. The GitHub source repository
itself is public; never commit credentials, local databases or member data.

Career Tools serves the free browser ATS checker publicly. On public hostnames,
the app does not call the local `/v1` API and marks Resume Builder/member accounts
as coming soon. The complete builder remains available on localhost until Firebase
and production export support are implemented and tested.
