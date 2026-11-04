// Hiring setup rules: quick requests (/recruit/) + employer portal posts. Emulator only.
import { readFile } from "node:fs/promises";
import { test, after, before } from "node:test";
import { initializeTestEnvironment, assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { doc, setDoc, getDoc, getDocs, collection, query, where, updateDoc, addDoc, serverTimestamp } from "firebase/firestore";

let env, guest, employer, worker, admin;
const now = () => serverTimestamp();
const REQ = "IPD-AB12-CD345-EF678";

const request = (over = {}) => ({
  postType: "walkin",
  contactName: "Meera HR",
  designation: "HR Manager",
  contactEmail: "hr@brightloop.example",
  contactPhone: "+91 9000000000",
  company: "Brightloop",
  website: "https://brightloop.example",
  linkedin: "",
  location: "Infopark, Kochi",
  park: "Infopark Kochi",
  title: "Junior QA Engineer",
  extraRoles: "",
  vacancies: "5",
  experience: "0-2 years",
  employmentType: "Walk-in",
  workMode: "On-site",
  sector: "Technology",
  skills: "Manual testing, SQL",
  closingDate: "2027-01-10",
  salary: "3–4 LPA",
  applyMethod: "Email",
  applyContact: "careers@brightloop.example",
  applyLink: "",
  walkIn: { date: "2027-01-10", time: "10 am – 1 pm", venue: "Phase 1, Infopark", mapLink: "", documents: "Resume, ID" },
  description: "Test web and mobile releases, log defects and retest fixes.",
  status: "pending",
  createdAt: now(),
  updatedAt: now(),
  ...over
});

const communityJob = (over = {}) => ({
  ownerUid: "hemployer",
  kind: "community",
  title: "Customer support associate",
  company: "Test Company",
  sector: "Office & Admin",
  location: "Kochi",
  description: "Handle customer calls and emails for our product team.",
  requirements: [],
  skills: ["Communication"],
  experience: "Freshers welcome",
  pay: 0,
  basis: "month",
  employmentType: "Full-time",
  workMode: "On-site",
  vacancies: 3,
  urgent: true,
  closingDate: "2027-01-30",
  postType: "walkin",
  applyMethod: "walkin",
  walkIn: { date: "2027-01-20", time: "10 am", venue: "Infopark Phase 2", mapLink: "", documents: "Resume" },
  status: "pending",
  createdAt: now(),
  updatedAt: now(),
  ...over
});

before(async () => {
  env = await initializeTestEnvironment({
    projectId: "demo-infoparkdaily",
    firestore: { host: "127.0.0.1", port: 8080, rules: await readFile("firebase/firestore.rules", "utf8") }
  });
  await env.clearFirestore();
  const ctx = (uid) => env.authenticatedContext(uid, { email: uid + "@example.test", email_verified: true }).firestore();
  employer = ctx("hemployer");
  worker = ctx("hworker");
  admin = ctx("admin");
  guest = env.unauthenticatedContext().firestore();
  await env.withSecurityRulesDisabled(async (c) => {
    const db = c.firestore();
    await setDoc(doc(db, "marketAdmins/admin@example.test"), { active: true });
    await setDoc(doc(db, "marketMembers/hemployer"), { role: "employer", email: "hemployer@example.test" });
    await setDoc(doc(db, "marketMembers/hworker"), { role: "worker", email: "hworker@example.test" });
  });
});
after(async () => env?.cleanup());

test("anyone can submit a valid quick request, but not a forged or short-ID one", async () => {
  await assertSucceeds(setDoc(doc(guest, "hiringRequests", REQ), request()));
  await assertFails(setDoc(doc(guest, "hiringRequests", "IPD-SHORT"), request()));
  await assertFails(setDoc(doc(guest, "hiringRequests", "IPD-ZZZZ-ZZZZZ-ZZZZ1"), request({ status: "approved" })));
  await assertFails(setDoc(doc(guest, "hiringRequests", "IPD-ZZZZ-ZZZZZ-ZZZZ2"), request({ jobId: "x" })));
  await assertFails(setDoc(doc(guest, "hiringRequests", "IPD-ZZZZ-ZZZZZ-ZZZZ3"), request({ contactEmail: "not-an-email" })));
});

test("the submitter can track by ID; only admins can list requests", async () => {
  await assertSucceeds(getDoc(doc(guest, "hiringRequests", REQ)));
  await assertFails(getDocs(collection(guest, "hiringRequests")));
  await assertFails(getDocs(collection(employer, "hiringRequests")));
  await assertSucceeds(getDocs(collection(admin, "hiringRequests")));
});

test("only admins can review a request, and only status/note fields", async () => {
  await assertFails(updateDoc(doc(guest, "hiringRequests", REQ), { status: "approved", updatedAt: now() }));
  await assertFails(updateDoc(doc(employer, "hiringRequests", REQ), { status: "approved", updatedAt: now() }));
  await assertFails(updateDoc(doc(admin, "hiringRequests", REQ), { title: "Changed", updatedAt: now() }));
  await assertSucceeds(updateDoc(doc(admin, "hiringRequests", REQ), { status: "changes", adminNote: "Add the careers link.", reviewedAt: now(), updatedAt: now() }));
});

test("admin publishes an approved request as a public job; employers cannot fake one", async () => {
  const published = communityJob({ ownerUid: "admin", kind: "request", requestId: REQ, status: "approved", applyMethod: "email", applyEmail: "careers@brightloop.example" });
  await assertSucceeds(addDoc(collection(admin, "marketJobs"), published));
  await assertFails(addDoc(collection(employer, "marketJobs"), { ...published, ownerUid: "hemployer" }));
  await assertFails(addDoc(collection(employer, "marketJobs"), communityJob({ kind: "request" })));
});

test("employer posts walk-in or regular jobs as pending; bad post types are rejected", async () => {
  await assertSucceeds(setDoc(doc(employer, "marketJobs/walk1"), communityJob()));
  await assertSucceeds(setDoc(doc(employer, "marketJobs/link1"), (() => {
    const j = communityJob({ postType: "job", applyMethod: "link", applyLink: "https://careers.test" });
    delete j.walkIn;
    return j;
  })()));
  await assertFails(setDoc(doc(employer, "marketJobs/bad1"), communityJob({ postType: "contest" })));
  await assertFails(setDoc(doc(employer, "marketJobs/bad2"), communityJob({ status: "approved" })));
  await assertFails(setDoc(doc(worker, "marketJobs/bad3"), communityJob({ ownerUid: "hworker" })));
});

test("approved jobs are public; pending ones are not", async () => {
  await assertSucceeds(updateDoc(doc(admin, "marketJobs/walk1"), { status: "approved", updatedAt: now() }));
  await assertSucceeds(getDocs(query(collection(guest, "marketJobs"), where("status", "==", "approved"))));
  await assertFails(getDoc(doc(guest, "marketJobs/link1")));
});

test("quick job alerts (employer, no sign-in) allow a short note", async () => {
  const ok = request({ postType: "alert", description: "" });
  delete ok.walkIn;
  await assertSucceeds(setDoc(doc(guest, "hiringRequests", "IPD-ALRT-AAAAA-BBBBB"), ok));
  const bad = request({ postType: "job", description: "" });
  delete bad.walkIn;
  await assertFails(setDoc(doc(guest, "hiringRequests", "IPD-ALRT-AAAAA-CCCCC"), bad));
});

const alertSub = (over = {}) => ({
  name: "Anjali",
  channel: "whatsapp",
  contact: "+91 9876543210",
  keywords: "QA, testing",
  locations: ["Infopark Kochi"],
  experience: "fresher",
  types: ["jobs", "walkins"],
  consent: true,
  status: "active",
  createdAt: now(),
  updatedAt: now(),
  ...over
});
const ALT = "ALT-AB12-CD345-EF678";

test("job seekers can subscribe to alerts without sign-in; data is validated", async () => {
  await assertSucceeds(setDoc(doc(guest, "jobAlerts", ALT), alertSub()));
  await assertFails(setDoc(doc(guest, "jobAlerts", "ALT-SHORT"), alertSub()));
  await assertFails(setDoc(doc(guest, "jobAlerts", "ALT-ZZZZ-ZZZZZ-ZZZZ1"), alertSub({ consent: false })));
  await assertFails(setDoc(doc(guest, "jobAlerts", "ALT-ZZZZ-ZZZZZ-ZZZZ2"), alertSub({ channel: "email", contact: "not-an-email" })));
  await assertFails(setDoc(doc(guest, "jobAlerts", "ALT-ZZZZ-ZZZZZ-ZZZZ3"), alertSub({ status: "paused" })));
});

test("alert owners manage by ID; only admins can list subscribers", async () => {
  await assertSucceeds(getDoc(doc(guest, "jobAlerts", ALT)));
  await assertFails(getDocs(collection(guest, "jobAlerts")));
  await assertSucceeds(getDocs(collection(admin, "jobAlerts")));
  await assertSucceeds(updateDoc(doc(guest, "jobAlerts", ALT), { status: "paused", updatedAt: now() }));
  await assertFails(updateDoc(doc(guest, "jobAlerts", ALT), { contact: "+91 9000000000", updatedAt: now() }));
  await assertFails(updateDoc(doc(guest, "jobAlerts", ALT), { status: "hacked", updatedAt: now() }));
});
