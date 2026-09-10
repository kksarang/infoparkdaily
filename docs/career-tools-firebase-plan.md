# Career Tools — member login and saved-work plan

For console setup and day-to-day administration, follow the
[step-by-step Firebase setup guide](career-tools-firebase-setup-guide.md).

Recommendation: **Firebase Authentication + Cloud Firestore on the Spark plan**
for the first cloud release. Keep existing static hosting. Start with Google and
email/password login, cloud-saved resume text, and free PDF export on the user's
device. This is a proposed replacement for the earlier Supabase production plan;
Firebase is not connected to the running local preview yet.

The local UI now has separate sign-in/create-account modes, remembered sessions,
password visibility, account switching, an administrator-only member list, a
Continue editing dashboard and saved last-section position. The library now has
60 templates, including 20 free and 24 new Studio designs. Existing local account
and draft data is preserved through additive migrations.

## 1. What members should experience

1. Browse Career Tools and templates without signing in.
2. Choose a template. On the sign-in screen show a short message that their choice
   is retained. Offer **Continue with Google** first, then email/password. Show
   only working providers; no placeholder Google button in the local build.
3. Email signup asks for name, email, password and confirmation. Firebase manages
   passwords and sends email verification. Explain verification without losing
   the chosen template. Google login follows the provider's verified identity.
4. After signup, start their chosen draft. On later sign-ins, show the most recent
   draft prominently: title, last-saved time, last edited section and **Continue
   editing**. List their other resumes below it.
5. Continue opens the same resume ID and the same section. Name, experience,
   projects, template, design choices and section order all load from their
   saved document; they never start over merely because they signed out.
6. Provide Save and exit, rename, duplicate and delete. A downloaded resume remains
   editable. Deleting an account requires confirmation and recent authentication.

Cloud saving must be described as available only after Firebase is connected.
The local preview currently resumes work on this computer, not across devices.

## 2. Authentication and account identity

Use one immutable **Firebase UID** as the owner key. Never use an email address or
a local-storage premium flag as an authorization identity. Email can change while
the UID and all its resumes stay the same.

- Google sign-in: convenient primary choice.
- Email/password: verified signup, sign-in, password visibility and recovery.
- “Remember me on this device”: persistent Firebase auth when selected, session
  persistence otherwise. Logging out removes the session; it does not delete
  saved resumes. Firebase documents both persistence modes in its
  [authentication persistence guide](https://firebase.google.com/docs/auth/web/auth-state-persistence).
- Forgot password: Firebase reset email, with a generic confirmation that does not
  reveal whether an email has an account. Rate-limit repeated clicks and show
  actionable errors for expired reset links. Firebase supports reset emails in
  [user management](https://firebase.google.com/docs/auth/web/manage-users).
- Google and password on the same verified address: link providers to the same UID
  through an authenticated linking flow. Never silently create a second member
  record or merge two accounts just because their typed email strings match.
- Role and entitlement decisions come from protected records or verified claims.
  Profile fields supplied by the member cannot grant admin or premium rights.
- Never publish the shared local demo-login route. It is a development convenience,
  not an identity provider.

Start with standard Firebase Authentication, without adding SMS, SAML/OIDC or
Identity Platform features unless needed. Spark currently allows 1,000 verification
emails/day and 150 password-reset emails/day, but only **5 email-link sign-in
emails/day**. Identity Platform on Spark adds a 3,000 Tier 1 daily-active-user limit.
These are reasons to choose Google/email-password over magic links or OTP for this
budget. Check the actual project configuration against the
[Authentication limits](https://firebase.google.com/docs/auth/limits).

## 3. Where each member's data lives

```text
Firebase Authentication
  uid → verified identity, providers, password reset, account status

Firestore
  users/{uid}
    displayName, createdAt, lastLoginAt, lastOpenedResumeId, schemaVersion

  users/{uid}/resumes/{resumeId}
    title
    data                  structured resume text, not a PDF or screenshot
    templateId
    templateVersion
    lastSection           e.g. experience
    revision              optimistic concurrency control
    createdAt
    updatedAt
    status                draft or ready (member-facing organization only)

  memberAccess/{uid}       future protected grants; client cannot write
  templateCatalog/{id}    optional public metadata, never private configs
```

Keep one document per resume, not one per keystroke or field. Retain the current
versioned resume JSON schema and migrations. Keep normal resumes small (target
20–50 KB, application cap 256 KB). Do not store passwords, PDF bytes, images or
base64 uploads in Firestore. Exempt large content maps/arrays from indexing;
index only the fields needed for owner lists and ordering.

Query the signed-in user's resume subcollection ordered by updatedAt with a
limited page size. Update lastOpenedResumeId only when opening/changing drafts,
not on every keystroke. A missing/deleted last-opened draft falls back to the
most recently updated draft or the empty dashboard.

## 4. Saving, offline work and conflicts

A dependable draft system has distinct states: **Saved**, **Saving**, **Unsaved
on this device**, **Offline**, and **Conflict**. “Saved” means the cloud has
acknowledged the write, not merely that JavaScript updated local state.

Proposed cloud autosave:

- Update preview immediately as the user types.
- Save after 3 seconds without typing; during continuous typing, attempt a save
  at most every 15 seconds. Skip unchanged content.
- Save on Save and exit and meaningful section changes; coalesce closely spaced
  actions into one write. Do not duplicate-write all fields on each keypress.
- On explicit sign-out, finish the save before clearing the session. If saving
  fails, show Stay and retry or Download a recovery copy. Never silently discard
  unsaved changes. Browser close cannot guarantee a final network write.
- Keep a recovery snapshot on an explicitly trusted device. Namespace it by UID
  and resume ID and clear it on explicit sign-out after saved/recovered work is
  resolved. Do not allow one account to recover another account's private draft.
- Reopening on the same trusted device checks for unsynced recovery work. On a
  second device, only the last successful cloud save is available; do not claim
  unsynced offline changes magically appear there.

Firestore web persistence is optional and is not cleared automatically between
sessions; ask before enabling it on a shared machine. Automatic sync alone uses
last-write-wins, so it is insufficient for protecting overlapping edits.
[Offline persistence documentation](https://firebase.google.com/docs/firestore/manage-data/enable-offline)
explains these behaviors.

Use a transaction to compare the stored revision with the revision originally
loaded by the editor. If it differs, keep the local edit as a recoverable copy and
ask the user to choose a version; do not overwrite the other device's work. If it
matches, save data plus revision+1 and a server timestamp. These transactions
cannot run offline, so offline recovery remains pending until reconnection.
[Firestore transactions](https://firebase.google.com/docs/firestore/manage-data/transactions)
cover retries and offline limitations.

On quota exhaustion, permission failure or network loss, retain the local draft,
show the actual save state and offer a recovery JSON download. Never show an
empty resume as if the previous document had vanished.

## 5. Member management and privacy

For the first free release, use **Firebase Console Authentication** for privileged
account administration: search users, inspect providers/verification, disable
abusive accounts, and manage recovery. Use separate owner/admin Google accounts
protected by MFA for console access.

The Career Tools member directory should show only name, sign-in email/provider,
joined date, last sign-in and a summary of saved drafts. Restrict it to explicitly
assigned administrators. Do not expose resume text, contact details from inside a
resume, passwords or session tokens to general support staff.

The local `/admin/members/` directory implements the basic review surface using
local server authorization. Cloud administration and account-disabling operations
must use Firebase Console or a trusted Admin SDK environment; never embed an
Admin SDK service-account secret in the browser. Keep an audit trail of privileged
actions. Do not give the first public signup admin access.

Production Firestore rules must enforce:

- Authentication and verified email where required by the chosen onboarding flow.
- `request.auth.uid == uid` for reads and writes to the member's own drafts.
- A strict field allowlist, immutable ownership/createdAt and valid revision updates.
- Private member profiles; no public listing of emails.
- No member writes to roles, entitlements or payment records.
- No public reads of unpublished/premium template configuration.

Keep unverified signup data in memory/trusted-device recovery until verification
or explicitly allow only the chosen limited verification-pending data surface.
Do not lock users out of necessary verification or account-deletion actions.
Firebase explains the underlying checks in its
[Security Rules conditions](https://firebase.google.com/docs/firestore/security/rules-conditions).
Test rules in the Emulator Suite with two real test identities before release.

Delete a member's resume subcollection and profile before removing their Auth
account, after recent reauthentication. Auth deletion does not automatically delete
Firestore records. A free client-assisted deletion can be interrupted; provide a
retry state and an administrator cleanup procedure. Do not promise automatic
scheduled deletion/backup jobs that have not been provisioned.

## 6. What fits a no-billing Firebase release

As checked on 10 September 2026, Spark requires no payment method. Firestore
Standard includes 1 GiB storage, 50,000 document reads/day, 20,000 writes/day and
20,000 deletes/day; network egress includes 10 GiB/month. These are shared project
quotas, not per-member allowances. Firebase Cloud Functions and Cloud Storage are
not available under Spark in the current product pricing table.
[Firebase pricing](https://firebase.google.com/pricing)

Proposed stack:

| Need | First free release |
|---|---|
| Website | Keep the existing static host |
| Google/email login | Firebase Authentication Spark |
| Resume drafts | Cloud Firestore Spark |
| Free template catalog/previews | Static public assets on the website |
| PDF download | Browser text-based print/export; no upload/storage |
| ATS check | Existing on-device checker |
| Member administration | Firebase Console plus a restricted member directory |
| Photo/resume file storage | Omit at launch |
| Cloud PDF worker and payment webhook | Defer until a separately budgeted trusted backend is available |

Browser PDF export is a deliberate change from the local server-generated PDF.
It needs its own pagination/font/text-extraction tests. Label the action accurately
if it opens the browser's Print → Save as PDF dialog. Do not claim identical
server rendering until it is implemented and tested.

The existing premium prototype remains local. A frontend-only free release cannot
securely hide downloadable premium template configurations or verify Razorpay
payments. Publish the free catalog first, and add paid access only when a trusted
backend is available. Do not move secrets into the browser to avoid hosting costs.
Firebase Cloud Storage requires Blaze; the
[Storage setup documentation](https://firebase.google.com/docs/storage/web/start)
confirms this requirement. “Blaze with free allowances” is different from “no
billing account,” and does not guarantee a zero bill.

Example planning estimate (not a quota guarantee): 100 active editors each doing
100 cloud saves/day means 10,000 draft writes/day, before profiles, recovery copies,
transaction retries or other products. Transaction reads and dashboard reads also
count. At 200 such editors, draft writes alone would consume the daily write quota.
Use a launch budget below the published limit and monitor actual usage. A large
number of registered members does not by itself tell us how many daily writes
we will need.

## 7. Implementation and launch order

1. Review this plan and choose the free core scope. Keep billing disabled.
2. Create a Firebase web app on Spark; enable Google and email/password, configure
   approved domains and email action return URLs. Use an isolated test project
   and a separate production project.
3. Add an auth adapter and Firestore draft repository behind the existing UI.
   Preserve the renderer and data schema. Ship no server-only files to static hosting.
4. Implement provider linking, verification, password recovery and remembered
   sessions. Keep the intended template/draft destination across every redirect.
5. Implement cloud save/revision checks, last-section resume, trusted-device
   recovery, member data export and explicit account deletion.
6. Verify owner-only rules, account switching, two-tab/two-device conflicts,
   offline recovery, reset links, quota/network failures and the complete
   signup → save → sign-out → sign-in → continue flow.
7. Add and verify the free browser PDF path. Keep the paid simulator local.
8. Connect production only after the owner has reviewed the local result and the
   security and recovery checks pass. No live site update is part of this work.

To migrate test drafts, sign in to the intended Firebase account and explicitly
import selected local resume JSON. Do not auto-assign a local account to a cloud UID
solely by matching email, and do not copy local password hashes to the client.
Keep the local database intact until the member confirms their imported drafts.
