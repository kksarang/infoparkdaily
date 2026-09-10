# Career Tools: Firebase setup and member-management guide

Prepared 10 September 2026. This is a setup guide, not a completed Firebase integration. The current local website still uses its local authentication server and SQLite database. Creating a Firebase project alone will not change that. Nothing in this guide requires updating the live website now.

Recommended first release: existing website hosting + Firebase Authentication + Cloud Firestore, on Spark with no billing account. Use Google and email/password login. Save structured resume documents in Firestore. The architecture and saving rules are described in [the member plan](career-tools-firebase-plan.md).

## 1. Create a separate development project

1. Open [Firebase Console](https://console.firebase.google.com/) using the Google account that should own InfoparkDaily's services.
2. Choose **Create a project** / **Add project**. Suggested name: `InfoparkDaily Career Dev`. Accept an available unique project ID and record it.
3. Google Analytics is optional; leave it disabled for this initial setup.
4. Complete creation and confirm the project is on **Spark**. Do not link a billing account for this no-billing release.
5. Use fictional resumes and test accounts in this project. Create a separate production project when local acceptance testing is complete.

Spark needs no payment method. This proposal uses its Google/email authentication and Firestore allowances; it does not require moving website hosting. [Firebase pricing](https://firebase.google.com/pricing)

## 2. Register the website

1. From Project overview, select the **Web `</>`** app icon, or Project settings → General → Your apps → Add app.
2. Use the nickname `Career Tools Dev Web`.
3. Leave **Firebase Hosting** setup unchecked if offered: we are keeping the existing host.
4. Register the app and copy the generated `firebaseConfig` object. It resembles this example; use the console's actual values:

```js
const firebaseConfig = {
  apiKey: "COPY_FROM_FIREBASE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "COPY_IF_PRESENT",
  messagingSenderId: "COPY_FROM_FIREBASE",
  appId: "COPY_FROM_FIREBASE"
};
```

Keep all fields exactly as generated, including any additional fields. A `storageBucket` field does not mean this app needs to enable Storage. The config is available later under Project settings → General → Your apps → SDK setup and configuration. [Web setup](https://firebase.google.com/docs/web/setup)

This **web config** is intended for client applications and can be shared for integration. Access protection comes from Authentication and Security Rules. Do not send a service-account JSON, private key, Google password, or recovery codes; those are different credentials. [Firebase API keys](https://firebase.google.com/docs/projects/api-keys)

## 3. Turn on the two login methods

Open Build → Authentication → Get started → Sign-in method/providers. Console labels may vary slightly.

| Provider | Setting |
|---|---|
| Google | Enable; choose the project support email; save |
| Email/Password | Enable the password option; save |
| Email link/passwordless | Leave disabled for this release |
| Phone/SMS and other providers | Leave disabled |

The website still needs SDK code to display and operate these methods. Enabling Google in the console does not add a working button automatically. [Google sign-in](https://firebase.google.com/docs/auth/web/google-signin), [Email/password authentication](https://firebase.google.com/docs/auth/web/password-auth)

Next, open Authentication → Settings → Authorized domains. Add **`localhost`** to the development project. Enter a hostname, not `http://localhost:8000` or a page path. Use `http://localhost:8000` consistently for local testing. New projects created after 28 April 2025 do not include localhost automatically. Keep localhost out of the production project's authorized domains. [Authentication troubleshooting](https://firebase.google.com/docs/auth/faq-and-troubleshooting)

## 4. Create the resume database

1. Open Build → Firestore Database → Create database.
2. Choose **Standard edition**, where an edition choice appears, and the default database.
3. Choose **Production mode** so browser access begins locked. Do not select open Test mode.
4. For a mainly Kerala/India audience, my suggested region is **Mumbai (`asia-south1`)**. Confirm availability before creating it. The database location cannot be changed after provisioning. [Firestore locations](https://firebase.google.com/docs/firestore/locations)
5. Finish creation. Leave access locked until the application's tested rules are ready. No manual member documents are necessary now. [Firestore setup](https://firebase.google.com/docs/firestore/quickstart)

An intentionally locked starting ruleset is:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

This is a **setup lock**, not the final app rules. Saving from the browser will fail while it is installed. During integration, replace it in the development project with tested owner-only rules, field validation, verification requirements and revision checks. Never fix a permission error by making every document public. [Security Rules conditions](https://firebase.google.com/docs/firestore/security/rules-conditions)

## 5. Prepare verification and password recovery

Open Authentication → Templates. Review the verification and password-reset messages, project name, sender and support details that the console permits editing.

Use Firebase's provided action handler initially. We will configure the website's allowed return URL in code; do not enter an invented reset page that the website does not implement. The application must explicitly send verification mail after email signup and provide resend, verification refresh and password-reset controls. [Managing web users](https://firebase.google.com/docs/auth/web/manage-users)

Recommended member journey:

- Google: sign in → load saved resumes or create the selected first draft.
- Email signup: create identity → send verification → explain how to verify → refresh verification state → enable private cloud saving.
- While verification is pending, retain work in memory or an explicitly trusted-device recovery copy and show that it is not cloud-saved.
- Forgot password: enter email → show a generic confirmation → complete Firebase's reset page → return to sign in.
- Existing email/password member choosing Google: use an authenticated provider-linking flow that preserves the original UID and resumes.

## 6. Connect the existing website — development work still required

After console setup, provide the **development web config**, confirmation that both providers are enabled, and the Firestore region. These are enough to begin the integration; no Admin SDK private key is needed for member sign-in and owner-only saves.

The code work is:

1. Add the modular Firebase web SDK through a build/bundling step suitable for this currently static JavaScript site. Installing the npm package alone will not make bare imports work in the browser.
2. Add a Firebase authentication adapter behind the existing login UI: Google, email signup/sign-in, verification, reset, logout and account linking.
3. Set session persistence before login: session-only by default; persistent when the member selects Remember me. Remembering login and retaining offline resume content are separate choices. [Auth persistence](https://firebase.google.com/docs/auth/web/auth-state-persistence)
4. Replace local `/v1/` draft operations with a Firestore repository. Preserve resume schema, template choice, design settings and last section.
5. Implement acknowledged autosave, recovery, revision conflict handling and returning-member navigation.
6. Add and test rules and indexes. Adjust the site's content-security policy for the SDK's required connections. Ensure service-worker caching cannot expose another member's private data.
7. Implement and validate browser PDF export for the free cloud release. The current local PDF worker is a Node/Chrome server and will not run just because Firebase Auth is added.
8. Keep the shared demo identity and local admin/payment endpoints out of the public release.

Existing local accounts are not automatically Firebase accounts. For test data, make fresh Firebase accounts. If preserving a local draft is needed, provide an explicit export/import flow into the signed-in Firebase owner's workspace. Do not transfer ownership just by matching email strings, and do not copy local password hashes into Firestore.

The older Supabase placeholders and SQL migration in the repository are not instructions for this Firebase setup.

## 7. How returning members recover unfinished work

Every member gets a stable Firebase **UID**. Resume ownership uses that UID:

```text
users/{uid}
  displayName, createdAt, lastLoginAt, lastOpenedResumeId, schemaVersion

users/{uid}/resumes/{resumeId}
  title, data, templateId, templateVersion, lastSection,
  revision, createdAt, updatedAt, status
```

Example: Anu edits the Experience section and the cloud confirms save. She signs out. Tomorrow she signs in on another device using the same account. The dashboard loads her documents and shows **Continue editing**. Opening it restores the saved resume and Experience section.

The planned editor saves after three seconds idle, or at most once per fifteen seconds during continuous typing, with closely spaced saves combined. It shows **Saving**, **Saved**, **Offline / unsaved on this device**, or **Conflict** accurately. Sign-out must resolve unsaved work through save, retry or recovery download.

Each save compares the loaded revision against the cloud revision in a transaction. Another device's newer change triggers recovery/conflict handling rather than silent replacement. Transactions fail offline, so local pending work must wait for reconnection. Only acknowledged cloud changes can appear on another device. [Firestore transactions](https://firebase.google.com/docs/firestore/manage-data/transactions)

Do not enable persistent browser storage silently on shared computers. Namespace recovery data by owner and draft, and clear it after resolved sign-out. Firestore's web persistence alone uses last-write-wins and does not replace conflict handling. [Offline data](https://firebase.google.com/docs/firestore/manage-data/enable-offline)

## 8. How you manage members

| Task | Initial management approach |
|---|---|
| Find a login account | Firebase Console → Authentication → Users |
| Inspect provider, UID and account state | Authentication user details |
| Disable an abusive account | Console administrator action; record why |
| Recover a forgotten password | Member uses the site's reset-email flow |
| Inspect application records when needed | Restricted Firestore Console access |
| Review usage | Firestore Usage and Firebase billing/usage screens |
| Give staff access | Project settings → Users and permissions; minimum necessary role |
| Delete a member completely | Reauthenticate; remove drafts/profile, then Auth identity; retry interrupted cleanup |

For launch, the Console is the privileged account-management tool. The local site's member-directory API does not automatically become a Firebase administration service. Browser clients cannot list all Firebase Auth accounts; a custom full directory needs a trusted backend or a separately designed, restricted metadata view.

Ordinary member profiles must never grant themselves admin or paid access. General support views should show account metadata, not resume contents. Keep project-owner accounts protected with MFA and grant access individually.

Deleting an Authentication user alone does not delete their Firestore documents. Account deletion needs an explicit cleanup workflow. Also test access after disabling an account: existing issued credentials can remain usable temporarily, so immediate denial of data access requires a deliberate revocation/rules design. [Admin session management](https://firebase.google.com/docs/auth/admin/manage-sessions)

## 9. What the free budget supports

Spark currently includes Firestore Standard storage of **1 GiB**, **50,000 reads/day**, **20,000 writes/day**, **20,000 deletes/day**, and **10 GiB/month network egress**. These allowances are shared across the project. Cloud Storage, Cloud Functions and phone authentication are outside this no-billing scope. [Pricing](https://firebase.google.com/pricing)

Auth has its own limits: Spark currently allows 1,000 verification emails/day and 150 password-reset emails/day; email-link login has a much smaller allowance. Identity Platform upgrades have additional Spark limits. [Authentication limits](https://firebase.google.com/docs/auth/limits)

Our proposed budget controls: save resume text rather than files, debounce writes, paginate dashboard queries, avoid unnecessary listeners and avoid updating profiles on each keystroke. For illustration, 100 editors making 100 saves each consume 10,000 draft writes before other operations. This is an estimate, not a supported-member guarantee.

Review real usage during testing and daily after launch. If a quota is reached, show a truthful save failure and offer recovery. Remaining on Spark avoids usage charges but does not guarantee uninterrupted service at unlimited traffic. [Pricing plans](https://firebase.google.com/docs/projects/billing/firebase-pricing-plans)

The first no-billing release should offer the approved free templates and browser PDF export. Keep premium payment enforcement and server PDF generation local until a trusted backend is separately selected and budgeted.

## 10. Acceptance tests before updating live

- Fresh Google login and verified email signup both reach the correct selected template.
- Incorrect passwords, cancelled Google popup, expired verification links and reset requests produce understandable messages.
- Save a draft, sign out and back in, and resume the same document and section.
- Sign in on a second device and recover the last acknowledged cloud version.
- Two different accounts cannot read, update, list or delete each other's drafts, even with a guessed document path.
- Unverified users cannot bypass the chosen saving restrictions.
- Offline edits, save failures and overlapping edits preserve a recoverable copy.
- Remember me behaves correctly, and account switching reveals no previous owner's cached content.
- Account deletion and interrupted deletion cleanup work as documented.
- Free PDF exports retain selectable text, fonts and pagination.
- Quotas remain within the launch budget under representative editing sessions.

Test rules in the [Local Emulator Suite](https://firebase.google.com/docs/emulator-suite), then test real providers and email delivery using the development Firebase project. Using that project from localhost sends test account and resume data to Firebase; it does not publish the website.

After these pass, prepare a separate production Spark project with the real website hostnames, production web config, providers, email settings and tested rules/indexes. Keep test accounts separate. The website update remains a later, explicit release step under your local-first instruction.

## 11. Common setup problems

| Symptom | Check |
|---|---|
| Google reports unauthorized domain | Development Auth authorized domains includes `localhost`; page uses that hostname |
| Login provider unavailable | Provider enabled in the same project as the web config |
| Google window does not open | Login initiated by a direct button click; popup not blocked |
| Login works but saving fails | Firestore exists; setup lock replaced with tested app rules; correct UID, verification and document path |
| Returning dashboard is empty | Same Firebase project and account UID; original draft actually reached Saved |
| Reset/verification email missing | Spam folder, correct address, template configuration and email quotas |
| Old local resumes missing in Firebase | Expected until an explicit import; local SQLite is separate from Firestore |

Your immediate setup ends after steps 1–5. The next integration input is the development app's public `firebaseConfig`, enabled-provider confirmation and chosen database region.
